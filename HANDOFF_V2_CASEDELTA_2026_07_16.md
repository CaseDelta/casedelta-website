# /v2 CaseDelta Homepage Handoff, 2026-07-16

Comprehensive, self-contained context for continuing work on the `/v2` homepage in a
fresh session. Read this top to bottom first, then read `CLAUDE.md` in this repo
(marketing-site house rules).

This document is the CANONICAL state of `/v2` as of 2026-07-16. It supersedes
`HANDOFF_SASONIX_CLONE_2026_07_16.md` for the current page state, but that older doc is
still the reference for the pixel-extraction toolchain and the raw Sasonix measurements,
so keep it. The even older `HANDOFF_HOMEPAGE_REDESIGN_2026_07_16.md` describes an
abandoned earlier approach (a from-scratch CaseDelta synthesis of three Framer templates)
and is historical only.

Everything load-bearing is written down because the next session inherits a fresh
scratchpad with none of the in-context findings.

---

## 0. TL;DR

`/v2` was a pixel-exact clone of the Sasonix Framer template homepage. Over this session
it was (a) refined against the live template in an audit round, and (b) RECOMPOSED into
CaseDelta's homepage using Camren's 7-beat progressive-disclosure framework, with real
CaseDelta copy dropped onto the Sasonix primitive kit.

The page is currently CaseDelta in COPY but still Sasonix in VISUAL IDENTITY (orange
accent, cream surfaces, Archivo/Geist fonts, and hotlinked placeholder imagery). The
CaseDelta brand paint (colors, fonts, real imagery) is the next major phase and was
architected as a `tokens.ts` swap. See section 8.

Everything is committed on branch `feat/homepage-redesign` (NOT pushed). Working tree is
clean. Dev server is (or was) running on port 3200; the page is at
`http://localhost:3200/v2`.

---

## 1. Where everything lives

- **Worktree (work here):**
  `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-website-hp`
  Branch `feat/homepage-redesign`. `npm ci` already run (real install; do not symlink
  `node_modules`, Next 16 Turbopack rejects it).
- **Main website repo:** `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-website`
  (`main` is production on Vercel, no CI). `/v2` is NOT on prod; it lives only on this
  branch in the `-hp` worktree.
- **Dev server:** `npm run dev -- -p 3200` from the `-hp` worktree. Page at
  `http://localhost:3200/v2`. Port 3100 may belong to a different session; do not kill it.
- **Live reference (the template we cloned):** `https://sasonix.framer.website/`. Drive it
  with the Playwright MCP (default `playwright`, `--isolated`) to measure anything. The
  browser is SHARED across sessions: open your own tab, close your own tabs by index,
  never `browser_close`.
- **Real CaseDelta copy source:** `components/marketing/HomeSections.tsx` and
  `lib/home-content.ts` in this same repo. This is where the authentic Delta copy (steps,
  tasks, comparison, testimonial, FAQ) came from. Reuse it, do not invent.
- **Design extraction refs (durable, gitignored):** `_ref/sasonix/` has `report.md`,
  `nodes.<bp>.json` (per-node computed styles + rects at 4 breakpoints), band
  screenshots, and `LIVE_EXTRACTION.md`. Offline reference for the raw Sasonix numbers.

---

## 2. Git state (IMPORTANT)

Branch `feat/homepage-redesign`, HEAD `3f6469b`, working tree CLEAN, NOT pushed (no
upstream). All work is local commits. This session's commits, newest first:

```
3f6469b fix(website): /v2 fidelity — remove FAQ, restore testimonial marquee with placeholders
1013463 feat(website): restore "Real stories" testimonial section (heading + card format)   [superseded by 3f6469b]
520117f feat(website): recompose /v2 to the 7-beat CaseDelta arc + new 3-tier pricing
0501906 fix(website): /v2 audit round 1 — fonts, hero, scroll, pricing, FAQ, footer, step dots
3f8e759 feat(website): pixel-exact Sasonix homepage clone at /v2
999f92b docs(website): exhaustive homepage-redesign handoff  [previous handoff commit]
```

- Nothing is pushed and there is no PR. `main` in `casedelta-website` is production; `/v2`
  is deliberately not there yet.
- Cohabitation: multiple Claude Code sessions run on this machine. This `-hp` worktree is
  ours. Do not `git checkout`/`reset`/`stash`/`clean` in the main `casedelta-website`
  worktree.
- Gates before any further commit: `npx tsc --noEmit` (passes) and `npm run build`
  (passes). `npm run lint` is BROKEN (Next 16 removed `next lint`); tsc + build are the
  real gates.

---

## 3. The framework (Camren's 7-beat spec) and section mapping

Camren's requested progressive-disclosure arc, verbatim:

```
1. Hero: Dream Outcome
2. First below the fold: What Delta Is
3. How it achieves this / how it integrates / onboards in 5 minutes
4. Testimonial
5. Comparison vs. Generic AI
6. Pricing
7. Reinforcement and CTA
```

Decisions Camren locked in when asked (these are binding, do not re-litigate):

- **Density:** STRICT 7 sections, one section per beat. Beat 3 is a SINGLE combined
  section (steps + integration hub together), not two.
- **Beat 3 emphasis:** LEAD with the "5-minute onboarding" claim as the headline. (Note:
  earlier competitive research, GH #3657, cautioned against boasting a 5-minute/any-
  platform claim because a stalled live demo discredits it. Camren chose to lead with it
  anyway. His call. Do not silently revert it.)
- **Trust strip:** KEEP the logo marquee (BrandStrip) under the hero as placeholder logos.
- **Unused primitives:** KEEP them in the repo as a library; do not delete.
- **Testimonials:** Camren explicitly WANTS the template's fabricated placeholder
  testimonials (Marcus Chen, Lucifer Jason, stock portraits) in the marquee for the design
  pass. See section 7 for the honesty guardrail.
- **NO FAQ.** The FAQ is not one of the seven beats. It was briefly on the page and was
  removed. Do not re-add it unless Camren asks. `Faq.tsx` stays as a library file.

### Section-to-primitive mapping (current, live in `Sasonix.tsx`)

| Beat | Section component | Heading on page |
|------|-------------------|-----------------|
| (chrome) | `Nav` | fixed top nav, CaseDelta wordmark |
| 1 | `Hero` | "Run more cases without hiring" |
| 1 (trust strip) | `BrandStrip` | "Purpose-built for personal injury, mass tort, and medical malpractice firms." + logo marquee |
| 2 | `AutomationSection` | "An associate that does the work, not just the answers" |
| 3 | `HowItWorks` (NEW) | "Connect your firm in five minutes" + integration hub |
| 4 | `Testimonials` | "Real stories from teams using CaseDelta" (placeholder marquee) |
| 5 | `WhySasonix` | "Delta vs a generic AI chatbot" |
| 6 | `Pricing` | "Priced per firm, not per seat" |
| 7 | `CtaFooter` | "Give your team back their evenings" + footer |

The exact render order lives in `components/v2/sasonix/Sasonix.tsx`.

---

## 4. File-by-file: `components/v2/sasonix/`

18 files. The ones IN the page are marked [ACTIVE]; the ones kept only as a library are
marked [LIBRARY].

### Infrastructure / shared
- `tokens.ts` [ACTIVE] — THE REBRAND LEVER. All colors, font CSS-var references, and the
  hero placeholder image URLs. Palette: orange `#ff7029`, orangeDeep `#ff6c02`, ink
  `#120a04`, ink2 `#5c4c3f`, cream `#fcf8f4`, cream2 `#f8f3ec`, card `#fefaf6`, hairline
  `rgba(44,24,11,0.10)`. Fonts resolve through `--sx-archivo` / `--sx-geist` / `--sx-mono`
  / `--sx-inter`. NOTE: there is no `hairlineStrong` token; use inline rgba for stronger
  lines (past tsc error).
- `kit.tsx` [ACTIVE] — shared primitives: `Container` (max-width 1360, 40px gutters, so
  content spans x80..x1360 = 1280 wide at 1440), `Eyebrow` (mono pill + orange left rule),
  `SectionHead` (centered eyebrow + Archivo 48px heading + Geist sub, with `titleMaxW` /
  `subMaxW` props).
- `Sasonix.tsx` [ACTIVE] — the assembler. Renders the 9 active pieces in beat order plus
  the shared hover-polish `<style>` (nav dim, logo soften, buttons scale 1.04). Its header
  comment documents the beat mapping. This is where you reorder or add/remove sections.
- `SmoothScroll.tsx` [ACTIVE] — hand-rolled momentum scroll (wheel lerp toward a target).
  `EASE = 0.12` (lower is heavier/slower; was 0.09, nudged up this session). Gated off for
  touch and reduced-motion. NOTE: it intercepts wheel, so programmatic `window.scrollTo`
  during Playwright measurement can get nudged; re-assert the scroll (call scrollTo twice)
  when measuring.

### Beat 1: Hero + trust strip
- `Nav.tsx` [ACTIVE] — fixed sticky nav. Transparent + white text over the hero,
  transitions to white-bg + dark-text + shadow when `scrollY > 880`. Wordmark "CaseDelta"
  (orange logo mark is placeholder). Links: Features, Pricing, Security, Contact. Actions:
  "Log in" + "Book a demo". All hrefs are `#` placeholders.
- `Hero.tsx` [ACTIVE] — full-bleed placeholder photo + centered copy + a straddling
  dashboard PNG and a "code card" composite (all Sasonix placeholder assets from
  `tokens.ts` SX_IMG). Copy: H1 "Run more cases without hiring" (Archivo 500, 60px, -2px,
  paddingTop 147 to match the live), sub about Delta working inside your tools with team
  approval, buttons "Book a demo" + "See how it works". Positional constants (DASH_TOP
  592, CODE_TOP 543, etc.) are measured from the live and left as tunables.
- `BrandStrip.tsx` [ACTIVE] — left label + infinite logo marquee (5 placeholder SVG logos
  x2). Label reworded to "Purpose-built for personal injury, mass tort, and medical
  malpractice firms." Logos are still Sasonix placeholders (Camren approved keeping them).

### Beat 2: What Delta Is
- `AutomationSection.tsx` [ACTIVE] — LEFT-aligned heading "An associate that does the work,
  not just the answers" + 3 large stacked feature cards (cream `#fefaf6`, radius 22, 1280
  wide, 654 tall, 50/50 split: icon chip + Archivo 32px heading + Geist sub + 3-item
  checklist on the left; placeholder photo + floating panel on the right). The three cards
  now say: "Drives the tools you already use", "Builds cited chronologies in minutes",
  "Learns how your firm works". The right-side photos and code/token panels are STILL
  Sasonix placeholder imagery.

### Beat 3: How it works + integrates + onboards in 5 minutes (NEW combined section)
- `HowItWorks.tsx` [ACTIVE, NEW this session] — a single section that combines two Sasonix
  primitives. Top: centered `SectionHead` eyebrow "Onboarding", title "Connect your firm
  in five minutes", sub about no engineer/no migration. Middle: 3 lighter step cards
  (cream, glowing "Step 0X" pill + title + copy, NO illustration) with copy pulled from
  the real `HomeSections` STEPS (connect the tools you use / hand it work in plain English
  / review, approve, and it learns). Bottom: the integration hub, with an Eyebrow "Works
  on top of your stack", a sub-line, a central orange Delta mark, connector SVG, and 5 tool
  tiles using REAL integration logos from `/public/assets/integrations/`: Clio
  (`clio-icon.png`), MyCase (`mycase-icon.jpg`), Filevine (`filevine-icon.svg`), Google
  Drive (`google-drive.svg`), Gmail (`gmail.svg`). This is the ONE place we already use
  real (not placeholder) imagery. The glowing step dot uses the `sx-dot-pulse` keyframes
  defined in this file's `<style>`.

### Beat 4: Testimonial
- `Testimonials.tsx` [ACTIVE] — heading "Real stories from teams using CaseDelta" + an
  auto-scrolling marquee of quote + portrait cards (cream, radius 24, 660x426). CONTENT IS
  PLACEHOLDER at Camren's request: fabricated names (Marcus Chen "Managing Partner,
  NovaTech Legal"; Lucifer Jason "Partner, Q.tube Law"), stock portrait photos hotlinked
  from the Sasonix CDN, and CaseDelta-branded placeholder quotes. See section 7 for the
  honesty guardrail and the one real quote we have.

### Beat 5: Comparison vs Generic AI
- `WhySasonix.tsx` [ACTIVE] — centered eyebrow "Why Delta?" + heading "Delta vs a generic
  AI chatbot" + a 3-column comparison table (Features | Delta | Generic AI). The Delta
  column is highlighted with an orange border and orange checks; the Generic AI column
  shows greyed crosses on every row. Rows use the real `COMPARE` "shape" argument: where
  it works, what you get back, your documents, next steps, your firm.

### Beat 6: Pricing (NEW MODEL, see section 5)
- `Pricing.tsx` [ACTIVE] — eyebrow "Pricing" + heading "Priced per firm, not per seat" +
  sub about flat pricing by attorney count. Three tier cards (the middle highlighted orange
  with a "Most popular" pill), a contact line for 20+ attorneys, and a shared "Every plan
  includes" feature block. Full details in section 5.

### Beat 7: Reinforcement + CTA
- `CtaFooter.tsx` [ACTIVE] — CTA band on a faint grid background: heading "Give your team
  back their evenings", sub about booking a walkthrough on your real matters, buttons
  "Book a demo" + "See pricing". Then the footer: CaseDelta wordmark + blurb, 3 link
  columns (Product / Company / Legal at measured x-positions via grid `740fr 166fr 219fr
  155fr`), copyright, and real brand-glyph socials (X, Facebook, Instagram, LinkedIn). The
  footer has the layered orange "sunrise" glow (stacked blurred circles) blooming from the
  bottom-center edge. See section 6 for the audit details on the glow and footer.

### [LIBRARY] not currently rendered (kept for future pages)
- `AutomationFlow.tsx` — 3 cream cards with isometric line-art ("Simple instructions...").
- `HowToWork.tsx` — the standalone 3-step-card section (its step cards + glowing dot were
  the basis for the steps inside `HowItWorks.tsx`).
- `SmartFlow.tsx` — full-width photo + 4 floating node PNGs + connector SVG + 4-up text.
- `Integrations.tsx` — the standalone hub-and-spoke section (basis for the hub in
  `HowItWorks.tsx`; uses Sasonix placeholder tool glyphs, not the real logos).
- `Faq.tsx` — the animated single-open accordion (grid-rows 0fr to 1fr, chevron rotate,
  first row open). Removed from the page this session. Ready to drop back in if wanted.

---

## 5. Pricing model (NEW this session, IMPORTANT)

Camren changed pricing mid-session. The model on `/v2` is now:

- **Priced per FIRM by ATTORNEY count, flat monthly, regardless of staff size.**
- Three tiers, in `Pricing.tsx` `TIERS`:
  - Up to 5 attorneys: `$999`/month
  - Up to 10 attorneys: `$1,999`/month (highlighted, "Most popular")
  - Up to 20 attorneys: `$3,999`/month
- More than 20 attorneys: a contact line ("Contact us for a custom plan").
- The differentiator message is "Priced per firm, not per seat. Bring your whole staff,
  paralegals and all, at no extra cost." This is the wedge against per-seat research tools.
- The value list is identical across tiers, so it renders ONCE below the cards as "Every
  plan includes" rather than repeating per card.

**CONFLICT TO RESOLVE (flagged, not yet actioned):** the existing live site and Camren's
memory record `$349 per user, per month` as the published, load-bearing price (site-wide
across `lib/comparisons.ts`, `lib/answers.ts`, `app/pricing/*`, and the memory
`website_belowfold_subpages_overhaul_2026_07_02`). The new 3-tier attorney-count model
was applied ONLY to `/v2`. Two open questions for Camren:
1. Should the LIVE marketing site + pricing pages be migrated to the 3-tier model?
2. Should the memory be updated so future sessions do not revert to $349/user?
Do not propagate to the live site or overwrite the memory until Camren confirms the new
model is final.

---

## 6. Audit round 1 (what was refined against the live template)

Before the recomposition, we did a fidelity pass against `sasonix.framer.website`. These
changes are baked in and are worth knowing:

- **Fonts (the big finding):** the live site serves Archivo from Fontshare STATIC masters,
  not Google Fonts. Google's variable Archivo measurably diverges at weights 400 and 700
  (500 matched). Every heading on the page is weight 500. We downloaded the live site's
  exact Archivo woff2 files (400/500/700) and self-host them via `next/font/local` in
  `app/v2/layout.tsx`, files in `app/v2/fonts/`. Geist and JetBrains Mono already matched
  the live (same upstream) and stay on `next/font/google`. Result: heading type is now
  byte-identical to the live template. If you rebrand fonts, this is where they change.
- **Hero position:** copy block dropped to y=147 (was 128), sub/button gaps tightened, to
  match the live hero.
- **Scroll:** `SmoothScroll` EASE 0.09 to 0.12 (lighter/faster).
- **Step 0X dots:** the live pill has a `blur(6px)` `#ff6c02` glow layer behind a solid
  dot; reproduced, plus a gentle staggered pulse (reduced-motion aware). This lives in
  `HowItWorks.tsx` now (and in the library `HowToWork.tsx`).
- **Footer columns:** packed to the right at the live's exact x-positions (grid
  `740fr 166fr 219fr 155fr` in `CtaFooter.tsx`).
- **Footer socials:** replaced ugly letter-boxes with real brand-glyph SVGs (X, Facebook,
  Instagram, LinkedIn).
- **Footer glow:** the live glow is a STACK of concentric blurred orange circles (outer
  faint halo, orange mids, near-white core) centered on the bottom edge and clipped by
  `overflow:hidden`. Reproduced in `CtaFooter.tsx` `FooterGlow`. Its vertical position
  (`bottom: -30`) is a tunable.
- **Pricing (audit version):** was rebuilt to the live's 2-card cream+orange layout, THEN
  replaced this session by the 3-tier model (section 5).
- **FAQ (audit version):** native `<details>` was replaced with an animated single-open
  accordion, THEN removed from the page (not a requested beat). The animated component
  survives in `Faq.tsx`.

---

## 7. Honesty rules and the placeholder-testimonial guardrail

Marketing-site house rules (`casedelta-website/CLAUDE.md` and Camren's standing
feedback), all of which apply on the eventual REBRAND / ship:
- Delta is NEVER gendered (no she/her). Keep copy neutral.
- NO em dashes anywhere.
- Never claim "no third-party LLM / data never leaves our infrastructure" (prod runs on
  enterprise providers). Frame security like Clio/MyCase honestly do.
- Delta drafts on instruction and a human reviews/approves; no autonomy overclaims.
- Simple, value-forward sentences; lead with the quantified gift.
- NEVER invent social proof for a PUBLIC ship. Website social proof is real; ask before
  removing.

**The testimonial placeholder exception:** Camren explicitly asked to use the template's
FABRICATED testimonials (Marcus Chen, Lucifer Jason, stock portraits) as PLACEHOLDERS
during this design pass, so the marquee reads full. This is fine for the local, unpublished
mockup because he authorized it and it is not shipped to any audience. `Testimonials.tsx`
carries an in-file warning that this content is placeholder and MUST be swapped before
`/v2` goes anywhere public. The ONE real, attributable quote we have (do not lose it):

```
"Delta gives us back about five hours a week, and that time goes straight back into our cases."
  Kirschbaum & Nowotny, LLC   (Overland Park, KS)
```

If Camren provides one or two more real, attributable quotes, drop them into
`Testimonials.tsx` `CARDS` (the marquee already scrolls with 2+ cards) and remove the
fabricated ones.

**Session lesson (behavioral):** build the sections exactly as Camren specifies. This
session I over-applied the honesty rule (replaced his wanted placeholder testimonials with
a single real card) and added an unrequested FAQ. Both were wrong. Surface honesty
concerns as a flag ALONGSIDE doing what he asked, not as a reason to change the spec.

---

## 8. The rebrand plan (next major phase, tokens.ts)

The whole point of `tokens.ts` is that the CaseDelta visual rebrand is a token + asset
swap, not a structural rewrite:
1. **Colors** in `tokens.ts`: orange `#ff7029` to CaseDelta blue (`#2f6fe0` is the blue
   used on the live site's kit); cream surfaces to CaseDelta off-whites; ink to `#14171f`.
   Every component reads these tokens, plus a handful of inline `#ff7029` / `#ff6c02` /
   `rgba(255,112,41,...)` literals in the glow, hub mark, pricing card, comparison
   highlight, and step-dot glow that must be swept for the orange-to-blue change (grep for
   `ff7029`, `ff6c02`, `255, ?112, ?41`, `255,108,2`).
2. **Fonts** in `app/v2/layout.tsx` + `tokens.ts`: today Archivo (display, self-hosted) +
   Geist (body) + JetBrains Mono (eyebrows) + Inter (small UI). The live CaseDelta kit uses
   Newsreader serif + Hanken Grotesk. Camren's call whether to keep Archivo or move to the
   CaseDelta typefaces.
3. **Imagery** (the big lift): replace all `framerusercontent.com` hotlinked placeholders
   with CaseDelta-owned, self-hosted assets. See section 9 for the full list. The
   integration hub in `HowItWorks.tsx` ALREADY uses real logos and needs no change.
4. **Honesty on rebrand:** everything in section 7 becomes hard. The fabricated
   testimonials MUST be replaced with real ones or removed.

Do the rebrand as a deliberate phase, only when Camren asks. Until then the page stays
Sasonix-styled on purpose.

---

## 9. Placeholder assets still to swap (all hotlinked from Sasonix's CDN)

These are Sasonix's copyrighted assets, used only as build-time placeholders. They MUST be
replaced with CaseDelta-owned, self-hosted imagery before `/v2` ships anywhere.
- **Hero** (`tokens.ts` SX_IMG): hero background photo, dashboard PNG, code-card PNG,
  code-wrapper PNG.
- **What Delta Is** (`AutomationSection.tsx`): 3 right-side photos + the code/token/
  dashboard floating panels.
- **Testimonials** (`Testimonials.tsx`): 2 stock portrait photos (AND the fabricated
  names/quotes, per section 7).
- NOT placeholder (already real, keep): the 5 integration logos in `HowItWorks.tsx`
  (`/public/assets/integrations/`), the footer social glyphs, and the BrandStrip logos are
  Sasonix placeholders that Camren chose to keep for now.

---

## 10. How to refine or add sections (the measurement workflow)

This is how the clone and audit were done and how any fidelity work should continue.
Eyeballing screenshots gave a bad first attempt; measuring the live DOM is what worked.

1. Playwright MCP, default `playwright` (`--isolated`). Open your own tab, close by index,
   never `browser_close`. `browser_navigate` to `https://sasonix.framer.website/`,
   `browser_resize` to 1440x900.
2. Framer lazy-loads and SSRs all breakpoint variants at once. Scroll the whole page in an
   `evaluate` loop first to trigger loads, then measure the visible desktop variant.
3. `browser_evaluate` to dump per-section: walk `[data-framer-name="X"]` (Framer labels
   every group), read computed styles + `getBoundingClientRect`, and image `src`
   (`framerusercontent.com/images/<hash>`, strip `?` params for full res).
4. Build/adjust the component to the exact numbers.
5. Screenshot yours (`http://localhost:3200/v2`) AND the live at the same scroll; compare;
   tune. MCP screenshots land in the MCP server cwd (currently the `casedelta-cloud` repo
   root), NOT `.playwright-mcp/`. Read them from there, and clean up your temp PNGs when
   done (they pollute the `casedelta-cloud` root).

Section-name map and raw measurements for the Sasonix live site are in
`HANDOFF_SASONIX_CLONE_2026_07_16.md` sections 5 and 4, and in `_ref/sasonix/`.

---

## 11. Run / gates / quick reference

```
# Worktree + dev server
cd /Users/camrenhall/Documents/CaseDelta/Github/casedelta-website-hp
npm run dev -- -p 3200
# page: http://localhost:3200/v2

# Gates (lint is broken on Next 16; these are the real gates)
npx tsc --noEmit
npm run build

# Live reference to measure against (Playwright MCP, resize 1440x900)
#   https://sasonix.framer.website/

# The rebrand lever
#   components/v2/sasonix/tokens.ts   (colors, fonts, hero placeholder image URLs)

# The assembler / section order
#   components/v2/sasonix/Sasonix.tsx

# Self-hosted display font (matches the live template exactly)
#   app/v2/fonts/archivo-{400,500,700}.woff2  loaded in app/v2/layout.tsx
```

Commit style: stage ONLY your own files (never `git add -A`), commit on
`feat/homepage-redesign`. End commit messages with the Co-Authored-By trailer.

---

## 12. Open items / candidate next steps

Nothing is required; these are the live threads for the next session.

1. **Continue improvements/modifications on the 7-beat structure** (the stated reason for
   this handoff). Likely targets: the hero visual/demo panel, the beat-2 feature-card
   visuals, spacing/rhythm polish, mobile/tablet responsive passes (the page is tuned for
   desktop 1440 only right now).
2. **The brand paint (tokens.ts rebrand)** when Camren is ready. Section 8.
3. **Real testimonials** to replace the placeholders. Section 7.
4. **Pricing propagation decision** (live site + memory). Section 5.
5. **Push / PR** when the page is ready to leave the local branch. It is currently local
   only, and `/v2` is not on prod.

---

## 13. Behavioral notes for the next session (from Camren, this session)

- Build the sections EXACTLY as specified. Do not drop, add, or reshape sections based on
  your own judgment; raise concerns as a flag while still delivering the spec.
- The 5-minute-onboarding lead in beat 3 is intentional despite the prior competitive
  caution. Leave it.
- Placeholder content (including the fabricated testimonials) is wanted for the design pass
  and is fine on this unpublished mockup. The honesty rules bite on the eventual public
  ship, not on the local mockup.
- No FAQ on this page.
- No em dashes, ever. Delta is never gendered. These hold even in placeholder copy.
