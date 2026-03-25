"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const BLUE = "#2563EB";
const BLUE_LIGHT = "#60A5FA";
const BLUE_FAINT = "#93C5FD";

/* Decorative curves — top-left flowing (mirrors hero's bottom-right) */
function DecoTopLeft() {
  const curves = [
    { d: "M-50 400Q200 100 450 180Q700 260 1050 50", w: 3, o: 0.22, c: BLUE },
    { d: "M-50 340Q180 80 420 140Q680 200 1050 -10", w: 2.5, o: 0.18, c: BLUE },
    { d: "M-50 280Q160 40 400 100Q660 160 1050 -50", w: 2, o: 0.14, c: BLUE_LIGHT },
    { d: "M-50 220Q140 10 380 60Q640 110 1050 -90", w: 1.5, o: 0.10, c: BLUE_LIGHT },
    { d: "M-50 160Q120 -20 360 20Q620 60 1050 -130", w: 1.25, o: 0.07, c: BLUE_FAINT },
  ];
  return (
    <svg viewBox="0 0 1000 500" fill="none" preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <defs>
        <linearGradient id="tl-fade" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="40%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="tl-mask"><rect width="100%" height="100%" fill="url(#tl-fade)" /></mask>
      </defs>
      <g mask="url(#tl-mask)">
        {curves.map((curve, i) => (
          <motion.path
            key={i}
            d={curve.d}
            stroke={curve.c}
            strokeWidth={curve.w}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: curve.o }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              pathLength: { duration: 2, delay: i * 0.25, ease: "easeOut" },
              opacity: { duration: 0.5, delay: i * 0.25 },
            }}
          />
        ))}
      </g>
    </svg>
  );
}

/* Decorative curves — wide horizontal for CTA */
function DecoWide() {
  const curves = [
    { d: "M-50 250Q250 100 500 150Q750 200 1050 80", w: 2.5, o: 0.16, c: BLUE },
    { d: "M-50 300Q250 160 500 200Q750 240 1050 140", w: 2, o: 0.12, c: BLUE_LIGHT },
    { d: "M-50 350Q250 220 500 250Q750 280 1050 200", w: 1.5, o: 0.09, c: BLUE_LIGHT },
    { d: "M-50 400Q250 280 500 300Q750 320 1050 260", w: 1.25, o: 0.06, c: BLUE_FAINT },
  ];
  return (
    <svg viewBox="0 0 1000 500" fill="none" preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      {curves.map((curve, i) => (
        <motion.path
          key={i}
          d={curve.d}
          stroke={curve.c}
          strokeWidth={curve.w}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: curve.o }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            pathLength: { duration: 2.5, delay: i * 0.3, ease: "easeOut" },
            opacity: { duration: 0.6, delay: i * 0.3 },
          }}
        />
      ))}
    </svg>
  );
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ROTATE_PAIRS = [
  { records: "medical records", output: "chronologies" },
  { records: "financial documents", output: "damage analyses" },
  { records: "employment files", output: "case briefs" },
  { records: "claims records", output: "coverage analyses" },
  { records: "discovery documents", output: "deposition outlines" },
];
const ROTATE_INTERVAL = 3000;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.8, delay, ease: EASE },
});

export function BelowFold() {
  const [pairIndex, setPairIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPairIndex((i) => (i + 1) % ROTATE_PAIRS.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Parallax for SVG decorations
  const decoRef1 = useRef(null);
  const decoRef2 = useRef(null);
  const { scrollYProgress: sp1 } = useScroll({ target: decoRef1, offset: ["start end", "end start"] });
  const { scrollYProgress: sp2 } = useScroll({ target: decoRef2, offset: ["start end", "end start"] });
  const decoY1 = useTransform(sp1, [0, 1], [80, -80]);
  const decoY2 = useTransform(sp2, [0, 1], [60, -60]);

  return (
    <div
      style={{
        position: "relative",
        fontFamily: FONT,
      }}
    >
      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 2px 8px ${ACCENT}25; }
          50% { box-shadow: 0 4px 20px ${ACCENT}40; }
        }
        .cd-cta-pulse {
          animation: ctaPulse 3s ease-in-out infinite;
        }
        .cd-cta-pulse:hover {
          animation: none;
        }
      `}</style>

      {/* ── Continuous ruler lines ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 1320,
          padding: "0 clamp(24px, 4vw, 48px)",
          pointerEvents: "none",
          boxSizing: "border-box",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: -16, width: 1, backgroundColor: BORDER }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, right: -16, width: 1, backgroundColor: BORDER }} />
        </div>
      </div>

      {/* ════════════════════════════════════════
          1. VALUE PROP — Big sell, full scale
          ════════════════════════════════════════ */}
      <section id="value-prop" style={{ position: "relative", padding: "clamp(120px, 14vw, 200px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.div {...fade()} style={{ maxWidth: 780 }}>
            <h2 style={{
              fontFamily: FONT,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700,
              color: "#0A0A0A",
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              margin: 0,
            }}>
              An associate that analyzes thousands of
            </h2>

            <div style={{
              height: "clamp(40px, 5.5vw, 68px)",
              overflow: "hidden",
              position: "relative",
              marginTop: 4,
            }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={pairIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(32px, 4.5vw, 56px)",
                    fontWeight: 700,
                    color: ACCENT,
                    lineHeight: 1.1,
                    letterSpacing: "-0.035em",
                    margin: 0,
                    position: "absolute",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {ROTATE_PAIRS[pairIndex].records}
                </motion.p>
              </AnimatePresence>
            </div>

            <h2 style={{
              fontFamily: FONT,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700,
              color: "#0A0A0A",
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              margin: 0,
              marginTop: 4,
            }}>
              and builds chronologies, anomaly reports, and case briefs.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. SECURITY — Quieter, confident
          ════════════════════════════════════════ */}
      <section id="security" style={{ position: "relative", padding: "clamp(80px, 10vw, 140px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade()} style={{
            fontFamily: FONT,
            fontSize: "clamp(24px, 3.2vw, 42px)",
            fontWeight: 600,
            color: "#333",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: 640,
          }}>
            Your client data stays inside your firm.{" "}
            <span style={{ color: "#888" }}>Nothing is ever shared.</span>
          </motion.h2>
          <motion.p {...fade(0.1)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#999",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            maxWidth: 520,
            marginTop: 16,
          }}>
            Most legal AI sends your client data to outside companies to process it. We don&apos;t. Everything runs inside CaseDelta, and we pay the cost to keep it that way.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. INTEGRATIONS — Quieter, paired with security
          ════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "clamp(80px, 10vw, 140px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade()} style={{
            fontFamily: FONT,
            fontSize: "clamp(24px, 3.2vw, 42px)",
            fontWeight: 600,
            color: "#333",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: 640,
          }}>
            Delta works with what you already use.{" "}
            <span style={{ color: "#888" }}>No switching. No learning curve.</span>
          </motion.h2>

          {/* Integration logos */}
          <motion.div {...fade(0.15)} style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(24px, 3vw, 40px)",
            marginTop: "clamp(32px, 4vw, 48px)",
          }}>
            {[
              { src: "/assets/integrations/clio.svg", name: "Clio", h: 22 },
              { src: "/assets/integrations/google-drive.svg", name: "Google Drive", h: 28 },
              { src: "/assets/integrations/gmail.svg", name: "Gmail", h: 24 },
              { src: "/assets/integrations/google-calendar.svg", name: "Google Calendar", h: 26 },
              { src: "/assets/integrations/outlook.svg", name: "Outlook", h: 26 },
              { src: "/assets/integrations/dropbox.svg", name: "Dropbox", h: 26 },
              { src: "/assets/integrations/quickbooks.svg", name: "QuickBooks", h: 22 },
              { src: "/assets/integrations/docusign.svg", name: "DocuSign", h: 20 },
              { src: "/assets/integrations/mycase.webp", name: "MyCase", h: 20 },
            ].map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: EASE }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  style={{
                    height: logo.h,
                    width: "auto",
                    opacity: 0.5,
                    transition: "opacity 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.5"; }}
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.p {...fade(0.25)} style={{
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 500,
            color: "#BBB",
            letterSpacing: "-0.01em",
            marginTop: 16,
          }}>
            + any service you use
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. VALUE PROP 2 — Big sell, full scale
          ════════════════════════════════════════ */}
      <section ref={decoRef1} style={{ position: "relative", padding: "clamp(120px, 14vw, 200px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <motion.div style={{ y: decoY1, position: "absolute", inset: 0, pointerEvents: "none" }}>
          <DecoTopLeft />
        </motion.div>
        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade()} style={{
            fontFamily: FONT,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            maxWidth: 780,
          }}>
            Delta gets smarter with every case.{" "}
            <span style={{ color: ACCENT }}>
              Like a great associate, except it never forgets.
            </span>
          </motion.h2>
          <motion.p {...fade(0.1)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#999",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            maxWidth: 520,
            marginTop: 16,
          }}>
            Your preferences, your judges, your drafting style. Delta remembers and applies them automatically.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. SOCIAL PROOF — Distinct treatment
          ════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "clamp(100px, 12vw, 180px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.div {...fade()} style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
            {/* Opening quote mark */}
            <svg aria-hidden width="48" height="36" viewBox="0 0 48 36" fill="none" style={{ marginBottom: 24 }}>
              <path d="M0 36V20.4C0 14.4 1.2 9.6 3.6 6C6 2.4 10.2 0 16.2 0L18 6C14.4 6.6 11.7 8.1 9.9 10.5C8.1 12.9 7.2 15.6 7.2 18.6H15.6V36H0ZM26.4 36V20.4C26.4 14.4 27.6 9.6 30 6C32.4 2.4 36.6 0 42.6 0L44.4 6C40.8 6.6 38.1 8.1 36.3 10.5C34.5 12.9 33.6 15.6 33.6 18.6H42V36H26.4Z" fill={ACCENT} opacity="0.12" />
            </svg>

            <p style={{
              fontFamily: FONT,
              fontSize: "clamp(22px, 2.8vw, 34px)",
              fontWeight: 400,
              color: "#333",
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}>
              I handed Delta a case with 2,000 pages of medical records. Had a full chronology and anomaly report back in minutes.
            </p>

            {/* Closing quote mark */}
            <svg aria-hidden width="48" height="36" viewBox="0 0 48 36" fill="none" style={{ marginBottom: 28, transform: "rotate(180deg)" }}>
              <path d="M0 36V20.4C0 14.4 1.2 9.6 3.6 6C6 2.4 10.2 0 16.2 0L18 6C14.4 6.6 11.7 8.1 9.9 10.5C8.1 12.9 7.2 15.6 7.2 18.6H15.6V36H0ZM26.4 36V20.4C26.4 14.4 27.6 9.6 30 6C32.4 2.4 36.6 0 42.6 0L44.4 6C40.8 6.6 38.1 8.1 36.3 10.5C34.5 12.9 33.6 15.6 33.6 18.6H42V36H26.4Z" fill={ACCENT} opacity="0.12" />
            </svg>

            {/* Attribution */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${ACCENT}15, ${ACCENT}08)`,
                border: `1px solid ${ACCENT}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT }}>KG</span>
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#0A0A0A", marginBottom: 2 }}>Managing Partner</p>
                <p style={{ fontSize: 14, color: "#888", margin: 0 }}>Medical malpractice, 8 attorneys</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6. CTA — Destination feel, centered
          ════════════════════════════════════════ */}
      <section ref={decoRef2} id="cta" style={{
        position: "relative",
        padding: "clamp(120px, 14vw, 200px) 0 clamp(140px, 16vw, 220px)",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%)",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <motion.div style={{ y: decoY2, position: "absolute", inset: 0, pointerEvents: "none" }}>
          <DecoWide />
        </motion.div>
        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)", textAlign: "center" }}>
          <motion.h2 {...fade()} style={{
            fontFamily: FONT,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            maxWidth: 600,
            margin: "0 auto 40px",
          }}>
            Meet the associate that already knows your judges.
          </motion.h2>

          <motion.div {...fade(0.15)} style={{ display: "flex", justifyContent: "center" }}>
            <motion.a
              href="https://app.casedelta.com/signup"
              className="cd-btn-cta cd-cta-pulse"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: FONT,
                height: 52,
                padding: "0 32px",
                backgroundColor: ACCENT,
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 6,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: `0 2px 8px ${ACCENT}25`,
              }}
              whileHover={{ y: -2, backgroundColor: DELTA_BLUE, boxShadow: `0 8px 24px ${ACCENT}35` }}
              whileTap={{ y: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              Sign Up — Free $25 Credit
              <svg className="cd-cta-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
