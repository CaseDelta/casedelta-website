export const CTA = {
  GET_STARTED: "Get Started",
  START_FREE_TRIAL: "Start Free Trial",
  SCHEDULE_DEMO: "Create Free Account",
  REQUEST_DEMO: "Create Free Account",
  WATCH_DEMO: "Create Free Account",
  GET_INFO: "Get Started",
  LEARN_MORE: "Get Started",
  SEE_HOW: "See How It Works",
  SIGN_IN: "Sign In",
  SIGN_UP: "Sign Up",
} as const;

export type CTAValue = (typeof CTA)[keyof typeof CTA];

export const CTA_URLS = {
  GET_STARTED: "https://app.casedelta.com/signup",
  START_FREE_TRIAL: "https://app.casedelta.com/signup",
  SCHEDULE_DEMO: "https://app.casedelta.com/signup",
  REQUEST_DEMO: "https://app.casedelta.com/signup",
  WATCH_DEMO: "https://app.casedelta.com/signup",
  GET_INFO: "https://app.casedelta.com/signup",
  LEARN_MORE: "https://app.casedelta.com/signup",
  SEE_HOW: "#platform",
  SIGN_IN: "https://app.casedelta.com",
  SIGN_UP: "https://app.casedelta.com/signup",
} as const;
