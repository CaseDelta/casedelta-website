# Homepage Redesign Handoff, 2026-07-16

Exhaustive session context for continuing the CaseDelta marketing-site homepage
redesign in a fresh session. Read this top to bottom before doing anything. Then
read `CLAUDE.md` in this repo (marketing-site rules) and, for below-the-fold copy
history, `HANDOFF_WEBSITE_2026_07_15.md` (the prior hero rework, now being
superseded, see "Branch topology" below).

There is a lot here on purpose. This was a long working session and the next
session inherits a fresh scratchpad with none of the in-context findings, so
everything load-bearing is written down.

---

## 0. TL;DR

We are rebuilding the CaseDelta homepage as the next iteration of the real
`casedelta.com`, synthesizing three Framer marketplace templates into CaseDelta's
own brand. We built a reusable design-extraction toolchain, extracted all three
templates plus a reference, locked the design decisions with Camren, agreed the
information architecture, and set up an isolated worktree with a dev server. No
homepage code has been written yet. The next concrete step is to build the new
hero (with a live serif/sans font toggle) and show Camren both font modes.

---

## 1. Where everything lives

- **Main website repo:** `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-website`
  (GitHub `CaseDelta/casedelta-website`). `main` is production on Vercel, no CI.
- **The redesign worktree (work here):**
  `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-website-hp`
  - Branch: `feat/homepage-redesign`, branched from `feat/how-it-works-graphic` at
    commit `2439a1e`.
  - `npm ci` already run here (real install; see the symlink gotcha in section 9).
  - Dev server was running on **port 3200** (`npm run dev -- -p 3200`). It may need
    a restart in the new session.
- **Reference extractions (durable, gitignored):**
  `/Users/camrenhall/Documents/CaseDelta/Github/casedelta-website-hp/_ref/`
  Contains `perform/`, `agentik/`, `sasonix/`, `agenciy/`, `agenciy-cleaned/`.
  Each has `report.md` (read this first), `nodes.<breakpoint>.json` (per-node
  computed styles + rects), `screens/<breakpoint>.band<NN>.png` (viewport-band
  screenshots), `tokens.json`, `motion.json`, `assets.json`, and `assets/` (the
  downloaded bytes). ~400MB total. Regenerable with `npm run design:extract`
  (section 5) if ever lost.
- **This session's scratchpad is gone in the new session.** Anything referenced as
  living in `/private/tmp/.../scratchpad` no longer exists. The `_ref/` move above
  is why the extractions survive.

### Port map on this machine (cohabitation)

- `3000`: an unrelated app (a different project's dashboard). Do not touch.
- `3100`: another session's dev server on `feat/how-it-works-graphic` (the main
  worktree). Do not kill it.
- `3200`: this redesign worktree's dev server. Ours.

---

## 2. The mission

Camren's original ask: scrape a Framer template and have the CaseDelta site
reproduce it "to 90-100%." That evolved into a synthesis, not a clone: take the
strongest primitives from three templates and rebuild them in CaseDelta's own
brand (blue accent, serif headings, our own copy). This is destined to become the
real homepage, so it is prod-bound and must be honest and prod-quality.

The three templates and what Camren wants from each:

- **perform** (`https://perform.framer.website/`): the above-the-fold hero
  (left-anchored copy over a massive full-bleed background photo) AND the
  below-the-fold restraint ("less is more," mostly headers and subheaders).
- **agentik** (`https://agentik.framer.ai/`, NOTE the `.framer.ai` domain, see
  section 4 gotcha): the chat interface panel on the right-hand side that shows
  what the product can do.
- **sasonix** (`https://sasonix.framer.website/`): the model for below-the-fold
  content organization AND the background-photo-plus-demo-panel balance in the
  hero (its demo sits centered; we shift it right).

---

## 3. Locked decisions (Camren confirmed these this session)

1. **Accent color: blue.** `#2f6fe0`, which is already the design system's accent
   (`BF.accent` in `kit.tsx`). No change needed. Do not adopt the templates'
   accents (sasonix orange, agentik lime/periwinkle).
2. **Typography: serif now, with a live sans hot-swap baked in.** Keep Newsreader
   serif for headings as the default, but build a one-switch toggle so we can flip
   the whole site's display face to a geometric sans and compare. Camren wants to
   see both. Sans candidate: Manrope (proven at hero scale in perform) or Geist.
   See section 8 for the mechanism.
3. **Testimonial: invent one for now.** Camren authorized a fabricated testimonial
   for the demo. BUT this is prod-bound, so: mark it clearly fictional in code with
   a loud comment and a mandatory-replace-before-launch marker. Never let a fake
   quote ship as real. (There is one REAL attributable testimonial already,
   Kirschbaum & Nowotny, in `HomeSections.tsx`. Keep it. The invented one is the
   second, for the close.)
4. **Pricing: flat per-firm, by attorney count.** Not per-seat.
   - Up to 5 attorneys and their staff: **$999/mo**
   - Up to 10: **$1,999/mo**
   - Up to 20: **$3,999/mo**
   - ICP focus initially is the **3 to 15 attorney** segment. Design against sticker
     shock. Full pricing design in section 7.
   - NOTE: this contradicts the "$349/user/month per-seat" model in the
     casedelta-cloud CLAUDE.md. The per-firm model is the new direction for this
     site. Do not "correct" it back to per-seat.
5. **Destiny: next iteration of the real site.** Prod-bound. Honesty rules apply in
   full; real assets needed before launch; deploy to an isolated Vercel preview off
   the branch and never auto-merge to prod without Camren's sign-off.

---

## 4. Recon findings, per template

All four templates run on open-licensed fonts, so there is no font-licensing wall
on anything Camren liked. Do not rehost any template's photography or video; match
the treatment with imagery CaseDelta has rights to.

### perform (hero skeleton + below-fold restraint)

- **Fonts:** Manrope (open). **Palette:** monochrome, black and white plus greys
  (`#999`, `#555`), one off-white `#f2f2f2`, NO accent color. **Type scale:** hero
  72px / weight 500 / -3.6px tracking; section headers 52px; body 16px/24. Generous
  section padding (100 to 160px). Almost no shadows, flat.
- **Hero (`_ref/perform/screens/desktop.band00.png`):** full-bleed background photo
  edge to edge (a motion-blurred cyclist). All copy anchored LEFT: a small eyebrow
  with a rule line, a huge tight-tracked headline, a short subhead, ONE white pill
  CTA, and star-rating proof ("100+ Positive Client Reviews") at the bottom. Right
  half is left open (the photo subject fills it). This is the layout skeleton we
  want.
- **Below-fold pricing (`band02`):** one plan per row, alternating photo and plan
  detail (price eyebrow, big plan name, checkmark feature list, pill CTA), lots of
  whitespace. This is the "less is more" density Camren wants.
- The "Get template" / "Remix template" buttons in the screenshots are Framer
  marketplace chrome, not the design.

### agentik (the chat interface for the right-hand side)

- **REAL preview URL is `https://agentik.framer.ai/`.** The obvious
  `agentik.framer.website` is squatted by an unrelated "GreenClover / Put More Cash
  Back in Your Business Pocket" cash-back-card site with no chat interface. We
  wasted one extraction on the wrong site before finding the right one. The
  marketplace page did not self-reference the preview; the real URL was found by
  grepping the marketplace HTML for candidate links and spotting the `.framer.ai`
  one.
- **Fonts:** General Sans (display) + Inter (body), both open. **Palette:**
  sage/olive text `#1d1f13`, pale sage surfaces `#f7f8f5` / `#eaf0dd`, lime accent
  `#f0ffd1`; the hero chat card sits on a soft periwinkle/lavender gradient.
  **Type scale:** hero 72px General Sans / -0.72px; section 44px; body 16px Inter.
  Very rounded (up to 228px pill radii).
- **Hero (`_ref/agentik/screens/desktop.band00.png`):** already the left-copy /
  right-demo split. Left: eyebrow with a dot ("3 SPOTS LEFT FOR APRIL"), big
  headline, subhead, a black pill CTA plus a ghost CTA. Right: a **chat interface
  panel** where the agent proactively offers an action ("47 new leads found. Want
  me to start outreach") with a live typing cursor, an ADD ATTACHMENT / UPLOAD
  IMAGE row, and a voice waveform icon. Below the hero, a logo strip.
- **Section 2 (`band01`)** gives two more reusable primitives: realistic activity
  cards ("INVOICE #1847 SENT, £2,400 TO GREENFIELD LTD", "MEETING NOTES TAKEN,
  NEXT ACTIONS FROM CALL WITH TOM R.") and a tool-logo integration tile. The
  activity cards are a strong, honest way to show what Delta does without a video.

### sasonix (below-fold IA model + hero balance)

- **Fonts:** Geist (body) + Archivo (display) + JetBrains Mono (eyebrow labels),
  all open. **Palette:** cream surfaces `#fcf8f4` / `#f8f3ec`, near-black-brown
  text `#120a04` / `#5c4c3f`, ORANGE accent `#ff7029` used sparingly for the one
  thing that matters (recommended plan, hub node). **Type scale:** hero 60px
  Archivo / -2px; section headers a consistent 48px Archivo / -1px; body 16px
  Geist. Signature detail: a monospace eyebrow pill with a left accent rule.
- **Hero (`_ref/sasonix/screens/desktop.band00.png`):** full-bleed landscape photo,
  centered copy, two CTAs, and a product-demo UI panel (a "Workflows" dashboard on
  the left and a floating code/execution panel on the right) straddling the bottom
  of the hero, sitting on the photo. This is the picture/demo balance Camren
  referenced. We shift the demo to the right for our version.
- **THE BELOW-FOLD SECTION MAP (this is the IA gold).** Sasonix's native section
  order, page-absolute, is almost exactly Camren's requested IA:
  1. Hero
  2. Logo strip ("Embraced by startups, agencies, and teams")
  3. "Simple instructions into intelligent workflows" (what it is)
  4. "Powerful features designed for intelligent automation" (features, large)
  5. "Let's break down how everything works for you" (how it works)
  6. "Transforming natural language into automated process" (how, detail)
  7. "Connect all your tools and automate workflows" (integrations, hub-and-spoke)
  8. "Sasonix vs other tools" (comparison, Feature / Sasonix / Others table with
     the Sasonix column highlighted in an orange border; preceded by a hub-and-spoke
     graphic of the brand mark connecting to competitor logos)
  9. "Real stories from teams using Sasonix" (testimonials)
  10. "Get started with transparent plan" (pricing: Monthly/Yearly toggle with
     "SAVE 20%", two cards, Professional highlighted with an orange border)
  11. "Got questions?" (FAQ)
  12. "Automate your business with AI-powered solutions" (final CTA band)
- Comparison screenshot: `_ref/sasonix/screens/desktop.band07.png`. Pricing:
  `desktop.band09.png`.

### agenciy (tool reference only, not in Camren's brief)

- The first template extracted, used to build and validate the toolchain. Fonts
  Inter + Playfair Display. Not part of the design brief, but its `_ref/agenciy/`
  is a good clean example of the extractor output. `agenciy-cleaned/` is the same
  site re-extracted with the Framer badge and a promo widget removed via `--hide`.

---

## 5. The extraction toolchain (already built and committed)

Two scripts in the website repo, committed on the branch as `2439a1e`:
`scripts/design-extract.ts` and `scripts/design-diff.ts`. npm scripts:
`npm run design:extract` and `npm run design:diff`. Dependencies added:
`pixelmatch`, `pngjs`, `@types/pngjs` (already in `package.json` / installed).

**Extract a reference site:**
```
npm run design:extract -- --url=https://sasonix.framer.website/ --out=./_ref/sasonix
```
Optional `--hide="#selector, #other"` deletes chrome that is not design (Framer
badge, cookie banners) before measuring. Default hides `#__framer-badge-container`.

Writes: `tokens.json`, `nodes.<bp>.json` (four breakpoints: desktop 1440, laptop
1180, tablet 810, mobile 390), `motion.json` (rAF-sampled transform/opacity
curves), `assets.json` + `assets/` (downloaded bytes), `screens/<bp>.full.png`
(overview only, do NOT diff against it) and `screens/<bp>.band<NN>.png` (viewport
bands, the real reference), and `report.md` (the distillation: fonts, palette
split by role, type scale, spacing, radii, shadows, token layer, section outline,
motion, assets). Read `report.md` first.

**Measure our build against a reference, per band:**
```
npm run design:diff -- --ref=./_ref/sasonix --url=http://localhost:3200/
```
Shoots our build at identical viewports, reports a per-band mismatch percentage,
writes magenta diff images. NOTE: since we are SYNTHESIZING (our own brand, not
cloning one template), whole-page diffing against a single template is not the
fidelity metric anymore. Use design:diff to check specific lifted primitives
(does our pricing card match sasonix's card mechanics), not the whole page.

**Four hard-won gotchas baked into the tools** (relevant only if you extend them,
each one silently produced wrong output first):
- tsx transpiles browser callbacks via esbuild with keepNames, rewriting named
  nested functions into `__name(fn)` calls that do not exist in the page. There is
  a raw-JS `__name` shim installed on every page. Do not remove it.
- fullPage screenshots are composited from one scroll position, so scroll-linked
  effects freeze mid-animation (a half-grey headline, a stranded eyebrow pill).
  Capture is viewport bands, each shot while actually scrolled to it.
- `reducedMotion` does nothing on a compiled site (its runtime ignores the
  preference our own framer-motion honors). Scrolling is what settles the page.
- The report distillation counts only nodes where a property does work (text-
  bearing nodes for fonts, painted nodes for surfaces). A naive tally ranks the
  UA-default font and color as primary because empty layout divs inherit them.

---

## 6. The hero synthesis (the centerpiece, build first)

One composition that satisfies all three references:

- **Layout skeleton from perform:** full-bleed background photo edge to edge; all
  copy anchored LEFT in a column: eyebrow with a rule line, a large tight-tracked
  serif headline, a short subhead, ONE blue pill CTA, and star-rating proof near
  the bottom.
- **Right-hand side from agentik:** a chat interface panel dropped into the open
  right half, showing Delta proactively offering an action with a typing cursor and
  an input row.
- **Panel treatment from sasonix:** the panel floats on the photo with a soft
  shadow, straddling, not boxed in a flat container.
- **CaseDelta brand:** blue accent, serif headline (Newsreader) with the sans
  toggle, our own copy.

**Chat demo content (drafts, refine with Camren).** Must show Delta taking
initiative INSIDE the firm's real work and ASKING for approval (never autonomous;
a human approves). Records-chasing is a real capability. Keep Delta gender-neutral.

- Option A (a short exchange):
  - User: "Where are we on the Alvarez case?"
  - Delta: "Three record requests are still outstanding and the demand deadline is
    nine days out. I've drafted the follow-ups to Mercy General and Dr. Osei. Want
    me to send them?"
  - Action row: [Approve and send] [Review first]
- Option B (compact single proactive line, agentik-style):
  - Delta: "I found 12 records still outstanding across your open PI files, and
    three have deadlines this week. Want me to send the follow-ups?"

**Hero copy:** the current live headline is "Win back your time by having the
headcount you could never hire." with subhead "The best AI paralegal is the one
that knows you, your case, and your firm." (in `lib/variants/copy.ts`). Reuse or
revise with Camren. The eyebrow and CTA ("Book a demo", href `/demo`) exist in
`copy.ts` too.

**Hero background image:** placeholder for now. Needs a firm-appropriate real shot
before launch (professional/legal context, not rehosted template photography).
Flag this as a required asset.

---

## 7. Pricing section design (against sticker shock)

The lever for the 3-to-15 attorney ICP is the VALUE ANCHOR, not the raw number and
not per-seat math.

- **Lead with the salary anchor.** The line that defuses $999: the whole firm,
  every attorney and all their staff included, for less than the monthly cost of a
  single paralegal (the site already cites $4 to 5k/mo for one paralegal). So even
  the entry tier is a fraction of one hire, for everyone.
- **Frame the per-firm vs per-seat wedge.** One flat firm rate with everyone
  included, versus per-seat research tools (Harvey around $1,000 a seat). Per-firm
  is a real differentiator; lean on it.
- **Three cards, lowest ($999) on the left** so the eye lands on the smallest
  number first. Highlight the entry "up to 5" tier as the common case for the early
  ICP. Add a soft "larger firm, let's talk" affordance past 20 so the top is not a
  wall.
- **Do NOT lead with per-attorney math.** The tiers land near $200/attorney only at
  each cap ($999/5, $1999/10, $3999/20 all divide to about $200). Below the cap it
  rises: a 3-attorney firm at $999 is effectively $333 each. Leading with a number
  that looks worse for the smallest firms is the wrong frame for this segment. The
  ~$200-at-cap coincidence can be a secondary reassurance, not the headline.
- Optional Monthly/Yearly toggle (sasonix has one with "SAVE 20%").
- Adapt sasonix's card layout to a per-firm shape: it assumes tiers with different
  feature lists; ours is the same product at three firm sizes, so the cards differ
  mainly by attorney count and price, plus "everyone included."

---

## 8. The information architecture (agreed)

Verdict: Camren's ordering is sound and matches high-converting B2B structure. The
plan is **sasonix's section skeleton, perform's restraint (sparse, big type, lots
of air), with one refinement: split the opening beat into problem-then-answer.**

Below-fold section plan, mapped to sasonix primitives. Most copy already exists in
`components/marketing/HomeSections.tsx` and is reused; only pricing and the chat
demo are net-new.

1. **Problem primer** (split from Camren's beat 1). Centered statement on off-white.
   Already exists: "Your case lives in five places at once." Problem-before-answer
   is why the answer lands.
2. **What Delta is.** Sasonix "simple instructions" section, paired with the
   existing flow graphic (the three-node "You delegate, Delta does the work, you
   run more cases" graphic in HomeSections).
3. **What it does** (optional, run light per perform restraint). The existing TASKS
   grid. Recommend keeping it but sparse.
4. **How it works.** Sasonix "break down how everything works" stepped section. The
   existing STEPS (01 connect, 02 hand it work, 03 review/approve/it learns).
5. **Integration, framed as layering on.** Sasonix hub-and-spoke "connect all your
   tools" section, with Delta at the center connecting to the firm's tools. Sells
   "layer on top, no migration" as a picture, not a five-minute speed claim.
   IMPORTANT framing note: do not boast "connect literally anything in 5 minutes";
   the any-platform claim is the crown jewel that discredits the thesis if it
   stalls in a live demo (per competitive research #3657). Frame as effort-down:
   "layers on top of what you already run, no migration, no rip-out."
6. **Testimonial.** Sasonix "real stories" cards. The REAL Kirschbaum & Nowotny
   quote (exists).
7. **Delta vs generic AI.** Sasonix "vs other tools" Feature / Delta / Others table.
   This is the "why not just use ChatGPT or Claude" objection handler. The answer is
   SHAPE: a chatbot answers then stops and hands the work back to you; Delta does
   the work inside your systems and takes the next action. The existing COMPARE
   content in HomeSections ("opens in one more browser tab, you re-key its output"
   vs "works inside the tools you already use, does the whole job") is exactly this
   and drops straight in.
8. **Pricing.** New. See section 7.
9. **FAQ, reinforcement, CTA.** Sasonix FAQ into the final CTA band. The existing
   HOME_FAQ and CTA. The invented second testimonial goes near the close (marked
   fictional).

---

## 9. Architecture notes (how to build in harmony)

- **Fonts** load via `next/font/google` in `app/layout.tsx`: Inter
  (`--font-inter`), Hanken Grotesk (`--font-hanken`), Newsreader
  (`--font-newsreader`). The `<body>` gets these variable classes.
- **Design system:** `components/marketing/kit.tsx` is the single source of truth
  for below-the-fold and subpages. Tokens: `SERIF` (= `var(--font-newsreader)...`),
  `SANS` (= `var(--font-hanken)...`), `BF` (ink palette incl. `accent: "#2f6fe0"`),
  `BG` (surfaces incl. two dark bands). Primitives: `Container`, `Section`,
  `Eyebrow`, `H` (uses SERIF), `Accent` (italic accent span), `Sub`, `PillLink`,
  `TextLink`, `Check`, `FaqAccordion`, `PageHero`. Import from here; do not
  hand-roll styles.
- **Below-fold content:** `components/marketing/HomeSections.tsx`. All the beats in
  section 8 already exist here as content (primer, what-it-is, flow graphic, tasks,
  steps, comparison, testimonial, stats, security, integrations, FAQ, CTA). The
  redesign reorders/reskins these to the sasonix skeleton and adds pricing.
- **Hero dispatch:** `components/marketing/Hero.tsx` renders one of
  `HeroLegora` / `HeroHarveyLight` / `HeroHarveyDark` based on the active design
  variant. `app/HomeClient.tsx` renders `<Hero/>` + `<HomeSections/>` + footer and
  syncs the page background to the hero theme.
- **Variant system:** `lib/variants/`. `types.ts` defines `DesignVariant`
  (`control` | `harvey-dark` | `legora`) and the `Theme` interface. `themes.ts`
  defines `HARVEY_LIGHT` (= control), `HARVEY_DARK`, `LEGORA` with canvas / accent /
  hero media / type tokens. `constants.ts` has `DEFAULT_DESIGN` (currently
  `legora`). `VariantProvider.tsx` resolves the variant client-side from PostHog
  flags. `resolve.ts` handles server resolution + `?variant=` preview overrides.
- **To add the new hero:** add a new `Theme` in `themes.ts`, a new `DesignVariant`
  in `types.ts` + `constants.ts`, a new `HeroX` component in
  `components/marketing/heroes/`, wire it into the `Hero.tsx` dispatcher, and set it
  as `DEFAULT_DESIGN`. Keep the old heroes for now; delete them once the new hero is
  approved (the refactor-delete rule: full replace = net-negative diff).

### The serif/sans hot-swap mechanism (build this)

- Add a geometric sans via `next/font/google` in `layout.tsx`, e.g. Manrope as
  `--font-manrope` (or Geist). Add its variable class to `<body>`.
- Introduce a `--font-display` CSS variable in `globals.css`, default
  `var(--font-newsreader)` (serif). Add an override:
  `:root[data-type="sans"] { --font-display: var(--font-manrope); }`.
- Change the `SERIF` token in `kit.tsx` to `var(--font-display), Georgia, serif`
  so every `H` / `PageHero` heading and the hero headline follow the swap. (The
  body stays Hanken; the swap is the display face, which is what defines the
  serif-vs-sans character.)
- Drive `data-type` on `<html>` from a `?font=sans` query param (default serif),
  plus a small floating toggle so Camren can flip live and compare. Gate the toggle
  to non-production (like the `?variant=` preview gating) so it never ships. Once a
  winner is chosen, set the default by changing one line.

### Dev-server / worktree gotchas

- **Symlinked `node_modules` FAILS on Next 16 Turbopack** ("Symlink node_modules is
  invalid, it points out of the filesystem root"). The worktree has a real
  `npm ci` install. If you make another worktree, run a real install, do not
  symlink.
- **`npm run lint` is broken** (Next 16 removed `next lint`). The gate is
  `npx tsc --noEmit` + `npm run build`.
- Restart the dev server with:
  `cd /Users/camrenhall/Documents/CaseDelta/Github/casedelta-website-hp && npm run dev -- -p 3200`
  Verify the `<title>` is CaseDelta's and it is serving this branch.

---

## 10. Branch topology (important, do not get this wrong)

Three relevant refs:

- `origin/main` (`8bc5476`): production. Do not push here directly, ever.
- `feat/how-it-works-graphic` (`2439a1e`, checked out in the MAIN worktree): the
  PRIOR unmerged hero rework. Contains the legora video hero + scrim regrade, the
  below-fold copy rework (primer, flow graphic, eyebrow removal), and the design
  tooling. Documented in `HANDOFF_WEBSITE_2026_07_15.md`. It was waiting on Camren's
  sign-off and is now effectively SUPERSEDED by this redesign (the legora video
  hero is being replaced by the new synthesis).
- `feat/homepage-redesign` (branched from `2439a1e`, checked out in the `-hp`
  worktree): THIS redesign. Inherits the reusable below-fold copy and the tooling,
  replaces the legora hero with the new synthesis, adds the font toggle and per-firm
  pricing. This is the branch that carries the redesign to review.

Open question for Camren: does `feat/homepage-redesign` absorb the old hero branch
entirely (close that PR), or do they merge separately? Recommend absorbing: the
legora hero it contains is being replaced, so shipping two hero reworks is
confusing.

---

## 11. House rules and constraints (all of them)

Marketing-site rules (from `casedelta-website/CLAUDE.md`):
- `main` is production, NO CI. A merge is live on casedelta.com in a minute or two.
  Get Camren's sign-off before merging any visual change; show a screenshot first.
- Iterate locally in a real browser before committing visual changes. Do not
  ship-and-look.
- **No em dashes anywhere.** Also avoid dashes generally in customer-facing copy.
- **Delta is never gendered.** Never she/her. Delta is "it."
- **Never invent social proof** (OVERRIDDEN by Camren for this demo's second
  testimonial, but mark it clearly fictional and mandatory-replace, since it is
  prod-bound). The 4.9 hero rating and the Kirschbaum & Nowotny testimonial are REAL
  and attributable; never remove them as "fabricated" (an agent did this once on
  2026-06-29 and it had to be reverted).
- **Never claim "no third-party LLM" or "client data never leaves our
  infrastructure."** False; prod runs on enterprise AI under zero-retention/BAA
  terms. Use the defensible framing (encrypted, zero retention by the provider,
  never used to train, BAA available). Security is PARITY vs competitors, not an
  advantage; never name a competitor's subprocessor.
- Never imply autonomy: Delta drafts and acts on instruction; a human approves.
- Positioning: teammate not tool, anchor to a salary, sell leverage not layoff.
  Differentiator is SHAPE (Delta lives in your tools) not category breadth (breadth
  is parity; funded competitors all claim it).

Cohabitation / git:
- Multiple Claude Code sessions are live on this machine. The main website worktree
  is SHARED. Work in the `feat/homepage-redesign` worktree. Do not `git checkout` /
  `reset` / `stash` / `clean` in the main worktree. Do not touch the
  `cd-web-rebuild` worktree (`feat/website-harvey-light`, another session).
- Branch from `origin/*` remote-tracking refs, not local refs. Fetch at session
  start.
- Commit only your own files. Merge commits only (no squash, no rebase). Never
  bypass CI gates, never `--admin`, never `--no-verify`.
- Self-destruct the `-hp` worktree once the redesign PR merges
  (`git worktree remove --force` + delete the branch).

---

## 12. Open loose ends / decisions pending

- **Sans face final pick:** Manrope vs Geist. Build both-viewable via the toggle;
  Camren picks.
- **Hero background image:** placeholder now; needs a real firm-appropriate shot
  before launch.
- **Pricing highlight tier:** proposed "up to 5" ($999); Camren may move it.
- **Invented second testimonial:** draft it, mark fictional.
- **Light "what it does" features section:** recommend keeping but sparse (perform
  restraint). Confirm with Camren.
- **Delete superseded heroes** (HeroLegora etc.) once the new hero is approved.
- **Worktree cleanup** on merge.
- **Branch absorption** decision (section 10).

---

## 13. Recommended first steps for the next session

1. `cd /Users/camrenhall/Documents/CaseDelta/Github/casedelta-website-hp` and
   restart the dev server on 3200. Verify title + that it serves this branch.
   Fetch: `git -C . fetch origin --prune`.
2. Build the font-swap mechanism (section 8): add the sans via next/font, the
   `--font-display` variable + `[data-type="sans"]` override, point `SERIF` at it,
   wire a gated `?font=sans` toggle.
3. Build the new hero component (section 6): perform skeleton + full-bleed photo
   placeholder + agentik chat panel on the right + blue accent + serif headline.
   Wire it into the Hero dispatcher as a new default variant.
4. Iterate locally. Screenshot BOTH font modes at desktop and mobile. Show Camren
   and get direction before proceeding to the below-fold.
5. Then rebuild the below-fold to the sasonix skeleton (section 8): add the pricing
   section (section 7), the hub-and-spoke integration visual, reorder the existing
   sections, apply perform restraint.
6. Gate before any PR: `npx tsc --noEmit` + `npm run build`. Do NOT merge to
   `main` (production) without Camren's explicit sign-off.

---

## 14. Quick reference

```
# Worktree + dev server
cd /Users/camrenhall/Documents/CaseDelta/Github/casedelta-website-hp
npm run dev -- -p 3200

# Re-extract a template if _ref/ is lost
npm run design:extract -- --url=https://sasonix.framer.website/ --out=./_ref/sasonix
#   agentik is at https://agentik.framer.ai/  (NOT .framer.website)
#   perform  at https://perform.framer.website/

# Measure a lifted primitive against the reference
npm run design:diff -- --ref=./_ref/sasonix --url=http://localhost:3200/

# Gate (lint is broken; these are the real gates)
npx tsc --noEmit
npm run build
```

Reference reports to read first when you resume:
`_ref/perform/report.md`, `_ref/agentik/report.md`, `_ref/sasonix/report.md`.
Key screenshots: `_ref/perform/screens/desktop.band00.png` (hero skeleton),
`_ref/agentik/screens/desktop.band00.png` (chat panel),
`_ref/sasonix/screens/desktop.band00.png` (hero balance),
`_ref/sasonix/screens/desktop.band07.png` (comparison),
`_ref/sasonix/screens/desktop.band09.png` (pricing).
