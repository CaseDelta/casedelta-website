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
            title: LANDING_CONTENT.valueProps.valueProp1.title,
            description: LANDING_CONTENT.valueProps.valueProp1.navDescription,
            href: "/#ai-reminders",
          },
          {
            title: LANDING_CONTENT.valueProps.valueProp2.title,
            description: LANDING_CONTENT.valueProps.valueProp2.navDescription,
            href: "/#document-verification",
          },
          {
            title: LANDING_CONTENT.valueProps.valueProp3.title,
            description: LANDING_CONTENT.valueProps.valueProp3.navDescription,
            href: "/#legal-workflows",
          },
          {
            title: LANDING_CONTENT.valueProps.valueProp4.title,
            description: LANDING_CONTENT.valueProps.valueProp4.navDescription,
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
