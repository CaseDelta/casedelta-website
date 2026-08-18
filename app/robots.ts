import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // "/v2/" was here while the new homepage was an unlisted preview route. It
        // must NOT come back: that route is now the homepage, and the prefix it
        // matched also covers public/v2/ambient/, the hero and band photography. A
        // disallow there blocks Googlebot from the images the homepage renders.
        disallow: [
          "/api/",
          "/_next/",
          "/light/",
          "/dark/",
        ],
      },
    ],
    sitemap: "https://casedelta.com/sitemap.xml",
  };
}
