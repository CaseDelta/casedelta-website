import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CaseDelta",
  description:
    "Terms of Service for CaseDelta, the AI paralegal for law firms.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
