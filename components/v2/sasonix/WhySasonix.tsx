"use client";

/**
 * Why Sasonix Section (live top 6942, h706): centered mono eyebrow + Archivo 48px
 * heading, then a 3-column comparison table (Features | Sasonix | Others) with the
 * Sasonix column highlighted by an orange border. Sasonix cells use orange checks;
 * Others cells use grey checks or crosses.
 */
import { SX } from "./tokens";
import { Container, SectionHead } from "./kit";
import { Reveal } from "./reveal";

const ROWS = [
  { feat: "Where it works", sx: "Inside the tools you already use", other: "In one more browser tab", otherOk: false },
  { feat: "What you get back", sx: "The whole routine job, done end to end", other: "Text you re-key into your systems", otherOk: false },
  { feat: "Your documents", sx: "Reads your case file, every answer cited", other: "You paste in snippets by hand", otherOk: false },
  { feat: "Next steps", sx: "Takes the next action, not just the answer", other: "Answers a question, then stops", otherOk: false },
  { feat: "Your firm", sx: "Learns your matters and compounds", other: "Forgets it the moment you close the tab", otherOk: false },
];

function Check({ color }: { color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }} aria-hidden><path d="M20 6L9 17l-5-5" /></svg>;
}
function Cross() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SX.ink2} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto", opacity: 0.5 }} aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>;
}

const COLS = "1fr 1.12fr 1.12fr";

export function WhySasonix() {
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <Reveal>
          <SectionHead eyebrow="Why Delta?" title="Delta vs a generic AI chatbot" titleMaxW={560} />
        </Reveal>
        <Reveal amount={0.15} style={{ position: "relative", maxWidth: 940, margin: "56px auto 0" }}>
          {/* highlighted Sasonix column */}
          <div aria-hidden style={{ position: "absolute", top: 0, bottom: 0, left: "calc(1/3.24*100%)", width: "calc(1.12/3.24*100%)", border: `2px solid ${SX.orange}`, borderRadius: 16, background: "rgba(255,112,41,0.04)", pointerEvents: "none" }} />
          {/* header */}
          <div style={{ display: "grid", gridTemplateColumns: COLS, alignItems: "center" }}>
            <span style={{ padding: "18px 22px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink }}>Features</span>
            <span style={{ padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
              <span style={{ width: 24, height: 24, borderRadius: 7, background: SX.orange, display: "grid", placeItems: "center" }} aria-hidden><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M12 3l3.2 5.5H8.8L12 3zM6 10.5l3.2 5.5H2.8L6 10.5zm12 0l3.2 5.5h-6.4L18 10.5z" /></svg></span>
              <span style={{ fontFamily: SX.body, fontSize: 20, fontWeight: 600, letterSpacing: "-0.3px", color: SX.ink }}>Delta</span>
            </span>
            <span style={{ padding: "18px 22px", textAlign: "center", fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink }}>Generic AI</span>
          </div>
          {/* rows */}
          {ROWS.map((r) => (
            <div key={r.feat} style={{ display: "grid", gridTemplateColumns: COLS, alignItems: "center", borderTop: `1px solid ${SX.hairline}` }}>
              <span style={{ padding: "20px 22px", fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink }}>{r.feat}</span>
              <span style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 10 }}>
                <Check color={SX.orange} />
                <span style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink }}>{r.sx}</span>
              </span>
              <span style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 10 }}>
                {r.otherOk ? <Check color={SX.ink2} /> : <Cross />}
                <span style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink2 }}>{r.other}</span>
              </span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
