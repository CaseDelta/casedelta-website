import { Metadata } from "next";
import { notFound } from "next/navigation";
import { USE_CASES, getUseCaseBySlug, getAllUseCaseSlugs } from "@/lib/use-cases";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";
import { UseCasePageContent } from "./UseCasePageContent";

/* ─── Static Params ─── */

export function generateStaticParams() {
  return getAllUseCaseSlugs().map((slug) => ({ slug }));
}

/* ─── Metadata ─── */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);
  if (!uc) return {};
  return {
    title: uc.metaTitle,
    description: uc.metaDescription,
    alternates: {
      canonical: `https://casedelta.com/use-cases/${uc.slug}`,
    },
    openGraph: {
      title: uc.metaTitle,
      description: uc.metaDescription,
      url: `https://casedelta.com/use-cases/${uc.slug}`,
      siteName: "CaseDelta",
      type: "website",
    },
  };
}

/* ─── Page ─── */

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);
  if (!uc) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Use Cases", url: "https://casedelta.com/use-cases" },
          { name: uc.title, url: `https://casedelta.com/use-cases/${uc.slug}` },
        ]}
      />
      <FAQSchema faqs={uc.faq} />
      <UseCasePageContent useCase={uc} />
    </>
  );
}
