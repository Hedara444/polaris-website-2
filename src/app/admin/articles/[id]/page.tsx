import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { requireAdminPageAccess } from "@/server/auth";
import { getAdminArticleById, getCategoryList } from "@/server/content-service";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPageAccess();
  const { id } = await params;
  const articleId = Number(id);

  if (!articleId) {
    notFound();
  }

  const [article, categories] = await Promise.all([
    getAdminArticleById(articleId),
    getCategoryList(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit article"
      description="Update the article body, metadata, keywords, direction, and visibility."
    >
      <ArticleEditor article={article} categories={categories} />
    </AdminShell>
  );
}
