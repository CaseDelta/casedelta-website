"use client";

import { SUCCESS_GREEN } from "./tokens";

/* Reusable green check bubble — used in every "completed" state across the VSL. */
export function CheckBubble({ size = 22 }: { size?: number }) {
  const checkSize = Math.round(size * 0.55);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: SUCCESS_GREEN,
        boxShadow: `0 0 ${size / 2}px ${SUCCESS_GREEN}66, 0 1px 4px rgba(16,185,129,0.30)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={checkSize} height={checkSize} viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2.5 6 L5 8.5 L9.5 3.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
