"use client";

/**
 * Private gallery for comparing hero product-demo mockups. Each entry is a self-contained,
 * production-quality variation rendered on a neutral stage so they can be judged side by side.
 * Populated after the animation-technique research lands. Not indexed; not linked from the site.
 */
import type { ComponentType } from "react";
import { MockupWindow, MockupPalette, MockupChips, MockupTrace } from "@/components/mockups/mockups";

type Mockup = { id: string; title: string; blurb: string; Component: ComponentType };

const MOCKUPS: Mockup[] = [
  { id: "window", title: "Live app window", blurb: "A real-looking Delta workspace: the request types into a rounded command bar, then the steps build below as a list and finish with a result. Reads as the actual product. (Research pick.)", Component: MockupWindow },
  { id: "palette", title: "Command palette", blurb: "A Raycast / cmdk-style floating panel. The request types in, results slide in with the running step highlighted, then a result row. Sleek and on-trend.", Component: MockupPalette },
  { id: "chips", title: "Floating input + action chips", blurb: "Just the rounded pill input on a glow stage. Each action pops in as a chip, then a one-line result. Minimal, fast, great on mobile.", Component: MockupChips },
  { id: "trace", title: "Agent trace", blurb: "A Cursor / v0-style execution trace: tool calls run and resolve with a result line. Most 'autonomous agent', but the most technical look.", Component: MockupTrace },
];

const FONT = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const SERIF = "var(--font-newsreader), Georgia, serif";

export function MockupsClient() {
  return (
    <main style={{ background: "#f6f4ef", minHeight: "100vh", fontFamily: FONT, color: "#1c1a16" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 120px" }}>
        <header style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase", color: "#2f6fe0", marginBottom: 14 }}>Internal</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 5vw, 52px)", letterSpacing: "-1.6px", lineHeight: 1.04, margin: 0 }}>Hero demo mockups</h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: "#5d574e", marginTop: 16, maxWidth: 640 }}>
            Polished, production-ready variations of the product-demo section. Watch each loop, then pick one.
          </p>
        </header>

        {MOCKUPS.length === 0 ? (
          <div style={{ marginTop: 48, padding: "48px", borderRadius: 18, border: "1px dashed rgba(28,24,18,0.18)", textAlign: "center", color: "#948c7f" }}>
            Building the variations now.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 88, marginTop: 64 }}>
            {MOCKUPS.map((m, i) => (
              <section key={m.id}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontFamily: SERIF, fontSize: 22, color: "#948c7f" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, letterSpacing: "-0.6px", margin: 0 }}>{m.title}</h2>
                </div>
                <p style={{ fontSize: 15, color: "#5d574e", margin: "0 0 28px", maxWidth: 640 }}>{m.blurb}</p>
                <div style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(28,24,18,0.08)" }}>
                  <m.Component />
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
