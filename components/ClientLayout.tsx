"use client";

import { usePathname } from "next/navigation";
import { NavbarV2 } from "@/components/NavbarV2";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The demo route is a standalone, chrome-free funnel page.
  if (pathname === "/demo") {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarV2 />
      {children}
    </>
  );
}
