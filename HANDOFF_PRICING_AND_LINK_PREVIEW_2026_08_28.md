# Handoff: pricing, the link preview, and Calendly

**Date:** 2026-08-28
**Repo:** `CaseDelta/casedelta-website` (local clone used: `~/Documents/CaseDelta/Github/casedelta-website-hp`)
**Branch:** `main`, at `f213883`, clean and synced with `origin/main`
**Shipped:** PRs #73, #74, #75, #76, #77, #78. All merged, all deployed, all verified on the live site.

---

## Running the site locally

```bash
cd ~/Documents/CaseDelta/Github/casedelta-website-hp
npm run dev          # http://localhost:3000
```

The dev server was left running on port 3000 at the end of the session. If the port is busy or you see
`Unable to acquire lock at .next/dev/lock`, another `next dev` is still alive:

```bash
pkill -f "next dev"; pkill -f "next-server"; rm -rf .next/dev/lock
```

Deployment is Vercel. `main` is production and merging to it deploys automatically. There is no GitHub
Actions CI on this repo.

---

## What changed, and why

### 1. The link preview said "Small Law Firms"

Someone sent `casedelta.com` to a prospect and the iMessage preview that arrived read **"AI Paralegal for
Small Law Firms"** over a flat white card saying *"An AI associate that knows every case."* That single
rectangle carried three different positionings, counting its own alt text, and none of them was what the
site said.

Fixed in #73 and #74. The title, `og:title`, `twitter:title` and the card's `alt` now all read
**"CaseDelta: AI Paralegal for Law Firms"**, the Organization JSON-LD drops "small", and
`app/opengraph-image.tsx` is rebuilt against the live hero: the same mountain ambient photograph, the same
scrim over the ink ground, the same Archivo face, the site's own subhead as the copy.

**The thing to carry forward:** an iMessage link preview is built on the **sender's device at send time**
and shipped with the message. The copy already in that prospect's thread is frozen and will never update.
Only new sends pick up a fix. Treat the preview as outbound collateral that ships the moment anyone pastes
the URL, not as site chrome, because it is the one piece of marketing that goes stale where nobody looks.

### 2. The site published two different prices at once

Before today:

| Surface | What it said |
|---|---|
| Homepage | $499 / $999 / $1,999 by account band, per firm, middle tier highlighted |
| `/pricing`, `/answers`, all six `/compare/*` pages | "$349 **per user**, per month, flat, **no tiers**" |

Those are not two stale numbers, they are two different pricing *models*, and a prospect could read both in
one session. Each surface had typed its own price and none knew the others existed.

Fixed in #75. New prices are **$599 / $1,099 / $2,099**, same bands (up to 5, 10, 20 accounts), still per
firm rather than per seat, still a custom plan above 20.

**`lib/pricing.ts` is now the only place a price is written down.** No component, metadata string, FAQ
answer or comparison row types a number any more. If a price changes, it changes there and everything
follows. Do not reintroduce a hand-typed price anywhere; that is the exact defect this file exists to stop.

### 3. Tiers are equal, and they are line items, not cards

Also #75. The three tiers render as horizontal rows, band on the left and price on the right, with no cards
and no highlighted middle tier. Two reasons, both worth preserving:

- Cards invite a comparison that does not exist. The value is identical in all three tiers, so three
  columns of repeated checkmarks answer a question nobody asked.
- A featured middle tier tells a reader one band is the normal choice and the other two are compromises.
  Account count is a fact about the firm, not a preference, so steering only makes a five-person firm feel
  like it bought the cheap one.

**Do not reintroduce a "most popular" badge.**

### 4. Each tier expands to its own numbers

#76 added a disclosure, #77 cut it down after the first version came out crowded. Each row is a real
`<button>` with `aria-expanded` and `aria-controls`, and it opens one line:

```
20 automations included    $104.95 per account    $25,188 a year
```

**Every figure is derived, none is a claim.** `perAccount` and `annualCost` are computed in
`lib/pricing.ts` from the tier price alone. There are deliberately no hours-saved numbers, payback periods
or percentages, because this page cannot source them and inventing one under the word "ROI" is how a
fit-overclaim ships. A `hireMultiple()` helper rendering "3.8x to 4.9x" against the published
$50,000-$65,000 loaded-paralegal range existed briefly and was deleted with the crowded layout: the number
needs a sentence of explanation to mean anything, and a one-line disclosure has no room for one.

### 5. Calendly is gone

#78. It had exactly one live surface, the homepage CTA band, and it was **lazy-loaded**, so it never
appeared in the page source. `curl | grep calendly` returned nothing while a real visitor scrolling to the
bottom was loading an iframe and contacting three Calendly hosts.

`/demo` was already off Calendly. Its "Pick a time" button opens `NEXT_PUBLIC_DEMO_BOOKING_URL`, which in
production resolves to a **Google Calendar** scheduling link. The CTA band now sends people to `/demo`
rather than running a second scheduler, `CalendlyEmbed.tsx` is deleted, and the CSP in `next.config.ts`
drops all four Calendly allowances, putting `frame-src` back to `'self'`.

---

## Open questions for you

**1. "Unlimited staff" is an unresolved claim, and it is currently absent rather than wrong.**
The old pricing copy said "Your whole staff included" and "Flat monthly. Unlimited staff." A previous
author left a note that those read cleanly against an *attorney* count but not against an *account* count,
and asked that nobody quietly rewrite them. I removed the claim rather than restate or invent it. It is a
strong selling line if it is true, so it is worth settling **what an account actually is**. The reasoning is
recorded in the header comment of `lib/pricing.ts`.

**2. The band mapping was assumed.** You gave three numbers and the existing bands were $499/$999/$1,999,
so I mapped them in order, each exactly +$100. If a band boundary moved as well, it is a one-line change in
`lib/pricing.ts`.

**3. `/pricing` still shows the "everything included" checklist.** You asked for it off the homepage and it
is gone there. The same list still renders on `/pricing` as a bordered card, because that page's job is to
say what you get and the tier disclosures do not duplicate it. Easy to remove if you want it gone.

**4. `NEXT_PUBLIC_DEMO_BOOKING_URL` is a Vercel env var, not code.** It points at Google Calendar today. If
it is ever pointed back at Calendly, the site is back on Calendly and nothing in this repo will say so.

---

## Traps found the hard way today

**`npm run build` is not the whole gate, despite what `CLAUDE.md` says.** PR #73 built clean locally and
then failed to deploy: `The Edge Function "opengraph-image" size is 1.16 MB and your plan size limit is
1 MB`. `next/og` carries Satori and a resvg wasm build and is already ~770 KB before the route draws
anything, so the 390 KB photograph I had bundled did not fit. **The size ceiling exists only on Vercel.**
Never `import` or bundle a binary into an edge route; fetch it at render time and give the response a long
cache header.

**A failed deploy leaves production silently unchanged, not broken.** That is why #73 looked merged and
green while `casedelta.com` still said "Small Law Firms". After merging anything that changes bundle
weight, check the deploy actually landed:

```bash
npx vercel ls casedelta-website            # look for Ready vs Error
npx vercel inspect --logs <deployment-url> # read the failure
```

**Do not trust `curl | grep` to tell you what is on a page.** Both of today's worst findings were invisible
to it: the Calendly embed is lazy-loaded and injected client-side, and the OG card is an image. Drive the
real page instead. The pattern used throughout this session, which is worth reusing:

```js
// run from inside the repo so `playwright` resolves from node_modules
import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
p.on("request", r => { /* assert what the page actually contacts */ });
p.on("console", m => { /* catch CSP violations */ });
await p.goto(url, { waitUntil: "networkidle" });
for (let y = 0; y < 30; y++) { await p.mouse.wheel(0, 800); await p.waitForTimeout(120); }
```

**Before tightening a CSP, look for the embed you forgot about.** `frame-src` went to `'self'` only after
checking both the source and six live pages for cross-origin iframes.

**`npm run lint` is broken** and has been since the Next 16 upgrade (`next lint` was removed from the CLI).
Use `npx tsc --noEmit` plus `npm run build`.

**Handoff `.md` files are tracked in this repo**, unlike in `casedelta-cloud` where they are gitignored.
This file will show up in `git status` as a normal untracked file and can be committed normally.

---

## Files worth knowing

| Path | What it is |
|---|---|
| `lib/pricing.ts` | **Single source of truth for every price.** Tiers, bands, automation counts, derived figures, and the reasoning about what is deliberately not claimed |
| `components/v2/sasonix/Pricing.tsx` | Homepage pricing section: the expanding line items |
| `app/pricing/PricingClient.tsx` | The `/pricing` page, same tier rows plus the hire comparison table and FAQ |
| `app/opengraph-image.tsx` | The link-preview card. Header comment records the 1 MB edge limit |
| `app/layout.tsx` | Site title, `og:title`, `twitter:title`, keywords |
| `components/JsonLd.tsx` | Organization and WebApplication structured data, including the `AggregateOffer` price range that AI search quotes |
| `lib/comparisons.ts` | The six competitor pages. Cites `PRICE_LINE` / `PRICE_CLAUSE`, never a typed number |
| `next.config.ts` | CSP lives here |
| `components/v2/sasonix/DemoPage.tsx` | **Not routed.** `app/demo/page.tsx` renders `app/demo/DemoClient.tsx` instead |
| `components/marketing/HomeSections.tsx` | Also not routed, but `app/(home)/page.tsx` says reverting to it is a deliberate one-file change, so its price was updated too |

---

## Verification done, so you do not have to redo it

- `npm run build` and `npx tsc --noEmit` clean on every PR
- Live sweep for `$349` across the homepage, `/pricing`, `/answers` and all six comparison pages: **zero**
- Tier rows opened by click **and** by Enter from the keyboard, `aria-expanded` asserted true and false on
  the right rows, at 1280px and 360px
- Calendly: zero hosts contacted, zero embeds, zero CSP violations on `/`, `/demo`, `/pricing`
- OG card fetched from the live domain, 1200x630, correct, and cached (`x-vercel-cache: HIT`, ~0.2s)
- The OG card also rendered with the Google Fonts host deliberately broken, to confirm it degrades to
  Satori's fallback face instead of failing
