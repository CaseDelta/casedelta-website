"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageWrapperProps {
  theme?: "light" | "dark"; // Optional default theme
  children: React.ReactNode;
}

export function PageWrapper({ theme = "light", children }: PageWrapperProps) {
  const pathname = usePathname();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(theme);

  useEffect(() => {
    // Check if we're on a variant path (e.g., /dark/*, /light/*)
    const isVariantPath = pathname.startsWith('/dark/') || pathname.startsWith('/light/');

    let selectedTheme: "light" | "dark";

    if (isVariantPath) {
      // For variant pages, always use the explicit theme prop and save it
      selectedTheme = theme;
      localStorage.setItem("casedelta-theme", theme);
    } else {
      // For other pages, read from localStorage or use the provided theme
      const savedTheme = localStorage.getItem("casedelta-theme") as "light" | "dark" | null;
      selectedTheme = savedTheme || theme;
    }

    setCurrentTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  }, [theme, pathname]);

  return <>{children}</>;
}
