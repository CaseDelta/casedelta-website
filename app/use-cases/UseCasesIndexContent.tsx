"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { USE_CASES } from "@/lib/use-cases";

/* ─── Design Tokens ─── */

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Short descriptions for index cards ─── */

const CARD_DESCRIPTIONS: Record<string, string> = {
  "personal-injury":
    "Demand packages, records review, and adjuster correspondence run across Clio, Word, Drive, and Gmail. Delta runs all of it in one conversation.",
  "medical-malpractice":
    "Thousands of pages of medical records, expert coordination, and complaint drafting. Delta builds the chronology, surfaces the gaps, and drafts in your firm's voice.",
  "employment-law":
    "Plaintiff intake, wage and hour math, charge and complaint drafting. Delta runs intake to filed complaint in a single conversation.",
  "mass-tort":
    "Three hundred personalized plaintiff updates before lunch. Intake, drafting, and admin at firm-wide scale, across the tools you already use.",
};

/* ─── Arrow Icon ─── */

function ArrowRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M4 10h12M12 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Main Content ─── */

export function UseCasesIndexContent() {
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
              "clamp(140px, 18vw, 220px) clamp(24px, 4vw, 48px) clamp(60px, 8vw, 100px)",
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
              The personal assistant that connects all your firm&rsquo;s tools.
            </span>
            {" "}
            <span
              style={{
                fontFamily: FONT,
                fontSize: "clamp(22px, 3.5vw, 42px)",
                fontWeight: 400,
                color: SUBTITLE_BLUE,
                lineHeight: 1.25,
                letterSpacing: "-0.03em",
                display: "block",
                marginTop: "clamp(12px, 1.5vw, 20px)",
              }}
            >
              Manage all of them with a single sentence.
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
              maxWidth: 640,
              marginTop: "clamp(20px, 2.5vw, 32px)",
              marginBottom: 0,
            }}
          >
            Plaintiff firms run on a stack of tools: Clio, Word, Gmail or
            Outlook, Drive, Calendar. Delta connects across them and runs the
            legal and administrative work in a single conversation.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          USE CASE CARDS
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
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "clamp(20px, 2.5vw, 32px)" }}
          >
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: EASE_OUT,
                }}
              >
                <Link
                  href={`/use-cases/${uc.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      padding: "clamp(28px, 3.5vw, 40px)",
                      borderRadius: 12,
                      border: `1px solid ${BORDER}`,
                      backgroundColor: "#FFFFFF",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${ACCENT}40`;
                      e.currentTarget.style.boxShadow = `0 4px 16px rgba(37,99,235,0.08)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(22px, 2vw, 28px)",
                        fontWeight: 700,
                        color: "#0A0A0A",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.2,
                        marginTop: 0,
                        marginBottom: 12,
                      }}
                    >
                      {uc.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(14px, 1.05vw, 16px)",
                        color: "#666",
                        lineHeight: 1.65,
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {CARD_DESCRIPTIONS[uc.slug] || uc.heroSubheadline}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 20,
                        fontFamily: FONT,
                        fontSize: 14,
                        fontWeight: 500,
                        color: ACCENT,
                      }}
                    >
                      <span>Learn more</span>
                      <ArrowRight />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM SECTION
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
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginTop: 0,
              marginBottom: 16,
            }}
          >
            See Delta inside your firm&rsquo;s stack.
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
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 0,
              marginBottom: 32,
            }}
          >
            Twenty-minute live demo. We connect Delta to a sandbox of your
            stack and run a real workflow end to end.
          </motion.p>
          <motion.a
            href="/demo"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
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
              backgroundColor: "#1D4ED8",
              boxShadow: `0 6px 20px ${ACCENT}35`,
            }}
            whileTap={{ y: 0, scale: 0.97 }}
          >
            Book a demo
          </motion.a>
        </div>
      </section>

      <FooterV2 />
    </main>
  );
}
