"use client";

/**
 * VariantProvider: server decides, client trusts (then optionally syncs to PostHog).
 *
 * The server resolves a variant (control by default, or a `?variant=` override for
 * QA) and renders the correct markup into the HTML. This provider seeds the same
 * value into React context, then, once posthog-js has loaded, reads the live flags
 * and adopts them if they differ. With flags unconfigured, getFeatureFlag returns
 * undefined and we stay on the server value, so there is no flicker today.
 *
 * useTheme() / useDesignVariant() / useCopyVariant() are the consumer hooks.
 */
import { createContext, useContext, useEffect, useState } from "react";
import { getTheme } from "@/lib/variants/themes";
import { DESIGN_FLAG, COPY_FLAG, isDesignVariant, isCopyVariant } from "@/lib/variants";
import type { DesignVariant, CopyVariant, Theme } from "@/lib/variants";

interface VariantState {
  design: DesignVariant;
  copy: CopyVariant;
}

const VariantContext = createContext<VariantState>({ design: "control", copy: "control" });

export function useDesignVariant(): DesignVariant {
  return useContext(VariantContext).design;
}
export function useCopyVariant(): CopyVariant {
  return useContext(VariantContext).copy;
}
export function useTheme(): Theme {
  return getTheme(useContext(VariantContext).design);
}

export function VariantProvider({
  design: initialDesign,
  copy: initialCopy,
  source,
  children,
}: {
  design: DesignVariant;
  copy: CopyVariant;
  source: "url-override" | "default";
  children: React.ReactNode;
}) {
  const [state, setState] = useState<VariantState>({ design: initialDesign, copy: initialCopy });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const posthog = (await import("posthog-js")).default;

        const apply = () => {
          if (cancelled) return;

          // QA override: pin PostHog to the forced variant so events attribute correctly,
          // and keep rendering exactly what the server rendered.
          if (source === "url-override") {
            posthog.featureFlags?.overrideFeatureFlags?.({
              flags: { [DESIGN_FLAG]: initialDesign, [COPY_FLAG]: initialCopy },
            });
            posthog.capture?.("design_variant_exposed", {
              design: initialDesign,
              copy: initialCopy,
              source,
            });
            return;
          }

          // Real assignment: adopt live flags when present, else keep the server value.
          const d = posthog.getFeatureFlag?.(DESIGN_FLAG);
          const c = posthog.getFeatureFlag?.(COPY_FLAG);
          const next: VariantState = {
            design: isDesignVariant(d) ? d : initialDesign,
            copy: isCopyVariant(c) ? c : initialCopy,
          };
          setState(next);
          posthog.capture?.("design_variant_exposed", { ...next, source: "flag" });
        };

        if (posthog.__loaded) apply();
        // Fires once flags load/refresh; safe place to read final values.
        posthog.onFeatureFlags?.(apply);
      } catch {
        // PostHog not configured; stay on the server-resolved value.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialDesign, initialCopy, source]);

  return <VariantContext.Provider value={state}>{children}</VariantContext.Provider>;
}
