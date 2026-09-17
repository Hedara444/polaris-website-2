import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminPageAccess } from "@/server/auth";
import { getAdminArticleCategories, getUncategorizedArticles } from "@/server/content-service";

export default async function AdminArticleCategoriesPage() {
  await requireAdminPageAccess();
  const [categories, uncategorized] = await Promise.all([
    getAdminArticleCategories(),
    getUncategorizedArticles(),
  ]);

  return (
    <AdminShell
      title="Article Categories"
      description="Create, rename, and remove article categories. Removing a category drops its links — articles keep their remaining categories."
    >
      <div className="table-actions">
        <Link className="button button-primary" href="/admin/article-categories/new">
          New Category
        </Link>
      </div>

      <div className="admin-table">
        <div className="admin-table-row admin-table-head" style={{ gridTemplateColumns: "1fr 120px 120px" }}>
          <span>Name</span>
          <span>Slug</span>
          <span>Articles</span>
        </div>
        {categories.map((category) => (
          <Link
            className="admin-table-row"
            href={`/admin/article-categories/${category.id}`}
            key={category.id}
            style={{ gridTemplateColumns: "1fr 120px 120px" }}
          >
            <span>{category.name}</span>
            <span>{category.slug}</span>
            <span>{category.articleCount}</span>
          </Link>
        ))}
        {categories.length === 0 ? (
          <div className="admin-table-row">
            <span>No categories yet.</span>
            <span>—</span>
            <span>0</span>
          </div>
        ) : null}
      </div>

      <div className="editor-panel" style={{ marginTop: "24px" }}>
        <div className="editor-heading">
          <h2>Uncategorized articles ({uncategorized.length})</h2>
          <p>Every article stays reachable here, even with no category links.</p>
        </div>
        {uncategorized.length > 0 ? (
          <div className="admin-table">
            {uncategorized.map((article) => (
              <Link
                className="admin-table-row"
                href={`/admin/articles/${article.id}`}
                key={article.id}
                style={{ gridTemplateColumns: "1fr" }}
              >
                <span>{article.title}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="editor-preview-meta">
            <span>All articles have at least one category.</span>
          </p>
        )}
      </div>
    </AdminShell>
  );
}
