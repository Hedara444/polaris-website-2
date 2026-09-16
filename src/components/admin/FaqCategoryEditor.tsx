"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { FaqCategoryEditorInput, FaqCategoryItem } from "@/lib/types";

function toEditorState(category?: FaqCategoryItem | null): FaqCategoryEditorInput {
  return {
    name: category?.name ?? "",
    keywords: category?.keywords ?? "",
    sortOrder: category?.sortOrder ?? 0,
  };
}

export function FaqCategoryEditor({ category }: { category?: FaqCategoryItem | null }) {
  const router = useRouter();
  const [form, setForm] = useState<FaqCategoryEditorInput>(toEditorState(category));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function saveCategory() {
    setSaving(true);
    setError("");

    const response = await fetch(category ? `/api/admin/faq-categories/${category.id}` : "/api/admin/faq-deprecated-categories", {
      method: category ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      setError(body.error ?? "Unable to save FAQ Category.");
      return;
    }

    const saved = (await response.json()) as { id?: number; success?: boolean };
    const savedId = category ? category.id : saved.id;
    
    for (let attempt = 0; attempt < 10; attempt += 1) {
      try {
        const probe = await fetch(`/api/admin/faq-categories/${savedId}`, { cache: "no-store" });
        if (probe.ok) {
          break;
        }
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    window.location.assign(
      new URL(`/admin/faq-categories/${savedId}`, window.location.origin).toString(),
    );
  }

  async function deleteCategory() {
    if (!category || !window.confirm("Delete this FAQ Category? Associated FAQs will be uncategorized.")) {
      return;
    }

    const response = await fetch(`/api/admin/faq-categories/${category.id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Unable to delete FAQ Category.");
      return;
    }

    router.push("/admin/faq-categories");
    router.refresh();
  }

  return (
    <div className="editor-page-grid single-column">
      <div className="editor-panel">
        <label className="field">
          <span>Name</span>
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
        </label>

        <label className="field">
          <span>Keywords (SEO)</span>
          <input
            value={form.keywords}
            onChange={(event) => setForm((current) => ({ ...current, keywords: event.target.value }))}
            placeholder="comma, separated, keywords"
          />
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

        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-actions">
          <button className="button button-primary" disabled={saving} onClick={saveCategory} type="button">
            {saving ? "Saving..." : "Save Category"}
          </button>
          {category ? (
            <button className="button button-danger" onClick={deleteCategory} type="button">
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}