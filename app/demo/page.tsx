import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { DemoClient } from "./DemoClient";

export const metadata: Metadata = {
  title: "Book a Demo. See Delta Running on Your Firm's Workflow",
  description:
    "20 minutes. See Delta connect every tool your firm uses (Clio, Word, Gmail, Drive) and turn hours of legal work into one sentence. Built for plaintiff firms.",
  alternates: { canonical: "https://casedelta.com/demo" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Book a Demo with CaseDelta",
    description:
      "See Delta running on your firm's workflow. In 20 minutes.",
    url: "https://casedelta.com/demo",
    type: "website",
  },
};

export default function DemoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Book a Demo", url: "https://casedelta.com/demo" },
        ]}
      />
      <DemoClient />
    </>
  );
}
