import { AdminShell } from "@/components/admin/AdminShell";
import { FaqCategoryEditor } from "@/components/admin/FaqCategoryEditor";
import { requireAdminPageAccess } from "@/server/auth";

export default async function NewFaqCategoryPage() {
  await requireAdminPageAccess();

  return (
    <AdminShell
      title="New FAQ Category"
      description="Create a new FAQ category to group questions together."
    >
      <FaqCategoryEditor />
    </AdminShell>
  );
}