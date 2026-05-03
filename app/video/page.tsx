import Link from "next/link";

const FONT = 'var(--font-open-sauce), "Open Sauce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const SCENES: { path: string; label: string; duration: string; status: "ready" | "todo" }[] = [
  { path: "/video/dream",    label: "1. Dream",     duration: "12s", status: "ready" },
  { path: "/video/solution", label: "2. Solution",  duration: "11s", status: "ready" },
  { path: "/video/demo",     label: "3. Demo",      duration: "12s", status: "ready" },
  { path: "/video/usecases", label: "4. Use Cases", duration: "11s", status: "ready" },
  { path: "/video/outro",    label: "5. Outro",     duration: "9.5s", status: "ready" },
];

export default function VideoIndexPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        color: "#E5E5E5",
        fontFamily: FONT,
        padding: "60px 48px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.5, marginBottom: 12 }}>
          CaseDelta VSL · capture index
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", margin: 0, marginBottom: 8 }}>
          Scene routes
        </h1>
        <p style={{ fontSize: 14, opacity: 0.6, margin: 0, marginBottom: 32, lineHeight: 1.6 }}>
          Each scene auto-plays after a 500ms settle hold. Press <kbd style={kbd}>SPACE</kbd> to replay. Append <code style={code}>?debug=1</code> for a timing overlay. Capture from a 1920×1080 fullscreen Chrome window using macOS Cmd+Shift+5. Always record from a production build (<code style={code}>npm run build &amp;&amp; npm start</code>), never <code style={code}>npm run dev</code>.
        </p>

        <Link
          href="/video/play"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 22px",
            borderRadius: 10,
            border: "1px solid rgba(37,99,235,0.35)",
            background: "linear-gradient(135deg, rgba(37,99,235,0.10) 0%, rgba(37,99,235,0.04) 100%)",
            color: "#E5E5E5",
            textDecoration: "none",
            marginBottom: 28,
          }}
        >
          <span>
            <span style={{ display: "block", fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>
              ▶ Play full sequence
            </span>
            <span style={{ display: "block", fontSize: 12, opacity: 0.55, marginTop: 4 }}>
              All built scenes back-to-back with crossfades · refresh to replay
            </span>
          </span>
          <span style={pill("ready")}>combined</span>
        </Link>

        <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.4, marginBottom: 10 }}>
          Per-scene capture
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {SCENES.map((s) => {
            const ready = s.status === "ready";
            return (
              <li key={s.path}>
                {ready ? (
                  <Link
                    href={s.path}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.02)",
                      color: "#E5E5E5",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{s.label}</span>
                    <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <span style={{ fontSize: 12, opacity: 0.55 }}>{s.duration}</span>
                      <span style={pill("ready")}>ready</span>
                    </span>
                  </Link>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      borderRadius: 8,
                      border: "1px dashed rgba(255,255,255,0.08)",
                      background: "transparent",
                      color: "rgba(229,229,229,0.45)",
                      cursor: "default",
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{s.label}</span>
                    <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <span style={{ fontSize: 12, opacity: 0.55 }}>{s.duration}</span>
                      <span style={pill("todo")}>todo</span>
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div style={{ marginTop: 40, fontSize: 12, opacity: 0.4, lineHeight: 1.6 }}>
          Source script: <code style={code}>VSL_SCRIPT.md</code>
        </div>
      </div>
    </div>
  );
}

const kbd: React.CSSProperties = {
  fontFamily: FONT,
  fontSize: 11,
  padding: "2px 6px",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 4,
  background: "rgba(255,255,255,0.05)",
  color: "#E5E5E5",
};

const code: React.CSSProperties = {
  fontFamily: '"SF Mono", ui-monospace, Menlo, monospace',
  fontSize: 12,
  padding: "1px 5px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: 3,
};

const pill = (kind: "ready" | "todo"): React.CSSProperties => ({
  fontSize: 10,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  padding: "3px 7px",
  borderRadius: 999,
  background: kind === "ready" ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
  color: kind === "ready" ? "#86EFAC" : "rgba(229,229,229,0.5)",
  border: `1px solid ${kind === "ready" ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.10)"}`,
});
