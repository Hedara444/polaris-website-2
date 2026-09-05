import { AdminShell } from "@/components/admin/AdminShell";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { requireAdminPageAccess } from "@/server/auth";
import { getFaqCategories } from "@/server/content-service";

export default async function NewFaqPage() {
  await requireAdminPageAccess();
  const categories = await getFaqCategories();

  return (
    <AdminShell
      title="New FAQ item"
      description="Create a new support entry with answer text, sort order, and SEO keywords."
    >
      <FaqEditor categories={categories} />
    </AdminShell>
  );
}
