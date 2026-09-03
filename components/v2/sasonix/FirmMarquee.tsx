"use client";

/**
 * The firm logo scroller, directly under the hero.
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
 * The marquee itself: one track, rendered twice, translated by exactly -50% so
 * the seam lands where the second copy's first item sits under the first
 * copy's, which is what makes the loop invisible. Duration scales with the
 * item count so adding firms does not speed the belt up.
 *
 * It stops dead under prefers-reduced-motion. An infinite horizontal crawl is
 * a vestibular trigger, and this one sits above the fold where it cannot be
 * scrolled away from. The static state shows the first copy, so nothing is
 * lost, and aria-hidden on the duplicate keeps a screen reader from reading
 * every name twice.
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

function Track({ ariaHidden }: { ariaHidden?: boolean }) {
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
            color: SX.ink2,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export function FirmMarquee() {
  const duration = FIRMS.length * SECONDS_PER_ITEM;
  return (
    <section
      aria-label={CAPTION}
      style={{ background: SX.bg, borderBottom: `1px solid ${SX.hairline}`, padding: "34px 0 38px", overflow: "hidden" }}
    >
      <p
        style={{
          fontFamily: SX.mono,
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: SX.ink3,
          textAlign: "center",
          margin: "0 0 26px",
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
          <Track />
          <Track ariaHidden />
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
        .sx-marquee-belt:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .sx-marquee-belt { animation: none; }
        }
      `}</style>
    </section>
  );
}
