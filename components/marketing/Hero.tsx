"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/posthog";
import {
  CANVAS, CARD, INK, MUTED, FAINT, HAIRLINE, HAIRLINE_STRONG,
  ACCENT, ACCENT_DEEP, ACCENT_SOFT, SANS, SERIF, MAXW, PAGE_PAD,
} from "@/lib/theme";

const LOGOS = ["Clio", "MyCase", "Filevine", "Google Workspace", "Microsoft 365", "Dropbox"];

/* Deep-blue pill CTA, matches the harvey-light mockup */
function Pill({ href, children, location }: { href: string; children: React.ReactNode; location: string }) {
  return (
    <a
      href={href}
      onClick={() => trackEvent("cta_click", { location })}
      className="cd-pill"
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: ACCENT_DEEP, color: "#fff",
        borderRadius: 48, padding: "9px 9px 9px 22px",
        fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: "-0.2px",
        lineHeight: 1, textDecoration: "none", whiteSpace: "nowrap",
        transition: "background 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
      }}
    >
      {children}
      <span
        style={{
          width: 25, height: 25, borderRadius: "50%", background: "#fff",
          display: "grid", placeItems: "center",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ACCENT_DEEP} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}

/* Coded "Delta at work" preview panel — honest UI illustration, no external video asset */
function DeltaPanel() {
  const rows = [
    { state: "done", title: "Requested records from Mercy General", sub: "Sent + tracking. Follow-up scheduled." },
    { state: "run", title: "Drafting the status letter to the client", sub: "Ready for your review in a moment." },
    { state: "done", title: "Updated the matter in Clio and QuickBooks", sub: "File and billing now in sync." },
    { state: "todo", title: "Flagged: response deadline in 4 days", sub: "Nothing filed yet. Wants your eyes." },
  ];
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${HAIRLINE_STRONG}`,
        borderRadius: 18,
        boxShadow: "0 30px 70px -34px rgba(20,23,31,0.30), 0 2px 8px rgba(20,23,31,0.04)",
        overflow: "hidden",
      }}
    >
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "16px 18px", borderBottom: `1px solid ${HAIRLINE}` }}>
        <span style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(150deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`, display: "grid", placeItems: "center", flex: "0 0 auto" }}>
          <span style={{ fontFamily: SERIF, color: "#fff", fontSize: 16, lineHeight: 1, fontWeight: 500 }}>D</span>
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <b style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: INK, letterSpacing: "-0.2px" }}>Delta</b>
          <span style={{ fontFamily: SANS, fontSize: 11.5, color: FAINT, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
            Working your case
          </span>
        </div>
        <span style={{ marginLeft: "auto", fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase", color: ACCENT, background: ACCENT_SOFT, border: `1px solid rgba(47,111,224,0.22)`, borderRadius: 6, padding: "4px 8px" }}>
          You approve
        </span>
      </div>
      {/* task rows */}
      <div style={{ padding: 14 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 12px", borderRadius: 11, marginBottom: i < rows.length - 1 ? 6 : 0, background: r.state === "todo" ? ACCENT_SOFT : "transparent", border: r.state === "todo" ? `1px solid rgba(47,111,224,0.24)` : "1px solid transparent" }}>
            <span style={{ marginTop: 1, flex: "0 0 auto", width: 19, height: 19, borderRadius: 6, display: "grid", placeItems: "center", background: r.state === "done" ? ACCENT : "transparent", border: r.state === "done" ? "none" : r.state === "run" ? `2px solid ${ACCENT}` : `1.5px solid ${HAIRLINE_STRONG}` }}>
              {r.state === "done" && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
              )}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <b style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: r.state === "todo" ? INK : INK, letterSpacing: "-0.2px" }}>{r.title}</b>
              <span style={{ fontFamily: SANS, fontSize: 12, color: r.state === "todo" ? ACCENT_DEEP : FAINT, letterSpacing: "-0.1px" }}>{r.sub}</span>
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 18px", borderTop: `1px solid ${HAIRLINE}`, fontFamily: SANS, fontSize: 12.5, color: MUTED, letterSpacing: "-0.2px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z" /><path d="M9.2 12l2 2 3.6-3.8" /></svg>
        Nothing goes out until your team approves it.
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay = 0) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section style={{ background: CANVAS, position: "relative", overflow: "hidden" }}>
      {/* faint brand wash, top-right */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(46% 50% at 86% 14%, rgba(47,111,224,0.10) 0%, rgba(47,111,224,0) 62%)" }} />

      <div style={{ position: "relative", maxWidth: MAXW, margin: "0 auto", padding: `0 ${PAGE_PAD}` }}>
        <div className="cd-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.04fr 0.96fr", gap: 56, alignItems: "center", paddingTop: "clamp(120px, 14vw, 168px)", paddingBottom: "clamp(56px, 7vw, 84px)" }}>
          {/* LEFT: copy */}
          <div style={{ maxWidth: 600 }}>
            <motion.h1 {...rise(0)} style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(40px, 5.4vw, 68px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: INK, margin: 0 }}>
              Run more cases <em style={{ fontStyle: "italic", color: ACCENT, fontWeight: 400 }}>without hiring</em>.
            </motion.h1>

            <motion.p {...rise(0.08)} style={{ fontFamily: SANS, fontSize: 19, fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.2px", color: MUTED, marginTop: 24, maxWidth: 520 }}>
              CaseDelta is an AI paralegal that works inside the tools your firm already uses, your case manager, your inbox, your billing, and does the routine case work: requesting records, drafting letters, updating files. Your team reviews and approves.
            </motion.p>

            <motion.div {...rise(0.16)} style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 34, flexWrap: "wrap" }}>
              <Pill href="/demo" location="hero">Book a 15-minute demo</Pill>
              <Link href="/use-cases" className="cd-hero-secondary" style={{ fontFamily: SANS, fontSize: 15, fontWeight: 500, color: INK, letterSpacing: "-0.2px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}>
                See how firms use it
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: product preview */}
          <motion.div {...rise(0.22)} className="cd-hero-visual">
            <DeltaPanel />
          </motion.div>
        </div>

        {/* logo wall */}
        <div style={{ borderTop: `1px solid ${HAIRLINE}`, padding: "26px 0 36px" }}>
          <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase", color: FAINT, marginBottom: 18 }}>
            Works inside the tools your firm already uses
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 38px", alignItems: "center" }}>
            {LOGOS.map((l) => (
              <span key={l} style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, letterSpacing: "0.2px", color: FAINT }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cd-pill:hover { background: #284b78; box-shadow: 0 10px 26px rgba(31,58,95,0.26); transform: translateY(-1px); }
        .cd-hero-secondary:hover { color: ${ACCENT}; }
        @media (max-width: 900px) {
          .cd-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
