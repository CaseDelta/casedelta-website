"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#555555",
            marginBottom: "28px",
          }}
        >
          CaseDelta is evolving
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: "#FFFFFF",
            marginBottom: "24px",
          }}
        >
          AI that works inside
          <br />
          your firm — not around it.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          style={{
            fontSize: "17px",
            color: "#888888",
            lineHeight: 1.65,
            marginBottom: "40px",
          }}
        >
          We&apos;re rebuilding CaseDelta around a single idea: small and
          mid-size law firms deserve the same AI leverage as BigLaw — without
          the enterprise price tag or the security risk. The new CaseDelta
          connects to Clio, Google Drive, and whatever else your firm already
          uses. It reviews, flags, drafts, and remembers — and gets sharper the
          longer it&apos;s there.
        </motion.p>

        {/* Callout pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "inline-block",
            border: "1px solid #222222",
            borderRadius: "6px",
            padding: "10px 16px",
            marginBottom: "40px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#666666",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Think of it as{" "}
            <span style={{ color: "#AAAAAA", fontWeight: 500 }}>
              another seat in your firm
            </span>{" "}
            — at a fraction of what that seat costs.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            height: "1px",
            backgroundColor: "#1a1a1a",
            marginBottom: "32px",
          }}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ fontSize: "14px", color: "#555555", lineHeight: 1.6 }}
        >
          Interested in early access or a demo?{" "}
          <a
            href="mailto:camren@casedelta.com"
            style={{
              color: "#CCCCCC",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              textDecorationColor: "#444444",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#CCCCCC";
            }}
          >
            camren@casedelta.com
          </a>
        </motion.div>
      </div>
    </main>
  );
}
