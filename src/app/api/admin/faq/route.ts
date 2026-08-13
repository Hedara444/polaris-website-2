import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { requireAdminApiAccess } from "@/server/auth";
import { getAdminFaqs, upsertFaq } from "@/server/content-service";
import { faqInputSchema } from "@/server/validators";

export async function GET(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const faqs = await getAdminFaqs();
  return NextResponse.json({ faqs });
}

export async function POST(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = faqInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid FAQ." }, { status: 400 });
  }

  const faq = await upsertFaq(null, parsed.data);
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
  revalidatePath(`/admin/faq/${faq?.id ?? ""}`);
  return NextResponse.json({ faq });
}
