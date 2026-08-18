/**
 * Design extraction: dump everything needed to reproduce a reference site.
 *
 *   npx tsx scripts/design-extract.ts --url=https://example.framer.website/ --out=./_ref/agenciy
 *
 * Provider-agnostic on purpose. It reads COMPUTED styles, which are ground truth
 * no matter how the source generated them (Framer, Webflow, hand-written, whatever).
 * Nothing here parses Framer-specific output, so it does not rot when Framer ships
 * a new compiler.
 *
 * Why a local script and not the Playwright MCP: the MCP drives one page at a time
 * and every snapshot lands in the agent's context. This does every breakpoint in one
 * run and writes to disk, so reading the result costs a grep instead of a context dump.
 *
 * Outputs, under --out:
 *   tokens.json        CSS custom properties off :root (the source's own token layer)
 *   nodes.<bp>.json    per-element computed styles + page-absolute rects, per breakpoint
 *   motion.json        rAF samples of transform/opacity over time (load + scroll)
 *   assets.json        manifest of every asset request
 *   assets/            the actual bytes (images, fonts, video, css, js)
 *   screens/           full-page screenshots, settled and reduced-motion, per breakpoint
 *   report.md          the human distillation: palette, type scale, spacing, fonts
 *
 * The screenshots in screens/ are the reference target for scripts/design-diff.ts.
 */
import { chromium, type Page, type Response } from "playwright";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/* ---- config ---- */

const BREAKPOINTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1180, height: 820 },
  { name: "tablet", width: 810, height: 1080 },
  { name: "mobile", width: 390, height: 844 },
] as const;

/**
 * Curated computed properties. getComputedStyle exposes ~340; dumping all of them
 * per node across four breakpoints produces tens of MB of mostly-default noise.
 * These ~45 are the ones that carry design intent.
 */
const PROPS = [
  "display", "position", "flex-direction", "justify-content", "align-items", "gap",
  "grid-template-columns", "grid-template-rows",
  "width", "height", "max-width", "min-height",
  "margin-top", "margin-right", "margin-bottom", "margin-left",
  "padding-top", "padding-right", "padding-bottom", "padding-left",
  "font-family", "font-size", "font-weight", "font-style", "line-height",
  "letter-spacing", "text-transform", "text-align", "text-decoration-line",
  "color", "background-color", "background-image", "background-size", "background-position",
  "border-top-width", "border-right-width", "border-bottom-width", "border-left-width",
  "border-top-color", "border-style",
  "border-top-left-radius", "border-top-right-radius", "border-bottom-left-radius", "border-bottom-right-radius",
  "box-shadow", "opacity", "transform", "filter", "backdrop-filter",
  "overflow", "z-index", "mix-blend-mode",
];

/** Skip absurd payloads (a hero video can be tens of MB and we only need the URL). */
const MAX_ASSET_BYTES = 30 * 1024 * 1024;

/** Motion sampler caps. Each tick calls getComputedStyle per tracked node, which
 *  forces a style recalc, so an uncapped sampler would distort the very animation
 *  it is measuring. 80 nodes at 20Hz is the compromise. */
const MOTION_MAX_NODES = 80;
const MOTION_TICK_MS = 50;

/** Ceiling on viewport bands per breakpoint. A long page at a short mobile viewport
 *  runs to ~21 bands; this is a runaway guard, not a target. */
const MAX_BANDS = 30;

/* ---- types ---- */

type NodeRecord = {
  path: string;
  tag: string;
  cls: string;
  text: string;
  rect: { x: number; y: number; w: number; h: number };
  style: Record<string, string>;
};

type MotionSample = { t: number; transform: string; opacity: string };
type MotionLog = Record<string, { path: string; samples: MotionSample[] }>;

type AssetRecord = {
  url: string;
  type: string;
  status: number;
  bytes: number;
  file: string | null;
};

/* ---- cli ---- */

function arg(name: string, fallback?: string): string {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (hit) return hit.slice(name.length + 3);
  if (fallback !== undefined) return fallback;
  console.error(`Missing required --${name}=`);
  process.exit(1);
}

/* ---- in-page extractors ---- */

/**
 * tsx transpiles through esbuild with keepNames enabled, which rewrites every named
 * nested function into a `__name(fn, "fn")` call to preserve fn.name. Playwright ships
 * browser callbacks across by toString, so those calls arrive in a page that has never
 * heard of `__name` and throw ReferenceError before a single line of our code runs.
 *
 * This shim is raw JS via { content }, never transpiled, so it cannot itself be
 * rewritten by the tool it is working around. Install it on every page before any
 * other init script or evaluate.
 */
async function installNameShim(page: Page): Promise<void> {
  await page.addInitScript({
    content: "window.__name = window.__name || function (f) { return f; };",
  });
  // page.evaluate does not re-run init scripts on an already-loaded document, so the
  // shim also has to exist right now for the very first extract on this page.
  await page
    .evaluate("window.__name = window.__name || function (f) { return f; };")
    .catch(() => {
      /* No document yet (page never navigated). The init script covers that case. */
    });
}

/**
 * A stable identifier for a node that survives across breakpoints and across the
 * separate page loads each breakpoint needs. Class names are hashed and unstable
 * in compiled output, so structure is the only thing to key on.
 *
 * Defined inline in each browser-side callback rather than shared as a string and
 * eval'd: real sites ship a CSP without `unsafe-eval`, which silently kills the whole
 * init script. Playwright serializes these callbacks by toString, so a nested
 * declaration is the only thing that reliably survives the trip.
 */

async function extractNodes(page: Page, props: string[]): Promise<NodeRecord[]> {
  return page.evaluate(
    ({ props }: { props: string[] }) => {
      const domPath = (el: Element): string => {
        const parts: string[] = [];
        let cur: Element | null = el;
        while (cur && cur.parentElement) {
          const parent: Element = cur.parentElement;
          const idx = Array.prototype.indexOf.call(parent.children, cur) + 1;
          parts.unshift(`${cur.tagName.toLowerCase()}:nth-child(${idx})`);
          cur = parent;
          if (cur === document.documentElement) break;
        }
        return parts.join(">");
      };
      const out: NodeRecord[] = [];
      const els = Array.from(document.querySelectorAll("body *"));
      for (const el of els) {
        const r = el.getBoundingClientRect();
        // Zero-area nodes carry no design information worth reproducing.
        if (r.width === 0 && r.height === 0) continue;
        const cs = getComputedStyle(el);
        const style: Record<string, string> = {};
        for (const p of props) {
          const v = cs.getPropertyValue(p);
          if (v) style[p] = v.trim();
        }
        // Direct text only. Without this filter every ancestor inherits the text of
        // its whole subtree and the report's type scale is unreadable.
        let text = "";
        for (const n of Array.from(el.childNodes)) {
          if (n.nodeType === 3) text += n.textContent ?? "";
        }
        out.push({
          path: domPath(el),
          tag: el.tagName.toLowerCase(),
          cls: el.getAttribute("class") ?? "",
          text: text.trim().slice(0, 140),
          rect: {
            x: Math.round(r.x + window.scrollX),
            y: Math.round(r.y + window.scrollY),
            w: Math.round(r.width),
            h: Math.round(r.height),
          },
          style,
        });
      }
      return out;
    },
    { props }
  ) as Promise<NodeRecord[]>;
}

/**
 * Custom properties off :root. This is the source's own token layer handed over
 * directly: palette, type scale, and spacing, already named by whoever built it.
 * Read from the computed style rather than by walking document.styleSheets, because
 * cross-origin stylesheets throw on .cssRules access. The raw CSS text is captured
 * separately at the network layer, which has no such restriction.
 */
async function extractCustomProps(page: Page): Promise<Record<string, string>> {
  return page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const vars: Record<string, string> = {};
    for (let i = 0; i < root.length; i++) {
      const p = root[i];
      if (p.startsWith("--")) vars[p] = root.getPropertyValue(p).trim();
    }
    return vars;
  });
}

/**
 * Records transform + opacity over time for the biggest nodes on the page, across
 * both the load-time animation and the scroll-triggered choreography.
 *
 * This exists because motion is the one design layer that never appears in computed
 * styles at rest. A compiled site's animations live in JS, so the only way to recover
 * them is to watch the values move. Note this yields the observed CURVE, not the
 * spring parameters that produced it: reconstructing those is inference, and it is
 * where a reproduction realistically stops short of exact.
 */
async function sampleMotion(page: Page, url: string): Promise<MotionLog> {
  await installNameShim(page);
  await page.addInitScript(
    ({ maxNodes, tickMs }: { maxNodes: number; tickMs: number }) => {
      const domPath = (el: Element): string => {
        const parts: string[] = [];
        let cur: Element | null = el;
        while (cur && cur.parentElement) {
          const parent: Element = cur.parentElement;
          const idx = Array.prototype.indexOf.call(parent.children, cur) + 1;
          parts.unshift(`${cur.tagName.toLowerCase()}:nth-child(${idx})`);
          cur = parent;
          if (cur === document.documentElement) break;
        }
        return parts.join(">");
      };
      const log: MotionLog = {};
      const t0 = performance.now();
      let tagged = 0;
      let lastScan = 0;

      const scan = () => {
        const els = Array.from(document.querySelectorAll("body *"));
        for (const el of els) {
          if (tagged >= maxNodes) break;
          if (el.hasAttribute("data-mx-id")) continue;
          const r = el.getBoundingClientRect();
          if (r.width * r.height < 3000) continue;
          const id = "mx" + tagged++;
          el.setAttribute("data-mx-id", id);
          log[id] = { path: domPath(el), samples: [] };
        }
      };

      const tick = () => {
        const now = performance.now() - t0;
        // Re-scan periodically: compiled sites render progressively, so the node set
        // at t=0 is not the node set at t=2s.
        if (now - lastScan > 500 && tagged < maxNodes) {
          scan();
          lastScan = now;
        }
        for (const id of Object.keys(log)) {
          const el = document.querySelector(`[data-mx-id="${id}"]`);
          if (!el) continue;
          const cs = getComputedStyle(el);
          const transform = cs.transform;
          const opacity = cs.opacity;
          const prev = log[id].samples[log[id].samples.length - 1];
          // Only record deltas. Storing every tick for every node yields megabytes
          // of "none / 1" and buries the handful of nodes that actually move.
          if (!prev || prev.transform !== transform || prev.opacity !== opacity) {
            log[id].samples.push({ t: Math.round(now), transform, opacity });
          }
        }
        setTimeout(tick, tickMs);
      };

      (window as unknown as { __motionLog: MotionLog }).__motionLog = log;
      setTimeout(tick, tickMs);
    },
    { maxNodes: MOTION_MAX_NODES, tickMs: MOTION_TICK_MS }
  );

  await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  // Let the load-time animation resolve before disturbing the page with a scroll.
  await page.waitForTimeout(2500);
  await autoScroll(page, 6000);
  await page.waitForTimeout(800);

  const log = await page.evaluate(
    () => (window as unknown as { __motionLog?: MotionLog }).__motionLog ?? null
  );
  // A missing log means the init script threw before it could publish. Report it and
  // carry on rather than dying: the layout passes are completely valid without motion
  // data, and losing motion should not cost the whole run.
  if (!log) {
    console.warn("  motion sampler never published a log, continuing without motion data");
    return {};
  }
  // Nodes that never moved are not motion, they are furniture.
  const moved: MotionLog = {};
  for (const [id, rec] of Object.entries(log)) {
    if (rec.samples.length > 1) moved[id] = rec;
  }
  return moved;
}

/**
 * Screenshot the page as a stack of viewport-sized bands, each shot while the page is
 * actually scrolled to it. This is the reference the diff loop compares against.
 *
 * A single fullPage screenshot is composited from ONE scroll position, so anything
 * scroll-linked (a headline that lights up as it enters, a parallax layer, a pinned
 * section) is frozen at whatever value it happened to hold there. Measured on
 * agenciy.framer.website: the hero headline renders half white and half grey, and an
 * eyebrow pill sits stranded on top of the h1, because both are driven by scroll
 * progress rather than a one-shot reveal. Neither is what a visitor ever sees.
 *
 * Shooting band by band puts every row in the scroll position it was designed to be
 * seen at. It also makes the diff sharper: bands are all exactly viewport-sized, so
 * comparison needs no cropping, and a per-band number points straight at the row that
 * is wrong instead of averaging the whole page into one useless percentage.
 *
 * Returns the band count. A ref/ours mismatch in that count is itself the finding:
 * it means total page height diverged.
 */
async function captureBands(page: Page, dir: string, name: string, vh: number): Promise<number> {
  const pageH = await page.evaluate(() => document.body.scrollHeight);
  const n = Math.min(Math.ceil(pageH / vh), MAX_BANDS);
  for (let i = 0; i < n; i++) {
    await page.evaluate((y: number) => window.scrollTo(0, y), i * vh);
    // Let entrance and scroll-linked effects settle at THIS position before shooting.
    await page.waitForTimeout(650);
    await page.screenshot({
      path: path.join(dir, `${name}.band${String(i).padStart(2, "0")}.png`),
    });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return n;
}

/**
 * Delete chrome that is not part of the design: the source's own watermark, a cookie
 * banner, a chat bubble. Left in place each one is a permanent false diff on every
 * band, since our reproduction will never have it.
 *
 * Remove rather than mask. Masking paints a rectangle our side can never reproduce and
 * throws away whatever real design sits underneath; removing reveals it, which is the
 * thing we are actually trying to copy. Safe because this chrome is invariably
 * position:fixed, so deleting it reflows nothing.
 *
 * Returns how many nodes were removed, so a selector that silently matches nothing
 * shows up in the log instead of being assumed to have worked.
 */
async function hideChrome(page: Page, selector: string): Promise<number> {
  if (!selector) return 0;
  // Evaluate each selector separately. querySelectorAll throws on the WHOLE comma list
  // if any one member is invalid, so a single bad selector would silently take the good
  // ones down with it and the badge would quietly survive into the reference.
  const parts = selector.split(",").map((s) => s.trim()).filter(Boolean);
  let total = 0;
  for (const part of parts) {
    const n = await page.evaluate((sel: string) => {
      const tryAll = (s: string): Element[] | null => {
        try {
          return Array.from(document.querySelectorAll(s));
        } catch {
          return null;
        }
      };
      let els = tryAll(sel);
      if (els === null) {
        // Generated sites hand out ids like "5h7nbp". CSS forbids an identifier
        // starting with a digit, so "#5h7nbp" is a syntax error even though the id is
        // perfectly real. The attribute form is legal and matches it.
        const m = /^#([^ .#\[>+~:]+)$/.exec(sel);
        if (m) els = tryAll(`[id="${m[1]}"]`);
      }
      if (els === null) return -1;
      for (const el of els) el.remove();
      return els.length;
    }, part);
    if (n < 0) console.warn(`  --hide: "${part}" is not a usable selector, skipped`);
    else if (n === 0) console.warn(`  --hide: "${part}" matched nothing`);
    else total += n;
  }
  return total;
}

/** Scroll the full page over `ms`, which is what triggers viewport-entry animation
 *  and any lazy-loaded asset. Measured on agenciy.framer.website: this pass halves the
 *  nodes left stranded at opacity 0 (68 -> 37), so it is load-bearing, not a nicety.
 *  Note reducedMotion does NOT do this job on a compiled site: it changed the stranded
 *  count by one node, because the source's runtime does not honor it the way our own
 *  framer-motion code does. Scrolling is what actually settles the page. */
async function autoScroll(page: Page, ms: number): Promise<void> {
  await page.evaluate(async (ms: number) => {
    const h = document.body.scrollHeight;
    const steps = Math.max(1, Math.round(ms / 40));
    for (let i = 0; i <= steps; i++) {
      window.scrollTo(0, (h * i) / steps);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  }, ms);
}

/* ---- distillation ---- */

function tally(values: string[]): Array<[string, number]> {
  const m = new Map<string, number>();
  for (const v of values) m.set(v, (m.get(v) ?? 0) + 1);
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
}

/** Ignore fully-transparent and unset values so the palette is real colors only. */
function isRealColor(v: string): boolean {
  if (!v) return false;
  if (v === "transparent" || v === "none") return false;
  if (/rgba\(\s*0,\s*0,\s*0,\s*0\s*\)/.test(v)) return false;
  return v.startsWith("rgb") || v.startsWith("#") || v.startsWith("color(");
}

function buildReport(
  url: string,
  tokens: Record<string, string>,
  byBp: Record<string, NodeRecord[]>,
  assets: AssetRecord[],
  motion: MotionLog
): string {
  const desktop = byBp["desktop"] ?? [];
  const L: string[] = [];

  /**
   * Tally each property only over the nodes where it is actually doing work.
   *
   * This filter is the difference between a useful report and a misleading one. A
   * compiled page is mostly empty structural containers: on the first real run, 1449
   * of 1980 nodes were layout divs with no text, so they inherited the UA defaults
   * (font-family: sans-serif, color: rgb(0,0,0)) and a naive tally ranked those
   * defaults as the site's primary font and primary color. They are neither. They are
   * the absence of a decision, counted 1449 times.
   */
  const textNodes = desktop.filter((n) => n.text.length > 0);
  const paintedNodes = desktop.filter((n) => n.rect.w * n.rect.h > 0);
  const borderedNodes = desktop.filter(
    (n) => n.style["border-top-width"] && n.style["border-top-width"] !== "0px"
  );

  L.push(`# Design extraction: ${url}`);
  L.push("");
  L.push(`Captured ${new Date().toISOString()}. Breakpoints: ${Object.keys(byBp).join(", ")}.`);
  L.push("");
  L.push("This is the distillation. The raw truth is in nodes.<bp>.json.");
  L.push("");

  /* fonts: text-bearing nodes only, or empty containers vote for the UA default */
  const families = tally(textNodes.map((n) => n.style["font-family"]).filter(Boolean));
  const fontFiles = assets.filter((a) => /\.(woff2?|ttf|otf)(\?|$)/i.test(a.url));
  L.push("## Fonts");
  L.push("");
  L.push(`Counted over the ${textNodes.length} nodes that actually render text.`);
  L.push("");
  for (const [f, c] of families.slice(0, 10)) L.push(`- \`${f}\` (${c} text nodes)`);
  L.push("");
  L.push(`Font files downloaded: ${fontFiles.length}`);
  for (const f of fontFiles.slice(0, 20)) L.push(`- ${f.url}`);
  L.push("");
  L.push(
    "If any of these is a licensed face the firm does not own, that is a hard cap on fidelity and a licensing question, not a tooling one. Substitute deliberately, do not rehost."
  );
  L.push("");

  /* palette, split by job. A colour used for 12 headlines and a colour used for one
     900px section background are both "x12 vs x1" to a flat tally, which inverts
     their real importance. Separating them keeps each list readable. */
  const textColors = tally(textNodes.map((n) => n.style["color"]).filter(isRealColor));
  const surfaceColors = tally(
    paintedNodes.map((n) => n.style["background-color"]).filter(isRealColor)
  );
  const borderColors = tally(
    borderedNodes.map((n) => n.style["border-top-color"]).filter(isRealColor)
  );
  L.push("## Palette");
  L.push("");
  L.push("### Text colors");
  L.push("");
  for (const [c, n] of textColors.slice(0, 14)) L.push(`- \`${c}\` x${n} text nodes`);
  L.push("");
  L.push("### Surface colors (backgrounds)");
  L.push("");
  L.push("Count is nodes, not area. A single node can be the whole page background.");
  L.push("");
  for (const [c, n] of surfaceColors.slice(0, 14)) L.push(`- \`${c}\` x${n}`);
  L.push("");
  L.push("### Border colors");
  L.push("");
  if (borderColors.length === 0) L.push("None. The design carries separation with surface contrast, not rules.");
  for (const [c, n] of borderColors.slice(0, 10)) L.push(`- \`${c}\` x${n}`);
  L.push("");

  /* type scale */
  const typeCombos = tally(
    textNodes.map((n) =>
      [
        n.style["font-size"],
        n.style["font-weight"],
        n.style["line-height"],
        n.style["letter-spacing"],
        (n.style["font-family"] ?? "").split(",")[0],
      ].join(" | ")
    )
  );
  L.push("## Type scale");
  L.push("");
  L.push("`size | weight | line-height | letter-spacing | family`");
  L.push("");
  for (const [t, n] of typeCombos.slice(0, 24)) L.push(`- ${t} x${n}`);
  L.push("");

  /* spacing */
  const spacing = tally(
    desktop
      .flatMap((n) => [
        n.style["padding-top"], n.style["padding-bottom"],
        n.style["margin-top"], n.style["margin-bottom"], n.style["gap"],
      ])
      .filter((v) => v && v !== "0px" && v !== "normal")
  );
  L.push("## Spacing values in use");
  L.push("");
  for (const [s, n] of spacing.slice(0, 24)) L.push(`- \`${s}\` x${n}`);
  L.push("");

  /* radii + shadows */
  const radii = tally(desktop.map((n) => n.style["border-top-left-radius"]).filter((v) => v && v !== "0px"));
  const shadows = tally(desktop.map((n) => n.style["box-shadow"]).filter((v) => v && v !== "none"));
  L.push("## Radii");
  L.push("");
  for (const [r, n] of radii.slice(0, 12)) L.push(`- \`${r}\` x${n}`);
  L.push("");
  L.push("## Shadows");
  L.push("");
  for (const [s, n] of shadows.slice(0, 12)) L.push(`- \`${s}\` x${n}`);
  L.push("");

  /* tokens */
  L.push("## Source token layer (:root custom properties)");
  L.push("");
  const tokenKeys = Object.keys(tokens);
  if (tokenKeys.length === 0) {
    L.push("None exposed on :root. The source inlines its values instead, so rebuild the token layer from the palette and type scale above.");
  } else {
    L.push(`${tokenKeys.length} custom properties. These are the source's own names for its design decisions.`);
    L.push("");
    for (const k of tokenKeys.slice(0, 60)) L.push(`- \`${k}\`: \`${tokens[k]}\``);
  }
  L.push("");

  /* section outline: the map for deciding what to build, in page order.
     Depth is not a usable filter here, compiled output nests sections five or six
     wrappers deep. Prefer real <section> tags, and fall back to full-width bands
     only when the source has no semantic markup at all. */
  const pageH = Math.max(...desktop.map((n) => n.rect.y + n.rect.h), 1);
  const pageW = Math.max(...desktop.map((n) => n.rect.w), 1);
  const semantic = desktop.filter((n) => n.tag === "section");
  const candidates =
    semantic.length >= 3
      ? semantic
      : desktop.filter(
          (n) => n.rect.w >= pageW * 0.98 && n.rect.h > 200 && n.rect.h < pageH * 0.8
        );

  // Collapse wrappers that share a top edge, keeping the outermost. Nested wrappers
  // at the same y are one section to a reader, not four.
  const seen = new Set<number>();
  const sections = candidates
    .slice()
    .sort((a, b) => a.rect.y - b.rect.y || a.path.length - b.path.length)
    .filter((n) => {
      const key = Math.round(n.rect.y / 8);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  /** The biggest text inside a section, which is almost always its heading and the
   *  fastest way for a reader to identify what the band actually is. */
  const headingFor = (sec: NodeRecord): string => {
    const inside = textNodes.filter((t) => t.path.startsWith(sec.path + ">"));
    if (inside.length === 0) return "";
    const best = inside.slice().sort(
      (a, b) => parseFloat(b.style["font-size"] ?? "0") - parseFloat(a.style["font-size"] ?? "0")
    )[0];
    return `${best.style["font-size"]} "${best.text.slice(0, 52)}"`;
  };

  L.push("## Section outline (desktop, page-absolute)");
  L.push("");
  L.push(
    `Page is ${pageH}px tall. ${sections.length} bands${semantic.length >= 3 ? " (from real <section> tags)" : " (inferred, source has no <section> markup)"}.`
  );
  L.push("");
  for (const s of sections.slice(0, 40)) {
    const bg = s.style["background-color"];
    const bgTxt = isRealColor(bg) ? ` bg=\`${bg}\`` : "";
    L.push(`- y=${String(s.rect.y).padStart(5)} h=${String(s.rect.h).padStart(4)}${bgTxt} ${headingFor(s)}`);
  }
  L.push("");

  /* motion */
  L.push("## Motion");
  L.push("");
  L.push(`${Object.keys(motion).length} nodes changed transform or opacity during load + scroll. Full curves in motion.json.`);
  L.push("");
  L.push(
    "These are observed curves, not spring parameters. Matching the feel is inference and it is where a reproduction realistically stops short of exact."
  );
  L.push("");

  /* assets */
  const imgs = assets.filter((a) => a.type === "image");
  const media = assets.filter((a) => a.type === "media");
  L.push("## Assets");
  L.push("");
  L.push(`${imgs.length} images, ${media.length} media, ${fontFiles.length} fonts. Bytes in assets/, manifest in assets.json.`);
  L.push("");
  L.push(
    "Do not rehost the source's photography or video. Match the treatment (crop, grade, aspect, motion) with imagery the firm has rights to."
  );
  L.push("");

  return L.join("\n");
}

/* ---- main ---- */

async function main(): Promise<void> {
  const url = arg("url");
  const out = path.resolve(arg("out", "./_ref/extract"));
  /**
   * Chrome to delete before measuring. The default is Framer's free-tier badge, whose
   * id is verified against a live *.framer.website page and is stable because it is
   * Framer's own infrastructure, not template markup.
   *
   * It is deliberately the ONLY default. Template preview URLs often carry extra promo
   * chrome (agenciy.framer.website also floats a "NEW TEMPLATES" card) but those sit on
   * randomly-hashed ids like #5h7nbp, so there is nothing stable to match. Check the
   * bottom corners of band00 and pass them explicitly:
   *   --hide="#__framer-badge-container, #5h7nbp"
   *
   * Do not widen this to something like every position:fixed node. A sticky nav is
   * fixed too, and it IS design.
   */
  const hide = arg("hide", "#__framer-badge-container");

  await mkdir(path.join(out, "assets"), { recursive: true });
  await mkdir(path.join(out, "screens"), { recursive: true });

  const browser = await chromium.launch();
  const assets = new Map<string, AssetRecord>();

  /**
   * Capture at the network layer rather than by re-fetching URLs afterwards. This
   * sidesteps CORS entirely (cross-origin CSS is unreadable via document.styleSheets
   * but perfectly readable here) and it gets the exact bytes the browser used.
   */
  const onResponse = async (res: Response): Promise<void> => {
    const u = res.url();
    if (assets.has(u)) return;
    if (u.startsWith("data:")) return;
    const type = res.request().resourceType();
    if (!["image", "font", "media", "stylesheet", "script"].includes(type)) return;

    const rec: AssetRecord = { url: u, type, status: res.status(), bytes: 0, file: null };
    assets.set(u, rec);
    try {
      const body = await res.body();
      rec.bytes = body.length;
      if (body.length > MAX_ASSET_BYTES) return;
      const hash = createHash("sha1").update(u).digest("hex").slice(0, 8);
      const base = path.basename(new URL(u).pathname) || "index";
      const file = `${type}/${hash}-${base}`.replace(/[^a-zA-Z0-9._/-]/g, "_");
      await mkdir(path.join(out, "assets", type), { recursive: true });
      await writeFile(path.join(out, "assets", file), body);
      rec.file = file;
    } catch {
      // Redirects and cached responses have no retrievable body. The URL still
      // belongs in the manifest, so record it and move on.
    }
  };

  /* motion pass: its own context, because addInitScript must run before page JS
     and the sampler's style recalcs would skew the layout measurements below. */
  console.log("motion pass...");
  const motionCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const motionPage = await motionCtx.newPage();
  const motion = await sampleMotion(motionPage, url);
  await motionCtx.close();
  console.log(`  ${Object.keys(motion).length} nodes animate`);

  /* layout + screenshot pass, per breakpoint */
  const byBp: Record<string, NodeRecord[]> = {};
  let tokens: Record<string, string> = {};

  for (const bp of BREAKPOINTS) {
    console.log(`${bp.name} (${bp.width}x${bp.height})...`);
    const ctx = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
      deviceScaleFactor: 2,
      // Deliberately NOT reducedMotion. It is the obvious lever and it does nothing
      // here: measured on agenciy.framer.website it moved the stranded-node count from
      // 37 to 37, because a compiled site's own runtime ignores the preference that
      // our framer-motion code honors. Scrolling is what actually settles the page, and
      // band capture below shoots each row in view, so the reduced-motion trick that
      // our own screenshots need is unnecessary on both sides here.
    });
    const page = await ctx.newPage();
    await installNameShim(page);
    page.on("response", (r) => void onResponse(r));
    await page.goto(url, { waitUntil: "load", timeout: 60_000 });
    await page.waitForTimeout(1500);
    // Trigger viewport-entry effects and lazy assets before measuring or shooting.
    await autoScroll(page, 4000);
    await page.waitForTimeout(600);
    // After the scroll: a lazily-mounted badge does not exist at load time.
    const hidden = await hideChrome(page, hide);
    if (bp.name === "desktop") {
      console.log(hidden > 0 ? `  removed ${hidden} chrome node(s)` : "  no chrome matched --hide");
    }

    byBp[bp.name] = await extractNodes(page, PROPS);
    if (bp.name === "desktop") tokens = await extractCustomProps(page);

    // Overview only, for a human to skim. Do not diff against this: it is composited
    // from one scroll position and lies about anything scroll-linked.
    await page.screenshot({ path: path.join(out, "screens", `${bp.name}.full.png`), fullPage: true });
    const bands = await captureBands(page, path.join(out, "screens"), bp.name, bp.height);

    await writeFile(
      path.join(out, `nodes.${bp.name}.json`),
      JSON.stringify(byBp[bp.name], null, 1)
    );
    console.log(`  ${byBp[bp.name].length} nodes, ${bands} bands`);
    await ctx.close();
  }

  await browser.close();

  const assetList = Array.from(assets.values());
  await writeFile(path.join(out, "tokens.json"), JSON.stringify(tokens, null, 1));
  await writeFile(path.join(out, "motion.json"), JSON.stringify(motion, null, 1));
  await writeFile(path.join(out, "assets.json"), JSON.stringify(assetList, null, 1));
  await writeFile(path.join(out, "report.md"), buildReport(url, tokens, byBp, assetList, motion));

  console.log(`\ndone -> ${out}`);
  console.log(`  ${assetList.length} assets, ${Object.keys(tokens).length} tokens`);
  console.log(`  read ${path.join(out, "report.md")} first`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
