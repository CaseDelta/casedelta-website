"use client";

import { FooterV2 } from "@/components/FooterV2";

const ACCENT = "#2563EB";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

interface LegalPageLayoutV2Props {
  title: string;
  children: React.ReactNode;
  lastUpdated?: string;
}

export function LegalPageLayoutV2({ title, children, lastUpdated = "March 25, 2026" }: LegalPageLayoutV2Props) {
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

        <div style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "120px clamp(24px, 4vw, 48px) 80px",
        }}>
          <h1 style={{
            fontFamily: FONT,
            fontSize: "clamp(32px, 4.5vw, 48px)",
            fontWeight: 700,
            color: "#0A0A0A",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            marginBottom: 12,
          }}>
            {title}
          </h1>
          <p style={{
            fontFamily: FONT,
            fontSize: 14,
            color: "#999",
            marginBottom: 56,
          }}>
            Last updated: {lastUpdated}
          </p>

          {children}
        </div>
      </div>

      <FooterV2 />
    </main>
  );
}

interface LegalSectionV2Props {
  title: string;
  children: React.ReactNode;
}

export function LegalSectionV2({ title, children }: LegalSectionV2Props) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{
        fontFamily: FONT,
        fontSize: "clamp(18px, 2vw, 24px)",
        fontWeight: 600,
        color: "#333",
        letterSpacing: "-0.02em",
        lineHeight: 1.3,
        marginBottom: 16,
      }}>
        {title}
      </h2>
      <div style={{
        fontFamily: FONT,
        fontSize: "clamp(15px, 1.2vw, 17px)",
        fontWeight: 400,
        color: "#555",
        lineHeight: 1.7,
        letterSpacing: "-0.01em",
      }}>
        {children}
      </div>
    </section>
  );
}

interface LegalClosingV2Props {
  children: React.ReactNode;
}

export function LegalClosingV2({ children }: LegalClosingV2Props) {
  return (
    <p style={{
      fontFamily: FONT,
      fontSize: "clamp(15px, 1.2vw, 17px)",
      fontWeight: 400,
      color: "#999",
      lineHeight: 1.7,
      letterSpacing: "-0.01em",
      paddingTop: 24,
      borderTop: `1px solid ${BORDER}`,
    }}>
      {children}
    </p>
  );
}

export const LEGAL_LINK_STYLE: React.CSSProperties = {
  color: ACCENT,
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};
