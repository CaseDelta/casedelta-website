# Sasonix Clone Handoff, 2026-07-16

Exhaustive context for continuing the pixel-exact Sasonix homepage clone in a fresh
session. Read this top to bottom first. Then read `CLAUDE.md` in this repo
(marketing-site house rules). The previous handoff
(`HANDOFF_HOMEPAGE_REDESIGN_2026_07_16.md`) describes an EARLIER, now-abandoned
approach (a CaseDelta-branded synthesis of three templates); this doc supersedes it.

Everything load-bearing is written down because the next session inherits a fresh
scratchpad with none of the in-context findings.

---

## 0. TL;DR

We built a **pixel-exact clone of the Sasonix Framer marketplace template's homepage**,
from scratch, as clean React in this Next.js repo, living at the route **`/v2`**. It
reproduces all 13 sections of the live site (`https://sasonix.framer.website/`) at
desktop 1440: layout, spacing, type, color, card mechanics, marquees, the hub-and-spoke,
the comparison table, pricing, FAQ, CTA, footer, and the interaction polish (momentum
scroll, sticky nav with scroll transition + shadow, hover animations, hero-graphic fade).

The user (Camren) confirmed it "looks really good" and wants to move into an **audit +
refine loop** (he inspects, tells us what to adjust), and later **build other pages**
and **rebrand to CaseDelta**. The clone is currently Sasonix-branded on purpose (orange,
Archivo/Geist fonts, Sasonix copy, Sasonix's hotlinked images) — the rebrand is a
deliberate later phase and was architected as a **token swap** (see section 6).

**Nothing is committed yet.** All the clone work is uncommitted on
`feat/homepage-redesign`. See section 2.

---

## 1. Where everything lives

- **Worktree (work here):**
  `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-website-hp`
  Branch `feat/homepage-redesign`. `npm ci` already run (real install; do not symlink
  node_modules, Next 16 Turbopack rejects it).
- **Main website repo:** `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-website`
  (`main` is production on Vercel, no CI). This clone is NOT on prod.
- **Dev server:** was running on **port 3200** (`npm run dev -- -p 3200`). The clone is
  at **http://localhost:3200/v2**. Restart if needed (see section 11). Port 3100 is a
  different session's dev server; do not kill it.
- **Live reference:** `https://sasonix.framer.website/` (the Sasonix template's live
  preview; confirmed from the Framer marketplace page
  `https://www.framer.com/community/marketplace/templates/sasonix/`). Drive it with
  Playwright MCP to extract/measure anything.
- **Design extraction refs (durable, gitignored):** `_ref/sasonix/` has `report.md`,
  `nodes.<bp>.json` (per-node computed styles + rects at 4 breakpoints), band
  screenshots `screens/desktop.band<NN>.png`, plus `LIVE_EXTRACTION.md` (my notes from
  live Playwright extraction). These are the offline reference. `_ref/perform/` and
  `_ref/agentik/` are from the abandoned synthesis approach — ignore them.

---

## 2. Current git state (IMPORTANT)

```
branch: feat/homepage-redesign   (HEAD = 999f92b, the previous handoff commit)
uncommitted:
  M components/ClientLayout.tsx     <- added "/v2" to the nav-suppression list
  ?? app/v2/                        <- the /v2 route (layout.tsx + page.tsx)
  ?? components/v2/                 <- the whole clone (components/v2/sasonix/*)
```

- **No `package.json` changes.** The smooth scroll is hand-rolled (no Lenis dependency).
- The earlier "synthesis" experiment (components/v2/kit.tsx, Nav.tsx, Hero.tsx,
  SectionsA/B.tsx, HomeV2.tsx) was DELETED and replaced by `components/v2/sasonix/`.
- **First thing to consider next session:** commit this work so it's not lost
  (`git add app/v2 components/v2 components/ClientLayout.tsx` then commit on the branch;
  do NOT `git add -A`). Gate before any PR: `npx tsc --noEmit` (passes) + `npm run build`.
  `npm run lint` is broken (Next 16 removed `next lint`); tsc + build are the gates.
- Cohabitation: multiple Claude Code sessions run on this machine. This `-hp` worktree
  is ours. Do not `git checkout`/`reset`/`stash`/`clean` in the main
  `casedelta-website` worktree.

---

## 3. What's built (file-by-file)

Route: `app/v2/page.tsx` renders `<Sasonix/>`. `app/v2/layout.tsx` loads the 4 fonts
(next/font/google) scoped to `/v2`. `components/ClientLayout.tsx` suppresses the global
site navbar on `/v2` (like it does for `/` and `/demo`).

All clone code is in **`components/v2/sasonix/`**:

| File | What it is |
|------|-----------|
| `tokens.ts` | **The rebrand lever.** All colors, fonts, and the placeholder image URLs. Swap here to rebrand. |
| `kit.tsx` | Shared primitives: `Container` (max-width 1360, 40px gutters → 1280 content), `Eyebrow` (mono pill + orange left rule), `SectionHead` (centered eyebrow + Archivo 48px heading + Geist sub). |
| `Sasonix.tsx` | Assembles all sections in order + the global hover styles (`.sx-navlink`, `.sx-logo`, `.sx-btn`). |
| `SmoothScroll.tsx` | Hand-rolled momentum scroll (lerp toward wheel target, ease 0.09). Gated off for touch + reduced-motion. |
| `Nav.tsx` | Page-level `position:fixed` sticky nav. Transparent/white-text over hero, transitions to white-bg/dark-text + drop shadow when `scrollY > 880`. |
| `Hero.tsx` | Full-bleed photo + centered Archivo 60px headline + sub + 2 buttons + straddling `MattersPanel`/dashboard PNG + `CodeCard` composite. Dashboard has a bottom mask fade. |
| `BrandStrip.tsx` | Left label + infinite logo marquee (5 SVGs ×2). |
| `AutomationFlow.tsx` | Centered head + 3 cream cards (radius 24) with placeholder isometric line-art (`IsoArt`). |
| `AutomationSection.tsx` | LEFT-aligned head + 3 stacked feature cards (radius 22 + border, 1280×654, 50/50 split): icon chip + heading + checklist left; photo + floating panel right. Card 0 = `CodePanel` composite. |
| `HowToWork.tsx` | LEFT-aligned head + 3 step cards (radius 22 + border): "Step 0X" mono pill + title + desc + product-UI illustration at top:229. |
| `SmartFlow.tsx` | Full-width photo (radius 24) + 4 floating node PNGs at measured offsets + connector-line SVG + 4-up text row (each in a cream card). |
| `Integrations.tsx` | Centered head + hub-and-spoke: central orange mark + connector SVG + 5 cream tool tiles. |
| `WhySasonix.tsx` | Centered head + 3-col comparison table (Features/Sasonix/Others), Sasonix column highlighted with orange border, orange checks vs grey checks/crosses. |
| `Testimonials.tsx` | Centered head + marquee of 2 quote+photo cards (Marcus Chen, Lucifer Jason). |
| `Pricing.tsx` | Eyebrow + head + sub + functional Monthly/Yearly toggle (SAVE 20%) + 2 plan cards ($49 Starter, $99 Professional highlighted) + wide contact card. |
| `Faq.tsx` | Centered head + sub + 5 native `<details>` accordion rows + "Contact us". |
| `CtaFooter.tsx` | CTA band (grid bg + orange glow, 2 buttons) + footer (logo + blurb + 3 link cols + copyright + socials). |

---

## 4. Fonts (self-hosted via next/font)

Loaded in `app/v2/layout.tsx`, all free/OFL, exposed as CSS vars used by `tokens.ts`:
- **Archivo** (`--sx-archivo`) — display/headings (all H2 are Archivo 500, 48px, -1px,
  lh 55.2; hero H1 = 60px, -2px, lh 66).
- **Geist** (`--sx-geist`) — body + buttons.
- **JetBrains Mono** (`--sx-mono`) — the eyebrow-pill labels.
- **Inter** (`--sx-inter`) — small UI labels inside product panels.

---

## 5. The extraction method (how to refine / add pages)

This is the workflow that produced the clone and MUST be how refinements/new pages are
done. Eyeballing screenshots produced a bad first attempt; measuring the live DOM is
what worked.

**Toolchain:** Playwright MCP driving a real browser. The default `playwright` MCP is
`--isolated`; use it. The browser is SHARED across sessions — open your own tab, close
your own tabs by index, never `browser_close`.

**Recipe (repeat per section):**
1. `browser_navigate` to `https://sasonix.framer.website/`, `browser_resize` to 1440x900.
2. Scroll through the page in an `evaluate` loop first (Framer lazy-loads; and it SSRs
   all breakpoint variants into the DOM at once — measure the visible desktop variant).
3. `browser_evaluate` to dump per-section: `document.querySelector('[data-framer-name="X"]')`
   then walk text nodes (tag/text/font/size/weight/letterSpacing/lineHeight/color),
   images (`img.src` → `framerusercontent.com/images/<hash>.<ext>`, strip `?` params for
   full res), and `getBoundingClientRect` for exact x/y/w/h. **Framer labels every group
   with `data-framer-name`** — this is the key to scoping.
4. Build the section as clean React to those exact numbers.
5. Screenshot mine (`http://localhost:3200/v2`) AND the live at the same scroll; compare;
   tune; repeat. (Screenshots the MCP writes land in the MCP server cwd, currently the
   casedelta-cloud repo root, NOT `.playwright-mcp/` — find them there.)

**Section map (Framer names, page-absolute top / height @1440):**
```
Hero Section            0     969   (Hero.tsx)   full-bleed photo + dashboards straddle to ~1053
Brand Section           969   254   (BrandStrip) label + logo marquee, vcenter y1053
Automation Flow Section 1223  822   (AutomationFlow)  "Simple instructions..." + 3 cream cards r24
Automation Section      2045  2392  (AutomationSection) "Powerful features..." + 3 feature cards h654
How to Work Section     4437  876   (HowToWork)  "Let's break down..." + 3 step cards
Smart Process Flow      5314  876   (SmartFlow)  photo + 4 nodes + 4-up text cards
Integrations Section    6189  753   (Integrations)  "Connect all your tools" hub-and-spoke
Why Sasonix Section     6942  706   (WhySasonix)  "Sasonix vs other tools" comparison
Testimonial Section     7648  800   (Testimonials)  "Real stories..." marquee
Pricing Section         8448  1160  (Pricing)  "Get started with transparent plan"
Faq Section             9609  799   (Faq)  "Got questions?"
Cta & Footer            10407 979   (CtaFooter)  "Automate your business..." + footer
```

**Key measured constants (already baked into the components; here for reference):**
- Palette: orange `#ff7029`; ink `#120a04`; secondary text `#5c4c3f`; page cream
  `#fcf8f4`; deeper cream `#f8f3ec`; feature-card cream `#fefaf6`; black `#020202`.
- Container: content spans x80..x1360 (max-width 1360 + 40px padding on a 1440 viewport).
- Nav: flex space-between row, content 80..1360, 32px link gaps, vcenter y51,
  height ~101 when white.
- Section vertical padding is generally `0 0 120px` (each section's top gap comes from
  the previous section's 120px bottom padding); section heads are centered EXCEPT the
  Automation Section ("Powerful features", left-aligned x80) and How to Work
  ("Let's break down...", left-aligned x80).
- Hero H1 wraps at max-width 620. Automation Flow / Integrations / Pricing heads use
  titleMaxW ~520-560 to match the live 2-line wraps.

---

## 6. The rebrand plan (later phase — do NOT do yet unless asked)

The whole point of `tokens.ts` is that the CaseDelta rebrand is a **token + content
swap, not a structural rewrite**:
1. **Colors** in `tokens.ts`: `orange`→CaseDelta blue `#2f6fe0`; the cream surfaces →
   CaseDelta's off-whites; ink → `#14171f`. Every component reads these.
2. **Fonts** in `tokens.ts` + `app/v2/layout.tsx`: Archivo→Newsreader serif (or keep a
   sans — Camren's call), Geist→Hanken, keep a mono for eyebrows.
3. **Copy**: replace Sasonix strings in each component with CaseDelta copy (the real
   below-fold copy from the OLD site lives in
   `components/marketing/HomeSections.tsx` + `lib/home-content.ts`).
4. **Assets** in `tokens.ts` `SX_IMG` + the per-file `IMG(...)` hotlinks: replace all
   `framerusercontent.com` URLs (see section 7) with CaseDelta-owned images, self-hosted
   in `/public`.
5. **Honesty rules (from casedelta-website/CLAUDE.md) apply on rebrand:** never invent
   social proof (the current Marcus Chen / Lucifer Jason testimonials are the template's
   fiction and MUST be replaced with real, attributable ones or removed); Delta is never
   gendered; no em dashes; never claim "no third-party LLM / data never leaves"; anchor
   to a salary, teammate-not-tool.

---

## 7. Placeholder assets to swap (all hotlinked from Sasonix's CDN)

Currently hotlinked from `framerusercontent.com` so the pixel diff stays exact. These
are Sasonix's copyrighted assets, used only as build-time placeholders and MUST be
replaced (with CaseDelta-owned imagery, self-hosted) before this ships anywhere. Do not
treat any of these as CaseDelta's.
- **Hero** (`tokens.ts` SX_IMG): hero bg photo, dashboard PNG, code-card PNG, code-wrapper.
- **Feature cards** (AutomationSection.tsx): 3 photos + code/token/dashboard panels.
- **How to Work** (HowToWork.tsx): 3 product-UI illustration PNGs.
- **Smart Flow** (SmartFlow.tsx): bg photo + 4 node PNGs.
- **Integrations** (Integrations.tsx): 5 tool-glyph PNGs.
- **Testimonials** (Testimonials.tsx): 2 portrait photos.
- **Automation Flow** illustrations are NOT hotlinked — they're my own placeholder
  line-art (`IsoArt`), same footprint (132×167) as Sasonix's inline SVGs.

---

## 8. Interaction/polish details (already applied, per Camren's feedback)

- **Smooth scroll** (`SmoothScroll.tsx`): momentum-damped, ease 0.09. If asked to make it
  heavier/lighter, change `EASE` (lower = heavier).
- **Sticky nav**: transparent + white text over the hero → white bg + dark text +
  `box-shadow: 0 10px 30px -12px rgba(26,23,18,0.16)` when `scrollY > 880`.
- **Hover**: nav links/logo fade to 0.6/0.82; all `.sx-btn` scale to 1.04 (ease-out).
- **Hero graphics fade**: the dashboard PNG has
  `mask-image: linear-gradient(to bottom, #000 60%, transparent 92%)` so it dissolves
  into the brand ticker below instead of colliding.
- **Card edges** (Camren preference, slightly stronger than the live): feature cards
  radius 22 + `1px rgba(26,23,18,0.10)` border; step cards radius 22 +
  `1px rgba(26,23,18,0.12)` border; Smart Flow text cards radius 12 + subtle border.

---

## 9. How to continue (the audit/refine loop)

Camren will scroll `/v2` and give targeted feedback ("this card needs X", "this spacing
is off"). For each:
1. If it's a "make it match the live" fidelity note → **measure the live element** with
   Playwright (`data-framer-name` scope + computed styles/rects), then adjust the
   component to the exact number.
2. If it's an aesthetic-preference note that deviates from the live (like the card-edge
   rounding) → just apply it; note in the code comment that it deviates from the live.
3. Re-screenshot mine vs live at the same scroll; confirm.

**Other pages:** the marketplace template has more pages (Pricing, Case Studies,
Contact, blog/case-study detail, 404). None are extracted yet. To build one: find its
live URL (Sasonix's other pages are likely `sasonix.framer.website/<slug>` — verify via
the "All Pages" nav dropdown on the live site), then run the same extraction recipe,
build under a new `app/v2/<page>/page.tsx` reusing `components/v2/sasonix/kit.tsx` + `Nav`
+ `CtaFooter`.

---

## 10. Gotchas & house rules

- **Marketing-site rules** (`casedelta-website/CLAUDE.md`): `main` is production, NO CI;
  iterate locally in a real browser before committing; no em dashes; Delta never
  gendered; never invent social proof; never claim "no third-party LLM". These bite on
  the REBRAND, not the Sasonix clone.
- **`npm run lint` is broken** (Next 16). Gates: `npx tsc --noEmit` + `npm run build`.
- **Framer SSRs all breakpoint variants at once** — when extracting, measure the visible
  desktop variant, and extract per-breakpoint separately (resize) for responsive work.
  The clone is currently tuned for **desktop 1440 only**; mobile/tablet responsive passes
  are NOT done yet (each component has some responsive CSS but it hasn't been verified
  against the live's tablet/mobile variants).
- **MCP screenshots** land in the MCP server's cwd (the casedelta-cloud repo root), not
  `.playwright-mcp/`. Read them from there.
- **`tokens.ts` has no `hairlineStrong`** — only `hairline`. Use inline rgba for stronger
  lines (a past tsc error).
- **Do not add Lenis or any dep** without cause; the hand-rolled smooth scroll works.

---

## 11. Quick reference

```
# Worktree + dev server
cd /Users/camrenhall/Documents/CaseDelta/Github/casedelta-website-hp
npm run dev -- -p 3200
# clone is at http://localhost:3200/v2

# Gates (lint is broken; these are the real gates)
npx tsc --noEmit
npm run build

# Live reference to extract/measure against
#   https://sasonix.framer.website/   (Playwright MCP, resize 1440x900)

# Rebrand lever
#   components/v2/sasonix/tokens.ts   (colors, fonts, placeholder image URLs)
```

Reference screenshots to read first when resuming: `_ref/sasonix/screens/desktop.band00.png`
through `band12.png` (each ~viewport band of the live homepage), and
`_ref/sasonix/LIVE_EXTRACTION.md`.
