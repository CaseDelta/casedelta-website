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

    const EASE = 0.12; // lower = heavier / slower (was 0.09; nudged up for a lighter, faster feel)
    let target = window.scrollY;
    let current = window.scrollY;
    let running = false;
    let raf = 0;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clamp = (v: number) => Math.max(0, Math.min(v, maxScroll()));

    // behavior:"instant" so the global `html { scroll-behavior: smooth }` doesn't ALSO
    // animate each frame's scrollTo. That double-smoothing makes the page creep for a
    // moment (native smooth-scroll chasing a target that moves every frame), then lurch
    // ahead once this lerp settles. This lerp must be the only smoothing.
    const jump = (y: number) => window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
    const animate = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        running = false;
        jump(current);
        return;
      }
      jump(current);
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
