"use client";

/**
 * Delta at the centre, the firm's systems around it.
 *
 * THIS IS THE ARGUMENT, DRAWN. The sentence beside it says Delta works "in the
 * systems your firm already uses", and the whole positioning rests on Delta
 * being the thing in the middle rather than one more spoke. A hub is the only
 * picture that says that. A row of logos would say the opposite: that we are one
 * more tool in the row.
 *
 * DRAWN IN CODE, no assets. The spokes are one SVG so the lines sit under the
 * nodes and scale with the box; the nodes are HTML because text in SVG does not
 * hint or wrap and these are read, not decorative.
 *
 * EVERY NAME IS A PLATFORM DELTA ACTUALLY REACHES. This is the one thing to be
 * careful about here: a name on this diagram is a claim a firm will test by
 * asking "do you connect to X".
 *
 * Lexis was held off this diagram when it was first drawn, because nothing in the
 * repo showed Delta reaching it. It is on now, and the evidence is what changed:
 * the Rudin Law usage sweep of 2026-09-02 found Lexis AI among the nine platforms
 * that firm has connected in production. That is the bar. Add a name when the
 * connection exists, not when someone asks for it.
 * (The invented names in FirmMarquee.tsx are a separate, explicitly authorised
 * placeholder; this file is not that.)
 *
 * The ring is deliberately not exhaustive, and the paragraph beside it says so
 * outright: "whatever you need done, Delta does it in any system your firm uses".
 * Delta's onboarding is meant to reach a platform it has never seen in about five
 * minutes, so six named systems plus that sentence carry more than a complete
 * list would. Adding names to look comprehensive works against the claim.
 */
import Image from "next/image";
import { SX } from "./tokens";
import { LOGO } from "./brand";

/**
 * Ordered clockwise from twelve o'clock, and the order is not arbitrary.
 *
 * The longest labels take TOP and BOTTOM, where a pill is centred horizontally
 * and has the whole box to spread into. Indices 2 and 5 land nearest the
 * horizontal extremes, where a pill runs outward from the ring and is first to
 * cross the card edge on a narrow screen, so the two SHORTEST go there: "Lexis"
 * and "Filevine". Reorder these and check a 390px phone.
 *
 * Seven. Dropbox and Clio came off on 2026-09-02, and neither was in the nine
 * systems Rudin Law actually has connected, which is the firm all three examples
 * in the paragraph beside this come from. The ring redistributes on its own
 * because every angle is derived from NODES.length.
 *
 * "ANYTHING ELSE" IS NOT A PRODUCT and does not get to look like one. It is the
 * five-minute-onboarding claim made visible: the ring is a sample, not an
 * inventory. It renders with a dashed edge so a reader does not scan it as a
 * platform they have not heard of.
 *
 * "Gmail/Outlook" is one node rather than two because they are the same job to a
 * reader: it is where the firm's mail lives. Two nodes would spend a sixth of the
 * ring making a distinction nobody is asking about.
 */
const NODES = [
  "Gmail/Outlook",
  "QuickBooks",
  "Lexis",
  "Anything Else",
  "Google Drive",
  "Filevine",
  "Lead Docket",
];

/** Not a product. Rendered differently on purpose; see CATEGORY_NODE below. */
const CATEGORY = "Anything Else";

/** One full ripple, hub to past the ring. Slow on purpose: this sits beside a
 *  paragraph somebody is meant to read. */
const RIPPLE = 5.4;

const SIZE = 420;
const R = 168; // node ring radius
const HUB = 74; // hub diameter

/** Node centre, in percent of the box, clockwise from 12 o'clock. */
function pos(i: number, n: number) {
  const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + (Math.cos(angle) * R * 100) / SIZE,
    y: 50 + (Math.sin(angle) * R * 100) / SIZE,
  };
}

export function HubSpokes() {
  return (
    <div className="sx-hub" aria-hidden style={{ position: "relative", flex: "0 0 auto" }}>
      {/* Spokes and the two guide rings, under everything. */}
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R * 0.62} fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
        {/* The ripple: one ring leaving the hub and fading as it passes the
            systems. Two of them, half a cycle apart, so the movement is
            continuous without ever being fast. */}
        {[0, 1].map((n) => (
          <circle
            key={n}
            className="sx-hub-ripple"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke={SX.accentOnMedia}
            strokeWidth="1"
            style={{ animationDelay: `${n * (RIPPLE / 2)}s` }}
          />
        ))}
        {NODES.map((name, i) => {
          const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          // Start outside the hub and stop short of the node, so the line never
          // runs under either and needs no masking.
          const x1 = SIZE / 2 + Math.cos(a) * (HUB / 2 + 6);
          const y1 = SIZE / 2 + Math.sin(a) * (HUB / 2 + 6);
          const x2 = SIZE / 2 + Math.cos(a) * (R - 20);
          const y2 = SIZE / 2 + Math.sin(a) * (R - 20);
          return (
            <line
              key={name}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          );
        })}
      </svg>

      {/* The hub: brand fill, the mark on it, and the one coloured thing in the
          card. It carried the word "Delta" until 2026-09-02; the mark says the
          same thing without repeating a word the paragraph beside it has already
          used twice, and a logo at the centre of a hub is the whole point of
          drawing a hub.

          LOGO.mark, not LOGO.onDark. onDark is the full lockup at 1860x567 and
          would have to shrink to about 12px tall to fit a 74px circle, which is
          unreadable. The mark is square and made for this. It is white with no
          swoosh, which is why it needs the accent fill under it. */}
      <div
        className="sx-hub-core"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: HUB,
          height: HUB,
          marginLeft: -HUB / 2,
          marginTop: -HUB / 2,
          borderRadius: "50%",
          background: SX.accent,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Image
          src={LOGO.mark}
          alt=""
          width={LOGO.markSize}
          height={LOGO.markSize}
          /* 46 of 74 leaves the mark breathing inside the circle. The delta is a
             wide triangle, so it optically fills more than a square glyph would
             at the same box size; sized up it crowds the edge. */
          style={{ width: 46, height: 46, objectFit: "contain", display: "block" }}
        />
      </div>

      {NODES.map((name, i) => {
        const { x, y } = pos(i, NODES.length);
        return (
          <span
            key={name}
            className={name === CATEGORY ? "sx-hub-node sx-hub-node-any" : "sx-hub-node"}
            style={{ position: "absolute", left: `${x}%`, top: `${y}%` }}
          >
            {name}
          </span>
        );
      })}

      <style>{`
        .sx-hub-node {
          transform: translate(-50%, -50%);
          white-space: nowrap;
          font-family: var(--sx-geist), 'Geist Placeholder', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          line-height: 1;
          color: var(--sx-on-media);
          background: rgba(255, 255, 255, 0.09);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          padding: 8px 13px;
          backdrop-filter: blur(2px);
        }

        /* The category node is a promise, not a product, so it reads as an open
           slot: dashed edge, no fill. Same size and position logic as the rest,
           because it is still one of the seven. */
        .sx-hub-node-any {
          background: transparent;
          border-style: dashed;
          border-color: rgba(255, 255, 255, 0.30);
          color: var(--sx-on-media-muted);
        }

        /* ── The animation ──
           A ring leaves the hub and fades as it passes the systems. That is all.

           IT WAS A TRAVELLING DOT PER SPOKE and Camren hated it, which is fair:
           seven beads crawling outward is fussy, it draws the eye away from the
           sentence next to it, and at any moment a reader is counting objects
           rather than reading. Do not put them back.

           The ripple keeps the one thing the dots got right, which is that the
           motion goes OUTWARD from Delta. Inward would say the systems feed
           Delta, the shape of every other tool in this market. Outward is Delta
           going to the work.

           Scale, not the r attribute: a transform runs on the compositor and
           costs nothing, where animating r relayouts the circle every frame.
           transform-box and transform-origin put the growth at the hub centre in
           viewBox units, so it survives the diagram being resized on a phone. */
        .sx-hub-ripple {
          transform-box: view-box;
          transform-origin: ${SIZE / 2}px ${SIZE / 2}px;
          animation: sx-hub-ripple ${RIPPLE}s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
        }
        @keyframes sx-hub-ripple {
          0%   { transform: scale(${(HUB / 2 / R).toFixed(3)}); stroke-opacity: 0; }
          12%  { stroke-opacity: 0.42; }
          100% { transform: scale(1.16); stroke-opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sx-hub-ripple { animation: none; stroke-opacity: 0; }
        }

        /* THE BOX SHRINKS, IT DOES NOT SCALE. transform: scale() only changes
           what is painted; the element still occupies 420px, so on a 390px phone
           the right-hand nodes were laid out past the card edge and clipped while
           looking, in the styles, as though they had been handled.

           width is a min() and the aspect ratio holds it square, so the SVG and
           every node position, which are percentages, follow on their own. A hub
           with its nodes reflowed is not a hub, so it never wraps. */
        .sx-hub {
          width: min(420px, 100%);
          aspect-ratio: 1;
          margin: 0 auto;
        }

        /* Only the pills are fixed-size, so only the pills need a breakpoint. At
           the ring radius a full-width "QuickBooks" runs past the box edge once
           the box is under about 380px. */
        @media (max-width: 600px) {
          .sx-hub-node { font-size: 11px; padding: 6px 9px; }
        }
      `}</style>
    </div>
  );
}
