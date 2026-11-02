import { retrieveKnowledge } from "./retriever";
import { ChatMessage, ChatResponse } from "./types";

const SYSTEM_PROMPT = `あなたは、大切なバイクや車両を見守るGPSセキュリティサービス「POLARISS（ポラリス）」の公式AIコンシェルジュです。
丁寧で安心感があり、誠実で分かりやすい日本語で回答してください。

【厳格な遵守ルール】
1. **事実に基づく回答**:
   - 必ず提供された【参考ナレッジ】の内容のみに基づいて回答してください。
   - ナレッジに記載がない内容や未確認の仕様については絶対に想像や憶測で断定せず、「公式情報に記載がないため、詳細はお問い合わせ窓口までお問い合わせください」と正直に案内してください。
2. **基本料金と仕様**:
   - 初回料金: 19,800円（税込・送料無料、本体18,000円＋消費税1,800円）
   - 2回目以降: 月額2,178円（税込、通信費1,980円＋消費税198円）
   - 個人向け契約に最低利用期間（縛り）の定めはありません。
3. **操作とアプリ**:
   - 専用アプリのインストールは不要です。普段利用している「LINE」を通じて通知を受け取り、Web画面で地図や位置を確認します（※LINEアカウント自体は必要です）。
4. **ハードウェア仕様**:
   - 端末型番: 京セラ LU1CMO13 (サイズ 約83×49×13.8mm / 重量 約63g)
   - 通信方式: LTE Cat.M1 (SIM内蔵、個別回線契約不要)
   - 測位: GPS / GLONASS / みちびき(QZSS)
   - バッテリー: 1,500mAh（外部給電なしで目安約4週間稼働）または車両バッテリーからの給電接続
5. **盗難・緊急時の安全ルール（最優先）**:
   - 盗難の疑いがある場合や相互監視の通知を受けた場合、絶対にユーザー自身で犯人や車両に近づかず、警察への通報・情報提供を最優先に促してください。POLARISSは車両の確実な回収や犯人追跡を保証するものではありません。
6. **回答のスタイル**:
   - 読みやすく整理し、箇条書きや重要な数値の太字強調を活用してください。
   - 関連する公式ページ（料金: /price、FAQ: /faq、購入: /order または Shopifyストア）も自然にご案内してください。`;

/**
 * Generate fallback answer directly from retrieved chunks if OpenAI API has quota exhaustion
 */
function buildFallbackResponse(
  topChunks: ReturnType<typeof retrieveKnowledge>,
  errorMessage?: string
): string {
  const primary = topChunks[0]?.chunk;
  if (!primary) {
    return "ご質問ありがとうございます。該当する情報が見つかりませんでした。詳細については公式サイトのお問い合わせ窓口（/contact）までお気軽にご相談ください。";
  }

  const chunkList = topChunks.map((c) => `・**${c.chunk.title}**: ${c.chunk.content}`).join("\n\n");

  const notice = errorMessage
    ? `> ⚠️ **OpenAI APIの利用枠制限（クレジット残高）が発生しているため、ナレッジベース直接検索モードで回答しています。**（OpenAI管理画面で残高を追加するとLLM自動生成に切り替わります）\n\n`
    : "";

  return `${notice}ご質問ありがとうございます。POLARISS公式ナレッジより以下の関連情報をご案内いたします：\n\n${chunkList}\n\nさらに詳しいご案内やご相談は、公式サイトの [料金ページ](/price) や [よくある質問](/faq)、[お問い合わせ](/contact) もぜひご覧ください。`;
}

/**
 * Execute RAG chat workflow:
 * 1. Retrieve relevant chunks
 * 2. Augment prompt with retrieved context
 * 3. Generate response using OpenAI (gpt-4o-mini) with graceful fallback
 */
export async function handleChat(messages: ChatMessage[]): Promise<ChatResponse> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const query = lastUserMessage?.content || "";

  // 1. Retrieve knowledge
  const searchResults = retrieveKnowledge(query, 4);

  const sources = searchResults.map((r) => ({
    id: r.chunk.id,
    title: r.chunk.title,
    url: r.chunk.source_url || "/faq",
  }));

  const contextText = searchResults
    .map(
      (r, idx) =>
        `[ナレッジ ${idx + 1}] タイトル: ${r.chunk.title}\n内容: ${r.chunk.content}\n出典: ${
          r.chunk.source_url || r.chunk.source_file || "公式ナレッジ"
        }`
    )
    .join("\n\n");

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      role: "assistant",
      content: buildFallbackResponse(searchResults, "OpenAI APIキーが未設定です。"),
      sources,
      warning: "OPENAI_API_KEY_MISSING",
    };
  }

  // 2. Prepare OpenAI messages
  const openAiMessages = [
    { role: "system", content: `${SYSTEM_PROMPT}\n\n【提供された参考ナレッジ】\n${contextText}` },
    ...messages.slice(-5), // Keep last 5 conversation turns for context
  ];

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openAiMessages,
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      console.warn("[POLARISS RAG] OpenAI API Error:", errorJson);

      const isQuotaError =
        res.status === 429 ||
        errorJson?.error?.code === "insufficient_quota" ||
        errorJson?.error?.code === "credit_balance_exhausted";

      return {
        role: "assistant",
        content: buildFallbackResponse(
          searchResults,
          isQuotaError ? "OpenAIのクレジット残高が不足しています。" : undefined
        ),
        sources,
        warning: isQuotaError ? "QUOTA_EXHAUSTED" : "API_ERROR",
      };
    }

    const data = await res.json();
    const assistantContent = data.choices?.[0]?.message?.content?.trim() || "";

    return {
      role: "assistant",
      content: assistantContent || buildFallbackResponse(searchResults),
      sources,
    };
  } catch (err: unknown) {
    console.error("[POLARISS RAG] Chat Service Exception:", err);
    return {
      role: "assistant",
      content: buildFallbackResponse(searchResults, "通信エラーが発生しました。"),
      sources,
      warning: "FETCH_EXCEPTION",
    };
  }
}
