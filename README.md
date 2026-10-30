# POLARISS Landing Page & AI Chatbot (RAG System)

Official landing page and customer support platform for **POLARISS** — a vehicle security service that protects motorcycles and automobiles using GPS location tracking, LTE connectivity, and LINE-based notifications.

---

## 🌟 Table of Contents
- [1. Overview for Non-Developers (How the Chatbot Works)](#1-overview-for-non-developers-how-the-chatbot-works)
  - [What is RAG?](#what-is-rag)
  - [How Does the Chatbot Help Visitors?](#how-does-the-chatbot-help-visitors)
  - [Safety & Brand Protection](#safety--brand-protection)
  - [Zero-Downtime Fallback Mode](#zero-downtime-fallback-mode)
- [2. Technical Architecture for Developers](#2-technical-architecture-for-developers)
  - [Project Tech Stack](#project-tech-stack)
  - [RAG Directory Structure](#rag-directory-structure)
  - [Data Pipeline & Retrieval Mechanism](#data-pipeline--retrieval-mechanism)
  - [API Route & LLM Orchestration](#api-route--llm-orchestration)
  - [Frontend Chat Widget](#frontend-chat-widget)
- [3. Environment Variables & Setup](#3-environment-variables--setup)
  - [Local Development](#local-development)
  - [Vercel Deployment](#vercel-deployment)
- [4. Testing & Verification](#4-testing--verification)
- [5. How to Update Knowledge / FAQs](#5-how-to-update-knowledge--faqs)

---

## 1. Overview for Non-Developers (How the Chatbot Works)

### What is RAG?
Standard AI chatbots (like standard ChatGPT) generate answers based on general internet data. Sometimes, they "hallucinate" (invent convincing but false information) when asked about company-specific pricing, hardware details, or contract rules.

To solve this, we implemented **RAG (Retrieval-Augmented Generation)**:
1. **Search First**: When a visitor asks a question, the system first searches a private, curated library of verified POLARISS official documents (pricing, Kyocera device specifications, installation guide, LINE alerts, etc.).
2. **Read Facts**: The system retrieves the exact paragraphs that answer the visitor's question.
3. **Generate Answer**: The AI uses only those verified facts to write a polite, concise, and helpful response in natural Japanese.

### How Does the Chatbot Help Visitors?
* **24/7 Instant Answers**: Visitors can ask questions about pricing, setup, or app requirements and get an immediate answer.
* **Suggested Quick Prompts**: Visitors don't even have to type — clickable buttons like *"💰 料金プランと月額費用について"* or *"🛵 バイクや車への取り付け方法は？"* answer common questions in one click.
* **Transparent Citations**: Answers include clickable references (e.g. `[初回と継続料金]`) linking directly to the relevant official pages (`/price`, `/faq`).

### Safety & Brand Protection
The AI is governed by strict brand guardrails:
* **Accurate Pricing**: Strictly outputs the official figures: Initial 19,800円 (tax & shipping included), ongoing monthly 2,178円 (tax included).
* **Emergency Theft Guidance**: If a user mentions a stolen vehicle, the AI never gives dangerous advice or promises 100% recovery; it immediately instructs them to prioritize contacting the police.
* **No Speculation**: If a feature is not in the official documentation, the AI states: *"公式情報に記載がないため確認が必要です"* (Official confirmation required) and guides the user to the contact form.

### Zero-Downtime Fallback Mode
If the OpenAI API balance runs out of credits or experiences external downtime, the chatbot **will never crash or show a broken screen**:
* It automatically switches into **Direct Knowledge Mode**, delivering verified answers directly from the knowledge base.
* As soon as OpenAI credits are topped up, it seamlessly resumes conversational AI generation without needing any code changes.

---

## 2. Technical Architecture for Developers

```
[ User in Browser ]
        │  1. Sends query (e.g., "料金プランを教えて")
        ▼
[ /api/chat (Next.js Route) ]
        │  2. Domain Lexical Search & Tokenization
        ▼
[ Knowledge Corpus (25 Chunks) ]
        │  3. Retrieves top 3–5 matching chunks (Score: 13.6)
        ▼
[ OpenAI gpt-4o-mini ]
        │  4. Prompt: System Instructions + Grounded Context
        ▼
[ Streamed JSON Response ] ──► Assistant Answer + Source Tags
```

### Project Tech Stack
* **Framework**: Next.js 16 (App Router, Turbopack)
* **Language**: TypeScript 5, React 19
* **Styling**: Vanilla CSS with POLARISS CSS Design Tokens (`--ink`, `--warm`, `--blue`, `--green`)
* **Icons**: `lucide-react`
* **Validation**: `zod`
* **Testing**: `vitest`

### RAG Directory Structure
```
src/
├── app/
│   ├── (public)/
│   │   └── layout.tsx            # Injects <ChatWidget /> across all public routes
│   └── api/
│       └── chat/
│           └── route.ts          # POST handler for chat queries
├── components/
│   └── chat/
│       ├── ChatWidget.tsx        # Floating trigger + chat modal UI
│       └── chat-widget.css       # Responsive styling & mobile drawer rules
└── lib/
    └── rag/
        ├── types.ts              # KnowledgeChunk, ChatMessage, ChatResponse
        ├── knowledge-data.ts     # In-memory index of 25 vetted public chunks
        ├── retriever.ts          # Japanese tokenizer & scoring engine
        ├── retriever.test.ts     # Vitest unit tests for retrieval
        └── chat-service.ts       # OpenAI integration & graceful fallback handler
rag-data/
├── knowledge_chunks_public.jsonl # Canonical public chunk records
├── website_knowledge.md          # Digest of official pages
└── README.md                     # Provenance & precedence guidelines
```

### Data Pipeline & Retrieval Mechanism
* **Knowledge Store (`src/lib/rag/knowledge-data.ts`)**: 25 curated public chunks extracted from `rag-data/knowledge_chunks_public.jsonl` with tags, verified sources, and priority scores.
* **Retriever (`src/lib/rag/retriever.ts`)**:
  * **Normalization**: Fullwidth-to-halfwidth character conversion (`１９８００` $\to$ `19800`, `ＬＩＮＥ` $\to$ `LINE`).
  * **Domain Synonyms**: Expands Japanese synonyms across 9 key topics (`price`, `installation`, `line`, `cancellation`, `battery`, `theft`, `specs`, `accuracy`, `airtag`).
  * **Scoring Weights**:
    * Query in title: `+8.0`
    * Token in title: `+3.5`
    * Token in tags: `+2.5`
    * Content occurrences: `+0.8` (capped at `3.0`)
    * Official website source boost: `x 1.15`
  * Sub-millisecond execution in memory with zero external database dependencies.

### API Route & LLM Orchestration
* **Endpoint**: `POST /api/chat`
* **Request Schema**:
  ```json
  {
    "messages": [
      { "role": "user", "content": "バイクへの設置方法について" }
    ]
  }
  ```
* **Response Schema**:
  ```json
  {
    "ok": true,
    "role": "assistant",
    "content": "POLARISSは、バイクのシート下やトップケース、バッグ等に設置してご利用いただけます...",
    "sources": [
      { "id": "POL-WEB-20261015-05", "title": "設置方法", "url": "https://www.polariss.jp/faq" }
    ]
  }
  ```
* **LLM Engine**: `gpt-4o-mini` with `temperature: 0.3` for factual consistency.

### Frontend Chat Widget
* **Trigger Launcher**: Fixed at bottom-right (`position: fixed; right: 24px; bottom: 24px; z-index: 85;`).
* **Buybar Collision Protection**: Styled with higher `z-index: 85` (above the mobile buybar `z-index: 70`) and adjusted mobile spacing (`bottom: 84px`) to prevent UI overlap on small screens.
* **Lightweight Markdown**: Custom inline parser converts markdown bolding (`**bold**`), blockquotes (`> notice`), unordered lists (`・ item`), and internal/external links (`[text](/price)`) into interactive React nodes without heavy dependencies.

---

## 3. Environment Variables & Setup

### Local Development
In `.env` or `.env.local`:
```bash
# OpenAI API Key for POLARISS RAG Assistant
OPENAI_API_KEY=sk-your-openai-api-key
```

Run the development server:
```bash
npm run dev
```

### Vercel Deployment
When deploying to Vercel:
1. Navigate to **Project Settings** $\to$ **Environment Variables**.
2. Add `OPENAI_API_KEY` with your OpenAI production secret key.
3. Deploy! The `/api/chat` serverless route and `<ChatWidget />` will be active immediately.

---

## 4. Testing & Verification

Run the automated test suite (includes RAG retrieval accuracy tests):
```bash
npm test
```

Run TypeScript and lint validation:
```bash
npm run check
```

Run the production build:
```bash
npm run build
```

---

## 5. How to Update Knowledge / FAQs

When new official POLARISS features, FAQs, or policies are released:
1. Add or modify the public chunk in `rag-data/knowledge_chunks_public.jsonl`.
2. Update `src/lib/rag/knowledge-data.ts` (or re-run generation).
3. Run `npm test` to verify that existing search queries continue to match correctly.
