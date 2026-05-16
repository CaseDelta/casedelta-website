# CaseDelta Landing Page - AI Assistant Guide

## Project Overview
CaseDelta is an A/B testing landing page for a legal document collection platform. It features 5 variants testing different visual approaches (light/dark themes with various hero layouts) to optimize conversion for legal professionals.

**Core Value Proposition:** "Get documents from clients without the follow-up headache" - AI-powered document collection and verification for law firms.

## Tech Stack
- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v3.4 with custom CSS variables
- **Animation:** Framer Motion v11.15 (scroll-triggered effects)
- **Analytics:** PostHog v1.311 (A/B testing & product analytics)

## Project Structure
```
app/
├── layout.tsx              # Root layout with PostHog provider
├── page.tsx                # Variant selector dashboard
├── light/                  # Light theme variants
│   ├── side/              # Variant A: Video beside text
│   ├── bottom/            # Variant B: Video below text
│   └── fullscreen/        # Variant E: Fullscreen video
├── dark/                  # Dark theme variants
│   ├── side/              # Variant C
│   └── bottom/            # Variant D
└── providers/
    └── PostHogProvider.tsx

components/                # Reusable React components
├── Navbar.tsx            # Fixed navigation
├── Hero.tsx              # Hero section (supports "side" | "bottom" layout)
├── LandingContent.tsx    # Main landing page wrapper
├── ValuePropSection.tsx  # Reusable value prop cards
├── PageWrapper.tsx       # Theme wrapper (sets data-theme)
└── SectionHeader.tsx     # Section titles

middleware.ts             # Edge middleware for A/B testing
```

## Key Features

### Zero-Flicker A/B Testing
- Edge middleware assigns variants server-side before rendering
- Cookie persistence (30 days) keeps users in same variant
- URL rewriting: users see `casedelta.com`, backend serves `/light/side` etc.
- Toggle with `NEXT_PUBLIC_ENABLE_AB_TESTING` env var
- **Default:** Disabled (safe for development)

### Design System
- **Base Font Size:** 14px (custom CaseDelta standard, not 16px)
- **Spacing:** 4px grid system
- **Colors:** Grayscale-first palette, semantic colors only when needed
- **Typography:** Harvey Serif (headings) + CaseDelta Sans (body)
- **Themes:** Light and dark variants via CSS custom properties
- **Animation:** Respects `prefers-reduced-motion`

### Analytics Integration
- PostHog lazy-loads after page render (zero Core Web Vitals impact)
- `useTracking` hook for conversion tracking
- Automatic variant tracking
- Optional: disabled if `NEXT_PUBLIC_POSTHOG_KEY` not set

## Environment Variables
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_...                # PostHog API key (optional)
NEXT_PUBLIC_POSTHOG_HOST=https://...           # PostHog endpoint
NEXT_PUBLIC_ENABLE_AB_TESTING=false            # Toggle A/B testing
NEXT_PUBLIC_POSTHOG_DEBUG=false                # Console logging
NEXT_PUBLIC_META_PIXEL_ID=957094783732140      # Active Meta Pixel ID (see "Paid Meta Ads" section)
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=...            # LinkedIn Insight Tag partner ID
NEXT_PUBLIC_DEMO_BOOKING_URL=...               # Google appointment scheduler URL used by /demo CTA
# NEXT_PUBLIC_LINKEDIN_DEMO_STARTED_CONVERSION_ID=  # Optional: LinkedIn Campaign Manager conversion ID for demo_page_viewed. Deferred until LinkedIn paid ads launch.
# NEXT_PUBLIC_LINKEDIN_DEMO_BOOKED_CONVERSION_ID=   # Optional: LinkedIn Campaign Manager conversion ID for demo_booked. Deferred until LinkedIn paid ads launch.
```

## Important Files
- `BRAND_GUIDELINES.md` - Complete design system specs
- `AB_TESTING_README.md` - A/B testing architecture details
- `DESIGN_REFERENCES.md` - Design inspiration sources
- `design-tokens.json` - Machine-readable design tokens
- `FONTS.md` - Font system documentation

## Development Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3002)
npm run build        # Production build
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

CaseDelta runs paid Meta (Facebook/Instagram) ads targeting personal-injury law partners. The browser pixel is fully wired and verified end-to-end. The first ad set (`PI_Partners - Copy`) went live 2026-05-16 with 5 creative variants. Two other ad sets are intentionally still in draft and should not be published without explicit ask.

### Account & Asset IDs (canonical)
- **Ad account ID:** `238417253`
- **Meta Business ID:** `785362152836832`
- **Active pixel (Dataset):** `957094783732140`, named `my_fb_pixel` in Events Manager
- **Deprecated pixel (do NOT use):** `1112090197804629`. Replaced 2026-05-15. May still appear in Events Manager until manually deleted.
- **Verified FB domain:** `casedelta.com` (verification meta tag in `app/layout.tsx`, locked to the Meta Business above)

### Campaign Structure
- **Campaign:** `PBC1_PainTest` (pain-point test, the first paid Meta campaign)
- **Live ad set:** `PI_Partners - Copy` (ID `52531549521005`), $20/day daily, 5 ads in Processing as of 2026-05-16:
  - Partners_Pain-DrowningInRecords-2
  - Partners_Pain-EndlessDiscovery
  - Partners_Pain-BuriedCaseFacts- Copy
  - Partners_Pain-BriefPrepMarathons- Copy 2
  - Partners_Pain-ManualCaseTimelines- Copy 3
- **Draft ad sets (NOT YET PUBLISHED, leave alone unless asked):**
  - `PI_Partners` (ID `52524384751205`), $20/day, 5 ads. Has unresolved errors.
  - `PI_ManagingPartners` (ID `52523820017805`), $20/day, 1 ad. Has unresolved errors.

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
- `middleware.ts`: edge proxy reads `x-vercel-ip-country`, sets `cd_pixel_blocked=1` cookie for EU/EEA/UK/CH visitors. The pixel refuses to render when this cookie is present. Legal compliance, do not weaken.

### Environment Variables (Meta)
- `NEXT_PUBLIC_META_PIXEL_ID`: currently `957094783732140` in Vercel production. Required. Inlined at build time, so a swap needs a redeploy.

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
- **Targeting:** Audience size 42.7M to 50.3M for current `PI_Partners - Copy`. Tightening (geographic, job title) usually improves cost-per-result but slows learning.
- **Performance goal:** `Maximize number of leads` currently. Could switch to "Maximize value of conversion events" if revenue per CompleteRegistration becomes known.
- **Attribution:** Standard model, 7-day click + 1-day engaged-view. Don't change without explicit ask.
- **Cost per result goal:** None (let Meta optimize). Set a bid cap only when CAC discipline matters more than volume.
- **Conversion event:** `CompleteRegistration`. To switch, both update the code (fire a different standard event) AND change the ad set's selection in Meta UI. They must match.
- **Advantage+ creative enhancements:** Currently off. Enabling can lower CPR but reduces creative control.

### Designing a New Ad Set (Playbook)
1. Duplicate `PI_Partners - Copy` as a template. Rename it descriptively (e.g., `PI_SoloPractitioner_Test`).
2. Adjust targeting (job title / interest / lookalike).
3. Confirm Dataset is `my_fb_pixel` and Conversion event is `Complete registration`.
4. Replace creative variants. Keep the pain-point framing structure since that's the active test.
5. Start at $20/day to match. Compare cost-per-CompleteRegistration after 50-100 events before scaling.
6. Publish via the cascade trick to avoid pulling in unrelated drafts.

### Phase 2: Server-side Conversions API (CAPI) (NOT YET BUILT)
- Status: pre-wired (`event_id` UUID plumbing) but no server route yet
- When to build: better attribution under iOS tracking restrictions and ad blockers
- Estimated effort: ~1 day. Add `/api/meta-capi` POST handler that hashes PII (em, ph, fn, ln) and calls `https://graph.facebook.com/v{...}/{pixel_id}/events` with the `eventID` from the browser event for dedupe. Trigger alongside `trackMetaCompleteRegistration`.

### What NOT to change without explicit ask
- `NEXT_PUBLIC_META_PIXEL_ID` in Vercel env vars (this is the live pixel)
- `MetaPixel` mount in `app/layout.tsx`
- CSP allowlist for `connect.facebook.net` / `www.facebook.com` in `next.config.ts`
- EU geo-suppression in `middleware.ts` + the `cd_pixel_blocked` check in `MetaPixel`
- FB domain verification meta tag in `app/layout.tsx`
- Live ad set `PI_Partners - Copy` configuration (real spend is attached)
- The 5 live ad creatives in Processing (Meta may reject re-edits during review)

## Common Tasks

### Adding a New Variant
1. Create route in `app/[theme]/[layout]/page.tsx`
2. Update middleware.ts with new variant
3. Add to variant selector in `app/page.tsx`

### Modifying Design Tokens
1. Edit CSS variables in `app/globals.css`
2. Update `design-tokens.json` for documentation
3. Both light and dark themes use same variable names

### Tracking Conversions
```typescript
import { useTracking } from '@/hooks/useTracking';

const { trackConversion } = useTracking();
trackConversion('cta_click', { location: 'hero' });
```

### Testing A/B Testing Locally
1. Set `NEXT_PUBLIC_ENABLE_AB_TESTING=true` in `.env.local`
2. Visit `http://localhost:3002`
3. Clear `casedelta_variant` cookie to get reassigned
4. Check Network tab for variant assignment

## Design Philosophy
- **Minimalist & Professional:** Inspired by Harvey, Rogo, Sierra
- **Grayscale-First:** Color only for semantic meaning
- **Accessibility:** WCAG 2.1 AA compliant
- **Performance:** Zero-flicker A/B testing, lazy-loaded analytics
- **Mobile-First:** Responsive design from smallest screens up

## Current State
- A/B testing infrastructure: Complete & ready (disabled by default)
- 5 variants fully implemented
- PostHog analytics: Integrated but optional
- LinkedIn Insight Tag: Live in production
- Meta Pixel: Live in production (pixel `957094783732140`, see "Paid Meta Ads" section)
- First paid Meta ad set `PI_Partners - Copy` live in Meta's Processing queue (2026-05-16)
- Ready for production deployment

## Next Steps (Typical)
1. Replace placeholder video with actual product demo (`/public/videos/`)
2. Add real feature screenshots to value prop sections
3. Enable A/B testing in production
4. Monitor PostHog for variant performance
