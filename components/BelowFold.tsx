"use client";

import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/posthog";

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

const ROTATE_WORDS = [
  "medical records",
  "discovery documents",
  "deposition transcripts",
  "claims files",
  "financial records",
  "expert reports",
];
const ROTATE_INTERVAL = 2600;

const fade = (delay = 0, reduced = false) => reduced
  ? {
      initial: { opacity: 1, y: 0 } as const,
      whileInView: { opacity: 1, y: 0 } as const,
      viewport: { once: true } as const,
      transition: { duration: 0 },
    }
  : {
      initial: { opacity: 0, y: 20 } as const,
      whileInView: { opacity: 1, y: 0 } as const,
      viewport: { once: true, margin: "-80px" } as const,
      transition: { duration: 0.8, delay, ease: EASE },
    };

export function BelowFold() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const [pairIndex, setPairIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setPairIndex((i) => (i + 1) % ROTATE_WORDS.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [reduced]);

  // Parallax for SVG decorations
  const decoRef1 = useRef(null);
  const decoRef2 = useRef(null);
  const decoRef3 = useRef(null);
  const { scrollYProgress: sp1 } = useScroll({ target: decoRef1, offset: ["start end", "end start"] });
  const { scrollYProgress: sp2 } = useScroll({ target: decoRef2, offset: ["start end", "end start"] });
  const { scrollYProgress: sp3 } = useScroll({ target: decoRef3, offset: ["start end", "end start"] });
  const decoY1 = useTransform(sp1, [0, 1], reduced ? [0, 0] : [80, -80]);
  const decoY2 = useTransform(sp2, [0, 1], reduced ? [0, 0] : [60, -60]);
  const decoY3 = useTransform(sp3, [0, 1], reduced ? [0, 0] : [60, -60]);

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
          0. DREAM HEADLINE — intake to resolution
          ════════════════════════════════════════ */}
      <section id="dream" style={{ position: "relative", padding: "clamp(120px, 14vw, 200px) 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.div {...fade(0, reduced)} style={{ maxWidth: 820 }}>
            <h2 style={{
              fontFamily: FONT,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700,
              color: "#0A0A0A",
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              margin: 0,
            }}>
              Home for dinner,{" "}
              <span style={{ color: ACCENT }}>not at the desk past nine.</span>
            </h2>
          </motion.div>
          <motion.p {...fade(0.1, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.7,
            letterSpacing: "-0.01em",
            maxWidth: 620,
            marginTop: 24,
          }}>
            Delta runs across the tools your firm already uses, keeping every matter current and doing the work, so you stay on the partner-level calls.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          1. THE WEDGE — One associate that sees the whole firm
          ════════════════════════════════════════ */}
      <section id="connected" style={{ position: "relative", padding: "clamp(120px, 14vw, 200px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade(0, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            margin: 0,
            maxWidth: 820,
          }}>
            One associate that sees{" "}
            <span style={{ color: ACCENT }}>the whole firm.</span>
          </motion.h2>
          <motion.p {...fade(0.1, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.7,
            letterSpacing: "-0.01em",
            maxWidth: 620,
            marginTop: 24,
          }}>
            Your case lives in five places: email, calendar, the drive, your case manager, your task list. Delta connects all of them and keeps one current picture of every matter, for every lawyer and paralegal on your team. Ask it anything about any case and it already knows.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. COMMUNICATION / BAR-RISK — Never the firm that went quiet
          ════════════════════════════════════════ */}
      <section id="communication" ref={decoRef1} style={{ position: "relative", padding: "clamp(120px, 14vw, 200px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <motion.div style={{ y: decoY1, position: "absolute", inset: 0, pointerEvents: "none" }}>
          <DecoTopLeft />
        </motion.div>
        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade(0, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            margin: 0,
            maxWidth: 820,
          }}>
            Never the firm{" "}
            <span style={{ color: ACCENT }}>that went quiet.</span>
          </motion.h2>
          <motion.p {...fade(0.1, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.7,
            letterSpacing: "-0.01em",
            maxWidth: 620,
            marginTop: 24,
          }}>
            Failing to communicate is the number-one reason lawyers get reported to the bar. Delta tracks the last contact on every matter and tells you who you owe a call, an email, or an update, before it becomes a complaint. You meant to follow up. Now you will.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. OVERSIGHT FOR A GROWING TEAM — Built for the firm you're becoming
          ════════════════════════════════════════ */}
      <section id="oversight" style={{ position: "relative", padding: "clamp(100px, 12vw, 180px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade(0, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(28px, 3.6vw, 48px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            margin: 0,
            maxWidth: 760,
          }}>
            Built for the firm{" "}
            <span style={{ color: ACCENT }}>you&rsquo;re becoming.</span>
          </motion.h2>
          <motion.p {...fade(0.1, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.7,
            letterSpacing: "-0.01em",
            maxWidth: 620,
            marginTop: 24,
          }}>
            Hiring associates is the moment things start slipping through. Delta is the layer that keeps a growing team organized: every deadline, every open task, every matter&rsquo;s status in one place, so you can scale headcount without scaling chaos. Oversight that doesn&rsquo;t depend on you remembering everything.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. VS A CHATBOT — Claude is a brain. Delta is a brain plugged into your firm.
          ════════════════════════════════════════ */}
      <section id="vs-chatbot" style={{ position: "relative", padding: "clamp(120px, 14vw, 200px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade(0, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            margin: 0,
            maxWidth: 880,
          }}>
            A chatbot is a brain.{" "}
            <span style={{ color: ACCENT }}>Delta is a brain plugged into your firm.</span>
          </motion.h2>
          <motion.p {...fade(0.1, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.7,
            letterSpacing: "-0.01em",
            maxWidth: 660,
            marginTop: 24,
          }}>
            You can paste files into a chatbot. But a chatbot doesn&rsquo;t know what changed in your inbox this morning, doesn&rsquo;t see the deadline on your calendar, doesn&rsquo;t notice the client you haven&rsquo;t called in three weeks, and forgets everything the moment you close the tab. Delta is connected, always current, and shared across your team. It doesn&rsquo;t wait for you to paste, it already has the case, and it does the work.
          </motion.p>

          {/* 3-column contrast */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 16, marginTop: "clamp(40px, 5vw, 64px)" }}
          >
            {[
              {
                label: "Connected",
                chatbot: "You paste files, one at a time.",
                delta: "Connected to email, calendar, files, and tasks, always current.",
              },
              {
                label: "Team-wide",
                chatbot: "One person, one chat, gone when you close it.",
                delta: "Every lawyer and paralegal, one shared picture, persistent.",
              },
              {
                label: "Does the work",
                chatbot: "Answers what you ask.",
                delta: "Catches what you&rsquo;d have missed, and acts on it.",
              },
            ].map((col, i) => (
              <motion.div
                key={col.label}
                initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={reduced ? { duration: 0 } : { duration: 0.6, delay: i * 0.1, ease: EASE }}
                style={{
                  padding: "clamp(22px, 2.4vw, 30px)",
                  borderRadius: 14,
                  border: `1px solid ${BORDER}`,
                  background: "#FFFFFF",
                  boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                }}
              >
                <div style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 600,
                  color: ACCENT,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 18,
                }}>
                  {col.label}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden>
                    <circle cx="8" cy="8" r="7" stroke="#CBD5E1" strokeWidth="1.4" />
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 400, color: "#94A3B8", lineHeight: 1.55, margin: 0, letterSpacing: "-0.005em" }}>
                    Chatbot: {col.chatbot}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden>
                    <circle cx="8" cy="8" r="7" fill={`${ACCENT}14`} stroke={ACCENT} strokeWidth="1.4" />
                    <path d="M5 8.2l2 2 4-4.4" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 500, color: "#0A0A0A", lineHeight: 1.55, margin: 0, letterSpacing: "-0.005em" }}>
                    Delta: <span dangerouslySetInnerHTML={{ __html: col.delta }} />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. ACCURACY / CITATIONS — Every answer cites its source
          ════════════════════════════════════════ */}
      <section id="citations" style={{ position: "relative", padding: "clamp(120px, 14vw, 200px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade(0, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            margin: 0,
            maxWidth: 820,
          }}>
            Every answer cites its source.{" "}
            <span style={{ color: ACCENT }}>Click to verify.</span>
          </motion.h2>
          <motion.p {...fade(0.1, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.7,
            letterSpacing: "-0.01em",
            maxWidth: 660,
            marginTop: 24,
          }}>
            Delta grounds every answer in your real matter and cites the exact source page. No invented case law, no hallucinated citations, the failures that have publicly embarrassed other legal AI. You can click through and check the source yourself, every time.
          </motion.p>

          {/* Citation chip illustration */}
          <motion.div {...fade(0.18, reduced)} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginTop: "clamp(28px, 3vw, 36px)",
            padding: "10px 14px",
            backgroundColor: "#FFFFFF",
            border: `1px solid ${ACCENT}33`,
            borderRadius: 10,
            boxShadow: "0 1px 2px rgba(15,23,42,0.05), 0 6px 18px rgba(37,99,235,0.08)",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M6 2H3.5A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h7a1.5 1.5 0 0 0 1.5-1.5V8M9 2h5v5M14 2 7.5 8.5"
                stroke={ACCENT}
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 500, color: "#0A0A0A", letterSpacing: "-0.005em" }}>
              Source: Discharge_Summary.pdf, p.14
            </span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6. DOES THE WORK — broadened, practice-inclusive (chronologies demoted to one item)
          ════════════════════════════════════════ */}
      <section id="value-prop" style={{ position: "relative", padding: "clamp(120px, 14vw, 200px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.div {...fade(0, reduced)} style={{ maxWidth: 820 }}>
            <h2 style={{
              fontFamily: FONT,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700,
              color: "#0A0A0A",
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              margin: 0,
            }}>
              The work an associate should handle.{" "}
              <span style={{ color: ACCENT }}>Across any kind of case.</span>
            </h2>
          </motion.div>
          <motion.p {...fade(0.1, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.7,
            letterSpacing: "-0.01em",
            maxWidth: 620,
            marginTop: 24,
          }}>
            Draft the demand or the response. Build a chronology across thousands of records. Run the damages math. Summarize a deposition. Send the client update. Personal injury or insurance defense, commercial litigation or med-mal, if it&rsquo;s document-heavy litigation, Delta does the cognitive work that eats billable time.
          </motion.p>

          {/* Subtle "analyzes thousands of [records]" rotation, kept as supporting texture */}
          <motion.div {...fade(0.18, reduced)} style={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 8,
            marginTop: "clamp(32px, 4vw, 48px)",
            fontFamily: FONT,
            fontSize: "clamp(18px, 2vw, 26px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#888",
          }}>
            <span>Analyzes thousands of</span>
            <span style={{
              position: "relative",
              display: "inline-block",
              height: "1.25em",
              overflow: "hidden",
              verticalAlign: "bottom",
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={pairIndex}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{
                    display: "inline-block",
                    color: ACCENT,
                    whiteSpace: "nowrap",
                  }}
                >
                  {ROTATE_WORDS[pairIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span>in minutes.</span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          7. SECURITY — honest, reconciled to /security
          ════════════════════════════════════════ */}
      <section id="security" style={{ position: "relative", padding: "clamp(80px, 10vw, 140px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade(0, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(24px, 3.2vw, 42px)",
            fontWeight: 600,
            color: "#333",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: 680,
          }}>
            Trust is the whole job.{" "}
            <span style={{ color: "#888" }}>So your clients&rsquo; data is never trained on.</span>
          </motion.h2>
          <motion.p {...fade(0.1, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#999",
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
            maxWidth: 560,
            marginTop: 16,
          }}>
            Delta runs on enterprise AI under strict agreements: your data is never used to train any model and never retained by the provider. Every matter is isolated to your firm, with a full, exportable audit trail, built to support your reasonable-efforts obligations under ABA Rule 1.6, and a signed BAA so your clients&rsquo; PII and PHI are secure, bar- and HIPAA-compliant.
          </motion.p>
          <motion.a
            {...fade(0.15, reduced)}
            href="/security"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: FONT,
              fontSize: 15,
              fontWeight: 500,
              color: ACCENT,
              textDecoration: "none",
              marginTop: 20,
              letterSpacing: "-0.01em",
            }}
          >
            How we protect your data
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>
      </section>

      {/* ════════════════════════════════════════
          8. INTEGRATIONS — broadened logo set
          ════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "clamp(80px, 10vw, 140px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade(0, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(24px, 3.2vw, 42px)",
            fontWeight: 600,
            color: "#333",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: 640,
          }}>
            Works with the stack you already have.{" "}
            <span style={{ color: "#888" }}>No platform migration. No new tool to learn.</span>
          </motion.h2>

          {/* Integration logos */}
          <motion.div {...fade(0.15, reduced)} style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(16px, 3vw, 40px)",
            marginTop: "clamp(32px, 4vw, 48px)",
          }}>
            {[
              { src: "/assets/integrations/clio.svg", name: "Clio", h: 22 },
              { src: "/assets/integrations/filevine.svg", name: "Filevine", h: 22 },
              { src: "/assets/integrations/litify.svg", name: "Litify", h: 24 },
              { src: "/assets/integrations/mycase.webp", name: "MyCase", h: 22 },
              { src: "/assets/integrations/microsoft.svg", name: "Microsoft 365", h: 24 },
              { src: "/assets/integrations/outlook.svg", name: "Outlook", h: 26 },
              { src: "/assets/integrations/google-drive.svg", name: "Google Drive", h: 28 },
              { src: "/assets/integrations/gmail.svg", name: "Gmail", h: 24 },
              { src: "/assets/integrations/dropbox.svg", name: "Dropbox", h: 26 },
              { src: "/assets/integrations/neos-icon.svg", name: "Neos", h: 26 },
              { src: "/assets/integrations/casepeer-icon.png", name: "CasePeer", h: 22 },
            ].map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.2 + i * 0.06, ease: EASE }}
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
          <motion.p {...fade(0.25, reduced)} style={{
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
          9. MORNING BRIEFING — Time-to-value answer
          ════════════════════════════════════════ */}
      <section id="briefing" ref={decoRef2} style={{ position: "relative", padding: "clamp(80px, 10vw, 140px) 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <motion.div style={{ y: decoY2, position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6 }}>
          <DecoTopLeft />
        </motion.div>
        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.h2 {...fade(0, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(24px, 3.2vw, 42px)",
            fontWeight: 600,
            color: "#333",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: 640,
          }}>
            Ready before you walk in Monday.{" "}
            <span style={{ color: "#888" }}>The week&rsquo;s groundwork, done overnight.</span>
          </motion.h2>
          <motion.p {...fade(0.1, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#999",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            maxWidth: 580,
            marginTop: 16,
          }}>
            A briefing waits on every active matter when you open Delta. What changed, what&rsquo;s due, what owes a response, drafted follow-ups ready for sign-off.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          10. SOCIAL PROOF — Distinct treatment
          ════════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "clamp(100px, 12vw, 180px) 0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
          <motion.div {...fade(0, reduced)} style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
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
      <section ref={decoRef3} id="cta" style={{
        position: "relative",
        padding: "clamp(120px, 14vw, 200px) 0 clamp(140px, 16vw, 220px)",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%)",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <motion.div style={{ y: decoY3, position: "absolute", inset: 0, pointerEvents: "none" }}>
          <DecoWide />
        </motion.div>
        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)", textAlign: "center" }}>
          <motion.h2 {...fade(0, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 700,
            color: "#0A0A0A",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            maxWidth: 600,
            margin: "0 auto 20px",
          }}>
            See Delta inside your firm&rsquo;s stack.
          </motion.h2>

          <motion.p {...fade(0.08, reduced)} style={{
            fontFamily: FONT,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
            maxWidth: 540,
            margin: "0 auto 40px",
          }}>
            Twenty-minute live demo. Delta on a sandbox of your firm&rsquo;s stack, running a real workflow end to end.
          </motion.p>

          <motion.div {...fade(0.15, reduced)} style={{ display: "flex", justifyContent: "center" }}>
            <motion.a
              href="/demo"
              onClick={() => trackEvent("cta_click", { location: "finale" })}
              className={`cd-btn-cta${reduced ? "" : " cd-cta-pulse"}`}
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
              Book a demo
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
