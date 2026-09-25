'use client';
/** The homepage's reveal and parallax driver. The rules live in motion.css. */
import { Fragment, useEffect, useState, type RefObject } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Split text into masked words for data-reveal="words". */
export function W({ children }: { children: string }) {
  const words = children.split(' ');
  return <>{words.map((w, i) => <Fragment key={i}><span data-w=""><span>{w}</span></span>{i < words.length - 1 ? ' ' : ''}</Fragment>)}</>;
}

export function useMotion(site: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = site.current;
    if (!root) return;
    root.setAttribute('data-motion', 'live');
    const els = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
    for (const el of els) {
      if (el.dataset.delay) el.style.setProperty('--d', `${el.dataset.delay}s`);
      const kind = el.dataset.reveal;
      if (kind === 'words') el.querySelectorAll<HTMLElement>('[data-w]').forEach((w, i) => w.style.setProperty('--i', String(Math.min(i, 26))));
      if (kind === 'stagger') [...el.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(Math.min(i, 6))));
      if (kind === 'map') el.querySelectorAll<HTMLElement>('[data-part="tile"]').forEach((t, i) => t.style.setProperty('--i', String(i)));
    }
    const timers: number[] = [];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.setAttribute('data-in', '');
        io.unobserve(el);
        timers.push(window.setTimeout(() => el.setAttribute('data-done', ''), 2600));
      }
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));

    const layers = [...root.querySelectorAll<HTMLElement>('[data-parallax]')];
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const l of layers) {
        const box = l.parentElement!.getBoundingClientRect();
        if (box.bottom < -50 || box.top > vh + 50) continue;
        const k = Number(l.dataset.parallax) || 0.1;
        l.style.transform = `translate3d(0, ${(-(box.top + box.height / 2 - vh / 2) * k).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    if (!still && layers.length) { tick(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll); }
    return () => {
      io.disconnect(); timers.forEach(clearTimeout); if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll);
    };
  }, [site]);
}

/**
 * Reduced motion, safe to render from. useReducedMotion is null on the server and
 * true on a reduced-motion client, so branching markup on it breaks hydration;
 * this starts false on both sides and flips after mount.
 */
export function useCalm() {
  const reduced = useReducedMotion();
  const [calm, setCalm] = useState(false);
  useEffect(() => setCalm(!!reduced), [reduced]);
  return calm;
}
