import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/light/",
          "/dark/",
          "/v2/",
          "/video/",
        ],
      },
    ],
    sitemap: "https://casedelta.com/sitemap.xml",
  };
}
