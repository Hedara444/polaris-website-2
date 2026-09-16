"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { FaqEditorInput, FaqItem, FaqCategoryItem } from "@/lib/types";
import { parseKeywords } from "@/lib/utils";

function toEditorState(faq?: FaqItem | null): FaqEditorInput {
  return {
    question: faq?.question ?? "",
    answer: faq?.answer ?? "",
    categoryId: faq?.categoryId ?? null,
    keywords: faq?.keywords ?? [],
    sortOrder: faq?.sortOrder ?? 1,
    status: faq?.status ?? "published",
  };
}

export function FaqEditor({ faq, categories = [] }: { faq?: FaqItem | null, categories?: FaqCategoryItem[] }) {
  const router = useRouter();
  const [form, setForm] = useState<FaqEditorInput>(toEditorState(faq));
  const [keywordsInput, setKeywordsInput] = useState((faq?.keywords ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const parsedKeywords = parseKeywords(keywordsInput);

  async function saveFaq() {
    setSaving(true);
    setError("");

    const response = await fetch(faq ? `/api/admin/faq/${faq.id}` : "/api/admin/faq-deprecated", {
      method: faq ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        keywords: parseKeywords(keywordsInput),
      }),
    });

    setSaving(false);

    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      setError(body.error ?? "Unable to save FAQ.");
      return;
    }

    const saved = (await response.json()) as { faq: FaqItem };
    for (let attempt = 0; attempt < 10; attempt += 1) {
      try {
        const probe = await fetch(`/api/admin/faq/${saved.faq.id}`, { cache: "no-store" });
        if (probe.ok) {
          break;
        }
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    window.location.assign(
      new URL(`/admin/faq/${saved.faq.id}`, window.location.origin).toString(),
    );
  }

  async function deleteFaq() {
    if (!faq || !window.confirm("Delete this FAQ item?")) {
      return;
    }

    const response = await fetch(`/api/admin/faq/${faq.id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Unable to delete FAQ.");
      return;
    }

    router.push("/admin/faq");
    router.refresh();
  }

  return (
    <div className="editor-page-grid single-column">
      <div className="editor-panel">
        <label className="field">
          <span>Question</span>
          <input
            value={form.question}
            onChange={(event) => setForm((current) => ({ ...current, question: event.target.value }))}
          />
        </label>

        <label className="field">
          <span>Answer</span>
          <textarea
            rows={8}
            value={form.answer}
            onChange={(event) => setForm((current) => ({ ...current, answer: event.target.value }))}
          />
        </label>

        <div className="field-grid">
          <label className="field">
            <span>Category</span>
            <select
              value={form.categoryId ?? ""}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  categoryId: event.target.value ? Number(event.target.value) : null,
                }))
              }
            >
              <option value="">-- No Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Sort order</span>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  sortOrder: Number(event.target.value) || 0,
                }))
              }
            />
          </label>

          <label className="field">
            <span>Status</span>
            <select
              value={form.status}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  status: event.target.value as FaqEditorInput["status"],
                }))
              }
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </label>
        </div>

        <label className="field">
          <span>Keywords</span>
          <input
            value={keywordsInput}
            onChange={(event) => setKeywordsInput(event.target.value)}
            placeholder="support, setup, vehicle security"
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-actions">
          <button className="button button-primary" disabled={saving} onClick={saveFaq} type="button">
            {saving ? "Saving..." : "Save FAQ"}
          </button>
          {faq ? (
            <button className="button button-danger" onClick={deleteFaq} type="button">
              Delete
            </button>
          ) : null}
        </div>

        <div className="editor-preview-meta">
          <strong>Admin preview</strong>
          <span>
            {faq
              ? form.status === "published"
                ? "This FAQ is visible on the public FAQ page."
                : "This FAQ is saved as draft and hidden from the public FAQ page."
              : "After the first save, this page stays open as the edit and preview screen."}
          </span>
        </div>

        <div className="admin-faq-preview">
          <div className="faq-item is-preview">
            <div className="faq-summary-preview">
              <span className="faq-number">Q{String(form.sortOrder || 0).padStart(2, "0")}</span>
              <strong>{form.question || "Question preview"}</strong>
              <span className="faq-plus" />
            </div>
            <div className="faq-answer">
              <span>A</span>
              <div>
                <p>{form.answer || "Answer preview will appear here."}</p>
                <div className="keyword-row">
                  {parsedKeywords.map((keyword) => (
                    <span className="keyword-chip" key={keyword}>
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
