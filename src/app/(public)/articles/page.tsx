import Link from "next/link";

import { ArticleCard } from "@/components/public/ArticleCard";
import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { getCategoryList, listPublishedArticles } from "@/server/content-service";

export const metadata = buildMetadata({
  title: "POLARISS | Articles",
  description:
    "Browse paginated POLARISS articles with category filters, SEO-friendly routes, and content managed from the admin console.",
  path: "/articles",
  keywords: defaultKeywords.articles,
});

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? "1") || 1;
  const category = params.category || undefined;

  const [categories, result] = await Promise.all([
    getCategoryList(),
    listPublishedArticles(page, 6, category),
  ]);

  return (
    <section className="section page-shell">
      <div className="shell">
        <div className="page-intro">
          <p className="eyebrow">ARTICLES</p>
          <h1>Knowledge, comparisons, and product context.</h1>
          <p>
            The articles page is connected to admin-managed content and uses category chips
            plus paginated listing for predictable browsing.
          </p>
        </div>

        <div className="chip-row">
          <Link className={!category ? "filter-chip is-active" : "filter-chip"} href="/articles">
            All
          </Link>
          {categories.map((item) => (
            <Link
              className={category === item.slug ? "filter-chip is-active" : "filter-chip"}
              href={`/articles?category=${item.slug}`}
              key={item.id}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="card-grid">
          {result.items.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>

        <div className="pagination-row">
          {Array.from({ length: result.totalPages }, (_, index) => (
            <Link
              className={result.page === index + 1 ? "pagination-button is-active" : "pagination-button"}
              href={`/articles?page=${index + 1}${category ? `&category=${category}` : ""}`}
              key={index}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
