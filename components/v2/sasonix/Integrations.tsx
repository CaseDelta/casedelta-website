"use client";

/**
 * Integrations Section (live top 6189, h753): centered mono eyebrow + Archivo 48px
 * heading, then a hub-and-spoke: a central orange brand mark, connector lines fanning
 * down, and a row of 5 tool tiles. Tool glyphs are Sasonix's placeholder assets
 * (hotlinked; swapped on rebrand). Tile centers at 140/390/640/890/1140 in the 1280
 * container.
 */
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";

const IMG = (f: string) => `https://framerusercontent.com/images/${f}`;
const TOOLS = [
  "0bh5GklkSS3nczO54NEIWlFCOI8.png",
  "FatAVQjJDwUHSfPq9cuAs5qqkt8.png",
  "Cm7tjyBlR1dGqLju2S07ZqgY28.png",
  "yBHxWZrQgnY3lMvz9ZJ3EHWsSIc.png",
  "AmsoD5oX1PV3pOcziPZkNNJDBE.png",
];
const CENTERS = [140, 390, 640, 890, 1140]; // tile centers in the 1280 container

export function Integrations() {
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <SectionHead eyebrow="Integrations" title="Connect all your tools and automate workflows" titleMaxW={560} />
        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* central orange brand mark */}
          <span style={{ width: 116, height: 116, borderRadius: 28, background: `linear-gradient(150deg, #ff8a4c, ${SX.orange})`, display: "grid", placeItems: "center", boxShadow: `0 24px 50px -18px rgba(255,112,41,0.55)` }} aria-hidden>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="#fff"><path d="M12 3l3.2 5.5H8.8L12 3zM6 10.5l3.2 5.5H2.8L6 10.5zm12 0l3.2 5.5h-6.4L18 10.5z" /></svg>
          </span>
          {/* connector lines fanning from the mark down to the tiles */}
          <svg viewBox="0 0 1280 92" fill="none" aria-hidden style={{ width: "100%", height: 92, marginTop: 4 }} preserveAspectRatio="xMidYMid meet">
            <g stroke={SX.orange} strokeWidth="1.5" opacity="0.85" strokeLinecap="round" fill="none">
              <path d="M640 0 L640 30" />
              <path d="M140 46 Q140 30 156 30 L1124 30 Q1140 30 1140 46" />
              <path d="M140 30 L140 46 M390 30 L390 76 M640 30 L640 76 M890 30 L890 76 M1140 30 L1140 76" />
            </g>
            <g fill={SX.orange} opacity="0.85">
              {CENTERS.map((c) => (
                <path key={c} d={`M${c - 4} 76 L${c + 4} 76 L${c} 84 Z`} />
              ))}
            </g>
          </svg>
          {/* 5 tool tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24, width: "100%" }}>
            {TOOLS.map((t) => (
              <div key={t} className="v2-tool-tile" style={{ aspectRatio: "1 / 1", maxWidth: 156, margin: "0 auto", width: "100%", background: SX.cream2, borderRadius: 24, display: "grid", placeItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG(t)} alt="" aria-hidden style={{ width: 48, height: 48, objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </Container>
      <style>{`
        .v2-tool-tile { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .v2-tool-tile:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -22px rgba(26,23,18,0.4); }
      `}</style>
    </section>
  );
}
