"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.33, 1, 0.68, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

// ---------------------------------------------------------------------------
// Animated counter
// ---------------------------------------------------------------------------
function useCounter(end: number, duration = 1.8) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / (duration * 1000), 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return { count, ref };
}

// ---------------------------------------------------------------------------
// Design tokens (Harvey-matched)
// ---------------------------------------------------------------------------
const C = {
  ink: "#0F0E0D",
  ivory: "#FAFAF9",
  cream: "#FAFAF9",
  warmGray: "#F2F1F0",
  darkTint: "#1F1D1A",
  muted: "#8F8B85",
  lightMuted: "#CCCAC6",
  useCaseMuted: "#706D66",
};
const serif = '"Harvey Serif", Georgia, serif';
const sans = '"CaseDelta Sans", -apple-system, sans-serif';

// ═══════════════════════════════════════════════════════════════════════════
// 1. HERO — 100dvh, background video, bottom-left text, blur ticker bar
// ═══════════════════════════════════════════════════════════════════════════
function Hero() {
  return (
    <section
      style={{
        height: "100dvh",
        minHeight: 700,
        position: "relative",
        overflow: "hidden",
        backgroundColor: C.ink,
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.55,
        }}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(15,14,13,0.9) 0%, rgba(15,14,13,0.4) 40%, rgba(15,14,13,0.1) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content — vertically centered, left-aligned */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 80, // space for ticker bar
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          paddingTop: 92, // account for nav height
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 640 }}>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              style={{
                fontFamily: serif,
                fontSize: "clamp(42px, 5.5vw, 72px)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.9px",
                color: C.ivory,
                marginBottom: 20,
              }}
            >
              Practice Made
              <br />
              Proactive
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              style={{
                fontFamily: sans,
                fontSize: "clamp(16px, 1.3vw, 20px)",
                lineHeight: 1.3,
                fontWeight: 400,
                color: C.ivory,
                marginBottom: 28,
                maxWidth: 520,
              }}
            >
              Delta reviews your cases overnight, flags what needs attention, and
              has drafts ready before you walk in. The AI associate for firms
              that move fast.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <Link
                href="#get-started"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 48,
                  padding: "0 20px",
                  backgroundColor: C.ivory,
                  color: C.ink,
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 500,
                  borderRadius: 4,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = "0.88")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = "1")
                }
              >
                Request a Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom ticker blur bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(15,14,13,0.25)",
        }}
      >
        <TickerBar />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Ticker bar (hero bottom)
// ---------------------------------------------------------------------------
function TickerBar() {
  const items = [
    "Personal Injury",
    "Medical Malpractice",
    "Employment Law",
    "Commercial Litigation",
    "Insurance Bad Faith",
    "Family Law",
    "Tax Controversy",
    "Estate Planning",
    "Immigration",
  ];

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 60,
            background:
              "linear-gradient(to right, rgba(15,14,13,0.7), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: 60,
            background:
              "linear-gradient(to left, rgba(15,14,13,0.7), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: 40,
            width: "max-content",
          }}
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={`tk-${i}`}
              style={{
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(250,250,249,0.45)",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <Link
        href="#platform"
        style={{
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          height: 32,
          padding: "0 12px",
          fontFamily: sans,
          fontSize: 14,
          fontWeight: 400,
          color: C.ivory,
          border: `1px solid ${C.ivory}`,
          borderRadius: 4,
          textDecoration: "none",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(250,250,249,0.08)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        Learn More
      </Link>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. PLATFORM SECTION — Cream BG, two-tone heading, briefing embed
// ═══════════════════════════════════════════════════════════════════════════
function PlatformSection() {
  return (
    <section
      id="platform"
      style={{ backgroundColor: C.cream, padding: "160px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          style={{
            fontFamily: sans,
            fontSize: "clamp(24px, 2.5vw, 32px)",
            lineHeight: 1.1,
            fontWeight: 500,
            letterSpacing: "-0.32px",
            marginBottom: 64,
            maxWidth: 720,
          }}
        >
          <strong style={{ color: C.ink }}>
            Delta is an AI associate that lives inside your firm.
          </strong>{" "}
          <span style={{ color: C.muted }}>
            It connects to your Clio, monitors your cases overnight, and brings
            you findings before you ask — not a chatbot you prompt, a colleague
            that shows up.
          </span>
        </motion.h3>

        <BriefingEmbed />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Briefing embed (dark card on cream background)
// ---------------------------------------------------------------------------
function BriefingEmbed() {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const dismiss = useCallback(
    (i: number) => setDismissed((prev) => new Set(prev).add(i)),
    []
  );

  const findings = [
    {
      type: "Document Alert",
      color: "#4A7A4A",
      text: "Client submitted 8 of 12 required documents for the Wheeler matter. Still missing: 2023 tax return and QDRO. Draft follow-up ready.",
      actions: ["Approve & Send", "Edit Draft"],
    },
    {
      type: "Deadline Alert",
      color: "#B05030",
      text: "Martinez deposition is in 4 days. Expert witness disclosure hasn\u2019t been filed. Draft prepared.",
      actions: ["Review Draft", "Snooze"],
    },
    {
      type: "Income Flag",
      color: "#C49030",
      text: "Robertson matter: $31K discrepancy between W-2 income and bank deposits. Flagged for review.",
      actions: ["Add to Case Notes", "Dismiss"],
    },
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={1}
      style={{
        backgroundColor: C.ink,
        borderRadius: 12,
        padding: "clamp(28px, 4vw, 48px)",
        maxWidth: 760,
      }}
    >
      <p
        style={{
          fontFamily: sans,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.muted,
          marginBottom: 6,
        }}
      >
        7:00 AM — Delta&apos;s Morning Briefing
      </p>
      <p
        style={{
          fontFamily: sans,
          fontSize: 14,
          lineHeight: 1.5,
          color: C.lightMuted,
          marginBottom: 28,
        }}
      >
        Good morning. Here&apos;s what I&apos;ve been tracking overnight.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {findings.map((item, i) => (
          <motion.div
            key={`finding-${i}`}
            animate={
              dismissed.has(i)
                ? { opacity: 0.2, scale: 0.98 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.3 }}
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 6,
              padding: "18px 22px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!dismissed.has(i))
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 7,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  boxShadow: `0 0 6px ${item.color}50`,
                }}
              />
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: item.color,
                }}
              >
                {item.type}
              </span>
            </div>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                lineHeight: 1.55,
                color: C.lightMuted,
                margin: "0 0 12px",
              }}
            >
              {item.text}
            </p>
            <div style={{ display: "flex", gap: 6 }}>
              {item.actions.map((action, ai) => (
                <button
                  key={`a${i}-${ai}`}
                  onClick={() => dismiss(i)}
                  style={{
                    fontFamily: sans,
                    padding: "4px 10px",
                    fontSize: 11,
                    fontWeight: 500,
                    borderRadius: 4,
                    border:
                      ai === 0
                        ? "none"
                        : "1px solid rgba(255,255,255,0.1)",
                    backgroundColor:
                      ai === 0 ? "rgba(250,250,249,0.1)" : "transparent",
                    color: ai === 0 ? C.ivory : C.muted,
                    cursor: "pointer",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      ai === 0
                        ? "rgba(250,250,249,0.18)"
                        : "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      ai === 0 ? "rgba(250,250,249,0.1)" : "transparent";
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. USE CASE TICKER — Cream BG, vertical scrolling text
// ═══════════════════════════════════════════════════════════════════════════
function UseCaseSection() {
  const useCases = [
    "Document Analysis",
    "Case Monitoring",
    "Income Verification",
    "Deadline Tracking",
    "Draft Generation",
    "Anomaly Detection",
    "Completeness Tracking",
  ];
  const [active, setActive] = useState(3);

  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % useCases.length),
      2500
    );
    return () => clearInterval(id);
  }, [useCases.length]);

  return (
    <section style={{ backgroundColor: C.cream, padding: "0 0 160px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "clamp(40px, 6vw, 100px)",
            flexWrap: "wrap",
          }}
        >
          {/* Left label */}
          <div style={{ paddingTop: 12, minWidth: 160 }}>
            <p
              style={{
                fontFamily: sans,
                fontSize: 20,
                fontWeight: 500,
                color: C.ink,
                marginBottom: 20,
              }}
            >
              Delta handles
            </p>
            <Link
              href="#platform"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 32,
                padding: "0 12px",
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 400,
                color: C.ink,
                border: `1px solid ${C.ink}`,
                borderRadius: 4,
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(15,14,13,0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              Explore Platform
            </Link>
          </div>

          {/* Ticker items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {useCases.map((item, i) => (
              <motion.span
                key={`uc-${i}`}
                animate={{ opacity: i === active ? 1 : 0.1 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(32px, 3.8vw, 48px)",
                  lineHeight: 1.05,
                  fontWeight: 400,
                  letterSpacing: "-0.48px",
                  color: C.useCaseMuted,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setActive(i)}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. TESTIMONIAL — Warm gray BG (#F2F1F0), full-width quote (no image)
// ═══════════════════════════════════════════════════════════════════════════
function TestimonialSection() {
  return (
    <section
      style={{ backgroundColor: C.warmGray, padding: "128px 0 96px" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        <div style={{ maxWidth: 800 }}>
          {/* Decorative quote mark */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            style={{
              fontFamily: serif,
              fontSize: "clamp(100px, 12vw, 160px)",
              lineHeight: 0.6,
              color: C.muted,
              opacity: 0.2,
              userSelect: "none",
              marginBottom: 0,
            }}
          >
            &ldquo;
          </motion.div>

          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            style={{
              fontFamily: serif,
              fontSize: "clamp(24px, 2.5vw, 32px)",
              lineHeight: 1.05,
              fontWeight: 400,
              color: C.ink,
              margin: "0 0 32px",
            }}
          >
            It&apos;s like having an extra person in the firm who&apos;s always
            working. I come out of a three-hour deposition and there&apos;s a
            summary waiting — here&apos;s what happened with all my cases,
            here&apos;s what still needs attention. It just runs.
          </motion.blockquote>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <p
              style={{
                fontFamily: sans,
                fontSize: 20,
                fontWeight: 500,
                color: C.ink,
                marginBottom: 4,
              }}
            >
              Managing Partner
            </p>
            <p
              style={{
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 400,
                color: C.ink,
              }}
            >
              Mid-Size Litigation Firm
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. FEATURES — Dark BG, two-tone heading, 2x2 grid
// ═══════════════════════════════════════════════════════════════════════════
function FeaturesSection() {
  const features = [
    {
      title: "Proactive Case Monitoring",
      desc: "Delta runs across all your active cases overnight — surfaces deadlines, flags missing documents, and queues drafted actions for your morning review.",
    },
    {
      title: "Cross-Document Intelligence",
      desc: "Upload any set of legal documents. Delta compares data across them — income discrepancies, conflicting dates, unsigned pages — insights a manual review would miss.",
    },
    {
      title: "Institutional Memory",
      desc: "Delta learns your firm over time. Your clients, your opposing counsel\u2019s patterns, your drafting style. Knowledge that compounds and never walks out the door.",
    },
    {
      title: "Works Inside Your Stack",
      desc: "Connects to Clio, Google Drive, and your existing tools via OAuth. Delta gets its own credentials — like onboarding a new hire. No migration required.",
    },
  ];

  return (
    <section style={{ backgroundColor: C.ink, padding: "160px 0 128px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          style={{
            fontFamily: sans,
            fontSize: "clamp(24px, 2.5vw, 32px)",
            lineHeight: 1.1,
            fontWeight: 500,
            letterSpacing: "-0.32px",
            marginBottom: 64,
            maxWidth: 600,
          }}
        >
          <strong style={{ color: C.ivory }}>
            Built for the way lawyers actually work.
          </strong>{" "}
          <span style={{ color: C.muted }}>
            Not another tool to learn — a colleague that handles what&apos;s
            eating your billable time.
          </span>
        </motion.h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 1,
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={`feat-${i}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              style={{
                padding: "clamp(28px, 3vw, 40px)",
                backgroundColor: C.ink,
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1A1918")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = C.ink)
              }
            >
              <h4
                style={{
                  fontFamily: sans,
                  fontSize: 17,
                  fontWeight: 600,
                  color: C.ivory,
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </h4>
              <p
                style={{
                  fontFamily: sans,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: C.muted,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. STATS — Dark BG, horizontal label→number rows (Harvey's layout)
// ═══════════════════════════════════════════════════════════════════════════
function StatsSection() {
  const c1 = useCounter(20);
  const c2 = useCounter(80);
  const c3 = useCounter(100);

  const stats = [
    { label: "Average hours saved per attorney per month", value: `${c1.count}+`, ref: c1.ref },
    { label: "Of law firms underserved by enterprise AI", value: `${c2.count}%`, ref: c2.ref },
    { label: "Audit trail coverage for bar compliance", value: `${c3.count}%`, ref: c3.ref },
    { label: "Delta works while you\u2019re away", value: "24/7", ref: undefined },
    { label: "Cost of a paralegal CaseDelta replaces", value: "$50\u201370K", ref: undefined },
  ];

  return (
    <section style={{ backgroundColor: C.ink, padding: "128px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          style={{
            fontFamily: sans,
            fontSize: "clamp(24px, 2.5vw, 32px)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.32px",
            color: C.ivory,
            marginBottom: 48,
            maxWidth: 500,
          }}
        >
          The numbers that matter
        </motion.h3>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {stats.map((s, i) => (
            <motion.div
              key={`stat-${i}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "24px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                gap: 32,
              }}
            >
              <p
                style={{
                  fontFamily: sans,
                  fontSize: "clamp(14px, 1.2vw, 20px)",
                  fontWeight: 400,
                  color: C.ivory,
                  margin: 0,
                }}
              >
                {s.label}
              </p>
              <span
                ref={s.ref}
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(40px, 5vw, 72px)",
                  fontWeight: 400,
                  color: C.ivory,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {s.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 7. SECURITY — Darker tint BG (#1F1D1A), split layout, SVG badges
// ═══════════════════════════════════════════════════════════════════════════
function SecuritySection() {
  const badges = [
    { icon: "/images/harvey-assets/shield-soc2.svg", label: "SOC2 II" },
    { icon: "/images/harvey-assets/euro-security.svg", label: "CCPA" },
    { icon: "/images/harvey-assets/iso-badge.svg", label: "ISO 27001" },
    { icon: "/images/harvey-assets/euro-security.svg", label: "GDPR" },
  ];

  return (
    <section
      id="security"
      style={{
        backgroundColor: C.darkTint,
        padding: "128px 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(48px, 6vw, 128px)",
            alignItems: "start",
            maxWidth: 1200,
          }}
        >
          {/* Left text */}
          <div>
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              style={{
                fontFamily: sans,
                fontSize: "clamp(24px, 2.5vw, 32px)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.32px",
                color: C.ivory,
                marginBottom: 20,
              }}
            >
              Enterprise-grade security and controls
            </motion.h3>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              style={{
                fontFamily: sans,
                fontSize: "clamp(16px, 1.2vw, 20px)",
                lineHeight: 1.3,
                fontWeight: 400,
                color: C.lightMuted,
                marginBottom: 24,
              }}
            >
              No client data is ever sent to OpenAI, Google, or any third party.
              Delta connects to your systems with its own credentials — every
              action logged with a full audit trail. If your bar association asks,
              you show them the log.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              <Link
                href="#security"
                style={{
                  fontFamily: sans,
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.ivory,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = "0.65")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = "1")
                }
              >
                More About Security →
              </Link>
            </motion.div>
          </div>

          {/* Right badges — single row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "clamp(24px, 3vw, 48px)",
              alignItems: "start",
            }}
          >
            {badges.map((b, i) => (
              <div
                key={`badge-${i}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Image
                  src={b.icon}
                  alt={b.label}
                  width={80}
                  height={80}
                  style={{ opacity: 0.45 }}
                />
                <p
                  style={{
                    fontFamily: sans,
                    fontSize: 13,
                    fontWeight: 500,
                    color: C.ivory,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 8. FOOTER CTA — Dark BG, centered serif heading
// ═══════════════════════════════════════════════════════════════════════════
function FooterCta() {
  return (
    <section
      id="get-started"
      style={{
        backgroundColor: C.ink,
        padding: "128px 0 64px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          style={{
            fontFamily: serif,
            fontSize: "clamp(22px, 2vw, 28px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.24px",
            color: "#FFFFFF",
            marginBottom: 24,
          }}
        >
          See Delta on your actual cases.
        </motion.h3>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          style={{
            fontFamily: sans,
            fontSize: 16,
            lineHeight: 1.5,
            color: C.muted,
            marginBottom: 28,
            maxWidth: 440,
          }}
        >
          We&apos;ll run Delta on your documents — live, in 10 minutes. No
          slides. No feature tour. Your cases.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <a
            href="mailto:camren@casedelta.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 48,
              padding: "0 20px",
              backgroundColor: C.ivory,
              color: C.ink,
              fontFamily: sans,
              fontSize: 16,
              fontWeight: 500,
              borderRadius: 4,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Request a Demo
          </a>
        </motion.div>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          style={{
            fontFamily: sans,
            fontSize: 13,
            color: "#555",
            marginTop: 14,
          }}
        >
          Or email{" "}
          <a
            href="mailto:camren@casedelta.com"
            style={{
              color: C.muted,
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationColor: "#444",
            }}
          >
            camren@casedelta.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <main style={{ backgroundColor: C.ink, minHeight: "100vh" }}>
      <Hero />
      <PlatformSection />
      <UseCaseSection />
      <TestimonialSection />
      <FeaturesSection />
      <StatsSection />
      <SecuritySection />
      <FooterCta />
    </main>
  );
}
