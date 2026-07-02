"use client";

/**
 * Demo page. Migrated to the marketing kit (components/marketing/kit.tsx).
 *
 * Low-friction "book a demo" surface: a real file, your actual stack, fifteen
 * minutes, no slides. The booking + conversion logic (LinkedIn, PostHog, Meta
 * pixel, then open the booking URL) is preserved from the old demo body and only
 * restyled. Honest claims only, human-in-the-loop, Delta is gender-neutral, no
 * em dashes.
 */
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FooterV2 } from "@/components/FooterV2";
import { newEventId, trackMetaCompleteRegistration } from "@/lib/meta-pixel";
import {
  BF, BG, SERIF, SANS,
  useRise, Container, Section, H, Sub, Eyebrow, Accent, Check, PageHero,
} from "@/components/marketing/kit";

const CONVERSION_SOURCE = "lp_demo";
const BOOKING_URL = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || "";
const LINKEDIN_DEMO_BOOKED_ID = process.env.NEXT_PUBLIC_LINKEDIN_DEMO_BOOKED_CONVERSION_ID;
const LINKEDIN_DEMO_STARTED_ID = process.env.NEXT_PUBLIC_LINKEDIN_DEMO_STARTED_CONVERSION_ID;

// PostHog loads lazily, so window.posthog can be undefined when an on-mount
// effect fires. Retry briefly (~3s) instead of dropping the event.
function capturePosthog(eventName: string, props?: Record<string, unknown>, attempt = 0) {
  if (typeof window === "undefined") return;
  if (window.posthog) {
    window.posthog.capture(eventName, props);
    return;
  }
  if (attempt >= 30) return;
  setTimeout(() => capturePosthog(eventName, props, attempt + 1), 100);
}

function fireConversion(id: string | undefined, eventName: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (id && typeof window.lintrk === "function") {
    const numericId = Number(id);
    if (!Number.isNaN(numericId)) {
      window.lintrk("track", { conversion_id: numericId });
    }
  }
  capturePosthog(eventName, props);
}

const EXPECT = [
  {
    t: "One of your real cases",
    d: "Bring an actual file from your firm, records and all. We work it live, never a canned demo dataset.",
  },
  {
    t: "Your actual stack",
    d: "Delta runs against the tools your firm already uses, so you see the work happen in your case manager, your email, and your drive.",
  },
  {
    t: "About fifteen minutes",
    d: "Short and focused. You hand Delta a job in plain English, then watch it do the work end to end.",
  },
  {
    t: "No slides, no stock demo",
    d: "No deck and no pre-baked script. Just Delta doing real work on your case, with a person on your team approving every step.",
  },
];

function BookButton({ label, onClick, onDark = false }: { label: string; onClick: () => void; onDark?: boolean }) {
  const bg = onDark ? "#ffffff" : BF.pillBg;
  const fg = onDark ? "#1f3a5f" : "#ffffff";
  const dot = onDark ? "#1f3a5f" : "#ffffff";
  const arrow = onDark ? "#ffffff" : "#1f3a5f";
  return (
    <button
      type="button"
      onClick={onClick}
      className={onDark ? "cd-pill-d" : "cd-pill2"}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, background: bg, color: fg,
        border: "none", cursor: "pointer",
        borderRadius: 48, padding: "12px 12px 12px 26px", fontFamily: SANS, fontSize: 15.5, fontWeight: 600,
        letterSpacing: "-0.2px", lineHeight: 1, whiteSpace: "nowrap",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
      }}
    >
      {label}
      <span style={{ width: 26, height: 26, borderRadius: "50%", background: dot, display: "grid", placeItems: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={arrow} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </span>
    </button>
  );
}

export function DemoClient() {
  const rise = useRise();

  useEffect(() => {
    fireConversion(LINKEDIN_DEMO_STARTED_ID, "demo_page_viewed", { source: CONVERSION_SOURCE });
  }, []);

  const handleBook = (placement: string) => {
    const eventId = newEventId();
    fireConversion(LINKEDIN_DEMO_BOOKED_ID, "demo_booked", { source: CONVERSION_SOURCE, placement });
    trackMetaCompleteRegistration(
      { content_name: "demo_booking", content_category: CONVERSION_SOURCE },
      { eventID: eventId },
    );
    if (BOOKING_URL) {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main style={{ background: BG.white }}>
      <PageHero
        eyebrow="Book a demo"
        title={<>See it work on <Accent>one of your real cases.</Accent></>}
        sub="Bring one real file from your firm and watch Delta do the job inside the tools you already use, in about fifteen minutes. No slides, and no stock demo."
      >
        <div style={{ marginTop: 36 }}>
          <BookButton label="Pick a time" onClick={() => handleBook("hero")} />
        </div>
      </PageHero>

      {/* WHAT TO EXPECT */}
      <Section bg={BG.offWhite}>
        <Container>
          <motion.div {...rise(0)} style={{ maxWidth: 820 }}>
            <Eyebrow>What to expect</Eyebrow>
            <H>A working session, <Accent>not a sales pitch.</Accent></H>
            <Sub>You will not sit through a deck. You bring one real case, and Delta does the work in front of you, in your own tools.</Sub>
          </motion.div>
          <div className="cd-expect-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 48 }}>
            {EXPECT.map((item, i) => (
              <motion.article key={item.t} {...rise(0.05 * i)} className="cd-card" style={{ background: BF.card, border: `1px solid ${BF.hairlineStrong}`, borderRadius: 16, padding: "28px 26px 30px" }}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: BF.accentSoft, border: `1px solid ${BF.accentBorderHover}`, marginBottom: 16 }}>
                  <Check />
                </span>
                <h3 style={{ fontFamily: SANS, fontSize: 18.5, fontWeight: 600, letterSpacing: "-0.3px", color: BF.ink, lineHeight: 1.25, margin: 0 }}>{item.t}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55, color: BF.muted, marginTop: 10 }}>{item.d}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* BOOKING (this page is the conversion, so this stands in for the final CTA band) */}
      <Section bg={BG.ctaBand}>
        <Container narrow>
          <motion.div {...rise(0)} style={{ textAlign: "center" }}>
            <Eyebrow light>Pick a time</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px, 4.8vw, 56px)", lineHeight: 1.04, letterSpacing: "-1.4px", color: "#fff", margin: "0 auto", maxWidth: 720 }}>
              Book your fifteen minutes.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "20px auto 0", maxWidth: 540 }}>
              Grab a slot that works for you. Bring one real case, and we will work it together in your own tools.
            </p>
            <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
              <BookButton label="Pick a time" onClick={() => handleBook("booking")} onDark />
            </div>
            <p style={{ fontFamily: SANS, fontSize: 14, color: "rgba(255,255,255,0.55)", letterSpacing: "-0.1px", margin: "20px auto 0" }}>
              No migration, and nothing to rip out.
            </p>
          </motion.div>
        </Container>
      </Section>

      <FooterV2 />

      <style>{`
        @media (max-width: 880px) {
          .cd-expect-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
