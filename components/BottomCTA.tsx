"use client";

import { motion } from "framer-motion";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

interface BottomCTAProps {
  quote: string;
  attribution: string;
  attributionDetail: string;
  ctaHeading: string;
  ctaSubheading: string;
}

export function BottomCTA({
  quote,
  attribution,
  attributionDetail,
  ctaHeading,
  ctaSubheading,
}: BottomCTAProps) {
  const initials = attribution
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* Social proof */}
      <section
        style={{
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "clamp(64px, 8vw, 100px) clamp(24px, 4vw, 48px)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: "clamp(18px, 1.8vw, 24px)",
              fontWeight: 400,
              color: "#555",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              marginBottom: 24,
            }}
          >
            &ldquo;{quote}&rdquo;
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "#E8E8E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#999",
                }}
              >
                {initials}
              </span>
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#333",
                }}
              >
                {attribution}
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  color: "#999",
                }}
              >
                {attributionDetail}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: "#FAFAFA",
          borderTop: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(64px, 8vw, 100px) clamp(24px, 4vw, 48px)",
            textAlign: "center",
          }}
        >
          <h2
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
            {ctaHeading}
          </h2>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.3vw, 19px)",
              fontWeight: 400,
              color: "#666",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              marginBottom: 32,
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {ctaSubheading}
          </p>

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
        </div>
      </section>
    </>
  );
}
