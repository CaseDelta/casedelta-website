"use client";

/**
 * Automation Section (live top 2045, h2392): a LEFT-aligned Archivo 48px heading,
 * then 3 stacked feature cards. Each card (cream #fefaf6, radius 12, 1280x654) is a
 * 50/50 split: left = 54px icon chip + Archivo 32px heading + Geist sub + a 3-item
 * checklist; right = a full-height photo with a floating product panel.
 *
 * Photos + panel images are Sasonix's own assets (hotlinked as placeholders during
 * the fidelity phase; swapped on rebrand). Card 0's panel overlays live header text
 * onto the code image, matching the live composite.
 */
import { SX } from "./tokens";
import { Container } from "./kit";

const IMG = (f: string) => `https://framerusercontent.com/images/${f}`;

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SX.orange} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconChip({ path }: { path: React.ReactNode }) {
  return (
    <span style={{ display: "grid", placeItems: "center", width: 54, height: 54, borderRadius: 12, background: SX.white, border: `1px solid ${SX.hairline}` }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SX.orange} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{path}</svg>
    </span>
  );
}

const ICONS = [
  <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h6v6H9z" /></>,
  <><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="18" cy="17" r="2.5" /></>,
  <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></>,
];

type Card = { heading: string; sub: string; checks: string[]; photo: string; panel: React.ReactNode };

function CodePanel() {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-42%, -50%)", width: 429, borderRadius: 12, background: "#fff", boxShadow: "0 10px 68px rgba(0,0,0,0.14)", overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG("HKoXTpndSrMAq7ojdzpGjxUyzg.png")} alt="" aria-hidden style={{ display: "block", width: "100%", height: "auto" }} />
      {/* opaque header bar covering the code image's top (the live composite) */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 48, background: SX.card, borderBottom: `1px solid ${SX.hairline}`, display: "flex", alignItems: "center", gap: 10, padding: "0 20px" }}>
        <span style={{ width: 3, height: 18, background: SX.orange, borderRadius: 2 }} />
        <span style={{ fontFamily: SX.body, fontSize: 16, color: SX.ink }}>Untitled Database</span>
        <span style={{ marginLeft: "auto", fontFamily: SX.ui, fontSize: 13, fontStyle: "italic", color: "#0c0c0c" }}>Unsaved</span>
      </div>
    </div>
  );
}

const CARDS: Card[] = [
  {
    heading: "Drives the tools you already use",
    sub: "Delta works inside your case manager, email, drive, and billing. It drafts the letter, updates the file, and chases the records, then your team approves.",
    checks: ["Clio, MyCase, Filevine, and more", "Drafting, updates, and follow-up", "Nothing new for your team to learn"],
    photo: IMG("4m3eTQdDWT79LXkkrcuvnF8rgA.png"),
    panel: <CodePanel />,
  },
  {
    heading: "Builds cited chronologies in minutes",
    sub: "Point Delta at a document set of a few hundred or a few thousand pages. It returns a clean medical or case chronology, every entry linked back to its source.",
    checks: ["Hundreds to thousands of pages", "Every entry cited to the record", "Med-mal and mass tort"],
    photo: IMG("Ry6zbXiksEiuvZx8ekQ8kSJYuM.png"),
    // eslint-disable-next-line @next/next/no-img-element
    panel: <img src={IMG("Gg2IiSRFyZek4fK2e0pYNUsxKEU.png")} alt="" aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-44%, -50%)", width: 442, height: "auto", borderRadius: 12, boxShadow: "0 10px 68px rgba(0,0,0,0.14)" }} />,
  },
  {
    heading: "Learns how your firm works",
    sub: "Delta builds a memory of your matters, your opposing counsel, and your preferences, so it gets sharper on every case instead of starting from zero.",
    checks: ["Firm-specific memory", "Compounds over time", "Across every active matter"],
    photo: IMG("psmbnZin0yEqHm2rJhS4fljiI.png"),
    panel: (
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-42%, -50%)", display: "flex", flexDirection: "column", gap: 22, width: 435 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG("dgH9W6cfNsvnbgJ75P4auo3Fpo.svg")} alt="" aria-hidden style={{ width: "100%", borderRadius: 12, boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG("CLSy9JR8Yrh0fnx84m8yewhIFW8.svg")} alt="" aria-hidden style={{ width: "100%", borderRadius: 12, boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }} />
      </div>
    ),
  },
];

export function AutomationSection() {
  return (
    <section style={{ background: SX.white, padding: "0 0 120px" }}>
      <Container>
        <h2 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 48, lineHeight: "55.2px", letterSpacing: "-1px", color: SX.ink, margin: 0, maxWidth: 620 }}>
          An associate that does the work, not just the answers
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 60, marginTop: 60 }}>
          {CARDS.map((c, i) => (
            <div key={c.heading} style={{ position: "relative", background: SX.card, borderRadius: 22, border: "1px solid rgba(26, 23, 18, 0.10)", boxShadow: "0 1px 3px rgba(26, 23, 18, 0.04)", height: 654, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {/* left text */}
              <div style={{ padding: "56px 40px 56px 32px", display: "flex", flexDirection: "column" }}>
                <IconChip path={ICONS[i]} />
                <h3 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 32, lineHeight: "38.4px", letterSpacing: "-0.5px", color: SX.ink, margin: "28px 0 0", maxWidth: 410 }}>{c.heading}</h3>
                <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: "16px 0 0", maxWidth: 380 }}>{c.sub}</p>
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
                  {c.checks.map((ck) => (
                    <span key={ck} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink }}><Check />{ck}</span>
                  ))}
                </div>
              </div>
              {/* right photo + panel */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.photo} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                {c.panel}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
