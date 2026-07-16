import { Archivo, Geist, JetBrains_Mono, Inter } from "next/font/google";

/**
 * /v2 = a pixel-exact clone of the Sasonix Framer template (https://sasonix.framer.website/),
 * rebuilt from scratch in clean React. Sasonix as-is first (its orange, its fonts, its
 * copy); rebrand to CaseDelta later by swapping the tokens in components/v2/sasonix/tokens.ts.
 *
 * Fonts: the four Sasonix uses, all free/OFL, self-hosted via next/font (not scraped
 * from Framer's CDN). Scoped to /v2 via this nested layout so the live site is untouched.
 *   Archivo  -> display / headings
 *   Geist    -> body / buttons
 *   JetBrains Mono -> mono eyebrow labels
 *   Inter    -> small UI labels inside the product panels
 */
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], display: "swap", variable: "--sx-archivo" });
const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"], display: "swap", variable: "--sx-geist" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--sx-mono" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--sx-inter" });

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${archivo.variable} ${geist.variable} ${jbmono.variable} ${inter.variable}`}>{children}</div>;
}
