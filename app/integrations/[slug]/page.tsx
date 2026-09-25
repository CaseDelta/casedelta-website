import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BreadcrumbSchema, FAQSchema } from '@/components/JsonLd';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, CheckColumns, LinkList, MoreLink, PageHero, Prompts, QAList, Tag } from '@/components/site/kit/kit';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { ConnectBand } from '@/components/site/kit/ConnectBand';
import { PAGE_PLATFORMS, platform, worksWithAnswer } from '@/lib/integrations';
import { CONNECT_TIME_ANSWER } from '@/lib/answers';
import { claim } from '@/lib/security';
import { STARTING_PRICE, TIERS } from '@/lib/pricing';

export const dynamicParams = false;
export function generateStaticParams() { return PAGE_PLATFORMS.map((p) => ({ slug: p.slug })); }

const find = (slug: string) => { const p = platform(slug); return p?.page ? { ...p, page: p.page } : undefined; };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  const url = `https://casedelta.com/integrations/${p.slug}`;
  return {
    title: { absolute: p.page.title },
    description: p.page.description,
    alternates: { canonical: url },
    openGraph: { title: p.page.title, description: p.page.description, url, type: 'website' },
  };
}

export default async function PlatformPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const url = `https://casedelta.com/integrations/${p.slug}`;
  const qa = [
    { q: `Does CaseDelta work with ${p.name}?`, a: worksWithAnswer(p) },
    { q: `Does it need ${p.name}'s API?`, a: p.page.api },
    { q: `Can Delta update ${p.name}, or only read it?`, a: `Both. In ${p.name}, Delta ${p.page.updates.map((u) => u[0].toLowerCase() + u.slice(1)).join(', ').replace(/, ([^,]*)$/, ' and $1')}.` },
    { q: `Is my ${p.name} data safe?`, a: `Yes. ${claim('isolation').answer.replace(/^No\. /, '')} ${claim('training').answer.replace(/^No\. /, '')}` },
    { q: `What does connecting ${p.name} cost?`, a: `Nothing extra. CaseDelta is priced per firm by account band, from ${STARTING_PRICE} a month for up to ${TIERS[0].accounts} accounts, and every band includes every system you connect.` },
    { q: `How long does it take to connect ${p.name}?`, a: CONNECT_TIME_ANSWER },
  ];
  const related = PAGE_PLATFORMS.filter((x) => x.slug !== p.slug && x.category === p.category)
    .concat(PAGE_PLATFORMS.filter((x) => x.category !== p.category && (p.category === 'email' ? x.page.live && x.category === 'case' : x.category === 'email')))
    .slice(0, 5);
  return <>
    <BreadcrumbSchema items={[{ name: 'Home', url: 'https://casedelta.com' }, { name: 'Integrations', url: 'https://casedelta.com/integrations' }, { name: p.name, url }]}/>
    <FAQSchema faqs={qa.map((x) => ({ question: x.q, answer: x.a }))}/>
    <SiteShell variant="solid">
      <PageHero title={`Delta works inside ${p.name}.`} lead={p.does}>
        {p.page.live && <Tag>Connected at firms today</Tag>}
      </PageHero>
      <Band title={`What Delta does in ${p.name}.`} split>
        <CheckColumns columns={[{ label: 'Reads', items: p.page.reads }, { label: 'Updates', items: p.page.updates }]}/>
      </Band>
      <Band title="Ask it things like." tone="pale">
        <Prompts items={p.page.tasks}/>
      </Band>
      <ConnectBand heading={`Connect ${p.name} in minutes.`} platforms={[{ name: p.name, logo: p.page.logo, host: p.page.host, found: p.page.found }]}/>
      <Band title={`${p.name} questions.`} split>
        <QAList as="h3" items={qa}/>
        <MoreLink href="/security">How we protect client data</MoreLink>
      </Band>
      <Band title="Works alongside." tone="pale" split>
        <LinkList links={[...related.map((x) => ({ label: x.name, href: `/integrations/${x.slug}` })), { label: 'Every system Delta works in', href: '/integrations' }]}/>
      </Band>
      <CtaBand/>
    </SiteShell>
  </>;
}
