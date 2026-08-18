"use client";

/**
 * Faq Section (live top 9609, h799): centered Archivo 48px heading + Geist sub, then an
 * accordion of white rows (radius 12, subtle border, padding 20) with a chevron that
 * rotates on open, and a "Still have questions? Contact us" line.
 *
 * The live is a Framer accordion that ANIMATES its height open/close (single-open, first
 * row open by default). Native <details> can't animate, so this is a controlled accordion
 * using the grid-template-rows 0fr->1fr technique for a gentle height transition.
 */
import { useState } from "react";
import { SX } from "./tokens";
import { Container } from "./kit";

const ITEMS = [
  { q: "What is CaseDelta in one sentence?", a: "CaseDelta is an AI associate that works inside the tools your firm already uses, your case manager, your email, your billing, and does the routine case work for you, while your team reviews and approves." },
  { q: "How do I know it is not making things up?", a: "Every answer points back to the source it came from. It works from the facts already in your file, it does not invent them, and your team approves before anything goes out. You always have the final read." },
  { q: "Why not just use Claude or ChatGPT?", a: "A general chatbot is a brain in another tab. It does not know your firm, it does not work inside your case manager, and it cannot move a matter forward. CaseDelta knows your firm and operates the tools you already run on." },
  { q: "Do I have to switch software or migrate my data?", a: "No. There is nothing to rip out and nothing to migrate. CaseDelta works on top of the tools you already pay for, so your data stays where it is and your team keeps the systems they know." },
];

export function Faq() {
  const [open, setOpen] = useState(0); // first row open by default (matches live)
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: 0 }}>Got questions?</h2>
          <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "18px 0 0", maxWidth: 460 }}>Explore helpful answers to understand how CaseDelta works and how it fits your firm.</p>
        </div>
        <div style={{ maxWidth: 820, margin: "48px auto 0", display: "flex", flexDirection: "column", gap: 14 }}>
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ background: SX.white, border: `1px solid ${SX.hairline}`, borderRadius: 12, overflow: "hidden" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 500, letterSpacing: "-0.3px", color: SX.ink }}>{it.q}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SX.ink2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flex: "0 0 auto", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {/* height-animated answer (grid-rows 0fr -> 1fr) */}
                <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.32s ease" }}>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "0 24px 22px" }}>{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ textAlign: "center", marginTop: 28, fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>
          Still have questions? <a href="#" style={{ color: SX.orange, fontWeight: 500, textDecoration: "none" }}>Contact us</a>
        </p>
      </Container>
    </section>
  );
}
