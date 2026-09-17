import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleCategoryEditor } from "@/components/admin/ArticleCategoryEditor";
import { requireAdminPageAccess } from "@/server/auth";

export default async function NewArticleCategoryPage() {
  await requireAdminPageAccess();

  return (
    <AdminShell
      title="New Article Category"
      description="Create a new category that can be attached to articles."
    >
      <ArticleCategoryEditor />
    </AdminShell>
  );
}
