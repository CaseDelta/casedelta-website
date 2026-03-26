import { ROUTES } from "@/lib/routes/routes";

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
    id: "platform",
    label: "Platform",
    href: "/#platform",
  },
  {
    id: "security",
    label: "Security",
    href: "/#security",
  },
  {
    id: "pricing",
    label: "Pricing",
    href: ROUTES.PRICING,
  },
];
