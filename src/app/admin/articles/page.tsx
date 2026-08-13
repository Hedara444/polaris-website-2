import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { formatDate } from "@/lib/utils";
import { requireAdminPageAccess } from "@/server/auth";
import { getAdminArticles } from "@/server/content-service";

export default async function AdminArticlesPage() {
  await requireAdminPageAccess();
  const articles = await getAdminArticles();

  return (
    <AdminShell
      title="Articles"
      description="Create, update, and review article content, metadata, and publishing state."
    >
      <div className="table-actions">
        <Link className="button button-primary" href="/admin/articles/new">
          New article
        </Link>
      </div>

      <div className="admin-table">
        <div className="admin-table-row admin-table-head">
          <span>Title</span>
          <span>Category</span>
          <span>Updated</span>
          <span>Status</span>
        </div>
        {articles.map((article) => (
          <Link className="admin-table-row" href={`/admin/articles/${article.id}`} key={article.id}>
            <span>{article.title}</span>
            <span>{article.categoryName ?? "General"}</span>
            <span>{formatDate(article.updatedAt)}</span>
            <span>{article.publishedAt ? "Published" : "Draft"}</span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
