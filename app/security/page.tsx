import { Metadata } from "next";
import SecurityClient from "./SecurityClient";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Security — Delta Learns Inside Your Firm's Walls",
  description:
    "Your client data never touches OpenAI, Google, or any third party. Every AI model runs inside CaseDelta's infrastructure. Full audit trail. ABA Rule 1.6 compliant by architecture.",
  alternates: { canonical: "https://casedelta.com/security" },
  openGraph: {
    title: "Security — Delta Learns Inside Your Firm's Walls",
    description:
      "Your client data never touches OpenAI, Google, or any third party. Every AI model runs inside CaseDelta's infrastructure. Full audit trail. ABA Rule 1.6 compliant by architecture.",
    url: "https://casedelta.com/security",
  },
};

export default function SecurityPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Security", url: "https://casedelta.com/security" },
        ]}
      />
      <FAQSchema
        faqs={[
          {
            question: "Does my client data go to OpenAI or other AI providers?",
            answer: "No. Every AI model runs inside CaseDelta\u2019s own infrastructure. Your documents, case notes, and client information never touch OpenAI, Google, Anthropic, or any third-party AI service. This is architectural \u2014 not a policy that can be changed.",
          },
          {
            question: "Is CaseDelta ABA Rule 1.6 compliant?",
            answer: "Yes. ABA Rule 1.6 requires lawyers to make reasonable efforts to prevent unauthorized disclosure of client information. CaseDelta is designed for this: encrypted data at rest and in transit, complete data isolation per firm, full audit trail of every action, and no external AI processing.",
          },
          {
            question: "What happens to my data if I cancel?",
            answer: "Your data is yours. You can export everything before canceling. After cancellation, your data is permanently deleted from CaseDelta\u2019s systems within 30 days. Delta\u2019s learned intelligence about your firm is also deleted \u2014 it does not persist or transfer.",
          },
          {
            question: "Who can see my firm\u2019s data?",
            answer: "Only authorized users at your firm. CaseDelta maintains complete data isolation between firms. No CaseDelta employee can access your case data without explicit authorization. The Intelligence Network uses only anonymized, aggregated patterns \u2014 never identifiable case details.",
          },
          {
            question: "Is there an audit trail?",
            answer: "Yes. Every action Delta takes is logged: timestamp, document accessed, query made, answer generated, sources cited. The full audit trail is exportable for bar compliance review. This isn\u2019t optional \u2014 it\u2019s core architecture.",
          },
        ]}
      />
      <SecurityClient />
    </>
  );
}
