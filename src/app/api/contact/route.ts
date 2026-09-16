import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

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

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  "pre-purchase": "購入前のご相談",
  installation: "取り付けについて",
  "in-use": "ご利用中のお問い合わせ",
  business: "法人・販売店からのご相談",
  other: "その他",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const inquiryLabel =
      INQUIRY_TYPE_LABELS[validatedData.inquiryType] || validatedData.inquiryType;

    const host = process.env.SMTP_HOST || "smtp.lolipop.jp";
    const port = Number(process.env.SMTP_PORT || "465");
    const secure = process.env.SMTP_SECURE !== "false";
    const user = process.env.SMTP_USER || "info@owl-ty.com";
    const pass = process.env.SMTP_PASS || "-i7z36zM_9OR--U-";
    const toEmail = process.env.CONTACT_TO_EMAIL || "info@owl-ty.com";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    // 1. Admin Notification Email
    const adminMailOptions = {
      from: `"POLARISS お問い合わせ" <${user}>`,
      to: toEmail,
      replyTo: validatedData.email,
      subject: `【POLARISS お問い合わせ】${inquiryLabel}（${validatedData.name}様）`,
      text: `POLARISS Webサイトよりお問い合わせがありました。

■ お問い合わせ内容
--------------------------------------------------
【お問い合わせ種別】 ${inquiryLabel}
【お名前】 ${validatedData.name}
【メールアドレス】 ${validatedData.email}
【電話番号】 ${validatedData.tel || "（未入力）"}

【お問い合わせ内容】
${validatedData.message}
--------------------------------------------------
送信日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #171716; border-bottom: 2px solid #5d6af4; padding-bottom: 8px;">
            POLARISS Webサイトよりお問い合わせを受け付けました
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <th style="text-align: left; padding: 8px 12px; background: #f5f2ec; width: 140px; border: 1px solid #e3dfd6;">お問い合わせ種別</th>
              <td style="padding: 8px 12px; border: 1px solid #e3dfd6;">${inquiryLabel}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px 12px; background: #f5f2ec; border: 1px solid #e3dfd6;">お名前</th>
              <td style="padding: 8px 12px; border: 1px solid #e3dfd6;">${validatedData.name}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px 12px; background: #f5f2ec; border: 1px solid #e3dfd6;">メールアドレス</th>
              <td style="padding: 8px 12px; border: 1px solid #e3dfd6;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px 12px; background: #f5f2ec; border: 1px solid #e3dfd6;">電話番号</th>
              <td style="padding: 8px 12px; border: 1px solid #e3dfd6;">${validatedData.tel || "（未入力）"}</td>
            </tr>
          </table>
          <h3 style="margin-top: 24px; color: #171716;">お問い合わせ本文</h3>
          <div style="padding: 16px; background: #f8f6f1; border: 1px solid #e3dfd6; border-radius: 6px; white-space: pre-wrap;">${validatedData.message}</div>
          <p style="font-size: 12px; color: #888; margin-top: 24px;">送信日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</p>
        </div>
      `,
    };

    // 2. User Confirmation Auto-reply Email
    const userMailOptions = {
      from: `"POLARISS カスタマーサポート" <${user}>`,
      to: validatedData.email,
      subject: `【POLARISS】お問い合わせを受け付けました`,
      text: `${validatedData.name} 様

この度は、POLARISSへお問い合わせいただき誠にありがとうございます。
以下の内容でお問い合わせを受け付けいたしました。

担当者より内容を確認のうえ、順次ご返信させていただきます。

--------------------------------------------------
【お問い合わせ種別】 ${inquiryLabel}
【お名前】 ${validatedData.name} 様
【メールアドレス】 ${validatedData.email}
【電話番号】 ${validatedData.tel || "（未入力）"}

【お問い合わせ内容】
${validatedData.message}
--------------------------------------------------

POLARISS カスタマーサポート
Email: ${user}
`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e3dfd6; border-radius: 8px;">
          <h2 style="color: #171716; margin-top: 0;">${validatedData.name} 様</h2>
          <p>この度は、POLARISSへお問い合わせいただき誠にありがとうございます。<br>以下の内容でお問い合わせを受け付けいたしました。</p>
          <p>担当者より内容を確認のうえ、順次ご連絡させていただきます。</p>
          
          <div style="background: #f8f6f1; border: 1px solid #e3dfd6; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><strong>【お問い合わせ種別】</strong> ${inquiryLabel}</p>
            <p style="margin: 0 0 8px 0;"><strong>【お名前】</strong> ${validatedData.name} 様</p>
            <p style="margin: 0 0 8px 0;"><strong>【メールアドレス】</strong> ${validatedData.email}</p>
            <p style="margin: 0 0 16px 0;"><strong>【電話番号】</strong> ${validatedData.tel || "（未入力）"}</p>
            <p style="margin: 0 0 4px 0;"><strong>【お問い合わせ内容】</strong></p>
            <div style="white-space: pre-wrap; color: #555;">${validatedData.message}</div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 13px; color: #777;">POLARISS カスタマーサポート<br>Email: <a href="mailto:${user}">${user}</a></p>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ ok: true, message: "お問い合わせを受け付けました。" });
  } catch (error) {
    console.error("[CONTACT_FORM_SMTP_ERROR]", error);

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

