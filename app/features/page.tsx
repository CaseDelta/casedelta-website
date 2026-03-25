"use client";

import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { BottomCTA } from "@/components/BottomCTA";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const SUBTITLE_BLUE = "#60A5FA";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

/* ─── Mockup: "What Delta Knows" ─── */
function LearnsMockup() {
  const entries = [
    { label: "Practice Areas", value: "Employment discrimination, insurance defense, Section 1983" },
    { label: "Draft Style", value: "Concise, no legalese, action items bolded" },
    { label: "Judge Notes", value: "Judge Miller prefers briefs under 15 pages, hostile to continuance requests" },
    { label: "Opposing Counsel", value: "Torres & Associates — settles 80% within 30 days of trial date" },
    { label: "Client Patterns", value: "Johnson submits within 48hrs, Wheeler averages 2-week delay" },
  ];
  return (
    <div
      style={{
        borderRadius: 12,
        border: `1px solid ${BORDER}`,
        backgroundColor: "#FAFAFA",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/assets/branding/delta-icon-light.svg" alt="" style={{ width: 12, height: 12 }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>What Delta Knows</span>
        <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>Graves Law</span>
      </div>
      <div style={{ padding: "8px 0" }}>
        {entries.map((e, i) => (
          <div key={i} style={{ padding: "10px 20px", borderBottom: i < entries.length - 1 ? `1px solid ${BORDER}` : "none" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{e.label}</div>
            <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>{e.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Morning Briefing ─── */
function BriefingMockup() {
  return (
    <div
      style={{
        borderRadius: 12,
        border: `1px solid ${BORDER}`,
        backgroundColor: "#FAFAFA",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
        overflow: "hidden",
        fontFamily: FONT,
        padding: "clamp(20px, 2.5vw, 32px)",
      }}
    >
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: "#1A1A1A", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/assets/branding/delta-icon-light.svg" alt="" style={{ width: 20, height: 20 }} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Delta</span>
            <span style={{ fontSize: 11, color: "#999" }}>6:12 AM</span>
          </div>
          <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: 0 }}>
            Good morning. Here&apos;s your briefing across 12 active matters:
          </p>
        </div>
      </div>
      {[
        { flag: "Deadline", color: "#DC2626", text: "Martinez deposition in 3 days — expert witness disclosure not filed. Draft prepared." },
        { flag: "Missing", color: "#F59E0B", text: "Wheeler file: 8 of 12 required documents received. Still missing 2023 tax return and QDRO." },
        { flag: "Anomaly", color: "#2563EB", text: "Robertson financials: $31K discrepancy between W-2 and bank deposits. Flagged for review." },
      ].map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderTop: `1px solid ${BORDER}`, marginLeft: 46 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0, marginTop: 2 }}>{item.flag}</span>
          <span style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Mockup: Q&A with Citations ─── */
function CitationsMockup() {
  return (
    <div
      style={{
        borderRadius: 12,
        border: `1px solid ${BORDER}`,
        backgroundColor: "#FAFAFA",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
        overflow: "hidden",
        fontFamily: FONT,
        padding: "clamp(20px, 2.5vw, 32px)",
      }}
    >
      {/* User question */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: `${ACCENT}15`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>KG</span>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Kate Graves</span>
            <span style={{ fontSize: 11, color: "#999" }}>2:14 PM</span>
          </div>
          <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: 0 }}>
            What was the total income reported across all W-2s in the Chen case?
          </p>
        </div>
      </div>
      {/* Delta answer */}
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: "#1A1A1A", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/assets/branding/delta-icon-light.svg" alt="" style={{ width: 20, height: 20 }} />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>Delta</span>
            <span style={{ fontSize: 11, color: "#999" }}>2:14 PM</span>
          </div>
          <p style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, margin: "0 0 12px" }}>
            Total W-2 income across all employers: <strong>$142,380</strong>.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { src: "Chen_2023_W2_Primary.pdf", page: "p. 1" },
              { src: "Chen_2023_W2_Secondary.pdf", page: "p. 1" },
            ].map((cite, i) => (
              <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", border: `1px solid ${BORDER}`, borderRadius: 6, backgroundColor: "#FFFFFF", fontSize: 12, color: "#555" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" /><polyline points="14 2 14 8 20 8" stroke="#999" strokeWidth="1.5" strokeLinecap="round" /></svg>
                <span>{cite.src}</span>
                <span style={{ color: "#999" }}>{cite.page}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup: Document Analysis ─── */
function AnalysisMockup() {
  return (
    <div
      style={{
        borderRadius: 12,
        border: `1px solid ${BORDER}`,
        backgroundColor: "#FAFAFA",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>Chen v. Mercy — Document Review</span>
        <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>47 documents</span>
      </div>
      {[
        { name: "OR_Report_2023.pdf", type: "Medical Record", status: "Anomaly", statusColor: "#DC2626", detail: "33-min undocumented gap between procedure start and anesthesia" },
        { name: "Chen_2023_W2_Primary.pdf", type: "Financial — W-2", status: "Reviewed", statusColor: "#16A34A", detail: "Primary employer income: $98,200" },
        { name: "Nursing_Logs_Oct.pdf", type: "Medical Record", status: "Reviewed", statusColor: "#16A34A", detail: "Vitals recorded, post-op timeline complete" },
        { name: "Expert_Report_Patel.pdf", type: "Expert Report", status: "Flagged", statusColor: "#F59E0B", detail: "Does not address 33-min gap identified in OR report" },
      ].map((doc, i, arr) => (
        <div key={i} style={{ padding: "12px 20px", borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#BBB" strokeWidth="1.5" strokeLinecap="round" /><polyline points="14 2 14 8 20 8" stroke="#BBB" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>{doc.name}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: doc.statusColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>{doc.status}</span>
            </div>
            <div style={{ fontSize: 11, color: "#999", marginBottom: 2 }}>{doc.type}</div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.4 }}>{doc.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Feature Section ─── */
function FeatureSection({
  title,
  body,
  mockup,
  reverse = false,
}: {
  title: string;
  body: string;
  mockup: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section
      style={{
        maxWidth: 1320,
        margin: "0 auto",
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 4vw, 48px)",
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
        style={{ direction: reverse ? "rtl" : "ltr" }}
      >
        {/* Text */}
        <div style={{ direction: "ltr" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.3vw, 19px)",
              fontWeight: 400,
              color: "#666",
              lineHeight: 1.65,
              letterSpacing: "-0.01em",
              maxWidth: 480,
            }}
          >
            {body}
          </motion.p>
        </div>
        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          style={{ direction: "ltr" }}
        >
          {mockup}
        </motion.div>
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FFFFFF" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(140px, 18vw, 220px) clamp(24px, 4vw, 48px) clamp(80px, 10vw, 120px)",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            style={{ margin: 0 }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: "clamp(64px, 11vw, 150px)",
                fontWeight: 700,
                color: DELTA_BLUE,
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
                display: "block",
              }}
            >
              Delta learns your firm
            </span>
            <span
              style={{
                fontFamily: FONT,
                fontSize: "clamp(28px, 4.5vw, 58px)",
                fontWeight: 400,
                color: SUBTITLE_BLUE,
                lineHeight: 1.25,
                letterSpacing: "-0.03em",
                display: "block",
                marginTop: "clamp(12px, 1.5vw, 24px)",
              }}
            >
              and gets smarter every day.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.4vw, 20px)",
              fontWeight: 400,
              color: "#666",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              marginTop: "clamp(28px, 3vw, 44px)",
              maxWidth: 560,
            }}
          >
            The only legal AI that remembers your cases, your judges, and
            your preferences &mdash; and builds on them permanently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE_OUT }}
            style={{ marginTop: "clamp(28px, 3vw, 40px)" }}
          >
            <motion.a
              href="https://app.casedelta.com/signup"
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
              transition={springBounce}
            >
              Sign Up — Free $25 Credit
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURE SECTIONS — one per viewport
          ═══════════════════════════════════ */}
      <FeatureSection
        title="Delta learns your firm."
        body="Your cases, your judges, your opposing counsel, your drafting style. Delta remembers everything and gets smarter every week. That knowledge never walks out the door."
        mockup={<LearnsMockup />}
      />
      <FeatureSection
        title="Shows up every morning with a briefing."
        body="Deadlines, missing documents, anomalies across your caseload — reviewed overnight and ready before you ask."
        mockup={<BriefingMockup />}
        reverse
      />
      <FeatureSection
        title="Answers any question with citations."
        body="Ask Delta anything about a case. Every answer cites the exact source document and page — no hallucinations, no guessing."
        mockup={<CitationsMockup />}
      />
      <FeatureSection
        title="Reads everything. Catches what people miss."
        body="Medical records, financials, discovery — classified, cross-referenced, and cited. Income discrepancies, conflicting dates, missing documents."
        mockup={<AnalysisMockup />}
        reverse
      />

      <BottomCTA
        quote="After two weeks, Delta knew my judges, my opposing counsel, and how I like my briefs. No associate learns that fast."
        attribution="Managing Partner"
        attributionDetail="Employment law firm, Kansas City"
        ctaHeading="See what Delta learns about your firm."
        ctaSubheading="Start with $25 in free credits. No subscription required."
      />
      <FooterV2 />
    </main>
  );
}
