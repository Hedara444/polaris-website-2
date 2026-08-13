import { AdminShell } from "@/components/admin/AdminShell";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { requireAdminPageAccess } from "@/server/auth";

export default async function NewFaqPage() {
  await requireAdminPageAccess();

  return (
    <AdminShell
      title="New FAQ item"
      description="Create a new support entry with answer text, sort order, and SEO keywords."
    >
      <FaqEditor />
    </AdminShell>
  );
}
