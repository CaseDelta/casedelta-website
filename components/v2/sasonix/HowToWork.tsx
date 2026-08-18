"use client";

/**
 * How to Work Section (live top 4437, h876): left-aligned Archivo 48px heading, then
 * a 3-card row. Each step card (cream #fcf8f4, radius 12, 400x565, padding 27/27/63):
 * a rounded "Step 0X" mono pill with an orange dot, a Geist 20px title, a Geist sub,
 * and a product-UI illustration bleeding off the bottom.
 *
 * Illustrations are Sasonix's own product mockups (hotlinked placeholders; swapped
 * on rebrand).
 */
import { SX } from "./tokens";
import { Container } from "./kit";

const IMG = (f: string) => `https://framerusercontent.com/images/${f}`;

const STEPS = [
  { n: "Step 01", t: "Connect Your API", d: "Agents gather data, trigger actions, send updates, and maintain balance.", img: IMG("2Dvr6W6XTpY95oGh7zZCw9ZBM.png") },
  { n: "Step 02", t: "Start Collecting Data", d: "Agents analyze data, generate insights, deliver reports, and workflows.", img: IMG("yDOhZBl3JpW8SGC8skm9EBIYq8U.png") },
  { n: "Step 03", t: "Use As You Need", d: "Agents analyze data, generate insights, deliver reports, and workflows.", img: IMG("8MIYuV9saFFpdm33TofL6D9bCg.png") },
];

export function HowToWork() {
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: 0, maxWidth: 540 }}>
          Let&rsquo;s break down how everything works for you
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, marginTop: 56 }}>
          {STEPS.map((s, i) => (
            <div key={s.t} style={{ position: "relative", background: SX.cream, borderRadius: 22, border: "1px solid rgba(var(--sx-shadow-rgb), 0.12)", boxShadow: "0 1px 3px rgba(var(--sx-shadow-rgb), 0.04)", height: 565, padding: "27px 27px 63px", overflow: "hidden" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, background: SX.cream2, borderRadius: 90, padding: "8px 24px" }}>
                {/* live: an 8px blur(6px) glow layer behind a solid dot, both #ff6c02;
                    the gentle staggered pulse is our "dynamic" add (Camren's request). */}
                <span style={{ position: "relative", width: 8, height: 8, flex: "0 0 auto" }}>
                  <span aria-hidden className="sx-dot-glow" style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: 8, transform: "translate(-50%,-50%)", borderRadius: "50%", background: SX.orangeDeep, filter: "blur(6px)", animationDelay: `${i * 0.5}s` }} />
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: SX.orangeDeep }} />
                </span>
                <span style={{ fontFamily: SX.mono, fontSize: 16, letterSpacing: "-0.5px", color: SX.ink }}>{s.n}</span>
              </span>
              <p style={{ fontFamily: SX.body, fontWeight: 500, fontSize: 20, lineHeight: "25.2px", color: SX.ink, margin: "24px 0 0" }}>{s.t}</p>
              <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "12px 0 0", maxWidth: 300 }}>{s.d}</p>
              {/* product-UI illustration, positioned in the lower-middle (live: top 229) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt="" aria-hidden style={{ position: "absolute", left: 27, top: 229, width: 346, height: "auto", borderRadius: 12, boxShadow: "0 10px 40px -18px rgba(var(--sx-shadow-rgb), 0.35)" }} />
            </div>
          ))}
        </div>
      </Container>
      <style>{`
        @media (max-width: 900px){ .v2-how-grid { grid-template-columns: 1fr !important; } }
        .sx-dot-glow { animation: sx-dot-pulse 2.4s ease-in-out infinite; }
        @keyframes sx-dot-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.85; }
          50%      { transform: translate(-50%,-50%) scale(1.75); opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce){ .sx-dot-glow { animation: none; } }
      `}</style>
    </section>
  );
}
