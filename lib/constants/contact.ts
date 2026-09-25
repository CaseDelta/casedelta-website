export const CONTACT_EMAILS = {
  SUPPORT: "camren@casedelta.com",
} as const;

export type ContactEmail = typeof CONTACT_EMAILS[keyof typeof CONTACT_EMAILS];
