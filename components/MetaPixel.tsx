"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import Cookies from "js-cookie";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const COOKIE_PIXEL_BLOCKED = "cd_pixel_blocked";

function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "PageView");
  }, [pathname, searchParams]);

  return null;
}

export function MetaPixel() {
  // Default to disabled so SSR and hydration both produce null. The edge proxy
  // sets cd_pixel_blocked=1 for EU/EEA/UK/CH visitors; we read it post-mount
  // and only enable the script when absent.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(Cookies.get(COOKIE_PIXEL_BLOCKED) !== "1");
  }, []);

  if (!PIXEL_ID || !enabled) return null;

  return (
    <>
      <Script id="meta-pixel-loader" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
        `}
      </Script>
      <Suspense fallback={null}>
        <MetaPixelPageView />
      </Suspense>
    </>
  );
}
