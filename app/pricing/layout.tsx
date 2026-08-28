import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | CaseDelta",
  description:
    "Priced per firm by account count, not per seat: $599 a month for up to 5 accounts, $1,099 for up to 10, $2,099 for up to 20. No add-ons, no setup fees, no per-case metering.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
