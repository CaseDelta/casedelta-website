"use client";

/**
 * Testimonial Section (live top 7648, h800): centered Archivo 48px heading, then a
 * horizontal marquee of testimonial cards (quote + name/company on the left, portrait
 * photo on the right). Quotes/photos are the template's placeholders (hotlinked;
 * replaced on rebrand).
 */
import { SX } from "./tokens";
import { Container } from "./kit";

const IMG = (f: string) => `https://framerusercontent.com/images/${f}`;

const CARDS = [
  {
    quote: "Implementing Sasonix was the best decision we made this year. The platform's AI agents seamlessly integrated into our existing systems.",
    name: "Marcus Chen",
    title: "CEO, NovaTech Industries",
    photo: IMG("O7FyI2ae7dL4eDiTZJoZwHqdhxc.jpg"),
  },
  {
    quote: "Sasonix has revolutionized our workflow. The AI agents are intuitive, efficient, and have significantly boosted our team's overall productivity.",
    name: "Lucifer Jason",
    title: "CEO of Q.tube",
    photo: IMG("4JAVNKxzAj7T8HuZ6ikGr74dI.png"),
  },
];

function Card({ c }: { c: (typeof CARDS)[number] }) {
  return (
    <div style={{ flex: "0 0 auto", width: 660, height: 426, background: SX.cream, borderRadius: 24, border: `1px solid ${SX.hairline}`, display: "flex", overflow: "hidden" }}>
      <div style={{ flex: "1 1 auto", padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <p style={{ fontFamily: SX.body, fontWeight: 500, fontSize: 22, lineHeight: 1.35, letterSpacing: "-0.3px", color: SX.ink, margin: 0 }}>&ldquo;{c.quote}&rdquo;</p>
        <div>
          <div style={{ fontFamily: SX.body, fontWeight: 500, fontSize: 18, color: SX.ink }}>{c.name}</div>
          <div style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 15, color: SX.ink2, marginTop: 3 }}>{c.title}</div>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.photo} alt="" aria-hidden style={{ flex: "0 0 auto", width: 300, height: "100%", objectFit: "cover" }} />
    </div>
  );
}

export function Testimonials() {
  const track = [...CARDS, ...CARDS];
  return (
    <section style={{ background: SX.white, padding: "0 0 120px", overflow: "hidden" }}>
      <Container>
        <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: 0, textAlign: "center", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          Real stories from teams using Sasonix
        </h2>
      </Container>
      <div className="sx-tmk" style={{ marginTop: 56, overflow: "hidden", maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)" }}>
        <div className="sx-tmk-track" style={{ display: "flex", gap: 24, width: "max-content", paddingLeft: 24 }}>
          {track.map((c, i) => <Card key={i} c={c} />)}
        </div>
      </div>
      <style>{`
        .sx-tmk-track { animation: sx-tmk 40s linear infinite; }
        @keyframes sx-tmk { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .sx-tmk-track { animation: none; } }
      `}</style>
    </section>
  );
}
