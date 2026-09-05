import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/server/auth";
import { getFaqCategories, upsertFaqCategory } from "@/server/content-service";
import { faqCategoryInputSchema } from "@/server/validators";

export async function GET(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const categories = await getFaqCategories();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = faqCategoryInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid FAQ Category." }, { status: 400 });
  }

  const id = await upsertFaqCategory(null, parsed.data);
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/admin/faq-categories");
  return NextResponse.json({ id });
}
