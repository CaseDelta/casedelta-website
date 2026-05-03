import { Metadata } from "next";
import PricingClient from "./PricingClient";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Pricing — Flat Firm Pricing, No Per-Seat Fees",
  description:
    "One price for the whole firm. Usage-based for self-serve, flat monthly tiers for sales-led engagements. No per-seat fees.",
  alternates: { canonical: "https://casedelta.com/pricing" },
  openGraph: {
    title: "Pricing — Flat Firm Pricing, No Per-Seat Fees",
    description:
      "One price for the whole firm. Usage-based for self-serve, flat monthly tiers for sales-led engagements. No per-seat fees.",
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
      <FAQSchema
        faqs={[
          {
            question: "How much does CaseDelta cost?",
            answer:
              "CaseDelta offers two tracks. Self-serve starts with credits and usage-based pricing. Sales-led firms get flat monthly pricing: $799/month (5-10 attorneys), $1,499/month (10-25 attorneys), or $2,499/month (25-50 attorneys). No per-seat fees. One price for the whole firm.",
          },
          {
            question: "Why flat firm pricing instead of per-seat?",
            answer:
              "Per-seat pricing creates friction every time the firm adds a paralegal or an associate. We want every person at the firm using Delta. Flat pricing means the whole firm gets the assistant without budgeting per head.",
          },
          {
            question: "How does CaseDelta compare to hiring a paralegal?",
            answer:
              "Delta is not a substitute for headcount. It is the personal assistant that runs work across your firm's stack so the team you have can operate at the scope of a much larger firm. The right comparison is workflow throughput, not hourly cost.",
          },
          {
            question: "What about volume discounts?",
            answer:
              "Mass tort and class firms with high plaintiff counts have different needs than a five-attorney PI shop. We work out pricing on the engagement, not on a price list. Talk to us.",
          },
          {
            question: "Can we cancel anytime?",
            answer:
              "Yes, with no cancellation fees. CaseDelta runs on a private enterprise deployment. Your data stays yours, on or off the platform.",
          },
        ]}
      />
      <PricingClient />
    </>
  );
}
