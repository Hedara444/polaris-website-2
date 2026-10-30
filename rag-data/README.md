# POLARISS RAG — Interview + official website (2026-10-15)

## Dataset
- `knowledge_chunks_all_review.jsonl` — merged 35 knowledge chunks, **NOT** safe to publish unfiltered.
- `knowledge_chunks_public.jsonl` — initial public subset (25 chunks); review any legacy interview chunks before publishing.
- `faq_drafts_merged.jsonl` — merged 44 question/answer drafts for test coverage, **not** ground-truth retrieval corpus.
- `website_knowledge.md` — manually curated website digest with canonical URLs.
- `knowledge_interview.md` — prior interview digest, preserved separately.
- `merge_review_queue.md` and `review_queue_interview.md` — pending confirmations.

## Provenance / precedence
1. Current officially verified website page: price, cancellation, practical FAQ.
2. Approved manufacturer manual/current operations document: procedural details.
3. Interview transcript: background, design philosophy, examples, NOT up-to-date binding contract.
4. Other sales decks: commercial client-specific information, do not expose through a public chatbot.

Keep `source_type`, `source_url` / `source_file`, `source_timestamp`, `visibility`, `verification`, and `priority`. Set an ingestion allowlist for public materials and strictly require a manual approval pass for source conflicts and feature status. The `planned` and `review` chunks are **not** deployable. Do not turn announcements of future features into present tense.

## Recommended integration
- Embed `title + '\n' + content` (UTF-8). One JSON object per line. Stable `id` for upsert, separate website vs interview provenance.
- For user-facing questions retrieve only approved content; prefer website result for fees/current features. Rerank by semantic relevance and source priority.
- Use `faq_drafts_merged.jsonl` for regression tests; do not index as authoritative facts because answers may duplicate or contradict source chunks.
- Log returned chunk IDs and display web page URL when possible.
- Handle unknowns with '公式情報に記載がないため確認が必要です' rather than inventing details.
- For theft questions emphasize police contact, avoid confrontation or promises of recovery.

## Coverage limitation
Website text retrieved from the homepage and /faq on 2026-10-15; not a complete crawl of every site route. Check `merge_review_queue.md`.
