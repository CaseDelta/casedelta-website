'use client';
import { useEffect } from 'react';
import { ConnectFlow } from '@/components/concept/ConnectFlow';
import { useCalm } from '@/components/concept/motion';
import { SiteShell } from '@/components/site/SiteShell';
import { trackEvent } from '@/lib/posthog';
import { STARTING_PRICE } from '@/lib/pricing';
import s from './ConceptHome.module.css';
import d from './ConceptDemo.module.css';

// The demo page is the iClosed scheduler and nothing else. Phone and name come
// first and the lead exists before the calendar unlocks; every answer after that
// is written as it is given. The event itself (questions, disqualification,
// reminders) is configured in iClosed, and the webhook lands in /api/lead.
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
  const calm = useCalm();
  useEffect(() => { trackEvent('demo_page_viewed', { source: 'concept_demo' }); }, []);
  return <SiteShell variant="solid" hideBook className={d.page} mainClassName={`${s.container} ${d.main}`}>
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
          <div className={d.product}><ConnectFlow still={calm}/></div>
        </div>
        <dl className={d.stats}>
          <div><dt>Minutes</dt><dd>To connect your systems</dd></div>
          <div><dt>0</dt><dd>Records migrated</dd></div>
          <div><dt>{STARTING_PRICE}</dt><dd>Flat monthly price</dd></div>
        </dl>
      </div>
  </SiteShell>;
}
