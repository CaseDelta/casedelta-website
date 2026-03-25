import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | CaseDelta",
  description:
    "Delta analyzes your documents, learns your firm, and surfaces what matters before you ask.",
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
