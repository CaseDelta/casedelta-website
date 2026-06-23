import { Metadata } from "next";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";
import { getAllAnswers } from "@/lib/answers";
import { AnswersContent } from "./AnswersContent";

export const metadata: Metadata = {
  title: "CaseDelta Answers: What It Is, Integrations, Pricing, Security",
  description:
    "CaseDelta is an AI associate for litigation firms that connects across the tools you already use. Direct answers on what CaseDelta does, integrations, chronologies, pricing, and security.",
  alternates: { canonical: "https://casedelta.com/answers" },
  openGraph: {
    title: "CaseDelta Answers",
    description:
      "Direct answers on what CaseDelta is, how it integrates, what it costs, and how it handles your data.",
    url: "https://casedelta.com/answers",
    siteName: "CaseDelta",
    type: "website",
  },
};

export default function AnswersPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Answers", url: "https://casedelta.com/answers" },
        ]}
      />
      <FAQSchema faqs={getAllAnswers().map((a) => ({ question: a.question, answer: a.answer }))} />
      <AnswersContent />
    </>
  );
}
