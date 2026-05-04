"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { setLinkedInUserData } from "@/lib/linkedin";

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const ACCENT = "#2563EB";
const ACCENT_DEEP = "#1D4ED8";
const BORDER = "#EDEDED";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BOOKING_URL = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || "";
const LINKEDIN_DEMO_BOOKED_ID = process.env.NEXT_PUBLIC_LINKEDIN_DEMO_BOOKED_CONVERSION_ID;
const LINKEDIN_DEMO_STARTED_ID = process.env.NEXT_PUBLIC_LINKEDIN_DEMO_STARTED_CONVERSION_ID;

type PostHogLike = { capture: (event: string, props?: Record<string, unknown>) => void };
declare global {
  interface Window {
    posthog?: PostHogLike;
  }
}

function fireConversion(id: string | undefined, eventName: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (id && typeof window.lintrk === "function") {
    const numericId = Number(id);
    if (!Number.isNaN(numericId)) {
      window.lintrk("track", { conversion_id: numericId });
    }
  }
  if (window.posthog) {
    window.posthog.capture(eventName, props);
  }
}

function SchedulerEmbed({ onBooked }: { onBooked: () => void }) {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || typeof data !== "object") return;
      const ev = (data as { event?: unknown }).event;
      if (typeof ev === "string" && ev === "calendly.event_scheduled") {
        onBooked();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onBooked]);

  const src = `${BOOKING_URL}${BOOKING_URL.includes("?") ? "&" : "?"}hide_gdpr_banner=1&primary_color=2563eb`;

  return (
    <iframe
      src={src}
      title="Book a demo with CaseDelta"
      style={{ width: "100%", height: 720, border: 0, display: "block" }}
      loading="eager"
    />
  );
}

function FallbackForm({ onBooked }: { onBooked: () => void }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          source: "demo",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setLinkedInUserData(form.email);
      onBooked();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: FONT,
    color: "#222",
    backgroundColor: "#FFFFFF",
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    letterSpacing: "-0.01em",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#0A0A0A",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    marginBottom: 6,
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={labelStyle} htmlFor="demo-name">Your name</label>
        <input
          id="demo-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
          placeholder="Jane Doe"
          onFocus={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT}1F`; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="demo-email">Work email</label>
        <input
          id="demo-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
          placeholder="you@lawfirm.com"
          onFocus={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT}1F`; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }}
        />
      </div>

      {error && (
        <p style={{ fontSize: 13, color: "#B91C1C", margin: 0 }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          height: 48,
          fontFamily: FONT,
          fontSize: 15,
          fontWeight: 600,
          color: "#FFFFFF",
          backgroundColor: submitting ? "#93B4F5" : ACCENT,
          border: "none",
          borderRadius: 8,
          cursor: submitting ? "not-allowed" : "pointer",
          letterSpacing: "-0.01em",
          boxShadow: `0 1px 3px ${ACCENT}25`,
          transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!submitting) {
            e.currentTarget.style.backgroundColor = ACCENT_DEEP;
            e.currentTarget.style.boxShadow = `0 4px 14px ${ACCENT}30`;
          }
        }}
        onMouseLeave={(e) => {
          if (!submitting) {
            e.currentTarget.style.backgroundColor = ACCENT;
            e.currentTarget.style.boxShadow = `0 1px 3px ${ACCENT}25`;
          }
        }}
      >
        {submitting ? "Booking..." : "Book my demo"}
      </button>
    </form>
  );
}

interface DemoBodyProps {
  /** Caller-supplied label for the "source" prop on the demo_booked PostHog event. */
  conversionSource?: string;
}

export function DemoBody({ conversionSource = "demo_page" }: DemoBodyProps) {
  const reduced = !!useReducedMotion();
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    fireConversion(LINKEDIN_DEMO_STARTED_ID, "demo_page_viewed", { source: conversionSource });
  }, [conversionSource]);

  const handleBooked = () => {
    setBookingConfirmed(true);
    fireConversion(LINKEDIN_DEMO_BOOKED_ID, "demo_booked", { source: conversionSource });
  };

  return (
    <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px, 4vw, 48px)" }}>
      <style>{`
        @media (min-width: 960px) {
          .cd-demo-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr) !important;
            gap: clamp(48px, 6vw, 80px) !important;
            align-items: center !important;
          }
        }
      `}</style>
      <div
        className="cd-demo-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
        }}
      >
        {/* Left — pitch */}
        <div>
          <motion.h1
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(34px, 4.6vw, 60px)",
              fontWeight: 700,
              color: "#0A0A0A",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              margin: 0,
              marginBottom: 20,
            }}
          >
            See Delta running on your firm&apos;s workflow.{" "}
            <span style={{ color: ACCENT }}>In 20 minutes.</span>
          </motion.h1>

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(16px, 1.35vw, 19px)",
              fontWeight: 400,
              color: "#5A5A5A",
              lineHeight: 1.55,
              letterSpacing: "-0.01em",
              margin: 0,
              marginBottom: 36,
              maxWidth: 520,
            }}
          >
            Delta connects every tool your firm already uses, so hours of legal work fit into a single sentence. Pick a time and we&apos;ll walk through it on a real plaintiff case.
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            style={{ marginBottom: 36, maxWidth: 520 }}
          >
            <p style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#0A0A0A",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: 0,
              marginBottom: 16,
            }}>
              What you&apos;ll see
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Delta running live on a sample case across Clio, Word, Gmail, and Drive.",
                "How Delta plugs into the tools your firm already uses.",
                "Private enterprise deployment and security, sized to your firm.",
              ].map((line, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    aria-hidden
                    style={{
                      flex: "0 0 auto",
                      marginTop: 9,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: ACCENT,
                    }}
                  />
                  <span style={{
                    fontSize: 15,
                    color: "#333",
                    lineHeight: 1.55,
                    letterSpacing: "-0.01em",
                  }}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Right — scheduler card */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{
            position: "relative",
            borderRadius: 14,
            border: `1px solid ${BORDER}`,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 24px rgba(15, 23, 42, 0.06), 0 1px 4px rgba(15, 23, 42, 0.04)",
            overflow: "hidden",
            minHeight: BOOKING_URL ? 720 : undefined,
          }}
        >
          {bookingConfirmed ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "64px 32px",
              minHeight: 540,
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: ACCENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                boxShadow: `0 6px 20px ${ACCENT}35`,
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#0A0A0A",
                margin: 0,
                marginBottom: 8,
                letterSpacing: "-0.02em",
              }}>
                You&apos;re booked.
              </h2>
              <p style={{ fontSize: 15, color: "#666", maxWidth: 360, margin: 0, lineHeight: 1.5 }}>
                A calendar invite is on its way. If you don&apos;t see it, check spam or email{" "}
                <a href="mailto:camren@casedelta.com" style={{ color: ACCENT, textDecoration: "none" }}>
                  camren@casedelta.com
                </a>.
              </p>
            </div>
          ) : BOOKING_URL ? (
            <SchedulerEmbed onBooked={handleBooked} />
          ) : (
            <FallbackForm onBooked={handleBooked} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
