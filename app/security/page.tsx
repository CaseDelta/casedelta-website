import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/JsonLd';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, Checklist, PageHero, QAList, Updated } from '@/components/site/kit/kit';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { SECURITY_CLAIMS, SECURITY_GROUPS, SECURITY_PAGE, SECURITY_UPDATED, claim } from '@/lib/security';

const URL = 'https://casedelta.com/security';
const DESCRIPTION = SECURITY_CLAIMS.filter((c) => ['hipaa', 'training', 'isolation', 'encryption'].includes(c.id)).map((c) => c.answer.replace(/^(Yes|No)\. /, '')).join(' ');
const TONES = ['paper', 'pale'] as const;

export const metadata: Metadata = {
  title: { absolute: SECURITY_PAGE.title },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: SECURITY_PAGE.title, description: DESCRIPTION, url: URL, type: 'website' },
};

export default function SecurityPage() {
  return <>
    <BreadcrumbSchema items={[{ name: 'Home', url: 'https://casedelta.com' }, { name: 'Security', url: URL }]}/>
    <SiteShell variant="photo">
      <PageHero photo="/v2/ambient/valley-mist.webp" title={SECURITY_PAGE.heading} lead={SECURITY_PAGE.lead}>
        <Updated date={SECURITY_UPDATED}/>
      </PageHero>
      <Band title="What is true today." tone="tint" split>
        <Checklist canLabel="In place for every firm" can={SECURITY_CLAIMS.map((c) => c.label)}/>
      </Band>
      {SECURITY_GROUPS.map((g, i) => <Band key={g.id} id={g.id} title={g.title} tone={TONES[i % 2]} split>
        <QAList as="h3" items={g.claims.map((id) => ({ q: claim(id).question, a: claim(id).answer }))}/>
      </Band>)}
      <CtaBand/>
    </SiteShell>
  </>;
}
