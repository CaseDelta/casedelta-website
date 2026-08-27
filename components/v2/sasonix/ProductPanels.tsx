"use client";

/**
 * The three product panels that float over the photography in AutomationSection.
 *
 * WHAT THEY REPLACED
 *   The Sasonix template's own stock product shots, kept through the clone-fidelity
 *   phase and never migrated: an "Untitled Database" of order_id and products.id in
 *   DBML, a "Token Breakdown" bar chart, a tile counting API credits and latency
 *   behind a GitHub glyph. On a page selling an AI paralegal to a personal injury
 *   firm they illustrated a product nobody was buying, and the token chart printed
 *   the names of four foundation models, which our copy discipline says never to put
 *   in front of a customer.
 *
 * SIMPLE IS THE REQUIREMENT, not a preference (Camren, 2026-08-27). The first pass at
 * these was faithful to the app and too dense to read at a glance: a chat transcript
 * with tool steps, a memory list with provenance lines, a form with four fields. A
 * panel on a marketing page gets about two seconds. Each one now makes ONE point with
 * the fewest elements that can make it:
 *     1. BrowserPanel  Delta inside the platform the firm already runs, typing into
 *                      a field. Named tabs, one case, one field.
 *     2. AsksPanel     four things a lawyer actually types. No replies.
 *     3. LearnedPanel  four things Delta has picked up. One line each.
 *   Adding a row, a column or a second panel undoes the note above.
 *
 * THE ASKS ARE REAL, taken from what an attorney and a director of operations at a
 * live personal injury firm ran in production in August 2026, shortened and stripped
 * of client and matter names. They are not invented, and that is the point: they are
 * the shape of question this buyer already has. The originals were a records lookup
 * inside a case file, a liability scan across the whole docket, a reverse docket
 * cashflow question, and a medical treatment timeline. Replace one only with another
 * real one, from the same place.
 *
 * PLATFORM NAMES APPEAR HERE ON PURPOSE, as tab text and never as logos. The rule
 * against vendor logos in HowItWorks still stands and this is a different job: the
 * card claims Delta works inside the tools the firm already runs, and until the panel
 * named one, the claim had nothing to land on.
 *
 * WHY CODE AND NOT IMAGES
 *   Every colour is an SX token, so the panels re-tint with the brand and /?theme=dark
 *   renders correctly instead of showing a light PNG on a dark page, which is how the
 *   old artwork failed after the brand went blue. They also stay crisp at any density
 *   and cost no image bytes.
 *
 * CLIENT AND MATTER NAMES ARE FICTIONAL. Do not put a real client or a real matter on
 * the marketing site.
 */
import { SX } from "./tokens";

/* --------------------------------------------------------------------------- */
/* Shell                                                                        */
/* --------------------------------------------------------------------------- */

/** One width for all three, so the three cards feel like one product. */
const W = 434;

/**
 * The floating panel shell. Sits over photography, so it carries a real elevation
 * shadow plus a hairline: the shadow alone lets a light panel dissolve into a pale
 * sky, which is what happens over the horizon-blue backdrop on card one.
 */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: W,
        borderRadius: 14,
        background: SX.surface,
        border: `1px solid ${SX.hairline}`,
        boxShadow: `${SX.sh(26, 70, 0.2)}, ${SX.sh(2, 6, 0.06)}`,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/** Header band. Same height on every panel so the three agree when scrolled past. */
function Head({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 15px",
        background: SX.surfaceAlt,
        borderBottom: `1px solid ${SX.hairline}`,
      }}
    >
      {children}
    </div>
  );
}

const titleStyle: React.CSSProperties = {
  fontFamily: SX.body,
  fontSize: 13.5,
  fontWeight: 600,
  letterSpacing: "-0.1px",
  color: SX.ink,
};

/** Small print: the label and the timer. Mono, because the app sets them so. */
const metaStyle: React.CSSProperties = {
  fontFamily: SX.mono,
  fontSize: 10.5,
  letterSpacing: "-0.2px",
  color: SX.ink3,
};

/**
 * The CaseDelta mark, cropped out of the lockup rather than redrawn.
 *
 * The two cuts are the same 1860x567 artwork and the mark occupies x 0..646 of it
 * (measured, not guessed), so a box of that aspect with the image laid in at full
 * height shows the mark and clips the wordmark. Redrawing it as inline SVG was the
 * alternative and it is worse: a hand-traced approximation of a logo reads as a
 * slightly wrong logo, which is more damaging than no logo at all.
 *
 * Both cuts ship. The dark theme swaps them in CSS, because the ink cut vanishes on a
 * dark surface and picking by theme at render time would need client state.
 */
const MARK_W = 646;
const MARK_H = 566;
const LOCKUP_W = 1860;
const LOCKUP_H = 567;

function DeltaMark({ size = 17 }: { size?: number }) {
  const w = Math.round((MARK_W / MARK_H) * size);
  const common: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: (LOCKUP_W / LOCKUP_H) * size,
    height: size,
    maxWidth: "none",
  };
  return (
    <span
      aria-hidden
      style={{ position: "relative", display: "inline-block", width: w, height: size, overflow: "hidden", flex: "0 0 auto" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sx-mark-ink" src="/assets/branding/trimmed-logo.png" alt="" style={common} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sx-mark-white" src="/assets/branding/trimmed-logo-white.png" alt="" style={{ ...common, display: "none" }} />
    </span>
  );
}

/** A dot with a ring going out of it. The only motion here, and it says "right now". */
function LiveDot({ size = 7 }: { size?: number }) {
  return (
    <span aria-hidden style={{ position: "relative", display: "inline-flex", width: size, height: size, flex: "0 0 auto" }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: SX.accent }} />
      <span className="sx-livedot-ring" style={{ position: "absolute", inset: 0, borderRadius: 999, background: SX.accent }} />
    </span>
  );
}

/* --------------------------------------------------------------------------- */
/* 1. A computer of its own                                                     */
/* --------------------------------------------------------------------------- */

/**
 * Delta inside the firm's own case system, typing into a field.
 *
 * The tabs carry the whole claim. A lawyer reads names they recognise, sees a case
 * and a field they recognise under them, and the sentence beside the panel stops
 * being a promise about software and starts being a picture of their Tuesday. The
 * cursor is the element that says Delta is the one typing, so keep it.
 *
 * The tab set is Camren's, 2026-08-27. Two case systems in one window is not what a
 * real firm's browser looks like; the row reads as "the platforms firms use" rather
 * than "one firm's tabs", and naming more than one is what makes that read work.
 */
const TABS = ["Filevine", "CasePeer", "Lead Docket", "Outlook"];

function BrowserPanel() {
  return (
    <Panel>
      {/* chrome */}
      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          padding: "0 12px",
          background: SX.surfaceAlt,
          borderBottom: `1px solid ${SX.hairline}`,
        }}
      >
        <span style={{ display: "flex", gap: 5, paddingBottom: 12 }} aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: 999, background: SX.hairline }} />
          ))}
        </span>
        <span style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          {TABS.map((t, i) => (
            <span
              key={t}
              style={{
                fontFamily: SX.body,
                fontSize: 11,
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? SX.ink : SX.ink3,
                background: i === 0 ? SX.surface : "transparent",
                border: `1px solid ${i === 0 ? SX.hairline : "transparent"}`,
                borderBottomColor: i === 0 ? SX.surface : "transparent",
                borderRadius: "7px 7px 0 0",
                padding: "7px 10px 8px",
                marginBottom: -1,
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </span>
          ))}
        </span>
      </div>

      {/* one case, one field, being filled in */}
      <div style={{ padding: "18px 18px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: SX.body, fontSize: 14.5, fontWeight: 600, color: SX.ink }}>Morales, Elena</span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 21,
              padding: "0 9px",
              borderRadius: 999,
              background: SX.accentSoft,
              fontFamily: SX.body,
              fontSize: 10.5,
              fontWeight: 600,
              color: SX.accentText,
              whiteSpace: "nowrap",
            }}
          >
            In treatment
          </span>
        </div>

        <div
          style={{
            marginTop: 16,
            fontFamily: SX.body,
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: SX.ink3,
          }}
        >
          Case status note
        </div>

        <div style={{ position: "relative", marginTop: 7 }}>
          <div
            style={{
              minHeight: 62,
              padding: "10px 12px",
              borderRadius: 9,
              border: `1px solid ${SX.accent}`,
              boxShadow: `0 0 0 3px ${SX.accentSoft}`,
              background: SX.surface,
              fontFamily: SX.body,
              fontSize: 12.5,
              lineHeight: "20px",
              color: SX.ink,
            }}
          >
            Records received from Northgate. Ready to draft demand.
            <span
              className="sx-caret"
              aria-hidden
              style={{ display: "inline-block", width: 1.5, height: 13, background: SX.ink, marginLeft: 3, verticalAlign: "-2px" }}
            />
          </div>

          {/* the cursor: this is the element that says Delta is the one typing */}
          <span style={{ position: "absolute", right: 30, bottom: -17, display: "flex", alignItems: "flex-start", gap: 4 }} aria-hidden>
            <svg width="15" height="18" viewBox="0 0 16 19" fill="none">
              <path d="M1 1.2 14 9.4 8.1 10.6 5.9 16.6z" fill={SX.surface} stroke={SX.ink} strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                marginTop: 9,
                padding: "2px 7px",
                borderRadius: 5,
                background: SX.ink,
                color: SX.onInk,
                fontFamily: SX.body,
                fontSize: 9.5,
                fontWeight: 600,
              }}
            >
              Delta
            </span>
          </span>
        </div>
      </div>

      {/* one line of status, and it names the platform */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          height: 42,
          padding: "0 15px",
          background: SX.surfaceAlt,
          borderTop: `1px solid ${SX.hairline}`,
        }}
      >
        <LiveDot />
        <span style={{ fontFamily: SX.body, fontSize: 12, color: SX.ink }}>Signed in and working in Filevine</span>
        <span style={{ ...metaStyle, marginLeft: "auto" }}>01:12</span>
      </div>
    </Panel>
  );
}

/* --------------------------------------------------------------------------- */
/* 2. Message it like a teammate                                                */
/* --------------------------------------------------------------------------- */

/**
 * Four things a lawyer types, and nothing else.
 *
 * No replies, no tool steps, no timestamps. The card's claim is that there is nothing
 * to set up and nothing to learn, so the panel has to be readable in the time it takes
 * to scroll past it, and the fastest way to prove "ask in plain English" is four
 * sentences of plain English.
 *
 * Their spread is deliberate: one document lookup, one docket-wide scan, one cashflow
 * question, one records job. See the note at the top of the file on where they came
 * from and what may replace them.
 */
const ASKS = [
  "Find the lumbar MRI in the Ross file and tell me what it says.",
  "Scan the docket and flag any case with a liability problem.",
  "How much fee is sitting in negotiations right now?",
  "Build a treatment timeline from her medical records.",
];

function AsksPanel() {
  return (
    <Panel>
      <Head>
        <DeltaMark size={16} />
        <span style={titleStyle}>Delta</span>
      </Head>

      <div style={{ padding: "16px 15px 14px", display: "flex", flexDirection: "column", gap: 9 }}>
        {ASKS.map((a) => (
          <div
            key={a}
            style={{
              alignSelf: "flex-start",
              padding: "10px 14px",
              borderRadius: "5px 14px 14px 14px",
              background: SX.accentSoft,
              border: `1px solid ${SX.hairline}`,
              fontFamily: SX.body,
              fontSize: 13,
              lineHeight: "20px",
              color: SX.ink,
            }}
          >
            {a}
          </div>
        ))}
      </div>

      {/* the composer, because the whole interface is one box */}
      <div style={{ padding: "0 13px 13px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            height: 44,
            padding: "0 8px 0 14px",
            borderRadius: 32,
            background: SX.surface,
            border: `1px solid ${SX.hairline}`,
            boxShadow: SX.sh(1, 3, 0.04),
          }}
        >
          <span style={{ fontFamily: SX.body, fontSize: 12.5, color: SX.ink3 }}>Message Delta...</span>
          <span className="sx-caret" aria-hidden style={{ width: 1.5, height: 15, background: SX.ink3, marginLeft: -7 }} />
          <span
            aria-hidden
            style={{
              marginLeft: "auto",
              display: "grid",
              placeItems: "center",
              width: 30,
              height: 30,
              borderRadius: 999,
              background: SX.ink,
              color: SX.onInk,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Panel>
  );
}

/* --------------------------------------------------------------------------- */
/* 3. Trust it with more over time                                              */
/* --------------------------------------------------------------------------- */

/**
 * Four things Delta has picked up about the firm. One line each, nothing else.
 *
 * This was two stacked panels with expandable rows, provenance lines and a set of
 * option chips, and it was the densest thing on the page. The claim is small and does
 * not need any of that: house rules Delta was never configured with, and the last one
 * is the approval gate, which is the objection this section exists to answer.
 *
 * The yymmdd rule is real. A director of operations at a live firm told Delta to
 * remember exactly that in production, and a house rule that specific being the kind
 * of thing Delta holds onto is the whole point of the card.
 */
const LEARNED = [
  "Status notes go in yymmdd format",
  "Demands lead with the treatment summary",
  "Records go in the file before a demand goes out",
  "Nothing leaves the firm without attorney approval",
];

function LearnedPanel() {
  return (
    <Panel>
      <Head>
        <span style={titleStyle}>What Delta has picked up</span>
      </Head>
      <div style={{ padding: "6px 15px 12px" }}>
        {LEARNED.map((l, i) => (
          <div
            key={l}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              padding: "13px 0",
              borderTop: i === 0 ? "none" : `1px solid ${SX.hairline}`,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke={SX.accent}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flex: "0 0 auto" }}
              aria-hidden
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span style={{ fontFamily: SX.body, fontSize: 12.5, color: SX.ink }}>{l}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* --------------------------------------------------------------------------- */
/* Placement                                                                    */
/* --------------------------------------------------------------------------- */

/**
 * Centred in the photo column and pulled left by 8% of its own width, so it sits
 * nearer the copy than the outer edge and the eye crosses from the sentence to the
 * screenshot without a gap in the middle. It stays inside the photo half.
 *
 * Below the two-column breakpoint AutomationSection stacks and .sx-panel-float goes
 * relative and centred, so nothing here may depend on the absolute position.
 */
function Float({ children }: { children: React.ReactNode }) {
  return <div className="sx-panel-float">{children}</div>;
}

export function ComputerPanel() {
  return (
    <Float>
      <BrowserPanel />
    </Float>
  );
}

export function TeammatePanel() {
  return (
    <Float>
      <AsksPanel />
    </Float>
  );
}

export function MemoryPanel() {
  return (
    <Float>
      <LearnedPanel />
    </Float>
  );
}

/**
 * Panel-local CSS. Mounted once by AutomationSection.
 *
 * The dark-theme mark swap lives here rather than in the component because the theme
 * is an attribute on the page root, so CSS can see it and a server-rendered component
 * cannot without client state.
 */
export function ProductPanelStyles() {
  return (
    <style>{`
      /* Placement lives here, NOT inline, so AutomationSection's stacked layout can
         override it with a plain rule. Inline top/left offsets survive a change of
         position value: switching to position: relative left them applying as
         relative offsets and shot the panel half a column to the right. */
      .sx-panel-float {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-42%, -50%);
      }

      [data-sx-theme="dark"] .sx-mark-ink { display: none; }
      [data-sx-theme="dark"] .sx-mark-white { display: block !important; }

      .sx-livedot-ring { animation: sx-ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite; }
      @keyframes sx-ping {
        0%   { transform: scale(1);   opacity: 0.5; }
        70%  { transform: scale(2.6); opacity: 0; }
        100% { transform: scale(2.6); opacity: 0; }
      }

      .sx-caret { animation: sx-blink 1.15s steps(1, end) infinite; }
      @keyframes sx-blink { 0%, 45% { opacity: 1; } 46%, 100% { opacity: 0; } }

      @media (prefers-reduced-motion: reduce) {
        .sx-livedot-ring { animation: none; opacity: 0; }
        .sx-caret { animation: none; }
      }
    `}</style>
  );
}
