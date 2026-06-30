"use client";

/**
 * Four production-ready hero-demo variations, all over the shared engine in ./demo.
 * Each is pure presentation: same scenes, same motion system, different framing.
 */
import { AnimatePresence, motion } from "framer-motion";
import { C, SANS, SERIF, SPRING, T, EASE, PANEL_SHADOW, INPUT_SHADOW, useDemoLoop, DeltaMark, StatusDot, DemoStyles, Stage, type Step } from "./demo";

const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";

function SendButton({ size = 40 }: { size?: number }) {
  return (
    <span style={{ width: size, height: size, borderRadius: "50%", background: "linear-gradient(160deg,#284b78,#16140f)", display: "grid", placeItems: "center", flex: "0 0 auto", boxShadow: "0 6px 16px -6px rgba(31,58,95,0.5)" }}>
      <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </span>
  );
}

function Caret({ show }: { show: boolean }) {
  if (!show) return null;
  return <span className="cd-caret" />;
}

/* ════════════════════════ 1. LIVE APP WINDOW (recommended) ════════════════════════ */
export function MockupWindow() {
  const d = useDemoLoop();
  return (
    <Stage>
      <DemoStyles />
      <div ref={d.rootRef} style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ borderRadius: 18, background: "#fff", boxShadow: PANEL_SHADOW }}>
          {/* chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, height: 44, padding: "0 16px", borderBottom: `1px solid ${C.hair}`, background: "#fcfbf9", borderRadius: "18px 18px 0 0" }}>
            {[0, 1, 2].map((i) => <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: "#e6e1d8" }} />)}
            <span style={{ marginLeft: 10, fontFamily: SANS, fontSize: 12.5, color: C.faint }}>Delta · Ortega v. Memorial</span>
            <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: SANS, fontSize: 11.5, fontWeight: 600, color: C.green }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />Online</span>
          </div>
          {/* body */}
          <div style={{ padding: "24px 22px 26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 56, padding: "0 8px 0 22px", borderRadius: 28, background: "#fff", boxShadow: INPUT_SHADOW }}>
              <span style={{ flex: 1, minWidth: 0, fontFamily: SANS, fontSize: 16, letterSpacing: "-0.2px", color: d.typed ? C.ink : C.faint, whiteSpace: "nowrap", overflow: "hidden" }}>
                {d.typed || "Ask Delta to handle something on a case"}
                <Caret show={d.phase === "typing"} />
              </span>
              <SendButton size={40} />
            </div>
            <motion.ul layout style={{ listStyle: "none", margin: "16px 0 0", padding: 0 }}>
              <AnimatePresence initial={false}>
                {d.steps.map((s) => (
                  <motion.li key={s.id} layout initial={{ opacity: 0, y: 12, filter: "blur(3px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -8, filter: "blur(3px)", transition: T.exit }} transition={SPRING.snappy}
                    style={{ display: "flex", alignItems: "center", gap: 13, padding: "10px 4px" }}>
                    <StatusDot state={s.state} size={22} />
                    <span style={{ fontFamily: SANS, fontSize: 15.5, letterSpacing: "-0.2px", color: s.state === "done" ? C.ink : C.muted }}>{s.label}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
            <AnimatePresence>
              {d.result && (
                <motion.div layout key="result" initial={{ opacity: 0, y: 12, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={SPRING.smooth}
                  style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14, background: C.accentSoft, border: `1px solid ${C.accentLine}` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><path d="M5 13l4 4L19 7" /></svg>
                  <span style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 500, color: C.ink }}>{d.result}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ════════════════════════ 2. COMMAND PALETTE (Raycast / cmdk) ════════════════════════ */
export function MockupPalette() {
  const d = useDemoLoop();
  return (
    <Stage glow="rgba(47,111,224,0.18)">
      <DemoStyles />
      <div ref={d.rootRef} style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ borderRadius: 18, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px) saturate(160%)", WebkitBackdropFilter: "blur(12px) saturate(160%)", boxShadow: PANEL_SHADOW, overflow: "hidden" }}>
          {/* input row */}
          <div style={{ display: "flex", alignItems: "center", gap: 13, height: 60, padding: "0 18px", borderBottom: `1px solid ${C.hair}` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><path d="M5 3l1.5 4L11 8.5 6.5 10 5 14 3.5 10 -.5 8.5 3.5 7 5 3z" transform="translate(2 1) scale(0.9)" /><path d="M18 13l.9 2.4L21 16l-2.1.6L18 19l-.9-2.4L15 16l2.1-.6L18 13z" /></svg>
            <span style={{ flex: 1, minWidth: 0, fontFamily: SANS, fontSize: 16.5, letterSpacing: "-0.2px", color: d.typed ? C.ink : C.faint, whiteSpace: "nowrap", overflow: "hidden" }}>
              {d.typed || "Ask Delta anything..."}
              <Caret show={d.phase === "typing"} />
            </span>
            <kbd style={{ fontFamily: SANS, fontSize: 11.5, fontWeight: 600, color: C.faint, background: C.hair, borderRadius: 6, padding: "4px 8px", flex: "0 0 auto" }}>↵</kbd>
          </div>
          {/* results */}
          <div style={{ padding: "8px 8px", minHeight: 64 }}>
            <AnimatePresence initial={false} mode="popLayout">
              {d.steps.length > 0 && (
                <motion.div key="hdr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase", color: C.faint, padding: "8px 12px 6px" }}>Delta is working</motion.div>
              )}
            </AnimatePresence>
            <motion.div layout>
              <AnimatePresence initial={false}>
                {d.steps.map((s) => {
                  const active = s.state === "running";
                  return (
                    <motion.div key={s.id} layout initial={{ opacity: 0, y: 10, filter: "blur(3px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -6, transition: T.exit }} transition={SPRING.snappy}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 10, background: active ? C.accentSoft : "transparent", transition: "background 0.3s ease" }}>
                      <StatusDot state={s.state} size={20} />
                      <span style={{ flex: 1, fontFamily: SANS, fontSize: 15, color: s.state === "done" ? C.ink : C.muted, fontWeight: active ? 600 : 400 }}>{s.label}</span>
                      {active && <span style={{ fontFamily: SANS, fontSize: 11.5, color: C.accent, fontWeight: 600 }}>running</span>}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
            <AnimatePresence>
              {d.result && (
                <motion.div layout key="res" initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={SPRING.smooth}
                  style={{ margin: "6px 4px 4px", display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", borderRadius: 10, background: "rgba(31,138,85,0.08)", border: "1px solid rgba(31,138,85,0.22)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: C.ink }}>{d.result}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* footer */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, height: 38, padding: "0 16px", borderTop: `1px solid ${C.hair}`, background: "rgba(252,251,249,0.8)", fontFamily: SANS, fontSize: 11.5, color: C.faint }}>
            <DeltaMark size={16} />
            <span style={{ marginLeft: -4 }}>Delta</span>
            <span style={{ marginLeft: "auto" }}>Actions inside your tools</span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ════════════════════════ 3. FLOATING INPUT + ACTION CHIPS ════════════════════════ */
export function MockupChips() {
  const d = useDemoLoop();
  return (
    <Stage>
      <DemoStyles />
      <div ref={d.rootRef} style={{ maxWidth: 660, margin: "0 auto" }}>
        {/* the rounded pill input */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, height: 64, padding: "0 12px 0 26px", borderRadius: 34, background: "linear-gradient(180deg,#ffffff,#fcfbf8)", boxShadow: INPUT_SHADOW }}>
          <span style={{ flex: 1, minWidth: 0, fontFamily: SANS, fontSize: 16.5, letterSpacing: "-0.2px", color: d.typed ? C.ink : C.faint, whiteSpace: "nowrap", overflow: "hidden" }}>
            {d.typed || "Ask Delta to handle something on a case"}
            <Caret show={d.phase === "typing"} />
          </span>
          <SendButton size={44} />
        </div>
        {/* action chips */}
        <div style={{ minHeight: 96, marginTop: 26, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <AnimatePresence initial={false} mode="popLayout">
            {d.steps.map((s) => (
              <motion.span key={s.id} layout initial={{ opacity: 0, scale: 0.9, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, transition: T.exit }} transition={SPRING.snappy}
                style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "10px 16px 10px 12px", borderRadius: 40, background: "#fff", boxShadow: "0 0 0 1px rgba(28,24,18,0.06), 0 10px 22px -12px rgba(28,24,18,0.22)" }}>
                <StatusDot state={s.state} size={19} />
                <span style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 500, color: s.state === "done" ? C.ink : C.muted }}>{s.label}</span>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        {/* result line */}
        <div style={{ height: 24, textAlign: "center" }}>
          <AnimatePresence>
            {d.result && (
              <motion.div key="r" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE.out }}
                style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: C.green, display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                {d.result}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}

/* ════════════════════════ 4. AGENT TRACE (Cursor / v0) ════════════════════════ */
function traceCall(label: string): string {
  // turn a plain step into a fake tool-call signature
  const map: Record<string, string> = {
    "Found 3 outstanding providers": 'list_records(matter="Ortega")',
    "Sent the records requests": 'send_request(providers=3)',
    "Set follow-up reminders for Tuesday": 'schedule(followup="Tue")',
    "Pulled the medical chronology": 'build_chronology(matter="Martinez")',
    "Totaled the special damages": 'sum_damages()',
    "Drafted and cited the demand": 'draft_demand(cite=true)',
    "Scanned 14 open matters": "scan_matters(open=14)",
    "Found 3 deadlines inside 7 days": "find_deadlines(window=7)",
    "Flagged the urgent discovery response": 'flag(urgent="discovery")',
    "Updated the Ortega matter in Clio": 'clio.update(matter="Ortega")',
    "Logged a 0.4 hour time entry": "clio.log_time(0.4)",
    "Posted a note to the client portal": "portal.note()",
  };
  return map[label] ?? "run()";
}

export function MockupTrace() {
  const d = useDemoLoop();
  return (
    <Stage bg="linear-gradient(180deg,#ffffff 0%, #f3f1ec 100%)">
      <DemoStyles />
      <div ref={d.rootRef} style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, height: 60, padding: "0 10px 0 22px", borderRadius: 30, background: "#fff", boxShadow: INPUT_SHADOW }}>
          <span style={{ flex: 1, minWidth: 0, fontFamily: SANS, fontSize: 16, letterSpacing: "-0.2px", color: d.typed ? C.ink : C.faint, whiteSpace: "nowrap", overflow: "hidden" }}>
            {d.typed || "Ask Delta to handle something on a case"}
            <Caret show={d.phase === "typing"} />
          </span>
          <SendButton size={42} />
        </div>
        <div style={{ minHeight: 196, marginTop: 16, borderRadius: 16, background: "#fbfaf8", boxShadow: "0 0 0 1px rgba(28,24,18,0.06), inset 0 1px 0 rgba(255,255,255,0.7)", padding: "8px 6px" }}>
          <motion.div layout>
            <AnimatePresence initial={false}>
              {d.steps.map((s) => (
                <motion.div key={s.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: T.exit }} transition={SPRING.snappy}
                  style={{ padding: "9px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <StatusDot state={s.state} size={18} />
                    <span style={{ fontFamily: MONO, fontSize: 13.5, color: s.state === "done" ? C.ink : C.muted }}>{traceCall(s.label)}</span>
                  </div>
                  <AnimatePresence>
                    {s.state === "done" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.28, ease: EASE.out }}
                        style={{ overflow: "hidden", paddingLeft: 29 }}>
                        <span style={{ fontFamily: SANS, fontSize: 13, color: C.faint }}>↳ {s.label}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {d.result && (
                <motion.div layout key="res" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={SPRING.smooth}
                  style={{ margin: "4px 8px 6px", display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", borderRadius: 10, background: C.accentSoft, border: `1px solid ${C.accentLine}` }}>
                  <DeltaMark size={18} />
                  <span style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 500, color: C.ink }}>{d.result}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Stage>
  );
}

export type { Step };
