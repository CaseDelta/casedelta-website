# /v2 CaseDelta Marketing Site: Handoff, 2026-08-12

Self-contained context for continuing the `/v2` homepage in a fresh session. Read this top to
bottom before touching anything. It assumes no memory of the session that produced it.

**This supersedes `HANDOFF_V2_CASEDELTA_2026_07_20.md` for page state, copy, structure, spacing
and motion.** That document is still the reference for the original Sasonix pixel-extraction
work and the `_ref/` measurements. `HANDOFF_HERO_VIDEO_2026_07_22.md` and
`HANDOFF_SPOT_2026_07_22.md` remain the reference for video direction, with one correction noted
in section 12.

---

## 0. TL;DR

`/v2` was a rebranded Sasonix template clone with placeholder copy. Over one session it became a
real CaseDelta homepage: new copy modelled closely on the Grok Bot launch, a swappable brand
layer, self-hosted ambient photography, two full-bleed bands, a practice-area switcher, and a
staged word-by-word hero reveal.

**27 commits, all on `feat/homepage-redesign`, all pushed to nothing. Nothing is deployed.**
`/v2` is a preview route, `robots: noindex`, and the live homepage at `/` is untouched.

The three things a new session should know immediately:

1. **Two fabricated testimonials are still on the page** and must not ship. Section 11.
2. **The hero video slot is a placeholder.** Wiring the real asset is one line. Section 6.1.
3. **The page has hard-won invariants** (spacing, hover mechanics, band rules) that look like
   ordinary CSS and are not. Section 9 exists so you do not rediscover them painfully.

---

## 1. Where this lives and how to run it

### 1.1 The repo is one repo with three worktrees

```
~/Documents/CaseDelta/Github/casedelta-website      feat/how-it-works-graphic   (main worktree)
~/Documents/CaseDelta/Github/casedelta-website-hp   feat/homepage-redesign      <-- THE WORK IS HERE
~/Documents/CaseDelta/Github/cd-web-rebuild         feat/website-harvey-light
```

All three are linked worktrees of `github.com/CaseDelta/casedelta-website`. They share branches
and history. **All `/v2` work is in `casedelta-website-hp` on `feat/homepage-redesign`.** No other
branch has `components/v2` at all.

`cd-web-rebuild` holds an older, unrelated Harvey/Legora-styled design that renders at `/`. It is
not part of this work.

### 1.2 Running it

```bash
cd ~/Documents/CaseDelta/Github/casedelta-website-hp
npm install          # only if node_modules is missing
npx next dev -p 3000
```

Next.js 16.1.1 with Turbopack. Ready in about 1.5s. Reads `.env.local`.

- Homepage under construction: **http://localhost:3000/v2**
- Demo page: **http://localhost:3000/v2/demo**
- The old live homepage (untouched, different components): http://localhost:3000/

### 1.3 Query-string overrides for reviewing

Both are read once on mount and exist purely so a decision can be judged on the real page.

- `?theme=sasonix|casedelta|dark` swaps the entire palette live. Section 4.
- `?bg=mountain|water-dark|valley-mist|cloud-pastel|horizon-blue|cloud-swirl|meadow-light|forest-dark`
  swaps the hero backdrop. Section 5.
- They combine: `/v2?bg=water-dark&theme=casedelta`

### 1.4 Gates

```bash
npx tsc --noEmit -p tsconfig.json     # MUST pass. It is the only real gate here.
```

`npx next lint` does not exist in Next 16, and this repo has no eslint flat config, so
`npx eslint` fails with a config error. Do not treat that as a broken build. Type-check is the gate.

---

## 2. What the page is, section by section

Composition lives in `components/v2/sasonix/Sasonix.tsx`. Render order:

| # | Component | id | Purpose |
|---|-----------|-----|---------|
| n/a | `Nav` | n/a | Fixed overlay nav, 67px tall |
| 1 | `Hero` | `.sx-hero` | Full viewport. Word-by-word reveal |
| 2 | `Stakes` | `#stakes` | The problem, drawn as a two-bar clock |
| 3 | `AutomationSection` | `#features` | Thesis line + 3 pillar cards |
| 4 | `HowItWorks` | `#howitworks` | **Band 1.** Onboarding, full-bleed image |
| 5 | `Testimonials` | n/a | Marquee. **Contains fabricated content** |
| 6 | `UseCases` | `#jobs` | Practice-area switcher |
| 7 | `Trust` | `#security` | **Band 2.** Full-bleed image |
| 8 | `Pricing` | `#pricing` | Three tiers |
| 9 | `CtaFooter` | n/a | Closing line + Calendly + footer |

**Present in the directory but NOT rendered:** `WhySasonix` (the old "Delta vs a generic AI
chatbot" comparison table, replaced by `Trust`), `HowToWork`, `Integrations`, `SmartFlow`,
`AutomationFlow`, `Faq`. These are Sasonix primitives kept as a library. `WhySasonix` in
particular is one line away from being restored if the comparison is ever wanted back.

**Deleted this session:** `BrandStrip.tsx` (fake logos), `RunIllustration.tsx` (rendered
chronology artifact), `Jobs.tsx` (superseded by `UseCases`).

---

## 3. The copy, and where every line came from

### 3.1 The strategy, stated once

The site was a weaker paraphrase of what Camren already writes to prospects by hand. The MOET
one-pager and the Sidney Howell email thread were both clearer than anything on the page. The
rewrite took his own words and cut them down, then reshaped them to follow the Grok Bot launch
copy, which Camren explicitly asked to mimic near word for word.

**The mental model everything ladders to:** a new paralegal who already knows the whole case,
works in your systems, and needs your approval.

### 3.2 Current copy, verbatim

**Hero** (`Hero.tsx`, constants `HEADLINE` and `SUBHEAD`):

> **Meet Delta**
> The AI paralegal you can give real work to. Delta signs in to your tools, uses them just like
> you do, and comes back with finished work.

Directly mirrors Grok's "AI teammates you can give real work to. Bots can sign in to your tools,
use them just like you do, and come back with finished work."

**Stakes** (`#stakes`):

> THE PROBLEM
> **The file does not stop when you do.**
> The records come in after five. The demand is due Friday. Somebody has to read all eight
> hundred pages, and most nights that somebody is you.
>
> [two-bar clock diagram]
> Caption: Same file. Same deadline. One of you gets to leave.

**AutomationSection thesis** (`.sx-thesis`, 44px centered):

> Delta is an AI paralegal with its own cloud computer. It signs into your tools, runs multi-step
> work end-to-end like a human, and can even run tasks you approve without you prompting it.

Written by Camren. The final clause is the strongest claim on the page. See section 11.

**Three pillars**, headers taken verbatim from Grok's launch post: "A computer of its own",
"Message it like a teammate", "Trust it with more over time".

**Band 1 heading:** "Working in five minutes, on top of what you already run"
Steps: Connect / Ask / Approve.

**Band 2 heading:** "Safe to put a client file in"
Three statements, the first being Camren's own analogy: your files never leave your systems, a
paralegal would never take them home, neither does Delta.

**Pricing:** "A fraction of another salary" · One flat price by attorney count. Your whole staff
included. · **$499 / $999 / $1,999** by attorney band (5 / 10 / 20).

**Close** (`CtaFooter`), lifted unchanged from the MOET one-pager:

> An associate that knows the whole case, and does the work. The judgment stays yours.

### 3.3 Copy rules that are binding

From `CLAUDE.md`, Camren's stated preferences, and decisions made this session:

- **No em dashes or en dashes anywhere.** Commas, periods, or a middot.
- **Delta is "it".** Never she/her.
- **Never name the underlying model or provider.**
- **No autonomy claims beyond what is true.** Delta drafts on instruction; a human reviews.
- **Close on the artifact, not the capability.** The single highest-leverage device found in the
  Grok research. Their lines end on "a review list", "a repro pack". Ours end on the chronology,
  the demand, the opened matter.
- **Put the approval gate in the same sentence as the autonomy claim.** Worth more to us than to
  them, because our buyer has a professional duty attached.
- **One statement per paragraph** in body copy, so cards scan like feed copy rather than prose.

### 3.4 The readability audit

A throwaway analyzer was written to measure this rather than argue about it. It computed
Flesch-Kincaid grade, words per sentence, longest sentence and multi-syllable words per line. The
first pass had seven lines running 17 to 20 words and one at grade 12; it was cut to a hard
ceiling of 12 words per sentence at grade 5.

**Then the Grok mimicry pass partly undid that on purpose.** Grok's own sentences run 18 to 25
words. Camren chose their rhythm, so their rhythm won, and the page sits around grade 6.3. Do not
"fix" the page back toward the shorter ceiling without asking him.

Three words repeatedly flag as too hard and are deliberately kept: **paralegal, chronology,
everything**. They are the buyer's own vocabulary; simplifying them makes the copy less
recognisable to a PI attorney, not more.

The analyzer, if you want it again:
`/private/tmp/.../scratchpad/copy/readability.py` (session temp, likely gone; it is 40 lines and
trivial to rewrite).

---

## 4. The brand layer: how to change every colour at once

**File: `components/v2/sasonix/theme.ts`.** This is the single most useful thing built this
session and the one most likely to be misunderstood.

### 4.1 How it works

Every colour in `/v2` resolves to a CSS custom property. `theme.ts` holds one `Palette` object per
brand direction and emits all of them as a stylesheet: the default on bare `:root`, and each named
theme behind `[data-sx-theme="..."]`. `ThemeVars.tsx` renders that stylesheet and reads `?theme=`.
`tokens.ts` maps the `SX` object every component already used onto those variables.

Result: **swapping the brand is one word**, and every component follows without edits.

### 4.2 The three palettes

- **`sasonix`** (current default): the original template values. Orange `#ff7029` on cream.
- **`casedelta`**: CaseDelta's own palette from `design-tokens.json`. Deliberately achromatic,
  near-black accent, colour comes from the media. The Granola and Linear register.
- **`dark`**: dark-first, the Vapi register.

Change `DEFAULT_THEME` in `theme.ts` to make one permanent. Add a brand by adding a `PALETTES`
entry and nothing else.

### 4.3 Roles are semantic, never named after a colour

`accent`, `ink`, `onInk`, `onMedia`, `accentOnMedia`, `glass`, `scrimRgb` and so on, so a blue
brand does not leave the code saying "orange". Legacy Sasonix names (`orange`, `cream`) are kept
as aliases onto the same roles so existing components did not need rewriting.

Two roles exist **because the palette swap exposed real bugs**:

- **`onInk`**: the dark button's label was hardcoded white. In the dark palette `ink` is light, so
  white-on-light vanished.
- **`accentOnMedia`**: an achromatic accent disappears against photography. The hero's review
  stars vanished entirely under the CaseDelta palette.

**This is the argument for keeping the palettes around even if you never ship one.** Swapping
themes is the cheapest contrast test available, and it has caught four separate invisible bugs so
far. Run `?theme=dark` and `?theme=casedelta` after any visual change.

### 4.4 Open decision

Camren has not chosen a palette. Evidence gathered: against the cool ICM photography, the Sasonix
orange logo tile and review stars are the only elements fighting the image, and the achromatic
version reads materially more premium. Recommend `casedelta`. It is a one-word change.

---

## 5. The ambient photography

**`public/v2/ambient/`**, 2560px WebP with JPEG fallbacks, about 4.8MB total.

Camren sourced these himself after being given the search term that unlocks the look:
**"intentional camera movement"** (ICM), the long-exposure technique behind the Ada, monday.com
and Loop Earplugs brand imagery. Eighteen candidates were downloaded; seven form one coherent cool
teal family and were processed in. The rest belonged to other colour families or had recognisable
subjects.

| File | Character | Used for |
|------|-----------|----------|
| `mountain` | Warm peak, blue sky | **Hero** (current default) |
| `water-dark` | Dark teal, horizontal streaks | **Band 1**, onboarding |
| `forest-dark` | Near black, vertical streaks | **Band 2**, trust |
| `valley-mist` | Dark left, bright right | Testimonial card 1 |
| `cloud-pastel` | Pink and blue sunset | Testimonial card 2 |
| `horizon-blue`, `cloud-swirl`, `meadow-light` | Bright, airy | Unused. Reserve |

`mountain` is the original Sasonix hero photo. It was **downloaded and self-hosted** rather than
restored as a hotlink, because the original pointed at `framerusercontent.com`. There are now zero
Framer CDN dependencies in `/v2`.

**Selection criteria that mattered**, learned by testing candidates in place: the hero needs an
evenly mid-dark image, because the headline needs a dark left AND the translucent video card needs
a non-bright right. Bright-right images wash the glass card into grey mush. That constraint
disappears once the card holds an opaque video, so `valley-mist`, `horizon-blue` and `cloud-swirl`
come back into play then.

**Before launch:** generate responsive sizes. A phone currently pulls a 2560px hero.

---

## 6. Motion and interaction

### 6.1 The hero reveal

`Hero.tsx`. Text reveals **one word at a time, each word fading**. Not a typewriter: nothing is
typed, cropped or slid.

Pace is derived from **one constant**:

```ts
const SECONDS_PER_WORD = 0.085;   // ~700 wpm. Faster than reading for comprehension,
const BEAT = 0.3;                 // slow enough to read along with.
```

Each line starts a beat after the previous one finishes, computed from its own word count. **Edit
the copy and the timing re-derives itself.** Do not go back to literal per-element delays; an
earlier version had the two lines on unrelated speeds (0.1 and 0.021 a word) and the subhead was a
blur.

Measured cold: headline complete by 1.2s, subhead crawls 6 words at 2.0s / 16 at 2.8s / 25 at
3.6s, CTA lands at 4.6s.

**4.6s is a long time before a visitor can click "Book a demo".** If it drags, lower
`SECONDS_PER_WORD`. 0.065 brings the whole sequence to about 3.7s with the same character.

`FadeWords` implementation notes: each word is an inline-block so lines still wrap; the trailing
space rides inside the span under `white-space: pre` because JSX collapses it otherwise; the
wrapper carries the full string as `aria-label` with word spans `aria-hidden`, so a screen reader
hears one sentence rather than twenty-seven fragments; `prefers-reduced-motion` renders plain text.

### 6.2 The hero video slot

```ts
const HERO_MEDIA: { src?: string; poster?: string; caption: string } = {
  src: undefined,        // <-- set this and the hero is finished
  poster: undefined,
  caption: "Delta, working a file end to end",
};
```

With `src` undefined it renders an honest placeholder frame: bounded, rounded, glass, with a play
glyph and the caption. The frame, proportions and motion are final, so wiring the asset moves
nothing.

On narrow screens the media **stacks under the copy rather than hiding**, because the video is
what explains the product and a phone visitor has to reach it too.

Existing video assets in `public/videos/`: `hero-video.mp4` is 63 seconds **with an audio track**,
a VSL rather than a loop. `hero-video-poster.jpg` is a screenshot of a chat input box, which is
the exact thing Camren killed. Neither is usable as-is.

### 6.3 Hover

One hover language across the page: **lift 6px, deepen shadow.** Pricing tiers and use-case cards
behave identically.

### 6.4 The practice-area switcher

All five practices render into the **same CSS grid cell**, stacked, with only the active layer at
opacity 1. This is deliberate and solves two things at once: the container sizes to the tallest
practice so the section height never changes (575px on all five tabs), and the change is a true
crossfade rather than a swap.

Tab font-weight is **constant at 500**. Do not make the active tab bolder; it re-measures the text
and shoves every subsequent tab sideways by 2 to 3px on each click.

---

## 7. Layout invariants

### 7.1 Section spacing

**Every section carries 60px top AND 60px bottom.** The gap between any two is 120px, and deleting
a section leaves its neighbours' 60+60 intact.

This replaced a bottom-padding-only convention where each section inherited its top gap from
whatever sat above it. That is why deleting `BrandStrip` put "How Delta is different" flush against
the hero: the gap belonged to the deleted element.

Two deliberate exceptions:

- **`Stakes` takes 120px on top.** The hero is full-bleed with no bottom padding and contributes
  no half-gap.
- **The two bands** paint a background, so they keep internal padding and take their half-gaps as
  a 60px outer margin on each side.

### 7.2 The hero owns the viewport

`height: 100dvh`, floor 600px. **Dynamic** viewport units, not `vh`: on mobile `100vh` is the
tallest possible viewport, so when the toolbar retracts a strip of the next section shows through.

Short windows are handled by height media queries rather than by letting copy run off the fold:
under 800px tall the headline steps down, under 680px it shrinks again and the proof block drops.

The nav's scroll flip point **measures the hero element** rather than using a fixed number.

### 7.3 The two bands

The page has exactly two full-bleed bands, and they are deliberately unlike each other:

- **Band 1 (onboarding):** `water-dark`, horizontal teal, glass step panels.
- **Band 2 (trust):** `forest-dark`, near-black vertical streaks, **no card chrome at all**. Bare
  type divided by hairlines. Card chrome reads as UI; bare type on a dark field reads as a
  statement.

A note in Band 1's header claims a second band would cancel the device. **That note is now wrong**
and is corrected in Band 2's header: on a page this long with white sections between them, two
bands read as rhythm.

---

## 8. Research artifacts on disk

Saved outside the repo at **`~/Documents/CaseDelta/website_research_2026-08-11/`**:

- **`sites.md`** (160KB, ~17k words): 708 marketing sites across 70 sub-categories, each with a
  URL, an eight-word description, one concrete mechanical observation, and a scale signal. Plus a
  top-20, 20 recurring patterns, and an 18-item do-not-click list.
  **Verification:** every URL fetched by the research agent, then independently re-swept. 707
  unique domains, 682 return 200, 25 answer scripted requests with a bot challenge or rate limit
  (Perplexity, OpenAI, Clio, Midjourney and similar, all real), zero dead.
- **`url_status_check.txt`**: the raw status sweep.
- **`site_links.html`**: plain clickable index of all 708.
- **`grokbot.md`** (102KB, ~17k words): the Grok Bot launch reception and copy analysis. About 60
  URLs. Verbatim copy extraction, tier-ranked by persuasive power with the mechanical device named
  for each, PI-law analogs, and the reception including skeptics.

### 8.1 What the Grok research established

Grok Bot is real, launched 2026-08-11 by a company branding itself SpaceXAI. Independently
confirmed: HN thread 175 points / 149 comments pointing at `x.ai/bot`, and all three quoted
objections verified verbatim against the actual thread with correct authors.

**The finding that matters most and is not yet acted on:** their entire launch has an unanswered
hole, and it is precisely the one a lawyer falls into. The sharpest criticism was about
**accountability, not data loss**. Paraphrasing the thread: the login exists so the agent can act
and the human can carry the blame; the real risk is the agent being tricked into something illegal
and the user being on the hook; humans can be held accountable and there are systems for that.

Our `Trust` section currently answers **data security**, which is table stakes. It does not yet
answer **"am I on the hook"**, which for an attorney is the sharper fear. Delta's approval rule is
a real answer; it just is not argued as an answer to that question. An analyst review in the same
sweep advises firms to avoid this category for regulated data entirely, which is a paragraph
telling law firms to wait.

**Recommended next copy move:** rewrite `Trust` to answer accountability as well as encryption.

Also worth knowing: **no adversarial hands-on test of Grok Bot exists publicly.** All three
hands-on writeups came from people given pre-launch access, and all three are positive. Their copy
is proven persuasive, not proven true.

### 8.2 Things deliberately NOT copied from Grok

- **Their five named pull quotes.** Real employees at another company. Re-skinning them is
  fabricated social proof.
- **"Show a Bot how it's done"**, a watch-me-work routine recorder. Delta has no such feature.
- **macOS/iOS downloads and Bots messaging each other in group chats.** Not real here.
- One testimonial in their set includes a line about fully trusting the agent without verifying or
  reviewing. In a legal context that is malpractice-adjacent. Never adapt it.

---

## 9. Traps discovered, and the general lesson

Each of these looked correct in the file and did nothing, or did something invisible, in the
browser. **They are the reason every change this session was verified by measuring computed styles
in a real browser rather than by reading the code.**

1. **Framer owns the inline transform.** `motion` components get an inline `transform`, which
   beats any stylesheet `:hover { transform }` at any specificity. A CSS-only hover on the pricing
   tiers rendered perfectly in the file and did nothing on screen. Use `whileHover` on motion
   components. Conversely, once the use-case cards became plain divs, CSS hover started working
   again, which is the same trap in reverse.

2. **Inline `box-shadow` beats stylesheet hover.** Route it through a CSS variable
   (`--sx-tier-shadow`): the inline value references the variable and the variable still cascades,
   so `:hover` can change it.

3. **`AnimatePresence mode="wait"` empties the container.** It runs the exit, leaves nothing
   mounted, and only then mounts the replacement, so the section collapses and snaps back. Re-key
   in a single commit instead.

4. **`Reveal` holds a 24px translate on any section not yet in the viewport.** Measuring gaps from
   child bounding boxes therefore gives readings 24px short. Read computed padding, or scroll each
   section into view first. Two measurement passes were wasted on this phantom.

5. **`#000` inside `maskImage` gradients means opaque, not black.** Do not "tokenize" it.

6. **CSS variable names must match `layout.tsx`.** Four properties referenced `--sx-mono-font`,
   which does not exist, and silently fell back to system monospace. The real names are
   `--sx-archivo`, `--sx-geist`, `--sx-mono`, `--sx-inter`.

7. **A palette swap is a contrast test.** Solid ink against solid accent collapses in the
   achromatic palettes where both resolve to near-white. Stacked bars vanish entirely. Both were
   caught only by running `?theme=dark`.

---

## 10. Verification method used throughout

Playwright is available in this repo (`node_modules/playwright`), left over from the original
Sasonix pixel-extraction work. **Scripts must be run from the repo root**, not `/tmp`, or module
resolution fails.

The pattern used all session:

```js
import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: {width:1440, height:1000} });
await p.goto('http://localhost:3000/v2', {waitUntil:'networkidle'});
// scroll the whole page so every Reveal fires, then return to top
await p.evaluate(async () => {
  const H = document.body.scrollHeight;
  for (let y=0; y<H; y+=400) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,110)); }
  window.scrollTo(0,0); await new Promise(r=>setTimeout(r,500));
});
const el = await p.$('#jobs');
await el.scrollIntoViewIfNeeded();
await el.screenshot({path: '/tmp/out.png'});
```

Element screenshots beat viewport clips. `page.evaluate` with `getComputedStyle` is how hover
states, opacities and spacing were proven rather than assumed. `ffmpeg` is installed for frame
extraction. Screenshots can be read back with the Read tool and looked at.

---

## 11. Open items

### 11.1 Must fix before this page is seen by anyone

**Two fabricated testimonials are live in `Testimonials.tsx`:** "Marcus Chen, Managing Partner,
NovaTech Legal" and "Lucifer Jason, Partner, Q.tube Law". Inherited Sasonix placeholders. The
stock portraits were removed this session and the cards now sit on ambient imagery, which lowers
the damage, but the names and quotes remain.

**The only real quote available is Kirschbaum & Nowotny**, already used in the hero: "Delta gives
us back about five hours a week." Overland Park, KS.

Per the Grok research, the highest-value testimonial to go get is a named attorney or firm
administrator on record about **their first hour**. Ease claims from a vendor get discounted; ease
claims from a named person get believed.

### 11.2 Should decide

- **The palette.** Section 4.4. One word. Recommend `casedelta`.
- **The hero video.** Section 6.2 and 12.
- **Trust answering accountability**, not just encryption. Section 8.1.
- **Hero reveal total of 4.6s.** Section 6.1.

### 11.3 Lost in edit, worth re-siting

When `BrandStrip` was deleted it took a real line with it: **"Purpose-built for personal injury,
mass tort, and medical malpractice firms."** That is genuine ICP positioning and it is now stated
**nowhere on the page**. The hero says "AI paralegal" but never says who it is for.

### 11.4 Before launch

- Responsive image sizes. A phone pulls a 2560px hero.
- The `/v2` route is `robots: noindex`. Remove when promoting.
- **The other 15 routes** (`/pricing`, `/features`, `/blog`, `/use-cases`, `/compare`, `/security`,
  `/about`, `/answers`, `/demo`, `/privacy`, `/terms` and friends) still run the OLD components
  (`NavbarV2`, `FooterV2`). When `/v2` becomes `/`, they will look like a different site. This
  migration has been raised twice and never scoped. It is the largest unplanned piece of work
  remaining.

---

## 12. The hero video, and a correction to the older handoffs

`HANDOFF_HERO_VIDEO_2026_07_22.md` locked "a short silent looping product video, 10 to 12 seconds,
in a bounded container". `HANDOFF_SPOT_2026_07_22.md` then supersedes it: Camren rejected the
silent product loop and moved to a 15-second broadcast-register spot with motion graphics, sound
design and narrative. `public/spot.html` is that work, a browser-native animation source, **never
rendered to video**.

**As of 2026-08-12 the direction has moved again.** Camren shared Grok Bot's launch video and
asked how to recreate it. Its poster frame is **live-action cinematic footage**, not motion
graphics: an office at dusk, shallow depth of field, a blurred plant occluding the foreground, a
practical warm lamp, people anonymous and out of focus, with a single centered white line of text.
Theirs reads "We recently hired a new teammate."

So the current interest is **stock-footage-plus-text**, which is a third direction. Guidance given:

- **Footage:** Artgrid is the closest match to that house style, Envato Elements the best value
  since music bundles in, Filmsupply a tier up. Free options read as free stock in this category.
  Search terms that surface the look: `office candid`, `working late`, `over the shoulder laptop`,
  `shallow depth of field office`, `anamorphic`, plus `law office`, `attorney desk`,
  `legal documents`, `conference room meeting`.
- **Music:** Epidemic Sound or Artlist. Confirm the license covers **paid ads**, not just organic.
- **Voice:** an ElevenLabs API key already exists for the transcription tool
  (`~/Documents/CaseDelta/sales-transcription/.env`); the same account does TTS. Camren's own
  voice is probably better for a founder-led brand.
- **Assembly:** CapCut for speed, DaVinci Resolve free for real grading.
- **Craft rules that separate this from cheap:** grade every clip to one look, slow movement only,
  one line of text per shot in a fixed position and font, never a face looking at camera, three to
  five seconds per shot.

**The script writes itself from copy that already exists.** "The file does not stop when you do",
the evening framing in `Stakes`, and "your firm runs like you hired again, and you get your
evenings back" is almost exactly Grok's "we recently hired a new teammate" beat, aimed at a
plaintiff attorney. A shot list was offered and not yet written.

---

## 13. Commit log for the session

All on `feat/homepage-redesign`, 2026-08-11 into 2026-08-12, oldest first:

```
57ac715  feat(v2): swappable brand layer, tighter nav, video hero replaces the chatbox demo
ec4bd6c  feat(v2): self-hosted ICM backdrops, replacing the Framer CDN hotlink
56e7cad  fix(v2): hero owns the full viewport, no strip of the next section above the fold
6434b85  revert(v2): original mountain hero background, self-hosted
807c965  copy(v2): rewrite the page around one mental model, in plain language
d06d091  copy(v2): follow Grok Bot's copy closely, and add the practice-area use cases
f0ac4b0  design(v2): band the onboarding section, drop vendor logos, resequence, rework testimonials
4d09333  design(v2): cut the category pill row from the banded section
ce54507  copy(v2): cut the redundant subhead and per-card practice labels
6201cae  feat(v2): render the artifact, do not describe it
494c869  copy(v2): mirror Grok Bot's lines exactly, only changing what legal requires
5a67012  design(v2): remove the logo strip, the run illustration, and the pricing feature block
d0dbb89  fix(v2): restore the gap under the hero after the logo strip was removed
fb6d428  fix(v2): symmetric section spacing, so a removal never collapses a gap
d6331b4  feat(v2): the stakes section, between the hero and the product
4dc7b32  design(v2): rebuild the stakes section from the page's own primitives, centered
2e6483a  design(v2): trust becomes the page's second full-bleed band
ae507f8  fix(v2): real prices, and drop the "Most popular" badge
6c56df8  copy(v2): state the whole product in one centered line, drop the Onboarding pill
716ef6c  feat(v2): pricing tiers lift on hover; drop the band's sub line
d94c50c  design(v2): use cases move below the testimonial, three cards, with real card design
e5eeb57  copy(v2): one statement per paragraph, so the body copy scans
b7ac87f  design(v2): the problem section shows the problem instead of stating it
fd5166f  feat(v2): stage the hero arrival so the headline lands alone first
227ccf2  feat(v2): hero text reveals word by word, paced to reading speed
dd1f0c2  fix(v2): the practice switcher no longer jumps
c4dce74  fix(v2): fixed section height and a true crossfade between practices
```

**The commit messages are unusually detailed on purpose.** Several encode a trap and its cause,
and are the best available record of why a piece of code is shaped the way it is. Read the message
before changing the code it describes.

---

## 14. Things that were built and then deleted, so you do not rebuild them

- **`RunIllustration.tsx`**: rendered a sample fact chronology with page cites and an approval
  gate, next to a four-beat timeline of an overnight run. Built, then cut one commit later.
  Camren's call. Recoverable at `6201cae` if the hero video never materialises and the page needs
  to show the artifact some other way.
- **`BrandStrip.tsx`**: five fabricated logos under the hero. Correctly deleted. See 11.3 for the
  real line it took with it.
- **`Jobs.tsx`**: cut the same material by work type rather than practice area. Superseded by
  `UseCases`.
- **The category pill row** ("Case system, Inbox, Calendar, Documents, Billing") in Band 1. Cut for
  restating the sentence above it and implying a fixed supported list, which is the same problem
  the vendor logos had.
- **The "Every plan includes" block** in Pricing. Cut for restating claims made three times already.
- **Vendor logos entirely.** Naming Clio, MyCase, Filevine, Drive and Gmail dates the page, invites
  "do you support X", and implies a fixed integration list when the actual claim is the opposite:
  Delta signs in to whatever the firm already runs. **Zero brand names remain in `/v2` copy.**
  Do not put them back without a deliberate decision.

---

## 15. First moves for the next session

1. `cd ~/Documents/CaseDelta/Github/casedelta-website-hp && npx next dev -p 3000`, open `/v2`,
   scroll it once, then open `?theme=casedelta` and `?theme=dark` to see the range.
2. Read section 9 before editing any motion or hover code.
3. Ask Camren the three open decisions in 11.2.
4. If the answer is "keep going on copy", the highest-value single move is section 8.1: make
   `Trust` answer accountability, using the objections his competitors' own launch thread handed us.
