"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import type { UseCase } from "@/lib/use-cases";

/* ─── Design Tokens ─── */

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

/* ─── "What Delta Knows" Mockup ─── */

function DeltaKnowsMockup({
  firmName,
  entries,
}: {
  firmName: string;
  entries: { label: string; value: string }[];
}) {
  return (
    <div
      style={{
        borderRadius: 12,
        border: `1px solid ${BORDER}`,
        backgroundColor: "#FAFAFA",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          padding: "14px 20px",
          borderBottom: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            backgroundColor: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/assets/branding/delta-icon-light.svg"
            alt=""
            style={{ width: 12, height: 12 }}
          />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>
          What Delta runs across the firm
        </span>
        <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>
          {firmName}
        </span>
      </div>
      <div style={{ padding: "8px 0" }}>
        {entries.map((e, i) => (
          <div
            key={i}
            style={{
              padding: "10px 20px",
              borderBottom: i < entries.length - 1 ? `1px solid ${BORDER}` : "none",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#999",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 4,
              }}
            >
              {e.label}
            </div>
            <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>
              {e.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ─── */

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "20px 0",
          fontFamily: FONT,
          fontSize: "clamp(15px, 1.2vw, 17px)",
          fontWeight: 500,
          color: "#1A1A1A",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          lineHeight: 1.4,
          gap: 16,
        }}
      >
        <span>{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{
            flexShrink: 0,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <path
            d="M10 4v12M4 10h12"
            stroke="#999"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        style={{
          maxHeight: isOpen ? 400 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p
          style={{
            fontFamily: FONT,
            fontSize: "clamp(14px, 1.1vw, 16px)",
            color: "#666",
            lineHeight: 1.65,
            margin: 0,
            paddingBottom: 20,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Page Content ─── */

export function UseCasePageContent({ useCase }: { useCase: UseCase }) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FFFFFF" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1320,
            margin: "0 auto",
            padding:
              "clamp(140px, 18vw, 220px) clamp(24px, 4vw, 48px) clamp(80px, 10vw, 120px)",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            style={{ margin: 0 }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: "clamp(40px, 7vw, 80px)",
                fontWeight: 700,
                color: DELTA_BLUE,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                display: "block",
              }}
            >
              {useCase.heroHeadline}
            </span>
          </motion.h1>

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
              maxWidth: 680,
              marginTop: "clamp(20px, 2.5vw, 32px)",
              marginBottom: 0,
            }}
          >
            {useCase.heroSubheadline}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE_OUT }}
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{
              gap: "clamp(16px, 2vw, 32px)",
              marginTop: "clamp(40px, 5vw, 64px)",
            }}
          >
            {useCase.stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "clamp(16px, 2vw, 24px)",
                  borderRadius: 8,
                  border: `1px solid ${BORDER}`,
                  backgroundColor: "#FAFAFA",
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 700,
                    color: DELTA_BLUE,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    color: "#999",
                    marginTop: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GEO OPENING
          ═══════════════════════════════════════ */}
      <section
        style={{
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(60px, 8vw, 100px) clamp(24px, 4vw, 48px)",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.3vw, 19px)",
              fontWeight: 400,
              color: "#555",
              lineHeight: 1.7,
              letterSpacing: "-0.01em",
              maxWidth: 800,
              margin: 0,
            }}
          >
            {useCase.geoOpening}
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PAIN POINTS
          ═══════════════════════════════════════ */}
      <section
        style={{
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: "#FAFAFA",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(60px, 8vw, 100px) clamp(24px, 4vw, 48px)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginTop: 0,
              marginBottom: "clamp(40px, 5vw, 64px)",
            }}
          >
            The problems you already know
          </motion.h2>

          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "clamp(20px, 2.5vw, 32px)" }}
          >
            {useCase.painPoints.map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: EASE_OUT,
                }}
                style={{
                  padding: "clamp(24px, 3vw, 36px)",
                  borderRadius: 10,
                  border: `1px solid ${BORDER}`,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <h3
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(17px, 1.3vw, 20px)",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                    marginTop: 0,
                    marginBottom: 12,
                  }}
                >
                  {pain.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(14px, 1.05vw, 16px)",
                    color: "#666",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {pain.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW DELTA HELPS
          ═══════════════════════════════════════ */}
      <section
        style={{
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(60px, 8vw, 100px) clamp(24px, 4vw, 48px)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginTop: 0,
              marginBottom: 12,
            }}
          >
            How Delta runs your{" "}
            <span style={{ color: DELTA_BLUE }}>
              {useCase.title.toLowerCase()}
            </span>{" "}
            practice
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.3vw, 19px)",
              color: "#666",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              maxWidth: 600,
              marginTop: 0,
              marginBottom: "clamp(48px, 6vw, 80px)",
            }}
          >
            Delta connects across the tools your firm already uses and runs the
            legal and administrative work in one conversation. Many tools, hours
            of work, done in one go.
          </motion.p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(20px, 2.5vw, 32px)",
            }}
          >
            {useCase.howDeltaHelps.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: EASE_OUT,
                }}
                style={{
                  display: "flex",
                  gap: "clamp(16px, 2vw, 24px)",
                  alignItems: "flex-start",
                }}
              >
                {/* Number indicator */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: `${ACCENT}0A`,
                    border: `1px solid ${ACCENT}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 14,
                      fontWeight: 600,
                      color: ACCENT,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(17px, 1.3vw, 20px)",
                      fontWeight: 600,
                      color: "#1A1A1A",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.3,
                      marginTop: 0,
                      marginBottom: 8,
                    }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(14px, 1.05vw, 16px)",
                      color: "#666",
                      lineHeight: 1.65,
                      margin: 0,
                      maxWidth: 640,
                    }}
                  >
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          "WHAT DELTA KNOWS" EXAMPLE
          ═══════════════════════════════════════ */}
      <section
        style={{
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: "#FAFAFA",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(60px, 8vw, 100px) clamp(24px, 4vw, 48px)",
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2 items-center"
            style={{ gap: "clamp(32px, 4vw, 64px)" }}
          >
            {/* Text */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 700,
                  color: "#0A0A0A",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  marginTop: 0,
                  marginBottom: 16,
                }}
              >
                This is what Delta runs across the firm
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  color: "#666",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                  maxWidth: 480,
                  margin: 0,
                }}
              >
                The tools Delta connects to, the workflows it runs, and the
                guardrails on your firm&rsquo;s data. One assistant across the
                stack you already use.
              </motion.p>
            </div>

            {/* Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
            >
              <DeltaKnowsMockup
                firmName={useCase.deltaLearnsExample.firmName}
                entries={useCase.deltaLearnsExample.entries}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
          ═══════════════════════════════════════ */}
      <section
        style={{
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "clamp(60px, 8vw, 100px) clamp(24px, 4vw, 48px)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginTop: 0,
              marginBottom: "clamp(32px, 4vw, 48px)",
            }}
          >
            Frequently asked questions
          </motion.h2>
          <div>
            {useCase.faq.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#FAFAFA",
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(64px, 8vw, 100px) clamp(24px, 4vw, 48px)",
            textAlign: "center",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginTop: 0,
              marginBottom: 16,
            }}
          >
            See Delta in your stack.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.3vw, 19px)",
              fontWeight: 400,
              color: "#666",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              marginBottom: 32,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {useCase.ctaText}
          </motion.p>
          <motion.a
            href="/demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT,
              height: 48,
              padding: "0 28px",
              fontSize: 15,
              fontWeight: 500,
              backgroundColor: ACCENT,
              color: "#FFFFFF",
              borderRadius: 6,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              boxShadow: `0 1px 3px ${ACCENT}20`,
            }}
            whileHover={{
              y: -2,
              backgroundColor: DELTA_BLUE,
              boxShadow: `0 6px 20px ${ACCENT}35`,
            }}
            whileTap={{ y: 0, scale: 0.97 }}
            transition={springBounce}
          >
            Book a demo
          </motion.a>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <FooterV2 />
    </main>
  );
}
