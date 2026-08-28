import { Metadata } from "next";
import PricingClient from "./PricingClient";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Pricing: $599 to $2,099 a Month, per Firm",
  description:
    "Priced per firm by account count, not per seat: $599 a month for up to 5 accounts, $1,099 for up to 10, $2,099 for up to 20. No add-ons, no setup fees, no per-case metering.",
  alternates: { canonical: "https://casedelta.com/pricing" },
  openGraph: {
    title: "Pricing: $599 to $2,099 a Month, per Firm",
    description:
      "One flat monthly price for the whole firm, by account count. Three equivalent tiers from $599 to $2,099. Published and self-serve.",
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
