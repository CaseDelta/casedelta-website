/**
 * Centralized Contact Information
 *
 * This file contains all contact email addresses used across the CaseDelta website.
 * Update these constants to change contact information site-wide.
 */

export const CONTACT_EMAILS = {
  SUPPORT: "camren@casedelta.com",
  GENERAL: "contact@casedelta.com",
  PRIVACY: "privacy@casedelta.com",
} as const;

// Type for contact email values
export type ContactEmail = typeof CONTACT_EMAILS[keyof typeof CONTACT_EMAILS];
