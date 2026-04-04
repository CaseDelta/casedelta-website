import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getComparisonBySlug,
  getAllComparisonSlugs,
} from "@/lib/comparisons";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";
import { ComparisonPageClient } from "./ComparisonPageClient";

/* ─── Static Generation ─── */

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

/* ─── Metadata ─── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    alternates: {
      canonical: `https://casedelta.com/compare/${comparison.slug}`,
    },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `https://casedelta.com/compare/${comparison.slug}`,
      type: "website",
    },
  };
}

/* ─── Page ─── */

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Compare", url: "https://casedelta.com/compare" },
          {
            name: `CaseDelta vs ${comparison.competitorName}`,
            url: `https://casedelta.com/compare/${comparison.slug}`,
          },
        ]}
      />
      <FAQSchema faqs={comparison.faq} />
      <ComparisonPageClient comparison={comparison} />
    </>
  );
}
