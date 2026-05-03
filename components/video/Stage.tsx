"use client";

/**
 * VSL scene wrapper.
 *
 * Each scene is its own route under `app/video/*`. Mount this around the
 * scene to get:
 *   - full-bleed black (or custom) background, no scrollbars
 *   - cursor hidden globally
 *   - 500ms settle hold, then auto-play
 *   - SPACE to replay (useful while iterating)
 *   - `?debug=1` shows an elapsed-time overlay
 *
 * Scenes consume the clock via `useScene()` and key visual state off
 * `elapsedMs`. The clock starts at 0 the moment `playing` flips true
 * (i.e. after the settle hold).
 *
 * Recording: target a 1920x1080 fullscreen Chrome window, then macOS
 * Cmd+Shift+5 → "Record Selected Portion" over the page area. Production
 * build only (`npm run build && npm start`) — dev HMR throws off timing.
 */

import { createContext, useContext, useEffect, useRef, useState } from "react";

const SETTLE_MS = 500;

type SceneState = {
  playing: boolean;
  elapsedMs: number;
  totalMs: number;
};

const SceneContext = createContext<SceneState>({
  playing: false,
  elapsedMs: 0,
  totalMs: 0,
});

export function useScene() {
  return useContext(SceneContext);
}

type StageProps = {
  children: React.ReactNode;
  /** CSS background — solid color or gradient. Default: pure black. */
  background?: string;
  /** Total scene length in ms (informational; drives debug overlay). */
  durationMs: number;
};

export function Stage({ children, background = "#000", durationMs }: StageProps) {
  const [debug, setDebug] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [replayKey, setReplayKey] = useState(0);

  // Read query params once on mount (avoids Suspense boundary requirement
  // of next/navigation's useSearchParams).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    setDebug(sp.get("debug") === "1");
  }, []);

  // Lock body chrome for clean capture.
  useEffect(() => {
    const prevCursor = document.body.style.cursor;
    const prevOverflow = document.body.style.overflow;
    const prevMargin = document.body.style.margin;
    document.body.style.cursor = "none";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    return () => {
      document.body.style.cursor = prevCursor;
      document.body.style.overflow = prevOverflow;
      document.body.style.margin = prevMargin;
    };
  }, []);

  // Drive the clock. Re-runs whenever replayKey bumps (SPACE press).
  const startedAtRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setPlaying(false);
    setElapsedMs(0);
    startedAtRef.current = null;

    const settleTimer = setTimeout(() => {
      setPlaying(true);
      startedAtRef.current = performance.now();
      const tick = () => {
        if (startedAtRef.current === null) return;
        const dt = performance.now() - startedAtRef.current;
        setElapsedMs(dt);
        // Run ~1s past durationMs so scenes can render their tail-hold frame.
        if (dt < durationMs + 1500) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, SETTLE_MS);

    return () => {
      clearTimeout(settleTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startedAtRef.current = null;
    };
  }, [durationMs, replayKey]);

  // SPACE → replay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setReplayKey((n) => n + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SceneContext.Provider value={{ playing, elapsedMs, totalMs: durationMs }}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background,
          overflow: "hidden",
          cursor: "none",
        }}
      >
        {children}
        {debug && <DebugOverlay elapsedMs={elapsedMs} totalMs={durationMs} playing={playing} />}
      </div>
    </SceneContext.Provider>
  );
}

function DebugOverlay({
  elapsedMs,
  totalMs,
  playing,
}: {
  elapsedMs: number;
  totalMs: number;
  playing: boolean;
}) {
  const fmt = (ms: number) => `${(Math.max(0, ms) / 1000).toFixed(2)}s`;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 12,
        right: 12,
        padding: "6px 10px",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 6,
        color: "rgba(255,255,255,0.7)",
        fontFamily: 'var(--font-open-sauce), "Open Sauce Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: 11,
        letterSpacing: 0.2,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {playing ? "▶" : "⏸"} {fmt(elapsedMs)} / {fmt(totalMs)} · SPACE to replay
    </div>
  );
}
