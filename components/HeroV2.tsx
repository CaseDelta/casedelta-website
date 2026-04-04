"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Design tokens ─── */
const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const ACCENT = "#2563EB";
const BORDER = "#EDEDED";
const TEXT_SECONDARY = "#555555";
const TEXT_TERTIARY = "#666666";

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/* ─── Subtitle sequence ─── */
const SUBTITLES = [
  "remembers how your firm works",
  "learns your judges and jurisdiction",
  "gets smarter every week",
];

/* ─── SSO icons ─── */
const GoogleIcon = (
  <svg width="16" height="16" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.07 24.07 0 0 0 0 21.56l7.98-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);
const MicrosoftIcon = (
  <svg width="14" height="14" viewBox="0 0 21 21">
    <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
    <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
    <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
  </svg>
);

/* ─── Timing ─── */
const ENTER_DURATION = 1.2;
const HOLD = 1000;
const T = { deltaAppear: 200, firstSub: 900, revealAfterFinal: 900 };

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Module-level flag: survives client-side nav, resets on hard refresh ─── */
let hasPlayedIntro = false;
function markIntroPlayed() { hasPlayedIntro = true; }
export function getHasPlayedIntro() { return hasPlayedIntro; }

/* ─── Component ─── */
interface HeroV2Props {
  onReveal?: () => void;
  deco?: React.ReactNode;
  skipIntro?: boolean;
}

export function HeroV2({ onReveal, deco, skipIntro = false }: HeroV2Props) {
  const [showDelta, setShowDelta] = useState(false);
  const [subtitleIndex, setSubtitleIndex] = useState(-1);
  const [revealed, setRevealed] = useState(false);
  const [introExited, setIntroExited] = useState(false);

  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;
  const holdTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (skipIntro) {
      setShowDelta(true);
      setRevealed(true);
      setIntroExited(true);
      markIntroPlayed();
      onRevealRef.current?.();
      return;
    }
    const t1 = setTimeout(() => setShowDelta(true), T.deltaAppear);
    const t2 = setTimeout(() => setSubtitleIndex(0), T.firstSub);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(holdTimer.current);
    };
  }, [skipIntro]);

  const onSubtitleAnimEnd = useCallback(() => {
    clearTimeout(holdTimer.current);
    if (subtitleIndex === SUBTITLES.length - 1) {
      holdTimer.current = setTimeout(() => {
        setRevealed(true);
        markIntroPlayed();
        onRevealRef.current?.();
      }, T.revealAfterFinal);
    } else {
      holdTimer.current = setTimeout(() => {
        setSubtitleIndex((i) => i + 1);
      }, HOLD);
    }
  }, [subtitleIndex]);

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
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: BORDER,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: BORDER,
          }}
        />
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
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: -16,
              width: 1,
              backgroundColor: BORDER,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: -16,
              width: 1,
              backgroundColor: BORDER,
            }}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BASE LAYER — Final layout (fades in on reveal)
          ══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(120px, 16vw, 140px) clamp(24px, 4vw, 48px) 0",
          zIndex: 1,
          pointerEvents: revealed ? "auto" : "none",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-8 lg:gap-8 items-center"
        >
          {/* ── Compact left column ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
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
                fontSize: "clamp(16px, 1.6vw, 22px)",
                fontWeight: 400,
                color: TEXT_SECONDARY,
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                display: "block",
                marginTop: "clamp(16px, 2vw, 24px)",
                maxWidth: 440,
              }}
            >
              Your associate attorney that reviews every detail and has a briefing ready before your morning coffee.
            </span>

            <motion.a
              href="https://app.casedelta.com/signup"
              className="cd-btn-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: FONT,
                marginTop: "clamp(28px, 3vw, 36px)",
                height: 44,
                padding: "0 20px",
                backgroundColor: "#FFFFFF",
                color: "#333333",
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 5,
                textDecoration: "none",
                letterSpacing: "-0.011em",
                border: `1px solid ${BORDER}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
              whileHover={{
                y: -2,
                borderColor: "#CCCCCC",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              }}
              whileTap={{
                y: 0,
                scale: 0.97,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "inline-flex" }}>{GoogleIcon}</span>
                <span style={{ display: "inline-flex" }}>{MicrosoftIcon}</span>
              </span>
              Sign up - Free $25 Credit
              <svg
                className="cd-cta-arrow"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.5 8H12.5M9 4.5L12.5 8L9 11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* ── Large video right column ── */}
          <motion.div
            className="lg:max-h-none"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={
              revealed
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
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
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#E5E5E5",
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#E5E5E5",
                  }}
                />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#E5E5E5",
                  }}
                />
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
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 11,
                      color: "#AAAAAA",
                      fontWeight: 400,
                    }}
                  >
                    app.casedelta.com
                  </span>
                </div>
              </div>

              {/* App content area — minimal chrome, big chat */}
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
                {/* Minimal top bar */}
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

                {/* Chat messages — pushed to bottom, large text */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 clamp(16px, 4vw, 32px) 12px" }}>
                  {/* Today divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0" }}>
                    <div style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
                    <span style={{ fontSize: 10, fontWeight: 500, color: "#888", padding: "2px 10px", border: `1px solid ${BORDER}`, borderRadius: 12 }}>Today</span>
                    <div style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
                  </div>

                  {/* Delta morning briefing */}
                  <motion.div
                    initial={skipIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    animate={revealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: skipIntro ? 0 : 0.6, delay: skipIntro ? 0 : 1.0, ease: EASE_OUT }}
                    style={{ display: "flex", gap: 12, padding: "8px 0" }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: "#1A1A1A", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img src="/assets/branding/delta-icon-light.svg" alt="Delta" style={{ width: 20, height: 20 }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Delta</span>
                        <span style={{ fontSize: 11, color: "#999" }}>6:12 AM</span>
                      </div>
                      <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: 0 }}>
                        Reviewed Chen v. Mercy overnight. Cross-referenced the OR report in Drive against nursing logs in Clio — the surgeon logged procedure start at 2:14 PM but anesthesia wasn&apos;t administered until 2:47 PM. 33-minute undocumented gap. Dr. Patel&apos;s expert report doesn&apos;t address it.
                      </p>
                    </div>
                  </motion.div>

                  {/* User asks for chronology + learning */}
                  <motion.div
                    initial={skipIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    animate={revealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: skipIntro ? 0 : 0.6, delay: skipIntro ? 0 : 2.4, ease: EASE_OUT }}
                    style={{ display: "flex", gap: 12, padding: "8px 0" }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: `${ACCENT}15`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>KG</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Kate Graves</span>
                        <span style={{ fontSize: 11, color: "#999" }}>8:34 AM</span>
                      </div>
                      <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: 0 }}>
                        Build me a surgical chronology. And flag timeline gaps like this on every med mal case going forward.
                      </p>
                    </div>
                  </motion.div>

                  {/* Delta response with artifact */}
                  <motion.div
                    initial={skipIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    animate={revealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: skipIntro ? 0 : 0.6, delay: skipIntro ? 0 : 3.8, ease: EASE_OUT }}
                    style={{ display: "flex", gap: 12, padding: "8px 0" }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: "#1A1A1A", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img src="/assets/branding/delta-icon-light.svg" alt="Delta" style={{ width: 20, height: 20 }} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Delta</span>
                        <span style={{ fontSize: 11, color: "#999" }}>8:35 AM</span>
                      </div>
                      <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: "0 0 8px" }}>
                        Chronology built. Flagging surgical timeline gaps on all med mal cases going forward.
                      </p>
                      {/* PDF artifact card */}
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1px solid ${BORDER}`, borderRadius: 8, backgroundColor: "#FAFAFA", maxWidth: "100%", overflow: "hidden" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#E74C3C" strokeWidth="1.5" strokeLinecap="round" /><polyline points="14 2 14 8 20 8" stroke="#E74C3C" strokeWidth="1.5" strokeLinecap="round" /><text x="8" y="17" fontSize="6" fill="#E74C3C" fontWeight="700" fontFamily="sans-serif">PDF</text></svg>
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Chen_v_Mercy_Surgical_Chronology.pdf</span>
                      </div>
                    </div>
                  </motion.div>
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

      {/* ══════════════════════════════════════════════════
          INTRO OVERLAY — Massive text (scales out on reveal)
          ══════════════════════════════════════════════════ */}
      {!introExited && (
        <motion.div
          animate={
            revealed
              ? { opacity: 0, filter: "blur(6px)" }
              : { opacity: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.5, ease: EASE_OUT }}
          onAnimationComplete={() => {
            if (revealed) setIntroExited(true);
          }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-start",
            zIndex: 2,
            pointerEvents: revealed ? "none" : "auto",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1320,
              margin: "0 auto",
              padding: "clamp(140px, 22vh, 280px) clamp(24px, 4vw, 48px) 0",
            }}
          >
            {/* "Delta" */}
            <motion.div
              initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
              animate={
                showDelta
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 36, filter: "blur(12px)" }
              }
              transition={{ duration: 1, ease: EASE_OUT }}
            >
              <span
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
              </span>
            </motion.div>

            {/* Cycling subtitle */}
            <div
              style={{
                minHeight: "clamp(60px, 9vw, 130px)",
                marginTop: "clamp(12px, 1.5vw, 24px)",
              }}
            >
              {subtitleIndex >= 0 && (
                <span
                  key={subtitleIndex}
                  onAnimationEnd={onSubtitleAnimEnd}
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(36px, 5.5vw, 74px)",
                    fontWeight: 400,
                    color: SUBTITLE_BLUE,
                    lineHeight: 1.35,
                    letterSpacing: "-0.03em",
                    display: "block",
                    whiteSpace: "normal",
                    animation: `clipReveal ${ENTER_DURATION}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
                  }}
                >
                  {SUBTITLES[subtitleIndex]}
                </span>
              )}
            </div>
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
