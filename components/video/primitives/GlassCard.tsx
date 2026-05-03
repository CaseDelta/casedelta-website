"use client";

import { CSSProperties } from "react";
import {
  GLASS_BG,
  GLASS_BORDER,
  GLASS_SHADOW,
  GLASS_SHADOW_SM,
} from "./tokens";

/* The signature elevated surface used everywhere across the VSL.
 * Glass-tinted cream with a soft blue-tinted shadow + subtle backdrop blur.
 */
export function glassSurfaceStyle({
  radius = 16,
  small = false,
}: { radius?: number; small?: boolean } = {}): CSSProperties {
  return {
    background: GLASS_BG,
    border: `1px solid ${GLASS_BORDER}`,
    borderRadius: radius,
    boxShadow: small ? GLASS_SHADOW_SM : GLASS_SHADOW,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  };
}

export function GlassCard({
  children,
  radius = 16,
  small = false,
  style,
}: {
  children: React.ReactNode;
  radius?: number;
  small?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        ...glassSurfaceStyle({ radius, small }),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
