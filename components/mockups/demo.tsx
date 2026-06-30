"use client";

/**
 * Shared engine for the hero-demo mockups. One motion system + one visibility-gated loop,
 * so every mockup is pure presentation over the same scenes. Built from the animation
 * research: ease-out cubic-bezier(0.23,1,0.32,1), ~150-300ms, snappy springs (not bouncy),
 * transform/opacity only, accumulating list via layout + AnimatePresence, realistic legal
 * data, paused when off-screen or in a background tab, reduced-motion = static final state.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

/* ---- palette (warm neutrals + brand blue/navy), shared with the site ---- */
export const C = {
  ink: "#1c1a16",
  muted: "#5d574e",
  faint: "#948c7f",
  hair: "rgba(28,24,18,0.08)",
  hair2: "rgba(28,24,18,0.12)",
  accent: "#2f6fe0",
  accentSoft: "rgba(47,111,224,0.08)",
  accentLine: "rgba(47,111,224,0.32)",
  green: "#1f8a55",
  navy: "#1f3a5f",
  ink2: "#16140f",
};
export const SANS = "var(--font-hanken), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
export const SERIF = "var(--font-newsreader), Georgia, serif";

/* ---- motion system (the house set from research) ---- */
export const EASE = {
  out: [0.23, 1, 0.32, 1] as const, // strong ease-out = easeOutQuint. Default for entrances.
  outExpo: [0.16, 1, 0.3, 1] as const,
  in: [0.4, 0, 1, 1] as const, // exits leaving the flow
};
export const SPRING = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 38, mass: 1 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 32, mass: 1 },
};
export const T = {
  enter: { duration: 0.24, ease: EASE.out },
  exit: { duration: 0.16, ease: EASE.in },
};

/* ---- premium static layer: layered hue-tinted shadow + hairline border + inner light ring ---- */
export const PANEL_SHADOW =
  "0 0 0 1px rgba(28,24,18,0.05), inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 2px rgba(28,24,18,0.04), 0 10px 20px -6px rgba(28,24,18,0.07), 0 26px 50px -16px rgba(28,24,18,0.12), 0 52px 100px -30px rgba(47,111,224,0.20)";
export const INPUT_SHADOW =
  "0 0 0 1px rgba(28,24,18,0.06), inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(28,24,18,0.04), 0 14px 28px -12px rgba(28,24,18,0.14), 0 30px 60px -28px rgba(47,111,224,0.30)";

/* ---- scenes: realistic legal work Delta does end to end ---- */
export type Scene = { prompt: string; steps: string[]; result: string };
export const SCENES: Scene[] = [
  {
    prompt: "Request Ortega's missing records and chase them until they're in.",
    steps: ["Found 3 outstanding providers", "Sent the records requests", "Set follow-up reminders for Tuesday"],
    result: "3 requests sent · 2 chases scheduled · next follow-up Tue",
  },
  {
    prompt: "Draft the demand letter for the Martinez matter.",
    steps: ["Pulled the medical chronology", "Totaled the special damages", "Drafted and cited the demand"],
    result: "Demand drafted · $148,200 in specials · ready for your review",
  },
  {
    prompt: "What's slipping across my open cases this week?",
    steps: ["Scanned 14 open matters", "Found 3 deadlines inside 7 days", "Flagged the urgent discovery response"],
    result: "3 deadlines · 1 urgent: Ortega discovery, due Thursday",
  },
  {
    prompt: "Update the Clio matter and log my time.",
    steps: ["Updated the Ortega matter in Clio", "Logged a 0.4 hour time entry", "Posted a note to the client portal"],
    result: "Clio updated · 0.4 hrs logged · client portal notified",
  },
];

export type Step = { id: string; label: string; state: "running" | "done" };
export type DemoState = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  sceneIdx: number;
  prompt: string;
  typed: string;
  phase: "typing" | "working" | "done";
  steps: Step[];
  result: string | null;
};

/** The one loop that drives every mockup. Deterministic beat timing (tweens), springs per element. */
export function useDemoLoop(): DemoState {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [sceneIdx, setSceneIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "working" | "done">("typing");
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (!inView) return;
    const ac = new AbortController();
    const { signal } = ac;
    const sleep = (ms: number) =>
      new Promise<void>((res, rej) => {
        const t = setTimeout(res, ms);
        signal.addEventListener("abort", () => { clearTimeout(t); rej(new DOMException("", "AbortError")); }, { once: true });
      });

    if (reduce) {
      const s = SCENES[0];
      setTyped(s.prompt); setPhase("done");
      setSteps(s.steps.map((label, i) => ({ id: `0-${i}`, label, state: "done" })));
      setResult(s.result);
      return () => ac.abort();
    }

    let i = 0;
    (async () => {
      try {
        while (!signal.aborted) {
          const s = SCENES[i];
          setTyped(""); setSteps([]); setResult(null); setPhase("typing");
          await sleep(500);
          // typewriter with a humanized cadence
          for (let c = 1; c <= s.prompt.length; c += 1) {
            setTyped(s.prompt.slice(0, c));
            const ch = s.prompt[c - 1];
            const pause = ch === " " || ",.!?;:".includes(ch);
            await sleep(pause ? 58 : 24 + Math.random() * 20);
          }
          await sleep(620);
          // run each step: appear (running) then resolve (done)
          setPhase("working");
          for (let k = 0; k < s.steps.length; k += 1) {
            setSteps((prev) => [...prev, { id: `${i}-${k}`, label: s.steps[k], state: "running" }]);
            await sleep(880);
            setSteps((prev) => prev.map((st, idx) => (idx === k ? { ...st, state: "done" } : st)));
            await sleep(360);
          }
          await sleep(220);
          setResult(s.result);
          setPhase("done");
          await sleep(2800);
          while (document.hidden && !signal.aborted) await sleep(300);
          i = (i + 1) % SCENES.length;
          setSceneIdx(i);
        }
      } catch { /* aborted on cleanup */ }
    })();
    return () => ac.abort();
  }, [inView, reduce]);

  return { rootRef, sceneIdx, prompt: SCENES[sceneIdx].prompt, typed, phase, steps, result };
}

/* ---- shared atoms ---- */
export function DeltaMark({ size = 28 }: { size?: number }) {
  return (
    <span style={{ width: size, height: size, borderRadius: size * 0.3, flex: "0 0 auto", background: "linear-gradient(150deg,#3a78e0,#1f3a5f)", display: "grid", placeItems: "center", fontFamily: SERIF, color: "#fff", fontSize: size * 0.54, lineHeight: 1, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)" }}>D</span>
  );
}

export function StatusDot({ state, size = 22 }: { state: "running" | "done"; size?: number }) {
  return (
    <span style={{ width: size, height: size, flex: "0 0 auto", display: "grid", placeItems: "center", position: "relative" }}>
      <AnimatePresence mode="wait" initial={false}>
        {state === "running" ? (
          <motion.span key="spin" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.12 }}
            className="cd-spin" style={{ width: size * 0.8, height: size * 0.8, borderRadius: "50%", border: `2px solid ${C.accentLine}`, borderTopColor: C.accent }} />
        ) : (
          <motion.span key="check" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING.snappy}
            style={{ width: size, height: size, borderRadius: "50%", background: C.green, display: "grid", placeItems: "center" }}>
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/** Keyframes shared by every mockup (caret blink at rest, spinner). Render once per mockup. */
export function DemoStyles() {
  return (
    <style>{`
      .cd-spin { animation: cd-rot 0.7s linear infinite; }
      @keyframes cd-rot { to { transform: rotate(360deg); } }
      .cd-caret { display:inline-block; width:2px; height:1.05em; transform:translateY(0.14em); margin-left:2px; border-radius:1px; background:${C.accent}; vertical-align:baseline; }
      .cd-caret[data-rest="true"] { animation: cd-blink 1s steps(1) infinite; }
      @keyframes cd-blink { 0%,50%{opacity:1} 50.01%,100%{opacity:0} }
    `}</style>
  );
}

/** Ambient glow + faint grain stage background (peak alpha kept low). */
export function Stage({ children, glow = "rgba(47,111,224,0.16)", bg = "linear-gradient(180deg,#ffffff 0%, #f6f4ef 100%)" }: { children: React.ReactNode; glow?: string; bg?: string }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: bg, padding: "clamp(56px, 8vw, 96px) clamp(20px, 4vw, 40px)" }}>
      <div aria-hidden style={{ position: "absolute", left: "50%", top: "42%", transform: "translate(-50%,-50%)", width: "min(1000px, 120%)", height: 700, background: `radial-gradient(closest-side, ${glow}, transparent 72%)`, pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5, backgroundImage: "radial-gradient(rgba(28,24,18,0.045) 1px, transparent 1px)", backgroundSize: "24px 24px", WebkitMaskImage: "radial-gradient(ellipse 72% 56% at 50% 44%, #000 16%, transparent 74%)", maskImage: "radial-gradient(ellipse 72% 56% at 50% 44%, #000 16%, transparent 74%)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
