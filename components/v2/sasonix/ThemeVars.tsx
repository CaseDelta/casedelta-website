"use client";

/**
 * Emits the brand custom properties for /v2 and honours a ?theme= override so a
 * palette can be judged on the real page instead of in the abstract.
 *
 *   /v2                  the default theme (theme.ts DEFAULT_THEME)
 *   /v2?theme=casedelta  CaseDelta's own achromatic palette
 *   /v2?theme=dark       dark-first
 *
 * The stylesheet carries every theme, so the override is a single attribute on
 * the wrapper, applied without a reload or a rebuild. Server and first client
 * render both use the default, so there is no hydration mismatch; the override
 * lands in an effect immediately after mount.
 */
import { useEffect, useState } from "react";
import { DEFAULT_THEME, isThemeName, themeStylesheet, type ThemeName } from "./theme";

export function useThemeOverride(): ThemeName {
  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("theme");
    if (isThemeName(requested)) setTheme(requested);
  }, []);

  return theme;
}

export function ThemeVars() {
  // Emitted as a plain style tag so the variables exist before first paint.
  return <style dangerouslySetInnerHTML={{ __html: themeStylesheet() }} />;
}
