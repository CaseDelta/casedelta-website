'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, FileText, Mail, FolderOpen, Pause, Play, Plus, X } from 'lucide-react';
import { TIERS } from '@/lib/pricing';
import { LOGO } from '@/components/v2/sasonix/brand';
import { SmoothScroll } from '@/components/v2/sasonix/SmoothScroll';
import s from './ConceptHome.module.css';
import dynamic from 'next/dynamic';
// Client only: the product's components assume a browser (portals, timers), and
// the replay's code has no business in the first paint.
const DeltaReplay = dynamic(() => import('@/components/replay/DeltaReplay').then((m) => m.DeltaReplay), { ssr: false });
import type { Scenario } from 'delta-ui/scenario/types';
import type { ReplayPhase } from '@/components/replay/DeltaReplay';
import CHRONOLOGY from '@/content/replay/morgan-chronology.json';

const BOOK = 'https://calendar.app.google/LB4f9aLuz5a4RCrz6';
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
    <div className={s.demoHeader}><span>ONE REQUEST. A REVIEWABLE RESULT.</span><span>A recorded Delta run · Fictional records</span></div>
    <div className={s.demoStage}>
      <div className={s.demoNarrative}><span className={s.chapterNumber}>0{chapter + 1} / 03</span><h3>{chapters[chapter].title}</h3><p>{chapters[chapter].copy}</p></div>
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
        <div className={s.heroContent}><p className={s.eyebrow}>MEET DELTA. YOUR FIRM’S AI ASSOCIATE.</p><h1>More work done.<br/>More room to think.</h1><div className={s.heroBottom}><div><p>Give Delta the case work that fills your day.<br className={s.desktopBreak}/> It works in your systems. Your team stays in control.</p><a className={s.primary} href={BOOK}>Meet your associate <ArrowUpRight size={21}/></a></div><a className={s.heroPreview} href="#work"><span className={s.previewPlay}><Play size={22}/></span><span>From request to result<small>Explore a Delta workflow</small></span><ArrowDown size={22}/></a></div></div>
        <div className={s.heroFoot}><span>FOR PLAINTIFF LAW FIRMS</span><a href="#problem">Discover Delta <ArrowDown size={17}/></a></div>
      </section>
      <section className={`${s.problem} ${s.container}`} id="problem"><div className={s.sectionLabel}>01 / THE CAPACITY PROBLEM</div><div><h2>Your entire firm is<br/>bottlenecked by what<br/><span>your team can handle.</span></h2><div className={s.problemBottom}><p>The next file review. The missing record. The chronology that still needs doing.</p><p>Give that work to Delta.<br/>Give your team room for the work that needs them.</p></div></div></section>
      <section className={s.work} id="work"><div className={`${s.sectionHeading} ${s.container}`}><div><p className={s.eyebrow}>02 / HAND IT THE WORK</p><h2>Ask. Then review.</h2></div><p>A practical look at how one request becomes work your team can check.</p></div><DemoGraphic/></section>
      <section className={s.quotePhoto}><div className={s.pastel}/><div className={s.photoShade}/><div className={s.quoteInner}><p className={s.eyebrow}>IN A LAWYER’S WORDS</p><blockquote>“It signed into the verdict database we pay for and pulled the five biggest results in my circuit for a two-level lumbar with no fusion, in today's dollars.”</blockquote><p className={s.attribution}>James Recker</p></div></section>
      <section className={`${s.connections} ${s.container}`} id="connections"><div className={s.connectionIntro}><p className={s.eyebrow}>03 / ALREADY IN YOUR WORKFLOW</p><h2>Your systems.<br/>One associate.</h2><p>The case file is in one place. The email is in another. Delta works across the tools your firm already uses.</p><a className={s.textLink} href={BOOK}>See it with your systems <ArrowUpRight size={20}/></a></div><div className={s.connectionMap}><div className={s.mapCenter}><img src={LOGO.mark} alt=""/><span>Delta</span></div><div className={s.mapBranches}>{[[FolderOpen,'Case management','Filevine · Clio · MyCase'],[Mail,'Email','Outlook · Gmail'],[FileText,'Documents','Google Drive · Dropbox']].map(([Icon,title,detail]) => { const Symbol = Icon as typeof FolderOpen; return <div key={String(title)} className={s.mapRow}><Symbol size={25}/><div><strong>{String(title)}</strong><span>{String(detail)}</span></div></div>; })}</div><p>Work where the information already lives.</p></div></section>
      <section className={s.oversight}><div className={s.oversightPhoto}><img src="/concept/media/coastal-blue-hour.png" alt="A quiet, misty coastline under blue and pink evening light" loading="lazy"/></div><div className={s.oversightCopy}><p className={s.eyebrow}>04 / THE JUDGMENT STAYS YOURS</p><h2>More support.<br/>The same standards.</h2><div className={s.ruleRow}><span>01</span><div><h3>Check the sources.</h3><p>Follow a citation back to the record behind it.</p></div></div><div className={s.ruleRow}><span>02</span><div><h3>Direct the work.</h3><p>Tell Delta what you need and how your firm does it.</p></div></div><div className={s.ruleRow}><span>03</span><div><h3>Review before use.</h3><p>Your team checks the result and approves what leaves the firm.</p></div></div></div></section>
      <section className={`${s.secondQuote} ${s.container}`}><span className={s.quoteGlyph} aria-hidden="true">“</span><div><blockquote>In our demo, it already found $400,000 sitting in cases we had already settled, and named what was blocking each one.</blockquote><p className={s.attribution}>Alan Poletti <span>On his Delta demo</span></p></div></section>
      <section className={s.privacy} id="privacy"><div className={s.container}><div><p className={s.eyebrow}>05 / BUILT FOR CONFIDENTIAL WORK</p><h2>Your firm’s data.<br/>Handled with care.</h2></div><div className={s.privacyDetails}><p>Encrypted in transit and at rest. Never used to train AI models.</p><a className={s.textLink} href="/privacy">Read our privacy policy <ArrowUpRight size={20}/></a></div></div></section>
      <section className={`${s.pricing} ${s.container}`} id="pricing"><div className={s.sectionHeading}><div><p className={s.eyebrow}>06 / A CLEAR COST</p><h2>One firm.<br/>One monthly price.</h2></div><p>Choose the account band that fits your team. Every login counts, including attorneys, paralegals, and staff.</p></div><div className={s.priceTable}>{TIERS.map(t => <a href={BOOK} key={t.accounts}><span>{t.band}</span><div><strong>{t.price}</strong><span>per firm / month</span></div><ArrowUpRight size={24}/></a>)}</div><div className={s.priceFoot}><p>The price stays the same within your band.</p><a className={s.textLink} href={BOOK}>Book a demo <ArrowUpRight size={20}/></a></div></section>
      <section className={`${s.faq} ${s.container}`} id="questions"><div><p className={s.eyebrow}>BEFORE WE MEET</p><h2>A few good<br/>questions.</h2></div><div>{[['Do we have to move our files?','Delta connects to the systems your firm already uses. Your team can keep its existing case management, email, and document workflow.'],['What work can we give Delta?','Start with a concrete task: review a file, build a cited chronology, find missing information, or draft a document. Your team reviews the result before using it.'],['Does Delta replace attorney review?','No. Delta supports your team. Attorneys remain responsible for legal judgment, checking the sources, and approving the work.'],['What happens in a demo?','We walk through a representative case task and show how Delta works with connected systems. You can ask about your firm’s tools and the work you want to hand over.']].map(([question,answer])=><details key={question}><summary>{question}<Plus size={22}/></summary><p>{answer}</p></details>)}</div></section>
      <section className={s.close}><div className={s.closeImage}/><div className={s.closeShade}/><div className={s.closeInner}><p className={s.eyebrow}>MEET YOUR NEXT ASSOCIATE</p><h2>Bring the work<br/>that’s waiting.</h2><p>See what handing it to Delta looks like.</p><a className={s.primary} href={BOOK}>Book a demo <ArrowUpRight size={21}/></a></div></section>
    </main>
    <footer className={`${s.footer} ${s.container}`}><div><a href="/"><img src={LOGO.onLight} alt="CaseDelta" className={s.logo}/></a><p>An AI associate for law firms.</p></div><nav aria-label="Footer"><a href="#work">The work</a><a href="#pricing">Pricing</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:camren@casedelta.com">Contact</a></nav><div className={s.copyright}><span>© 2026 CaseDelta</span><span>The judgment stays yours.</span></div></footer>
  </div>;
}
