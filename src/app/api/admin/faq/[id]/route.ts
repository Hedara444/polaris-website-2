import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/server/auth";
import { deleteFaq, getFaqById, upsertFaq } from "@/server/content-service";
import { faqInputSchema } from "@/server/validators";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const faq = await getFaqById(Number(id));
  if (!faq) {
    return NextResponse.json({ error: "FAQ not found." }, { status: 404 });
  }

  return NextResponse.json({ faq }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const payload = await request.json();
  const parsed = faqInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid FAQ." }, { status: 400 });
  }

  const faq = await upsertFaq(Number(id), parsed.data);
  revalidatePath("/");
  revalidatePath("/faq-deprecated");
  revalidatePath("/admin/faq-deprecated");
  revalidatePath(`/admin/faq/${faq?.id ?? ""}`);
  return NextResponse.json({ faq });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  await deleteFaq(Number(id));
  revalidatePath("/");
  revalidatePath("/faq-deprecated");
  revalidatePath("/admin/faq-deprecated");
  return NextResponse.json({ ok: true });
}
