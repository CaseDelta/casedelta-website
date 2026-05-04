# CaseDelta Website — Handoff

Last updated: 2026-05-04

This document captures the current state of the marketing site so anyone (human or agent) picking up the work has the context they need without rereading the entire conversation history.

---

## 1. Production state

- **Domain**: https://casedelta.com (Vercel, auto-deploys from `main`)
- **Repo**: `CaseDelta/casedelta-website`
- **Stack**: Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS v3, Framer Motion v11, PostHog v1, LinkedIn Insight Tag
- **Local dev**: `npm run dev` → defaults to `localhost:3000` (the older `localhost:3002` reference in `CLAUDE.md` is stale)

### What is live on prod right now

- New positioning: **"The personal assistant that connects all your firm's tools together, so you can manage all of them with a single sentence."** (from the one-pager)
- Hero, About, Features, Use Cases, BelowFold, Pricing, Security, Terms, Blog, root metadata, OG image, JSON-LD all aligned to this positioning
- `/use-cases/{personal-injury, medical-malpractice, employment-law, mass-tort}` — plaintiff-side practice areas only
- `/compare/*` removed (308 redirects to `/`)
- `/use-cases/commercial-litigation` and `/use-cases/insurance-defense` redirected to `/use-cases`
- `/demo` LinkedIn-ad booking page with Insight Tag + conversion tracking (`Demo Started` + `Demo Booked`)
- BottomCTA component supports an optional quote (no fabricated testimonials currently shipped)

### What is *not* yet on prod

- `feat/hero-dream-eyebrow` (PR #23) — adds a centered, blue, dream-seller heading above the hero ("Less time organizing data. More time winning cases. For your whole firm.") and the latest intro copy edits ("is your law firm's personal assistant" subtitle on phase 1; "That connects all your firm's tools together." eyebrow on phase 2). **Pending merge** as of this handoff.
- `feature/intro-vsl-overhaul` — entire VSL/intro overhaul (not on main; see § 5)

---

## 2. Branch landscape

| Branch | State | Purpose |
|---|---|---|
| `main` | production | What's live |
| `feat/hero-dream-eyebrow` | open PR #23 | Dream-seller heading + intro phase 1/2 copy adjustments |
| `feature/intro-vsl-overhaul` | parked, no PR | The future VSL demo video work — `/video/*` routes, scenes, primitives, Open Sauce fonts. Holds the intro/VSL overhaul out of production until the demo video is finalized. |

### Recent merges (in reverse chronological order)

```
fcc4237  fix(intro): restore "Delta" header + personal-assistant subheader   (#22)
1071495  fix(hero): move lead+subhead into intro, revert post-reveal hero    (#21)
43e9b67  copy(intro): align intro subtitle with new hero lead                (#20)
91c4c5e  fix(hero): restore right-column app mockup, balance hero layout     (#19)
dedc0db  fix(hero): remove VSL placeholder, align copy to one-pager story    (#18)
85b5607  copy: realign site to horizontal-layer positioning, ship /demo +
         LinkedIn tracking                                                    (#17)
9db81b5  Revert "feat(video): scaffold VSL demo video routes…"               (revert of #16)
```

> **#16 was a tooling mishap** — `gh pr create` was run against the wrong source branch, which squash-merged the VSL/intro overhaul to main. Reverted in `9db81b5`. Always verify `gh pr view <n> --json headRefName` before merging.

---

## 3. Hero structure (`components/HeroV2.tsx`)

The hero plays a 3-phase intro animation, then reveals the static post-reveal hero. Module-level flag `hasPlayedIntro` prevents replay within a session; hard refresh resets it. **Esc** skips the intro at any time.

### Intro overlay (phases 1 → 2 → 3)

| Phase | Timing | Content |
|---|---|---|
| `intro` | ~200ms in, holds ~1.5s | Big "Delta" + subtitle "is your law firm's personal assistant." |
| `anim1` | ~2.7s in, builds for ~3.7s | Eyebrow "That connects all your firm's tools together." + 8-row integration logos stack (Outlook, Word, Gmail, Drive, Clio, Westlaw, DocuSign, "and many more") |
| `anim2` | ~7.7s in, runs to ~19.3s | Eyebrow "Ask once. Every tool responds." + document-stack drag-into-chat-box + typed query + 4-tool execution sequence |

Total intro length: ~20s. Subtitle/eyebrow strings live in module-level constants near the top of `HeroV2.tsx`.

### Post-reveal hero (after `revealed = true`)

```
┌─────────────────────────────────────────────────────────────┐
│  Dream-seller heading (centered, ACCENT blue)               │  ← fades in first
│  "Less time organizing data. More time winning cases.       │     (delay 0,
│   For your whole firm."                                     │      duration 0.6s)
├─────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌──────────────────────────────────────┐  │
│  │ Delta      │  │ Mock browser                         │  │  ← fades in 0.5s later
│  │ HERO_      │  │ ┌──────────────────────────────────┐ │  │
│  │ SUBTITLE   │  │ │ Delta morning briefing           │ │  │
│  │            │  │ │ Kate Graves: "Build me a chrono" │ │  │
│  │ Start free │  │ │ Delta: chronology + PDF artifact │ │  │
│  │            │  │ └──────────────────────────────────┘ │  │
│  │ ★★★★★ 5.0  │  │ Message Delta…                       │  │
│  │ Pilot rating│ │                                       │  │
│  │ {firms}    │  │                                       │  │
│  └────────────┘  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

The dream-seller heading sits above both columns on a 42fr/58fr grid. The right column was originally a `Watch the 90-second demo` VSL placeholder; that was removed in #18 because the video isn't ready, and the chat mockup (lifted from the pre-VSL hero in `83c72ca^`) was restored in #19 to balance the layout. **When the VSL is ready, swap the chat mockup for a video slot.**

---

## 4. Copy and brand rules

These are non-negotiable — they came up repeatedly and shape every editing decision.

| Rule | Why |
|---|---|
| **No em-dashes in marketing prose** | Reads AI-generated. Privacy/legal clauses are exempt (CASA-tuned, leave alone). |
| **Never name competitors** | Old `/compare/*` pages violated this and were deleted entirely with redirects. |
| **Practice area scope: PI / Med Mal / Employment / Mass Tort only** | Plaintiff-side. No commercial-litigation, insurance-defense, family law, immigration. |
| **Never differentiate on price** | Pricing positioning is removed from CTA layer. Prices stay on `/pricing` as practical info only; sell on fit/scope/personalization. |
| **CTA pattern**: "Book a demo" → `/demo` on bottom-of-funnel, "Start free" on top-of-funnel | Replace any "Sign Up — Free $25 Credit" found on dev branches. |
| **No fabricated testimonials** | `BottomCTA` accepts an optional quote; pass nothing rather than invent attribution. |
| **No "AI associate that learns your firm" / "institutional memory" / "Intelligence Network"** | Old positioning. Should not appear anywhere on prod. |
| **Increments must be 99.9% complete before review** | No half-finished work for evaluation. |

Source of truth for voice: the founder's one-pager (referenced in conversation; key beats are "Monday Morning You Actually Want", "Meet CaseDelta", "Tell Delta what you need", "From a demand letter to 300 client updates", "Your data stays yours").

---

## 5. The VSL parking lot (`feature/intro-vsl-overhaul`)

This branch holds the **next-generation intro** and the **VSL demo video routes** that were built ahead of the demo video being finalized. Currently parked off-prod. Contents:

- `app/video/{play,dream,solution,usecases,demo,outro}/` — VSL route tree
- `components/video/{Stage,primitives/*,scenes/*}` — cinematic scene system
- `open-sauce/` — Open Sauce font family (for VSL typography)
- `VSL_HANDOFF.md`, `VSL_SCRIPT.md` — VSL-specific docs
- `app/robots.ts` — disallows `/video/`
- `components/ClientLayout.tsx` — also strips nav/footer on `/video/*`

When the demo video is finalized:
1. Rebase `feature/intro-vsl-overhaul` onto current `main`
2. Wire the video into the `/video` scenes (or wherever the new intro/demo player lives)
3. Replace the right-column chat mockup in `HeroV2.tsx` with the video slot (see §3, post-reveal hero)
4. Open a fresh PR from this branch

Until then, **leave it alone**.

---

## 6. /demo page + LinkedIn Insight Tag

Built for paid acquisition (LinkedIn Ads driving demo bookings).

- `app/demo/{page,DemoClient}.tsx` — dedicated booking page with no nav/footer
- `components/LinkedInInsightTag.tsx` — mounted in `app/layout.tsx` body
- `components/ClientLayout.tsx` — strips nav/footer on `/demo`
- `app/api/send/route.ts` — extended to accept a `source` field (`"pricing"` or `"demo"`) so booking submissions are tagged

### Required env vars

```
NEXT_PUBLIC_LINKEDIN_INSIGHT_PARTNER_ID=<your partner id>
NEXT_PUBLIC_LINKEDIN_DEMO_BOOKED_CONVERSION_ID=<from Campaign Manager → Conversions>
NEXT_PUBLIC_LINKEDIN_DEMO_STARTED_CONVERSION_ID=<from Campaign Manager → Conversions>
NEXT_PUBLIC_DEMO_BOOKING_URL=<Calendly inline embed URL, e.g. https://calendly.com/casedelta/20min>
```

If `NEXT_PUBLIC_DEMO_BOOKING_URL` is unset, `/demo` falls back to an email-based form that posts to `/api/send`.

---

## 7. Practice area scope

`lib/use-cases.ts` defines four use cases. Each has a full `UseCase` shape (heroHeadline, heroSubheadline, geoOpening, stats[3], painPoints[4], howDeltaHelps[5], deltaLearnsExample{firmName, entries[5]}, faq[5], ctaText). Adding a new vertical means adding a new entry here AND updating `app/sitemap.ts`.

**Plaintiff-side only:**
- `personal-injury`
- `medical-malpractice`
- `employment-law` (plaintiff: discrimination, retaliation, wage and hour)
- `mass-tort`

The pre-existing defense-side verticals (`commercial-litigation`, `insurance-defense`) were deleted and redirect to `/use-cases`. Do not re-add them.

---

## 8. Known follow-ups

- **VSL video integration** — see §5
- **Intro length (~20s) vs. user impatience** — current intro plays in full on every hard refresh. If pilot attorneys complain, options: (a) shorten phase timings, (b) shorten the experience after first visit (already partially done via `hasPlayedIntro` flag — only resets on hard refresh), (c) make Esc more discoverable.
- **OG image refresh on social previews** — Twitter/LinkedIn cache OG images aggressively. After `app/opengraph-image.tsx` changes, force a re-scrape with the LinkedIn Post Inspector or Twitter card validator.
- **Real testimonials** — when KCBA / pilot firms are willing to be quoted, wire them into `BottomCTA` and the homepage social proof block. Until then, leave the optional quote unset.
- **Fabricated firm names on hero** ("Whitfield & Hayes LLP" etc.) — these are placeholder pilot-firm names. Replace with real firms when available, or remove the block.
- **Sitemap regeneration** — runs at build time from `app/sitemap.ts`; no manual step needed when adding/removing routes, but verify `https://casedelta.com/sitemap.xml` after a deploy.

---

## 9. Common operations

```bash
# Local dev
npm run dev                            # localhost:3000

# Type-check + build
npx tsc --noEmit
npm run build

# Deploy a copy/style change
git checkout main && git pull --ff-only
git checkout -b fix/<scope>
# … edit, type-check, build …
git add <files>
git commit -m "<conventional message>"
git push -u origin fix/<scope>
gh pr create --base main --head <branch> --title "<title>" --body "<body>"

# CRITICAL: verify the PR's source branch BEFORE merging (see §2 footnote)
gh pr view <n> --json headRefName,baseRefName,mergeable

gh pr merge <n> --squash --delete-branch=false
```

---

## 10. Memory file

The agent has a persistent memory at:

```
/Users/camrenhall/.claude/projects/-Users-camrenhall-Documents-CaseDelta-Github-casedelta-website/memory/
```

Key entries to know about:
- `feedback_casedelta_positioning.md` — old "Delta learns your firm" thesis is dead
- `feedback_casedelta_horizontal_layer.md` — current "horizontal layer" thesis
- `feedback_practice_area_scope.md` — PI/MM/Employment/Mass Tort
- `feedback_no_em_dashes.md` — hard rule
- `feedback_casedelta_pricing_positioning.md` — never sell on price
- `project_seo_overhaul.md` — strategy notes from April 2026

Update or add to these whenever positioning, scope, or rules shift.
