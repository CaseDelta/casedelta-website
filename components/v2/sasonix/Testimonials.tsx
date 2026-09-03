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
 * is Kirschbaum & Nowotny, LLC of Overland Park, KS, and it also carries the hero, so
 * the same voice appears twice on the homepage. Worth fixing when a second real quote
 * arrives.
 *
 * ONE EXCEPTION EXISTS ON THIS PAGE AND IT IS NOT THIS FILE. The firm names in
 * FirmMarquee.tsx ARE invented, on Camren's explicit instruction of 2026-09-02, as a
 * placeholder until real logos are cleared. That file opens with a banner saying so.
 * Nothing here is a placeholder, and the rule above still governs this file.
 *
 * THIS SECTION AND SecondProof ARE DELIBERATELY TWO SECTIONS. They were briefly
 * merged into one two-card marquee on 2026-09-02 and Camren reverted it the same day:
 * the quotes do different jobs in different places. Recker lands immediately after
 * AutomationSection, as evidence for the capability claim just made. Poletti lands
 * after pricing, as the last word before the ask. Merging them puts both arguments in
 * one place and leaves the back half of the page with no voice in it.
 *
 * CARRIES JAMES RECKER since 2026-08-28.
 *
 * IT OPENS "IT", NOT "DELTA" (Camren, 2026-09-02). The card sits under a heading
 * that has just named Delta twice, so the third naming in three lines read as
 * branding rather than as a person talking. "It" is also how a customer actually
 * refers to a tool they use daily, and it keeps the house rule that Delta is
 * always "it" and never gendered.
 *
 * Worth stating plainly, since this is inside quotation marks attributed to a
 * named person: this is a one-word substitution that changes no meaning, made on
 * the founder's instruction. Anything beyond that class of edit needs the source's
 * sign-off. Never tighten a quote to make it land better.
 *
 * THREE WORDS ARE DOING ALL THE WORK IN THIS QUOTE and none of them is decoration:
 *   "signed into"    -> the database is behind a paid login. That is the whole
 *                       differentiator. Every other legal AI researches the public
 *                       web; this one works inside the subscriptions the firm has.
 *   "no fusion"      -> an exclusion that breaks a keyword search. It proves Delta
 *                       understood the medicine rather than matched a string.
 *   "today's dollars"-> the CPI adjustment, which is what makes an old verdict
 *                       usable in a live negotiation.
 * Cut any one of them and the sentence collapses into "it does legal research",
 * which is what EvenUp's homepage says.
 *
 * "VERDICT DATABASE", NOT "QUANTUM DATABASE". Quantum is the native word in
 * Louisiana, where this happened, and Rudin's own attorneys use it. It is not native
 * to a PI attorney in Arizona or Kansas, and this page is national.
 *
 * WHAT IT IS GROUNDED IN. Lee Rudin asked CompQuantum, through Delta, for the
 * highest results in his circuit involving a two-level lumbar surgery excluding
 * fusions. Delta returned five, CPI-adjusted (Brock v. Singleton: $590,000 general
 * damages, adjusted to $881,613), broken out by damage category, cross-verified the
 * citation against Leagle, and flagged that CompQuantum's own source-document link
 * was dead before he relied on it. It renders in one of three
 * ways depending on how many there are, so the section is always honest about the
 * supply rather than dressing one quote up as a wall of them:
 *   0 quotes  -> nothing at all
 *   1 quote   -> a single centred pull quote on ambient imagery
 *   2 or more -> the auto-scrolling marquee this file was originally built for
 * A marquee of one card that loops past the same sentence every twenty seconds
 * advertises that there is only one. The single treatment does not.
 *
 * TO ADD ONE: append to CARDS. That is the whole change; the layout follows. The
 * highest-value one to go get is a named attorney or firm administrator on record
 * about their first hour with Delta.
 *
 * NEVER INVENT ONE. See CLAUDE.md: two fabricated quotes shipped here once and a
 * real one was later deleted as "fabricated" and had to be restored.
 *
 * THE `stat` LINE BELONGS TO WHOEVER IS QUOTED, and it moved with them. It is
 * Kirschbaum & Nowotny's usage, so it now sits under their quote in SecondProof.tsx,
 * where the measurement and the caveats are recorded. Never attach it to a different
 * firm's quote; there is no data behind it for anyone else.
 *
 * IT ALSO UNDERSTATES REAL USE, deliberately. Scheduled automations run without
 * anyone typing and are not in this count at all.
 */
import { SX, STAR_GOLD } from "./tokens";
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
export type Testimonial = { quote: string; name: string; title?: string; bg: string; stat?: string };

const CARDS: Testimonial[] = [
  {
    quote:
      "It signed into the verdict database we pay for and pulled the five biggest results in my circuit for a two-level lumbar with no fusion, in today's dollars.",
    name: "James Recker",
    // No `title`: nobody has given us his firm or city, and the caption renders the
    // name alone rather than inventing one. Fill it in when we have it.
    bg: "/v2/ambient/cloud-pastel.webp",
  },
];

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

/**
 * One quote, given room, rather than a loop that keeps returning to it.
 *
 * EXPORTED, because SecondProof renders the second testimonial and Camren asked for
 * the two to match. Sharing the component is the point: a copy would drift the first
 * time either one is restyled, and two testimonials in different treatments on one
 * page reads as an oversight rather than a design. Pass a different `bg` so they are
 * not the same photograph twice.
 */
export function QuoteCard({ c }: { c: Testimonial }) {
  return (
    <section style={{ background: SX.surface, padding: "60px 0 60px" }}>
      <Container>
        <Reveal>
          <div style={{ position: "relative", maxWidth: 940, margin: "0 auto", borderRadius: 24, overflow: "hidden", border: `1px solid ${SX.hairline}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.bg} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(var(--sx-scrim-rgb),0.38) 0%, rgba(var(--sx-scrim-rgb),0.66) 100%)" }} />
            <figure className="sx-tm-single" style={{ position: "relative", zIndex: 1, margin: 0, textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 26 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={STAR_GOLD} aria-hidden>
                    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote style={{ margin: 0, fontFamily: SX.display, fontWeight: 500, fontSize: "clamp(26px, 3.4vw, 40px)", lineHeight: 1.25, letterSpacing: "-0.8px", color: SX.onMedia }}>
                &ldquo;{c.quote}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: 28, fontFamily: SX.body, fontSize: 16, lineHeight: "24px", color: SX.onMediaMuted }}>
                <span style={{ fontWeight: 600, color: SX.onMedia }}>{c.name}</span>
                {c.title && (
                  <>
                    <span aria-hidden style={{ margin: "0 8px" }}>&middot;</span>
                    {c.title}
                  </>
                )}
              </figcaption>
              {c.stat && <p className="sx-tm-stat">{c.stat}</p>}
            </figure>
          </div>
        </Reveal>
      </Container>
      <style>{`
        .sx-tm-single { padding: 84px 64px; }
        .sx-tm-stat {
          margin: 18px 0 0;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 15px;
          line-height: 23px;
          color: var(--sx-on-media-muted);
        }
        @media (max-width: 760px) { .sx-tm-single { padding: 52px 26px; } }
      `}</style>
    </section>
  );
}

export function Testimonials() {
  // No real quotes, no section. An empty marquee under "Real stories from teams using
  // CaseDelta" is worse than no marquee.
  if (CARDS.length === 0) return null;
  if (CARDS.length === 1) return <QuoteCard c={CARDS[0]} />;

  const track = [...CARDS, ...CARDS];
  return (
    <section style={{ background: SX.surface, padding: "60px 0 60px", overflow: "hidden" }}>
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
