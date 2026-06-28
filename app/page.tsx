import HomeClient from "./HomeClient";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";
import { HOME_FAQ } from "@/lib/home-content";

export default function HomePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", url: "https://casedelta.com" }]} />
      <FAQSchema faqs={HOME_FAQ.map((f) => ({ question: f.q, answer: f.a }))} />
      <HomeClient />
    </>
  );
}
