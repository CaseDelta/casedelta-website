import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { formatDate, readingTime } from '@/lib/blog-format';
import { BreadcrumbSchema, BlogPostSchema } from '@/components/JsonLd';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, LinkList, PageHero, ProseArticle } from '@/components/site/kit/kit';
import { CtaBand } from '@/components/site/kit/CtaBand';
import { MDX_COMPONENTS } from '@/components/site/blog/mdx';
import h from '@/components/concept/ConceptHome.module.css';
import b from '@/components/site/blog/blog.module.css';

const BASE = 'https://casedelta.com';
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return {};
  const { frontmatter: f, slug } = post;
  return {
    title: { absolute: f.title },
    description: f.description,
    alternates: { canonical: `${BASE}/blog/${slug}` },
    openGraph: { title: f.title, description: f.description, url: `${BASE}/blog/${slug}`, type: 'article', publishedTime: f.date, ...(f.updatedAt && { modifiedTime: f.updatedAt }), authors: ['CaseDelta'] },
    twitter: { card: 'summary_large_image', title: f.title, description: f.description },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();
  const { frontmatter: f, content, slug } = post;
  const url = `${BASE}/blog/${slug}`;
  return <>
    <BreadcrumbSchema items={[{ name: 'Home', url: BASE }, { name: 'Blog', url: `${BASE}/blog` }, { name: f.title, url }]}/>
    <BlogPostSchema title={f.title} description={f.description} slug={slug} publishedAt={f.date} updatedAt={f.updatedAt} image={f.image}/>
    <SiteShell variant="solid">
      <PageHero title={f.title}>
        <p className={b.meta}>
          <span>By CaseDelta</span>
          <span>Published <time dateTime={f.date}>{formatDate(f.date)}</time></span>
          {f.updatedAt && f.updatedAt !== f.date && <span>Updated <time dateTime={f.updatedAt}>{formatDate(f.updatedAt)}</time></span>}
          <span>{readingTime(content)} min read</span>
        </p>
      </PageHero>
      <div className={`${h.container} ${b.body}`}>
        <ProseArticle>
          <MDXRemote source={content} components={MDX_COMPONENTS} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}/>
        </ProseArticle>
      </div>
      {f.related?.length ? <Band title="Related." tone="pale" split><LinkList links={[...f.related, { label: 'All posts', href: '/blog' }]}/></Band> : null}
      <CtaBand/>
    </SiteShell>
  </>;
}
