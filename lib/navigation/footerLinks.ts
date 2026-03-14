import { ROUTES } from "@/lib/routes/routes";

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterCategory {
  title: string;
  links: FooterLink[];
}

export const footerCategories: FooterCategory[] = [
  {
    title: "Platform",
    links: [
      { label: "Document Analysis", href: "/#platform" },
      { label: "Case Monitoring", href: "/#platform" },
      { label: "Institutional Memory", href: "/#platform" },
      { label: "Integrations", href: "/#platform" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Personal Injury", href: ROUTES.SOLUTIONS_PI },
      { label: "Medical Malpractice", href: ROUTES.SOLUTIONS_MED_MAL },
      { label: "Employment Law", href: ROUTES.SOLUTIONS_EMPLOYMENT },
      { label: "Commercial Litigation", href: ROUTES.SOLUTIONS_COMMERCIAL_LIT },
      { label: "Mid-Sized Firms", href: ROUTES.SOLUTIONS_MID_SIZED },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Company", href: ROUTES.ABOUT },
      { label: "Security", href: "/#security" },
      { label: "AI Policy", href: ROUTES.AI_POLICY },
      { label: "Pricing", href: ROUTES.PRICING },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Terms of Service", href: ROUTES.TERMS },
      { label: "Privacy Policy", href: ROUTES.PRIVACY },
      { label: "SMS Opt In", href: ROUTES.SMS_OPT_IN },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        label: "Get Started",
        href: "https://app.casedelta.com",
        isExternal: true,
      },
      {
        label: "Sign In",
        href: "https://app.casedelta.com",
        isExternal: true,
      },
      {
        label: "Email Us",
        href: "mailto:camren@casedelta.com",
        isExternal: true,
      },
    ],
  },
];

export function getFooterCategories(): FooterCategory[] {
  return footerCategories;
}
