"use client";

import { usePathname } from "next/navigation";
import { NavbarV2 } from "@/components/NavbarV2";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The demo route is a standalone, chrome-free funnel page. The homepage renders
  // its own themed sticky header inside the hero (matching the mockups), so the
  // global light navbar is suppressed there too. /v2 is the Sasonix-mirror rebuild,
  // which ships its own nav + footer, so suppress the global navbar there as well.
  if (pathname === "/demo" || pathname === "/" || pathname === "/v2") {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarV2 />
      {children}
    </>
  );
}
