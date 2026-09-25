'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ArrowUpRight, KeyRound, Lock, Pause, Play, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { PRICE_UNIT, PRICING_HEADING, SCALE_NOTE, TERM_NOTE, TIERS } from '@/lib/pricing';
import { HOME_SECURITY, claim } from '@/lib/security';
import { trackEvent } from '@/lib/posthog';
import { SiteShell } from '@/components/site/SiteShell';
import { BOOK_HREF } from '@/components/site/nav';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { ConnectBand } from '@/components/site/kit/ConnectBand';
import { MoreLink } from '@/components/site/kit/kit';
import s from './ConceptHome.module.css';
import { SystemMap, MAP_STEPS } from './SystemMap';
import { W, useCalm } from './motion';

const BOOK = BOOK_HREF;
// The icon beside each security claim on the #privacy band, by claim id.
const SECURITY_ICON: Record<string, typeof Lock> = { hipaa: ShieldCheck, training: Lock, 'in-place': KeyRound };
// The solution section: the three things Delta does, as a list on the left that
// walks itself, with the system map on the right lighting the systems each one uses.
//
// Auto-advance every 5s, click a row to jump, hover to hold. The progress line
// is keyed on the active index so it restarts cleanly, and reduced motion turns
// the whole thing into a plain list with the first card showing.
const SOLUTION_STEPS = [
  { title: 'Pull reports across the entire firm' },
  { title: 'Update cases, build spreadsheets, and draft documents' },
  { title: 'Set Delta to run on a schedule' },
];
const STEP_MS = 5000;

function SolutionShowcase() {
  const reduced = useCalm();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: 0.35 });
  useEffect(() => {
    if (reduced || held || !inView) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % SOLUTION_STEPS.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active, held, reduced, inView]);
  return <div ref={box} className={`${s.container} ${s.solutionInner}`}>
    <div className={s.solutionCopy}>
      <h2 data-reveal="words"><W>CaseDelta pulls case details, keeps the file updated, and automates entire workflows</W> <span><W>across the system your firm already uses.</W></span></h2>
      <ul className={s.steps} data-reveal="stagger" data-delay=".35" onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)}>
        {SOLUTION_STEPS.map((step, i) => <li key={step.title} className={i === active ? s.stepOn : undefined}>
          <button type="button" onClick={() => setActive(i)} aria-current={i === active}>
            <span className={s.stepText}><h3>{step.title}</h3><small>{MAP_STEPS[i].systems}</small></span>
            <ArrowUpRight size={20}/>
          </button>
          <span className={s.stepRail} aria-hidden="true">
            {i === active && !reduced && <span key={active} className={s.stepFill} style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: held ? 'paused' : 'running' }}/>}
          </span>
        </li>)}
      </ul>
    </div>
    <div className={s.solutionStage} data-reveal="map"><SystemMap active={active} still={!!reduced}/></div>
  </div>;
}
// The hero's phone box, as on sendblue.com: a number is the only ask here. It
// opens /demo with the number already in the iClosed form (iClosed reads
// iclosedPhone). A full page load on purpose: /demo's inline iframe script
// does not run on a client-side route change.
function HeroBook() {
  const [digits, setDigits] = useState('');
  const shown = digits.length <= 3 ? digits : digits.length <= 6 ? `(${digits.slice(0,3)}) ${digits.slice(3)}` : `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  const ready = digits.length === 10;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    trackEvent('demo_hero_phone_submitted', {});
    const q = new URLSearchParams(window.location.search);
    q.set('iclosedPhone', `+1${digits}`);
    window.location.assign(`${BOOK}?${q}`);
  };
  return <div className={`${s.heroBook} ${s.heroCta}`}>
    <form className={s.bookCard} onSubmit={submit}>
      <h2>Get info</h2>
      <div className={s.bookRow}>
        <label className={s.bookPhone}><span className={s.bookCountry} aria-hidden="true">🇺🇸 +1</span>
          <input type="tel" inputMode="tel" autoComplete="tel-national" aria-label="Your mobile number" placeholder="Enter your number" value={shown}
            onChange={(e) => { let d = e.target.value.replace(/\D/g, ''); if (d.length === 11 && d.startsWith('1')) d = d.slice(1); setDigits(d.slice(0, 10)); }}/></label>
        <button type="submit" disabled={!ready}>Submit</button>
      </div>
      <p className={s.rating}><svg className={s.googleMark} width="16" height="16" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2582h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.6151z"/><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2582c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"/><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"/><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4636.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.656 3.5795 9 3.5795z"/></svg><strong>4.8</strong><span className={s.stars} role="img" aria-label="Rated 4.8 out of 5 on Google"><span className={s.starsBase} aria-hidden="true"><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg></span><span className={s.starsFill} aria-hidden="true"><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg><svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.472 5.008 5.528.803-4 3.898.944 5.506L10 15.117l-4.944 2.598.944-5.506-4-3.898 5.528-.803L10 1.5z"/></svg></span></span></p>
    </form>
    
  </div>;
}
// The hero film. Click anywhere on it to play or pause; the controls only
// appear on hover so the picture is uninterrupted the rest of the time. It
// starts muted because a browser will not autoplay a film with sound.
function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const toggle = () => { const el = video.current; if (!el) return; if (el.paused) { el.play(); } else { el.pause(); } };
  const sound = (e: React.MouseEvent) => { e.stopPropagation(); const el = video.current; if (!el) return; el.muted = !el.muted; setMuted(el.muted); };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const el = video.current; if (!el || !el.duration) return;
    const box = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - box.left) / box.width) * el.duration;
  };
  return <div className={s.heroFilm} data-reveal="scale" data-delay=".5">
    <video ref={video} src="/concept/media/hero-spot-v08.mp4" poster="/concept/media/hero-spot-v08-poster.jpg"
      autoPlay muted loop playsInline preload="metadata" disablePictureInPicture disableRemotePlayback controlsList="nodownload noplaybackrate nofullscreen" aria-label="A short film of Delta at work"
      onClick={toggle} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onTimeUpdate={(e) => { const el = e.currentTarget; if (el.duration) setProgress((el.currentTime / el.duration) * 100); }}/>
    <div className={s.filmControls}>
      <button type="button" className={s.filmButton} onClick={toggle} aria-label={playing ? 'Pause the film' : 'Play the film'}>
        {playing ? <Pause size={16}/> : <Play size={16}/>}
      </button>
      <div className={s.filmTrack} onClick={seek} role="presentation"><span style={{ width: `${progress}%` }}/></div>
      <button type="button" className={s.filmButton} onClick={sound} aria-label={muted ? 'Unmute the film' : 'Mute the film'}>
        {muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}
      </button>
    </div>
  </div>;
}

export function ConceptHome() {
  return <SiteShell variant="photo" home>
      <section className={s.hero}>
        <img className={s.heroImage} data-parallax=".08" src="/v2/ambient/mountain.webp" alt="" fetchPriority="high"/>
        <div className={s.heroShade}/>
        <div className={s.heroContent}><div className={s.heroCopy}><h1 className={s.heroTitle}><span>Run the firm like there were <em className={s.heroEm}>100 of you.</em></span></h1><HeroBook/></div><HeroFilm/></div>
      </section>
      <section className={s.problem} id="problem"><div className={`${s.container} ${s.problemInner}`}><h2 data-reveal="words"><W>Your case info lives in several places that</W> <span className={s.problemRule}><W>don’t talk to each other.</W></span></h2></div></section>
      <section className={s.solution} id="work"><SolutionShowcase/></section>
      <ConnectBand id="how"/>
      <section className={s.privacy} id="privacy"><div className={`${s.container} ${s.privacyInner}`}><div><h2 data-reveal="words"><W>{HOME_SECURITY.heading}</W></h2><div data-reveal="up" data-delay=".5"><MoreLink href="/security">How we protect client data</MoreLink></div></div><ul className={s.privacyList} data-reveal="stagger" data-delay=".25">{HOME_SECURITY.points.map((id) => { const Icon = SECURITY_ICON[id] ?? ShieldCheck; return <li key={id}><i><Icon size={26}/></i>{claim(id).label}</li>; })}</ul></div></section>
      <section className={s.pricing} id="pricing"><div className={s.container}><h2 className={s.pricingTitle} data-reveal="words"><W>{PRICING_HEADING}</W></h2><div className={s.priceTable} data-reveal="stagger" data-delay=".25">{TIERS.map(t => <a href={BOOK} key={t.accounts}><span>{t.band}</span><div><strong>{t.price}</strong><span>{PRICE_UNIT}</span></div><ArrowUpRight size={24}/></a>)}</div><p className={s.priceNote} data-reveal="up" data-delay=".6">{TERM_NOTE} {SCALE_NOTE}</p><div data-reveal="up" data-delay=".7"><MoreLink href="/pricing" onDark>See full pricing</MoreLink></div></div></section>
      <CtaBand/>
  </SiteShell>;
}
