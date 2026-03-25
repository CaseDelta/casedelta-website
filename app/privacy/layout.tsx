import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CaseDelta",
  description:
    "How CaseDelta protects your data. Your client data stays inside your firm.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
