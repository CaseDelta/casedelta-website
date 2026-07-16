"use client";

/**
 * Beat 4: Testimonial. A single centered card carrying the one REAL, attributable
 * quote (Kirschbaum & Nowotny, provided with permission). The Sasonix template's
 * marquee of invented endorsements (Marcus Chen / Lucifer Jason) and its stock
 * portraits were removed: an invented endorsement is an honesty and FTC risk, and we
 * do not have a real portrait, so the card uses an initials badge instead.
 *
 * Kept Sasonix-styled (cream, orange) until the tokens.ts rebrand.
 */
import { SX } from "./tokens";
import { Container } from "./kit";

const TESTIMONIAL = {
  quote: "Delta gives us back about five hours a week, and that time goes straight back into our cases.",
  initials: "KN",
  name: "Kirschbaum & Nowotny, LLC",
  location: "Overland Park, KS",
};

export function Testimonials() {
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <div style={{ maxWidth: 820, margin: "0 auto", background: SX.cream, borderRadius: 24, border: `1px solid ${SX.hairline}`, padding: "56px 56px 48px", textAlign: "center" }}>
          <p style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 32, lineHeight: "42px", letterSpacing: "-0.5px", color: SX.ink, margin: 0 }}>
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 36 }}>
            <span aria-hidden style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(150deg, #ff8a4c, ${SX.orange})`, display: "grid", placeItems: "center", fontFamily: SX.body, fontWeight: 600, fontSize: 15, color: "#fff", flex: "0 0 auto" }}>{TESTIMONIAL.initials}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: SX.body, fontWeight: 600, fontSize: 16, color: SX.ink }}>{TESTIMONIAL.name}</div>
              <div style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 15, color: SX.ink2, marginTop: 2 }}>{TESTIMONIAL.location}</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
