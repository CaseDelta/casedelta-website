"use client";

/**
 * Beat 4: Testimonials. A horizontal, auto-scrolling row of quote cards on ambient
 * imagery.
 *
 * CARDS IS EMPTY, AND THAT IS DELIBERATE. This section shipped with two fabricated
 * testimonials inherited from the Sasonix template ("Marcus Chen, NovaTech Legal" and
 * "Lucifer Jason, Q.tube Law"). Neither person, firm, nor quote exists. They were
 * deleted on promotion to production rather than left unmounted, because a fabricated
 * quote sitting in the file is one import away from being live again.
 *
 * Social proof on this site is real or it is absent. The one real, attributable quote
 * is Kirschbaum & Nowotny, LLC of Overland Park, KS ("Delta gives us back about five
 * hours a week"), and it already carries the hero, so repeating it here would be the
 * same voice twice rather than a second story.
 *
 * TO BRING THIS SECTION BACK: add real, attributable quotes to CARDS and re-mount
 * <Testimonials /> in Sasonix.tsx. The component renders nothing while CARDS is empty,
 * so it cannot half-ship. The highest-value one to go get is a named attorney or firm
 * administrator on record about their first hour with Delta.
 */
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

/**
 * Cards sit ON an ambient image rather than beside a portrait (Camren, 2026-08-11).
 * Stock portraits read as stock the moment a reader looks twice, and a fake face
 * attached to a fake name is the most damaging thing on the page. The backdrop is
 * from the same ICM set as the hero and the banded section, so the page reads as
 * one world. `bg` picks from /v2/ambient (valley-mist and cloud-pastel were the two
 * reserved for this section).
 */
type Testimonial = { quote: string; name: string; title: string; bg: string };

const CARDS: Testimonial[] = [];

function Card({ c }: { c: Testimonial }) {
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
  // No real quotes, no section. An empty marquee under "Real stories from teams using
  // CaseDelta" is worse than no marquee.
  if (CARDS.length === 0) return null;

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
