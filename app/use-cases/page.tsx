import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { UseCasesIndexContent } from "./UseCasesIndexContent";

/* ─── Metadata ─── */

export const metadata: Metadata = {
  title: "Use Cases — One Assistant Across Your Firm's Stack | CaseDelta",
  description:
    "How CaseDelta runs across the tools plaintiff firms already use. Personal injury, medical malpractice, employment, and mass tort workflows in one conversation.",
  alternates: {
    canonical: "https://casedelta.com/use-cases",
  },
  openGraph: {
    title: "Use Cases — One Assistant Across Your Firm's Stack | CaseDelta",
    description:
      "How CaseDelta runs across the tools plaintiff firms already use. Personal injury, medical malpractice, employment, and mass tort workflows in one conversation.",
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
