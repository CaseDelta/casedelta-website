import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { CompareIndexContent } from "./CompareIndexContent";

export const metadata: Metadata = {
  title: "CaseDelta vs the Alternatives: EvenUp, Supio, Eve, Clio, and More",
  description:
    "Honest, sourced comparisons of CaseDelta against EvenUp, Supio, Eve, Clio's AI, ProPlaintiff, and ChatGPT. Most legal AI is a destination you upload to. Delta drives the tools you already run.",
  alternates: { canonical: "https://casedelta.com/compare" },
  openGraph: {
    title: "CaseDelta vs the Alternatives",
    description:
      "Honest, sourced comparisons of CaseDelta against the legal AI field: EvenUp, Supio, Eve, Clio, ProPlaintiff, and ChatGPT.",
    url: "https://casedelta.com/compare",
    siteName: "CaseDelta",
    type: "website",
  },
};

export default function CompareIndexPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Compare", url: "https://casedelta.com/compare" },
        ]}
      />
      <CompareIndexContent />
    </>
  );
}
