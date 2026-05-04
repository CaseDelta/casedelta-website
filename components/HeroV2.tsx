"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Design tokens ─── */
const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const ACCENT = "#2563EB";
const BORDER = "#EDEDED";
const TEXT_TERTIARY = "#666666";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Tool brand assets (real provider SVGs from /assets/integrations) ─── */
type Tool = {
  name: string;
  src: string;
  hStack: number;  // height in vertical stack (px)
  hExec: number;   // height in execution row (px)
};

const TOOLS: Tool[] = [
  { name: "Outlook",        src: "/assets/integrations/outlook.svg",        hStack: 26, hExec: 54 }, // 0
  { name: "Microsoft Word", src: "/assets/integrations/microsoft-word.svg", hStack: 26, hExec: 54 }, // 1
  { name: "Gmail",          src: "/assets/integrations/gmail.svg",          hStack: 24, hExec: 54 }, // 2
  { name: "Google Drive",   src: "/assets/integrations/google-drive.svg",   hStack: 24, hExec: 52 }, // 3
  { name: "Clio",           src: "/assets/integrations/clio.svg",           hStack: 18, hExec: 42 }, // 4
  { name: "Westlaw",        src: "/assets/integrations/westlaw.svg",        hStack: 26, hExec: 52 }, // 5
  { name: "DocuSign",       src: "/assets/integrations/docusign.svg",       hStack: 14, hExec: 42 }, // 6
];

// Stack-only "more" indicator — communicates that integrations extend beyond the 5 named tools.
const STACK_EXTRA = { name: "And many more" };
const MoreIconSvg = (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3"  y="3"  width="7" height="7" rx="2" fill="#94A3B8" />
    <rect x="14" y="3"  width="7" height="7" rx="2" fill="#94A3B8" />
    <rect x="3"  y="14" width="7" height="7" rx="2" fill="#94A3B8" />
    <rect x="14" y="14" width="7" height="7" rx="2" fill="#2563EB" />
  </svg>
);

// Execution sequence: each tool gets an action verb that fades in with a green check on completion.
// Order matches the query: analyze discovery (Drive) → draft chronology (Word) → email (Gmail) → update Clio.
const EXECS: { toolIdx: number; label: string }[] = [
  { toolIdx: 3, label: "Analyzed" }, // Google Drive — read the discovery set
  { toolIdx: 1, label: "Drafted" },  // Microsoft Word — chronology built
  { toolIdx: 2, label: "Sent" },     // Gmail — sent to opposing counsel
  { toolIdx: 4, label: "Updated" },  // Clio — case file updated
];

const SUCCESS_GREEN = "#10B981";

const QUERY = "Build a surgical chronology from this discovery, email it to opposing counsel, and update Chen v. Mercy in Clio.";

/* ─── Document stack icon (simulates a Finder-style folder of papers) ─── */
function DocumentStack({ glow }: { glow?: boolean }) {
  return (
    <div style={{ position: "relative", width: 96, height: 116 }}>
      {/* Bottom shadow page */}
      <div style={{
        position: "absolute", left: 12, top: 14,
        width: 78, height: 100,
        backgroundColor: "#F4F4F5", border: "1px solid #E5E7EB", borderRadius: 6,
      }} />
      {/* Middle page */}
      <div style={{
        position: "absolute", left: 6, top: 7,
        width: 78, height: 100,
        backgroundColor: "#FAFAFA", border: "1px solid #E5E7EB", borderRadius: 6,
      }} />
      {/* Top page (visible content) */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: 78, height: 100,
        backgroundColor: "#FFFFFF",
        border: "1px solid #E0E0E0",
        borderRadius: 6,
        padding: "12px 11px",
        boxShadow: glow
          ? `0 0 0 3px ${ACCENT}33, 0 6px 20px ${ACCENT}25, 0 2px 6px rgba(15,23,42,0.10)`
          : "0 2px 6px rgba(15,23,42,0.06), 0 8px 20px rgba(15,23,42,0.05)",
        transition: "box-shadow 0.25s ease",
      }}>
        <div style={{ height: 4, backgroundColor: "#1A1A1A", borderRadius: 1, opacity: 0.85, width: "62%", marginBottom: 7 }} />
        <div style={{ height: 2, backgroundColor: "#D4D4D8", borderRadius: 1, marginBottom: 5 }} />
        <div style={{ height: 2, backgroundColor: "#D4D4D8", borderRadius: 1, marginBottom: 5, width: "85%" }} />
        <div style={{ height: 2, backgroundColor: "#D4D4D8", borderRadius: 1, marginBottom: 5 }} />
        <div style={{ height: 2, backgroundColor: "#D4D4D8", borderRadius: 1, marginBottom: 5, width: "75%" }} />
        <div style={{ height: 2, backgroundColor: "#D4D4D8", borderRadius: 1, marginBottom: 5, width: "90%" }} />
        <div style={{ height: 2, backgroundColor: "#D4D4D8", borderRadius: 1, marginBottom: 5, width: "60%" }} />
      </div>
    </div>
  );
}

/* ─── Macintosh-style pointer cursor (tip at 0,0 so position = tip position) ─── */
const CursorSvg = (
  <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden style={{ display: "block" }}>
    <path
      d="M1 1 L1 21 L7 17 L11 25 L15 22 L11 14 L19 13 Z"
      fill="#FFFFFF"
      stroke="#1A1A1A"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const INTRO_SUBTITLE = "is your law firm's personal assistant";
const HERO_SUBTITLE = "The personal assistant that connects all your firm's tools together, so you can manage all of them with a single sentence.";

/* ─── Timing (ms) ───
   Three phases with AnimatePresence (mode="wait") crossfades between them:
   1. Intro text  (Delta + INTRO_SUBTITLE)
   2. Anim 1      (2-col grid of integrations builds up)
   3. Anim 2      (typing → 3 execution cards fade in below + check sequence)
   After the exec sequence completes, the overlay dissolves directly into the hero page.

   Every phase's animations should hold for ~T.completionHold after their last beat
   before the next phase begins, so the rhythm feels consistent screen-to-screen.    */
const T = {
  // Unified pause after a phase's animations complete, before the next phase begins.
  completionHold: 1200,

  // Phase 1 — intro text
  introIn: 200,
  // Text fully in by ~1500 (introIn + 600 subtitle delay + 700 anim)
  // anim1In = 1500 + completionHold = 2700

  // Phase 2 — anim1 (2-col grid builds with cascading reveal)
  anim1In: 2700,
  stackStart: 3500,      // anim1 mounted by ~3300 with crossfade buffer
  stackStep: 320,        // tighter cadence so cards cascade rather than pop one-by-one
  // 8 items: last appears at 3500 + 7*320 = 5740, fully visible ~6440 (animation duration 0.7s)
  // anim2In = 6440 + completionHold = 7640

  // Phase 3 — anim2 (document stack → cursor drag → typing → execution stack)
  anim2In: 7700,
  // — Document stack scene —
  counterStart: 8000,     // 300ms after anim2In: counter starts climbing 0 → 9999
  counterDuration: 1100,  // ease-out spin
  counterMaxedAt: 9200,   // counter snaps to "10,000+"
  // — Cursor drag scene —
  cursorAppearAt: 9700,   // cursor fades in near the stack
  grabAt: 10500,          // cursor over stack: grab + stack scale-down
  dragStartAt: 10800,     // cursor + stack begin moving toward query box
  dropAt: 11800,          // stack arrives at attachment slot, becomes chip
  cursorOutAt: 12000,     // cursor fades out
  // — Typing scene —
  queryTypeStart: 12300,
  queryCharMs: 22,
  // Query: ~115 chars * 22ms ≈ 2530ms → finishes ~14830
  // — Execution scene —
  shiftAt: 16200,         // ~1370ms hold after typing ends; executing=true → exec stack fades in
  execStart: 17000,       // 800ms after shift; stack settled
  execGap: 620,
  execHold: 420,
  // 4 execs end at 17000 + 3*620 + 420 = 19280
  // After completionHold (1200) anim2 hands off to the finale.
  finaleIn: 20480,
  // Finale: three lines clip-reveal at delays 0.1 / 1.5 / 2.9 (each 1.2s wipe), so the
  // last line lands ~4.1s in. Hold ~2.4s after that before dissolving to the hero.
  reveal: 27000,
};

/* ─── Module-level flag ─── */
let hasPlayedIntro = false;
function markIntroPlayed() { hasPlayedIntro = true; }
export function getHasPlayedIntro() { return hasPlayedIntro; }

interface HeroV2Props {
  onReveal?: () => void;
  deco?: React.ReactNode;
  skipIntro?: boolean;
}

type Phase = "idle" | "intro" | "anim1" | "anim2" | "finale";

export function HeroV2({ onReveal, deco, skipIntro = false }: HeroV2Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [stackIdx, setStackIdx] = useState(-1);  // -1 = nothing visible; 0..N = items 0..N visible
  const [queryChars, setQueryChars] = useState(0);
  const [executing, setExecuting] = useState(false);
  const [activeExec, setActiveExec] = useState(-1);
  const [executed, setExecuted] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);
  const [introExited, setIntroExited] = useState(false);
  // Phase 3 sub-state
  const [docCount, setDocCount] = useState(0);                                    // 0 → 9999
  const [docCountMaxed, setDocCountMaxed] = useState(false);                      // true → display "10,000+"
  const [dragStep, setDragStep] = useState<"hidden" | "ready" | "grabbing" | "dragging" | "attached">("hidden");

  // Mobile detection — switch to compact rows below 640px (no card chrome, smaller icons).
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Measured positions — drive the cursor + stack drag at any viewport size.
  // Use callback refs (state-backed) because Phase 3 mounts AFTER Phase 2's exit animation
  // (AnimatePresence mode="wait"), so a phase-keyed useEffect runs before the elements exist.
  const [phase3El, setPhase3El] = useState<HTMLDivElement | null>(null);
  const [rightColEl, setRightColEl] = useState<HTMLDivElement | null>(null);
  const [chipSlotEl, setChipSlotEl] = useState<HTMLDivElement | null>(null);
  const [dragMetrics, setDragMetrics] = useState({ stackCx: 0, stackCy: 0, targetCx: 0, targetCy: 0 });

  useEffect(() => {
    if (!phase3El || !rightColEl || !chipSlotEl) return;
    function measure() {
      if (!phase3El || !rightColEl || !chipSlotEl) return;
      const p3 = phase3El.getBoundingClientRect();
      const rc = rightColEl.getBoundingClientRect();
      const slot = chipSlotEl.getBoundingClientRect();
      setDragMetrics({
        stackCx: rc.left + rc.width / 2 - p3.left,
        stackCy: rc.top + 58 - p3.top,
        targetCx: slot.left + 36 - p3.left,
        targetCy: slot.top + slot.height / 2 - p3.top,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [phase3El, rightColEl, chipSlotEl]);

  const dragDx = dragMetrics.targetCx - dragMetrics.stackCx;
  const dragDy = dragMetrics.targetCy - dragMetrics.stackCy;

  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  // Refs so handleSkip can clear pending timers/intervals from outside the effect
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const handleSkip = useCallback(() => {
    setRevealed(prev => {
      if (prev) return prev;
      timersRef.current.forEach(clearTimeout);
      intervalsRef.current.forEach(clearInterval);
      timersRef.current = [];
      intervalsRef.current = [];
      markIntroPlayed();
      onRevealRef.current?.();
      return true;
    });
  }, []);

  // Escape-to-skip
  useEffect(() => {
    if (revealed || skipIntro) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleSkip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, skipIntro, handleSkip]);

  // Auto-skip for users who prefer reduced motion
  useEffect(() => {
    if (typeof window === "undefined" || skipIntro) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) handleSkip();
  }, [skipIntro, handleSkip]);

  useEffect(() => {
    if (skipIntro) {
      setPhase("idle");
      setRevealed(true);
      setIntroExited(true);
      markIntroPlayed();
      onRevealRef.current?.();
      return;
    }

    const timers = timersRef.current;
    const intervals = intervalsRef.current;
    const at = (ms: number, fn: () => void) => { timers.push(setTimeout(fn, ms)); };

    // Phase 1 — intro text
    at(T.introIn, () => setPhase("intro"));

    // Phase 2 — anim1 (vertical stack builds up)
    at(T.anim1In, () => setPhase("anim1"));
    const STACK_LENGTH = TOOLS.length + 1; // 7 tools + "and many more"
    for (let i = 0; i < STACK_LENGTH; i++) {
      at(T.stackStart + i * T.stackStep, () => setStackIdx(i));
    }

    // Phase 3 — anim2 (document stack → cursor drag → typing → execution stack)
    at(T.anim2In, () => setPhase("anim2"));

    // Counter rise: 0 → 9999 with ease-out cubic
    at(T.counterStart, () => {
      const startTs = Date.now();
      const id = setInterval(() => {
        const elapsed = Date.now() - startTs;
        const t = Math.min(elapsed / T.counterDuration, 1);
        const eased = 1 - Math.pow(1 - t, 3);  // ease-out cubic — fast then settle
        setDocCount(Math.floor(eased * 9999));
        if (t >= 1) clearInterval(id);
      }, 24);
      intervals.push(id);
    });
    at(T.counterMaxedAt, () => setDocCountMaxed(true));

    // Cursor + drag choreography
    at(T.cursorAppearAt, () => setDragStep("ready"));
    at(T.grabAt, () => setDragStep("grabbing"));
    at(T.dragStartAt, () => setDragStep("dragging"));
    at(T.dropAt, () => setDragStep("attached"));

    // Typing
    at(T.queryTypeStart, () => {
      let i = 0;
      const id = setInterval(() => {
        i += 1;
        setQueryChars(i);
        if (i >= QUERY.length) clearInterval(id);
      }, T.queryCharMs);
      intervals.push(id);
    });

    // Execution sequence
    at(T.shiftAt, () => setExecuting(true));
    EXECS.forEach((exec, seqI) => {
      const startAt = T.execStart + seqI * T.execGap;
      at(startAt, () => {
        setActiveExec(exec.toolIdx);
        setExecuted(prev => {
          const next = new Set(prev);
          next.add(exec.toolIdx);
          return next;
        });
      });
      at(startAt + T.execHold, () => {
        setActiveExec(prev => (prev === exec.toolIdx ? -1 : prev));
      });
    });

    // Finale — anim2 dissolves into a big centered closer line
    at(T.finaleIn, () => setPhase("finale"));

    // Reveal — overlay dissolves into the hero page after the finale holds
    at(T.reveal, () => {
      setRevealed(true);
      markIntroPlayed();
      onRevealRef.current?.();
    });

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [skipIntro]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%)",
        userSelect: "none",
        WebkitUserSelect: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        .cd-cta-arrow {
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cd-btn-cta:hover .cd-cta-arrow {
          transform: translateX(3px);
        }
        @keyframes clipReveal {
          from { clip-path: inset(0 100% 0 0); opacity: 0; }
          to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }
      `}</style>

      {/* ── Decorative SVG layer ── */}
      {deco && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.4,
          }}
        >
          {deco}
        </div>
      )}

      {/* ── Ruler lines ── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 80, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, backgroundColor: BORDER }} />
      </div>
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

      {/* ══════════════════════════════════════════════
          BASE LAYER — Final hero (fades in on reveal)
          ══════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(104px, 10vh, 120px) clamp(24px, 4vw, 48px) clamp(40px, 5vh, 64px)",
          zIndex: 1,
          pointerEvents: revealed ? "auto" : "none",
        }}
      >
        {/* ── Dream-seller heading — fades in first, above Delta and the mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0, ease: EASE_OUT }}
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "clamp(40px, 5vw, 64px)",
            maxWidth: 880,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: "clamp(20px, 2.2vw, 32px)",
              fontWeight: 600,
              color: ACCENT,
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
              display: "block",
            }}
          >
            Less time organizing data. More time winning cases.{" "}
            <span className="lg:block">For your whole firm.</span>
          </span>
        </motion.div>

        {/* ── Hero body (grid) — fades in after the dream-seller heading ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: EASE_OUT }}
        >
        <div className="grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-8 lg:gap-12 items-center">
          {/* ── Left column: H1 + CTA + social proof ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {/* ── H1: Delta + tagline ── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, delay: 1.1, ease: EASE_OUT }}
              style={{ textAlign: "left" }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(56px, 6vw, 84px)",
                  fontWeight: 700,
                  color: DELTA_BLUE,
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  display: "block",
                  marginLeft: "-0.03em",
                }}
              >
                Delta
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: "clamp(16px, 1.3vw, 20px)",
                  fontWeight: 400,
                  color: SUBTITLE_BLUE,
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                  display: "block",
                  marginTop: 18,
                  maxWidth: 400,
                }}
              >
                {HERO_SUBTITLE}
              </span>
            </motion.div>

            {/* ── CTA ── */}
            <motion.a
              href="https://app.casedelta.com/signup"
              className="cd-btn-cta"
              initial={{ opacity: 0, y: 12 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 1.55, ease: EASE_OUT }}
              whileHover={{ y: -2, boxShadow: `0 10px 28px ${ACCENT}55, 0 4px 8px rgba(0,0,0,0.06)` }}
              whileTap={{ y: 0, scale: 0.97 }}
              style={{
                marginTop: 32,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                height: 52,
                padding: "0 30px",
                backgroundColor: ACCENT,
                color: "#FFFFFF",
                fontFamily: FONT,
                fontSize: 15,
                fontWeight: 600,
                borderRadius: 10,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: `0 6px 16px ${ACCENT}40, 0 2px 4px rgba(0,0,0,0.05)`,
              }}
            >
              Start free
              <svg className="cd-cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>

            {/* ── Credibility: star rating + pilot firm names ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.75, ease: EASE_OUT }}
              style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              {/* Star rating row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 2 }} aria-label="Rated 5.0 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} width="17" height="17" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden>
                      <path d="M12 2l2.93 6.5L22 9.55l-5.36 5L18 22l-6-3.6L6 22l1.36-7.45L2 9.55l7.07-1.05L12 2z" />
                    </svg>
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1A1A1A",
                    letterSpacing: "-0.01em",
                  }}
                >
                  5.0
                </span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 12,
                    fontWeight: 500,
                    color: TEXT_TERTIARY,
                    letterSpacing: "-0.005em",
                  }}
                >
                  · Attorney rating
                </span>
              </div>

              {/* Firm names — 2x2 grid keeps the columns visually aligned */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto",
                  columnGap: 28,
                  rowGap: 10,
                  alignItems: "baseline",
                }}
              >
                {[
                  "Whitfield & Hayes LLP",
                  "Drake Mercer Sullivan, P.C.",
                  "The Brennan Firm",
                  "Carter Lockwood Attorneys",
                ].map((firm) => (
                  <span
                    key={firm}
                    style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#475569",
                      letterSpacing: "-0.005em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {firm}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right column: app mockup (chat with Delta, morning briefing → chronology) ── */}
          <motion.div
            className="lg:max-h-none"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={
              revealed
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            transition={{ duration: 0.9, delay: 1.35, ease: EASE_OUT }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${BORDER}`,
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              {/* Mock window chrome */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 14px",
                  borderBottom: `1px solid ${BORDER}`,
                  backgroundColor: "#FAFAFA",
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#E5E5E5" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#E5E5E5" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#E5E5E5" }} />
                <div
                  style={{
                    marginLeft: 8,
                    flex: 1,
                    height: 24,
                    borderRadius: 6,
                    backgroundColor: "#F0F0F0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontFamily: FONT, fontSize: 11, color: "#AAAAAA", fontWeight: 400 }}>
                    app.casedelta.com
                  </span>
                </div>
              </div>

              {/* App content area */}
              <div
                className="lg:aspect-[4/3]"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#FFFFFF",
                  overflow: "hidden",
                  fontFamily: FONT,
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                {/* Top bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img src="/assets/branding/delta-icon-light.svg" alt="Delta" style={{ width: 14, height: 14 }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A", letterSpacing: "-0.01em" }}>Delta</span>
                    <span style={{ fontSize: 11, color: "#999", marginLeft: 4 }}>Graves Law</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "#F5F5F5", borderRadius: 6, padding: "6px 14px", minWidth: 0, maxWidth: 220 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#AAA" strokeWidth="1.5" /><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    <span style={{ fontSize: 11, color: "#AAA" }}>Search</span>
                  </div>
                </div>

                {/* Chat messages */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 clamp(16px, 4vw, 32px) 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0" }}>
                    <div style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
                    <span style={{ fontSize: 10, fontWeight: 500, color: "#888", padding: "2px 10px", border: `1px solid ${BORDER}`, borderRadius: 12 }}>Today</span>
                    <div style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
                  </div>

                  {/* Delta morning briefing */}
                  <div style={{ display: "flex", gap: 12, padding: "8px 0" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: "#1A1A1A", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img src="/assets/branding/delta-icon-light.svg" alt="Delta" style={{ width: 20, height: 20 }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Delta</span>
                        <span style={{ fontSize: 11, color: "#999" }}>6:12 AM</span>
                      </div>
                      <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: 0 }}>
                        Reviewed Chen v. Mercy overnight. Cross-referenced the OR report in Drive against nursing logs in Clio. Surgeon logged procedure start at 2:14 PM but anesthesia wasn&apos;t administered until 2:47 PM. 33-minute undocumented gap. Dr. Patel&apos;s expert report doesn&apos;t address it.
                      </p>
                    </div>
                  </div>

                  {/* Attorney request */}
                  <div style={{ display: "flex", gap: 12, padding: "8px 0" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: `${ACCENT}15`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>KG</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Kate Graves</span>
                        <span style={{ fontSize: 11, color: "#999" }}>8:34 AM</span>
                      </div>
                      <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: 0 }}>
                        Build me a surgical chronology, draft the demand at 3x specials, and email it to opposing counsel.
                      </p>
                    </div>
                  </div>

                  {/* Delta response with PDF artifact */}
                  <div style={{ display: "flex", gap: 12, padding: "8px 0" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: "#1A1A1A", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img src="/assets/branding/delta-icon-light.svg" alt="Delta" style={{ width: 20, height: 20 }} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Delta</span>
                        <span style={{ fontSize: 11, color: "#999" }}>8:35 AM</span>
                      </div>
                      <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: "0 0 8px" }}>
                        Chronology built. Demand drafted in Word. Sent from your inbox to opposing counsel. Time logged in Clio.
                      </p>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1px solid ${BORDER}`, borderRadius: 8, backgroundColor: "#FAFAFA", maxWidth: "100%", overflow: "hidden" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#E74C3C" strokeWidth="1.5" strokeLinecap="round" /><polyline points="14 2 14 8 20 8" stroke="#E74C3C" strokeWidth="1.5" strokeLinecap="round" /><text x="8" y="17" fontSize="6" fill="#E74C3C" fontWeight="700" fontFamily="sans-serif">PDF</text></svg>
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Chen_v_Mercy_Demand_Letter.pdf</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message input */}
                <div style={{ padding: "0 clamp(16px, 4vw, 32px) 14px", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 12px 10px 16px" }}>
                    <span style={{ fontSize: 13, color: "#BBB", flex: 1 }}>Message Delta...</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          INTRO OVERLAY — Three-beat sequence
          ══════════════════════════════════════════════════ */}
      {!introExited && (
        <motion.div
          animate={revealed ? { opacity: 0, filter: "blur(6px)" } : { opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          onAnimationComplete={() => { if (revealed) setIntroExited(true); }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-start",
            zIndex: 2,
            pointerEvents: revealed ? "none" : "auto",
          }}
        >
          {/* Skip button — discrete, bottom-right */}
          <button
            type="button"
            onClick={handleSkip}
            aria-label="Skip intro"
            style={{
              position: "absolute",
              bottom: "clamp(20px, 3vh, 32px)",
              right: "clamp(20px, 3vw, 36px)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              backgroundColor: "rgba(255,255,255,0.7)",
              border: `1px solid ${BORDER}`,
              borderRadius: 999,
              fontFamily: FONT,
              fontSize: 12,
              fontWeight: 500,
              color: TEXT_TERTIARY,
              letterSpacing: "0.02em",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
              zIndex: 4,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1A1A1A";
              e.currentTarget.style.borderColor = "#CCCCCC";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = TEXT_TERTIARY;
              e.currentTarget.style.borderColor = BORDER;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Skip intro
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M5.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            style={{
              width: "100%",
              maxWidth: 1320,
              margin: "0 auto",
              padding: `${isMobile ? "clamp(80px, 12vh, 140px)" : "clamp(140px, 22vh, 280px)"} clamp(24px, 4vw, 48px) 0`,
            }}
          >
            <AnimatePresence mode="wait">
              {/* ── Phase 1: Intro text ── */}
              {phase === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left",
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: EASE_OUT }}
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(80px, 13vw, 180px)",
                      fontWeight: 700,
                      color: DELTA_BLUE,
                      lineHeight: 0.9,
                      letterSpacing: "-0.05em",
                      display: "block",
                      marginLeft: "-0.04em",
                    }}
                  >
                    Delta
                  </motion.span>
                  <div
                    style={{
                      minHeight: "clamp(60px, 9vw, 130px)",
                      marginTop: "clamp(12px, 1.5vw, 24px)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(36px, 5.5vw, 74px)",
                        fontWeight: 400,
                        color: SUBTITLE_BLUE,
                        lineHeight: 1.35,
                        letterSpacing: "-0.03em",
                        display: "block",
                        whiteSpace: "normal",
                        clipPath: "inset(0 100% 0 0)",
                        opacity: 0,
                        animation: "clipReveal 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.6s forwards",
                      }}
                    >
                      {INTRO_SUBTITLE}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* ── Phase 2: Anim1 — vertical stack of integrations builds up ── */}
              {phase === "anim1" && (
                <motion.div
                  key="anim1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Eyebrow caption — labels the integration list */}
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: "clamp(28px, 3vw, 40px)",
                      fontWeight: 400,
                      color: SUBTITLE_BLUE,
                      lineHeight: 1.35,
                      letterSpacing: "-0.03em",
                      marginBottom: "clamp(20px, 2vw, 28px)",
                      textAlign: "left",
                      display: "block",
                      clipPath: "inset(0 100% 0 0)",
                      opacity: 0,
                      animation: "clipReveal 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.1s forwards",
                    }}
                  >
                    That connects all your firm&rsquo;s tools together
                  </span>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, max-content)",
                      gap: "14px 18px",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                  {[...TOOLS, STACK_EXTRA].map((item, i) => {
                    const isExtra = i === TOOLS.length;
                    const visible = stackIdx >= i;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 18, scale: 0.94 }}
                        animate={visible
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0, y: 18, scale: 0.94 }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: isMobile ? 16 : 0,
                          whiteSpace: "nowrap",
                          width: "100%",
                          boxSizing: "border-box",
                          ...(isMobile ? {
                            // Compact row — no card chrome, just icon + name
                            padding: "8px 0",
                            height: "auto",
                          } : {
                            maxWidth: 420,
                            height: 68,
                            padding: "0 28px",
                            backgroundColor: "rgba(255,255,255,0.65)",
                            border: "1px solid #ECEEF2",
                            borderRadius: 14,
                            boxShadow: "0 1px 2px rgba(15,23,42,0.03), 0 4px 12px rgba(15,23,42,0.03)",
                          }),
                        }}
                      >
                        {/* Logo column — fixed width so the name text starts at the same x across all rows */}
                        <div
                          style={{
                            width: isMobile ? 104 : 108,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexShrink: 0,
                          }}
                        >
                          {!isExtra ? (
                            <img
                              src={(item as Tool).src}
                              alt=""
                              aria-hidden
                              style={{
                                height: (item as Tool).hStack,
                                width: "auto",
                                display: "block",
                              }}
                            />
                          ) : (
                            MoreIconSvg
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: FONT,
                            fontSize: isMobile ? 15 : 18,
                            fontWeight: 500,
                            color: "#1A1A1A",
                            letterSpacing: "-0.01em",
                            lineHeight: 1,
                          }}
                        >
                          {item.name}
                        </span>
                      </motion.div>
                    );
                  })}
                  </div>
                </motion.div>
              )}

              {/* ── Phase 3: Anim2 — document stack → cursor drag → typing → execution stack ── */}
              {phase === "anim2" && (
                <motion.div
                  key="anim2"
                  ref={setPhase3El}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  style={{ position: "relative", width: "100%", maxWidth: 1180 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-x-12 gap-y-10 items-start">
                    {/* ── Left: eyebrow + query box (with attachment chip + typing) ── */}
                    <div>
                      <span
                        style={{
                          fontFamily: FONT,
                          fontSize: "clamp(28px, 3vw, 40px)",
                          fontWeight: 400,
                          color: SUBTITLE_BLUE,
                          lineHeight: 1.35,
                          letterSpacing: "-0.03em",
                          display: "block",
                          textAlign: "left",
                          marginBottom: "clamp(20px, 2vw, 28px)",
                          clipPath: "inset(0 100% 0 0)",
                          opacity: 0,
                          animation: "clipReveal 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.1s forwards",
                        }}
                      >
                        Just type or speak to manage your workflow
                      </span>
                      <div
                        style={{
                          width: "100%",
                          maxWidth: 600,
                          backgroundColor: "#FFFFFF",
                          border: `1px solid ${BORDER}`,
                          borderRadius: 16,
                          boxShadow: "0 8px 28px rgba(15,23,42,0.08)",
                          padding: "24px 28px",
                          textAlign: "left",
                          fontFamily: FONT,
                          minHeight: 260,
                          boxSizing: "border-box",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 14,
                            fontSize: 12,
                            fontWeight: 500,
                            color: TEXT_TERTIARY,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          <div
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 6,
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
                              style={{ width: 13, height: 13 }}
                            />
                          </div>
                          Message Delta
                        </div>

                        {/* Attachment chip slot — always-present fixed-height container so the box never expands */}
                        <div
                          ref={setChipSlotEl}
                          style={{
                            height: 50,
                            marginBottom: 14,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <AnimatePresence>
                            {dragStep === "attached" && (
                              <motion.div
                                key="chip"
                                initial={{ opacity: 0, scale: 0.85, y: -2 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: EASE_OUT }}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 10,
                                  padding: "8px 12px 8px 8px",
                                  backgroundColor: `${ACCENT}0D`,
                                  border: `1px solid ${ACCENT}33`,
                                  borderRadius: 10,
                                  maxWidth: "100%",
                                }}
                              >
                                <div style={{
                                  position: "relative",
                                  width: 28,
                                  height: 32,
                                  flexShrink: 0,
                                }}>
                                  <div style={{
                                    position: "absolute", left: 4, top: 4,
                                    width: 22, height: 26,
                                    backgroundColor: "#F4F4F5",
                                    border: `1px solid ${BORDER}`,
                                    borderRadius: 3,
                                  }} />
                                  <div style={{
                                    position: "absolute", left: 0, top: 0,
                                    width: 22, height: 26,
                                    backgroundColor: "#FFFFFF",
                                    border: `1px solid ${BORDER}`,
                                    borderRadius: 3,
                                    padding: "4px 3px",
                                  }}>
                                    <div style={{ height: 1.5, backgroundColor: "#1A1A1A", opacity: 0.8, borderRadius: 1, marginBottom: 1.5, width: "65%" }} />
                                    <div style={{ height: 1, backgroundColor: "#D4D4D8", borderRadius: 1, marginBottom: 1.5 }} />
                                    <div style={{ height: 1, backgroundColor: "#D4D4D8", borderRadius: 1, marginBottom: 1.5, width: "80%" }} />
                                    <div style={{ height: 1, backgroundColor: "#D4D4D8", borderRadius: 1 }} />
                                  </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                                  <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
                                    10,000+ documents
                                  </span>
                                  <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 500, color: TEXT_TERTIARY, letterSpacing: "-0.005em" }}>
                                    Discovery · Chen v. Mercy
                                  </span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div
                          style={{
                            fontSize: 17,
                            lineHeight: 1.55,
                            color: "#1A1A1A",
                            minHeight: 110,
                          }}
                        >
                          <span style={{ whiteSpace: "pre-wrap" }}>{QUERY.slice(0, queryChars)}</span>
                          {queryChars < QUERY.length && queryChars > 0 && (
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
                    </div>

                    {/* ── Right: document stack (desktop also has exec cards) ── */}
                    <div ref={setRightColEl} style={{ position: "relative", minHeight: isMobile ? 160 : 320 }}>
                      {/* Document stack with counter — visible until executing flips on */}
                      <motion.div
                        key="docStack"
                        initial={{ opacity: 0, scale: 0.94, y: 16 }}
                        animate={
                          executing
                            ? { opacity: 0, scale: 0.6, x: dragDx, y: dragDy }
                          : dragStep === "dragging" || dragStep === "attached"
                            ? { x: dragDx, y: dragDy, scale: 0.4, opacity: dragStep === "attached" ? 0 : 0.95 }
                          : dragStep === "grabbing"
                            ? { x: 0, y: 0, scale: 0.95, opacity: 1 }
                          :   { x: 0, y: 0, scale: 1, opacity: 1 }
                        }
                        transition={{
                          duration: dragStep === "dragging" || dragStep === "attached" ? 0.95 : 0.55,
                          ease: EASE_OUT,
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 18,
                          transformOrigin: "center center",
                          willChange: "transform, opacity",
                        }}
                      >
                        <DocumentStack glow={dragStep === "grabbing"} />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <span
                            style={{
                              fontFamily: FONT,
                              fontSize: 36,
                              fontWeight: 700,
                              color: "#1A1A1A",
                              letterSpacing: "-0.02em",
                              fontVariantNumeric: "tabular-nums",
                              lineHeight: 1,
                            }}
                          >
                            {docCountMaxed ? "10,000+" : docCount.toLocaleString()}
                          </span>
                          <span
                            style={{
                              fontFamily: FONT,
                              fontSize: 11,
                              fontWeight: 500,
                              color: TEXT_TERTIARY,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                            }}
                          >
                            Discovery documents
                          </span>
                        </div>
                      </motion.div>

                      {/* Exec cards stack — appears in right col area; on mobile this stacks below the chat box */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={executing ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        transition={{ duration: 0.7, ease: EASE_OUT, delay: executing ? 0.15 : 0 }}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: isMobile ? 2 : 12,
                          pointerEvents: executing ? "auto" : "none",
                        }}
                      >
                        {EXECS.map(({ toolIdx, label }) => {
                          const tool = TOOLS[toolIdx];
                          const isActive = activeExec === toolIdx;
                          const isDone = executed.has(toolIdx);
                          return (
                            <div
                              key={toolIdx}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: isMobile ? 12 : 16,
                                width: "100%",
                                boxSizing: "border-box",
                                ...(isMobile ? {
                                  padding: "2px 0",
                                } : {
                                  padding: "12px 18px",
                                  backgroundColor: "rgba(255,255,255,0.65)",
                                  border: "1px solid #ECEEF2",
                                  borderRadius: 14,
                                  boxShadow: "0 1px 2px rgba(15,23,42,0.03), 0 4px 12px rgba(15,23,42,0.03)",
                                  maxWidth: 380,
                                }),
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: isMobile ? 28 : 56,
                                  height: isMobile ? 28 : 36,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <motion.img
                                  src={tool.src}
                                  alt={tool.name}
                                  animate={{ scale: isActive ? (isMobile ? 1.12 : 1.15) : 1 }}
                                  transition={{ duration: 0.32, ease: EASE_OUT }}
                                  style={{
                                    height: isMobile ? Math.min(tool.hExec - 28, 22) : tool.hStack,
                                    width: "auto",
                                    maxWidth: isMobile ? 32 : 52,
                                    display: "block",
                                    objectFit: "contain",
                                    filter: isActive
                                      ? `drop-shadow(0 0 14px ${ACCENT}99) drop-shadow(0 4px 10px ${ACCENT}55)`
                                      : isDone
                                        ? `drop-shadow(0 0 8px ${SUCCESS_GREEN}55)`
                                        : "drop-shadow(0 1px 3px rgba(15,23,42,0.10))",
                                    transition: "filter 0.4s ease",
                                  }}
                                />
                                <AnimatePresence>
                                  {isDone && (
                                    <motion.div
                                      key="check"
                                      initial={{ opacity: 0, scale: 0.4 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.4 }}
                                      transition={{ duration: 0.35, ease: EASE_OUT }}
                                      style={{
                                        position: "absolute",
                                        top: isMobile ? -4 : -5,
                                        right: isMobile ? -4 : -5,
                                        width: isMobile ? 18 : 18,
                                        height: isMobile ? 18 : 18,
                                        borderRadius: "50%",
                                        backgroundColor: SUCCESS_GREEN,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: isMobile ? "none" : `0 2px 6px ${SUCCESS_GREEN}55`,
                                        border: "2px solid #FFFFFF",
                                      }}
                                    >
                                      <svg width={isMobile ? 9 : 10} height={isMobile ? 9 : 10} viewBox="0 0 24 24" fill="none">
                                        <path
                                          d="M5 12l5 5 9-11"
                                          stroke="white"
                                          strokeWidth={isMobile ? 3.5 : 3.5}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                              {isMobile ? (
                                <div style={{ display: "flex", alignItems: "baseline", gap: 8, minWidth: 0, flex: 1 }}>
                                  <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
                                    {tool.name}
                                  </span>
                                  <AnimatePresence>
                                    {isDone && (
                                      <motion.span
                                        key="label"
                                        initial={{ opacity: 0, x: -4 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.32, ease: EASE_OUT }}
                                        style={{
                                          fontFamily: FONT,
                                          fontSize: 13,
                                          fontWeight: 600,
                                          color: SUCCESS_GREEN,
                                          letterSpacing: "-0.01em",
                                        }}
                                      >
                                        {label}
                                      </motion.span>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                                  <span
                                    style={{
                                      fontFamily: FONT,
                                      fontSize: 12,
                                      fontWeight: 500,
                                      color: TEXT_TERTIARY,
                                      letterSpacing: "-0.01em",
                                    }}
                                  >
                                    {tool.name}
                                  </span>
                                  <div style={{ height: 22, display: "flex", alignItems: "center" }}>
                                    <AnimatePresence>
                                      {isDone && (
                                        <motion.span
                                          key="label"
                                          initial={{ opacity: 0, y: 4 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: 4 }}
                                          transition={{ duration: 0.35, ease: EASE_OUT }}
                                          style={{
                                            fontFamily: FONT,
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: SUCCESS_GREEN,
                                            letterSpacing: "-0.01em",
                                          }}
                                        >
                                          {label}
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </motion.div>
                    </div>
                  </div>

                  {/* ── Cursor overlay (absolute over Phase 3 outer, positions measured at runtime) ── */}
                  <motion.div
                    initial={{ x: dragMetrics.stackCx + 50, y: dragMetrics.stackCy - 50, opacity: 0 }}
                    animate={
                      dragStep === "ready"     ? { x: dragMetrics.stackCx + 30, y: dragMetrics.stackCy - 32, opacity: 1 }
                    : dragStep === "grabbing"  ? { x: dragMetrics.stackCx - 4,  y: dragMetrics.stackCy - 6,  opacity: 1 }
                    : dragStep === "dragging"  ? { x: dragMetrics.targetCx - 4, y: dragMetrics.targetCy - 6, opacity: 1 }
                    : dragStep === "attached"  ? { x: dragMetrics.targetCx - 4, y: dragMetrics.targetCy - 6, opacity: 0 }
                    :                            { x: dragMetrics.stackCx + 50, y: dragMetrics.stackCy - 50, opacity: 0 }
                    }
                    transition={{
                      duration: dragStep === "dragging" || dragStep === "attached" ? 0.95 : 0.55,
                      ease: EASE_OUT,
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 5,
                      pointerEvents: "none",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                    }}
                  >
                    {CursorSvg}
                  </motion.div>
                </motion.div>
              )}

              {/* ── Phase 4: Finale — three subheader lines clip-reveal left-to-right, then hand off ── */}
              {phase === "finale" && (
                <motion.div
                  key="finale"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left",
                  }}
                >
                  {[
                    "So you spend less time organizing data",
                    "More time winning cases",
                    "For your whole firm.",
                  ].map((line, i) => (
                    <span
                      key={line}
                      style={{
                        fontFamily: FONT,
                        fontSize: "clamp(36px, 5.5vw, 74px)",
                        fontWeight: 400,
                        color: SUBTITLE_BLUE,
                        lineHeight: 1.35,
                        letterSpacing: "-0.03em",
                        display: "block",
                        clipPath: "inset(0 100% 0 0)",
                        opacity: 0,
                        animation: `clipReveal 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) ${0.1 + i * 1.4}s forwards`,
                      }}
                    >
                      {line}
                    </span>
                  ))}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 5.5L8 10.5L13 5.5"
              stroke={TEXT_TERTIARY}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
