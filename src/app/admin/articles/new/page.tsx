import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { requireAdminPageAccess } from "@/server/auth";
import { getCategoryList } from "@/server/content-service";

export default async function NewArticlePage() {
  await requireAdminPageAccess();
  const categories = await getCategoryList();

  return (
    <AdminShell
      title="New article"
      description="Create a new article with rich text, direction settings, and SEO keywords."
    >
      <ArticleEditor categories={categories} />
    </AdminShell>
  );
}
