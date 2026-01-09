import { ROUTES } from "@/lib/routes/routes";

/**
 * Footer Navigation Configuration
 *
 * This file defines the footer link structure and categorization.
 * Links are organized by category, and only existing pages are rendered.
 */

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean; // For mailto: links or external URLs
}

export interface FooterCategory {
  title: string;
  links: FooterLink[];
}

/**
 * Footer navigation structure
 *
 * Categories:
 * - Product: Features and pricing information (hash links to homepage sections)
 * - Legal: Legal documents and policies
 * - Company: Getting started and sales inquiry
 * - Account: User login
 */
export const footerCategories: FooterCategory[] = [
  {
    title: "Product",
    links: [
      {
        label: "Features",
        href: "/#features",
      },
      {
        label: "Pricing",
        href: ROUTES.PRICING,
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Terms of Service",
        href: ROUTES.TERMS,
      },
      {
        label: "Privacy Policy",
        href: ROUTES.PRIVACY,
      },
      {
        label: "AI Policy",
        href: ROUTES.AI_POLICY,
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "Get Started",
        href: "/#get-started",
      },
    ],
  },
  {
    title: "Account",
    links: [
      {
        label: "Sign In",
        href: "https://app.casedelta.com",
        isExternal: true,
      },
      {
        label: "Forgot Password",
        href: "https://app.casedelta.com/forgot-password",
        isExternal: true,
      },
    ],
  },
];

/**
 * Get filtered footer categories
 *
 * This function can be extended to filter out non-existent pages
 * based on filesystem checks or feature flags.
 *
 * For now, it returns all categories as-is since all pages exist.
 */
export function getFooterCategories(): FooterCategory[] {
  return footerCategories;
}
