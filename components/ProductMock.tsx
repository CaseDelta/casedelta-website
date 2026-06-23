"use client";

/* ─────────────────────────────────────────────────────────────────────────
   ProductMock — a coded, looping, fake-UI product animation for the hero.

   Replaces the old hero demo recording. Tells the REPOSITIONED wedge story:
   a CROSS-SYSTEM MORNING BRIEF. Delta is asked one question and assembles a
   brief card-by-card, each tagged with the source system it pulled from
   (the "connected across everything" proof). The lead beat is a COMMUNICATION
   GAP (the #1 bar-complaint trigger) — the defensible, non-commoditized
   differentiator. Citations, ordered deadlines, and one urgent next action
   follow. A "shared with your firm" tag lands the team-wide point.

   Design language matches HeroV2.tsx exactly: Inter, Delta blue, white/#F8FAFF,
   soft shadows, rounded cards, green checks, EASE_OUT cubic-bezier.

   Motion: a single ~17s loop with a clean reset. Respects
   prefers-reduced-motion (auto-shows the fully-assembled static end-state).
   ───────────────────────────────────────────────────────────────────────── */

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─── Design tokens (shared with HeroV2) ─── */
const DELTA_BLUE = "#1D4ED8";
const ACCENT = "#2563EB";
const BORDER = "#EDEDED";
const TEXT_PRIMARY = "#1A1A1A";
const TEXT_TERTIARY = "#666666";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AMBER = "#D97706";
const AMBER_BG = "#FFFBEB";
const AMBER_BORDER = "#FDE68A";
const GREEN = "#10B981";
const GREEN_BG = "#ECFDF5";
const GREEN_BORDER = "#A7F3D0";

const QUERY =
  "Brief me before my morning — what needs my attention across every matter?";

/* ─── Source-system icons (real provider SVGs from /assets/integrations) ─── */
type SourceTool = { name: string; src: string };
const TOOL_OUTLOOK: SourceTool = { name: "Outlook", src: "/assets/integrations/outlook.svg" };
const TOOL_DRIVE: SourceTool = { name: "Google Drive", src: "/assets/integrations/google-drive.svg" };
const TOOL_CALENDAR: SourceTool = { name: "Calendar", src: "/assets/integrations/google-calendar.svg" };
const TOOL_CLIO: SourceTool = { name: "Clio", src: "/assets/integrations/clio-icon.png" };

/* The integration rail (icons glow as each card sources from them). */
const RAIL: { tool: SourceTool; h: number }[] = [
  { tool: TOOL_OUTLOOK, h: 22 },
  { tool: TOOL_CALENDAR, h: 22 },
  { tool: TOOL_DRIVE, h: 22 },
  { tool: TOOL_CLIO, h: 20 },
];

type Accent = "amber" | "blue" | "green" | "neutral";

interface BriefCard {
  accent: Accent;
  source: SourceTool;
  /** which rail icons light up when this card lands */
  lights: string[];
  eyebrow: string;
  body: React.ReactNode;
  /** an action chip (e.g. "Draft a check-in") or a citation chip */
  chip?: { label: string; kind: "action" | "citation" };
}

const CARDS: BriefCard[] = [
  {
    accent: "amber",
    source: TOOL_OUTLOOK,
    lights: ["Outlook"],
    eyebrow: "Communication gap",
    body: (
      <>
        You haven&rsquo;t contacted <strong>Maria Ortega</strong> in 3 weeks. Last
        email Jun 1. This is the #1 bar-complaint trigger.
      </>
    ),
    chip: { label: "Draft a check-in", kind: "action" },
  },
  {
    accent: "blue",
    source: TOOL_DRIVE,
    lights: ["Google Drive"],
    eyebrow: "Missing record",
    body: (
      <>
        Intra-operative records still missing for <strong>Ortega</strong>.
        Referenced on page 14 of the discharge summary; never produced.
      </>
    ),
    chip: { label: "Source: Discharge_Summary.pdf p.14", kind: "citation" },
  },
  {
    accent: "green",
    source: TOOL_CALENDAR,
    lights: ["Calendar", "Clio"],
    eyebrow: "Deadlines this week",
    body: (
      <>
        2 tasks due this week — expert review <strong>Jul 8</strong>, demand
        response <strong>Jul 2</strong>.
      </>
    ),
  },
  {
    accent: "neutral",
    source: TOOL_OUTLOOK,
    lights: ["Outlook"],
    eyebrow: "Most urgent",
    body: (
      <>
        Respond to opposing counsel&rsquo;s email from yesterday before anything
        else.
      </>
    ),
    chip: { label: "Draft reply", kind: "action" },
  },
];

/* ─── Timeline (ms). One pass ~17s, then a brief hold + clean reset. ─── */
const T = {
  start: 600, // caret begins
  charMs: 30, // typing speed (QUERY length ~72 → ~2.2s)
  typingDone: 600 + QUERY.length * 30, // ~2760
  thinkingIn: 0, // set below relative to typingDone
  cardStep: 1500, // cadence between cards landing
  holdAfterLast: 3200, // dwell on the full brief before resetting
};
const THINKING_AT = T.typingDone + 500;
const FIRST_CARD_AT = THINKING_AT + 1300;
const LAST_CARD_AT = FIRST_CARD_AT + (CARDS.length - 1) * T.cardStep;
const RESET_AT = LAST_CARD_AT + T.holdAfterLast;

function accentColors(a: Accent): { bar: string; bg: string; border: string; eyebrow: string } {
  switch (a) {
    case "amber":
      return { bar: AMBER, bg: AMBER_BG, border: AMBER_BORDER, eyebrow: AMBER };
    case "green":
      return { bar: GREEN, bg: GREEN_BG, border: GREEN_BORDER, eyebrow: "#047857" };
    case "blue":
      return { bar: ACCENT, bg: "#EFF6FF", border: "#BFDBFE", eyebrow: DELTA_BLUE };
    default:
      return { bar: "#94A3B8", bg: "#F8FAFC", border: "#E2E8F0", eyebrow: TEXT_TERTIARY };
  }
}

/* ─── A single assembled brief card ─── */
function Card({ card }: { card: BriefCard }) {
  const c = accentColors(card.accent);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: 12,
        padding: "13px 15px 13px 14px",
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)",
      }}
    >
      {/* Accent rail */}
      <div
        style={{
          flexShrink: 0,
          width: 3,
          alignSelf: "stretch",
          borderRadius: 2,
          backgroundColor: c.bar,
        }}
      />
      {/* Source icon */}
      <div
        style={{
          flexShrink: 0,
          width: 26,
          height: 26,
          borderRadius: 7,
          backgroundColor: "#FFFFFF",
          border: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1,
        }}
      >
        <img
          src={card.source.src}
          alt=""
          aria-hidden
          style={{ height: 14, width: "auto", maxWidth: 16, objectFit: "contain", display: "block" }}
        />
      </div>
      {/* Text */}
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 10.5,
            fontWeight: 600,
            color: c.eyebrow,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {card.eyebrow}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 400,
            color: TEXT_PRIMARY,
            lineHeight: 1.45,
            letterSpacing: "-0.005em",
          }}
        >
          {card.body}
        </div>
        {card.chip && (
          <div style={{ marginTop: 9 }}>
            {card.chip.kind === "action" ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 11px",
                  backgroundColor: ACCENT,
                  color: "#FFFFFF",
                  borderRadius: 7,
                  fontFamily: FONT,
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "-0.005em",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M2.5 8h9M8 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {card.chip.label}
              </span>
            ) : (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${c.border}`,
                  borderRadius: 7,
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 500,
                  color: TEXT_TERTIARY,
                  letterSpacing: "-0.005em",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M6 2H3.5A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h7a1.5 1.5 0 0 0 1.5-1.5V8M9 2h5v5M14 2 7.5 8.5"
                    stroke={ACCENT}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {card.chip.label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductMock() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;

  // -1 = nothing typed yet; 0..N visible cards. "thinking" gates the spinner.
  const [queryChars, setQueryChars] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [visibleCards, setVisibleCards] = useState(0);
  const [litSources, setLitSources] = useState<Set<string>>(new Set());

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const [cycle, setCycle] = useState(0); // bump to restart the loop

  useEffect(() => {
    if (reduced) {
      // Static end-state: full query + all cards + all rail icons lit.
      setQueryChars(QUERY.length);
      setThinking(false);
      setVisibleCards(CARDS.length);
      setLitSources(new Set(RAIL.map((r) => r.tool.name)));
      return;
    }

    // Reset state for a fresh pass.
    setQueryChars(0);
    setThinking(false);
    setVisibleCards(0);
    setLitSources(new Set());

    const timers = timersRef.current;
    const intervals = intervalsRef.current;
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    // Typing.
    at(T.start, () => {
      let i = 0;
      const id = setInterval(() => {
        i += 1;
        setQueryChars(i);
        if (i >= QUERY.length) clearInterval(id);
      }, T.charMs);
      intervals.push(id);
    });

    // Thinking spinner after the query lands.
    at(THINKING_AT, () => setThinking(true));

    // Cards land one by one; each lights its source icons.
    CARDS.forEach((card, idx) => {
      const landAt = FIRST_CARD_AT + idx * T.cardStep;
      at(landAt, () => {
        if (idx === 0) setThinking(false);
        setVisibleCards(idx + 1);
        setLitSources((prev) => {
          const next = new Set(prev);
          card.lights.forEach((l) => next.add(l));
          return next;
        });
      });
    });

    // Clean reset → next pass.
    at(RESET_AT, () => setCycle((c) => c + 1));

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      timersRef.current = [];
      intervalsRef.current = [];
    };
  }, [cycle, reduced]);

  return (
    <div
      role="img"
      aria-label="Delta assembling a cross-system morning brief: a communication gap, a missing record with a cited source, this week's deadlines, and the most urgent next action — each pulled from a connected tool and shared across the firm."
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${BORDER}`,
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%)",
        boxShadow:
          "0 24px 60px -20px rgba(15,23,42,0.18), 0 4px 12px -2px rgba(15,23,42,0.08)",
        fontFamily: FONT,
        userSelect: "none",
      }}
    >
      {/* ── Window chrome ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 16px",
          borderBottom: `1px solid ${BORDER}`,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c, opacity: 0.85 }} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            marginLeft: 6,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 5,
              backgroundColor: "#0F172A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/assets/branding/delta-icon-light.svg"
              alt=""
              aria-hidden
              style={{ width: 11, height: 11 }}
            />
          </div>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 12,
              fontWeight: 600,
              color: "#0F172A",
              letterSpacing: "-0.01em",
            }}
          >
            Delta
          </span>
        </div>

        {/* "shared with your firm" — the team-wide tag */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ display: "flex" }}>
            {["#2563EB", "#7C3AED", "#0EA5E9"].map((c, i) => (
              <span
                key={c}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: c,
                  border: "2px solid #FFFFFF",
                  marginLeft: i === 0 ? 0 : -7,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 11,
              fontWeight: 500,
              color: TEXT_TERTIARY,
              letterSpacing: "-0.005em",
            }}
            className="cd-pm-shared"
          >
            Shared with your firm
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "18px 18px 20px" }}>
        {/* Message Delta box */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            boxShadow: "0 4px 16px rgba(15,23,42,0.05)",
            padding: "13px 15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 9,
              fontFamily: FONT,
              fontSize: 10.5,
              fontWeight: 600,
              color: TEXT_TERTIARY,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Message Delta
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontSize: 14,
              lineHeight: 1.5,
              color: TEXT_PRIMARY,
              letterSpacing: "-0.005em",
              minHeight: 42,
            }}
          >
            <span style={{ whiteSpace: "pre-wrap" }}>{QUERY.slice(0, queryChars)}</span>
            {!reduced && queryChars > 0 && queryChars < QUERY.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.05em",
                  backgroundColor: ACCENT,
                  marginLeft: 1,
                  verticalAlign: "text-bottom",
                }}
              />
            )}
          </div>
        </div>

        {/* Integration rail — icons glow as cards source from them */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 10,
              fontWeight: 600,
              color: "#94A3B8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginRight: 2,
            }}
          >
            Reading
          </span>
          {RAIL.map(({ tool, h }) => {
            const lit = litSources.has(tool.name);
            return (
              <div
                key={tool.name}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: lit ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                  border: `1px solid ${lit ? `${ACCENT}55` : BORDER}`,
                  boxShadow: lit ? `0 0 0 3px ${ACCENT}14, 0 4px 12px ${ACCENT}22` : "none",
                  transition: "box-shadow 0.4s ease, border-color 0.4s ease, background-color 0.4s ease",
                }}
              >
                <img
                  src={tool.src}
                  alt={tool.name}
                  title={tool.name}
                  style={{
                    height: h,
                    width: "auto",
                    maxWidth: 22,
                    objectFit: "contain",
                    display: "block",
                    opacity: lit ? 1 : 0.4,
                    transition: "opacity 0.4s ease",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Brief — cards assemble one by one */}
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Thinking row */}
          <AnimatePresence>
            {thinking && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "11px 14px",
                  fontFamily: FONT,
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: TEXT_TERTIARY,
                }}
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: `2px solid ${ACCENT}33`,
                    borderTopColor: ACCENT,
                    display: "block",
                  }}
                />
                Reading across your matters&hellip;
              </motion.div>
            )}
          </AnimatePresence>

          {CARDS.slice(0, visibleCards).map((card, idx) => (
            <motion.div
              key={idx}
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <Card card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
