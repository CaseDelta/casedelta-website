import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | CaseDelta",
  description:
    "One assistant. Every tool your firm uses. Tell Delta what you need in a sentence.",
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
