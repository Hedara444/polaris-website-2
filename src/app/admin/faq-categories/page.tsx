import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminPageAccess } from "@/server/auth";
import { getFaqCategories } from "@/server/content-service";

export default async function AdminFaqCategoriesPage() {
  await requireAdminPageAccess();
  const categories = await getFaqCategories();

  return (
    <AdminShell
      title="FAQ Categories"
      description="Manage FAQ categories, keywords, and display order."
    >
      <div className="table-actions">
        <Link className="button button-primary" href="/admin/faq-categories/new">
          New Category
        </Link>
      </div>

      <div className="admin-table">
        <div className="admin-table-row admin-table-head" style={{ gridTemplateColumns: "1fr 2fr 100px" }}>
          <span>Name</span>
          <span>Keywords</span>
          <span>Order</span>
        </div>
        {categories.map((category) => (
          <Link className="admin-table-row" href={`/admin/faq-categories/${category.id}`} key={category.id} style={{ gridTemplateColumns: "1fr 2fr 100px" }}>
            <span>{category.name}</span>
            <span>{category.keywords}</span>
            <span>{category.sortOrder}</span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}