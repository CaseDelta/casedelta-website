"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavbarV2 } from "@/components/NavbarV2";
import { getHasPlayedIntro } from "@/components/HeroV2";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [linksHidden, setLinksHidden] = useState(false);

  // On mount, check if we should hide links (home page + intro not yet played)
  useEffect(() => {
    if (pathname === "/" && !getHasPlayedIntro()) {
      setLinksHidden(true);
    }
  }, [pathname]);

  useEffect(() => {
    const show = () => setLinksHidden(false);
    const hide = () => setLinksHidden(true);
    window.addEventListener("cd:nav-hide", hide);
    window.addEventListener("cd:nav-show", show);
    return () => {
      window.removeEventListener("cd:nav-hide", hide);
      window.removeEventListener("cd:nav-show", show);
    };
  }, []);

  return (
    <>
      <NavbarV2 hideLinks={linksHidden} />
      {children}
    </>
  );
}
