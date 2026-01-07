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
            title: "AI-Powered Client Reminders",
            description: "Automated follow-ups that keep cases moving",
            href: "/#ai-reminders",
          },
          {
            title: "Document Verification",
            description: "AI that validates documents before submission",
            href: "/#document-verification",
          },
          {
            title: "Built for Legal Workflows",
            description: "Secure, compliant, and fully integrated",
            href: "/#legal-workflows",
          },
          {
            title: "Save Hours Every Week",
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
    href: "/ai-policy",
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
  },
];
