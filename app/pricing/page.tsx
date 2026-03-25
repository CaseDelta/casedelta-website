"use client";

import { motion } from "framer-motion";
import { NavbarV2 } from "@/components/NavbarV2";
import { FooterV2 } from "@/components/FooterV2";

const ACCENT = "#2563EB";
const DELTA_BLUE = "#1D4ED8";
const BORDER = "#EDEDED";
const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const springBounce = { type: "spring" as const, stiffness: 400, damping: 22 };

export default function PricingPage() {
  return (
    <main style={{ backgroundColor: "#FFFFFF", fontFamily: FONT }}>
      <NavbarV2 basePath="/" />

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
            padding: "clamp(140px, 18vw, 220px) clamp(24px, 4vw, 48px) clamp(120px, 14vw, 200px)",
          }}
        >
          <div style={{ maxWidth: 800 }}>
            <h1
              style={{
                fontFamily: FONT,
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "#0A0A0A",
                letterSpacing: "-0.035em",
                lineHeight: 1.2,
                marginBottom: 32,
              }}
            >
              Free $25 credit.
              <br />
              <span style={{ color: "#888" }}>No subscription.</span>
              <br />
              <span style={{ color: "#888" }}>No seat fees.</span>
              <br />
              <span style={{ color: "#888" }}>Pay for what you use.</span>
            </h1>

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

            <p style={{
              fontFamily: FONT,
              fontSize: 15,
              color: "#999",
              marginTop: 48,
            }}>
              Larger firm?{" "}
              <a
                href="mailto:sales@casedelta.com"
                style={{ color: ACCENT, textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Talk to us
              </a>
            </p>
          </div>
        </div>
      </div>

      <FooterV2 />
    </main>
  );
}
