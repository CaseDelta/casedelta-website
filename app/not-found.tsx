import type { Metadata } from 'next';
import { SiteShell } from '@/components/site/SiteShell';
import { Band, LinkList, PageHero } from '@/components/site/kit/kit';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false, follow: true } };

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Answers', href: '/answers' },
  { label: 'Book a demo', href: '/demo' },
];

export default function NotFound() {
  return <SiteShell variant="solid">
    <PageHero title="This page does not exist." lead="It may have moved. Try one of these."/>
    <Band><LinkList links={LINKS}/></Band>
  </SiteShell>;
}
