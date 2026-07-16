import type { Metadata } from "next";
import { Sasonix } from "@/components/v2/sasonix/Sasonix";

/**
 * /v2: a pixel-exact clone of the Sasonix Framer template, rebuilt from scratch in
 * clean React (Sasonix as-is; rebrand to CaseDelta later via components/v2/sasonix/tokens.ts).
 * Isolated from the live homepage (app/page.tsx). Not indexed while it is a preview.
 */
export const metadata: Metadata = {
  title: "Sasonix clone (v2 preview)",
  robots: { index: false, follow: false },
};

export default function V2Page() {
  return <Sasonix />;
}
