import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CaseDelta: AI Associate for Plaintiff Law Firms";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FFFFFF",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#1D4ED8",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          Delta
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "#0A0A0A",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            maxWidth: 900,
            marginBottom: 32,
          }}
        >
          An AI associate that knows every case. Delta drives the tools your
          firm already runs and keeps your client data inside your walls.
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#888888",
            letterSpacing: "-0.01em",
          }}
        >
          casedelta.com
        </div>
      </div>
    ),
    { ...size }
  );
}
