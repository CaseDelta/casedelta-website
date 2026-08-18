"use client";

/**
 * Shared Calendly inline embed. Canonical class-based widget: widget.js auto-inits
 * any .calendly-inline-widget on load, reading data-url verbatim (so primary_color
 * orange + hidden GDPR banner apply). The Book a demo links are full page loads, so
 * the script loads fresh per visit and auto-init always fires.
 *
 * Used two ways:
 *   - /v2/demo (eager): the page is the booking surface, load immediately.
 *   - homepage final CTA (lazy): the script + iframe load only when the booking
 *     section nears the viewport, so the homepage stays light for the many visitors
 *     who never scroll that far. A reserved minHeight prevents layout shift.
 */
import { useEffect, useRef, useState } from "react";

export const CALENDLY_URL = "https://calendly.com/camren-casedelta/new-meeting";

export function CalendlyEmbed({ url = CALENDLY_URL, lazy = false, height = 720 }: { url?: string; lazy?: boolean; height?: number }) {
  const [active, setActive] = useState(!lazy);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Lazy: activate when the placeholder scrolls near the viewport.
  useEffect(() => {
    if (active) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setActive(true); io.disconnect(); } },
      { rootMargin: "500px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  // Once active, load widget.js; it auto-initializes the .calendly-inline-widget below.
  useEffect(() => {
    if (!active) return;
    if (document.querySelector('script[data-calendly="1"]')) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.dataset.calendly = "1";
    document.body.appendChild(s);
  }, [active]);

  const dataUrl = `${url}?primary_color=ff7029&hide_gdpr_banner=1`;
  return (
    <div ref={wrapRef} style={{ minWidth: 320, minHeight: height }}>
      {active && (
        <>
          {/* React 19 hoists this stylesheet link to <head>; deduped by href. */}
          <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
          <div className="calendly-inline-widget" data-url={dataUrl} style={{ minWidth: 320, height }} />
        </>
      )}
    </div>
  );
}
