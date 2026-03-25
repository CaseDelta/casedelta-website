import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | CaseDelta",
  description:
    "Your client data stays inside your firm. How CaseDelta protects your data, your clients, and your practice.",
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
