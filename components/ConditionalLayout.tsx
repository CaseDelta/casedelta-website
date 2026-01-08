"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide navbar and footer on the maintenance homepage
  const isMaintenancePage = pathname === "/";

  return (
    <>
      {!isMaintenancePage && <Navbar />}
      {children}
      {!isMaintenancePage && <Footer />}
    </>
  );
}
