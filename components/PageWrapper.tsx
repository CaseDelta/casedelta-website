"use client";

import { useEffect } from "react";

interface PageWrapperProps {
  theme: "light" | "dark";
  children: React.ReactNode;
}

export function PageWrapper({ theme, children }: PageWrapperProps) {
  useEffect(() => {
    // Set theme on mount and save to localStorage for persistence
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("casedelta-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
