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
            title: "Document Collection",
            description: "Automated client document requests and tracking",
            href: "#document-collection",
          },
          {
            title: "AI Verification",
            description: "Smart document validation before submission",
            href: "#ai-verification",
          },
          {
            title: "Client Portal",
            description: "Secure portal for client communications",
            href: "#client-portal",
          },
          {
            title: "Integrations",
            description: "Connect with your existing legal tools",
            href: "#integrations",
          }
        ],
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy",
    href: "/privacy",
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
  },
  {
    id: "about",
    label: "About",
    href: "/about",
  },
];
