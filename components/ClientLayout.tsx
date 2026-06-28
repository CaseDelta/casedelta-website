"use client";

import { usePathname } from "next/navigation";
import { NavbarV2 } from "@/components/NavbarV2";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The demo route is a standalone, chrome-free funnel page. The homepage renders
  // its own themed sticky header inside the hero (matching the mockups), so the
  // global light navbar is suppressed there too.
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
