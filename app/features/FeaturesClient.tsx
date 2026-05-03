"use client";

import { useState } from "react";
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

/* ─── Mockup: One conversation, many tools ─── */
function WorkflowMockup() {
  const steps = [
    { tool: "Google Drive", action: "Pulled 412 medical records", color: "#10B981" },
    { tool: "Microsoft Word", action: "Drafted demand letter at 3x specials", color: "#10B981" },
    { tool: "Gmail", action: "Sent to opposing counsel", color: "#10B981" },
    { tool: "Clio", action: "Logged 1.2 hours to Hernandez matter", color: "#10B981" },
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
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>One sentence to Delta</span>
      </div>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${BORDER}`, fontSize: 13, color: "#333", lineHeight: 1.6, fontStyle: "italic" }}>
        &ldquo;Build the chronology for Hernandez, draft the demand at 3x specials, email it to the adjuster, and log my time.&rdquo;
      </div>
      <div style={{ padding: "8px 0" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ padding: "12px 20px", borderBottom: i < steps.length - 1 ? `1px solid ${BORDER}` : "none", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5 9-11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>{s.tool}</div>
              <div style={{ fontSize: 13, color: "#333", lineHeight: 1.4 }}>{s.action}</div>
            </div>
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
        { flag: "Deadline", color: "#DC2626", text: "Hernandez demand letter due Friday. Draft prepared and saved to Clio." },
        { flag: "Adjuster", color: "#F59E0B", text: "State Mutual has not responded to Reyes demand in 14 days. Follow-up drafted." },
        { flag: "Records", color: "#2563EB", text: "Chen v. Mercy: 412 new pages received from St. Luke&apos;s. Chronology updated." },
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
            What was the total billed across the Chen treatment records?
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
            Total billed across all providers: <strong>$84,210</strong>.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { src: "Chen_StLukes_Billing.pdf", page: "p. 1" },
              { src: "Chen_PT_Northbrook.pdf", page: "p. 1" },
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
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>Chen v. Mercy &middot; Records review</span>
        <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>412 documents</span>
      </div>
      {[
        { name: "OR_Report_2023.pdf", type: "Medical record", status: "Gap", statusColor: "#DC2626", detail: "33-min undocumented gap between procedure start and anesthesia" },
        { name: "Chen_StLukes_Billing.pdf", type: "Billing", status: "Reviewed", statusColor: "#16A34A", detail: "Primary provider billing: $52,800" },
        { name: "Nursing_Logs_Oct.pdf", type: "Medical record", status: "Reviewed", statusColor: "#16A34A", detail: "Vitals recorded, post-op timeline complete" },
        { name: "Expert_Report_Patel.pdf", type: "Expert report", status: "Flagged", statusColor: "#F59E0B", detail: "Does not address 33-min gap identified in OR report" },
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

const FEATURES_FAQS = [
  {
    question: "Which tools does Delta connect to?",
    answer:
      "Clio, Microsoft Word, Gmail, Outlook, Google Drive, Google Calendar, DocuSign, and Westlaw. Delta works inside the stack your firm already uses, rather than asking the firm to migrate to a new platform.",
  },
  {
    question: "How does Delta run work across multiple tools at once?",
    answer:
      "Tell Delta what you need in one sentence. It pulls records from Drive, drafts in Word, sends from your inbox, and updates Clio. The legal work and the administrative work happen in one conversation, instead of being split across five apps.",
  },
  {
    question: "Does Delta replace Clio or our case management system?",
    answer:
      "No. Delta connects to Clio and works alongside it. Cases, contacts, and time entries continue to live in Clio. Delta reads from and writes to Clio so your case management stays the source of truth.",
  },
  {
    question: "Where does our client data go?",
    answer:
      "Nowhere outside CaseDelta. We run on a private enterprise deployment. Your firm's data never touches a third-party AI provider. No shared models, no training on your files. Enterprise-grade security, sized to your firm.",
  },
  {
    question: "What does the morning briefing actually do?",
    answer:
      "Once a day, Delta produces a briefing built across Clio, your inbox, and your calendar: cases needing attention today, deadlines this week, opposing counsel and adjusters who owe responses, and anomalies surfaced overnight. The only proactive feature on Delta, by design.",
  },
];

function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 4vw, 48px)",
      }}
    >
      <h2
        style={{
          fontFamily: FONT,
          fontSize: "clamp(28px, 3.5vw, 42px)",
          fontWeight: 700,
          color: "#0A0A0A",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          marginBottom: 48,
        }}
      >
        Frequently Asked Questions
      </h2>
      <div>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                  fontFamily: FONT,
                  fontSize: "clamp(15px, 1.2vw, 18px)",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  letterSpacing: "-0.01em",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  gap: 16,
                }}
              >
                <span>{faq.question}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{
                    flexShrink: 0,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="#999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? 400 : 0,
                  transition: "max-height 0.3s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(14px, 1.1vw, 16px)",
                    fontWeight: 400,
                    color: "#666",
                    lineHeight: 1.65,
                    letterSpacing: "-0.01em",
                    paddingBottom: 20,
                    margin: 0,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function FeaturesClient() {
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
              One assistant.
            </span>
            {" "}
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
              Every tool your firm uses.
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
              maxWidth: 580,
            }}
          >
            Delta connects across Clio, Microsoft Word, Gmail or Outlook,
            Google Drive, and your calendar. Tell it what you need in one
            sentence. Many tools, hours of work, done in one go.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE_OUT }}
            style={{ marginTop: "clamp(28px, 3vw, 40px)" }}
          >
            <motion.a
              href="/demo"
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
              Book a demo
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURE SECTIONS
          ═══════════════════════════════════ */}
      <FeatureSection
        title="One sentence. Many tools."
        body="Tell Delta what you need. It pulls records from Drive, drafts in Word, sends from your inbox, and updates Clio. The legal work and the administrative work happen in the same conversation."
        mockup={<WorkflowMockup />}
      />
      <FeatureSection
        title="Walk in to a briefing, every morning."
        body="Cases needing attention today. Deadlines this week. Opposing counsel and adjusters who owe responses. Built across Clio, your inbox, and your calendar overnight, ready before you sit down."
        mockup={<BriefingMockup />}
        reverse
      />
      <FeatureSection
        title="Answers with citations to the source."
        body="Ask Delta about a case. Every answer cites the exact source document and page. Pulled from your firm&rsquo;s files in Drive, your matters in Clio, and the case law in Westlaw."
        mockup={<CitationsMockup />}
      />
      <FeatureSection
        title="Reads thousands of pages. Surfaces what matters."
        body="Medical records, billing, discovery, expert reports. Delta builds the chronology, flags the gaps, and cites everything to source. The work that took a week happens in a morning."
        mockup={<AnalysisMockup />}
        reverse
      />

      <FAQAccordion faqs={FEATURES_FAQS} />

      <BottomCTA
        ctaHeading="See Delta inside your firm&rsquo;s stack."
        ctaSubheading="Twenty-minute live demo. We connect Delta to a sandbox of your stack and run a real workflow end to end."
        ctaLabel="Book a demo"
        ctaHref="/demo"
      />
      <FooterV2 />
    </main>
  );
}
