"use client";

import { SOCIAL_PROOF } from "@/lib/socialProof";

const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

type SocialProofVariant = "strip" | "card";

type SocialProofProps = {
  variant?: SocialProofVariant;
  heading?: string;
  style?: React.CSSProperties;
};

function StarRow() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 2 }}
      aria-label={SOCIAL_PROOF.ariaLabel}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="17" height="17" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden>
          <path d="M12 2l2.93 6.5L22 9.55l-5.36 5L18 22l-6-3.6L6 22l1.36-7.45L2 9.55l7.07-1.05L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function RatingValue() {
  return (
    <>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 15,
          fontWeight: 700,
          color: "#1A1A1A",
          letterSpacing: "-0.01em",
        }}
      >
        {SOCIAL_PROOF.rating.toFixed(1)}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 500,
          color: "#888",
          letterSpacing: "-0.005em",
        }}
      >
        · {SOCIAL_PROOF.ratingLabel}
      </span>
    </>
  );
}

function StripVariant({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <StarRow />
        <RatingValue />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          rowGap: 4,
        }}
      >
        {SOCIAL_PROOF.firms.map((firm, i) => (
          <span key={firm} style={{ display: "inline-flex", alignItems: "baseline" }}>
            {i > 0 && (
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  color: "#CCC",
                  margin: "0 12px",
                  fontSize: 13,
                  lineHeight: 1,
                }}
              >
                ·
              </span>
            )}
            <span
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
          </span>
        ))}
      </div>
    </div>
  );
}

function CardVariant({
  heading = "Trusted by plaintiff firms",
  style,
}: {
  heading?: string;
  style?: React.CSSProperties;
}) {
  return (
    <aside
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "36px 36px 36px 40px",
        border: `1px solid ${BORDER}`,
        borderRadius: 14,
        backgroundColor: "#FAFAFA",
        width: "100%",
        maxWidth: 360,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Left accent rail */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 24,
          bottom: 24,
          left: 0,
          width: 3,
          backgroundColor: "#2563EB",
          borderRadius: "0 2px 2px 0",
        }}
      />

      {/* Rating block — stars row, then big number + label stacked */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 14 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden>
            <path d="M12 2l2.93 6.5L22 9.55l-5.36 5L18 22l-6-3.6L6 22l1.36-7.45L2 9.55l7.07-1.05L12 2z" />
          </svg>
        ))}
      </div>

      <div
        style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 32 }}
        aria-label={SOCIAL_PROOF.ariaLabel}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 32,
            fontWeight: 700,
            color: "#0A0A0A",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {SOCIAL_PROOF.rating.toFixed(1)}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 500,
            color: "#777",
            letterSpacing: "-0.01em",
          }}
        >
          {SOCIAL_PROOF.ratingLabel}
        </span>
      </div>

      <p
        style={{
          fontFamily: FONT,
          fontSize: 11,
          fontWeight: 600,
          color: "#888",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 16,
        }}
      >
        {heading}
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {SOCIAL_PROOF.firms.map((firm) => (
          <li
            key={firm}
            style={{
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 600,
              color: "#1E293B",
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
            }}
          >
            {firm}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function SocialProof({
  variant = "strip",
  heading,
  style,
}: SocialProofProps) {
  if (variant === "card") {
    return <CardVariant heading={heading} style={style} />;
  }
  return <StripVariant style={style} />;
}
