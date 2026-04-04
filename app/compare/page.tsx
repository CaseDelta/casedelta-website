import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { CompareIndexClient } from "./CompareIndexClient";

export const metadata: Metadata = {
  title: "Compare CaseDelta — vs Harvey, Clio, LexisNexis, ChatGPT",
  description:
    "See how CaseDelta compares to Harvey, Clio, LexisNexis, and ChatGPT. Delta is the only legal AI that builds persistent institutional memory and network intelligence for your firm.",
  alternates: {
    canonical: "https://casedelta.com/compare",
  },
  openGraph: {
    title: "Compare CaseDelta — vs Harvey, Clio, LexisNexis, ChatGPT",
    description:
      "See how CaseDelta compares to Harvey, Clio, LexisNexis, and ChatGPT. The only legal AI that learns your firm.",
    url: "https://casedelta.com/compare",
    type: "website",
  },
};

export default function ComparePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Compare", url: "https://casedelta.com/compare" },
        ]}
      />
      <CompareIndexClient />
    </>
  );
}
