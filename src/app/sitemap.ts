import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { getAdminArticles } from "@/server/content-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAdminArticles();

  const routes = [
    "",
    "/about",
    "/howto",
    "/price",
    "/order",
    "/contact",
    "/articles",
    "/faq",
    "/company",
    "/privacy",
    "/terms",
    "/commerce",
    "/voices",
    "/compare",
    "/steps",
  ];

  const staticEntries = routes.map((route) => {
    let priority = 0.8;
    if (route === "") priority = 1.0;
    else if (
      route === "/about" ||
      route === "/howto" ||
      route === "/price" ||
      route === "/order" ||
      route === "/contact"
    ) {
      priority = 0.9;
    }

    const changeFrequency: "weekly" | "monthly" =
      route === "" || route === "/articles" ? "weekly" : "monthly";

    return {
      url: `${siteConfig.siteUrl}${route}`,
      changeFrequency,
      priority,
    };
  });

  const articleEntries = articles
    .filter((article) => article.publishedAt)
    .map((article) => ({
      url: `${siteConfig.siteUrl}/articles/${encodeURIComponent(article.slug)}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...articleEntries];
}
