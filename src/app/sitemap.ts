import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { getAdminArticles } from "@/server/content-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAdminArticles();

  return [
    { url: siteConfig.siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/articles`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.siteUrl}/faq`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.siteUrl}/voices`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.siteUrl}/compare`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.siteUrl}/steps`, changeFrequency: "monthly", priority: 0.8 },
    ...articles
      .filter((article) => article.publishedAt)
      .map((article) => ({
        url: `${siteConfig.siteUrl}/articles/${encodeURIComponent(article.slug)}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  ];
}
