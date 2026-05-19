import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | CaseDelta",
  description:
    "Flat $349 per user, per month. No tiers, no add-ons, no setup fees. Pays for itself in week one through recovered admin hours.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
