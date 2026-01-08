/**
 * Centralized CTA (Call-to-Action) Text Constants
 *
 * This file contains all CTA text used across the CaseDelta website.
 * Use these constants to maintain consistency across all components and pages.
 *
 * Usage:
 * import { CTA } from '@/lib/constants/cta';
 * <button>{CTA.GET_STARTED}</button>
 */

export const CTA = {
  // Primary CTAs
  GET_STARTED: "Get Started",
  START_FREE_TRIAL: "Start Free Trial",

  // Demo CTAs
  SCHEDULE_DEMO: "Schedule Demo",
  REQUEST_DEMO: "Request Demo",
  WATCH_DEMO: "Watch Demo",

  // Info CTAs
  GET_INFO: "Get Info",
  LEARN_MORE: "Learn More",

  // Auth CTAs
  SIGN_IN: "Sign In",
  SIGN_UP: "Sign Up",
} as const;

// Type for CTA values (useful for TypeScript)
export type CTAValue = typeof CTA[keyof typeof CTA];

// CTA URLs - Centralized URLs for each CTA action
export const CTA_URLS = {
  GET_STARTED: "/get-info",
  START_FREE_TRIAL: "/get-info",
  SCHEDULE_DEMO: "/get-info",
  REQUEST_DEMO: "/get-info",
  WATCH_DEMO: "/get-info",
  GET_INFO: "/get-info",
  LEARN_MORE: "/get-info",
  SIGN_IN: "https://app.casedelta.com",
  SIGN_UP: "https://app.casedelta.com",
} as const;
