import HomeClient from "./HomeClient";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";
import { HOME_FAQ } from "@/lib/home-content";
import { VariantProvider } from "@/components/VariantProvider";
import { resolveVariants } from "@/lib/variants";

/**
 * Home is dynamic (it reads `?variant=`/`?hero=` for QA and resolves the design
 * variant). With no params and no cookie, it renders control (harvey-light), which
 * is what Googlebot sees (no cloaking). JSON-LD + the FAQ schema ship in the server
 * HTML regardless of variant.
 */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string | string[]; hero?: string | string[] }>;
}) {
  const sp = await searchParams;
  const allowOverride = process.env.VERCEL_ENV !== "production";
  const { design, copy, source } = resolveVariants(
    { variant: sp.variant, hero: sp.hero },
    { allowOverride }
  );

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "https://casedelta.com" }]} />
      <FAQSchema faqs={HOME_FAQ.map((f) => ({ question: f.q, answer: f.a }))} />
      <VariantProvider design={design} copy={copy} source={source}>
        <HomeClient />
      </VariantProvider>
    </>
  );
}
