import { Metadata } from "next";
import SecurityClient from "./SecurityClient";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Security: Built for Bar Compliance",
  description:
    "Per-firm data isolation, a full audit trail, and AI that never trains on your data. CaseDelta is built for ABA Rule 1.6 compliance.",
  alternates: { canonical: "https://casedelta.com/security" },
  openGraph: {
    title: "Security: Built for Bar Compliance",
    description:
      "Per-firm data isolation, a full audit trail, and AI that never trains on your data. CaseDelta is built for ABA Rule 1.6 compliance.",
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
            question: "Does CaseDelta use third-party AI models like OpenAI or Anthropic?",
            answer: "Delta runs on enterprise AI models, used under strict agreements: your data is never used to train any model, never retained by the provider, and never sold or shared. Every matter is isolated to your firm with a full, exportable audit trail for bar compliance.",
          },
          {
            question: "Is CaseDelta ABA Rule 1.6 compliant?",
            answer: "Yes. ABA Rule 1.6 requires lawyers to make reasonable efforts to prevent unauthorized disclosure of client information. CaseDelta is built for this: encrypted data at rest and in transit, per-firm data isolation, a full audit trail of every action, and enterprise AI used under strict no-retention and no-training agreements.",
          },
          {
            question: "What happens to my data if I cancel?",
            answer: "Your data is yours. You can export everything before canceling. After cancellation, your data is permanently deleted from CaseDelta\u2019s systems within 30 days.",
          },
          {
            question: "Who can see my firm\u2019s data?",
            answer: "Only authorized users at your firm. CaseDelta isolates every firm\u2019s data, and no CaseDelta employee can access your case data without explicit authorization. The enterprise AI Delta uses never retains your data or uses it to train.",
          },
          {
            question: "Is there an audit trail?",
            answer: "Yes. Every action Delta takes is logged: timestamp, document accessed, query made, answer generated, sources cited. The full audit trail is exportable for bar compliance review. It is built in, not optional.",
          },
        ]}
      />
      <SecurityClient />
    </>
  );
}
