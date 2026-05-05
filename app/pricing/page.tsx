import { Metadata } from "next";
import PricingClient from "./PricingClient";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Pricing: Sold by Firm, Not by Seat",
  description:
    "One price for the whole firm. Usage-based for self-serve, flat monthly tiers for sales-led engagements. No per-seat fees.",
  alternates: { canonical: "https://casedelta.com/pricing" },
  openGraph: {
    title: "Pricing: Sold by Firm, Not by Seat",
    description:
      "Sold by firm, not by seat. Built for fit and scope, not for budget. Plaintiff firms engage on flat monthly pricing sized to the practice and the workflows Delta runs.",
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
              "CaseDelta is priced by engagement, not by seat. We are not a budget tool. We compete on fit, scope, and how Delta integrates into the work your firm already runs. Plaintiff firms in the 5 to 50 attorney range typically engage on a flat monthly basis sized to the practice. Talk to us about your stack and your caseload.",
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
