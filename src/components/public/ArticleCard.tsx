import Link from "next/link";

import type { ArticleListItem } from "@/lib/types";

interface ArticleCardProps {
  article: ArticleListItem;
  variant?: "feature" | "compact";
}

function formatDate(dateStr?: string | Date | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export function ArticleCard({ article, variant = "feature" }: ArticleCardProps) {
  const isFeature = variant === "feature";
  const dateText = formatDate(article.publishedAt || article.updatedAt);

  return (
    <article className={`guide-card ${isFeature ? "feature" : "compact"}`}>
      <div className="guide-visual" aria-hidden="true">
        <img
          src={article.coverImageUrl || "/images/hero-bike.webp"}
          alt=""
          style={{ width: "100%", height: "100%", maxHeight: "500px", objectFit: "cover" }}
        />
      </div>
      <div className="guide-card-body">
        <div className="guide-meta">
          <span>
            {article.categories && article.categories.length > 0
              ? article.categories.map((category) => category.name).join(" / ")
              : (article.categoryName || "盗難対策")}
          </span>
          {dateText && <time dateTime={String(article.publishedAt || article.updatedAt)}>{dateText}</time>}
        </div>
        <h3>
          <Link className="guide-title-link" href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        {isFeature && article.description && <p>{article.description}</p>}
      </div>
    </article>
  );
}
