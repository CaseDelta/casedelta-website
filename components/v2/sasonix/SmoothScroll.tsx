"use client";

/**
 * Momentum-damped ("heavy") smooth scrolling for /v2, matching the weighted feel of
 * the live Framer site. Intercepts wheel input and lerps the scroll position toward
 * a target each frame; other scroll sources (scrollbar drag, keyboard, anchor jumps)
 * keep the target in sync when the loop is idle so nothing fights the animation.
 *
 * Gated off for touch devices (native momentum is better there) and reduced-motion.
 * Renders nothing.
 */
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const EASE = 0.09; // lower = heavier / slower
    let target = window.scrollY;
    let current = window.scrollY;
    let running = false;
    let raf = 0;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clamp = (v: number) => Math.max(0, Math.min(v, maxScroll()));

    const animate = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        running = false;
        window.scrollTo(0, current);
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(animate);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // let pinch-zoom through
      e.preventDefault();
      // deltaMode 1 = lines, 2 = pages; normalize to pixels
      const factor = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      target = clamp(target + e.deltaY * factor);
      if (!running) {
        running = true;
        current = window.scrollY;
        raf = requestAnimationFrame(animate);
      }
    };

    // keep target aligned when the user scrolls by other means (scrollbar, keys, jumps)
    const onScroll = () => {
      if (!running) target = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
