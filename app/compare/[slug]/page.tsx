import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getComparisonBySlug, getAllComparisonSlugs } from "@/lib/comparisons";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";
import { CompareContent } from "./CompareContent";

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `https://casedelta.com/compare/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `https://casedelta.com/compare/${c.slug}`,
      siteName: "CaseDelta",
      type: "website",
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Compare", url: "https://casedelta.com/compare" },
          { name: `CaseDelta vs ${c.competitor}`, url: `https://casedelta.com/compare/${c.slug}` },
        ]}
      />
      <FAQSchema faqs={c.faq} />
      <CompareContent comparison={c} />
    </>
  );
}
