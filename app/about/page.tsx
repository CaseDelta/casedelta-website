import type { Metadata } from "next";
import { PersonSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About CaseDelta — The Personal Assistant Across Your Firm's Stack",
  description:
    "Plaintiff firms run on Clio, Word, Gmail or Outlook, Drive, and Calendar. CaseDelta is the personal assistant across all of them. The attorney decides. Delta does the work.",
  alternates: {
    canonical: "https://casedelta.com/about",
  },
  openGraph: {
    title: "About CaseDelta — The Personal Assistant Across Your Firm's Stack",
    description:
      "Plaintiff firms run on Clio, Word, Gmail or Outlook, Drive, and Calendar. CaseDelta is the personal assistant across all of them. The attorney decides. Delta does the work.",
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
