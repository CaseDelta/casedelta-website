import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { BreadcrumbSchema, FAQSchema } from '@/components/JsonLd';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, PageHero, QAList } from '@/components/site/kit/kit';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { HubMap } from './HubMap';
import { ANYTHING_ELSE, CATEGORIES, PLATFORMS, platformHref } from '@/lib/integrations';
import { claim } from '@/lib/security';
import { CONNECT_TIME_ANSWER, NOT_LISTED_ANSWER } from '@/lib/answers';
import g from './integrations.module.css';

const URL = 'https://casedelta.com/integrations';
const TITLE = 'CaseDelta integrations: Filevine, Clio, Lead Docket, Outlook and anything your firm signs into';
const DESCRIPTION = 'Delta works inside Filevine, Clio, MyCase, Litify, Lead Docket, Salesforce, Outlook, Gmail and any other system your team signs into. Nothing to migrate.';

const QA = [
  { q: 'Does CaseDelta work with my case system?', a: 'Yes. Delta works inside Filevine, Clio, MyCase, Litify, SmartAdvocate, CASEpeer, Needles and any other case system your team signs into.' },
  { q: 'What if my system is not listed?', a: NOT_LISTED_ANSWER },
  { q: 'Do we have to migrate anything?', a: claim('in-place').answer },
  { q: 'How long does connecting take?', a: CONNECT_TIME_ANSWER },
];

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: 'website' },
};

export default function IntegrationsPage() {
  return <>
    <BreadcrumbSchema items={[{ name: 'Home', url: 'https://casedelta.com' }, { name: 'Integrations', url: URL }]}/>
    <FAQSchema faqs={QA.map((x) => ({ question: x.q, answer: x.a }))}/>
    <SiteShell variant="solid">
      <PageHero title="Delta works inside the systems you already use." lead="Any system your team signs into. Nothing to migrate.">
      </PageHero>
      <Band title="One paralegal across every system." tone="pale" split>
        <div className={g.map}><HubMap/></div>
      </Band>
      <Band title="Systems Delta works in.">
        <div className={g.grid} data-reveal="stagger" data-delay=".15">
          {CATEGORIES.map((c) => <div key={c.id} className={g.group}>
            <h3 className={g.groupTitle}>{c.title}</h3>
            <ul>{PLATFORMS.filter((p) => p.category === c.id).map((p) => {
              const href = platformHref(p);
              return <li key={p.slug}>
                {href ? <a className={g.name} href={href}>{p.name}<ArrowUpRight size={16}/></a> : <span className={g.name}>{p.name}</span>}
                <small>{p.does}</small>
              </li>;
            })}</ul>
          </div>)}
        </div>
        <div className={g.anything}><strong>{ANYTHING_ELSE.name}</strong><span>{ANYTHING_ELSE.does}</span></div>
      </Band>
      <Band title="Integration questions." tone="tint">
        <QAList as="h3" items={QA}/>
      </Band>
      <CtaBand/>
    </SiteShell>
  </>;
}
