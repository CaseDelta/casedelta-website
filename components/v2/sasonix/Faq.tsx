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
  { q: "Do i need coding skills to use Sasonix?", a: "No, you don't need coding skills to use Sasonix; it's designed to be user-friendly and accessible for everyone." },
  { q: "What is Sasonix and how does it work?", a: "Sasonix is an ai agent platform that allows you to automate workflows using simple natural language prompts." },
  { q: "What kind of tasks can AI agents handle?", a: "From data collection and reporting to task assignment and notifications, agents handle the repetitive work across your tools." },
  { q: "How quickly can I get started?", a: "In minutes. Connect your tools, describe a workflow, and your agents are ready to run." },
  { q: "Can I customize how ai agents work?", a: "Yes. Agent profiles, triggers, and notifications are all configurable to fit your exact process." },
];

export function Faq() {
  const [open, setOpen] = useState(0); // first row open by default (matches live)
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: 0 }}>Got questions?</h2>
          <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "18px 0 0", maxWidth: 460 }}>Explore helpful answers to understand how Sasonix works and how it fits your workflow.</p>
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
