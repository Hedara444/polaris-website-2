import Link from "next/link";

import type { ArticleListItem } from "@/lib/types";

export function ArticleCard({ article }: { article: ArticleListItem }) {
  return (
    <article className="content-card article-card">
      <div className="article-card-media">
        <img
          src={article.coverImageUrl ?? "/images/hero-bike.webp"}
          alt={article.title}
        />
      </div>
      <div className="article-card-body">
        <div className="card-chip-row">
          <span className="card-chip">{article.categoryName ?? "General"}</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <Link className="arrow-link" href={`/articles/${article.slug}`}>
          <span>Read article</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
