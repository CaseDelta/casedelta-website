import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | CaseDelta",
  description:
    "Sold by firm, not by seat. Built for fit and scope, not for budget. Plaintiff firms engage on flat monthly pricing sized to the practice.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
