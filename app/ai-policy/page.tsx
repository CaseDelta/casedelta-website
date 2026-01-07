"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AIPolicy() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#FAFAFA",
        padding: "120px 24px 80px",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            style={{
              fontSize: "var(--font-size-small)",
              color: "#666666",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "var(--spacing-8)",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#000000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#666666";
            }}
          >
            ← Back to Home
          </Link>

          <h1
            style={{
              fontSize: "32px",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "#000000",
              marginBottom: "20px",
              fontFamily: "var(--font-family-serif)",
            }}
          >
            Our AI Policy
          </h1>

          <p
            style={{
              fontSize: "14px",
              color: "#999999",
              marginBottom: "40px",
            }}
          >
            Last updated: January 2026
          </p>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E5E5",
              borderRadius: "12px",
              padding: "48px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "#333333",
                lineHeight: "1.7",
              }}
            >
              <p style={{ marginBottom: "28px" }}>
                We built CaseDelta with a simple principle: your client data stays yours. Period.
              </p>

              <p style={{ marginBottom: "28px" }}>
                Unlike other AI tools that send your data to third-party services like OpenAI or Anthropic, we run our own AI infrastructure. This means we own and operate all the servers, containers, and AI models that power CaseDelta. Your client documents never leave our systems, and they're never processed by anyone else's AI.
              </p>

              <p style={{ marginBottom: "28px" }}>
                Think of it this way: when you use most AI tools, your data takes a trip through someone else's servers before coming back to you. With CaseDelta, everything happens inside our walls. We host our own AI models on our own servers, so your documents stay exactly where they should be—under your control and protected by our security.
              </p>

              <p style={{ marginBottom: "28px" }}>
                We don't share, sell, or allow third parties to access your client data. We don't use your documents to train AI models. We don't send your information to external AI providers. What you upload to CaseDelta stays in CaseDelta.
              </p>

              <p style={{ marginBottom: "0" }}>
                This approach costs us more and takes more work to maintain, but we believe it's the only responsible way to handle sensitive legal documents. Your clients trust you with their information, and you should be able to trust us with it too.
              </p>
            </div>

            <div
              style={{
                marginTop: "48px",
                paddingTop: "32px",
                borderTop: "1px solid #E5E5E5",
              }}
            >
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  color: "#666666",
                  marginBottom: "16px",
                }}
              >
                Questions about our AI infrastructure or data handling?
              </p>
              <a
                href="mailto:camren@casedelta.com"
                style={{
                  fontSize: "var(--font-size-base)",
                  color: "#000000",
                  textDecoration: "underline",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                camren@casedelta.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
