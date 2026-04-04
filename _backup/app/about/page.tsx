import type { Metadata } from "next";
import { PersonSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About CaseDelta — The AI Associate That Learns Your Firm",
  description:
    "CaseDelta was built on one insight: the most valuable knowledge in a law firm exists only in people's heads, and people leave. Delta changes that.",
  alternates: {
    canonical: "https://casedelta.com/about",
  },
  openGraph: {
    title: "About CaseDelta — The AI Associate That Learns Your Firm",
    description:
      "CaseDelta was built on one insight: the most valuable knowledge in a law firm exists only in people's heads, and people leave. Delta changes that.",
    url: "https://casedelta.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "About", url: "https://casedelta.com/about" },
        ]}
      />
      <PersonSchema
        name="Camren Hall"
        jobTitle="Founder & CEO"
        description="Founder and CEO of CaseDelta. Vanderbilt University (Computer Science & Applied Mathematics). Previously built data systems at Capital One. Member of the Kansas City Metropolitan Bar Association."
        sameAs={[
          "https://www.linkedin.com/in/camren-hall",
          "https://www.linkedin.com/company/casedelta",
        ]}
      />
      <AboutContent />
    </>
  );
}
