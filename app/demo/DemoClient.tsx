"use client";

import { DemoLandingBody } from "@/components/demo/DemoLandingBody";

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

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
      <DemoLandingBody conversionSource="lp_demo" />

      <footer style={{ padding: "32px 0 calc(120px + env(safe-area-inset-bottom))", textAlign: "center" }}>
        <span style={{ fontSize: 12, color: "#BBB", letterSpacing: "-0.005em" }}>
          © {new Date().getFullYear()} CaseDelta
        </span>
      </footer>
    </main>
  );
}
