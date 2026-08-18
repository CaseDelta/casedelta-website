"use client";

import { usePathname } from "next/navigation";
import { NavbarV2 } from "@/components/NavbarV2";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The demo route is a standalone, chrome-free funnel page. The homepage ships its
  // own nav and footer (components/v2/sasonix/{Nav,CtaFooter}), so the global light
  // navbar would be a second header stacked on top of it.
  //
  // /v2 and /v2/* used to be listed here as well. Those routes are gone: /v2 became
  // the homepage on 2026-08-18 and both paths now redirect (see next.config.ts).
  if (pathname === "/demo" || pathname === "/") {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarV2 />
      {children}
    </>
  );
}
