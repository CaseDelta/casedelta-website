"use client";

/**
 * Beat 4: Testimonial. The Sasonix "Real stories" marquee: a horizontal, auto-scrolling
 * row of quote + portrait cards.
 *
 * PLACEHOLDER CONTENT (per Camren, for the design pass): the names, quotes, and portraits
 * below are the template's fabricated placeholders so the section reads full while we
 * build. THEY ARE NOT REAL and MUST be swapped for real, attributable testimonials before
 * /v2 ships anywhere public. (The one real quote we have is Kirschbaum & Nowotny.)
 *
 * Kept Sasonix-styled (cream) until the tokens.ts rebrand.
 */
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

/**
 * Cards sit ON an ambient image rather than beside a portrait (Camren, 2026-08-11).
 * Stock portraits read as stock the moment a reader looks twice, and a fake face
 * attached to a fake name is the most damaging thing on the page. The backdrop is
 * from the same ICM set as the hero and the banded section, so the page reads as
 * one world.
 */
const CARDS = [
  {
    quote: "Implementing CaseDelta was the best decision we made this year. Delta slotted into the systems we already ran on and started doing real work within days.",
    name: "Marcus Chen",
    title: "Managing Partner, NovaTech Legal",
    bg: "/v2/ambient/valley-mist.webp",
  },
  {
    quote: "CaseDelta has changed how our team works. Delta is intuitive, reliable, and has taken the routine case work off our attorneys' plates.",
    name: "Lucifer Jason",
    title: "Partner, Q.tube Law",
    bg: "/v2/ambient/cloud-pastel.webp",
  },
];

function Card({ c }: { c: (typeof CARDS)[number] }) {
  return (
    <div style={{ position: "relative", flex: "0 0 auto", width: 620, height: 380, borderRadius: 24, overflow: "hidden", border: `1px solid ${SX.hairline}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.bg} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(var(--sx-scrim-rgb),0.34) 0%, rgba(var(--sx-scrim-rgb),0.62) 62%, rgba(var(--sx-scrim-rgb),0.78) 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, height: "100%", padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <p style={{ fontFamily: SX.body, fontWeight: 500, fontSize: 22, lineHeight: 1.4, letterSpacing: "-0.3px", color: SX.onMedia, margin: 0 }}>&ldquo;{c.quote}&rdquo;</p>
        <div>
          <div style={{ fontFamily: SX.body, fontWeight: 600, fontSize: 17, color: SX.onMedia }}>{c.name}</div>
          <div style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 15, color: SX.onMediaMuted, marginTop: 3 }}>{c.title}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const track = [...CARDS, ...CARDS];
  return (
    <section style={{ background: SX.white, padding: "60px 0 60px", overflow: "hidden" }}>
      <Container>
        <Reveal>
          <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: 0, textAlign: "center", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Real stories from teams using CaseDelta
          </h2>
        </Reveal>
      </Container>
      <Reveal className="sx-tmk" delay={0.05} style={{ marginTop: 56, overflow: "hidden", maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)" }}>
        <div className="sx-tmk-track" style={{ display: "flex", gap: 24, width: "max-content", paddingLeft: 24 }}>
          {track.map((c, i) => <Card key={i} c={c} />)}
        </div>
      </Reveal>
      <style>{`
        .sx-tmk-track { animation: sx-tmk 40s linear infinite; }
        @keyframes sx-tmk { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .sx-tmk-track { animation: none; } }
      `}</style>
    </section>
  );
}
