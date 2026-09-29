'use client';
/**
 * The "how connecting works" band, lifted from the homepage's #how section: the
 * three steps on the left, lit in step with the looping connect card on the right,
 * over the valley photograph. The homepage cycles through several platforms; an
 * integration page passes just its own.
 */
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ConnectFlow, CONNECT_STEPS, type ConnectPlatform } from '@/components/concept/ConnectFlow';
import { W, useCalm } from '@/components/concept/motion';
import s from '@/components/concept/ConceptHome.module.css';

export function ConnectBand({ id, heading = 'Connected in minutes, working the same day.', platforms }: { id?: string; heading?: string; platforms?: ConnectPlatform[] }) {
  const reduced = useCalm();
  const [step, setStep] = useState(0);
  const card = useRef<HTMLDivElement>(null);
  const inView = useInView(card, { once: true, amount: 0.5 });
  return <section className={s.how} id={id}>
    <img className={s.howPhoto} data-parallax=".1" src="/v2/ambient/valley-mist.webp" alt="" aria-hidden/>
    <div className={s.howShade}/>
    <div className={`${s.container} ${s.howInner}`}>
      <div className={s.howIntro}>
        <h2 data-reveal="words"><W>{heading}</W></h2>
        <ol className={s.howSteps} data-reveal="stagger" data-delay=".35">{CONNECT_STEPS.map((t, i) => <li key={t} className={reduced || i === step ? s.howStepOn : undefined}><span>{i + 1}</span>{t}</li>)}</ol>
      </div>
      <div ref={card} data-reveal="scale" data-delay=".2"><ConnectFlow still={!!reduced} running={inView} onStep={setStep} platforms={platforms}/></div>
    </div>
  </section>;
}
