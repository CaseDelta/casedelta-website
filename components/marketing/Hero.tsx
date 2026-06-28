"use client";

/**
 * Hero dispatcher: renders the faithful hero for the active design variant.
 * The variant is resolved on the server and seeded into VariantProvider, so the
 * correct hero is already in the server HTML.
 */
import { useDesignVariant, useTheme, useCopyVariant } from "@/components/VariantProvider";
import { HeroHarveyLight } from "./heroes/HeroHarveyLight";
import { HeroHarveyDark } from "./heroes/HeroHarveyDark";
import { HeroLegora } from "./heroes/HeroLegora";

export function Hero() {
  const design = useDesignVariant();
  const copy = useCopyVariant();
  const theme = useTheme();

  if (design === "legora") return <HeroLegora theme={theme} copy={copy} />;
  if (design === "harvey-dark") return <HeroHarveyDark theme={theme} copy={copy} />;
  return <HeroHarveyLight theme={theme} copy={copy} />;
}
