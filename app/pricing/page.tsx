import { Metadata } from "next";
import PricingClient from "./PricingClient";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Pricing — Flat Firm Pricing, No Per-Seat Fees",
  description:
    "One price for the whole firm. Start with free credits, scale to flat monthly tiers. Delta costs a fraction of a paralegal — and everything it learns stays permanently.",
  alternates: { canonical: "https://casedelta.com/pricing" },
  openGraph: {
    title: "Pricing — Flat Firm Pricing, No Per-Seat Fees",
    description:
      "One price for the whole firm. Start with free credits, scale to flat monthly tiers. Delta costs a fraction of a paralegal — and everything it learns stays permanently.",
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
            answer: "CaseDelta offers two tracks. Self-serve starts free with $50 in credits \u2014 pay only for what you use. Sales-led firms get flat monthly pricing: $799/month (5-10 attorneys), $1,499/month (10-25 attorneys), or $2,499/month (25-50 attorneys). No per-seat fees. One price for the whole firm.",
          },
          {
            question: "Is there a free trial?",
            answer: "Yes. Every firm starts with $50 in free credits \u2014 no credit card required. Delta begins learning your jurisdiction immediately. You\u2019ll see what Delta knows about your courts, judges, and local rules before you connect a single document.",
          },
          {
            question: "Why flat pricing instead of per-seat?",
            answer: "Per-seat pricing punishes firms for giving their team access to AI. We want every attorney and paralegal using Delta \u2014 the more people use it, the faster it learns your firm. Flat pricing means the whole firm benefits without budgeting per head.",
          },
          {
            question: "How does CaseDelta compare to hiring a paralegal?",
            answer: "A paralegal costs $50,000-70,000 per year fully loaded \u2014 and when they leave, everything they\u2019ve learned walks out the door. Delta costs $6,000-18,000 per year, handles the cognitive work a paralegal would, and everything it learns stays permanently.",
          },
          {
            question: "Can I cancel anytime?",
            answer: "Yes, with no cancellation fees. But keep in mind: when you cancel, you lose everything Delta has learned about your firm \u2014 your judges, your opposing counsel, your preferences, your institutional memory. That knowledge doesn\u2019t transfer.",
          },
        ]}
      />
      <PricingClient />
    </>
  );
}
