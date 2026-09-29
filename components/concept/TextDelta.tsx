'use client';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import h from './ConceptHome.module.css';
import s from './TextDelta.module.css';
import { W, useCalm } from './motion';

// Texting Delta (live since 2026-09-18): a real recording of two texts to Delta on a
// demo firm, played at 60fps in the phone frame. It plays only while the band is on screen.
export function TextDelta() {
  const reduced = useCalm();
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const inView = useInView(box, { amount: 0.35 });
  useEffect(() => {
    const v = vid.current;
    if (!v || reduced) return;
    if (inView) v.play().catch(() => {}); else v.pause();
  }, [inView, reduced]);
  return <section className={s.text} id="text"><div ref={box} className={`${h.container} ${s.inner}`}>
    <div className={s.copy}>
      <h2 data-reveal="words"><W>Your whole firm,</W> <span><W>one text away.</W></span></h2>
      <p className={s.lead} data-reveal="up" data-delay=".4">Once connected, Delta answers from your live case system, CRM and Outlook, and updates them when you say so.</p>
    </div>
    <div className={s.stage} data-reveal="up">
      <video ref={vid} className={s.phone} src="/concept/media/text-delta.mp4" poster="/concept/media/text-delta-poster.jpg"
        muted loop playsInline preload="metadata" disablePictureInPicture disableRemotePlayback controlsList="nopictureinpicture nodownload nofullscreen noremoteplayback" onContextMenu={(e) => e.preventDefault()} width={1100} height={1412}
        aria-label="A lawyer texts Delta asking whether the Martinez adjuster answered the demand, then which bills came in this week, and Delta answers each from the firm's own systems."/>
    </div>
  </div></section>;
}
