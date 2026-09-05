import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/server/auth";
import { deleteFaqCategory, getFaqCategoryById, upsertFaqCategory } from "@/server/content-service";
import { faqCategoryInputSchema } from "@/server/validators";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: idStr } = await props.params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  const category = await getFaqCategoryById(id);
  if (!category) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ category });
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: idStr } = await props.params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  const payload = await request.json();
  const parsed = faqCategoryInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid FAQ Category." }, { status: 400 });
  }

  await upsertFaqCategory(id, parsed.data);
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/admin/faq-categories");
  revalidatePath(`/admin/faq-categories/${id}`);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id: idStr } = await props.params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  await deleteFaqCategory(id);
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/admin/faq-categories");
  return NextResponse.json({ success: true });
}
