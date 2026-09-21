'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FileText } from 'lucide-react';
import type { Scenario } from 'delta-ui/scenario/types';
import CHRONOLOGY from '@/content/replay/morgan-chronology.json';
import { LOGO } from '@/components/v2/sasonix/brand';
import { trackEvent } from '@/lib/posthog';
import s from './ConceptHome.module.css';
import d from './ConceptDemo.module.css';

// The demo page is the iClosed scheduler and nothing else. Phone and name come
// first and the lead exists before the calendar unlocks; every answer after that
// is written as it is given. The event itself (questions, disqualification,
// reminders) is configured in iClosed, and the webhook lands in /api/lead.
const DeltaReplay = dynamic(() => import('@/components/replay/DeltaReplay').then((m) => m.DeltaReplay), { ssr: false });
const EVENT_URL = process.env.NEXT_PUBLIC_ICLOSED_EVENT_URL || 'https://app.iclosed.io/e/casedelta/demo';

// The iframe is in the server HTML so iClosed starts loading with the page,
// not after its 4 KB widget.js arrives (that script only built this iframe).
// The inline script does widget.js's other two jobs during HTML parse: forward
// this page's query string (the UTMs) and resize to the height iClosed posts.
const FRAME_SRC = `${EVENT_URL}?embedType=inline&referrerUrl=${encodeURIComponent('https://casedelta.com/demo')}`;
const FRAME_SCRIPT = `(function(){var f=document.getElementById('iclosed-frame');if(!f)return;
function show(){f.style.opacity='1';var s=f.previousElementSibling;if(s)s.style.display='none';}
f.addEventListener('load',function(){setTimeout(show,4000)});
var u=new URL(f.src),q=new URLSearchParams(location.search);q.forEach(function(v,k){u.searchParams.set(k,v)});
u.searchParams.set('referrerUrl',location.href);if(u.href!==f.src)f.src=u.href;
addEventListener('message',function(e){if(e.origin!=='https://app.iclosed.io'||e.source!==f.contentWindow||!e.data)return;
if(e.data.type==='iclosed.widget_height'){f.style.height=e.data.height;show();}
if(e.data.type==='scrollIntoView')scrollTo({top:f.getBoundingClientRect().top+pageYOffset-(e.data.offset||100),behavior:'smooth'});
if(e.data.type==='openInParentTab')location.href=e.data.url;});})();`;

export function ConceptDemo() {
  useEffect(() => { trackEvent('demo_page_viewed', { source: 'concept_demo' }); }, []);
  return <div className={`${s.site} ${d.page}`}>
    <header className={`${s.navigation} ${s.navigationSolid}`}>
      <a href="/" aria-label="CaseDelta home"><img className={s.logo} src={LOGO.onLight} alt="CaseDelta"/></a>
      <nav className={s.desktopNav} aria-label="Main navigation"><a href="/#work">The work</a><a href="/#connections">Your systems</a><a href="/#pricing">Pricing</a></nav>
      <div className={s.navActions}><a className={s.login} href="https://app.casedelta.com">Log in</a></div>
    </header>
    <main className={`${s.container} ${d.main}`}>
      <div className={d.left}>
        <h1 className={d.title}><em>Book</em> a demo</h1>
        <div className={d.widget}>
          <div className={d.skeleton} aria-hidden="true"><div className={d.skTop}/><div className={d.skBody}><div className={d.skTitle}/><div className={d.skLine}/><div className={d.skField}/><div className={d.skField}/><div className={d.skButton}/></div></div>
          <iframe id="iclosed-frame" className={d.frame} src={FRAME_SRC} title="Book a demo" suppressHydrationWarning
            sandbox="allow-scripts allow-downloads allow-same-origin allow-popups allow-forms allow-top-navigation allow-popups-to-escape-sandbox"/>
          <script dangerouslySetInnerHTML={{ __html: FRAME_SCRIPT }}/>
        </div>
      </div>
      <div className={d.right}>
        <div className={d.visual}>
          <img className={d.visualPhoto} src="/v2/ambient/mountain.webp" alt=""/>
          <div className={`${s.graphic} ${d.product}`}>
            <div className={s.graphicTop}><span className={s.deltaMark}><img src={LOGO.mark} alt="" /></span><strong>Delta</strong></div>
            <div className={s.replayScene}>
              <p className={s.prompt}>Build a treatment chronology from the Morgan records I attached. Cite every entry.</p>
              <div className={s.attachment}><FileText size={23}/><div><strong>Morgan · Medical records</strong><span>3 fictional records</span></div></div>
              <DeltaReplay scenario={CHRONOLOGY as unknown as Scenario} phase="result" onFinished={() => {}} />
            </div>
          </div>
        </div>
        <dl className={d.stats}>
          <div><dt>30 min</dt><dd>To connect your systems</dd></div>
          <div><dt>0</dt><dd>Records migrated</dd></div>
          <div><dt>$599</dt><dd>Flat monthly price</dd></div>
        </dl>
      </div>
    </main>
    <footer className={`${s.footer} ${s.container}`}><div><a href="/"><img src={LOGO.onLight} alt="CaseDelta" className={s.logo}/></a><p>An AI associate for law firms.</p></div><nav aria-label="Footer"><a href="/#work">The work</a><a href="/#pricing">Pricing</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:camren@casedelta.com">Contact</a></nav><div className={s.copyright}><span>© {new Date().getFullYear()} CaseDelta</span></div></footer>
  </div>;
}
