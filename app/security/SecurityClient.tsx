"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { BottomCTA } from "@/components/BottomCTA";

const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];


const SECURITY_FAQS = [
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
];

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 4vw, 48px)",
      }}
    >
      <h2
        style={{
          fontFamily: FONT,
          fontSize: "clamp(28px, 3.5vw, 42px)",
          fontWeight: 700,
          color: "#0A0A0A",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          marginBottom: 48,
        }}
      >
        Frequently Asked Questions
      </h2>
      <div>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                  fontFamily: FONT,
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  letterSpacing: "-0.01em",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  gap: 16,
                }}
              >
                <span>{faq.question}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{
                    flexShrink: 0,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="#999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? 400 : 0,
                  transition: "max-height 0.3s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(14px, 1.1vw, 16px)",
                    fontWeight: 400,
                    color: "#666",
                    lineHeight: 1.65,
                    letterSpacing: "-0.01em",
                    paddingBottom: 20,
                    margin: 0,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function SecurityClient() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      {/* ═══════════════════════════════════════
          HERO — Full viewport, massive type
          ═══════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(140px, 18vw, 220px) clamp(24px, 4vw, 48px) 0",
          }}
        >
          {/* Heading — two-tier */}
          <motion.h1
            initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            style={{ margin: 0 }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: "clamp(64px, 11vw, 150px)",
                fontWeight: 700,
                color: DELTA_BLUE,
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
                display: "block",
              }}
            >
              No third parties.
            </span>
            <span
              style={{
                fontFamily: FONT,
                fontSize: "clamp(28px, 4.5vw, 58px)",
                fontWeight: 400,
                color: SUBTITLE_BLUE,
                lineHeight: 1.25,
                letterSpacing: "-0.03em",
                display: "block",
                marginTop: "clamp(12px, 1.5vw, 24px)",
              }}
            >
              your documents never leave our servers
            </span>
          </motion.h1>

          {/* Subheading — how */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.4vw, 20px)",
              fontWeight: 400,
              color: "#666",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              marginTop: "clamp(28px, 3vw, 44px)",
              maxWidth: 560,
            }}
          >
            Unlike nearly every other legal tech company, all AI processing runs on our own servers.
          </motion.p>

          {/* Founder quote — testimonial style */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE_OUT }}
            style={{
              marginTop: "clamp(32px, 3vw, 48px)",
              maxWidth: 560,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: DELTA_BLUE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                }}
              >
                CH
              </span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  letterSpacing: "-0.01em",
                  marginBottom: 6,
                }}
              >
                Camren Hall
                <span style={{ fontWeight: 400, color: "#999", marginLeft: 8 }}>
                  Founder
                </span>
              </p>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  fontWeight: 400,
                  color: "#555",
                  lineHeight: 1.65,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                &ldquo;Trust is the fundamental unit that drives the legal
                field. In an AI-skeptical world, we absorb the extra cost of
                self-hosting in order to ensure complete security.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          BELOW FOLD — 4 cards
          ═══════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(80px, 10vw, 120px) clamp(24px, 4vw, 48px) 80px",
        }}
      >
        <style>{`
          .security-card {
            padding: clamp(28px, 3vw, 44px);
            border-radius: 12px;
            border: 1px solid ${BORDER};
            background: #FAFAFA;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                        box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                        border-color 0.3s ease,
                        background 0.3s ease;
          }
          .security-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            border-color: #D4D4D4;
            background: #FFFFFF;
          }
        `}</style>
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 16 }}
        >
          {[
            {
              title: "Your client data never touches another company.",
              body: "Most AI tools send your documents to outside companies for processing. With CaseDelta, everything stays on our servers. No forwarding. No exceptions.",
            },
            {
              title: "Your bar license is safe.",
              body: "ABA Rule 1.6 requires you to protect client information. CaseDelta is built so that using AI doesn't put your ethical obligations at risk.",
            },
            {
              title: "Your work stays yours.",
              body: "Nothing you upload, ask, or receive is ever used to train AI models. Your legal strategy will never end up in someone else's output.",
            },
            {
              title: "Built for the cases that actually matter.",
              body: "Most lawyers only trust AI on low-risk work. CaseDelta's architecture is designed so you can use it on every case — not just the ones you can afford to experiment with.",
            },
          ].map((card, i) => (
            <div key={i} className="security-card">
              <h3
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(17px, 1.6vw, 22px)",
                  fontWeight: 600,
                  color: "#0A0A0A",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  marginBottom: 10,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  fontWeight: 400,
                  color: "#666",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>

      </div>

      <FAQAccordion faqs={SECURITY_FAQS} />

      <BottomCTA
        quote="Every few months you'd hear about another lawyer getting sanctioned over AI-generated citations. I wanted the efficiency but not that kind of exposure. Delta gave us a way to use AI across our cases without putting anyone's license on the line."
        attribution="Managing Partner"
        attributionDetail="Insurance defense firm, Overland Park"
        ctaHeading="Your data stays inside your firm."
        ctaSubheading="Start with $25 in free credits. No third parties. No exceptions."
      />
      <FooterV2 />
    </main>
  );
}
