import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Delta, an associate for your firm | Design concept',
  description: 'An AI associate working in the tools your law firm already uses.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: '/concept' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
