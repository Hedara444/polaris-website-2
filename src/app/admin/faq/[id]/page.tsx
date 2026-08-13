import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";
import { FaqEditor } from "@/components/admin/FaqEditor";
import { requireAdminPageAccess } from "@/server/auth";
import { getFaqById } from "@/server/content-service";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminPageAccess();
  const { id } = await params;
  const faqId = Number(id);

  if (!faqId) {
    notFound();
  }

  const faq = await getFaqById(faqId);
  if (!faq) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit FAQ item"
      description="Update support content, ordering, and keyword metadata."
    >
      <FaqEditor faq={faq} />
    </AdminShell>
  );
}
