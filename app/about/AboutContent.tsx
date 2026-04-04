"use client";

import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const BORDER = "#EDEDED";
const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

/* ─── Value card data ─── */
const VALUES = [
  {
    heading: "Delta learns inside your firm's walls.",
    body: "Your data never leaves CaseDelta's infrastructure. No third-party AI providers, no shared model training. Security is architectural, not policy.",
    label: "Security by architecture",
  },
  {
    heading: "The attorney decides, not the AI.",
    body: "Every output Delta produces requires human review and approval before it touches a case. Delta drafts, researches, and recommends. The attorney signs off.",
    label: "Human-in-the-loop",
  },
  {
    heading: "Learning is the product.",
    body: "Delta doesn't reset between sessions. It remembers your preferences, your judges, your opposing counsel, your style. It gets more valuable every single day.",
    label: "Persistent memory",
  },
  {
    heading: "Network intelligence for everyone.",
    body: "A five-attorney family law practice gets the same anonymized judicial intelligence that a 200-attorney firm built over 30 years. The Intelligence Network levels the field.",
    label: "Network effect",
  },
];

export function AboutContent() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      {/* ═══════════════════════════════════════
          HERO — Mission statement
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
            style={{
              fontFamily: FONT,
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 700,
              color: "#0A0A0A",
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              margin: 0,
              maxWidth: 900,
            }}
          >
            The most valuable knowledge in your firm exists only in
            people&rsquo;s heads.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(20px, 2.2vw, 30px)",
              fontWeight: 400,
              color: DELTA_BLUE,
              lineHeight: 1.35,
              letterSpacing: "-0.02em",
              marginTop: "clamp(20px, 2.5vw, 32px)",
              maxWidth: 680,
            }}
          >
            When they leave, it leaves with them. Delta changes that.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT }}
            style={{
              marginTop: "clamp(36px, 4vw, 56px)",
              maxWidth: 620,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <p
              style={{
                fontSize: "clamp(16px, 1.3vw, 19px)",
                fontWeight: 400,
                color: "#555",
                lineHeight: 1.7,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Every law firm runs on institutional knowledge &mdash; the
              unwritten rules, the judge who hates late filings, the opposing
              counsel who always settles in week three. This knowledge takes
              years to build and seconds to lose when someone walks out the door.
            </p>
            <p
              style={{
                fontSize: "clamp(16px, 1.3vw, 19px)",
                fontWeight: 400,
                color: "#555",
                lineHeight: 1.7,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              CaseDelta exists to make that knowledge permanent. Delta connects
              to the tools your firm already uses, learns the patterns that make
              your practice unique, and builds a living memory that compounds
              without limit &mdash; so the next associate doesn&rsquo;t start
              from scratch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHAT CASEDELTA IS
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
            padding:
              "clamp(64px, 8vw, 100px) clamp(24px, 4vw, 48px)",
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: "clamp(40px, 5vw, 80px)", alignItems: "start" }}
          >
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 600,
                  color: ACCENT,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  display: "block",
                  marginBottom: 16,
                }}
              >
                The Platform
              </span>
              <h2
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 700,
                  color: "#0A0A0A",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                CaseDelta is the platform.
                <br />
                Delta is the AI inside it.
              </h2>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <p
                style={{
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 400,
                  color: "#555",
                  lineHeight: 1.7,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                Delta connects to your existing tools &mdash; starting with
                Clio &mdash; and learns how your firm actually operates. It
                studies your cases, your judges, your opposing counsel, and your
                preferences. Then it handles the cognitive work: drafting,
                research, document analysis, case chronologies.
              </p>
              <p
                style={{
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 400,
                  color: "#555",
                  lineHeight: 1.7,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                What makes it different is the{" "}
                <strong style={{ color: "#333", fontWeight: 600 }}>
                  Intelligence Network
                </strong>
                . Every firm on CaseDelta contributes anonymized patterns
                &mdash; judicial tendencies, settlement timelines, filing
                outcomes &mdash; to a shared intelligence layer. No firm&rsquo;s
                confidential data is exposed, but every firm benefits. It&rsquo;s
                the first network effect in legal technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOUNDER
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
            padding:
              "clamp(64px, 8vw, 100px) clamp(24px, 4vw, 48px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 600,
                color: ACCENT,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 16,
              }}
            >
              Founder
            </span>
          </motion.div>

          <div
            className="grid grid-cols-1 lg:grid-cols-12"
            style={{
              gap: "clamp(32px, 4vw, 64px)",
              alignItems: "start",
            }}
          >
            {/* Avatar + credentials */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: DELTA_BLUE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#FFFFFF",
                    letterSpacing: "0.02em",
                  }}
                >
                  CH
                </span>
              </div>

              <h3
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  fontWeight: 700,
                  color: "#0A0A0A",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  margin: 0,
                  marginBottom: 6,
                }}
              >
                Camren Hall
              </h3>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#999",
                  letterSpacing: "-0.01em",
                  margin: 0,
                  marginBottom: 24,
                }}
              >
                Founder &amp; CEO
              </p>

              {/* Credentials */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {[
                  "Vanderbilt University",
                  "Computer Science & Applied Mathematics",
                  "2.5 years at Capital One",
                  "Kansas City Metropolitan Bar Association",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: DELTA_BLUE,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#666",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Narrative */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <p
                style={{
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 400,
                  color: "#555",
                  lineHeight: 1.7,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                CaseDelta started with a question that wouldn&rsquo;t go
                away: why does every law firm lose its most valuable asset
                &mdash; institutional knowledge &mdash; every time someone
                leaves?
              </p>
              <p
                style={{
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 400,
                  color: "#555",
                  lineHeight: 1.7,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                After six months of customer discovery with practicing
                attorneys across family law, insurance defense, personal
                injury, and employment litigation, one finding emerged
                clearly: knowledge loss is the number-one unsolved problem
                in small-to-midsize law firms. Not billing. Not marketing.
                The fact that everything a senior attorney knows walks out
                the door when they retire, and the next associate starts
                from zero.
              </p>
              <p
                style={{
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 400,
                  color: "#555",
                  lineHeight: 1.7,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                Before CaseDelta, Camren spent two and a half years at
                Capital One building the data systems that power real-time
                financial decisions at scale. That experience &mdash;
                building systems that learn from data, improve continuously,
                and serve millions of decisions &mdash; directly informs how
                Delta works: persistent memory, compounding intelligence,
                and architecture that scales.
              </p>
              <p
                style={{
                  fontSize: "clamp(16px, 1.3vw, 19px)",
                  fontWeight: 400,
                  color: "#555",
                  lineHeight: 1.7,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                CaseDelta is built for the firms that do the work &mdash;
                the 5-to-50 attorney practices that handle real cases for
                real people and have never had access to the kind of
                institutional intelligence that BigLaw takes for granted.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VALUES / PRINCIPLES
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
            padding:
              "clamp(64px, 8vw, 100px) clamp(24px, 4vw, 48px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 600,
                color: ACCENT,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 16,
              }}
            >
              Principles
            </span>
            <h2
              style={{
                fontFamily: FONT,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 700,
                color: "#0A0A0A",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                margin: 0,
                maxWidth: 600,
              }}
            >
              How we build.
            </h2>
          </motion.div>

          <style>{`
            .value-card {
              padding: clamp(28px, 3vw, 44px);
              border-radius: 12px;
              border: 1px solid ${BORDER};
              background: #FFFFFF;
              box-shadow: 0 1px 3px rgba(0,0,0,0.04);
              transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                          box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                          border-color 0.3s ease;
            }
            .value-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 8px 30px rgba(0,0,0,0.08);
              border-color: #D4D4D4;
            }
          `}</style>

          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 16 }}
          >
            {VALUES.map((value, i) => (
              <motion.div
                key={i}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: EASE_OUT,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 11,
                    fontWeight: 600,
                    color: ACCENT,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  {value.label}
                </span>
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
                  {value.heading}
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
                  {value.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
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
            padding:
              "clamp(80px, 10vw, 140px) clamp(24px, 4vw, 48px)",
            textAlign: "center",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#0A0A0A",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Ready to see what Delta learns about your firm?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.3vw, 19px)",
              fontWeight: 400,
              color: "#666",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              marginBottom: 36,
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Start with $25 in free credits. No credit card required.
          </motion.p>

          <motion.a
            href="https://app.casedelta.com/signup"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
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
              backgroundColor: DELTA_BLUE,
              boxShadow: `0 6px 20px ${ACCENT}35`,
            }}
            whileTap={{ y: 0, scale: 0.97 }}
          >
            Sign Up — Free $25 Credit
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: 400,
              color: "#BBB",
              marginTop: 20,
            }}
          >
            Or email{" "}
            <a
              href="mailto:camren@casedelta.com"
              style={{
                color: ACCENT,
                textDecoration: "none",
              }}
            >
              camren@casedelta.com
            </a>
          </motion.p>
        </div>
      </section>

      <FooterV2 />
    </main>
  );
}
