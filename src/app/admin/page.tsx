import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminPageAccess } from "@/server/auth";
import { getDashboardStats } from "@/server/content-service";

export default async function AdminDashboardPage() {
  await requireAdminPageAccess();
  const stats = await getDashboardStats();

  return (
    <AdminShell
      title="Dashboard"
      description="Quick overview of the current content inventory and publishing state."
    >
      <div className="admin-stats">
        <article className="admin-stat-card">
          <span>Total Articles</span>
          <strong>{stats.articleCount}</strong>
        </article>
        <article className="admin-stat-card">
          <span>Published Articles</span>
          <strong>{stats.publishedArticleCount}</strong>
        </article>
        <article className="admin-stat-card">
          <span>FAQ Items</span>
          <strong>{stats.faqCount}</strong>
        </article>
      </div>

      <div className="admin-shortcuts">
        <Link className="button button-dark" href="/admin/articles/new">
          New article
        </Link>
        <Link className="button button-primary" href="/admin/faq/new">
          New FAQ item
        </Link>
      </div>
    </AdminShell>
  );
}
