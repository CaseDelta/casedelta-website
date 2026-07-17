"use client";

/**
 * Beat 4: Testimonial. Restores the Sasonix "Real stories from teams using ..." section
 * format (centered heading + card row), rebranded to CaseDelta.
 *
 * HONESTY: the template shipped this as a marquee of INVENTED endorsements (Marcus Chen,
 * Lucifer Jason) over stock portraits. We never ship fabricated social proof, so this is
 * populated ONLY with the one real, attributable quote we have (Kirschbaum & Nowotny,
 * provided with permission) and no stock portrait. The horizontal marquee auto-enables
 * once there are two or more REAL cards in CARDS; with one it renders a single card.
 *
 * Kept Sasonix-styled (cream) until the tokens.ts rebrand.
 */
import { SX } from "./tokens";
import { Container } from "./kit";

type Story = { quote: string; initials: string; name: string; location: string };

const CARDS: Story[] = [
  {
    quote: "Delta gives us back about five hours a week, and that time goes straight back into our cases.",
    initials: "KN",
    name: "Kirschbaum & Nowotny, LLC",
    location: "Overland Park, KS",
  },
  // Add more REAL, attributable quotes here to turn this back into a scrolling marquee.
];

function Card({ c }: { c: Story }) {
  return (
    <div style={{ flex: "0 0 auto", width: 560, minHeight: 260, background: SX.cream, borderRadius: 24, border: `1px solid ${SX.hairline}`, padding: "40px 40px 34px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <p style={{ fontFamily: SX.body, fontWeight: 500, fontSize: 22, lineHeight: 1.4, letterSpacing: "-0.3px", color: SX.ink, margin: 0 }}>&ldquo;{c.quote}&rdquo;</p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 32 }}>
        <span aria-hidden style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(150deg, #ff8a4c, ${SX.orange})`, display: "grid", placeItems: "center", fontFamily: SX.body, fontWeight: 600, fontSize: 15, color: "#fff", flex: "0 0 auto" }}>{c.initials}</span>
        <div>
          <div style={{ fontFamily: SX.body, fontWeight: 600, fontSize: 16, color: SX.ink }}>{c.name}</div>
          <div style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 15, color: SX.ink2, marginTop: 2 }}>{c.location}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const marquee = CARDS.length >= 2;
  const track = [...CARDS, ...CARDS];
  return (
    <section style={{ background: SX.white, padding: "0 0 120px", overflow: "hidden" }}>
      <Container>
        <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: 0, textAlign: "center", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Real stories from firms using CaseDelta
        </h2>
      </Container>

      {marquee ? (
        <div className="sx-tmk" style={{ marginTop: 56, overflow: "hidden", maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)" }}>
          <div className="sx-tmk-track" style={{ display: "flex", gap: 24, width: "max-content", paddingLeft: 24 }}>
            {track.map((c, i) => <Card key={i} c={c} />)}
          </div>
        </div>
      ) : (
        <Container>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
            <Card c={CARDS[0]} />
          </div>
        </Container>
      )}

      <style>{`
        .sx-tmk-track { animation: sx-tmk 40s linear infinite; }
        @keyframes sx-tmk { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .sx-tmk-track { animation: none; } }
      `}</style>
    </section>
  );
}
