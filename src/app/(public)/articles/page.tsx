import Link from "next/link";

import { ArticleCard } from "@/components/public/ArticleCard";
import { buildMetadata } from "@/lib/seo";
import { defaultKeywords } from "@/lib/site-config";
import { getCategoryList, listPublishedArticles } from "@/server/content-service";
import "./articles.css";

export const metadata = buildMetadata({
  title: "POLARISS | 盗難対策ガイド",
  description:
    "POLARISSからのお知らせと、クルマ・バイクの盗難傾向、日頃からできる対策をお届けします。",
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

  const featuredArticle = result.items[0];
  const listArticles = result.items.slice(1);

  return (
    <main id="top">
      {/* Hero Section matching guide.html */}
      <section className="guide-page-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">ホーム</Link>／<span>盗難対策ガイド</span>
          </div>
          <p className="kicker">盗難対策ガイド</p>
          <h1>
            お知らせと、
            <br />
            愛車を守るための読みもの。
          </h1>
          <p>
            POLARISSからのお知らせと、クルマ・バイクの盗難傾向、日頃からできる対策をお届けします。
          </p>
        </div>
      </section>

      {/* Main Body Section */}
      <section className="guide-page-body">
        <div className="wrap">
          {/* Category Filter Chips */}
          {categories.length > 0 && (
            <div className="articles-filter-section">
              <div className="chip-row">
                <Link
                  className={!category ? "filter-chip is-active" : "filter-chip"}
                  href="/articles"
                >
                  すべて
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
            </div>
          )}

          {/* Guide Index Grid */}
          {result.items.length > 0 ? (
            <div className="guide-index">
              {featuredArticle && (
                <div className="guide-index-feature">
                  <ArticleCard article={featuredArticle} variant="feature" />
                </div>
              )}
              {listArticles.length > 0 && (
                <div className="guide-index-list">
                  {listArticles.map((article) => (
                    <ArticleCard article={article} key={article.id} variant="compact" />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#8c8c84", padding: "48px 0" }}>
              記事が見つかりませんでした。
            </p>
          )}

          {/* Theme Row Footer */}
          <div className="theme-row">
            <div>
              <span>THEME 01</span>
              <b>バイク盗難</b>
            </div>
            <div>
              <span>THEME 02</span>
              <b>クルマ盗難</b>
            </div>
            <div>
              <span>THEME 03</span>
              <b>GPSの選び方</b>
            </div>
            <div>
              <span>THEME 04</span>
              <b>もしもの対応</b>
            </div>
          </div>

          {/* Pagination Controls */}
          {result.totalPages > 1 && (
            <div className="pagination-row">
              {Array.from({ length: result.totalPages }, (_, index) => (
                <Link
                  className={
                    result.page === index + 1
                      ? "pagination-button is-active"
                      : "pagination-button"
                  }
                  href={`/articles?page=${index + 1}${category ? `&category=${category}` : ""}`}
                  key={index}
                >
                  {index + 1}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
