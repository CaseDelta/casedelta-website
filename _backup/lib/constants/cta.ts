export const CTA = {
  GET_STARTED: "Get Started Free",
  CREATE_ACCOUNT: "Start Free — $50 Credit",
  SEE_HOW: "See How Delta Learns",
  SIGN_IN: "Sign In",
} as const;

export type CTAValue = (typeof CTA)[keyof typeof CTA];

export const CTA_URLS = {
  GET_STARTED: "https://app.casedelta.com/signup",
  CREATE_ACCOUNT: "https://app.casedelta.com/signup",
  SEE_HOW: "#platform",
  SIGN_IN: "https://app.casedelta.com",
} as const;
