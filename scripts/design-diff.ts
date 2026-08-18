/**
 * Pixel diff: measure how far our reproduction is from the reference, per breakpoint.
 *
 *   npx tsx scripts/design-diff.ts --ref=./_ref/agenciy --url=http://localhost:3100/
 *
 * This is the half that actually closes the gap. design-extract.ts tells you what the
 * reference IS; this tells you how wrong you currently are, as a number, so "looks
 * about right" stops being the acceptance test.
 *
 * The loop: change one thing -> run this -> the number moves or it does not -> repeat.
 *
 * Reads the reference screenshots written by design-extract.ts (<ref>/screens/<bp>.png)
 * and shoots our build at identical viewports with identical settling, so the only
 * variable left is the design itself.
 *
 * Writes <out>/<bp>.diff.png (mismatches in magenta) and prints a per-breakpoint
 * mismatch percentage.
 */
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";

/** Must stay identical to design-extract.ts or the comparison is meaningless. */
const BREAKPOINTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1180, height: 820 },
  { name: "tablet", width: 810, height: 1080 },
  { name: "mobile", width: 390, height: 844 },
] as const;

/**
 * Per-channel tolerance before a pixel counts as different. 0.1 is the pixelmatch
 * default and is forgiving enough to ignore antialiasing and subpixel text rendering,
 * which we will never match exactly and should not chase.
 */
const THRESHOLD = 0.1;

function arg(name: string, fallback?: string): string {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (hit) return hit.slice(name.length + 3);
  if (fallback !== undefined) return fallback;
  console.error(`Missing required --${name}=`);
  process.exit(1);
}

async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * tsx transpiles through esbuild with keepNames on, rewriting named nested functions
 * into `__name(fn, "fn")` calls that do not exist in the page. Raw JS via { content }
 * so the shim cannot itself be rewritten. See design-extract.ts for the full story.
 */
async function installNameShim(page: import("playwright").Page): Promise<void> {
  await page.addInitScript({
    content: "window.__name = window.__name || function (f) { return f; };",
  });
}

/** Same scroll-then-settle as the extractor. Both sides must be treated identically
 *  or the diff measures our scroll handling instead of our design. */
async function autoScroll(page: import("playwright").Page, ms: number): Promise<void> {
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

/** How many reference bands exist for a breakpoint. */
async function refBandCount(ref: string, bp: string): Promise<number> {
  let n = 0;
  for (;;) {
    const p = path.join(ref, "screens", `${bp}.band${String(n).padStart(2, "0")}.png`);
    if (!(await exists(p))) return n;
    n++;
  }
}

async function main(): Promise<void> {
  const ref = path.resolve(arg("ref"));
  const url = arg("url");
  const out = path.resolve(arg("out", path.join(ref, "diff")));

  await mkdir(out, { recursive: true });
  const browser = await chromium.launch();
  const rows: Array<{ bp: string; pct: number; worst: number; worstBand: number; bands: number }> = [];

  for (const bp of BREAKPOINTS) {
    const nRef = await refBandCount(ref, bp.name);
    if (nRef === 0) {
      console.log(`${bp.name}: no reference bands, skipping`);
      continue;
    }

    const ctx = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
      deviceScaleFactor: 2,
      // Match the extractor exactly. See design-extract.ts on why reducedMotion is
      // not used: bands are shot in view, which settles reveals without it.
    });
    const page = await ctx.newPage();
    await installNameShim(page);
    await page.goto(url, { waitUntil: "load", timeout: 60_000 });
    await page.waitForTimeout(1500);
    await autoScroll(page, 4000);
    await page.waitForTimeout(600);

    const ourH = await page.evaluate(() => document.body.scrollHeight);
    const nOurs = Math.ceil(ourH / bp.height);
    if (nOurs !== nRef) {
      console.log(
        `${bp.name}: page height differs, ref ${nRef} bands / ours ${nOurs}. Comparing the ${Math.min(nRef, nOurs)} that overlap.`
      );
    }

    let totalBad = 0;
    let totalPx = 0;
    let worst = 0;
    let worstBand = 0;
    const n = Math.min(nRef, nOurs);

    for (let i = 0; i < n; i++) {
      // Shoot our band at the same scroll offset and settle delay as the reference,
      // or the diff measures our scroll handling instead of our design.
      await page.evaluate((y: number) => window.scrollTo(0, y), i * bp.height);
      await page.waitForTimeout(650);
      const ourBuf = await page.screenshot();

      const tag = String(i).padStart(2, "0");
      const refPng = PNG.sync.read(
        await readFile(path.join(ref, "screens", `${bp.name}.band${tag}.png`))
      );
      const ourPng = PNG.sync.read(ourBuf);

      // Bands are viewport-sized on both sides, so no cropping is needed. If these
      // ever disagree the two runs used different viewports, which is a real bug.
      if (refPng.width !== ourPng.width || refPng.height !== ourPng.height) {
        console.log(`  band ${tag}: size mismatch, skipping`);
        continue;
      }

      const diff = new PNG({ width: refPng.width, height: refPng.height });
      const bad = pixelmatch(refPng.data, ourPng.data, diff.data, refPng.width, refPng.height, {
        threshold: THRESHOLD,
        diffColor: [255, 0, 255],
        alpha: 0.25,
      });
      const px = refPng.width * refPng.height;
      const pct = (bad / px) * 100;
      totalBad += bad;
      totalPx += px;
      if (pct > worst) {
        worst = pct;
        worstBand = i;
      }

      await mkdir(path.join(out, bp.name), { recursive: true });
      await writeFile(path.join(out, bp.name, `band${tag}.diff.png`), PNG.sync.write(diff));
      await writeFile(path.join(out, bp.name, `band${tag}.ours.png`), ourBuf);
    }

    await ctx.close();
    const pct = totalPx ? (totalBad / totalPx) * 100 : 0;
    rows.push({ bp: bp.name, pct, worst, worstBand, bands: n });
    console.log(
      `${bp.name.padEnd(8)} ${pct.toFixed(2).padStart(6)}% off over ${n} bands   worst: band${String(worstBand).padStart(2, "0")} at ${worst.toFixed(1)}%`
    );
  }

  await browser.close();

  const avg = rows.length ? rows.reduce((s, r) => s + r.pct, 0) / rows.length : 0;
  console.log(`\naverage ${avg.toFixed(2)}% off across ${rows.length} breakpoints`);
  console.log(`diffs -> ${out}`);
  console.log("\nMagenta is where we are wrong. Go to the worst band first.");
  console.log("A band-count mismatch means total height diverged, which usually");
  console.log("means one section above is the wrong height and everything shifted.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
