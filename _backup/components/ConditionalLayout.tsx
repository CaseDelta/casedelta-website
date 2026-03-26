"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
