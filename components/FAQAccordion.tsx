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
    question: "What's included in the free trial?",
    answer:
      "14-day trial with full access to Professional plan features. No credit card required. Export all data if you don't continue.",
  },
  {
    question: "How does per-user pricing work?",
    answer:
      "Professional plan includes 5 users. Additional users are $219/month each. Adjust team size anytime from your billing dashboard.",
  },
  {
    question: "Can I change or cancel my plan?",
    answer:
      "Yes. Upgrade, downgrade, or cancel anytime. Changes take effect at your next billing cycle. No cancellation fees.",
  },
  {
    question: "Is my client data secure?",
    answer:
      "Yes. Bank-level encryption, SOC 2 compliance, zero-knowledge architecture. See our Security page for details.",
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
