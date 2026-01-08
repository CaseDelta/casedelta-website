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
 * - Company: Company information and resources
 * - Legal: Legal documents and policies
 * - Contact: Contact methods (email links)
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
        href: "/pricing",
      },
      {
        label: "Security",
        href: "/#security",
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
    title: "Legal",
    links: [
      {
        label: "Terms of Service",
        href: "/terms",
      },
      {
        label: "Privacy Policy",
        href: "/privacy",
      },
      {
        label: "AI Policy",
        href: "/ai-policy",
      },
      {
        label: "SMS Opt-in",
        href: "/sms-opt-in",
      },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "Support",
        href: "mailto:support@casedelta.com",
        isExternal: true,
      },
      {
        label: "Sales",
        href: "mailto:sales@casedelta.com",
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
