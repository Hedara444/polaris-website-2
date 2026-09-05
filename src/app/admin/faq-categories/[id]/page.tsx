import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { FaqCategoryEditor } from "@/components/admin/FaqCategoryEditor";
import { requireAdminPageAccess } from "@/server/auth";
import { getFaqCategoryById } from "@/server/content-service";

export default async function EditFaqCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPageAccess();
  const { id } = await params;
  const categoryId = Number(id);

  if (!categoryId) {
    notFound();
  }

  const category = await getFaqCategoryById(categoryId);
  if (!category) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit FAQ Category"
      description="Update category details, ordering, and keyword metadata."
    >
      <FaqCategoryEditor category={category} />
    </AdminShell>
  );
}