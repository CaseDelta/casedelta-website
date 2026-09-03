"use client";

/**
 * The firm belt. It sits INSIDE the hero, laid over the ambient photograph along
 * the bottom of the fold (Camren, 2026-09-02), rather than in a band beneath it.
 * Above the fold it is seen by everyone; below it, only by whoever scrolls.
 *
 * ══════════════════════════════════════════════════════════════════════════
 *  ⚠️  THE NAMES IN `FIRMS` BELOW ARE INVENTED. THEY ARE NOT CUSTOMERS.
 *      THEY ARE NOT PROSPECTS. NO FIRM IN THAT LIST EXISTS.
 *
 *  Camren authorised this explicitly on 2026-09-02, as a placeholder to hold
 *  the slot while real logos are cleared, and over a standing house rule that
 *  says never invent social proof. It is written down here in full because a
 *  placeholder that is not labelled becomes a fact the next person repeats:
 *  the rating in the hero was once deleted as "fabricated" by someone who
 *  believed a stale comment over the truth, and this is the same failure
 *  pointed the other way.
 *
 *  A reader cannot tell these are placeholders. Anyone can check whether a
 *  named law firm exists. Replace them before this matters.
 *
 *  TO REPLACE: swap the FIRMS array for cleared names, delete this banner, and
 *  set `caption` to whatever is then true. Nothing else changes. Using a real
 *  firm's name or mark publicly normally needs that firm's permission, so the
 *  list is a legal question before it is a design one.
 * ══════════════════════════════════════════════════════════════════════════
 *
 * It never pauses. Hovering does nothing, deliberately; see the styles below.
 *
 * The marquee itself: one track, rendered twice, translated by exactly -50% so
 * the seam lands where the second copy's first item sits under the first
 * copy's, which is what makes the loop invisible. Duration scales with the
 * item count so adding firms does not speed the belt up.
 *
 * It stops dead under prefers-reduced-motion. An infinite horizontal crawl is
 * a vestibular trigger, and over the hero it cannot be scrolled away from, so
 * this matters more here than it would in a band. The static state shows the
 * first copy, so nothing is lost, and aria-hidden on the duplicate keeps a
 * screen reader from reading every name twice.
 *
 * OVER MEDIA IT USES ITS OWN COLOUR ROLES. `onMedia` and `onMediaMuted`, never
 * `ink`, and it carries its own upward gradient rather than leaning on the
 * hero's scrim: that scrim is a left-to-right wash sized to hold the headline,
 * and it has cleared almost entirely by the right edge, which is exactly where
 * the belt still has names to keep legible.
 *
 * `overlay={false}` renders it as a standalone band on the page surface, which
 * is what it was before the move. Kept because it is two lines and it is the
 * obvious thing to want on a subpage.
 */
import { SX } from "./tokens";

/** ⚠️ INVENTED. See the banner above. Not customers. */
const FIRMS = [
  "Halloran & Pierce",
  "Brennan Trial Group",
  "Whitfield Law",
  "Marek & Sons",
  "Ashcroft Injury Law",
  "Delaney Partners",
  "Kestrel Legal",
  "Roscoe & Bright",
  "Tumelty Law Group",
  "Vance Advocates",
];

const CAPTION = "Trusted by plaintiff firms across the country";

/** Seconds per item, so the belt speed is constant as the list grows. */
const SECONDS_PER_ITEM = 4.5;

function Track({ ariaHidden, overlay }: { ariaHidden?: boolean; overlay: boolean }) {
  return (
    <div aria-hidden={ariaHidden} style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
      {FIRMS.map((name) => (
        <span
          key={name}
          style={{
            flex: "0 0 auto",
            padding: "0 34px",
            fontFamily: SX.display,
            fontWeight: 500,
            fontSize: 21,
            letterSpacing: "-0.4px",
            lineHeight: 1,
            color: overlay ? SX.onMedia : SX.ink2,
            whiteSpace: "nowrap",
            textShadow: overlay ? "0 1px 16px rgba(var(--sx-scrim-rgb),0.45)" : undefined,
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export function FirmMarquee({ overlay = true }: { overlay?: boolean } = {}) {
  const duration = FIRMS.length * SECONDS_PER_ITEM;
  return (
    <section
      aria-label={CAPTION}
      className={overlay ? "sx-marquee sx-marquee-overlay" : "sx-marquee"}
      style={
        overlay
          ? {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              padding: "26px 0 30px",
              overflow: "hidden",
              // Its own scrim. The hero's is a left-to-right wash that has
              // cleared by the right edge, where names still need to be read.
              background:
                "linear-gradient(to top, rgba(var(--sx-scrim-rgb),0.58) 0%, rgba(var(--sx-scrim-rgb),0.40) 55%, rgba(var(--sx-scrim-rgb),0) 100%)",
            }
          : {
              background: SX.bg,
              borderBottom: `1px solid ${SX.hairline}`,
              padding: "34px 0 38px",
              overflow: "hidden",
            }
      }
    >
      <p
        style={{
          fontFamily: SX.mono,
          fontSize: 11.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: overlay ? SX.onMediaMuted : SX.ink3,
          textAlign: "center",
          margin: overlay ? "0 0 18px" : "0 0 26px",
        }}
      >
        {CAPTION}
      </p>

      {/* The mask fades both ends into the page so names do not get guillotined
          at the viewport edge. */}
      <div
        className="sx-marquee-window"
        style={{
          position: "relative",
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="sx-marquee-belt" style={{ display: "flex", width: "max-content", animationDuration: `${duration}s` }}>
          <Track overlay={overlay} />
          <Track ariaHidden overlay={overlay} />
        </div>
      </div>

      <style>{`
        .sx-marquee-belt {
          animation-name: sx-marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        /* -50% is exactly one copy of the track, so the second copy arrives
           where the first began and the seam is invisible. */
        @keyframes sx-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* NO PAUSE ON HOVER (Camren, 2026-09-02). The belt sits over the hero, so
           a pointer resting anywhere near the bottom of the fold froze it, and a
           marquee that stops for no reason the reader can see looks broken rather
           than considerate. It also stalled exactly when someone was reading it.
           Do not add animation-play-state: paused back. */
        /* Short windows: the belt would eat the hero's proof line, so drop the
           caption first and the whole belt second. The headline and the ask
           always win the fold. */
        @media (max-height: 720px) {
          .sx-marquee-overlay p { display: none; }
          .sx-marquee-overlay { padding: 16px 0 18px !important; }
        }
        @media (max-height: 600px) {
          .sx-marquee-overlay { display: none; }
        }
        /* On a phone the caption is wider than the screen and gets clipped at
           both ends, which reads as a broken element rather than a quiet label. */
        @media (max-width: 560px) {
          .sx-marquee-overlay p {
            font-size: 10px;
            letter-spacing: 0.1em;
            padding: 0 16px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sx-marquee-belt { animation: none; }
        }
      `}</style>
    </section>
  );
}
