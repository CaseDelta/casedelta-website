import { BreadcrumbSchema } from "@/components/JsonLd";
import { Sasonix } from "@/components/v2/sasonix/Sasonix";

/**
 * The CaseDelta homepage.
 *
 * This page lived at /v2 behind robots:noindex while it was built, and replaced the
 * previous homepage on 2026-08-18. The old one (app/HomeClient.tsx, the lib/variants
 * design-variant system and components/marketing/heroes/*) is still in the repo but no
 * longer routed, so reverting is a one-file change while the dust settles. Delete it
 * once this page has held for a while.
 *
 * Title, description, openGraph and canonical all come from the root layout, exactly as
 * the previous homepage took them, so promoting the design changed no metadata.
 *
 * NO FAQPage JSON-LD, deliberately. The old homepage emitted HOME_FAQ as FAQPage
 * structured data because it rendered those same questions in a visible accordion. This
 * page has no FAQ section, and Google requires FAQ markup to match content visible on
 * the page, so shipping it here would be invalid markup rather than a free rich result.
 * If an FAQ section is added back (components/v2/sasonix/Faq.tsx is still in the kit),
 * re-add FAQSchema with HOME_FAQ at the same time.
 *
 * Static, unlike the page it replaces: the old one was dynamic because it read
 * ?variant=/?hero= to resolve a design variant. Nothing here reads searchParams.
 */
export default function HomePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "https://casedelta.com" }]} />
      <Sasonix />
    </>
  );
}
