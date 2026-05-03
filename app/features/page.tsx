import { Metadata } from "next";
import FeaturesClient from "./FeaturesClient";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "What CaseDelta Does — One Assistant Across Your Firm's Stack",
  description:
    "Delta connects across Clio, Word, Gmail or Outlook, Drive, and Calendar. Tell it what you need in one sentence. Hours of work across many tools, done in one go.",
  alternates: { canonical: "https://casedelta.com/features" },
  openGraph: {
    title: "What CaseDelta Does — One Assistant Across Your Firm's Stack",
    description:
      "Delta connects across Clio, Word, Gmail or Outlook, Drive, and Calendar. Tell it what you need in one sentence. Hours of work across many tools, done in one go.",
    url: "https://casedelta.com/features",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Features", url: "https://casedelta.com/features" },
        ]}
      />
      <FAQSchema
        faqs={[
          {
            question: "Which tools does Delta connect to?",
            answer:
              "Clio, Microsoft Word, Gmail, Outlook, Google Drive, Google Calendar, DocuSign, and Westlaw. Delta works inside the stack your firm already uses, rather than asking the firm to migrate to a new platform.",
          },
          {
            question: "How does Delta run work across multiple tools at once?",
            answer:
              "Tell Delta what you need in one sentence. It pulls records from Drive, drafts in Word, sends from your inbox, and updates Clio. The legal work and the administrative work happen in one conversation, instead of being split across five apps.",
          },
          {
            question: "Does Delta replace Clio or our case management system?",
            answer:
              "No. Delta connects to Clio and works alongside it. Cases, contacts, and time entries continue to live in Clio. Delta reads from and writes to Clio so your case management stays the source of truth.",
          },
          {
            question: "Where does our client data go?",
            answer:
              "Nowhere outside CaseDelta. We run on a private enterprise deployment. Your firm's data never touches a third-party AI provider. No shared models, no training on your files. Enterprise-grade security, sized to your firm.",
          },
          {
            question: "What does the morning briefing actually do?",
            answer:
              "Once a day, Delta produces a briefing built across Clio, your inbox, and your calendar: cases needing attention today, deadlines this week, opposing counsel and adjusters who owe responses, and anomalies surfaced overnight. The only proactive feature on Delta, by design.",
          },
        ]}
      />
      <FeaturesClient />
    </>
  );
}
