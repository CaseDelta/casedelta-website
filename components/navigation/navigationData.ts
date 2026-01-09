import { ROUTES } from "@/lib/routes/routes";
import { LANDING_CONTENT } from "@/lib/constants/landing";

export interface DropdownItem {
  title: string;
  description: string;
  href: string;
}

export interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

export interface NavItemData {
  id: string;
  label: string;
  href?: string;
  dropdown?: DropdownSection[];
}

export const navigationData: NavItemData[] = [
  {
    id: "product",
    label: "Product",
    dropdown: [
      {
        items: [
          {
            title: LANDING_CONTENT.valueProps.aiReminders.title,
            description: "Automated follow-ups that keep cases moving",
            href: "/#ai-reminders",
          },
          {
            title: LANDING_CONTENT.valueProps.documentVerification.title,
            description: "AI that validates documents before submission",
            href: "/#document-verification",
          },
          {
            title: LANDING_CONTENT.valueProps.legalWorkflows.title,
            description: "Secure, compliant, and fully integrated",
            href: "/#legal-workflows",
          },
          {
            title: LANDING_CONTENT.valueProps.timeSavings.title,
            description: "Reduce document collection time by 70%",
            href: "/#time-savings",
          }
        ],
      },
    ],
  },
  {
    id: "ai-policy",
    label: "AI Policy",
    href: ROUTES.AI_POLICY,
  },
  {
    id: "pricing",
    label: "Pricing",
    href: ROUTES.PRICING,
  },
];
