# CaseDelta Landing Page - AI Assistant Guide

## Project Overview
CaseDelta's public marketing site (`casedelta.com`) — a single multi-page Next.js app: home, `/features`, `/use-cases`, `/blog` (MDX), `/pricing`, `/demo`, `/about`, `/security`, plus legal pages (`/privacy`, `/terms`). The current focus is the cold paid-Meta-traffic → `/demo` booking funnel.

**Core Value Proposition:** Delta is an AI associate that connects to the firm's existing tools (Clio, Filevine, Dropbox, Word, Gmail, etc.) and does the document-heavy cognitive work — chronologies, demand letters, follow-ups — that eats billable time. (The hero copy is the live source of truth for current positioning; see `components/HeroV2.tsx`.)

> **History:** This started as a 5-variant A/B landing-page experiment (light/dark × hero layouts). Those variant routes were removed — `next.config.ts` permanently redirects `/light/*` and `/dark/*` → `/`. The A/B rewrite machinery still exists in `proxy.ts` but is gated off by default (`NEXT_PUBLIC_ENABLE_AB_TESTING`) and its target routes no longer exist, so it is vestigial. Don't re-enable it without rebuilding the variant pages.

## Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v3.4 with custom CSS variables
- **Animation:** Framer Motion v11.15 (scroll-triggered effects)
- **Analytics:** PostHog v1.311 (product analytics + conversion attribution)
- **Email:** Resend (contact / demo-booking notifications via `app/api/send`)
- **Content:** MDX blog (`next-mdx-remote-client` + `gray-matter`), files in `content/blog/`
- **Deploy:** Vercel (project `casedelta-website`). `main` is production — pushes/merges auto-deploy. No GitHub Actions CI; `npm run build` is the only gate.

## Project Structure
```
app/
├── layout.tsx              # Root layout: PostHog provider, MetaPixel, LinkedIn tag
├── page.tsx                # Home page
├── about/ features/ pricing/ demo/ security/ privacy/ terms/
├── use-cases/              # Index + dynamic [slug] pages
├── blog/                   # Index + [slug] (MDX) + tag/[tag]
├── api/send/route.ts       # Resend contact/demo email handler
├── providers/              # PostHogProvider
├── sitemap.ts robots.ts opengraph-image.tsx
└── globals.css

components/                 # Reusable React components (V2 design system)
├── HeroV2.tsx             # Animated hero (integration stack + demo video)
├── NavbarV2.tsx FooterV2.tsx
├── BelowFold.tsx BottomCTA.tsx SocialProof.tsx
├── ContactModal.tsx        # Demo / pricing inquiry form
├── MetaPixel.tsx LinkedInInsightTag.tsx JsonLd.tsx
└── demo/                   # /demo booking flow components

lib/                        # blog, use-cases, posthog, meta-pixel, linkedin, meta/* (Marketing API)
scripts/                    # meta-*.ts (Marketing API CLI), check-*.ts (ad-status probes)
content/blog/               # MDX blog posts
proxy.ts                    # Next 16 middleware (renamed from middleware.ts): EU pixel geo-suppression
```

## Key Features

### Edge Proxy & Geo-Suppression (`proxy.ts`)
In Next.js 16 the `middleware.ts` convention was renamed to `proxy.ts` (exports `proxy()` + `config.matcher`). It runs on every page entry and:
- **EU/EEA/UK/CH pixel suppression (live, compliance):** reads `x-vercel-ip-country`, sets a `cd_pixel_blocked=1` cookie for those jurisdictions; `MetaPixel.tsx` refuses to render when the cookie is present. **Do not weaken.**
- **A/B variant rewrite (vestigial):** gated behind `NEXT_PUBLIC_ENABLE_AB_TESTING=true` (default off). The `/light/*` `/dark/*` target routes were removed, so this path no longer renders anything — leave it disabled.

### Design System
- **Base Font Size:** 14px (custom CaseDelta standard, not 16px)
- **Spacing:** 4px grid system
- **Colors:** Grayscale-first palette, semantic colors only when needed
- **Typography:** Harvey Serif (headings) + CaseDelta Sans (body)
- **Theming:** CSS custom properties (defined in `globals.css`)
- **Animation:** Respects `prefers-reduced-motion`

### Analytics Integration
- PostHog lazy-loads after page render (zero Core Web Vitals impact)
- Conversion tracking + first-touch UTM attribution (the `demo_booked` funnel is the conversion source of truth — see "Paid Meta Ads")
- Optional: disabled if `NEXT_PUBLIC_POSTHOG_KEY` not set

## Environment Variables
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_...                # PostHog API key (optional)
NEXT_PUBLIC_POSTHOG_HOST=https://...           # PostHog endpoint
NEXT_PUBLIC_ENABLE_AB_TESTING=false            # Vestigial A/B rewrite in proxy.ts — leave false (variant routes removed)
NEXT_PUBLIC_POSTHOG_DEBUG=false                # Console logging
NEXT_PUBLIC_META_PIXEL_ID=957094783732140      # Active Meta Pixel ID (see "Paid Meta Ads" section)
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=...            # LinkedIn Insight Tag partner ID
NEXT_PUBLIC_DEMO_BOOKING_URL=...               # Google appointment scheduler URL used by /demo CTA
# NEXT_PUBLIC_LINKEDIN_DEMO_STARTED_CONVERSION_ID=  # Optional: LinkedIn Campaign Manager conversion ID for demo_page_viewed. Deferred until LinkedIn paid ads launch.
# NEXT_PUBLIC_LINKEDIN_DEMO_BOOKED_CONVERSION_ID=   # Optional: LinkedIn Campaign Manager conversion ID for demo_booked. Deferred until LinkedIn paid ads launch.
```

## Important Files
- `design-tokens.json` - Machine-readable design tokens
- `SEO_STRATEGY_2026.md` - SEO strategy / content plan
- `components/HeroV2.tsx` - Hero (live positioning + integration stack)
- `proxy.ts` - Next 16 edge middleware (EU pixel geo-suppression)

## Development Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (the only pre-deploy gate — no CI)
npm start            # Start production server
```

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- Use explicit types for props and function returns
- Path alias: `@/` for root imports

### React Components
- Use "use client" directive for client-side interactivity
- Prefer function components with TypeScript interfaces
- Props interfaces named with component name + "Props"

### Tailwind CSS
- Use CSS variables for colors (defined in `globals.css`)
- 4px grid spacing: `space-y-4`, `mt-8`, `p-12` etc.
- Responsive: Mobile-first breakpoints

### Animation
- Use Framer Motion for scroll effects
- `initial`, `whileInView`, `viewport` pattern
- Keep `once: true` to prevent re-triggering

## Paid Meta Ads (Live)

CaseDelta runs paid Meta (Facebook/Instagram) ads to law firm partners across all litigation practice areas (wide-funnel; ad set name says "PI_Partners" for historical reasons but the test is NOT PI-specific). The browser pixel is fully wired and verified end-to-end. First ads launched 2026-05-16. On 2026-05-19 the creative was rebuilt with corrected CTAs + cross-dimensional headlines (see `PBC Test Framework` section below) and is currently live.

### Account & Asset IDs (canonical)
- **Ad account ID:** `238417253` (internal asset ID `6003016522801`, claimed into CaseDelta BP on 2026-05-19)
- **Business Portfolio ID (CaseDelta):** `1523525049382179` — the BM that owns ad account, pages, app, pixel
- **Other Meta ID `785362152836832`:** appeared in earlier docs as "Meta Business ID" — not the BP; likely a verified-domain artifact. Don't use it for BP scoping.
- **Marketing API App:** `casedelta-marketing-api`, App ID `1871334880162905` (created 2026-05-19, App Secret in `.env.local`)
- **System User:** `casedelta-admin`, ID `122094616863338311`, role Admin, scoped to ad account `238417253` with **"Manage campaigns (ads)"** permission (upgraded from "View performance" on 2026-05-19 to enable budget/pause/resume/create-ad mutations and inline creative writes)
- **Active pixel (Dataset):** `957094783732140`, named `my_fb_pixel` in Events Manager
- **Deprecated pixel (do NOT use):** `1112090197804629`. Replaced 2026-05-15. May still appear in Events Manager until manually deleted.
- **Verified FB domain:** `casedelta.com` (verification meta tag in `app/layout.tsx`)

### Campaign Structure
- **Campaign:** `PBC1_PainTest` (PBC Week 1 = pain test)
- **Active ad set:** `PBC_Partners_ADSET` (ID `52531549521005`, renamed from `PI_Partners - Copy` on 2026-05-19), $20/day, 6 ads, `ACTIVE`.
  - **PBC-AD-1** (52533986406805) — Fear/Risk dimension — "How Partners Go From Missing Key Evidence To Winning Bigger Cases"
  - **PBC-AD-2** (52531549521805) — Lifestyle dimension — "How Partners Go From Working Through Every Weekend To Winning Bigger Cases"
  - **PBC-AD-3** (52531549521405) — Identity dimension — "How Partners Go From Doing Associate Work To Winning Bigger Cases"
  - **PBC-AD-4** (52531549521605) — Tech/Stack dimension — "How Partners Go From Juggling Six Platforms To Winning Bigger Cases"
  - **PBC-AD-5** (52531549520805) — Functional/Doc-burden dimension — "How Partners Go From Building Chronologies By Hand To Winning Bigger Cases"
  - **PBC-AD-6** (52531549521205) — Social/Competitive dimension — "How Partners Go From Watching Competitors Adopt AI To Winning Bigger Cases"
- All 6 ads use inline creatives (object_story_spec) with CTA `LEARN_MORE`, shared image hash `68353eb71ed2c3dd32cb7ad5bcb83b56`, FB Page ID `1160399907138144`, Instagram user ID `17841421772868520`.
- Shared landing URL: `https://casedelta.com/?utm_source=fb&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}` (template params substituted by Meta at click time).
- **Draft ad sets:** None. `PI_Partners` (52524384751205) and `PI_ManagingPartners` (52523820017805) referenced in earlier docs no longer exist via API as of 2026-05-19 — already cleaned up.

### Conversion Event
- **Standard event:** `CompleteRegistration` (renamed from `Lead` on 2026-05-16, commit `99dfb42`)
- **Fires on:** demo booking completion via `/demo` or `/book-demo`
- **Helper:** `trackMetaCompleteRegistration(params, options)` in `lib/meta-pixel.ts`
- **Call site:** `components/demo/DemoBody.tsx` `handleBooked()`
- **event_id:** UUID generated at booking source (FallbackForm before `/api/send`, SchedulerEmbed in the Calendly postMessage handler), threaded through `onBooked(eventId)` so a future CAPI implementation can dedupe without restructuring

### Pixel Code Paths
- `components/MetaPixel.tsx`: base pixel loader, mounted in `app/layout.tsx`. Fires `PageView` on every client-side route change (the inline init script does NOT fire its own PageView, so the React effect is the single source of truth).
- `lib/meta-pixel.ts`: typed helpers (`trackMetaCompleteRegistration`, `setMetaUserData`, `newEventId`). `setMetaUserData` calls `fbq('init', PIXEL_ID, userData)` to update Automatic Advanced Matching with the user's email/name.
- `next.config.ts`: CSP allowlist for `connect.facebook.net` (script-src) and `www.facebook.com` (connect-src).
- `proxy.ts`: Next 16 edge middleware (formerly `middleware.ts`) reads `x-vercel-ip-country`, sets `cd_pixel_blocked=1` cookie for EU/EEA/UK/CH visitors. The pixel refuses to render when this cookie is present. Legal compliance, do not weaken.

### Environment Variables (Meta)
- `NEXT_PUBLIC_META_PIXEL_ID`: currently `957094783732140` in Vercel production. Required. Inlined at build time, so a swap needs a redeploy.

### Marketing API (server-side, read-only)
Used for programmatic ad performance audits. Server-side only — never expose tokens to client.
- `META_APP_ID=1871334880162905`
- `META_APP_SECRET=<32-char secret>` — Sensitive. In `.env.local` only. App Secret Proof is required on every call (toggle enabled in App → Advanced → Security).
- `META_SYSTEM_USER_TOKEN=<EAAa...>` — 60-day expiring token. Refresh at day 50. Token has scopes: `ads_read`, `ads_management`, `business_management`, plus bonus pages/Threads scopes from default System User generation.
- `META_AD_ACCOUNT_ID=238417253`
- `META_GRAPH_API_VERSION=v25.0` — Current stable. Released 2026-02-18. v20 dies 2026-09-24.

CLI: `npx tsx scripts/meta-insights.ts --level=ad --date-preset=yesterday` (see `lib/meta/client.ts`, `lib/meta/insights.ts`).

Every call includes `appsecret_proof = HMAC-SHA256(token, app_secret)`. The proof is computed in `lib/meta/client.ts` — if you swap the App Secret OR the token, both must be in sync.

**Account status note**: claiming the ad account into CaseDelta BP on 2026-05-19 initially disabled the payment method (`account_status: 3` DISABLED). Resolved same day by re-authorizing the Visa *8569 funding source. Account is now `account_status: 1` (ACTIVE). If the account ever flips back to disabled, check Billing Hub: `business.facebook.com/billing_hub/payment_methods?business_id=1523525049382179&asset_id=238417253`.

### Marketing API Operations (KPI audits)

**Files:**
- `lib/meta/client.ts` — fetch wrapper with `appsecret_proof`, pagination, typed errors (`MetaApiError`)
- `lib/meta/insights.ts` — `getInsights(args)` + `getActionCount(row, type)` helpers, typed Insights rows
- `lib/meta/mutations.ts` — `updateAdSetBudget`, `setAdStatus`, `setAdSetStatus`, `setCampaignStatus`, `createAd`, `updateAdCreative`, `updateAdName`
- `lib/meta/creatives.ts` — `dumpAllCreatives`, `getCreative`, `createAdCreative`, `listAdsWithCreatives`, types `AdRef` + `AdCreative`
- `lib/meta/safety.ts` — `PROTECTED_ADSETS` list, `LIVE_ADS` list, `checkBudgetChange`, `checkPauseAdSet`, `formatDollars`. **Add new live ad sets to `PROTECTED_ADSETS` here when launching them.**
- `scripts/meta-insights.ts` — read KPIs. Flags: `--level`, `--date-preset`, `--since`/`--until`, `--breakdowns`, `--conversion-event`, `--json`
- `scripts/meta-creatives.ts` — dump all current ad creatives (body, title, image, CTA). `--json` for raw
- `scripts/meta-budget.ts` — change ad set daily budget. `--adset --daily`, `--confirm` to execute, `--force` to bypass 10x ceiling
- `scripts/meta-pause.ts` — pause `--ad` or `--adset`. `--confirm` to execute, `--force` for protected ad sets
- `scripts/meta-resume.ts` — resume `--ad` or `--adset`. `--confirm` to execute
- `scripts/meta-create-ad.ts` — create new ad from JSON `--spec`. New ads default to PAUSED; `--activate --force` to publish immediately
- `scripts/meta-refresh-token.ts` — token refresh; run at day ~50
- `scripts/meta-rewrite-pi-partners.ts` — **one-off rewrite template used 2026-05-19**: built 6 new inline creatives + swapped refs on 5 existing ads + created the 6th ad. Use as a copy-paste template for any future "rewrite the whole ad set's creative" operation. Each operation should live in its own dated script so the history is auditable.

**Mutation safety contract (all mutation scripts):**
- Default dry-run. Mutations require explicit `--confirm`.
- Budget floor: refuses `< $1/day` always (hard rule).
- Budget ceiling: refuses `> 10× current` without `--force`.
- Pause refuses `PROTECTED_ADSETS` entries without `--force`.
- `meta:create-ad --activate` requires `--force` (publishes the ad immediately, real spend).
- Token only has "Manage campaigns (ads)" permission on the ad account — cannot change account settings, finances, or permissions. Cannot delete the ad account or modify Page settings.

**CLI quick reference:**
```bash
# Yesterday at the ad level (CSV out)
npm run meta:insights -- --level=ad --date-preset=yesterday

# Last 7 days at campaign level
npm run meta:insights -- --level=campaign --date-preset=last_7d

# Custom date range, JSON for piping
npm run meta:insights -- --level=ad --since=2026-05-16 --until=2026-05-22 --json

# Breakdowns (each one multiplies row count)
npm run meta:insights -- --level=ad --date-preset=last_7d --breakdowns=publisher_platform,device_platform

# Refresh the 60-day token (do at ~day 50)
npm run meta:refresh-token

# === MUTATIONS (all dry-run by default; pass --confirm to execute) ===

# Dump all current ad creatives (read-only, no --confirm needed)
npm run meta:creatives
npm run meta:creatives -- --json   # raw output

# Change ad set daily budget (cents internally, dollars in CLI)
npm run meta:budget -- --adset=52531549521005 --daily=25 --confirm
npm run meta:budget -- --adset=52531549521005 --daily=250 --confirm --force  # >10x current

# Pause an ad
npm run meta:pause -- --ad=52531549521605 --confirm
# Pause whole ad set (live ones require --force)
npm run meta:pause -- --adset=52531549521005 --confirm --force

# Resume
npm run meta:resume -- --ad=52531549521605 --confirm
npm run meta:resume -- --adset=52531549521005 --confirm

# Create a new ad from a JSON spec (defaults to PAUSED for safety)
npm run meta:create-ad -- --spec=./scripts/specs/new-ad.json --confirm
npm run meta:create-ad -- --spec=./scripts/specs/new-ad.json --confirm --activate --force  # publish immediately
```

**JSON spec for `meta:create-ad` (inline creative version):**
```json
{
  "name": "Partners_Pain-NewAngle_v1",
  "adset_id": "52531549521005",
  "creative": {
    "name": "NewAngle_v1 creative",
    "object_story_spec": {
      "page_id": "<your-fb-page-id>",
      "link_data": {
        "message": "Primary text here...",
        "name": "Headline here",
        "description": "News feed link description",
        "link": "https://casedelta.com/?utm_source=fb&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}",
        "call_to_action": { "type": "LEARN_MORE", "value": { "link": "https://casedelta.com/" } },
        "image_hash": "<image-hash-from-meta-upload>"
      }
    }
  }
}
```
Note: image uploads need `POST /act_{id}/adimages` first (not yet built into the CLI; use Meta UI or curl directly).

**Or reference an existing FB Page post (simpler):**
```json
{
  "name": "...",
  "adset_id": "52531549521005",
  "creative": { "name": "...", "object_story_id": "<page_id>_<post_id>" }
}
```

**Output columns (CSV mode):** name, impressions, reach, clicks, ctr (%), cpc ($), spend ($), complete_registration

**Library use (e.g. in a Node script):**
```typescript
import { getInsights, getActionCount } from '@/lib/meta/insights';
const rows = await getInsights({ level: 'ad', datePreset: 'last_7d' });
for (const r of rows) {
  const conv = getActionCount(r, 'complete_registration');
  console.log(r.ad_name, r.spend, conv);
}
```

**Error codes the CLI surfaces:**
- `190` → token expired or invalidated. Run `npm run meta:refresh-token` or regenerate via BM.
- `200` → ad account permission missing. System User must be assigned to the ad account in BM with at least "View performance".
- `17`/`4` → rate limited. For large date ranges at ad-level, use async report runs (not yet implemented).

**Cross-referencing Meta clicks with PostHog:**

Meta's ad click count and PostHog's `fbclid` pageview count should be 1:1 on the same day. To find Meta-attributed visitors in PostHog:

```sql
-- All Meta clicks yesterday (PostHog SQL)
SELECT timestamp, properties.fbclid, properties.$current_url, properties.$geoip_country_code,
       properties.$browser, properties.$device_type, properties.utm_term AS adset_id,
       properties.utm_content AS ad_id, properties.utm_campaign AS campaign_id, person_id
FROM events
WHERE event = '$pageview'
  AND timestamp >= toDate('YYYY-MM-DD') AND timestamp < toDate('YYYY-MM-DD' + 1)
  AND properties.fbclid IS NOT NULL
ORDER BY timestamp;
```

**Live URL UTM scheme (set on the ad's Website URL in Meta UI):**
- `utm_source=fb`, `utm_medium=paid`
- `utm_campaign={{campaign.id}}` → resolves to the campaign ID at click time
- `utm_term={{adset.id}}` → resolves to the ad set ID
- `utm_content={{ad.id}}` → resolves to the ad ID
- `utm_id={{campaign.id}}` (duplicate of campaign for convenience)
- Custom: `utm=fb&set=partner&ad=N` (legacy fields, can be cleaned up later)

This means `properties.utm_term` in PostHog = Meta ad set ID, which you can join back to Meta's Insights API results.

**PostHog gotcha — `$initial_utm_source`:** This is a *person-level* property captured on the person's FIRST ever touch. If a visitor's first touch was direct/organic, `$initial_utm_source` is `None` even on a later paid-Meta pageview. **Do not use `$initial_utm_*` to identify paid Meta sessions.** Use per-event `properties.utm_source` / `properties.fbclid` instead. If you need a "first paid touch" attribution model, build a derived property explicitly.

### PBC Test Framework (active 2026-05-19 onward)

**PBC** = Pain / Benefit / Challenge, a disciplined paid-media iteration framework. **Vary one variable at a time, hold the rest constant.** Each variable is fine-grained in its own week.

**Headline format (all weeks):** `How [Common Bond] go from [Pain] to [Benefit]` (with optional `without [Challenge]` added in Week 3).

**Common Bond (CB):** Partners. Wide-funnel — not PI-specific despite the ad set name. Targets litigators across all practice areas. The body copy filters out transactional/corporate practice through litigation-specific language (depositions, discovery, opposing counsel) — the headline does NOT need to filter again.

**Week 1 (LIVE) — vary pain, hold benefit constant.** Benefit = "winning bigger cases". 6 pain dimensions across distinct psychological mechanisms:

| Dimension | Pain phrase | Headline | Ad |
|---|---|---|---|
| Functional / doc-burden | building chronologies by hand | "...Building Chronologies By Hand..." | PBC-AD-5 |
| Identity | doing associate work | "...Doing Associate Work..." | PBC-AD-3 |
| Tech / stack | juggling six platforms | "...Juggling Six Platforms..." | PBC-AD-4 |
| Lifestyle | working through every weekend | "...Working Through Every Weekend..." | PBC-AD-2 |
| Social / competitive | watching competitors adopt AI | "...Watching Competitors Adopt AI..." | PBC-AD-6 |
| Fear / risk | missing key evidence | "...Missing Key Evidence..." | PBC-AD-1 |

**Body is CONSTANT across all 6 ads** (per PBC purity). The body's anecdote section name-checks all 6 dimensions in balanced weight (~one line per dimension) so each headline finds a body echo without skewing the test.

**Why these 6 dimensions specifically:** Each activates a different psychological mechanism (effort frustration, status mismatch, operational friction, sacrifice aversion, peer competition, loss aversion). Testing cross-dimensional in Week 1 — rather than fine-graining within one dimension as strict PBC would say — is intentional because CaseDelta hasn't done prior dimension-level testing. Once a winning dimension emerges, Week 2 fine-grains the benefit within it.

**Anti-patterns the framework forbids (learned the hard way):**
- **Don't vary multiple variables at once.** A creative redesign that changes hook + benefit + frame produces no clean learning.
- **Don't reach for tired metaphors.** "Drowning in X" / "X slogs" / "X marathons" / "buried in X" all read as marketing copy and fail to land with senior partners. Concrete > metaphorical. The one functional pain we kept (chronologies) used the partner's actual term, not a metaphor.
- **Don't name pain at the artifact level when the experience is the work itself.** "Manual case timelines" (artifact) → "building chronologies by hand" (the work). The verb-form matters.
- **Don't test 3 framings of the same underlying pain.** Original Week 1 had "drowning in records" + "buried case facts" + "manual case timelines" — all the same doc-burden archetype with synonyms. That wastes test slots.
- **Don't make the body dimension-specific in a cross-dimensional test.** Body must be universal-enough that each headline lands with its echo somewhere in the body, balanced.

**Week 2 plan (gated on Week 1 results):** Hold winning pain constant. Vary benefit. Format: `How partners go from [winning P] to [B]`. Candidate benefits include "winning bigger cases" (Week 1 default), "higher win rates", "career-defining wins", "stronger case strategy", "faster case wins". Do NOT draft Week 2 variations until Week 1 has a clear winner — locking in pain that didn't actually win destroys the test.

**Week 3 plan (gated on Week 2):** Hold winning P+B constant. Vary challenge. Format: `How partners go from [P] to [B] without [C]`. Candidate challenges: "mountains of discovery", "caseload bandwidth", "tight prep timelines", "junior team capacity", "tool-switching fatigue", "AI security risks".

**Daily audit during a test week:**
```bash
npm run meta:insights -- --level=ad --date-preset=yesterday
```
The CLI surfaces both `clicks` (Meta's all-engagement counter — text-expand, image-tap, profile click) and `link_clicks` (actual outbound clicks). Use **`link_clicks`/`link_ctr`/`link_cpc` as the source of truth** for site-driving performance. A row with `clicks >> link_clicks` triggers a "phantom-click warning" automatically — the in-feed engagement isn't reaching the site (see GitHub issue #34 for the diagnostic that established this).

Cross-check with the saved PostHog funnel **"Meta Paid → Demo Booked (per ad)"** ([insight sk3TDNy7](https://us.posthog.com/project/275515/insights/sk3TDNy7)) for independent ground-truth conversion attribution per ad — `$pageview where utm_source=fb → demo_booked`, broken down by `utm_content` (Meta ad ID). PostHog is the conversion source of truth because Meta's pixel undercounts on iOS Safari / FBIA / ad-blocked users.

**Sample-size rule (stopping criteria for a test week):**
Don't pick a winner until BOTH thresholds are met. Volumes below these are statistical noise.
- **CTR-based winner**: ≥30 link_clicks per ad. Below this, link_ctr swings wildly on N=1-3 effects.
- **Conversion-based winner**: ≥5 demo_booked events on the leading ad. Below this, a 1-event gap is noise, not signal.
- **Under-tested ads**: if any ad has <10 link_clicks after 14 days, treat it as undertested (Meta's algorithm never gave it a fair shake) — exclude it from the dimension read rather than declaring it lost.
- **If after 14 days no ad reaches 30 link_clicks**: the audience size or daily budget is too small to test this many dimensions in parallel. Drop to 3 ads max for the next iteration, or scale daily budget.
- Current pace at $20/day produces ~3-8 link_clicks per ad per day across 6 ads. Plan a test week to last 10-14 days, not 7.

**Picking a winner at end of a test week:** Don't pick on link_ctr alone. The winning ad is the one with the best **link_ctr × downstream conversion rate** (PostHog demo_booked / link_clicks). High-link-CTR hooks that bounce on the landing page are still false signals — they win the click but lose the lead.

### Creative Rewrite Workflow (rewrite all ads in an ad set)

Use this when you want to swap creative content across an entire ad set (titles, body, CTA, etc.). The pattern:

**Preconditions:**
1. **App must be in Live mode.** Dev-mode apps can't produce ad-eligible posts (Meta blocks with error subcode 1885183, message "Ads creative post was created by an app that is in development mode"). Our app went Live on 2026-05-19. If it ever reverts, flip back at `developers.facebook.com/apps/<app_id>/go_live/` — needs a valid Privacy Policy URL (we use `https://casedelta.com/privacy`).
2. **System User permission on the ad account must be "Manage campaigns (ads)" or higher.** Read-only "View performance" can't create or update creatives.
3. **Ad set should be PAUSED** before swapping creative on running ads, to avoid mid-flight delivery anomalies. Use `npm run meta:pause -- --adset=<id> --confirm --force`.

**Why we use inline creatives (`object_story_spec`) NOT page-post-backed (`object_story_id`):**
The original 5 BOOK_TRAVEL ads were page-post-backed — the CTA lived on the underlying FB Page post, not the creative. Editing CTA required `pages_manage_posts` permission (we don't have it). New creatives use inline `object_story_spec` with the CTA defined inline, fully controllable via API. **Always prefer inline going forward.**

**Step-by-step:**

1. **Pull the shared image hash** from any existing creative (all ads in our set share one image):
   ```bash
   curl -sS "https://graph.facebook.com/v25.0/<existing-creative-id>?fields=image_hash,object_story_spec&..."
   # extract object_story_spec.link_data.image_hash
   ```

2. **Copy `scripts/meta-rewrite-pi-partners.ts` as a starting template.** Update:
   - `ADSET_ID`, `PAGE_ID`, `INSTAGRAM_USER_ID`, `IMAGE_HASH` constants
   - `BODY` constant (the universal body, identical across all ads in this test)
   - `LINK` constant (UTM template URL)
   - `PLAN` array — one entry per ad with: `adName`, `title`, `existingAdId` (null = create new)

3. **Run the script.** It will:
   - Create N new inline creatives via `POST /act_{id}/adcreatives`
   - For each entry with `existingAdId`, swap that ad's creative reference via `POST /{ad-id}` with `creative={creative_id:...}`
   - For each entry with `existingAdId: null`, create a brand-new ad via `POST /act_{id}/ads`
   - All operations preserve ad IDs and learning history for the existing 5 ads
   - All new ads default to `PAUSED` status

4. **Verify via API** that all ads have the new creatives and CTAs:
   ```bash
   curl -sS -G "https://graph.facebook.com/v25.0/<adset_id>/ads" \
     --data-urlencode "fields=name,effective_status,creative{object_story_spec}" ...
   ```

5. **Wait for Meta to approve new creatives.** Each creative goes through `IN_PROCESS` → `ACTIVE`/`PAUSED` depending on parent state. Typical 1-24h.

6. **Resume the ad set** when ready:
   ```bash
   npm run meta:resume -- --adset=<id> --confirm
   ```

**One trap to avoid:** if you (or the user) manually create a draft ad in the Meta UI alongside the API rewrite, the UI draft won't be visible via the API until it's published. The script may then create a redundant ad. If this happens, discard the UI draft via the row-level "Delete (Ctrl+Backspace)" action in Ads Manager (NOT the top-toolbar "Discard drafts" — that's account-wide and will kill all pending changes).

### Marketing API setup history (one-time, completed 2026-05-19)

For reference only — re-running these is unnecessary.

1. Created Meta dev account (camren2468@gmail.com), registered as developer
2. Created Business app `casedelta-marketing-api` (ID `1871334880162905`) under CaseDelta BP
3. Selected use case: "Create & manage ads with Marketing API" (no separate "add product" step — this is the new app flow)
4. Enabled "Require app secret" in App → Advanced → Security (forces appsecret_proof on every call)
5. Created System User `casedelta-admin` (ID `122094616863338311`), Admin role, under CaseDelta BP
6. Generated 60-day refreshable token with scopes `ads_read` + `ads_management` + `business_management` (+ default Pages/Threads scopes)
7. **Claimed ad account `238417253` into CaseDelta BP** (it was a personal ad account before; this is irreversible per Meta)
8. Assigned System User to ad account, initially with "View performance" permission, then **upgraded to "Manage campaigns (ads)" later same day** when mutation/creative-write capability was needed
9. **Set Privacy Policy URL** in App settings → Basic to `https://casedelta.com/privacy`, then **flipped app to Live mode** at `developers.facebook.com/apps/1871334880162905/go_live/`. Required before inline creative writes work via API.
10. Stored `META_APP_ID`, `META_APP_SECRET`, `META_SYSTEM_USER_TOKEN`, `META_AD_ACCOUNT_ID`, `META_GRAPH_API_VERSION` in `.env.local`
11. Vercel prod env: NOT YET ADDED (only needed when `/api/meta-insights` route is built)
12. **Rewrote 6 ad creatives on 2026-05-19** via `scripts/meta-rewrite-pi-partners.ts` — replaced BOOK_TRAVEL CTAs with LEARN_MORE, swapped to inline creatives (was page-post-backed), and installed the PBC Week 1 cross-dimensional headlines. See "Creative Rewrite Workflow" above.

### Meta UI Gotchas (Marketing API setup, discovered 2026-05-19)

- **App creation use cases vs. classic products:** the new app creation flow asks for a "use case" (Marketing API, Threads, etc.) instead of adding products post-creation. Marketing API as a use case grants access automatically; no separate App Review for own-account use.
- **System User name policies:**
  - No more than 1-2 hyphens (e.g., `casedelta-api-admin` was rejected, `casedelta-admin` accepted)
  - Reserved-ish words like "API", "Admin" trigger "invalid System User name" silently. If a name fails, simplify until accepted.
- **Claiming an ad account is irreversible.** Meta's dialog says it plainly. Once an ad account joins a BP, it can only move between BPs, never back to personal.
- **Claiming resets payment method state.** Even if a card stays attached, Meta needs the BP to re-authorize charging. Expect `account_status: 3` (DISABLED) until the owner fixes payment in `business.facebook.com/billing_hub/payment_methods?business_id=...&asset_id=<ad_account>`.
- **App in development mode silently blocks ad creation.** Error subcode `1885183`, message "Ads creative post was created by an app that is in development mode. It must be in public to create this ad." Affects ALL inline creative creation (`POST /act_{id}/adcreatives` with `object_story_spec`). Fix by flipping to Live mode (needs Privacy Policy URL + maybe Business Verification).
- **Inline creatives vs page-post-backed creatives:** an inline creative (`object_story_spec`) puts all content (body, title, image, CTA) on the creative itself, fully API-controllable. A page-post-backed creative (`object_story_id` or `effective_object_story_id`) points to an existing FB Page post; the content lives on the post and editing it requires `pages_manage_posts` permission (we don't have it). The 5 original BOOK_TRAVEL ads were page-post-backed which is why fixing their CTA required creating new inline creatives from scratch. **Always prefer inline going forward.**
- **`url_tags` is not a field on the Ad object.** Dynamic UTM template variables (`{{campaign.id}}`, `{{ad.id}}`, `{{adset.id}}`) go directly in the creative's `link_data.link` URL, and Meta substitutes them at delivery time. No separate "tags" field needed.
- **Drafts in Meta UI don't surface via API.** If a user manually duplicates an ad in Ads Manager and doesn't publish, the draft has a temporary client-side ID (visible in the URL) but no real API-side ad ID. `GET /<temp-id>` returns "Ad with this id cannot be found." You must publish via UI first OR discard the draft. The row-level "Delete (Ctrl+Backspace)" action discards a single selected draft; the top-toolbar "Discard drafts" is account-wide and will kill ALL pending changes.
- **`/me/permissions` shows token scopes, but actual capability also depends on the System User's per-asset permission level** on the ad account ("View performance" vs "Manage campaigns" vs "Manage ad accounts"). Token might have `ads_management` scope while the SU only has read access — calls will fail with code 200 ("Ad account owner has NOT grant ads_management or ads_read permission"). Both layers must agree.
- **System User has no "businesses" reachable via `/me/businesses`.** That endpoint returns `data: []` for System Users — they belong to ONE BP by creation, not multi-business identities. Use the parent BP ID directly.

### Verification & Debugging
- **Events Manager Test Events:** https://eventsmanager.facebook.com/events_manager2/list/pixel/957094783732140/test_events?act=238417253
- **Meta Pixel Helper** Chrome extension: inspects fbq calls on any page
- **Console smoke test:** `typeof window.fbq` should be `'function'`; `_fbp` cookie present means pixel fired
- **Fire a manual test event:** `fbq('track', 'CompleteRegistration', {}, { eventID: 'test-' + Date.now() })`. Appears in Test Events tab within seconds when the browser session is registered with that tool.
- **Vercel deploys are authoritative:** env var changes only take effect after a fresh production build. Use `vercel redeploy <prod-url>` to re-build with the current env without shipping new code.

### Common Operations

**Adding a new standard conversion event:**
1. Add a helper in `lib/meta-pixel.ts` mirroring `trackMetaCompleteRegistration`
2. Call it at the right user action
3. Deploy
4. The event appears automatically in Events Manager once it fires. No separate "registration" step in Meta UI unless creating a new ad set to optimize for it.

**Swapping the active pixel ID:**
1. `vercel env rm NEXT_PUBLIC_META_PIXEL_ID production -y`
2. `printf "<new-id>" | vercel env add NEXT_PUBLIC_META_PIXEL_ID production`
3. Redeploy (`vercel redeploy <latest-prod-url>` for env-only change, or push to main for code+env)
4. Verify via Test Events with the new pixel ID

**Scoping a Meta publish to one ad set's child ads (when other ad sets are also in draft):**
This is a non-obvious Meta UI quirk discovered 2026-05-16.
1. Open the Review draft items dialog (toolbar Publish or "Review and publish (N)" top-right)
2. Switch to the "Ad sets N" tab. This lists only currently-unpublished ad sets.
3. Uncheck the ad sets you do NOT want to publish. Meta cascades the uncheck to their child ads.
4. Switch to "Ads N of M" tab. Only the children of still-checked or already-published ad sets remain selected.
5. Click Publish. Scope is now correct.

### Meta UI Gotchas
- "In draft" status = ad set/ad has never been published, OR existing one with unpublished pending changes
- "No ads" status on a published ad set = the ad set itself published, but its child ads failed (often WEB001)
- WEB001 error ("Please authenticate your account") = Meta security challenge. Only the account holder can complete it. Blocks all publishing until cleared.
- The toolbar Publish always opens the account-wide Review dialog. There is no truly per-row publish action. The "inline Publish" on hover is just a shortcut to the same dialog. Use the cascade trick above to scope.
- Duplicating an ad set does NOT rename its child ads, so two ad sets can have identical ad names (e.g., `Partners_Pain-DrowningInRecords-2` exists in both `PI_Partners` and `PI_Partners - Copy`). Name-only identification is unreliable. Use ad set membership.
- Dialog row DOM does not expose ad/adset IDs, so programmatic scoping by ID via Playwright is not possible. Use the cascade trick instead.

### Ad Set Optimization & Triage Levers
All of these are set in Meta Ads Manager UI, not in code:
- **Budget:** Daily, currently $20/day per ad set. Increase incrementally (Meta recommends max 20% / 24h to avoid learning-phase reset).
- **Targeting:** Audience size 42.7M to 50.3M for current `PBC_Partners_ADSET`. Tightening (geographic, job title) usually improves cost-per-result but slows learning.
- **Performance goal:** `Maximize number of leads` currently. Could switch to "Maximize value of conversion events" if revenue per CompleteRegistration becomes known.
- **Attribution:** Standard model, 7-day click + 1-day engaged-view. Don't change without explicit ask.
- **Cost per result goal:** None (let Meta optimize). Set a bid cap only when CAC discipline matters more than volume.
- **Conversion event:** `CompleteRegistration`. To switch, both update the code (fire a different standard event) AND change the ad set's selection in Meta UI. They must match.
- **Advantage+ creative enhancements:** Currently off. Enabling can lower CPR but reduces creative control.

### Designing a New Ad Set (Playbook)
1. Duplicate `PBC_Partners_ADSET` as a template. Rename it descriptively (e.g., `PI_SoloPractitioner_Test` or `PBC_ManagingPartners_ADSET`).
2. Adjust targeting (job title / interest / lookalike).
3. Confirm Dataset is `my_fb_pixel` and Conversion event is `Complete registration`.
4. Replace creative variants. Keep the pain-point framing structure since that's the active test.
5. Start at $20/day to match. Compare cost-per-CompleteRegistration after 50-100 events before scaling.
6. Publish via the cascade trick to avoid pulling in unrelated drafts.

### Daily KPI audit workflow

When asked to "audit yesterday's ads" or similar:

1. `npm run meta:insights -- --level=ad --date-preset=yesterday` → grab volume, CTR, spend, conversions per ad
2. Run the PostHog SQL above with yesterday's date to enumerate fbclid pageviews
3. Counts should match within 1-2 (Meta's click count may include duplicate same-person clicks Meta dedupes differently)
4. For each Meta-clicked person, query their event timeline: `SELECT timestamp, event, properties.$pathname FROM events WHERE person_id = '<id>' AND timestamp >= toDate('YYYY-MM-DD') AND timestamp < toDate('YYYY-MM-DD' + 1) ORDER BY timestamp`
5. Bounce signals: only `$pageview` + `$web_vitals` within a few seconds, no scroll/click. If most paid clicks are sub-10-second bounces, the issue is creative-LP match or FB In-App Browser performance.
6. Reporting lag: Meta's last 24h numbers are directional, not final. T+3 to T+4 days is "settled."

**Throttle headers** (logged to stderr by client.ts when high): watch `app_id_util_pct`, `acc_id_util_pct` in `x-fb-ads-insights-throttle`. Backoff if either >75%.

### Phase 2: Server-side Conversions API (CAPI) (NOT YET BUILT)
- Status: pre-wired (`event_id` UUID plumbing) but no server route yet
- When to build: better attribution under iOS tracking restrictions and ad blockers
- Estimated effort: ~1 day. Add `/api/meta-capi` POST handler that hashes PII (em, ph, fn, ln) and calls `https://graph.facebook.com/v{...}/{pixel_id}/events` with the `eventID` from the browser event for dedupe. Trigger alongside `trackMetaCompleteRegistration`.

### What NOT to change without explicit ask
- `NEXT_PUBLIC_META_PIXEL_ID` in Vercel env vars (this is the live pixel)
- `MetaPixel` mount in `app/layout.tsx`
- CSP allowlist for `connect.facebook.net` / `www.facebook.com` in `next.config.ts`
- EU geo-suppression in `proxy.ts` + the `cd_pixel_blocked` check in `MetaPixel`
- FB domain verification meta tag in `app/layout.tsx`
- Live ad set `PBC_Partners_ADSET` (52531549521005) configuration (real spend is attached)
- The 5 live ad creatives in Processing (Meta may reject re-edits during review)

## Common Tasks

### Adding a Page
1. Create `app/<route>/page.tsx` (App Router). Add `metadata` for SEO.
2. Register it in `app/sitemap.ts` and add any old-URL redirects in `next.config.ts`.

### Adding a Blog Post
1. Drop a `.mdx` file in `content/blog/` with frontmatter (title, description, date, tags).
2. It auto-surfaces on `/blog` and `/blog/[slug]` (see `lib/blog.ts`).

### Modifying Design Tokens
1. Edit CSS variables in `app/globals.css`
2. Update `design-tokens.json` for documentation

### Tracking Conversions
- PostHog captures pageviews + UTM first-touch automatically (see `lib/posthog.ts`).
- The demo-booking conversion fires `trackMetaCompleteRegistration` (`lib/meta-pixel.ts`) from `components/demo/DemoBody.tsx` `handleBooked()`, and a `demo_booked` PostHog event.

## Design Philosophy
- **Minimalist & Professional:** Inspired by Harvey, Rogo, Sierra
- **Grayscale-First:** Color only for semantic meaning
- **Accessibility:** WCAG 2.1 AA compliant
- **Performance:** Lazy-loaded analytics, zero Core Web Vitals impact
- **Mobile-First:** Responsive design from smallest screens up

## Current State
- Multi-page marketing site (home, features, use-cases, blog, pricing, demo, security, legal) live in production on Vercel
- PostHog analytics: Integrated but optional
- LinkedIn Insight Tag: Live in production
- Meta Pixel: Live in production (pixel `957094783732140`, see "Paid Meta Ads" section)
- Paid Meta ad set `PBC_Partners_ADSET` (52531549521005) live, $20/day, 6 ads (PBC-AD-1 through PBC-AD-6) testing 6 cross-dimensional pain hooks per the PBC Week 1 framework (rewrite shipped 2026-05-19)
- A/B variant routing: removed (vestigial machinery only, see "Edge Proxy & Geo-Suppression")
