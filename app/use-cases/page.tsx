import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { UseCasesIndexContent } from "./UseCasesIndexContent";

/* ─── Metadata ─── */

export const metadata: Metadata = {
  title: "Use Cases — How Delta Learns Your Practice Area | CaseDelta",
  description:
    "See how CaseDelta's AI associate Delta learns the patterns, judges, opposing counsel, and institutional knowledge specific to your practice area. Commercial litigation, employment law, insurance defense, medical malpractice.",
  alternates: {
    canonical: "https://casedelta.com/use-cases",
  },
  openGraph: {
    title: "Use Cases — How Delta Learns Your Practice Area | CaseDelta",
    description:
      "See how CaseDelta's AI associate Delta learns the patterns, judges, opposing counsel, and institutional knowledge specific to your practice area.",
    url: "https://casedelta.com/use-cases",
    siteName: "CaseDelta",
    type: "website",
  },
};

/* ─── Page ─── */

export default function UseCasesIndex() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Use Cases", url: "https://casedelta.com/use-cases" },
        ]}
      />
      <UseCasesIndexContent />
    </>
  );
}
