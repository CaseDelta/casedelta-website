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
        //
        // /setup, /install.sh, /install.ps1 and /outreach-kit.zip are deliberately NOT
        // listed. robots.txt is public, so naming them here would advertise paths whose
        // whole point is that they are not advertised, and a Disallow stops a crawler
        // reading the noindex header those routes already send. They answer 401 without
        // the key, carry X-Robots-Tag noindex, are absent from the sitemap, and nothing
        // on the site links to them. That is a stronger posture than a Disallow line.
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
