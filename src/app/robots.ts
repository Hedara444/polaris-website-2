import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/articles", "/faq-deprecated"],
      disallow: ["/admin", "/api/admin"],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
