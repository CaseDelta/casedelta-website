"use client";

/**
 * Smart Process Flow (live top 5314, h876): a full-width photo (1280x605) with 4
 * floating workflow-node cards at measured offsets, then a 4-column text row.
 * Photo + node cards are Sasonix's own assets (hotlinked placeholders; swapped on
 * rebrand). Node offsets are relative to the photo's top-left.
 */
import { SX } from "./tokens";
import { Container } from "./kit";

const IMG = (f: string) => `https://framerusercontent.com/images/${f}`;

const NODES = [
  { src: IMG("hwSoFBCEDnZHNkEyLYQigGqgTA8.png"), x: 307, y: 290, w: 205 },
  { src: IMG("AttBhR3DiZyXPgkmHLlnYHRRoA.png"), x: 534, y: 154, w: 185 },
  { src: IMG("vvlELxsqKZDaMrHTayZ2DADnZDM.png"), x: 534, y: 290, w: 185 },
  { src: IMG("pbrJr7AgvOdzTGdlDXQQ0u7s8Sc.png"), x: 746, y: 235, w: 224 },
];

const TEXTS = [
  "Transforming natural language into automated processes",
  "Leveraging AI to enhance user experience in digital applications",
  "Streamlining operations through intelligent task automation",
  "Utilizing data analytics for informed decision-making in business",
];

export function SmartFlow() {
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        {/* photo + floating node cards */}
        <div style={{ position: "relative", width: "100%", height: 605, borderRadius: 24, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG("92WZaFdD1V96dszqUc6T0V5U.png")} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          {/* connector lines between the workflow nodes (behind the cards) */}
          <svg viewBox="0 0 1280 605" fill="none" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
            <g stroke={SX.onAccent} strokeWidth="1.6" opacity="0.9" strokeLinecap="round">
              <path d="M512 336 L534 336" />
              <path d="M512 320 C524 300 528 240 560 216" />
              <path d="M719 336 L746 336" />
              <path d="M690 216 C730 232 738 288 746 316" />
            </g>
            <g fill={SX.onAccent} opacity="0.9">
              {[[512, 336], [534, 336], [719, 336], [746, 336], [560, 210], [690, 210]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="2.4" />
              ))}
            </g>
          </svg>
          {NODES.map((n, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={n.src} alt="" aria-hidden style={{ position: "absolute", left: n.x, top: n.y, width: n.w, height: "auto", filter: "drop-shadow(0 10px 24px rgba(var(--sx-shadow-rgb), 0.16))" }} />
          ))}
        </div>
        {/* 4-up text row, each in a cream card (live: #fcf8f4, padding 32/32/35) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 40 }}>
          {TEXTS.map((t) => (
            <div key={t} style={{ background: SX.cream, borderRadius: 12, border: "1px solid rgba(var(--sx-shadow-rgb), 0.09)", padding: "32px 32px 35px" }}>
              <p style={{ fontFamily: SX.body, fontWeight: 500, fontSize: 18, lineHeight: "25.2px", letterSpacing: "-0.2px", color: SX.ink, margin: 0 }}>{t}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
