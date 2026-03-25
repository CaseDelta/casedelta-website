"use client";

import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

function Feature({
  heading,
  detail,
}: {
  heading: string;
  detail: string;
}) {
  return (
    <div style={{ padding: "clamp(40px, 5vw, 56px) 0", borderBottom: `1px solid ${BORDER}` }}>
      <h2
        style={{
          fontFamily: FONT,
          fontSize: "clamp(24px, 3.2vw, 42px)",
          fontWeight: 600,
          color: "#333",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          maxWidth: 640,
        }}
      >
        {heading}{" "}
        <span style={{ color: "#888" }}>{detail}</span>
      </h2>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      <div style={{ position: "relative" }}>
        {/* Ruler lines */}
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

        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "120px clamp(24px, 4vw, 48px) 80px",
          }}
        >
          {/* Heading */}
          <div style={{ maxWidth: 700, marginBottom: 24 }}>
            <h1
              style={{
                fontFamily: FONT,
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "#0A0A0A",
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
              }}
            >
              Delta does the work{" "}
              <span style={{ color: "#888" }}>your team doesn&apos;t have time for.</span>
            </h1>
          </div>

          {/* Feature list */}
          <div style={{ borderTop: `1px solid ${BORDER}` }}>
            <Feature
              heading="Analyzes thousands of documents."
              detail="Medical records, financials, employment files, discovery. Delta reads everything, classifies it, and flags what matters."
            />
            <Feature
              heading="Builds chronologies and case briefs."
              detail="Not summaries. Structured work product — timelines, anomaly reports, and briefs ready for your review."
            />
            <Feature
              heading="Answers questions with citations."
              detail="Ask Delta anything about a case. Every answer cites the exact source document and page."
            />
            <Feature
              heading="Catches what people miss."
              detail="Income discrepancies, conflicting dates, unsigned pages, missing documents. Delta cross-references everything."
            />
            <Feature
              heading="Learns how your firm works."
              detail="Your drafting style, your preferences, your judges. Delta remembers and applies them automatically."
            />
            <Feature
              heading="Connects to your existing tools."
              detail="Clio, Google Drive, Gmail, Outlook, and more. Delta works with what you already use."
            />
            <Feature
              heading="Logs every action."
              detail="Full audit trail — every document, every query, every response. Timestamped and exportable for bar compliance."
            />
          </div>

          {/* CTA */}
          <div style={{ marginTop: "clamp(48px, 6vw, 72px)" }}>
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
              whileHover={{ y: -2, backgroundColor: DELTA_BLUE, boxShadow: `0 6px 20px ${ACCENT}35` }}
              whileTap={{ y: 0, scale: 0.97 }}
              transition={springBounce}
            >
              Sign Up — Free $25 Credit
            </motion.a>
          </div>
        </div>
      </div>

      <FooterV2 />
    </main>
  );
}
