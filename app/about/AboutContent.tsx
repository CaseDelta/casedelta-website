"use client";

import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const BORDER = "#EDEDED";
const FONT =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Principles cards ─── */
const VALUES = [
  {
    heading: "A horizontal layer, not another silo.",
    body: "Every other legal AI lives inside a single app and only handles one slice of the workflow. CaseDelta is the personal assistant that runs across the tools your firm already uses, so the firm does not adopt yet another platform.",
    label: "Horizontal layer",
  },
  {
    heading: "The attorney decides. Delta does the work.",
    body: "Delta drafts, pulls records, calculates, sends, and logs. The attorney sets the direction and signs off on the output. No automation runs without an attorney telling it to.",
    label: "Attorney in command",
  },
  {
    heading: "Tangible results, not features.",
    body: "We measure value in workflows shipped end to end: demand letters out, chronologies built, clients updated, time logged. Not in features added to a dashboard.",
    label: "Outcome focused",
  },
  {
    heading: "Your data stays yours.",
    body: "CaseDelta runs on a private enterprise deployment. Client files never touch a shared model or a third-party AI provider. No training on your data. The deployment model is the protection, not a checkbox.",
    label: "Private deployment",
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
              maxWidth: 980,
            }}
          >
            The personal assistant that connects all your firm&rsquo;s tools
            together.
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
              maxWidth: 720,
            }}
          >
            So you can manage all of them with a single sentence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT }}
            style={{
              marginTop: "clamp(36px, 4vw, 56px)",
              maxWidth: 640,
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
              Plaintiff firms run on Clio, Microsoft Word, Gmail or Outlook,
              Google Drive, and Calendar. Every workflow stretches across
              them. Every other AI tool on the market lives inside one of
              those apps and only handles one slice of the work, forcing the
              firm to adopt yet another platform.
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
              CaseDelta is the personal assistant that runs both legal
              research and administrative work across the tools your firm
              already uses. Tell Delta what you need. Delta makes it
              happen. Many tools, hours of work, done in one go.
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
                The product
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
                Delta is the assistant inside it.
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
                Delta connects to your existing tools (Clio, Microsoft Word,
                Gmail or Outlook, Google Drive, Calendar, DocuSign,
                Westlaw) and runs the work across them. Hand Delta thousands
                of pages of discovery. Say what you want done. Delta builds
                the chronology, drafts the demand letter, emails opposing
                counsel from your inbox, and logs the time in Clio.
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
                One conversation. One sentence. The legal work and the
                administrative work happen in the same place. The attorney
                stays in command. Delta does the work.
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
                CaseDelta started after months of customer discovery with
                practicing attorneys at plaintiff firms. The same finding
                kept surfacing: a personal injury, medical malpractice,
                employment, or mass tort firm runs on a stack of five or six
                tools, and every workflow means switching between them by
                hand.
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
                Every legal AI on the market lived inside one of those
                tools, and asked the firm to adopt yet another platform.
                None of them ran across the firm&rsquo;s actual workflow.
                That gap became CaseDelta.
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
                Capital One building data systems that power real-time
                financial decisions at scale. That experience shapes how
                Delta is built: a single conversation runs work across many
                systems, with security and reliability as the architecture,
                not the policy.
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
                CaseDelta is built for plaintiff firms that practice in
                personal injury, medical malpractice, employment, and mass
                tort. Practices that move on volume, run on a stack the
                firm already chose, and need an assistant that works inside
                that stack rather than replacing it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRINCIPLES
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
            See Delta inside your firm&rsquo;s stack.
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
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Twenty-minute live demo. We connect Delta to a sandbox of your
            stack and run a real workflow end to end.
          </motion.p>

          <motion.a
            href="/demo"
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
            Book a demo
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
