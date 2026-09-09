import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  inquiryType: z.string().min(1, "お問い合わせ種別を選択してください。"),
  name: z.string().min(1, "お名前を入力してください。"),
  email: z.string().email("メールアドレスを確認してください。"),
  tel: z.string().optional().default(""),
  message: z.string().min(1, "お問い合わせ内容を入力してください。"),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "個人情報保護方針への同意が必要です。",
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    console.log("[CONTACT_FORM_SUBMISSION]", validatedData);

    return NextResponse.json({ ok: true, message: "お問い合わせを受け付けました。" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, message: error.issues[0]?.message || "入力内容をご確認ください。" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, message: "現在フォームから送信できません。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}
