"use client";

/**
 * The chrome every page that is not the homepage wears.
 *
 * This exists because each secondary page used to stand up its own tree: the motion
 * config, the palette, the smooth-scroll listener, the nav and the footer, copied
 * five times. That is five places for them to drift, and the drift is invisible
 * until somebody notices the footer is different on one page.
 *
 * ThemeVars is NOT optional here. Each page is its own React tree, and the palette
 * is emitted as CSS custom properties by that component, so a page that forgets it
 * renders every var(--sx-*) as nothing: no colour, no type, a white page of black
 * Times New Roman. If a new page looks unstyled, this is why.
 *
 * `Nav solid` because none of these pages has a dark full-bleed hero behind the
 * bar; the transparent treatment is a homepage-only thing.
 *
 * `showCta` suppresses the big email-capture band above the footer. Pass false on a
 * page that IS the call to action (/demo), so the reader is not asked twice.
 */
import { MotionConfig } from "framer-motion";
import { SX } from "./tokens";
import { ThemeVars, useThemeOverride } from "./ThemeVars";
import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { CtaFooter } from "./CtaFooter";

export function PageShell({
  children,
  showCta = true,
}: {
  children: React.ReactNode;
  showCta?: boolean;
}) {
  const theme = useThemeOverride();
  return (
    <MotionConfig reducedMotion="user">
      <ThemeVars />
      <div data-sx-theme={theme} style={{ background: SX.bg, color: SX.ink, minHeight: "100vh" }}>
        <SmoothScroll />
        <Nav solid />
        <main>{children}</main>
        <CtaFooter showCta={showCta} />
      </div>
    </MotionConfig>
  );
}
