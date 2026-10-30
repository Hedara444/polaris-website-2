export interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  lang: string;
  source_file?: string;
  source_url?: string;
  source_type: "official_website" | "interview_transcript";
  interview_date?: string;
  source_timestamp?: string;
  visibility: "public" | "review" | "planned" | "internal";
  verification?: string;
  accessed_date?: string;
  priority?: number;
  tags: string[];
  [key: string]: unknown;
}

export interface SearchResult {
  chunk: KnowledgeChunk;
  score: number;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatResponse {
  role: "assistant";
  content: string;
  sources: {
    id: string;
    title: string;
    url?: string;
  }[];
  warning?: string;
}
