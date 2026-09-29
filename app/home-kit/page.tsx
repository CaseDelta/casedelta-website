/**
 * LOCAL ONLY. The homepage's copy on the page kit's design. noindex, not in the
 * sitemap, and must not ship as is.
 */
import type { Metadata } from 'next';
import { HomeKit } from './HomeKit';

export const metadata: Metadata = { title: 'Home, kit design', robots: { index: false, follow: false } };

export default function Page() { return <HomeKit/>; }
