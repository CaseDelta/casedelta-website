"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import type { Comparison } from "@/lib/comparisons";

/* ─── Design Tokens ─── */

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const BORDER = "#EDEDED";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

/* ─── FAQ Accordion Item ─── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontFamily: FONT,
          width: "100%",
          textAlign: "left",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: "clamp(15px, 1.2vw, 17px)",
            fontWeight: 500,
            color: "#1A1A1A",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <span
          style={{
            fontSize: 20,
            color: "#999",
            lineHeight: 1,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 500 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <p
          style={{
            fontFamily: FONT,
            fontSize: "clamp(14px, 1.1vw, 16px)",
            color: "#555",
            lineHeight: 1.7,
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

/* ─── Main Component ─── */

export function ComparisonPageClient({
  comparison,
}: {
  comparison: Comparison;
}) {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      {/* ═══════════ BREADCRUMB ═══════════ */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(100px, 14vw, 160px) clamp(24px, 4vw, 48px) 0",
        }}
      >
        <nav
          style={{
            fontSize: 13,
            color: "#999",
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{ color: "#999", textDecoration: "none" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#555";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#999";
            }}
          >
            Home
          </Link>
          <span style={{ color: "#CCC" }}>/</span>
          <Link
            href="/compare"
            style={{ color: "#999", textDecoration: "none" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#555";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#999";
            }}
          >
            Compare
          </Link>
          <span style={{ color: "#CCC" }}>/</span>
          <span style={{ color: "#555" }}>
            vs {comparison.competitorName}
          </span>
        </nav>

        {/* ═══════════ HERO ═══════════ */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {comparison.heroHeadline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
          style={{
            fontSize: "clamp(16px, 1.5vw, 20px)",
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
            maxWidth: 680,
            marginBottom: 0,
          }}
        >
          {comparison.heroSubheadline}
        </motion.p>
      </div>

      {/* ═══════════ GEO OPENING ═══════════ */}
      <section
        style={{
          borderTop: `1px solid ${BORDER}`,
          marginTop: "clamp(48px, 6vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding:
              "clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(16px, 1.3vw, 19px)",
              color: "#444",
              lineHeight: 1.75,
              maxWidth: 780,
              margin: 0,
            }}
          >
            {comparison.geoOpening}
          </p>
        </div>
      </section>

      {/* ═══════════ QUICK COMPARISON BULLETS ═══════════ */}
      <section style={{ borderTop: `1px solid ${BORDER}` }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding:
              "clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(22px, 2.5vw, 34px)",
              fontWeight: 600,
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 32,
            }}
          >
            The key differences
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {comparison.quickBullets.map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: EASE_OUT,
                }}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: ACCENT,
                    flexShrink: 0,
                    marginTop: 8,
                  }}
                />
                <p
                  style={{
                    fontSize: "clamp(15px, 1.2vw, 17px)",
                    color: "#444",
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: 720,
                  }}
                >
                  {bullet}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COMPARISON TABLE ═══════════ */}
      <section style={{ borderTop: `1px solid ${BORDER}` }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding:
              "clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(22px, 2.5vw, 34px)",
              fontWeight: 600,
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 40,
            }}
          >
            Feature comparison
          </h2>

          {/* Desktop table */}
          <div
            style={{
              borderRadius: 12,
              border: `1px solid ${BORDER}`,
              overflow: "hidden",
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                backgroundColor: "#FAFAFA",
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Feature
              </div>
              <div
                style={{
                  padding: "16px 20px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: DELTA_BLUE,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                CaseDelta
              </div>
              <div
                style={{
                  padding: "16px 20px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {comparison.competitorName}
              </div>
            </div>

            {/* Data rows */}
            {comparison.comparisonTable.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
                  borderBottom:
                    i < comparison.comparisonTable.length - 1
                      ? `1px solid ${BORDER}`
                      : "none",
                }}
              >
                <div
                  style={{
                    padding: "14px 20px",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#1A1A1A",
                    lineHeight: 1.5,
                  }}
                >
                  {row.feature}
                </div>
                <div
                  style={{
                    padding: "14px 20px",
                    fontSize: 14,
                    color: "#333",
                    lineHeight: 1.5,
                  }}
                >
                  {row.casedelta}
                </div>
                <div
                  style={{
                    padding: "14px 20px",
                    fontSize: 14,
                    color: "#777",
                    lineHeight: 1.5,
                  }}
                >
                  {row.competitor}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile card view (hidden on desktop) */}
          <div className="block lg:hidden" style={{ marginTop: 24 }}>
            <style>{`
              @media (min-width: 1024px) {
                .comparison-mobile-cards { display: none !important; }
              }
              @media (max-width: 1023px) {
                .comparison-desktop-table { display: none !important; }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* ═══════════ DETAILED SECTIONS ═══════════ */}
      {comparison.sections.map((section, i) => (
        <section
          key={i}
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          <div
            style={{
              maxWidth: 1320,
              margin: "0 auto",
              padding:
                "clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <h2
                style={{
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: 20,
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  color: "#555",
                  lineHeight: 1.75,
                  maxWidth: 780,
                  margin: 0,
                }}
              >
                {section.content}
              </p>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ═══════════ WHEN TO CHOOSE THEM ═══════════ */}
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
            padding:
              "clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <h2
              style={{
                fontSize: "clamp(22px, 2.5vw, 34px)",
                fontWeight: 600,
                color: "#1A1A1A",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: 20,
              }}
            >
              When to choose {comparison.competitorName}
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 1.2vw, 17px)",
                color: "#555",
                lineHeight: 1.75,
                maxWidth: 780,
                margin: 0,
              }}
            >
              {comparison.whenToChooseThem}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section style={{ borderTop: `1px solid ${BORDER}` }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding:
              "clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(22px, 2.5vw, 34px)",
              fontWeight: 600,
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 32,
            }}
          >
            Frequently asked questions
          </h2>
          <div style={{ maxWidth: 780 }}>
            {comparison.faq.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
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
            padding:
              "clamp(64px, 8vw, 100px) clamp(24px, 4vw, 48px)",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 700,
                color: "#0A0A0A",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              See what Delta learns about your firm
            </h2>
            <p
              style={{
                fontSize: "clamp(16px, 1.3vw, 19px)",
                fontWeight: 400,
                color: "#666",
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
                marginBottom: 32,
                maxWidth: 520,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Connect your Clio account and see meaningful intelligence
              in the first 30 minutes. Free $25 credit to start.
            </p>

            <motion.a
              href="https://app.casedelta.com/signup"
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
              Sign Up — Free $25 Credit
            </motion.a>
          </motion.div>
        </div>
      </section>

      <FooterV2 />
    </main>
  );
}
