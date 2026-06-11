"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { BottomCTA } from "@/components/BottomCTA";
import type { Comparison } from "@/lib/comparisons";

/* ─── Design tokens ─── */
const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const BORDER = "#EDEDED";
const SUCCESS = "#10B981";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  };
}

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ borderTop: `1px solid ${BORDER}` }}>
      {faqs.map((f, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "22px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: FONT,
            }}
          >
            <span style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 600, color: "#0A0A0A", letterSpacing: "-0.01em" }}>
              {f.question}
            </span>
            <span style={{ fontSize: 22, color: "#999", flexShrink: 0, lineHeight: 1, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s ease" }}>
              +
            </span>
          </button>
          {open === i && (
            <p style={{ fontFamily: FONT, fontSize: "clamp(14px, 1.2vw, 16px)", color: "#555", lineHeight: 1.7, letterSpacing: "-0.01em", margin: 0, padding: "0 0 24px" }}>
              {f.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

const wrap: React.CSSProperties = { maxWidth: 1080, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" };

export function CompareContent({ comparison: c }: { comparison: Comparison }) {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      {/* ── Hero ── */}
      <section style={{ padding: "clamp(120px, 16vw, 200px) 0 clamp(48px, 6vw, 72px)" }}>
        <div style={wrap}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: ACCENT, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 16px" }}>
              Comparison
            </p>
            <h1 style={{ fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 700, color: DELTA_BLUE, lineHeight: 0.98, letterSpacing: "-0.04em", margin: 0 }}>
              {c.heroHeadline}
            </h1>
            <p style={{ fontSize: "clamp(17px, 1.7vw, 22px)", fontWeight: 400, color: SUBTITLE_BLUE, lineHeight: 1.4, letterSpacing: "-0.02em", marginTop: "clamp(20px, 2.5vw, 32px)", maxWidth: 720 }}>
              {c.heroSubheadline}
            </p>
          </motion.div>

          {/* Definition-first GEO opening */}
          <motion.p {...fade(0.15)} style={{ fontSize: "clamp(15px, 1.3vw, 17px)", color: "#555", lineHeight: 1.7, letterSpacing: "-0.01em", marginTop: "clamp(28px, 3vw, 40px)", maxWidth: 760 }}>
            {c.geoOpening}
          </motion.p>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section style={{ padding: "clamp(40px, 6vw, 72px) 0" }}>
        <div style={{ ...wrap }}>
          <motion.div {...fade(0)} style={{ border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.05)" }}>
            {/* header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.3fr 1.3fr", borderBottom: `1px solid ${BORDER}`, backgroundColor: "#FAFAFA" }}>
              <div style={{ padding: "16px clamp(14px, 2vw, 24px)" }} />
              <div style={{ padding: "16px clamp(14px, 2vw, 24px)", fontSize: "clamp(14px, 1.3vw, 17px)", fontWeight: 700, color: DELTA_BLUE, borderLeft: `1px solid ${BORDER}` }}>
                CaseDelta
              </div>
              <div style={{ padding: "16px clamp(14px, 2vw, 24px)", fontSize: "clamp(14px, 1.3vw, 17px)", fontWeight: 700, color: "#555", borderLeft: `1px solid ${BORDER}` }}>
                {c.competitor}
              </div>
            </div>
            {c.table.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1.1fr 1.3fr 1.3fr", borderBottom: i < c.table.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                <div style={{ padding: "16px clamp(14px, 2vw, 24px)", fontSize: "clamp(13px, 1.1vw, 15px)", fontWeight: 600, color: "#0A0A0A", display: "flex", alignItems: "center" }}>
                  {row.feature}
                </div>
                <div style={{ padding: "16px clamp(14px, 2vw, 24px)", fontSize: "clamp(13px, 1.1vw, 15px)", color: "#333", lineHeight: 1.55, borderLeft: `1px solid ${BORDER}`, display: "flex", gap: 8 }}>
                  <span style={{ color: SUCCESS, flexShrink: 0, fontWeight: 700 }}>✓</span>
                  <span>{row.casedelta}</span>
                </div>
                <div style={{ padding: "16px clamp(14px, 2vw, 24px)", fontSize: "clamp(13px, 1.1vw, 15px)", color: "#777", lineHeight: 1.55, borderLeft: `1px solid ${BORDER}` }}>
                  {row.competitor}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Qualitative sections ── */}
      <section style={{ padding: "clamp(40px, 6vw, 72px) 0" }}>
        <div style={wrap}>
          {c.sections.map((s, i) => (
            <motion.div key={i} {...fade(i * 0.05)} style={{ maxWidth: 760, marginBottom: i < c.sections.length - 1 ? "clamp(40px, 5vw, 64px)" : 0 }}>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: "#0A0A0A", lineHeight: 1.2, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: "clamp(15px, 1.3vw, 18px)", color: "#555", lineHeight: 1.7, letterSpacing: "-0.01em", margin: 0 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Bottom line callout ── */}
      <section style={{ padding: "clamp(24px, 4vw, 48px) 0" }}>
        <div style={wrap}>
          <motion.div {...fade(0)} style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: "clamp(20px, 3vw, 32px)", maxWidth: 760 }}>
            <p style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 600, color: "#0A0A0A", lineHeight: 1.4, letterSpacing: "-0.02em", margin: 0 }}>
              {c.bottomLine}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── When to choose the competitor (honesty) ── */}
      <section style={{ padding: "clamp(40px, 6vw, 72px) 0" }}>
        <div style={wrap}>
          <motion.div {...fade(0)} style={{ maxWidth: 760, backgroundColor: "#FAFAFA", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "clamp(24px, 3vw, 40px)" }}>
            <h2 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: "#0A0A0A", letterSpacing: "-0.02em", margin: "0 0 12px" }}>
              {c.whenToChoose.heading}
            </h2>
            <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "#555", lineHeight: 1.7, letterSpacing: "-0.01em", margin: 0 }}>
              {c.whenToChoose.body}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "clamp(48px, 7vw, 90px) 0 clamp(24px, 4vw, 48px)" }}>
        <div style={wrap}>
          <motion.h2 {...fade(0)} style={{ fontSize: "clamp(26px, 3.4vw, 40px)", fontWeight: 700, color: "#0A0A0A", letterSpacing: "-0.03em", margin: "0 0 clamp(16px, 2vw, 28px)" }}>
            Questions
          </motion.h2>
          <FAQAccordion faqs={c.faq} />
        </div>
      </section>

      <BottomCTA
        ctaHeading="See Delta inside your firm's stack."
        ctaSubheading="A twenty-minute live demo on a sandbox of your firm's tools, running a real workflow end to end."
        ctaLabel="Book a demo"
        ctaHref="/demo"
      />
      <FooterV2 />
    </main>
  );
}
