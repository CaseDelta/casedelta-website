import { Metadata } from "next";
import PricingClient from "./PricingClient";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Pricing: $349 per User, per Month",
  description:
    "Flat $349 per user, per month. No tiers, no add-ons, no setup fees. Pays for itself in week one through recovered admin hours.",
  alternates: { canonical: "https://casedelta.com/pricing" },
  openGraph: {
    title: "Pricing: $349 per User, per Month",
    description:
      "Flat $349 per user, per month for every attorney, paralegal, and admin at the firm. Pays for itself in week one.",
    url: "https://casedelta.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Pricing", url: "https://casedelta.com/pricing" },
        ]}
      />
      <PricingClient />
    </>
  );
}
