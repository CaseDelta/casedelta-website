/**
 * The closing band: a heading over the cloud photograph, and iClosed's own
 * scheduler. Lifted from the homepage's close section.
 *
 * The iframe ships in the server HTML so iClosed starts loading with the page
 * rather than after its widget.js; the inline script does widget.js's other two
 * jobs, forwarding this page's query string (the UTMs) and resizing to the height
 * iClosed posts back.
 *
 * ONE PER PAGE. The script finds the frame by id. /demo embeds its own scheduler
 * (id iclosed-frame) and must never also render this band.
 */
import { W } from '@/components/concept/motion';
import s from '@/components/concept/ConceptHome.module.css';

const EVENT_URL = process.env.NEXT_PUBLIC_ICLOSED_EVENT_URL || 'https://app.iclosed.io/e/casedelta/demo';
const FRAME_SRC = `${EVENT_URL}?embedType=inline&referrerUrl=${encodeURIComponent('https://casedelta.com/')}`;
const FRAME_SCRIPT = `(function(){var f=document.getElementById('iclosed-cta');if(!f)return;
var u=new URL(f.src),q=new URLSearchParams(location.search);q.forEach(function(v,k){u.searchParams.set(k,v)});
u.searchParams.set('referrerUrl',location.href);if(u.href!==f.src)f.src=u.href;
addEventListener('message',function(e){if(e.origin!=='https://app.iclosed.io'||e.source!==f.contentWindow||!e.data)return;
if(e.data.type==='iclosed.widget_height'){f.style.height=e.data.height;}
if(e.data.type==='scrollIntoView')scrollTo({top:f.getBoundingClientRect().top+pageYOffset-(e.data.offset||100),behavior:'smooth'});
if(e.data.type==='openInParentTab')location.href=e.data.url;});})();`;

/** Two lines of heading; the break sits between them on wide screens. */
export function CtaBand({ lines = ['See it on your', 'own cases.'] }: { lines?: [string, string] }) {
  return <section className={s.close}>
    <div className={s.closeImage} data-parallax=".1"/>
    <div className={s.closeShade}/>
    <div className={s.closeInner}>
      <div className={s.closeCopy}><h2 data-reveal="words"><W>{lines[0]}</W><br/><W>{lines[1]}</W></h2></div>
      <div data-reveal="up" data-delay=".35">
        <div className={s.ctaWidget}>
          <iframe id="iclosed-cta" className={s.ctaFrame} src={FRAME_SRC} title="Book a demo" suppressHydrationWarning
            sandbox="allow-scripts allow-downloads allow-same-origin allow-popups allow-forms allow-top-navigation allow-popups-to-escape-sandbox"/>
          <script dangerouslySetInnerHTML={{ __html: FRAME_SCRIPT }}/>
        </div>
      </div>
    </div>
  </section>;
}
