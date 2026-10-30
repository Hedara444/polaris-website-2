import { NextResponse } from "next/server";
import { z } from "zod";
import { handleChat } from "@/lib/rag/chat-service";

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1).max(2500),
      })
    )
    .min(1, "メッセージが空です。"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = chatRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "無効なリクエスト形式です。",
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const chatResponse = await handleChat(parsed.data.messages);

    return NextResponse.json({
      ok: true,
      ...chatResponse,
    });
  } catch (error) {
    console.error("[POLARISS RAG] Chat Route Error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "チャット処理中にエラーが発生しました。しばらく待ってから再度お試しください。",
      },
      { status: 500 }
    );
  }
}
