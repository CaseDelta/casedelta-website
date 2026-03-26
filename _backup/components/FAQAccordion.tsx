"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does the free tier work?",
    answer:
      "Sign up and get $50 in free credits — no credit card required. Delta immediately researches your jurisdiction and starts learning. Use credits for document analysis, case queries, and briefings. When credits run out, add more or upgrade to a flat firm plan.",
  },
  {
    question: "How is pricing different from Harvey or Paxton?",
    answer:
      "Harvey requires 40+ seats at $1,000/lawyer/month. Paxton charges $159-499 per seat. Delta charges per firm — not per seat. Your whole team gets access at one flat price. The more your team uses Delta, the more it learns, and the more valuable it becomes.",
  },
  {
    question: "What does Delta actually learn about my firm?",
    answer:
      "Delta learns your cases, clients, document types, drafting preferences, team workflows, and the patterns specific to your practice. This knowledge compounds over time and is visible on the 'What Delta Knows' page. You can review and edit anything Delta has learned.",
  },
  {
    question: "Is my client data secure?",
    answer:
      "No client data ever leaves CaseDelta's environment. No OpenAI, no Google, no third-party AI services. Delta connects to your tools with its own credentials. Every action is logged with a full audit trail for bar compliance. Your firm's intelligence is yours alone.",
  },
  {
    question: "What happens to what Delta learned if I cancel?",
    answer:
      "Your data is always yours. You can export everything. But the institutional memory Delta has built — the learning, the patterns, the intelligence — that resets. It's like a senior associate leaving. Starting over means starting from zero.",
  },
];

function FAQItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-surface transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-8 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-6 font-serif text-xl leading-tight tracking-tight text-text-high-contrast md:text-2xl">
          {item.question}
        </span>
        <ChevronDown
          className={`shrink-0 text-text-secondary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={24}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-0 text-lg leading-[1.7] text-text-secondary">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion() {
  return (
    <section className="bg-surface py-32 md:py-40">
      <div className="mx-auto max-w-[900px] px-6">
        <div className="mb-20 text-center">
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.15] tracking-tight text-text-high-contrast">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {faqData.map((item, index) => (
            <FAQItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
