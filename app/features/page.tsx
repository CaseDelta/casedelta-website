import { Metadata } from "next";
import FeaturesClient from "./FeaturesClient";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "What Delta Does — AI That Learns Your Law Firm",
  description:
    "Delta connects to your Clio, learns your cases, your judges, and your opposing counsel — then handles the cognitive work eating your billable time. See what Delta does.",
  alternates: { canonical: "https://casedelta.com/features" },
  openGraph: {
    title: "What Delta Does — AI That Learns Your Law Firm",
    description:
      "Delta connects to your Clio, learns your cases, your judges, and your opposing counsel — then handles the cognitive work eating your billable time.",
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
            question: "How does Delta learn my firm?",
            answer: "Delta connects to your Clio, documents, and email with its own credentials. From day one, it starts learning your cases, clients, document types, and team workflows. After a week, it knows your caseload. After a month, it knows your drafting style and client patterns. After six months, it knows your firm better than a new associate would after 18 months.",
          },
          {
            question: "What does Delta do with what it learns?",
            answer: "Delta works proactively. Morning briefings across all active cases. Drafts prepared in your style. Anomalies flagged before you ask. When a client submits documents, Delta analyzes them against learned patterns, identifies what\u2019s missing, and drafts follow-up \u2014 all before you open the file.",
          },
          {
            question: "Does Delta work with my existing tools?",
            answer: "Delta integrates with Clio, Google Drive, Gmail, and more. It connects with its own credentials \u2014 the same way your bank connects. No data migration needed. Delta learns from your existing systems without disrupting your workflow.",
          },
          {
            question: "What is the Intelligence Network?",
            answer: "Every firm on CaseDelta contributes anonymized data to a shared intelligence layer. When you draw a judge you\u2019ve never seen, Delta already has data from firms who have \u2014 MSJ grant rates, brief preferences, opposing counsel patterns. Like Waze for law: every firm contributes by practicing, every firm benefits from the aggregate.",
          },
          {
            question: "Can I see what Delta has learned?",
            answer: "Yes. The \u2018What Delta Knows\u2019 page shows exactly what Delta has learned about your firm \u2014 practice areas, judge notes, opposing counsel patterns, client behavior, drafting preferences. It\u2019s visible, editable, and updated automatically as Delta learns.",
          },
        ]}
      />
      <FeaturesClient />
    </>
  );
}
