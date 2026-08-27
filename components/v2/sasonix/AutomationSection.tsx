"use client";

/**
 * "What Delta is": the thesis line, then three stacked capability cards. Each card
 * is a 50/50 split: left is a 54px icon chip, an Archivo 32px heading, the claim in
 * prose and a three-item checklist; right is an ambient photograph with a product
 * panel floating over the seam between the halves.
 *
 * THE PANELS ARE DRAWN IN CODE, in ProductPanels.tsx. They used to be the Sasonix
 * template's stock product shots, which showed a database schema of order_id and
 * products.id, a token-usage bar chart naming four foundation models, and a tile
 * counting API credits. That artwork survived the clone-fidelity phase, the rebrand
 * from orange to blue, and the promotion of this page to the homepage, illustrating
 * a developer SaaS on the largest section of a site that sells to personal injury
 * firms. Do not reintroduce stock product imagery here: if a panel needs to change,
 * it is a React component and it is edited as one.
 *
 * THE PHOTOGRAPHS are the site's own ambient set, self-hosted in /v2/ambient. The
 * three warm desert and Yosemite shots that used to sit here came with the template
 * and fought the blue brand; the ambient set is the one coherent family across the
 * hero, this section and the two banded sections. Pick ones not already spoken for:
 * mountain is the hero, water-dark is HowItWorks, forest-dark is Trust.
 */
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";
import { ComputerPanel, MemoryPanel, ProductPanelStyles, TeammatePanel } from "./ProductPanels";

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SX.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconChip({ path }: { path: React.ReactNode }) {
  return (
    <span style={{ display: "grid", placeItems: "center", width: 54, height: 54, borderRadius: 12, background: SX.surface, border: `1px solid ${SX.hairline}` }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={SX.accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{path}</svg>
    </span>
  );
}

const ICONS = [
  <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h6v6H9z" /></>,
  <><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="18" cy="17" r="2.5" /></>,
  <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></>,
];

type Card = { heading: string; sub: string[]; checks: string[]; photo: string; panel: React.ReactNode };

const CARDS: Card[] = [
  {
    heading: "A computer of its own",
    sub: [
      "Delta has a computer of its own in the cloud, so work does not stall when you step away.",
      "It can sign in and work across apps, tools, and websites, including the ones with no clean API, and come back with the work finished.",
    ],
    checks: ["Your case system", "Your inbox, calendar and files", "Even where there is no API"],
    photo: "/v2/ambient/horizon-blue.webp",
    panel: <ComputerPanel />,
  },
  {
    heading: "Message it like a teammate",
    sub: [
      "You can message Delta the way you would text someone on your team.",
      "Other legal AI tools may ask you to set up and build workflows first.",
      "With Delta, simply message it to take on a task and it gets it done.",
    ],
    checks: ["Nothing to set up", "Nothing new to learn", "Ask in plain English"],
    photo: "/v2/ambient/valley-mist.webp",
    panel: <TeammatePanel />,
  },
  {
    heading: "Trust it with more over time",
    sub: [
      "Delta is a teammate that gets sharper over time.",
      "It keeps context on how you like work done.",
      "After a few files it picks up your voice, your edge cases, and knows when to ask versus keep going.",
    ],
    checks: ["Learns how your firm works", "Knows when to ask you", "That knowledge stays when people leave"],
    photo: "/v2/ambient/meadow-light.webp",
    panel: <MemoryPanel />,
  },
];

export function AutomationSection() {
  return (
    <section id="features" style={{ background: SX.surface, padding: "60px 0 60px" }}>
      <ProductPanelStyles />
      <Container>
        {/* The plain-language definition, set at hero scale and centered. It is the
            one place on the page that states the whole product in a breath, so it
            is deliberately larger than a section heading and carries no eyebrow. */}
        <Reveal>
          <h2 className="sx-thesis">
            Delta is an AI paralegal with its own cloud computer. It signs into your tools, runs multi-step work
            end-to-end like a human, and can even run tasks you approve without you prompting it.
          </h2>
          {/* Who it is for. This line was lost when BrandStrip was deleted, and until it
              came back the page said "AI paralegal" without ever naming the buyer. It sits
              under the thesis rather than above it because the thesis is staged to land
              alone, and it stays quiet because it qualifies the claim, it does not make one. */}
          <p className="sx-thesis-icp">
            Purpose-built for personal injury, mass tort, and medical malpractice firms.
          </p>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 60, marginTop: 60 }}>
          {CARDS.map((c, i) => (
            <Reveal key={c.heading} amount={0.2} className="sx-cap-card" style={{ position: "relative", background: SX.surfaceAlt, borderRadius: 22, border: "1px solid rgba(var(--sx-shadow-rgb), 0.10)", boxShadow: "0 1px 3px rgba(var(--sx-shadow-rgb), 0.04)", overflow: "hidden" }}>
              {/* left text */}
              <div className="sx-cap-copy">
                <IconChip path={ICONS[i]} />
                <h3 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 32, lineHeight: "38.4px", letterSpacing: "-0.5px", color: SX.ink, margin: "28px 0 0", maxWidth: 410 }}>{c.heading}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "16px 0 0", maxWidth: 380 }}>
                  {c.sub.map((line) => (
                    <p key={line} style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 16, lineHeight: "25.6px", color: SX.ink2, margin: 0 }}>{line}</p>
                  ))}
                </div>
                <div className="sx-cap-checks">
                  {c.checks.map((ck) => (
                    <span key={ck} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink }}><Check />{ck}</span>
                  ))}
                </div>
              </div>
              {/* right photo + panel */}
              <div className="sx-cap-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.photo} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                {c.panel}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`
        /* Two halves at full width; the panel floats over the seam between them.
           The fixed height is what lets the checklist sit on the card's floor and
           the photo fill its half edge to edge. */
        .sx-cap-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 654px;
        }
        .sx-cap-copy { padding: 56px 40px 56px 32px; display: flex; flex-direction: column; }
        .sx-cap-checks { margin-top: auto; display: flex; flex-direction: column; gap: 14px; }
        .sx-cap-media { position: relative; overflow: hidden; }

        /* Below the split the card STACKS: copy first, then the photo with the panel
           centred in it. The card's height goes to auto, because a fixed 654 with one
           column crushed the copy and clipped it mid-sentence, which is how this
           section rendered on every phone until 2026-08-27.

           position: RELATIVE, not static, and this is not cosmetic. The backdrop
           photograph is position: absolute in the same box, and an absolutely
           positioned element paints above every non-positioned sibling, so a static
           panel here renders completely behind the photo: the whole panel disappears
           and only its SVG glyphs show through. It looked like the panel had failed to
           render. Keep the panel positioned and keep it above the photo. */
        @media (max-width: 1040px) {
          .sx-cap-card { grid-template-columns: 1fr; height: auto; }
          .sx-cap-copy { padding: 40px 32px 36px; }
          .sx-cap-checks { margin-top: 28px; }
          .sx-cap-media { min-height: 0; padding: 44px 0; }
          .sx-panel-float {
            position: relative;
            z-index: 1;
            top: auto;
            left: auto;
            transform: none;
            display: flex;
            justify-content: center;
          }
        }

        /* Narrower than the panel's own 434px, so it is zoomed rather than reflowed:
           the layout inside it is tuned at that width and squeezing it breaks the form
           grid and the chat bubble. zoom, not transform: scale, because zoom shrinks
           the box the panel occupies, and a scale would leave its original height
           behind as a band of empty photograph. */
        @media (max-width: 520px) {
          .sx-cap-copy { padding: 32px 22px 30px; }
          .sx-cap-media { padding: 34px 0; }
          .sx-panel-float { zoom: 0.88; }
        }
        @media (max-width: 460px) { .sx-panel-float { zoom: 0.72; } }
        @media (max-width: 400px) { .sx-panel-float { zoom: 0.64; } }

        .sx-thesis-icp {
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          color: var(--sx-ink-2);
          text-align: center;
          max-width: 620px;
          margin: 22px auto 0;
        }
        @media (max-width: 760px) { .sx-thesis-icp { font-size: 16px; line-height: 25px; margin-top: 18px; } }

        .sx-thesis {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
          font-family: var(--sx-archivo), sans-serif;
          font-weight: 500;
          font-size: 44px;
          line-height: 56px;
          letter-spacing: -1.2px;
          color: var(--sx-ink);
          text-wrap: balance;
        }
        @media (max-width: 1100px) { .sx-thesis { font-size: 36px; line-height: 46px; } }
        @media (max-width: 760px)  { .sx-thesis { font-size: 28px; line-height: 37px; letter-spacing: -0.6px; } }
      `}</style>
    </section>
  );
}
