export const CTA = {
  GET_STARTED: "Get Started",
  START_FREE_TRIAL: "Start Free Trial",
  SCHEDULE_DEMO: "Schedule Demo",
  REQUEST_DEMO: "Request a Demo",
  WATCH_DEMO: "Watch Demo",
  GET_INFO: "Get Info",
  LEARN_MORE: "Learn More",
  SEE_HOW: "See How It Works",
  SIGN_IN: "Sign In",
  SIGN_UP: "Sign Up",
} as const;

export type CTAValue = (typeof CTA)[keyof typeof CTA];

export const CTA_URLS = {
  GET_STARTED: "https://app.casedelta.com",
  START_FREE_TRIAL: "https://app.casedelta.com",
  SCHEDULE_DEMO: "https://app.casedelta.com",
  REQUEST_DEMO: "https://app.casedelta.com",
  WATCH_DEMO: "https://app.casedelta.com",
  GET_INFO: "https://app.casedelta.com",
  LEARN_MORE: "https://app.casedelta.com",
  SEE_HOW: "#platform",
  SIGN_IN: "https://app.casedelta.com",
  SIGN_UP: "https://app.casedelta.com",
} as const;
