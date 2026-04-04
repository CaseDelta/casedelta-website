"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { comparisons } from "@/lib/comparisons";

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const BORDER = "#EDEDED";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

const CARD_DESCRIPTIONS: Record<string, string> = {
  "casedelta-vs-harvey":
    "Harvey is a $40K+/month enterprise tool for BigLaw. Delta is a learning AI associate for the other 400,000 firms.",
  "casedelta-vs-clio":
    "Clio handles billing and calendaring. Delta connects to your Clio and handles the cognitive work Clio can't.",
  "casedelta-vs-lexisnexis":
    "Lexis searches published case law. Delta learns the practitioner intelligence that research tools can't capture.",
  "casedelta-vs-chatgpt":
    "ChatGPT has zero security, zero memory, and zero knowledge of your firm. Delta was built for legal data from day one.",
};

export function CompareIndexClient() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      {/* ═══════════ HERO ═══════════ */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(140px, 18vw, 220px) clamp(24px, 4vw, 48px) 0",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          style={{
            fontSize: "clamp(36px, 5.5vw, 72px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          How CaseDelta compares
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
            maxWidth: 600,
            marginBottom: 0,
          }}
        >
          Every other legal AI is stateless — it forgets everything
          every session. Delta builds persistent institutional memory
          that compounds over time.
        </motion.p>
      </div>

      {/* ═══════════ COMPARISON CARDS ═══════════ */}
      <section style={{ borderTop: `1px solid ${BORDER}`, marginTop: "clamp(48px, 6vw, 80px)" }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: 24,
            }}
          >
            {comparisons.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: EASE_OUT,
                }}
              >
                <Link
                  href={`/compare/${c.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      borderRadius: 12,
                      border: `1px solid ${BORDER}`,
                      padding: "clamp(24px, 3vw, 36px)",
                      backgroundColor: "#FFFFFF",
                      transition: "all 0.25s ease",
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#D0D0D0";
                      e.currentTarget.style.boxShadow =
                        "0 4px 16px rgba(0,0,0,0.06)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = BORDER;
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: ACCENT,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 12,
                      }}
                    >
                      Comparison
                    </div>
                    <h2
                      style={{
                        fontSize: "clamp(20px, 1.8vw, 26px)",
                        fontWeight: 600,
                        color: "#1A1A1A",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.25,
                        marginBottom: 12,
                      }}
                    >
                      CaseDelta vs {c.competitorName}
                    </h2>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#777",
                        lineHeight: 1.6,
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {CARD_DESCRIPTIONS[c.slug] || c.keyDifference}
                    </p>
                    <div
                      style={{
                        marginTop: 20,
                        fontSize: 13,
                        fontWeight: 500,
                        color: ACCENT,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      Read comparison
                      <span style={{ fontSize: 16, lineHeight: 1 }}>
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BOTTOM CTA ═══════════ */}
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
            padding: "clamp(64px, 8vw, 100px) clamp(24px, 4vw, 48px)",
            textAlign: "center",
          }}
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
        </div>
      </section>

      <FooterV2 />
    </main>
  );
}
