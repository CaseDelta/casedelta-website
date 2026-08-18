/**
 * Smoothly animate the window scroll to a section by id, offset for the fixed nav.
 * Used by the nav links and the in-page "See how it works" / "See pricing" buttons.
 *
 * Runs its own eased rAF loop (easeInOutCubic, distance-scaled duration). Each frame
 * scrolls with behavior:"instant" to OVERRIDE the global `html { scroll-behavior:
 * smooth }` in globals.css — otherwise every scrollTo becomes a native smooth scroll
 * that fights the rAF loop (a slow creep, then a jump). The wheel SmoothScroll only
 * drives its own loop on wheel input and re-syncs its target from window.scrollY when
 * idle, so the two do not fight in practice. Honors reduced motion (jumps instantly).
 * Distinct from SmoothScroll.tsx, which handles wheel momentum.
 */
const NAV_OFFSET = 156; // fixed nav (~83px) + breathing room, so headers land clear of the nav

export function scrollToSection(id: string, offset: number = NAV_OFFSET) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) {
    // Section isn't on this page (e.g. a secondary page like /demo) - jump to the homepage anchor.
    window.location.href = `/#${id}`;
    return;
  }

  const startY = window.scrollY;
  const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const targetY = Math.min(maxY, Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset));
  const dist = targetY - startY;
  if (Math.abs(dist) < 2) return;

  // behavior:"instant" overrides the global html{scroll-behavior:smooth}; without it
  // each frame's scrollTo would kick off a competing native smooth scroll.
  const jump = (y: number) => window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    jump(targetY);
    return;
  }

  const duration = Math.min(1100, Math.max(450, Math.abs(dist) * 0.5));
  const start = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    jump(Math.round(startY + dist * ease(p)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
