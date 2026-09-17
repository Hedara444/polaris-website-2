import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleCategoryEditor } from "@/components/admin/ArticleCategoryEditor";
import { requireAdminPageAccess } from "@/server/auth";
import { getArticleCategoryById, getArticlesByArticleCategoryId } from "@/server/content-service";

export default async function EditArticleCategoryPage({
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

  const [category, linkedArticles] = await Promise.all([
    getArticleCategoryById(categoryId),
    getArticlesByArticleCategoryId(categoryId),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit Article Category"
      description="Rename the category or remove it. Removal drops its article links; articles keep their other categories."
    >
      <ArticleCategoryEditor category={category} linkedArticles={linkedArticles} />
    </AdminShell>
  );
}
