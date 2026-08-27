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
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
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
 * A browser, and Delta signing in to the firm's platform in it.
 *
 * THE SEQUENCE IS THE POINT (Camren, 2026-08-27). A static screenshot of a case
 * system proves nothing: every legal product ships one. What no other product can
 * show is the sign-in itself, so the panel plays it. Three beats, twice, once per
 * platform:
 *     login    the platform's sign-in page, Delta typing the address and the
 *              password, then moving the pointer to the button
 *     loading  the tab spins, the page-load bar runs
 *     app      it is inside, and working
 * Then it does the whole thing again on a different platform, which is the part
 * that says "yours too" without a sentence claiming it.
 *
 * THE BROWSER IS DRAWN, NOT PHOTOGRAPHED. It is Chrome's shape at Chrome's
 * proportions: traffic lights, rounded tabs with favicons and close glyphs, the new
 * tab plus, back and forward and reload, the omnibox pill, the extensions puzzle and
 * the profile avatar. Drawn rather than screenshotted because a screenshot is one
 * fixed density, one fixed light theme, and one version of Chrome that dates the
 * page the next time Google moves a button. Every colour here is an SX token, so it
 * re-tints with the brand and renders correctly in the dark theme.
 *
 * THE PLATFORM SCREENS ARE OURS, drawn in the same way: a platform's own login art
 * and product chrome are their trademarks and their screenshots, and putting them on
 * our homepage is a different decision from naming them in a tab. Names only.
 *
 * COST. One interval at 60ms, and only while the panel is on screen: an
 * IntersectionObserver arms it and disarms it. prefers-reduced-motion skips all of
 * it and renders the last beat, Delta already signed in and working, which is the
 * frame that carries the claim if only one frame gets to.
 */

type Platform = {
  name: string;
  /** The address in the omnibox. A real host, because a fake one reads as a fake. */
  host: string;
  /** Fictional firm, fictional user. Never a real client on the marketing site. */
  user: string;
  app: React.ReactNode;
};

/** The three beats, twice. Durations in ms; the loop is the sum. */
const BEATS = [
  { platform: 0, screen: "login", ms: 3000 },
  { platform: 0, screen: "loading", ms: 1100 },
  { platform: 0, screen: "app", ms: 3200 },
  { platform: 1, screen: "login", ms: 3000 },
  { platform: 1, screen: "loading", ms: 1100 },
  { platform: 1, screen: "app", ms: 3200 },
] as const;

const LOOP_MS = BEATS.reduce((total, b) => total + b.ms, 0);
const TICK_MS = 60;

/** The beat playing at `ms` into the loop, and how far into that beat we are. */
function beatAt(ms: number) {
  let start = 0;
  for (const beat of BEATS) {
    if (ms < start + beat.ms) return { beat, into: ms - start };
    start += beat.ms;
  }
  return { beat: BEATS[BEATS.length - 1], into: 0 };
}

/**
 * Cue sheet for the login beat, in ms from the start of it. Pulled out of the
 * component because the pointer, the two fields and the button all have to agree
 * about what is happening, and three copies of the same numbers drift.
 */
const CUE = {
  typeUserFrom: 250,
  msPerChar: 40,
  toPasswordAt: 1450,
  typePasswordFrom: 1520,
  msPerDot: 55,
  passwordDots: 10,
  toButtonAt: 2260,
  pressAt: 2620,
} as const;

/** Where the pointer sits during each phase of the login beat, in viewport pixels. */
/**
 * Where the pointer rests during each phase of the login beat, in viewport pixels.
 *
 * It sits at the RIGHT END of the field it is working in, not on the caret. On the
 * caret it covers the text it is supposed to be typing, and the badge lands on top of
 * the address the moment the address finishes. Resting where a hand would rest after
 * clicking the field reads better and stays legible.
 *
 * These are hand-placed against the login layout below. If you change a margin there,
 * these move with it: the whole illusion is the pointer being where it should be.
 */
const POINTER = {
  user: { x: 290, y: 97 },
  password: { x: 290, y: 163 },
  button: { x: 214, y: 215 },
} as const;

/** The viewport is a fixed height on every beat, or the card jumps as they change. */
const VIEW_H = 270;

function useSignInLoop(reduced: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [ms, setMs] = useState(0);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (reduced || !node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.2 });
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !onScreen) return;
    const id = setInterval(() => setMs((prev) => (prev + TICK_MS) % LOOP_MS), TICK_MS);
    return () => clearInterval(id);
  }, [reduced, onScreen]);

  return { ref, ms };
}

function BrowserPanel() {
  const reduced = !!useReducedMotion();
  const { ref, ms } = useSignInLoop(reduced);

  /* Reduced motion holds the last beat: signed in, and working. */
  const { beat, into } = reduced ? { beat: BEATS[2], into: BEATS[2].ms } : beatAt(ms);
  const platform = PLATFORMS[beat.platform];
  const isLogin = beat.screen === "login";
  const isLoading = beat.screen === "loading";

  const typedUser = isLogin
    ? platform.user.slice(0, Math.max(0, Math.floor((into - CUE.typeUserFrom) / CUE.msPerChar)))
    : platform.user;
  const typedDots = isLogin
    ? Math.min(CUE.passwordDots, Math.max(0, Math.floor((into - CUE.typePasswordFrom) / CUE.msPerDot)))
    : CUE.passwordDots;

  const focus = into < CUE.toPasswordAt ? "user" : into < CUE.toButtonAt ? "password" : "button";
  const pointer = POINTER[focus];
  const pressed = isLogin && into >= CUE.pressAt;

  return (
    <Panel>
      <div ref={ref}>
        {/* ---- Chrome: tab strip ---- */}
        <div
          style={{
            height: 38,
            display: "flex",
            alignItems: "flex-end",
            gap: 9,
            padding: "0 11px",
            background: SX.bgAlt,
          }}
        >
          <span style={{ display: "flex", gap: 6, paddingBottom: 12 }} aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: SX.hairline }} />
            ))}
          </span>
          <span style={{ display: "flex", gap: 1, alignItems: "flex-end", minWidth: 0 }}>
            {PLATFORMS.map((p, i) => (
              <Tab key={p.name} label={p.name} active={i === beat.platform} spinning={i === beat.platform && isLoading} />
            ))}
            <Tab label="Outlook" active={false} spinning={false} />
          </span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={SX.ink3} strokeWidth="2.2" strokeLinecap="round" style={{ marginBottom: 11 }} aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>

        {/* ---- Chrome: toolbar ---- */}
        <div
          style={{
            position: "relative",
            height: 40,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 11px",
            background: SX.surface,
            borderBottom: `1px solid ${SX.hairline}`,
          }}
        >
          <span style={{ display: "flex", gap: 8, color: SX.ink3 }} aria-hidden>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45 }}>
              <path d="M9 18l6-6-6-6" />
            </svg>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" />
            </svg>
          </span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              flex: 1,
              minWidth: 0,
              height: 26,
              padding: "0 11px",
              borderRadius: 999,
              background: SX.bgAlt,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={SX.ink3} strokeWidth="2.4" aria-hidden>
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <span style={{ ...metaStyle, color: SX.ink2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {platform.host}
            </span>
          </span>

          <span style={{ display: "flex", alignItems: "center", gap: 8, color: SX.ink3 }} aria-hidden>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 13h2.5a2 2 0 0 0 0-4H4V6a2 2 0 0 1 2-2h3.2a2 2 0 1 1 3.6 0H16a2 2 0 0 1 2 2v3.2a2 2 0 1 0 0 3.6V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
            </svg>
            <span style={{ width: 17, height: 17, borderRadius: 999, background: SX.accentSoft, display: "grid", placeItems: "center", fontFamily: SX.body, fontSize: 8.5, fontWeight: 700, color: SX.accentText }}>
              D
            </span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <circle cx="12" cy="5" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="12" cy="19" r="1.6" />
            </svg>
          </span>

          {/* page-load bar, the thing that says the click landed */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              bottom: -1,
              height: 2,
              background: SX.accent,
              width: isLoading ? `${Math.min(100, (into / 1100) * 100)}%` : 0,
              opacity: isLoading ? 1 : 0,
            }}
          />
        </div>

        {/* ---- the page ---- */}
        <div style={{ position: "relative", height: VIEW_H, overflow: "hidden", background: isLogin || isLoading ? SX.bgAlt : SX.surface }}>
          {isLogin || isLoading ? (
            <LoginPage
              platform={platform}
              typedUser={typedUser}
              typedDots={typedDots}
              focus={focus}
              pressed={pressed || isLoading}
              dim={isLoading}
            />
          ) : (
            platform.app
          )}

          {/* Delta's pointer. Only during the sign-in, because that is the claim. */}
          {isLogin && (
            <span
              aria-hidden
              className="sx-pointer"
              style={{ position: "absolute", left: 0, top: 0, transform: `translate(${pointer.x}px, ${pointer.y}px)`, display: "flex", alignItems: "flex-start", gap: 4 }}
            >
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
          )}
        </div>

        {/* ---- one line of status, and it names the platform ---- */}
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
          <span style={{ fontFamily: SX.body, fontSize: 12, color: SX.ink }}>
            {isLogin ? `Signing in to ${platform.name}` : isLoading ? "Signing in" : `Signed in and working in ${platform.name}`}
          </span>
        </div>
      </div>
    </Panel>
  );
}

/** A Chrome tab. The favicon turns into a spinner while its page is loading. */
function Tab({ label, active, spinning }: { label: string; active: boolean; spinning: boolean }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        maxWidth: 118,
        fontFamily: SX.body,
        fontSize: 10.5,
        fontWeight: active ? 600 : 400,
        color: active ? SX.ink : SX.ink3,
        background: active ? SX.surface : "transparent",
        borderRadius: "8px 8px 0 0",
        padding: "7px 9px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {spinning ? (
        <span className="sx-tab-spin" style={{ width: 9, height: 9, borderRadius: 999, border: `1.4px solid ${SX.accentSoft}`, borderTopColor: SX.accent, flex: "0 0 auto" }} />
      ) : (
        <span style={{ width: 9, height: 9, borderRadius: 2.5, background: active ? SX.accent : SX.hairline, flex: "0 0 auto" }} />
      )}
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" style={{ opacity: active ? 0.5 : 0, flex: "0 0 auto" }} aria-hidden>
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </span>
  );
}

/** The platform's sign-in page. Ours, not theirs: the name, and nothing else of it. */
function LoginPage({
  platform,
  typedUser,
  typedDots,
  focus,
  pressed,
  dim,
}: {
  platform: Platform;
  typedUser: string;
  typedDots: number;
  focus: string;
  pressed: boolean;
  dim: boolean;
}) {
  const field = (active: boolean): React.CSSProperties => ({
    height: 34,
    display: "flex",
    alignItems: "center",
    padding: "0 11px",
    borderRadius: 8,
    background: SX.surface,
    border: `1px solid ${active ? SX.accent : SX.hairline}`,
    boxShadow: active ? `0 0 0 3px ${SX.accentSoft}` : "none",
    fontFamily: SX.body,
    fontSize: 12,
    color: SX.ink,
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        paddingTop: 22,
        opacity: dim ? 0.55 : 1,
        transition: "opacity 260ms ease",
      }}
    >
      <div style={{ width: 310 }}>
        <div style={{ fontFamily: SX.display, fontSize: 17, fontWeight: 600, letterSpacing: "-0.3px", color: SX.ink, textAlign: "center" }}>
          {platform.name}
        </div>

        <div style={{ marginTop: 22, fontFamily: SX.body, fontSize: 10, fontWeight: 600, color: SX.ink3 }}>Email</div>
        <div style={{ ...field(focus === "user"), marginTop: 6 }}>
          {typedUser}
          {focus === "user" && <span className="sx-caret" aria-hidden style={{ display: "inline-block", width: 1.5, height: 13, background: SX.ink, marginLeft: 1 }} />}
        </div>

        <div style={{ marginTop: 14, fontFamily: SX.body, fontSize: 10, fontWeight: 600, color: SX.ink3 }}>Password</div>
        <div style={{ ...field(focus === "password"), marginTop: 6, letterSpacing: "2px" }}>
          {"•".repeat(typedDots)}
          {focus === "password" && <span className="sx-caret" aria-hidden style={{ display: "inline-block", width: 1.5, height: 13, background: SX.ink, marginLeft: 1 }} />}
        </div>

        <div
          style={{
            marginTop: 18,
            height: 34,
            display: "grid",
            placeItems: "center",
            borderRadius: 8,
            background: pressed ? SX.accentDeep : SX.accent,
            color: SX.onAccent,
            fontFamily: SX.body,
            fontSize: 12,
            fontWeight: 600,
            transform: pressed ? "scale(0.985)" : "none",
            transition: "transform 140ms ease, background 140ms ease",
          }}
        >
          Sign in
        </div>
      </div>
    </div>
  );
}

/* ---- what each platform looks like once Delta is inside it ---- */

/** Shared shell so the two landing screens read as two apps, not two designs. */
function AppShell({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      <div style={{ width: 42, background: SX.bgAlt, borderRight: `1px solid ${SX.hairline}`, padding: "12px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }} aria-hidden>
        <span style={{ width: 18, height: 18, borderRadius: 5, background: SX.accent }} />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} style={{ width: 16, height: 3, borderRadius: 999, background: SX.hairline, marginTop: i === 0 ? 6 : 0 }} />
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ height: 34, display: "flex", alignItems: "center", padding: "0 14px", borderBottom: `1px solid ${SX.hairline}` }}>
          <span style={{ fontFamily: SX.body, fontSize: 11.5, fontWeight: 600, color: SX.ink }}>{name}</span>
        </div>
        <div style={{ padding: "14px 14px 0" }}>{children}</div>
      </div>
    </div>
  );
}

/** Filevine: one case, one field, Delta typing into it. */
function CaseScreen() {
  return (
    <AppShell name="Filevine">
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ fontFamily: SX.body, fontSize: 13.5, fontWeight: 600, color: SX.ink }}>Morales, Elena</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: 20,
            padding: "0 8px",
            borderRadius: 999,
            background: SX.accentSoft,
            fontFamily: SX.body,
            fontSize: 10,
            fontWeight: 600,
            color: SX.accentText,
          }}
        >
          In treatment
        </span>
      </div>
      <div style={{ marginTop: 14, fontFamily: SX.body, fontSize: 9, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: SX.ink3 }}>
        Case status note
      </div>
      <div
        style={{
          marginTop: 6,
          minHeight: 56,
          padding: "9px 11px",
          borderRadius: 8,
          border: `1px solid ${SX.accent}`,
          boxShadow: `0 0 0 3px ${SX.accentSoft}`,
          background: SX.surface,
          fontFamily: SX.body,
          fontSize: 12,
          lineHeight: "19px",
          color: SX.ink,
        }}
      >
        Records received from Northgate. Ready to draft demand.
        <span className="sx-caret" aria-hidden style={{ display: "inline-block", width: 1.5, height: 12, background: SX.ink, marginLeft: 3, verticalAlign: "-2px" }} />
      </div>
    </AppShell>
  );
}

/** Lead Docket: the intake side, read rather than written. */
const LEADS = [
  { name: "Alvarez, M.", stage: "New", age: "today" },
  { name: "Boone, T.", stage: "Chase", age: "2d" },
  { name: "Carter, J.", stage: "Chase", age: "3d" },
];

function LeadsScreen() {
  return (
    <AppShell name="Lead Docket">
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ fontFamily: SX.body, fontSize: 13.5, fontWeight: 600, color: SX.ink }}>Leads, Chase</span>
        <span style={{ ...metaStyle, marginLeft: "auto" }}>42 open</span>
      </div>
      <div style={{ marginTop: 10 }}>
        {LEADS.map((l, i) => (
          <div
            key={l.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 0",
              borderTop: i === 0 ? "none" : `1px solid ${SX.hairline}`,
            }}
          >
            <span style={{ fontFamily: SX.body, fontSize: 12, color: SX.ink }}>{l.name}</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 19,
                padding: "0 8px",
                borderRadius: 999,
                background: SX.accentSoft,
                fontFamily: SX.body,
                fontSize: 9.5,
                fontWeight: 600,
                color: SX.accentText,
              }}
            >
              {l.stage}
            </span>
            <span style={{ ...metaStyle, marginLeft: "auto" }}>{l.age}</span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

/**
 * The two platforms the loop signs in to. Real hosts, because a made-up host reads
 * as a made-up product. Fictional firm and fictional user, always.
 */
const PLATFORMS: Platform[] = [
  { name: "Filevine", host: "app.filevine.com", user: "dana@harperlane.com", app: <CaseScreen /> },
  { name: "Lead Docket", host: "harperlane.leaddocket.com", user: "dana@harperlane.com", app: <LeadsScreen /> },
];


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

      /* The pointer glides between the two fields and the button. The transition is
         what makes it read as one hand moving rather than three pointers appearing. */
      .sx-pointer { transition: transform 420ms cubic-bezier(0.4, 0, 0.2, 1); }

      .sx-tab-spin { animation: sx-spin 0.7s linear infinite; }
      @keyframes sx-spin { to { transform: rotate(360deg); } }

      @media (prefers-reduced-motion: reduce) {
        .sx-livedot-ring { animation: none; opacity: 0; }
        .sx-caret { animation: none; }
        .sx-pointer { transition: none; }
        .sx-tab-spin { animation: none; }
      }
    `}</style>
  );
}
