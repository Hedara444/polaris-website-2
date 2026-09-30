"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { AsyncButton } from "@/components/ui/AsyncButton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

import type { ArticleCategoryEditorInput, ArticleListItem, CategoryItem } from "@/lib/types";

function toEditorState(category?: CategoryItem | null): ArticleCategoryEditorInput {
  return {
    name: category?.name ?? "",
  };
}

export function ArticleCategoryEditor({
  category,
  linkedArticles = [],
}: {
  category?: CategoryItem | null;
  linkedArticles?: ArticleListItem[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<ArticleCategoryEditorInput>(toEditorState(category));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState("");
  const busyRef = useRef(false);

  async function saveCategory() {
    if (busyRef.current) {
      return;
    }
    busyRef.current = true;
    setSaving(true);
    setError("");

    if (!form.name.trim()) {
      setSaving(false);
      busyRef.current = false;
      setError("Category name is required.");
      return;
    }

    try {
      const response = await fetch(
        category ? `/api/admin/article-categories/${category.id}` : "/api/admin/article-categories",
        {
          method: category ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        setError(body.error ?? "Unable to save category.");
        return;
      }

      const saved = (await response.json()) as { id?: number; success?: boolean };
      const savedId = category ? category.id : saved.id;

      for (let attempt = 0; attempt < 10; attempt += 1) {
        try {
          const probe = await fetch(`/api/admin/article-categories/${savedId}`, { cache: "no-store" });
          if (probe.ok) {
            break;
          }
        } catch {}
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      window.location.assign(
        new URL(`/admin/article-categories/${savedId}`, window.location.origin).toString(),
      );
    } finally {
      setSaving(false);
      busyRef.current = false;
    }
  }

  async function handleConfirmDelete() {
    if (!category || busyRef.current) {
      return;
    }
    busyRef.current = true;
    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/article-categories/${category.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setError("Unable to delete category.");
        return;
      }

      router.push("/admin/article-categories");
      router.refresh();
    } finally {
      setDeleting(false);
      busyRef.current = false;
      setConfirmOpen(false);
    }
  }

  return (
    <div className="editor-page-grid single-column">
      <div className="editor-panel">
        <label className="field">
          <span>Name</span>
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="e.g. Product updates"
          />
        </label>

        {category ? (
          <div className="field">
            <span>Linked articles ({linkedArticles.length})</span>
            {linkedArticles.length > 0 ? (
              <div className="admin-table">
                {linkedArticles.map((item) => (
                  <Link
                    className="admin-table-row"
                    href={`/admin/articles/${item.id}`}
                    key={item.id}
                    style={{ gridTemplateColumns: "1fr" }}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="editor-preview-meta">
                <span>No articles use this category yet.</span>
              </p>
            )}
          </div>
        ) : null}

        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-actions">
          <AsyncButton
            className="button button-primary"
            disabled={deleting}
            onClick={saveCategory}
            pending={saving}
            pendingLabel="Saving..."
            type="button"
          >
            Save Category
          </AsyncButton>
          {category ? (
            <AsyncButton
              className="button button-danger"
              disabled={saving}
              onClick={() => setConfirmOpen(true)}
              pending={deleting}
              pendingLabel="Deleting..."
              type="button"
            >
              Delete
            </AsyncButton>
          ) : null}
        </div>
        <ConfirmDialog
          confirmLabel="Delete"
          message={
            linkedArticles.length > 0
              ? `Delete "${category?.name ?? "this category"}"? ${linkedArticles.length} article(s) will lose this category link (articles keep their other categories).`
              : `Delete "${category?.name ?? "this category"}"? This cannot be undone.`
          }
          onCancel={() => {
            if (!deleting) {
              setConfirmOpen(false);
            }
          }}
          onConfirm={handleConfirmDelete}
          open={confirmOpen}
          pending={deleting}
          title="Delete category"
        />
      </div>
    </div>
  );
}
