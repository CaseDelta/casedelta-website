"use client";

/**
 * The ruler lines: 1px rules at the container gutters and the section edges,
 * turning the page into faint graph paper.
 *
 * MEASURED FROM corgi.insure, not guessed. Their system, read off the live DOM:
 * every section draws its OWN pair of vertical rules pinned to the container
 * gutters and its own horizontal rule at the section edge, all
 * pointer-events-none, 1px, #e1e1e1 on light bands and #585858 on dark ones.
 *
 * PER SECTION, NOT ONE PAGE-WIDE OVERLAY, and that is the part worth copying.
 * A single fixed overlay is less code and cannot change colour where the page
 * goes dark: a light rule over a dark band either vanishes or glares. Because
 * each section owns its rules, `tone` follows the band it is drawn on.
 *
 * The verticals sit at the CONTENT edge, not the section edge: 1280px is the
 * Container's content width (1360 max minus 40px gutters each side), so
 * calc(50% - 640px) lands exactly on the column the text is set in. That is what
 * makes them read as a measuring grid rather than as a border. The max() keeps
 * them off the screen edge on narrow viewports.
 *
 * They are drawn ABOVE the section's own background and are allowed to cross
 * content, which is what the reference does too. At the gutters they almost never
 * cross a glyph, and where they cross a card edge that is the effect.
 */
import { SX } from "./tokens";

/** Half the Container's content width: 1360 max, 40px gutters, so 1280 / 2. */
const HALF = 640;

export function Rules({
  tone = "light",
  top = true,
  bottom = false,
}: {
  /** Which band this is drawn on. Picks a rule colour that survives it. */
  tone?: "light" | "dark";
  top?: boolean;
  bottom?: boolean;
}) {
  const color = tone === "dark" ? "rgba(255, 255, 255, 0.10)" : SX.hairline;
  const v: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    background: color,
    pointerEvents: "none",
  };
  const h: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100vw",
    height: 1,
    background: color,
    pointerEvents: "none",
  };
  return (
    <>
      <span aria-hidden style={{ ...v, left: `max(20px, calc(50% - ${HALF}px))` }} />
      <span aria-hidden style={{ ...v, right: `max(20px, calc(50% - ${HALF}px))` }} />
      {top && <span aria-hidden style={{ ...h, top: 0 }} />}
      {bottom && <span aria-hidden style={{ ...h, bottom: 0 }} />}
    </>
  );
}
