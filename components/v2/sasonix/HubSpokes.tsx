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
 * asking "do you connect to X". Camren's list when he asked for this included
 * Lexis, which is left out because nothing in the repo shows Delta reaching it,
 * unlike the six below. Add a name when the connection exists, not before.
 * (The invented names in FirmMarquee.tsx are a separate, explicitly authorised
 * placeholder; this file is not that.)
 *
 * The ring is deliberately not exhaustive, and the paragraph beside it says so
 * outright: "whatever you need done, Delta does it in any system your firm uses".
 * Delta's onboarding is meant to reach a platform it has never seen in about five
 * minutes, so six named systems plus that sentence carry more than a complete
 * list would. Adding names to look comprehensive works against the claim.
 */
import { SX } from "./tokens";

/**
 * Ordered clockwise from twelve o'clock, and the order is not arbitrary.
 *
 * The longest labels take TOP and BOTTOM, where a pill is centred horizontally
 * and has the whole box to spread into. The sides are where a pill runs outward
 * from the ring and is the first thing to cross the card edge on a narrow screen,
 * so the short ones go there. Reorder these and check a 390px phone.
 *
 * Six, not eight. Dropbox and Clio came off on 2026-09-02 (Camren), and the ring
 * redistributes on its own because every angle is derived from NODES.length.
 * Worth knowing: neither was in the nine systems Rudin Law actually has
 * connected, and this diagram sits beside a paragraph whose three examples all
 * come from that firm. The six here are closer to a real stack than the eight
 * were.
 *
 * "Gmail/Outlook" is one node rather than two because they are the same job to a
 * reader: it is where the firm's mail lives. Two nodes would spend a sixth of the
 * ring making a distinction nobody is asking about.
 */
const NODES = [
  "Gmail/Outlook",
  "QuickBooks",
  "SharePoint",
  "Google Drive",
  "Lead Docket",
  "Filevine",
];

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
              stroke="rgba(255,255,255,0.20)"
              strokeWidth="1"
              strokeDasharray="3 4"
              className="sx-hub-spoke"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          );
        })}
      </svg>

      {/* The hub. Brand fill, so the centre is the one coloured thing in the card. */}
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
          fontFamily: SX.display,
          fontWeight: 500,
          fontSize: 19,
          letterSpacing: "-0.3px",
          color: SX.onAccent,
        }}
      >
        Delta
      </div>

      {NODES.map((name, i) => {
        const { x, y } = pos(i, NODES.length);
        return (
          <span
            key={name}
            className="sx-hub-node"
            style={{ position: "absolute", left: `${x}%`, top: `${y}%`, animationDelay: `${0.15 + i * 0.07}s` }}
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

        /* The spokes pulse outward one after another, slowly. It reads as traffic
           rather than decoration, and at 3.2s a cycle it is background motion
           instead of something competing with the sentence beside it. */
        .sx-hub-spoke {
          animation: sx-hub-pulse 3.2s ease-in-out infinite;
        }
        @keyframes sx-hub-pulse {
          0%, 70%, 100% { stroke-opacity: 0.35; }
          35% { stroke-opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sx-hub-spoke { animation: none; stroke-opacity: 0.6; }
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
