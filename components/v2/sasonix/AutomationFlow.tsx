"use client";

/**
 * Automation Flow Section (live top 1223, h822): centered mono eyebrow + Archivo 48px
 * heading + Geist sub, then a 3-card grid. Cards: cream (#fcf8f4), radius 24,
 * 411x394, padding 61/32/32, grid gap 24.
 *
 * The card illustrations on the live site are Sasonix's custom isometric line-art
 * (large inline SVGs). Those are decorative artwork we replace on rebrand, so this
 * uses same-size line-art placeholders; the card STRUCTURE is exact.
 */
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";

const CARDS = [
  { t: "Describe your goal", d: "Start by telling Sasonix what you want to accomplish using natural language." },
  { t: "Agent builds your workflow", d: "Sasonix analyzes your input and automatically creates a structured workflow." },
  { t: "Execute tasks automatically", d: "Once your workflow is ready, ai agents begin executing tasks in real time." },
];

/* Placeholder isometric line-art (132x167), same footprint as the live illustration. */
function IsoArt({ variant }: { variant: number }) {
  const s = { stroke: SX.ink, strokeWidth: 1.1, fill: "none", strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg width="132" height="167" viewBox="0 0 132 167" aria-hidden style={{ display: "block" }}>
      <g {...s} opacity={0.85} transform="translate(16, 26)">
        {/* base isometric cube */}
        <path d="M50 20 L86 40 L86 78 L50 98 L14 78 L14 40 Z" />
        <path d="M50 20 L50 98 M14 40 L50 60 L86 40 M50 60 L50 98" />
        {variant === 0 && <path d="M20 92 L44 106 L44 128 L20 114 Z M20 92 L44 106 M32 99 L32 121" />}
        {variant === 1 && (
          <>
            <path d="M58 96 L82 110 L82 132 L58 118 Z M58 96 L82 110 M70 103 L70 125" />
            <path d="M18 100 L34 109 L34 124 L18 115 Z" />
          </>
        )}
        {variant === 2 && <path d="M56 100 L84 116 L84 140 L56 124 Z M56 100 L84 116 M70 108 L70 132" />}
      </g>
    </svg>
  );
}

export function AutomationFlow() {
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <SectionHead
          eyebrow="Automation Flow"
          title="Simple instructions into intelligent workflows"
          sub="Getting started with Sasonix is simple. You don't need complex setup or technical knowledge."
          titleMaxW={640}
          subMaxW={430}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 65 }}>
          {CARDS.map((c, i) => (
            <div key={c.t} style={{ background: SX.cream, borderRadius: 24, height: 394, padding: "61px 32px 32px", display: "flex", flexDirection: "column" }}>
              <div style={{ alignSelf: "flex-start" }}><IsoArt variant={i} /></div>
              <div style={{ marginTop: "auto" }}>
                <p style={{ fontFamily: SX.body, fontWeight: 500, fontSize: 18, lineHeight: "25.2px", color: SX.ink, margin: 0 }}>{c.t}</p>
                <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "8px 0 0" }}>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
