import { PUBLIC_KNOWLEDGE_CHUNKS } from "./knowledge-data";
import { SearchResult } from "./types";

/**
 * Normalize full-width characters and spaces for Japanese text
 */
function normalizeText(text: string): string {
  return text
    .replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
    .replace(/　/g, " ")
    .toLowerCase()
    .trim();
}

/**
 * Domain-specific keyword synonym mapping for POLARISS
 */
const DOMAIN_SYNONYMS: Record<string, string[]> = {
  price: ["料金", "値段", "価格", "いくら", "費用", "月額", "初回", "初期費用", "本体代", "19,800", "2,178"],
  installation: ["設置", "取付", "取り付け", "付け方", "配線", "シート下", "バイク", "車両", "どこに", "車体"],
  line: ["line", "ライン", "アプリ", "通知", "操作", "スマートフォン", "スマホ"],
  cancellation: ["解約", "契約", "やめたい", "縛り", "最低利用期間", "違約金", "退会"],
  battery: ["バッテリー", "電池", "充電", "給電", "持ち", "もち", "稼働時間", "4週間", "1,500mah"],
  theft: ["盗難", "盗まれた", "泥棒", "対策", "警察", "相互監視", "sos", "発見", "安全", "接近", "犯人", "事件"],
  specs: ["仕様", "スペック", "型番", "京セラ", "kyocera", "サイズ", "重さ", "重量", "通信", "lte"],
  accuracy: ["位置", "精度", "gps", "測位", "誤差", "地下", "みちびき", "gnss"],
  airtag: ["airtag", "エアタグ", "bluetooth", "タグ", "違い", "比較"],
};

/**
 * Extract query tokens (n-grams, words, numbers)
 */
function extractTokens(query: string): string[] {
  const norm = normalizeText(query);
  const tokens = new Set<string>();

  // Extract English words and numbers
  const alphanumeric = norm.match(/[a-z0-9]+/g);
  if (alphanumeric) {
    alphanumeric.forEach((w) => {
      if (w.length >= 2) tokens.add(w);
    });
  }

  // Extract Katakana sequences
  const katakana = norm.match(/[\u30A1-\u30FA\u30FC]+/g);
  if (katakana) {
    katakana.forEach((k) => {
      if (k.length >= 2) tokens.add(k);
    });
  }

  // Extract Kanji words (2+ characters)
  const kanji = norm.match(/[\u4E00-\u9FFF]+/g);
  if (kanji) {
    kanji.forEach((k) => {
      if (k.length >= 2) {
        tokens.add(k);
        // Also add 2-grams for longer kanji compounds
        for (let i = 0; i < k.length - 1; i++) {
          tokens.add(k.substring(i, i + 2));
        }
      }
    });
  }

  // Check synonym triggers
  for (const [, synonyms] of Object.entries(DOMAIN_SYNONYMS)) {
    const matched = synonyms.some((syn) => norm.includes(syn));
    if (matched) {
      synonyms.forEach((s) => tokens.add(s));
    }
  }

  return Array.from(tokens);
}

/**
 * Retrieve the most relevant knowledge chunks using lexical + domain semantic scoring
 */
export function retrieveKnowledge(query: string, topK: number = 4): SearchResult[] {
  const normQuery = normalizeText(query);
  const tokens = extractTokens(query);

  const scored: SearchResult[] = PUBLIC_KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const normTitle = normalizeText(chunk.title);
    const normContent = normalizeText(chunk.content);
    const normTags = chunk.tags.map((t) => normalizeText(t));

    // Full query string match in title / content
    if (normTitle.includes(normQuery)) {
      score += 8.0;
    }
    if (normContent.includes(normQuery)) {
      score += 4.0;
    }

    // Token matching
    for (const token of tokens) {
      if (token.length < 2) continue;

      // Title match
      if (normTitle.includes(token)) {
        score += 3.5;
      }

      // Tag match
      if (normTags.some((t) => t.includes(token))) {
        score += 2.5;
      }

      // Content match
      const contentMatches = (normContent.match(new RegExp(escapeRegExp(token), "g")) || []).length;
      if (contentMatches > 0) {
        score += Math.min(contentMatches * 0.8, 3.0);
      }
    }

    // Source prioritization: official website has precedence on pricing & current features
    if (chunk.source_type === "official_website") {
      score *= 1.15;
    }

    return { chunk, score };
  });

  // Filter out chunks with 0 score, then sort descending
  const filtered = scored
    .filter((res) => res.score > 0)
    .sort((a, b) => b.score - a.score);

  // If nothing matched, return the top foundational chunks (service overview, pricing)
  if (filtered.length === 0) {
    const defaultChunks = PUBLIC_KNOWLEDGE_CHUNKS.filter(
      (c) => c.id === "POL-WEB-20261015-01" || c.id === "POL-WEB-20261015-03"
    ).map((chunk) => ({ chunk, score: 0.1 }));
    return defaultChunks;
  }

  return filtered.slice(0, topK);
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
