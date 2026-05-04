"use client";

import { DemoBody } from "@/components/demo/DemoBody";

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/**
 * /demo: stripped landing page for paid traffic (LinkedIn ads, etc.).
 * No global navbar (see ClientLayout). Single-line copyright. No escape routes.
 */
export function DemoClient() {
  return (
    <main
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: FONT,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <section
        style={{
          flex: 1,
          position: "relative",
          padding: "clamp(48px, 6vw, 72px) 0 clamp(48px, 6vw, 72px)",
        }}
      >
        <DemoBody conversionSource="lp_demo" />
      </section>

      <footer style={{ padding: "16px 0 24px", textAlign: "center" }}>
        <span style={{ fontSize: 12, color: "#BBB", letterSpacing: "-0.005em" }}>
          © {new Date().getFullYear()} CaseDelta
        </span>
      </footer>
    </main>
  );
}
