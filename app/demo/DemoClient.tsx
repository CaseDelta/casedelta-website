"use client";

/**
 * /demo — book a demo. On the v2 kit (components/v2/sasonix/*), so it reads as the
 * same site as the homepage: shared Nav in its solid variant (there is no dark hero
 * behind it here), the same Archivo display type and tokens, and CtaFooter with the
 * big CTA band suppressed, because this page IS the call to action.
 *
 * THE TRACKING IS THE PART THAT MATTERS. This page is the only conversion surface
 * on the site, and three separate systems count it:
 *   - PostHog `demo_booked`, which is the conversion source of truth. Meta's pixel
 *     undercounts on iOS Safari, in the Facebook in-app browser and behind ad
 *     blockers, so the funnel is read from PostHog and reconciled against Meta.
 *   - Meta `CompleteRegistration`, which is the event the live ad set optimises for.
 *     Change the event name here and the ad set stops finding conversions.
 *   - LinkedIn conversion ids, which are optional and unset until LinkedIn paid ads
 *     launch. `fireConversion` no-ops cleanly when the id is undefined.
 *
 * A previous version of this page carried an inline Calendly embed. Calendly is gone
 * from the site; booking opens NEXT_PUBLIC_DEMO_BOOKING_URL, a Google appointment
 * scheduler, in a new tab. Never hardcode a scheduler vendor here, read the env var.
 *
 * `newEventId()` threads a UUID through the Meta event so a future server-side
 * Conversions API call can dedupe against the browser event without restructuring.
 */
import { useEffect } from "react";
import { SX, STAR_GOLD } from "@/components/v2/sasonix/tokens";
import { PageShell } from "@/components/v2/sasonix/PageShell";
import { Container, Eyebrow } from "@/components/v2/sasonix/kit";
import { Reveal } from "@/components/v2/sasonix/reveal";
import { newEventId, trackMetaCompleteRegistration } from "@/lib/meta-pixel";

const CONVERSION_SOURCE = "lp_demo";
const BOOKING_URL = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || "";
const LINKEDIN_DEMO_BOOKED_ID = process.env.NEXT_PUBLIC_LINKEDIN_DEMO_BOOKED_CONVERSION_ID;
const LINKEDIN_DEMO_STARTED_ID = process.env.NEXT_PUBLIC_LINKEDIN_DEMO_STARTED_CONVERSION_ID;

/**
 * PostHog loads lazily, so window.posthog can still be undefined when an on-mount
 * effect fires. Retry for ~3s rather than dropping the event on the floor.
 */
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

/** What the fifteen minutes actually contains. Concrete, and all four are true. */
const EXPECT = [
  "One of your real cases, records and all",
  "Delta driving the tools your firm already uses",
  "About fifteen minutes, live over video",
  "No deck, no stock demo, nothing to set up first",
];

export function DemoClient() {
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
    /* No CTA band: this page is the call to action, so asking twice is asking worse. */
    <PageShell showCta={false}>
      <section style={{ background: SX.bg, padding: "148px 0 112px" }}>
        <Container>
          <div className="sx-demo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
            {/* LEFT: the pitch */}
            <Reveal>
              <div style={{ maxWidth: 520 }}>
                <Eyebrow>Book a demo</Eyebrow>
                <h1 style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 54, lineHeight: "60px", letterSpacing: "-2px", color: SX.ink, margin: "24px 0 0", maxWidth: 480 }}>
                  See it work on one of your real cases
                </h1>
                <p style={{ fontFamily: SX.body, fontWeight: 400, fontSize: 18, lineHeight: "30px", color: SX.ink2, margin: "20px 0 0", maxWidth: 460 }}>
                  Bring one real file from your firm. We connect Delta to the tools you already use, then work that matter in front of you, so you see the work rather than a slideshow.
                </p>

                <div style={{ marginTop: 34 }}>
                  <div style={{ fontFamily: SX.mono, fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: SX.ink2, marginBottom: 16 }}>
                    What to expect
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {EXPECT.map((t) => (
                      <span key={t} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: SX.body, fontSize: 16, fontWeight: 500, color: SX.ink }}>
                        <Check />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Proof: one real, attributable quote. Same one the hero carries. */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
                  <span aria-hidden style={{ width: 1, height: 46, background: SX.hairline }} />
                  <div>
                    <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
                      {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
                    </div>
                    <div style={{ fontFamily: SX.body, fontSize: 14.5, lineHeight: "20px", color: SX.ink }}>
                      &ldquo;Delta gives us back five hours a week per person, and we can handle more cases.&rdquo;
                    </div>
                    <div style={{ fontFamily: SX.body, fontSize: 13, lineHeight: "18px", color: SX.ink2, marginTop: 2 }}>
                      Kirschbaum &amp; Nowotny, LLC &middot; Overland Park, KS
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* RIGHT: the ask */}
            <Reveal delay={0.08} style={{ background: SX.surface, border: `1px solid ${SX.hairline}`, borderRadius: 20, boxShadow: "0 30px 70px -34px rgba(var(--sx-shadow-rgb), 0.28)", padding: "44px 40px", textAlign: "center" }}>
              <div style={{ fontFamily: SX.display, fontWeight: 500, fontSize: 30, letterSpacing: "-0.8px", lineHeight: 1.2, color: SX.ink }}>
                Book your fifteen minutes
              </div>
              <p style={{ fontFamily: SX.body, fontSize: 16, lineHeight: "26px", color: SX.ink2, margin: "14px auto 0", maxWidth: 340 }}>
                Pick a slot that works for you, and bring one real case.
              </p>
              <BookButton label="Pick a time" onClick={() => handleBook("card")} />
              <p style={{ fontFamily: SX.body, fontSize: 14, lineHeight: "22px", color: SX.ink3, margin: "22px auto 0", maxWidth: 320 }}>
                No migration, and nothing to rip out.
              </p>
            </Reveal>
          </div>
        </Container>
        <style>{`@media (max-width: 900px){ .sx-demo-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
        </section>

    </PageShell>
  );
}

/**
 * A button, not a link: booking fires three conversion events before it opens the
 * scheduler, and a plain href would race them.
 */
function BookButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="sx-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 28,
        background: SX.ink,
        color: SX.onInk,
        border: "none",
        cursor: "pointer",
        borderRadius: 12,
        padding: "15px 30px",
        fontFamily: SX.body,
        fontSize: 16,
        fontWeight: 500,
      }}
    >
      {label}
    </button>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={SX.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill={STAR_GOLD} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z" />
    </svg>
  );
}
