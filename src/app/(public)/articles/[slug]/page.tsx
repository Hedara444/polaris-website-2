import { notFound } from "next/navigation";

import { defaultKeywords } from "@/lib/site-config";
import { buildContentMetadata } from "@/lib/seo";
import { formatDate, resolveDirection } from "@/lib/utils";
import { getArticleBySlug } from "@/server/content-service";
import "../articles.css";

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(decodeSlug(slug));

  if (!article) {
    return {};
  }

  return buildContentMetadata(
    {
      title: `${article.title} | POLARISS Articles`,
      description: article.description,
      path: `/articles/${article.slug}`,
      keywords: article.keywords,
    },
    defaultKeywords.articles,
  );
}

export default async function ArticleDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(decodeSlug(slug));

  if (!article) {
    notFound();
  }

  return (
    <section className="section page-shell">
      <div className="shell article-layout">
        <div className="article-hero">
          <img
            src={article.coverImageUrl ?? "/images/hero-bike.webp"}
            alt={article.title}
          />
        </div>
        <div className="article-copy">
          <div className="card-chip-row">
            <span className="card-chip">{article.categoryName ?? "General"}</span>
            <span className="meta-chip">{formatDate(article.publishedAt)}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="keyword-row">
            {article.keywords.map((keyword) => (
              <span className="keyword-chip" key={keyword}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <article
          className="article-body"
          dir={resolveDirection(article.direction)}
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />
      </div>
    </section>
  );
}
