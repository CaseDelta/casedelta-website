import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BreadcrumbSchema, FAQSchema } from '@/components/JsonLd';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, Checklist, FactTable, PageHero, QAList, Updated } from '@/components/site/kit/kit';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { CASEDELTA_ROW, COMPETITORS, ROW_LABELS, competitor } from '@/lib/compare';
import c from '../compare.module.css';

const BASE = 'https://casedelta.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITORS.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const x = competitor((await params).slug);
  if (!x) return {};
  const url = `${BASE}/compare/${x.slug}`;
  return {
    title: { absolute: x.title },
    description: x.description,
    alternates: { canonical: url },
    openGraph: { title: x.title, description: x.description, url, type: 'website' },
  };
}

const checked = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const x = competitor((await params).slug);
  if (!x) notFound();
  const url = `${BASE}/compare/${x.slug}`;
  return <>
    <BreadcrumbSchema items={[{ name: 'Home', url: BASE }, { name: 'Compare', url: `${BASE}/compare` }, { name: `CaseDelta vs ${x.name}`, url }]}/>
    <FAQSchema faqs={x.qa.map((q) => ({ question: q.q, answer: q.a }))}/>
    <SiteShell variant="solid">
      <PageHero title={`CaseDelta vs ${x.name}`} lead={x.lead}>
        <Updated date={x.checkedAt}/>
      </PageHero>
      <Band title="Side by side.">
        <div className={`${c.tableArea} ${x.columns.length > 1 ? c.tableWide : ''}`}><FactTable caption={`CaseDelta and ${x.name} compared`} head={['', 'CaseDelta', ...x.columns.map((col) => col.name)]}
          rows={ROW_LABELS.map((r) => [r.label, CASEDELTA_ROW[r.key], ...x.columns.map((col) => col.row[r.key])])}
          note={`Competitor facts are from their public sites, checked ${checked(x.checkedAt)}. Sources below.`}/></div>
      </Band>
      <Band title="Which one fits." tone="pale">
        <div className={c.choose}>
          <Checklist canLabel={`Choose ${x.name} when`} can={x.chooseThem}/>
          <Checklist canLabel="Choose CaseDelta when" can={x.chooseUs}/>
        </div>
      </Band>
      <Band title="Questions buyers ask." tone="tint">
        <QAList as="h3" items={x.qa.map((q) => ({ q: q.q, a: q.a }))}/>
      </Band>
      <Band title="Sources." split>
        <ul className={c.sources}>{x.sources.map((s) => <li key={s.url}><a href={s.url} rel="nofollow noopener" target="_blank">{s.label}</a></li>)}</ul>
        <p className={c.checked}>Checked <time dateTime={x.checkedAt}>{checked(x.checkedAt)}</time>.</p>
      </Band>
      <CtaBand/>
    </SiteShell>
  </>;
}
