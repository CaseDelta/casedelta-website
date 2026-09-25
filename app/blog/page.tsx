import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/blog-format';
import { BreadcrumbSchema } from '@/components/JsonLd';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, LinkList, PageHero } from '@/components/site/kit/kit';
import { CtaBand } from '@/components/site/kit/CtaBand';

const URL = 'https://casedelta.com/blog';
const TITLE = 'CaseDelta blog: AI for personal injury and plaintiff law firms';
const DESCRIPTION = 'Guides for plaintiff firms on AI demand letters, medical chronologies, mass torts and choosing AI for a personal injury practice.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: 'website' },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return <>
    <BreadcrumbSchema items={[{ name: 'Home', url: 'https://casedelta.com' }, { name: 'Blog', url: URL }]}/>
    <SiteShell variant="solid">
      <PageHero title="Blog." lead="Guides for plaintiff firms on putting AI to work in a real practice."/>
      <Band>
        <LinkList links={posts.map((p) => ({ label: p.frontmatter.title, href: `/blog/${p.slug}`, note: `${formatDate(p.frontmatter.updatedAt ?? p.frontmatter.date)}${p.frontmatter.updatedAt ? ' (updated)' : ''}` }))}/>
      </Band>
      <CtaBand/>
    </SiteShell>
  </>;
}
