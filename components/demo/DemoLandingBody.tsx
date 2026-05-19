"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { newEventId, trackMetaCompleteRegistration } from "@/lib/meta-pixel";

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const ACCENT = "#2563EB";
const ACCENT_DEEP = "#1D4ED8";
const BORDER = "#EDEDED";
const INK = "#0A0A0A";
const INK_MUTED = "#5A5A5A";
const INK_SOFT = "#333333";
const SURFACE = "#FFFFFF";
const SURFACE_TINT = "#F7F8FA";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BOOKING_URL = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || "";
const LINKEDIN_DEMO_BOOKED_ID = process.env.NEXT_PUBLIC_LINKEDIN_DEMO_BOOKED_CONVERSION_ID;
const LINKEDIN_DEMO_STARTED_ID = process.env.NEXT_PUBLIC_LINKEDIN_DEMO_STARTED_CONVERSION_ID;

type PostHogLike = { capture: (event: string, props?: Record<string, unknown>) => void };
declare global {
  interface Window {
    posthog?: PostHogLike;
  }
}

function fireConversion(id: string | undefined, eventName: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (id && typeof window.lintrk === "function") {
    const numericId = Number(id);
    if (!Number.isNaN(numericId)) {
      window.lintrk("track", { conversion_id: numericId });
    }
  }
  capturePosthog(eventName, props);
}

// PostHog loads via dynamic import + setTimeout chain in PostHogProvider, so
// window.posthog can be undefined when an on-mount effect fires. Retry briefly
// instead of dropping the event. ~3s total wait is well within the lazy-load
// window we observe in production (typically <1s).
function capturePosthog(eventName: string, props?: Record<string, unknown>, attempt = 0) {
  if (typeof window === "undefined") return;
  if (window.posthog) {
    window.posthog.capture(eventName, props);
    return;
  }
  if (attempt >= 30) return;
  setTimeout(() => capturePosthog(eventName, props, attempt + 1), 100);
}

interface DemoLandingBodyProps {
  conversionSource?: string;
}

export function DemoLandingBody({ conversionSource = "lp_demo" }: DemoLandingBodyProps) {
  const reduced = !!useReducedMotion();
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    fireConversion(LINKEDIN_DEMO_STARTED_ID, "demo_page_viewed", { source: conversionSource });
  }, [conversionSource]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setStickyVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBookClick = (placement: string) => {
    const eventId = newEventId();
    fireConversion(LINKEDIN_DEMO_BOOKED_ID, "demo_booked", { source: conversionSource, placement });
    trackMetaCompleteRegistration(
      { content_name: "demo_booking", content_category: conversionSource },
      { eventID: eventId },
    );
    if (BOOKING_URL) {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <HeroSection reduced={reduced} onBookClick={() => handleBookClick("hero")} />
      <IntegrationLogos />
      <PainEnumeration reduced={reduced} />
      <ThesisExplainer reduced={reduced} />
      <TrustPricingBlock />
      <FaqAccordion />
      <FinalCtaBlock onBookClick={() => handleBookClick("footer")} />
      <StickyMobileCta visible={stickyVisible} onBookClick={() => handleBookClick("sticky_mobile")} />
    </>
  );
}

function CtaButton({
  label,
  onClick,
  size = "md",
  fullWidth = false,
}: {
  label: string;
  onClick: () => void;
  size?: "md" | "lg";
  fullWidth?: boolean;
}) {
  const dims = size === "lg"
    ? { height: 56, fontSize: 16, padX: 28 }
    : { height: 48, fontSize: 15, padX: 24 };
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: dims.height,
        padding: `0 ${dims.padX}px`,
        width: fullWidth ? "100%" : "auto",
        fontFamily: FONT,
        fontSize: dims.fontSize,
        fontWeight: 600,
        color: "#FFFFFF",
        backgroundColor: ACCENT,
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        letterSpacing: "-0.01em",
        boxShadow: `0 1px 3px ${ACCENT}25`,
        transition: "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = ACCENT_DEEP;
        e.currentTarget.style.boxShadow = `0 4px 14px ${ACCENT}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = ACCENT;
        e.currentTarget.style.boxShadow = `0 1px 3px ${ACCENT}25`;
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "translateY(1px)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
}

function ReassuranceLine({ align = "left" }: { align?: "left" | "center" }) {
  return (
    <p style={{
      fontFamily: FONT,
      fontSize: 13,
      color: INK_MUTED,
      margin: 0,
      marginTop: 14,
      letterSpacing: "-0.005em",
      textAlign: align,
    }}>
      20 minutes. Real case. No deck. No sales pitch.
    </p>
  );
}

function SectionShell({
  children,
  background = SURFACE,
  padY = "clamp(64px, 8vw, 112px)",
  maxWidth = 1180,
}: {
  children: React.ReactNode;
  background?: string;
  padY?: string;
  maxWidth?: number;
}) {
  return (
    <section style={{ backgroundColor: background, padding: `${padY} 0` }}>
      <div style={{ maxWidth, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
        {children}
      </div>
    </section>
  );
}

function HeroSection({ reduced, onBookClick }: { reduced: boolean; onBookClick: () => void }) {
  return (
    <section style={{
      backgroundColor: SURFACE,
      padding: "clamp(64px, 9vw, 120px) 0 clamp(48px, 6vw, 80px)",
    }}>
      <div style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "0 clamp(24px, 4vw, 48px)",
        textAlign: "center",
      }}>
        <motion.h1
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          style={{
            fontFamily: FONT,
            fontSize: "clamp(36px, 5.4vw, 64px)",
            fontWeight: 700,
            color: INK,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            margin: 0,
            marginBottom: 22,
          }}
        >
          Run every tool in your firm{" "}
          <span style={{ color: ACCENT }}>from one chat.</span>
        </motion.h1>

        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontFamily: FONT,
            fontSize: "clamp(17px, 1.5vw, 20px)",
            fontWeight: 400,
            color: INK_MUTED,
            lineHeight: 1.55,
            letterSpacing: "-0.01em",
            margin: 0,
            marginBottom: 36,
            maxWidth: 640,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Delta connects Clio, Word, Gmail, Drive, and the rest. See it run on a real case in 20 minutes.
        </motion.p>

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          <CtaButton label="Pick a time" onClick={onBookClick} size="lg" />
          <ReassuranceLine align="center" />
        </motion.div>
      </div>
    </section>
  );
}

function IntegrationLogos() {
  const tools: Array<{ name: string; src: string; height: number }> = [
    { name: "Outlook",    src: "/assets/integrations/outlook.svg",     height: 26 },
    { name: "Gmail",      src: "/assets/integrations/gmail.svg",       height: 24 },
    { name: "Salesforce", src: "/assets/integrations/salesforce.svg",  height: 22 },
    { name: "Clio",       src: "/assets/integrations/clio.svg",        height: 18 },
    { name: "Litify",     src: "/assets/integrations/litify.svg",      height: 28 },
    { name: "MyCase",     src: "/assets/integrations/mycase.webp",     height: 22 },
    { name: "QuickBooks", src: "/assets/integrations/quickbooks.svg",  height: 22 },
    { name: "DocuSign",   src: "/assets/integrations/docusign.svg",    height: 14 },
    { name: "Westlaw",    src: "/assets/integrations/westlaw.svg",     height: 24 },
  ];
  return (
    <section style={{
      backgroundColor: SURFACE,
      padding: "clamp(24px, 4vw, 48px) 0 clamp(48px, 6vw, 80px)",
      borderBottom: `1px solid ${BORDER}`,
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
        <p style={{
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 600,
          color: INK,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          textAlign: "center",
          margin: 0,
          marginBottom: 24,
        }}>
          Plugs into the tools your firm already runs.
        </p>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "clamp(10px, 1.4vw, 16px)",
          rowGap: 12,
        }}>
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                padding: "10px 16px",
                boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                minHeight: 44,
              }}
            >
              <img
                src={t.src}
                alt=""
                aria-hidden
                style={{ height: t.height, width: "auto", display: "block" }}
              />
              <span style={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 500,
                color: INK_SOFT,
                letterSpacing: "-0.005em",
                whiteSpace: "nowrap",
              }}>
                {t.name}
              </span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: tools.length * 0.04, ease: EASE }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              padding: "10px 16px",
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
              minHeight: 44,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3"  y="3"  width="7" height="7" rx="2" fill="#94A3B8" />
              <rect x="14" y="3"  width="7" height="7" rx="2" fill="#94A3B8" />
              <rect x="3"  y="14" width="7" height="7" rx="2" fill="#94A3B8" />
              <rect x="14" y="14" width="7" height="7" rx="2" fill={ACCENT} />
            </svg>
            <span style={{
              fontFamily: FONT,
              fontSize: 13,
              fontWeight: 500,
              color: INK_SOFT,
              letterSpacing: "-0.005em",
              whiteSpace: "nowrap",
            }}>
              and many more
            </span>
          </motion.div>
        </div>
        <p style={{
          fontFamily: FONT,
          fontSize: 12,
          color: INK_MUTED,
          textAlign: "center",
          margin: 0,
          marginTop: 18,
          letterSpacing: "-0.005em",
        }}>
          Not on the list? Tell us your stack on the call. Delta connects to most things over standard APIs.
        </p>
      </div>
    </section>
  );
}

function PainEnumeration({ reduced }: { reduced: boolean }) {
  const pains = [
    { pain: "Drowning in records.", fix: "Delta reads a 2,400-page production and surfaces what matters. Today." },
    { pain: "Endless discovery.", fix: "Delta drafts responses, builds the timeline, flags the gaps." },
    { pain: "Buried case facts.", fix: "Ask Delta one question. Get the answer with citations to the source page." },
    { pain: "Brief-prep marathons.", fix: "Delta pulls the record, builds the chronology, drafts the brief. You decide what ships." },
    { pain: "Manual case timelines.", fix: "Drop in the file. Get a chronology in minutes, not weekends." },
  ];
  return (
    <SectionShell background={SURFACE_TINT}>
      <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 64px)" }}>
        <p style={{
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 600,
          color: ACCENT,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: 0,
          marginBottom: 12,
        }}>
          Sound familiar?
        </p>
        <h2 style={{
          fontFamily: FONT,
          fontSize: "clamp(28px, 3.4vw, 40px)",
          fontWeight: 700,
          color: INK,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          margin: 0,
          maxWidth: 720,
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          The work that costs your partners their weekends.
        </h2>
      </div>

      <style>{`
        @media (min-width: 720px) {
          .cd-pain-row {
            grid-template-columns: minmax(180px, 240px) 1fr !important;
            gap: clamp(20px, 3vw, 40px) !important;
            align-items: baseline !important;
            padding: 22px 26px !important;
          }
        }
      `}</style>
      <ul style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        maxWidth: 880,
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        {pains.map((p, i) => (
          <motion.li
            key={p.pain}
            className="cd-pain-row"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
            style={{
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "18px 20px",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 6,
              alignItems: "start",
            }}
          >
            <span style={{
              fontFamily: FONT,
              fontSize: "clamp(15px, 1.3vw, 17px)",
              fontWeight: 600,
              color: INK,
              letterSpacing: "-0.015em",
              lineHeight: 1.35,
            }}>
              {p.pain}
            </span>
            <span style={{
              fontFamily: FONT,
              fontSize: "clamp(14px, 1.15vw, 16px)",
              fontWeight: 400,
              color: INK_SOFT,
              letterSpacing: "-0.005em",
              lineHeight: 1.5,
            }}>
              {p.fix}
            </span>
          </motion.li>
        ))}
      </ul>
    </SectionShell>
  );
}

function ThesisExplainer({ reduced }: { reduced: boolean }) {
  return (
    <SectionShell background={SURFACE}>
      <style>{`
        @media (min-width: 880px) {
          .cd-thesis-grid {
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr) !important;
            gap: clamp(48px, 6vw, 96px) !important;
            align-items: center !important;
          }
        }
      `}</style>
      <div
        className="cd-thesis-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 48,
        }}
      >
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p style={{
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 600,
            color: ACCENT,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: 0,
            marginBottom: 16,
          }}>
            The horizontal layer
          </p>
          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(28px, 3.4vw, 40px)",
            fontWeight: 700,
            color: INK,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 24,
          }}>
            The firm doesn&apos;t need another tool. It needs something that runs across all of them.
          </h2>
          <p style={{
            fontFamily: FONT,
            fontSize: "clamp(16px, 1.3vw, 18px)",
            color: INK_MUTED,
            lineHeight: 1.6,
            letterSpacing: "-0.005em",
            margin: 0,
            marginBottom: 18,
          }}>
            Delta isn&apos;t an AI that handles one slice of the work and leaves you bouncing between tabs. It&apos;s the way you talk to every tool your firm uses.
          </p>
          <p style={{
            fontFamily: FONT,
            fontSize: "clamp(17px, 1.4vw, 19px)",
            color: INK,
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: "-0.015em",
            margin: 0,
          }}>
            One sentence. Many tools. Done.
          </p>
        </motion.div>

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <ThesisDiagram />
        </motion.div>
      </div>
    </SectionShell>
  );
}

function ThesisDiagram() {
  const tools: Array<{ name: string; src: string; height: number }> = [
    { name: "Outlook",    src: "/assets/integrations/outlook.svg",    height: 24 },
    { name: "Gmail",      src: "/assets/integrations/gmail.svg",      height: 22 },
    { name: "Salesforce", src: "/assets/integrations/salesforce.svg", height: 22 },
    { name: "Clio",       src: "/assets/integrations/clio.svg",       height: 16 },
    { name: "Litify",     src: "/assets/integrations/litify.svg",     height: 26 },
    { name: "QuickBooks", src: "/assets/integrations/quickbooks.svg", height: 20 },
  ];
  const cells = tools.length + 1; // tools + "many more"

  return (
    <div style={{
      position: "relative",
      backgroundColor: SURFACE_TINT,
      borderRadius: 16,
      border: `1px solid ${BORDER}`,
      padding: "clamp(36px, 5vw, 56px) clamp(20px, 3vw, 36px) clamp(28px, 4vw, 40px)",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes cd-rail-pulse {
          0%, 100% { box-shadow: 0 6px 28px ${ACCENT}38, inset 0 1px 0 rgba(255,255,255,0.18); }
          50%      { box-shadow: 0 10px 36px ${ACCENT}55, inset 0 1px 0 rgba(255,255,255,0.22); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cd-rail { animation: none !important; }
        }
      `}</style>

      {/* Chat pill */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{
          backgroundColor: ACCENT,
          color: "#FFFFFF",
          borderRadius: 999,
          padding: "10px 18px",
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          boxShadow: `0 6px 24px ${ACCENT}40`,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          Ask Delta
        </div>
      </motion.div>

      {/* Vertical drop to rail */}
      <div aria-hidden style={{
        width: 1,
        height: 28,
        margin: "0 auto",
        background: `linear-gradient(180deg, ${ACCENT}00, ${ACCENT}80)`,
      }} />

      {/* Horizontal "Delta layer" rail */}
      <motion.div
        className="cd-rail"
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          position: "relative",
          height: 40,
          borderRadius: 10,
          background: `linear-gradient(90deg, ${ACCENT_DEEP} 0%, ${ACCENT} 50%, ${ACCENT_DEEP} 100%)`,
          boxShadow: `0 6px 28px ${ACCENT}38, inset 0 1px 0 rgba(255,255,255,0.18)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "cd-rail-pulse 3.2s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <span style={{
          fontFamily: FONT,
          fontSize: 11,
          fontWeight: 700,
          color: "rgba(255,255,255,0.95)",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
        }}>
          Delta · Horizontal layer
        </span>
      </motion.div>

      {/* Branched connectors from rail down to each tool column */}
      <div aria-hidden style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cells}, minmax(0, 1fr))`,
        height: 24,
      }}>
        {Array.from({ length: cells }).map((_, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 1,
              height: "100%",
              background: `linear-gradient(180deg, ${ACCENT}80, ${BORDER})`,
            }} />
          </div>
        ))}
      </div>

      {/* Tool tiles */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cells}, minmax(0, 1fr))`,
        gap: "clamp(6px, 1vw, 10px)",
      }}>
        {tools.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.06, ease: EASE }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "12px 6px 14px",
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 10,
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
              minHeight: 78,
            }}
          >
            <div style={{ height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={t.src}
                alt=""
                aria-hidden
                style={{ height: t.height, width: "auto", display: "block" }}
              />
            </div>
            <span style={{
              fontFamily: FONT,
              fontSize: 11,
              fontWeight: 500,
              color: INK_SOFT,
              letterSpacing: "-0.005em",
              whiteSpace: "nowrap",
            }}>
              {t.name}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.15 + tools.length * 0.06, ease: EASE }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "12px 6px 14px",
            backgroundColor: SURFACE,
            border: `1px dashed ${ACCENT}80`,
            borderRadius: 10,
            boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            minHeight: 78,
          }}
        >
          <div style={{ height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3"  y="3"  width="7" height="7" rx="2" fill="#94A3B8" />
              <rect x="14" y="3"  width="7" height="7" rx="2" fill="#94A3B8" />
              <rect x="3"  y="14" width="7" height="7" rx="2" fill="#94A3B8" />
              <rect x="14" y="14" width="7" height="7" rx="2" fill={ACCENT} />
            </svg>
          </div>
          <span style={{
            fontFamily: FONT,
            fontSize: 11,
            fontWeight: 500,
            color: INK_SOFT,
            letterSpacing: "-0.005em",
            whiteSpace: "nowrap",
          }}>
            + more
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function TrustPricingBlock() {
  const columns: Array<{ eyebrow: string; title: string; body: string }> = [
    {
      eyebrow: "Security",
      title: "Your data stays yours.",
      body: "Private deployment. Your data is never used to train models. Zero third parties. Every action is audit-logged for bar compliance.",
    },
    {
      eyebrow: "Pricing",
      title: "$349 per user, per month.",
      body: "Flat. No tiers. Includes every integration, the morning briefing, and white-glove onboarding.",
    },
    {
      eyebrow: "Built for",
      title: "Partners who carry the case.",
      body: "For the partners who own a matter end-to-end, across whatever stack the firm already runs.",
    },
  ];
  return (
    <SectionShell background={SURFACE_TINT}>
      <style>{`
        @media (min-width: 880px) {
          .cd-trust-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 24px !important;
          }
        }
      `}</style>
      <div
        className="cd-trust-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 20,
        }}
      >
        {columns.map((c) => (
          <div
            key={c.eyebrow}
            style={{
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 14,
              padding: "28px 28px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span style={{
              fontFamily: FONT,
              fontSize: 11,
              fontWeight: 600,
              color: ACCENT,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              {c.eyebrow}
            </span>
            <h3 style={{
              fontFamily: FONT,
              fontSize: 20,
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              margin: 0,
            }}>
              {c.title}
            </h3>
            <p style={{
              fontFamily: FONT,
              fontSize: 15,
              color: INK_MUTED,
              lineHeight: 1.55,
              letterSpacing: "-0.005em",
              margin: 0,
            }}>
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function FaqAccordion() {
  const items = [
    {
      q: "What happens to our case data?",
      a: "Your data stays in your environment. We deploy Delta into a private instance scoped to your firm. We never use your data to train models. Every action is audit-logged and exportable for bar compliance reviews.",
    },
    {
      q: "Will Delta hallucinate or invent facts?",
      a: "Delta cites primary sources for every claim. If it pulls a fact from a medical record, the citation links to that page. If it cannot find the source, it says so instead of guessing. The attorney reviews and approves every output before anything leaves the firm.",
    },
    {
      q: "Does Delta replace our case-management system?",
      a: "No. Delta runs on top of what you already use, whether that is Clio, MyCase, PracticePanther, or something else. You keep your system. Delta drives it.",
    },
    {
      q: "How does Delta handle privileged information?",
      a: "Privilege scopes are honored by design. Delta operates within the access controls your firm already has, never sends client data to any third-party LLM, and maintains an audit trail of every action it takes on a matter.",
    },
    {
      q: "How much is it, and what is included?",
      a: "$349 per user, per month, flat. Includes every integration, the morning briefing, document chronologies, drafting, and white-glove onboarding. No setup fees, no per-integration charges, no tier upgrades.",
    },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <SectionShell background={SURFACE}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(32px, 4vw, 48px)" }}>
          <p style={{
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 600,
            color: ACCENT,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: 0,
            marginBottom: 12,
          }}>
            Questions partners ask
          </p>
          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 700,
            color: INK,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            margin: 0,
          }}>
            The first five we hear.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.q}
                style={{
                  borderTop: idx === 0 ? `1px solid ${BORDER}` : "none",
                  borderBottom: `1px solid ${BORDER}`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    padding: "20px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    fontFamily: FONT,
                    fontSize: "clamp(15px, 1.25vw, 17px)",
                    fontWeight: 600,
                    color: INK,
                    letterSpacing: "-0.015em",
                    textAlign: "left",
                  }}
                >
                  <span>{item.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={INK_MUTED}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      flex: "0 0 auto",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.2s ease",
                    }}
                    aria-hidden
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                {isOpen && (
                  <div style={{
                    padding: "0 0 22px",
                    fontFamily: FONT,
                    fontSize: "clamp(14px, 1.15vw, 16px)",
                    color: INK_MUTED,
                    lineHeight: 1.6,
                    letterSpacing: "-0.005em",
                    maxWidth: 680,
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

function FinalCtaBlock({ onBookClick }: { onBookClick: () => void }) {
  return (
    <SectionShell background={SURFACE_TINT} padY="clamp(72px, 9vw, 120px)">
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: FONT,
          fontSize: "clamp(30px, 3.8vw, 44px)",
          fontWeight: 700,
          color: INK,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
          margin: 0,
          marginBottom: 18,
        }}>
          See it run on a real case.
        </h2>
        <p style={{
          fontFamily: FONT,
          fontSize: "clamp(16px, 1.35vw, 18px)",
          color: INK_MUTED,
          lineHeight: 1.55,
          letterSpacing: "-0.005em",
          margin: 0,
          marginBottom: 32,
        }}>
          Pick a time that works for you. We&apos;ll walk you through Delta on your actual stack.
        </p>
        <CtaButton label="Pick a time" onClick={onBookClick} size="lg" />
        <ReassuranceLine align="center" />
      </div>
    </SectionShell>
  );
}

function StickyMobileCta({ visible, onBookClick }: { visible: boolean; onBookClick: () => void }) {
  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .cd-sticky-cta {
            display: none !important;
          }
        }
      `}</style>
      <div
        className="cd-sticky-cta"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderTop: `1px solid ${BORDER}`,
          transform: visible ? "translateY(0)" : "translateY(110%)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.25s ease, opacity 0.25s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <CtaButton label="Pick a time" onClick={onBookClick} size="md" fullWidth />
      </div>
    </>
  );
}
