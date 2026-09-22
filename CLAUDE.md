# CaseDelta marketing site

`casedelta.com`. Next.js 16 App Router, deployed on Vercel, **`main` is production and
there is no CI**, so a merge is live in a minute or two.

Working memory and a lookup table, not documentation. Traps, hard rules, and facts you
cannot recover by reading the code. Anything descriptive of how a component works was
cut: read the component.

---

## Rule zero: get sign-off before merging anything visual

There is no staging environment and no review gate. `npm run dev`, look at it in a real
browser, screenshot it, show Camren, then merge. Never ship-and-look.

`npm run dev -- -p 3100` if 3000 is busy, which it often is. Verify the page `<title>`
before believing what answers on a port, and never kill a server you did not start:
other Claude Code sessions run on this machine.

---

## The routes

Nine pages exist. Everything else 308s.

| Route | What it is |
|---|---|
| `/` | the homepage, `components/v2/sasonix/Sasonix.tsx` |
| `/about` | mission, the problem, four beliefs, founder, early-stage honesty |
| `/blog`, `/blog/[slug]`, `/blog/tag/[tag]` | DB-backed, ISR, auto-published by an agent |
| `/answers` | knowledge-base hub, renders FAQPage JSON-LD for AI search |
| `/demo` | the only conversion surface on the site. noindex |
| `/privacy`, `/terms` | legal. Google's OAuth consent screen links to these |
| `/setup`, `/install.sh`, `/install.ps1`, `/outreach-kit.zip` | internal rep onboarding, noindex, key-gated |

**Five marketing pages were folded into the homepage on 2026-09-02** and now redirect to
the section carrying their argument:

| was | now | section |
|---|---|---|
| `/features` | `/#features` | AutomationSection, what Delta does |
| `/use-cases`, `/use-cases/:slug` | `/#features` | same section |
| `/compare`, `/compare/:slug` | `/#why` | WhySasonix, the competitive argument |
| `/security` | `/#security` | Trust |
| `/pricing` | `/#pricing` | Pricing |

Do not recreate any of them. Five pages restating what the homepage already says is how
the site came to publish two different prices at the same time.

- **A `:slug` redirect must sit ABOVE its parent** in `next.config.ts`. Next matches in
  array order and `/compare` does not match `/compare/casedelta-vs-clio`.
- **A fragment survives a 308.** The hash rides in the `Location` header and the browser
  applies it after following. Search engines drop it and consolidate into `/`.
- **Anchor landings need `scroll-margin-top`.** The nav is fixed, so without it the
  browser puts the heading under the bar. The rule is in `app/globals.css` and the
  number matches `NAV_OFFSET` in `scrollToSection.ts`. Change one, change the other.

## The homepage

`Sasonix.tsx` composes nine sections and the order is the argument:

1. Hero, 2. Stakes (the problem in one sentence), 3. AutomationSection (`#features`),
4. Testimonials, 5. WhySasonix (`#why`), 6. Trust (`#security`), 7. Pricing (`#pricing`),
8. SecondProof, 9. CtaFooter.

**Proof sits before the argument**, deliberately. A reader who has just been told what
Delta does wants evidence, not a comparison table.

**Section spacing: 60px top AND 60px bottom on every section**, so the gap between any
two is 120px and deleting one leaves its neighbours intact. Bottom-only padding is how
removing a section once silently collapsed a gap to zero.

The nav and the footer's Product column list sections in the page's own top-to-bottom
order. Reorder the sections and reorder both with them.

## One design system

`components/v2/sasonix/`. There is exactly one, and the repo carried four until
2026-09-02. Do not start a second.

- **`theme.ts`** is the brand. One `Palette` object per direction, emitted as CSS custom
  properties. Preview live with `/?theme=sasonix|achromatic|dark`, no rebuild. Roles are
  semantic, never named after a colour.
- **`tokens.ts`** is what components read. **Never write a colour literal in a
  component.** Add a role to `theme.ts` and reference it here.
- **`accent` is not `accentText`.** CaseDelta blue `#5170FF` is 4.11:1 on white: fine for
  a button fill or an icon, a FAIL for body text. Text gets `accentText`. A link painted
  in the raw brand colour is the standard way a palette ships an accessibility bug.
- **`STAR_GOLD` is not a palette token, on purpose.** A five-star row is a borrowed
  convention readers decode pre-attentively; a blue star reads as a UI element.
- **`kit.tsx`**: `Container`, `Eyebrow`, `SectionHead`, `PageHero`, `Prose`.
- **`PageShell`** is the chrome every non-homepage page wears. It mounts `ThemeVars`,
  which is not optional: each page is its own React tree, so a page that skips it renders
  every `var(--sx-*)` as nothing. If a new page looks unstyled, that is why.
- **Motion** goes through `Reveal` / `revealProps`. `MotionConfig reducedMotion="user"`
  at each page root handles the preference. Raw CSS `@keyframes` do NOT get that for
  free; add an explicit `@media (prefers-reduced-motion: reduce)`.

**The four faces are mounted in `app/layout.tsx`, for every page.** They used to live in
a `(home)` route group, which meant the homepage had them and nothing else. Archivo is
self-hosted from the exact Fontshare static masters: Google Fonts' Archivo is variable
and its interpolated 400 and 700 measurably diverge (500 matched).

**No global nav or footer in the root layout.** Every page carries its own through
`PageShell`. A global navbar there stacks a second header on all of them.

## House rules: copy and honesty

Violating these is a real risk, not a style nit.

- **No em dashes anywhere.** Avoid dashes generally in customer-facing copy.
- **Delta is never gendered.** Never she or her. Delta is "it".
- **Never invent social proof.** No fabricated testimonials, firm names, ratings or
  metrics. The 4.9 rating and the Kirschbaum & Nowotny quote are REAL and attributable.
  **Do not remove them as "fabricated"**; that happened on 2026-06-29 and was reverted.
  If something looks placeholder-y, ask.
- **Never claim "no third-party LLM" or "client data never leaves our infrastructure."**
  Both are false: production runs on enterprise AI under zero-retention and BAA terms.
  Use the defensible framing (encrypted, zero retention by the provider, never used to
  train, BAA available).
- **Security is PARITY, not an advantage.** Never claim a competitor sends data to
  OpenAI, and never name a competitor's subprocessor.
- **Never imply autonomy.** Delta drafts and acts on instruction; a human on the firm's
  team reviews and approves before anything leaves the firm.
- **Positioning:** teammate not tool, anchor to a salary, sell leverage not layoff.
  Never lead with "AI". Never "virtual paralegal" or "document analysis platform".

## The price is written down once

`lib/pricing.ts`. `$599 / $1,099 / $2,099` per firm for up to 5 / 10 / 20 accounts,
settled with Camren on 2026-08-28. Import `PRICE_LINE`, `PRICE_CLAUSE` or
`PRICE_PARAGRAPH`. **Never retype a price** into a component, a metadata string or an
FAQ answer. The file exists because the site published two different pricing *models* at
once and a prospect could read both in one session.

- The unit is ACCOUNTS, the thing a firm provisions, and the price is per FIRM. That is
  the wedge against per-seat tools.
- The three tiers are equivalent. No featured tier, no "most popular".
- **"Unlimited staff" is retired. Do not bring it back in any form.** It was true against
  an attorney count and is false against an account count: `law_firms.max_users` is
  enforced, so every paralegal who signs in consumes a band slot. What may be said is
  that there is no per-seat multiplier and the price does not move inside a band.

## The blog

DB-backed. Posts ship without a code push. Full detail in `docs/BLOG_CMS.md`.

1. `INSERT` into Supabase `public.marketing_blog_posts` with `status='published'`.
2. `POST /api/revalidate?secret=$REVALIDATE_SECRET` with the paths to refresh.

- Generation is autonomous: the `blog_writer` skill in the GTM engine researches, writes
  and **auto-publishes with no human review**. It lives in `openclaw-vps/engine/skills/`,
  not here.
- `content/blog/*.mdx` still render and merge by slug, **DB wins**. They are the fallback
  when the DB is unreachable, so the site never breaks.
- `lib/blog-format.ts` holds `formatDate` and `readingTime` because the post page is a
  server component and calls them. **A plain function exported from a `"use client"`
  module cannot be called from the server**; React treats it as a client reference and
  throws.
- `formatDate` appends `T12:00:00`. A bare date parses as UTC midnight and renders as the
  previous day for anyone west of Greenwich.

## proxy.ts

Next 16 renamed the `middleware.ts` convention to `proxy.ts`. It does **one** thing:
sets `cd_pixel_blocked=1` for EU/EEA/UK/CH visitors, read from `x-vercel-ip-country`, and
`MetaPixel.tsx` refuses to render when the cookie is present. Legal compliance. **Do not
weaken, and do not add unrelated work here**: it runs before every page render.

## Gates

```bash
npm run dev          # localhost:3000
npm run lint         # tsc --noEmit
npm run build        # the only real pre-deploy gate
```

`npm run lint` used to be `next lint`, which Next 16 removed from the CLI, so it had
only ever errored. It is `tsc --noEmit` now.

## Environment variables

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_...            # optional; analytics disabled without it
NEXT_PUBLIC_POSTHOG_HOST=https://...
NEXT_PUBLIC_META_PIXEL_ID=957094783732140  # inlined at build time, a swap needs a redeploy
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=...
NEXT_PUBLIC_DEMO_BOOKING_URL=...           # Google appointment scheduler the /demo button opens
DATABASE_URL=postgres://...                # blog CMS. No sslmode; the pool sets SSL. Unset = file-only blog
REVALIDATE_SECRET=...                      # authorizes POST /api/revalidate
# NEXT_PUBLIC_LINKEDIN_DEMO_STARTED_CONVERSION_ID / _BOOKED_  optional, deferred until LinkedIn ads launch
```

---

## Paid Meta ads (live, real spend)

Wide-funnel to litigation partners across practice areas. The ad set name says
"PBC_Partners" for historical reasons and the test is **not** PI-specific.

**Canonical ids**

- Ad account `238417253`, Business Portfolio `1523525049382179`
- Marketing API app `1871334880162905`, System User `casedelta-admin` `122094616863338311`
- Active pixel (Dataset) `957094783732140`. **Deprecated, do not use: `1112090197804629`**
- Ad set `PBC_Partners_ADSET` `52531549521005`, $20/day, 6 ads
- FB Page `1160399907138144`, Instagram `17841421772868520`
- `META_GRAPH_API_VERSION=v25.0`

**The conversion event is `CompleteRegistration`**, fired in `app/demo/DemoClient.tsx`
`handleBook()`. Change the name in code and the ad set stops finding conversions; both
sides must agree.

**PostHog is the conversion source of truth**, not Meta. The pixel undercounts on iOS
Safari, in the Facebook in-app browser and behind ad blockers.

### Mutation safety contract

Every `scripts/meta-*.ts` is dry-run by default and needs `--confirm`. Budget floor $1/day
always; ceiling 10x current without `--force`; pause refuses `PROTECTED_ADSETS` without
`--force`; `create-ad --activate` requires `--force`. **Add a new live ad set to
`PROTECTED_ADSETS` in `lib/meta/safety.ts` when you launch it.**

```bash
npm run meta:insights -- --level=ad --date-preset=yesterday
npm run meta:creatives                                        # read-only
npm run meta:budget  -- --adset=52531549521005 --daily=25 --confirm
npm run meta:pause   -- --ad=52531549521605 --confirm
npm run meta:refresh-token                                    # 60-day token, refresh at day ~50
```

### Traps that cost a day each

- **`link_clicks` is the truth, not `clicks`.** `clicks` counts every engagement,
  including text-expand and image-tap. `clicks >> link_clicks` means the in-feed
  engagement is not reaching the site, and the CLI prints a phantom-click warning.
- **Always use inline creatives (`object_story_spec`), never page-post-backed
  (`object_story_id`).** A page-post-backed creative keeps its CTA on the Page post, and
  editing that needs `pages_manage_posts`, which we do not have.
- **An app in development mode silently blocks ad creation.** Error subcode `1885183`.
  Fix at `developers.facebook.com/apps/1871334880162905/go_live/`.
- **`url_tags` is not a field on the Ad object.** UTM template variables go directly in
  `link_data.link`; Meta substitutes at delivery.
- **Drafts made in the Meta UI are invisible to the API** until published, so a script
  will create a redundant ad. Discard with the row-level Delete, never the toolbar
  "Discard drafts", which is account-wide.
- **PostHog `$initial_utm_source` is person-level, captured on first ever touch.** Do not
  use it to identify paid Meta sessions; use per-event `properties.utm_source` or
  `fbclid`.
- **Token scope and per-asset permission are two different layers**, and both must
  agree. `ads_management` scope with only "View performance" on the ad account fails
  with code 200.
- Graph error `190` means the token expired. It is a 60-day token generated 2026-05-19,
  so assume it is dead until proven otherwise.

### Sample size before you call a winner

Both thresholds, not either: **30 link_clicks per ad** and **5 demo_booked on the
leader**. Under 10 link_clicks after 14 days means the ad was undertested, so exclude it
rather than declare it lost. At $20/day across 6 ads a test week runs 10 to 14 days, not
7. Pick on `link_ctr × downstream conversion rate`: a hook that wins the click and
bounces on the landing page is a false signal.

### Do not change without asking

`NEXT_PUBLIC_META_PIXEL_ID` in Vercel, the `MetaPixel` mount in `app/layout.tsx`, the CSP
allowlist for `connect.facebook.net` and `www.facebook.com`, the geo-suppression in
`proxy.ts`, the FB domain verification meta tag, and the live ad set's configuration.

---

## Watch items

- **This repo is PUBLIC.** `meetings/` (customer discovery and sales notes naming real
  firms), `casedelta_documents_new/` (internal docs plus the investor deck) and
  `_backup/` were removed from HEAD on 2026-09-02, and copies are preserved outside the
  repo. **Removing them from HEAD does not remove them from history.** Never commit
  customer notes, internal strategy or credentials here.
- **`META_SYSTEM_USER_TOKEN` is a 60-day token from 2026-05-19.** Almost certainly
  expired.
- **The hero has no video.** `HERO_MEDIA.src` in `Hero.tsx` is undefined, so the hero
  runs copy-only over the ambient photograph. Setting `src` and a real `poster` brings
  the two-column layout back on its own; the frame and its motion are still tuned.
- **`SecondProof` renders nothing when `QUOTES` is empty.** Never fill it to close a gap.
- `_ref/` and `.playwright-mcp/` are untracked local scratch, not part of the app.
