import Link from "next/link";

import { AdminShell } from "@/components/admin/AdminShell";
import { formatDate } from "@/lib/utils";
import { requireAdminPageAccess } from "@/server/auth";
import { getAdminFaqs, getFaqCategories } from "@/server/content-service";

export default async function AdminFaqPage() {
  await requireAdminPageAccess();
  const faqs = await getAdminFaqs();
  const categories = await getFaqCategories();
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

  return (
    <AdminShell
      title="FAQ"
      description="Maintain support answers, keyword metadata, and the public display order."
    >
      <div className="table-actions">
        <Link className="button button-primary" href="/admin/faq/new">
          New FAQ item
        </Link>
      </div>

      <div className="admin-table">
        <div className="admin-table-row admin-table-head" style={{ gridTemplateColumns: "2fr 1fr 100px 100px 120px" }}>
          <span>Question</span>
          <span>Category</span>
          <span>Order</span>
          <span>Status</span>
          <span>Updated</span>
        </div>
        {faqs.map((faq) => (
          <Link className="admin-table-row" href={`/admin/faq/${faq.id}`} key={faq.id} style={{ gridTemplateColumns: "2fr 1fr 100px 100px 120px" }}>
            <span>{faq.question}</span>
            <span>{faq.categoryId ? categoryMap.get(faq.categoryId) : "-"}</span>
            <span>{faq.sortOrder}</span>
            <span>{faq.status}</span>
            <span>{formatDate(faq.updatedAt)}</span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
