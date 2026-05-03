import { Metadata } from "next";
import TermsClient from "./TermsClient";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "CaseDelta terms of service. Delta is a productivity tool, not a lawyer. You retain full responsibility for all legal work.",
  alternates: { canonical: "https://casedelta.com/terms" },
  openGraph: {
    title: "Terms of Service",
    description:
      "CaseDelta terms of service. Delta is a productivity tool, not a lawyer. You retain full responsibility for all legal work.",
    url: "https://casedelta.com/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Terms of Service", url: "https://casedelta.com/terms" },
        ]}
      />
      <TermsClient />
    </>
  );
}
