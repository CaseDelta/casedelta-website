import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | CaseDelta",
  description:
    "Pay for what you use. Start free with $25 in credits. No per-seat fees.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
