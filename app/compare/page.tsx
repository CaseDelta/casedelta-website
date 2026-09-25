import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/JsonLd';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, LinkList, PageHero } from '@/components/site/kit/kit';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { COMPETITORS } from '@/lib/compare';

const URL = 'https://casedelta.com/compare';
const TITLE = 'CaseDelta compared: EvenUp, Supio, Eve, Filevine AI, Clio AI, ChatGPT and more (2026)';
const DESCRIPTION = 'Honest side-by-side comparisons of CaseDelta with legal AI tools and general AI assistants: what each does, pricing where published, and when to choose each.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: 'website' },
};

export default function CompareIndex() {
  return <>
    <BreadcrumbSchema items={[{ name: 'Home', url: 'https://casedelta.com' }, { name: 'Compare', url: URL }]}/>
    <SiteShell variant="solid">
      <PageHero title="CaseDelta compared." lead="What each tool does, what it costs, and when to choose it.">
      </PageHero>
      <Band title="Pick a comparison.">
        <LinkList links={COMPETITORS.map((x) => ({ label: `CaseDelta vs ${x.name}`, href: `/compare/${x.slug}`, note: x.line }))}/>
      </Band>
      <CtaBand/>
    </SiteShell>
  </>;
}
