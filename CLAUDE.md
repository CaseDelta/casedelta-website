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
NEXT_PUBLIC_POSTHOG_KEY=phc_...           # PostHog API key (optional)
NEXT_PUBLIC_POSTHOG_HOST=https://...      # PostHog endpoint
NEXT_PUBLIC_ENABLE_AB_TESTING=false       # Toggle A/B testing
NEXT_PUBLIC_POSTHOG_DEBUG=false           # Console logging
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
- Ready for production deployment

## Next Steps (Typical)
1. Replace placeholder video with actual product demo (`/public/videos/`)
2. Add real feature screenshots to value prop sections
3. Enable A/B testing in production
4. Monitor PostHog for variant performance
