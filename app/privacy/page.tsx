import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CaseDelta protects your data. All processing happens inside CaseDelta's infrastructure. Your client data never leaves.",
  alternates: { canonical: "https://casedelta.com/privacy" },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How CaseDelta protects your data. All processing happens inside CaseDelta's infrastructure. Your client data never leaves.",
    url: "https://casedelta.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://casedelta.com" },
          { name: "Privacy Policy", url: "https://casedelta.com/privacy" },
        ]}
      />
      <PrivacyClient />
    </>
  );
}
