'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, FileText, Mail, FolderOpen, Pause, Play, Plus, X } from 'lucide-react';
import { TIERS } from '@/lib/pricing';
import { LOGO } from '@/components/v2/sasonix/brand';
import { trackEvent } from '@/lib/posthog';
import { SmoothScroll } from '@/components/v2/sasonix/SmoothScroll';
import s from './ConceptHome.module.css';
import dynamic from 'next/dynamic';
// Client only: the product's components assume a browser (portals, timers), and
// the replay's code has no business in the first paint.
const DeltaReplay = dynamic(() => import('@/components/replay/DeltaReplay').then((m) => m.DeltaReplay), { ssr: false });
import type { Scenario } from 'delta-ui/scenario/types';
import type { ReplayPhase } from '@/components/replay/DeltaReplay';
import CHRONOLOGY from '@/content/replay/morgan-chronology.json';

const BOOK = '/demo';
const PROMPT = 'Build a treatment chronology from the Morgan records I attached. Cite every entry.';
const chapters = [
  { name: 'The request', title: 'Start with the work.', copy: 'Ask Delta for a treatment chronology, with a source for every entry.' },
  { name: 'The work', title: 'Follow the record.', copy: 'Delta reads each record, keeps track of where every fact came from, and says what it is doing as it goes.' },
  { name: 'The result', title: 'A chronology you can check.', copy: 'Read the sequence. Open the source. Review the work before you use it.' },
];
function DemoGraphic() {
  // The chapters follow the recorded run: the request, Delta working through
  // the records, and the cited result. Play runs the real timeline; a chapter
  // button jumps to that state. Reduced motion skips straight to the result.
  const reduced = useReducedMotion();
  const [chapter, setChapter] = useState(reduced ? 2 : 0);
  const playing = chapter === 1;
  const phase: ReplayPhase = chapter === 0 ? 'request' : chapter === 1 ? 'working' : 'result';
  const finish = useCallback(() => setChapter(2), []);
  return <div className={s.demonstration}>
    
    <div className={s.demoStage}>
      <div className={s.demoNarrative}><h3>{chapters[chapter].title}</h3><p>{chapters[chapter].copy}</p></div>
      <div className={s.graphic} aria-live="polite">
        <div className={s.graphicTop}><span className={s.deltaMark}><img src={LOGO.mark} alt="" /></span><strong>Delta</strong><span className={s.graphicContext}>Treatment chronology</span></div>
        <div className={s.replayScene}>
          <p className={s.prompt}>{PROMPT}</p>
          <div className={s.attachment}><FileText size={23}/><div><strong>Morgan · Medical records</strong><span>3 fictional records</span></div></div>
          <DeltaReplay scenario={CHRONOLOGY as unknown as Scenario} phase={phase} onFinished={finish} />
        </div>
      </div>
    </div>
    <div className={s.demoControls}><div className={s.chapters}>{chapters.map((item,i) => <button aria-pressed={chapter === i} onClick={() => setChapter(reduced && i === 1 ? 2 : i)} key={item.name}><span>0{i+1}</span>{item.name}</button>)}</div><button className={s.play} onClick={() => setChapter(playing ? 2 : reduced ? 2 : 1)} aria-label={playing ? 'Skip to the result' : 'Play the recorded run'}>{playing ? <Pause size={19}/> : <Play size={19}/>}<span>{playing ? 'Skip to result' : chapter === 2 ? 'Play again' : 'Play the run'}</span></button></div>
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
      <h2>Get a demo</h2>
      <div className={s.bookRow}>
        <label className={s.bookPhone}><span className={s.bookCountry} aria-hidden="true">🇺🇸 +1</span>
          <input type="tel" inputMode="tel" autoComplete="tel-national" aria-label="Your mobile number" placeholder="Enter your number" value={shown}
            onChange={(e) => { let d = e.target.value.replace(/\D/g, ''); if (d.length === 11 && d.startsWith('1')) d = d.slice(1); setDigits(d.slice(0, 10)); }}/></label>
        <button type="submit" disabled={!ready}>Submit</button>
      </div>
    </form>
    <p className={s.rating}><span aria-hidden="true">★★★★★</span> 5.0 rating</p>
  </div>;
}
export function ConceptHome() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 40);
    scroll(); window.addEventListener('scroll',scroll,{passive:true});
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuRef.current?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuRef.current?.focus(); } };
    window.addEventListener('keydown',escape);
    return () => { window.removeEventListener('scroll',scroll); window.removeEventListener('keydown',escape); };
  }, []);
  return <div className={s.site}>
    <SmoothScroll/>
    <a className={s.skip} href="#content">Skip to content</a>
    <header className={`${s.navigation} ${scrolled || menu ? s.navigationSolid : ''}`}>
      <a href="/" aria-label="CaseDelta home"><img className={s.logo} src={scrolled || menu ? LOGO.onLight : LOGO.onDark} alt="CaseDelta"/></a>
      <nav className={s.desktopNav} aria-label="Main navigation"><a href="#work">The work</a><a href="#connections">Your systems</a><a href="#pricing">Pricing</a></nav>
      <div className={s.navActions}><a className={s.login} href="https://app.casedelta.com">Log in</a><a className={s.navBook} href={BOOK}>Book a demo <ArrowUpRight size={18}/></a><button ref={menuRef} className={s.menuButton} aria-expanded={menu} aria-controls="concept-menu" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Plus/>}</button></div>
      {menu && <nav id="concept-menu" className={s.mobileNav} aria-label="Mobile navigation">{[['The work','#work'],['Your systems','#connections'],['Pricing','#pricing'],['Questions','#questions']].map(([name,href])=><a key={href} href={href} onClick={()=>setMenu(false)}>{name}<ArrowUpRight/></a>)}</nav>}
    </header>
    <main id="content">
      <section className={s.hero}>
        <img className={s.heroImage} src="/v2/ambient/mountain.webp" alt="" fetchPriority="high"/>
        <div className={s.heroShade}/>
        <div className={s.heroContent}><h1 className={s.heroTitle}><span>Meet Delta</span></h1><div className={s.heroBottom}><div><p className={s.heroLead}><span>The only legal AI that works your case, no matter where it lives.</span><span>Run like a firm twice your size, without changing the way you work.</span></p><HeroBook/></div></div></div>
      </section>
      <section className={`${s.problem} ${s.container}`} id="problem"><div><h2>Your entire firm is<br/>bottlenecked by what<br/><span>your team can handle.</span></h2></div></section>
      <section className={s.work} id="work"><div className={`${s.sectionHeading} ${s.container}`}><div><h2>Ask. Then review.</h2></div><p>A practical look at how one request becomes work your team can check.</p></div><DemoGraphic/></section>
      <section className={s.quotePhoto}><div className={s.pastel}/><div className={s.photoShade}/><div className={s.quoteInner}><blockquote>“It signed into the verdict database we pay for and pulled the five biggest results in my circuit for a two-level lumbar with no fusion, in today's dollars.”</blockquote><p className={s.attribution}>James Recker</p></div></section>
      <section className={`${s.connections} ${s.container}`} id="connections"><div className={s.connectionIntro}><h2>Your systems.<br/>One associate.</h2><p>The case file is in one place. The email is in another. Delta works across the tools your firm already uses.</p></div><div className={s.connectionMap}><div className={s.mapCenter}><img src={LOGO.mark} alt=""/><span>Delta</span></div><div className={s.mapBranches}>{[[FolderOpen,'Case management','Filevine · Clio · MyCase'],[Mail,'Email','Outlook · Gmail'],[FileText,'Documents','Google Drive · Dropbox']].map(([Icon,title,detail]) => { const Symbol = Icon as typeof FolderOpen; return <div key={String(title)} className={s.mapRow}><Symbol size={25}/><div><strong>{String(title)}</strong><span>{String(detail)}</span></div></div>; })}</div></div></section>
      <section className={s.oversight}><div className={s.oversightPhoto}><img src="/concept/media/coastal-blue-hour.png" alt="A quiet, misty coastline under blue and pink evening light" loading="lazy"/></div><div className={s.oversightCopy}><h2>More support.<br/>The same standards.</h2><div className={s.ruleRow}><span>01</span><div><h3>Check the sources.</h3></div></div><div className={s.ruleRow}><span>02</span><div><h3>Direct the work.</h3></div></div><div className={s.ruleRow}><span>03</span><div><h3>Review before use.</h3></div></div></div></section>
      <section className={`${s.secondQuote} ${s.container}`}><span className={s.quoteGlyph} aria-hidden="true">“</span><div><blockquote>In our demo, it already found $400,000 sitting in cases we had already settled, and named what was blocking each one.</blockquote><p className={s.attribution}>Alan Poletti</p></div></section>
      <section className={s.privacy} id="privacy"><div className={s.container}><div><h2>Your firm’s data.<br/>Handled with care.</h2></div><div className={s.privacyDetails}><p>Encrypted in transit and at rest. Never used to train AI models.</p></div></div></section>
      <section className={`${s.pricing} ${s.container}`} id="pricing"><div className={s.sectionHeading}><div><h2>One firm.<br/>One monthly price.</h2></div><p>Choose the account band that fits your team. Every login counts, including attorneys, paralegals, and staff.</p></div><div className={s.priceTable}>{TIERS.map(t => <a href={BOOK} key={t.accounts}><span>{t.band}</span><div><strong>{t.price}</strong><span>per firm / month</span></div><ArrowUpRight size={24}/></a>)}</div></section>
      <section className={`${s.faq} ${s.container}`} id="questions"><div><h2>A few good<br/>questions.</h2></div><div>{[['Do we have to move our files?','Delta connects to the systems your firm already uses. Your team can keep its existing case management, email, and document workflow.'],['What work can we give Delta?','Start with a concrete task: review a file, build a cited chronology, find missing information, or draft a document. Your team reviews the result before using it.'],['Does Delta replace attorney review?','No. Delta supports your team. Attorneys remain responsible for legal judgment, checking the sources, and approving the work.'],['What happens in a demo?','We walk through a representative case task and show how Delta works with connected systems. You can ask about your firm’s tools and the work you want to hand over.']].map(([question,answer])=><details key={question}><summary>{question}<Plus size={22}/></summary><p>{answer}</p></details>)}</div></section>
      <section className={s.close}><div className={s.closeImage}/><div className={s.closeShade}/><div className={s.closeInner}><h2>Bring the work<br/>that’s waiting.</h2><p>See what handing it to Delta looks like.</p><a className={s.primary} href={BOOK}>Book a demo <ArrowUpRight size={21}/></a></div></section>
    </main>
    <footer className={`${s.footer} ${s.container}`}><div><a href="/"><img src={LOGO.onLight} alt="CaseDelta" className={s.logo}/></a><p>An AI associate for law firms.</p></div><nav aria-label="Footer"><a href="#work">The work</a><a href="#pricing">Pricing</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:camren@casedelta.com">Contact</a></nav><div className={s.copyright}><span>© 2026 CaseDelta</span></div></footer>
  </div>;
}
