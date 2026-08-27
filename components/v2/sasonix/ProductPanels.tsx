"use client";

/**
 * The three product panels that float over the photography in AutomationSection.
 *
 * WHAT THEY REPLACED, and why it mattered
 *   Until now these were the Sasonix template's own stock product shots, kept
 *   through the clone-fidelity phase and never migrated. They depicted a generic
 *   developer SaaS: an "Untitled Database" of order_id and products.id in DBML, a
 *   "Token Breakdown" bar chart, a "Data Navigator" tile counting credits and
 *   latency with a GitHub glyph on it. On a page selling an AI paralegal to a
 *   personal injury firm they were not merely off-brand, they were unreadable:
 *   the largest section of the homepage illustrated a product nobody was buying.
 *   The token chart also printed the names of four foundation models, which is the
 *   one thing our copy discipline says never to put in front of a customer.
 *
 * WHAT THEY ARE NOW
 *   Three panels drawn in code, each one showing the claim its card makes:
 *     1. BrowserPanel  -> Delta signed in to a records portal, filling the form.
 *     2. ChatPanel     -> a lawyer asking in one sentence, and the work coming back.
 *     3. MemoryPanel   -> what Delta has learned, and it stopping to ask.
 *
 * THEY ARE DRAWN FROM THE REAL APP, not invented
 *   Panels 2 and 3 follow the shipping SPA (aws/cloudfront/src/src/) closely enough
 *   that a customer who has seen a demo recognises them:
 *     - The user's message is a LEFT-aligned tinted bubble with one squared corner
 *       (`rounded-2xl rounded-tl-md`, info-light fill), not a right-aligned one.
 *       Delta's own reply carries NO bubble: it is prose in the column with a 10px
 *       dot in a 36px gutter (components/chat/UserBubble.tsx, DeltaBubble.tsx).
 *     - Tool work is visible as a group whose header reads "Working" live and
 *       "4 steps" once settled, each step on a mono corner glyph, the active one
 *       carrying a live counter (components/assistant/ToolGroup.tsx). Step labels
 *       come from the real verb map in lib/chatFlow.ts: index_case_files renders as
 *       "Indexing case files".
 *     - The composer is a 32px pill with the placeholder "Message Delta..." and a
 *       40px dark circle for send (components/delta/DeltaWorkspace.tsx).
 *     - The memory surface is the real one: "What Delta Knows", rows that expand to
 *       a provenance line of source, date and use count (pages/knowledge).
 *     - Delta asking first is drawn as the app's `needs_clarification` state, prose
 *       plus option chips. It is NOT drawn as an approve/deny queue: that UI was
 *       removed from the product (#4861), and mocking a control that does not exist
 *       is how a demo goes wrong ten minutes after the page sells it.
 *
 * WHY CODE AND NOT IMAGES
 *   - They re-tint with the brand. Every colour is an SX token, so /?theme=dark and
 *     /?theme=achromatic render these correctly instead of showing a light PNG on a
 *     dark page. The old artwork was baked orange and stayed orange after the brand
 *     went blue.
 *   - They stay crisp at any density, and they cost no image bytes.
 *   - Copy is text, so it is edited here rather than re-exported from a design file.
 *   Colour is the one place they diverge from the app on purpose: the app's own
 *   palette is literal hex, and a literal hex here would not survive a theme swap.
 *   Roles are mapped instead, so the accent is the site's brand blue rather than the
 *   app's, and the tinted bubble is accentSoft rather than #eff6ff.
 *
 * EVERY NAME IN THEM IS FICTIONAL. Elena Morales, Ridgeline Freight and Northgate
 * Orthopedics are invented for the page. Do not put a real client, a real matter or
 * a real provider on the marketing site, and do not name one of our own integration
 * vendors here either: the section above deliberately carries no vendor logos.
 *
 * THE DETAIL IS THE POINT. Page counts, timestamps and the step counter are exact
 * rather than round because a real screenshot never reads 300 pages or 5:00 PM.
 * Keep them odd if you edit them.
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
function Panel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: W,
        borderRadius: 14,
        background: SX.surface,
        border: `1px solid ${SX.hairline}`,
        boxShadow: `${SX.sh(26, 70, 0.2)}, ${SX.sh(2, 6, 0.06)}`,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Header band. Same 42px on every panel so the three agree when scrolled past. */
function Head({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: 42,
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "0 14px",
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
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "-0.1px",
  color: SX.ink,
};

/** Small print: counts, timers, provenance. Mono, because the app sets them so. */
const metaStyle: React.CSSProperties = {
  fontFamily: SX.mono,
  fontSize: 10.5,
  letterSpacing: "-0.2px",
  color: SX.ink3,
};

/** Message text. The app runs 15.5px/1.65; scaled to the panel and held there. */
const msgStyle: React.CSSProperties = {
  fontFamily: SX.body,
  fontSize: 13,
  lineHeight: "20px",
  color: SX.ink,
  margin: 0,
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
 * Both cuts ship. The dark theme swaps them in CSS, because the ink cut vanishes on
 * a dark surface and picking by theme at render time would need client state.
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

/**
 * The app's dot gutter: every block Delta produces hangs off a 10px dot in a fixed
 * 36px column, and the dot is the only thing that distinguishes narration from an
 * answer from a run of tool calls. Reproduced at panel scale.
 */
function Gutter({ children, live = false }: { children: React.ReactNode; live?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <span style={{ width: 10, paddingTop: 5, flex: "0 0 auto" }}>
        {live ? <LiveDot size={9} /> : <span style={{ display: "block", width: 9, height: 9, borderRadius: 999, background: SX.accent }} />}
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>{children}</div>
    </div>
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
 * Delta signed in to a medical records portal, filling out the release form.
 *
 * A records portal is the deliberate choice over a case-management screen: it is
 * the card's third claim ("even where there is no API") drawn literally, and it is
 * the errand a personal injury paralegal loses whole afternoons to. The browser
 * chrome does the work of the heading, because a window with tabs is what "a
 * computer of its own" looks like and no sentence gets there as fast.
 */
function BrowserPanel() {
  const tabs = ["Records portal", "Case system", "Inbox"];
  return (
    <Panel>
      {/* chrome */}
      <div
        style={{
          height: 38,
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          padding: "0 12px",
          background: SX.surfaceAlt,
          borderBottom: `1px solid ${SX.hairline}`,
        }}
      >
        <span style={{ display: "flex", gap: 5, paddingBottom: 11 }} aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: 999, background: SX.hairline }} />
          ))}
        </span>
        <span style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
          {tabs.map((t, i) => (
            <span
              key={t}
              style={{
                fontFamily: SX.body,
                fontSize: 10.5,
                fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? SX.ink : SX.ink3,
                background: i === 0 ? SX.surface : "transparent",
                border: `1px solid ${i === 0 ? SX.hairline : "transparent"}`,
                borderBottomColor: i === 0 ? SX.surface : "transparent",
                borderRadius: "7px 7px 0 0",
                padding: "6px 10px 7px",
                marginBottom: -1,
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </span>
          ))}
        </span>
      </div>

      {/* address bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderBottom: `1px solid ${SX.hairline}` }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            flex: 1,
            minWidth: 0,
            height: 26,
            padding: "0 10px",
            borderRadius: 999,
            background: SX.bgAlt,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={SX.ink3} strokeWidth="2.4" aria-hidden>
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span style={{ ...metaStyle, color: SX.ink2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            records.northgateortho.com/roi/new
          </span>
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            height: 22,
            padding: "0 9px",
            borderRadius: 999,
            background: SX.accentSoft,
            fontFamily: SX.body,
            fontSize: 10,
            fontWeight: 600,
            color: SX.accentText,
            whiteSpace: "nowrap",
          }}
        >
          <DeltaMark size={10} />
          Signed in
        </span>
      </div>

      {/* the page Delta is working */}
      <div style={{ padding: "16px 16px 18px" }}>
        <div style={{ ...metaStyle, textTransform: "uppercase", letterSpacing: "0.07em", fontSize: 9.5 }}>
          Release of information
        </div>
        <div style={{ ...titleStyle, fontSize: 14.5, marginTop: 6 }}>Medical records request</div>

        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 10, marginTop: 14 }}>
          <Field label="Patient" value="Morales, Elena R." />
          <Field label="Date of birth" value="03 / 14 / 1986" />
        </div>
        <div style={{ marginTop: 10 }}>
          <Field label="Records requested" value="Jan 4, 2026 to present" />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 10,
            padding: "8px 10px",
            borderRadius: 9,
            border: `1px dashed ${SX.hairline}`,
            background: SX.bgAlt,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={SX.accent} strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span style={{ fontFamily: SX.body, fontSize: 11.5, fontWeight: 500, color: SX.ink }}>
            Authorization-Morales-signed.pdf
          </span>
          <span style={{ ...metaStyle, marginLeft: "auto" }}>attached</span>
        </div>

        {/* the button, with Delta's pointer on it */}
        <div style={{ position: "relative", marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 32,
              padding: "0 16px",
              borderRadius: 8,
              background: SX.accentDeep,
              color: SX.onAccent,
              fontFamily: SX.body,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Submit request
          </span>
          <span style={metaStyle}>Request 3 of 5</span>

          <span style={{ position: "absolute", left: 96, top: 20, display: "flex", alignItems: "flex-start", gap: 4 }} aria-hidden>
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
                letterSpacing: "0.02em",
              }}
            >
              Delta
            </span>
          </span>
        </div>
      </div>

      {/* Delta's own status over the browser, in the app's live vocabulary.
          It names the automation on purpose. The page promises, in the section below
          this one, that a person approves before anything leaves the firm, and this
          panel shows Delta about to submit a request to a third party. Naming the
          standing approval is what keeps the picture and the promise the same claim
          instead of two claims that contradict each other. Do not shorten it back to
          a bare description of the action. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          height: 40,
          padding: "0 14px",
          background: SX.surfaceAlt,
          borderTop: `1px solid ${SX.hairline}`,
        }}
      >
        <LiveDot />
        <span style={{ fontFamily: SX.body, fontSize: 11.5, fontWeight: 600, color: SX.ink }}>Working</span>
        <span style={{ ...metaStyle, color: SX.ink3 }}>&#9492;</span>
        <span style={{ fontFamily: SX.body, fontSize: 11.5, color: SX.ink2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          Records chase, an automation you approved
        </span>
        <span style={{ ...metaStyle, marginLeft: "auto" }}>&#8226; 01:12</span>
      </div>
    </Panel>
  );
}

/** A filled form field. Reads as filled, not as an empty input. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontFamily: SX.body, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: SX.ink3 }}>
        {label}
      </div>
      <div
        style={{
          marginTop: 5,
          height: 30,
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          borderRadius: 8,
          border: `1px solid ${SX.hairline}`,
          background: SX.surface,
          fontFamily: SX.body,
          fontSize: 11.5,
          color: SX.ink,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------- */
/* 2. Message it like a teammate                                                */
/* --------------------------------------------------------------------------- */

/**
 * One message in, the work coming back.
 *
 * The card's argument is that there is nothing to configure, so the panel shows a
 * thread and not a builder: a sentence a partner would actually type at 4:41 on a
 * Tuesday, the steps Delta took while it was gone, and an answer to the question
 * that was asked. The steps matter as much as the answer here. They are the part a
 * lawyer scrolls back through when deciding whether to believe it.
 */
const STEPS = [
  "Indexing case files",
  "Reading document pages",
  "Writing chronology",
];

function ChatPanel() {
  return (
    <Panel>
      <Head>
        <DeltaMark size={16} />
        <span style={titleStyle}>Delta</span>
        <span
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            height: 21,
            maxWidth: 220,
            padding: "0 9px",
            borderRadius: 999,
            background: SX.bgAlt,
            border: `1px solid ${SX.hairline}`,
            fontFamily: SX.body,
            fontSize: 10,
            fontWeight: 500,
            color: SX.ink2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Morales v. Ridgeline Freight
        </span>
      </Head>

      <div style={{ padding: "14px 14px 12px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* the ask: left aligned, tinted, one squared corner, exactly as the app draws it */}
        <div>
          <div style={{ ...metaStyle, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 9, marginBottom: 5 }}>
            4:41 PM
          </div>
          <div
            style={{
              maxWidth: 320,
              padding: "9px 13px",
              borderRadius: "5px 14px 14px 14px",
              background: SX.accentSoft,
              border: `1px solid ${SX.hairline}`,
              ...msgStyle,
            }}
          >
            Northgate records just landed. Build the chronology and flag anything on the prior back injury.
          </div>
        </div>

        {/* what it did while it was gone */}
        <Gutter>
          <div style={{ fontFamily: SX.body, fontSize: 12.5, fontWeight: 600, color: SX.ink }}>3 steps</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 6 }}>
            {STEPS.map((s) => (
              <span key={s} style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
                <span style={{ ...metaStyle, opacity: 0.6 }}>&#9492;</span>
                <span style={{ fontFamily: SX.body, fontSize: 11.5, color: SX.ink2 }}>{s}</span>
              </span>
            ))}
          </div>
        </Gutter>

        {/* the answer: no bubble, prose in the column */}
        <Gutter>
          <p style={msgStyle}>
            Read all 312 pages. The chronology is on the file. Two visits mention a 2019 lumbar strain, both
            flagged and cited to the page.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 9 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: SX.body, fontSize: 11, color: SX.ink3 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </span>
            <span style={{ fontFamily: SX.body, fontSize: 11, color: SX.ink3 }}>41 sources referenced</span>
          </div>
        </Gutter>
      </div>

      {/* the composer, because the whole interface is one box */}
      <div style={{ padding: "0 12px 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            height: 44,
            padding: "0 8px 0 13px",
            borderRadius: 32,
            background: SX.surface,
            border: `1px solid ${SX.hairline}`,
            boxShadow: SX.sh(1, 3, 0.04),
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={SX.ink3} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21.4 11.05 12.25 20.2a5.5 5.5 0 0 1-7.78-7.78l9.19-9.19a3.67 3.67 0 0 1 5.18 5.18l-9.2 9.19a1.83 1.83 0 0 1-2.59-2.59l8.49-8.48" />
          </svg>
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
 * Two stacked panels, because the card makes two claims and they are different.
 *
 * The first is that Delta accumulates how the firm works. Each row carries the
 * provenance line the real memory page carries, source and date and use count,
 * which is what separates a memory from a setting: you can see where it came from
 * and how often it has mattered.
 *
 * The second is that it stops and asks, and that is the objection this section
 * exists to answer. It is drawn as the app's clarification state, prose plus option
 * chips, because that is where the product actually puts the question. There is no
 * approvals inbox to draw; that surface was removed.
 */
const LEARNED: { fact: string; provenance?: string; isNew?: boolean }[] = [
  { fact: "Demands open with the treatment summary", provenance: "Learned from feedback · Aug 12 · Used 14 times" },
  { fact: "No client contact after 7 PM", isNew: true },
  { fact: "Northgate sends records as fax scans" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke={SX.ink3}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: "0 0 auto", transform: open ? "rotate(90deg)" : "none" }}
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function LearnedPanel() {
  return (
    <Panel>
      <Head>
        <span style={titleStyle}>What Delta Knows</span>
        <span style={{ ...metaStyle, marginLeft: "auto" }}>218 learned</span>
      </Head>
      <div style={{ padding: "2px 14px 10px" }}>
        {LEARNED.map((l, i) => (
          <div key={l.fact} style={{ padding: "10px 0", borderTop: i === 0 ? "none" : `1px solid ${SX.hairline}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <Chevron open={i === 0} />
              <span
                style={{
                  fontFamily: SX.body,
                  fontSize: 12,
                  fontWeight: i === 0 ? 500 : 400,
                  color: i === 0 ? SX.ink : SX.ink2,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {l.fact}
              </span>
              {l.isNew && (
                <span
                  style={{
                    marginLeft: "auto",
                    padding: "1px 6px",
                    borderRadius: 999,
                    background: SX.accentSoft,
                    color: SX.accentText,
                    fontFamily: SX.body,
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  New
                </span>
              )}
            </div>
            {l.provenance && (
              <div style={{ ...metaStyle, marginTop: 6, marginLeft: 20 }}>{l.provenance}</div>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AskPanel() {
  return (
    <Panel>
      <Head>
        <LiveDot size={7} />
        <span style={titleStyle}>Delta stopped to ask</span>
        <span style={{ ...metaStyle, marginLeft: "auto" }}>12m ago</span>
      </Head>
      <div style={{ padding: "13px 14px 15px" }}>
        <Gutter>
          <p style={{ ...msgStyle, fontSize: 12.5, lineHeight: "19px", color: SX.ink2 }}>
            Northgate wants a fresh authorization before they release anything. The one on file is from March.
          </p>
          <div style={{ ...msgStyle, fontSize: 12.5, fontWeight: 600, color: SX.ink, marginTop: 9 }}>
            Send the firm&rsquo;s standard form for signature?
          </div>
          <div style={{ display: "flex", gap: 7, marginTop: 11 }}>
            {["Send it", "Use theirs instead", "Not yet"].map((c, i) => (
              <span
                key={c}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 26,
                  padding: "0 11px",
                  borderRadius: 6,
                  background: i === 0 ? SX.accentDeep : SX.accentSoft,
                  color: i === 0 ? SX.onAccent : SX.accentText,
                  fontFamily: SX.body,
                  fontSize: 11,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </Gutter>
      </div>
    </Panel>
  );
}

/* --------------------------------------------------------------------------- */
/* Placement                                                                    */
/* --------------------------------------------------------------------------- */

/**
 * Each panel is centred in the photo column and then pulled left by 8% of its own
 * width, so it sits nearer the copy than the outer edge and the eye crosses from the
 * sentence to the screenshot without a gap in the middle. It stays inside the photo
 * half; it does not cross the seam. Carried over from the Sasonix composition, which
 * is the one thing about that composition worth keeping.
 *
 * Below the two-column breakpoint AutomationSection stacks and .sx-panel-float goes
 * static and centred, so nothing here may depend on the absolute position.
 */
function Float({ children }: { children: React.ReactNode }) {
  return <div className="sx-panel-float">{children}</div>;
}

export const PANEL_WIDTH = W;

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
      <ChatPanel />
    </Float>
  );
}

export function MemoryPanel() {
  return (
    <Float>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <LearnedPanel />
        <AskPanel />
      </div>
    </Float>
  );
}

/**
 * Panel-local CSS. Mounted once by AutomationSection.
 *
 * The dark-theme mark swap lives here rather than in the component because the theme
 * is an attribute on the page root, so CSS can see it and a server-rendered
 * component cannot without client state.
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
