"use client";

/**
 * Faq Section (live top 9609, h799): centered Archivo 48px heading + Geist sub, then
 * an accordion of native <details> rows, and a "Still have questions? Contact us" line.
 */
import { SX } from "./tokens";
import { Container } from "./kit";

const ITEMS = [
  { q: "What is Sasonix and how does it work?", a: "Sasonix is an ai agent platform that allows you to automate workflows using simple natural language prompts." },
  { q: "Do i need coding skills to use Sasonix?", a: "No. Sasonix is built for everyone. You describe what you want in plain language and the agents handle the rest, no code required." },
  { q: "What kind of tasks can AI agents handle?", a: "From data collection and reporting to task assignment and notifications, agents handle the repetitive work across your tools." },
  { q: "How quickly can I get started?", a: "In minutes. Connect your tools, describe a workflow, and your agents are ready to run." },
  { q: "Can I customize how ai agents work?", a: "Yes. Agent profiles, triggers, and notifications are all configurable to fit your exact process." },
];

export function Faq() {
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: 0 }}>Got questions?</h2>
          <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "18px 0 0", maxWidth: 460 }}>Explore helpful answers to understand how Sasonix works and how it fits your workflow.</p>
        </div>
        <div style={{ maxWidth: 820, margin: "48px auto 0", display: "flex", flexDirection: "column", gap: 14 }}>
          {ITEMS.map((it, i) => (
            <details key={i} className="sx-faq" style={{ background: SX.white, border: `1px solid ${SX.hairline}`, borderRadius: 14 }}>
              <summary>
                <span style={{ fontFamily: SX.body, fontSize: 18, fontWeight: 500, letterSpacing: "-0.3px", color: SX.ink }}>{it.q}</span>
                <svg className="sx-faq-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SX.ink2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 9l6 6 6-6" /></svg>
              </summary>
              <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "0 24px 22px" }}>{it.a}</p>
            </details>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 28, fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>
          Still have questions? <a href="#" style={{ color: SX.orange, fontWeight: 500, textDecoration: "none" }}>Contact us</a>
        </p>
      </Container>
      <style>{`
        .sx-faq > summary { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 24px; }
        .sx-faq > summary::-webkit-details-marker { display: none; }
        .sx-faq .sx-faq-chev { transition: transform 0.25s ease; flex: 0 0 auto; }
        .sx-faq[open] .sx-faq-chev { transform: rotate(180deg); }
      `}</style>
    </section>
  );
}
