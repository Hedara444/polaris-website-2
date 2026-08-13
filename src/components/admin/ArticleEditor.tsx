"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { ArticleDetails, ArticleEditorInput, CategoryItem } from "@/lib/types";
import { parseKeywords, slugify } from "@/lib/utils";

function toEditorState(article?: ArticleDetails | null): ArticleEditorInput {
  return {
    title: article?.title ?? "",
    description: article?.description ?? "",
    coverImageUrl: article?.coverImageUrl ?? "",
    categoryName: article?.categoryName ?? "",
    bodyHtml: article?.bodyHtml ?? "<p>Start writing here.</p>",
    keywords: article?.keywords ?? [],
    direction: article?.direction ?? "auto",
    status: article?.status ?? "published",
  };
}

export function ArticleEditor({
  article,
  categories,
}: {
  article?: ArticleDetails | null;
  categories: CategoryItem[];
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<ArticleEditorInput>(toEditorState(article));
  const [keywordsInput, setKeywordsInput] = useState((article?.keywords ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");

  const slugPreview = useMemo(() => slugify(form.title), [form.title]);
  const previewHref =
    article && form.status === "published" ? `/articles/${article.slug}` : null;

  async function uploadCoverImage(file: File) {
    setUploading(true);
    setUploadError("");

    const payload = new FormData();
    payload.append("file", file);

    try {
      const response = await fetch("/api/admin/article-assets", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        setUploadError(body.error ?? "Unable to upload cover image.");
        return;
      }

      const body = (await response.json()) as { path: string };
      setForm((current) => ({ ...current, coverImageUrl: body.path }));
    } catch {
      setUploadError("Unable to upload cover image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleFileSelection(files: FileList | null) {
    const file = files?.[0];
    if (!file) {
      return;
    }

    await uploadCoverImage(file);
  }

  async function saveArticle() {
    setSaving(true);
    setError("");

    if (!form.coverImageUrl.trim()) {
      setSaving(false);
      setError("Cover image is required.");
      return;
    }

    const payload = {
      ...form,
      keywords: parseKeywords(keywordsInput),
    };

    const response = await fetch(
      article ? `/api/admin/articles/${article.id}` : "/api/admin/articles",
      {
        method: article ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    setSaving(false);

    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      setError(body.error ?? "Unable to save article.");
      return;
    }

    const saved = (await response.json()) as { article: ArticleDetails };
    for (let attempt = 0; attempt < 10; attempt += 1) {
      try {
        const probe = await fetch(`/api/admin/articles/${saved.article.id}`, { cache: "no-store" });
        if (probe.ok) {
          break;
        }
      } catch {}
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    window.location.assign(
      new URL(`/admin/articles/${saved.article.id}`, window.location.origin).toString(),
    );
  }

  async function deleteArticle() {
    if (!article || !window.confirm("Delete this article?")) {
      return;
    }

    const response = await fetch(`/api/admin/articles/${article.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("Unable to delete article.");
      return;
    }

    router.push("/admin/articles");
    router.refresh();
  }

  return (
    <div className="editor-page-grid">
      <div className="editor-panel">
        <label className="field">
          <span>Title</span>
          <input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({ ...current, description: event.target.value }))
            }
          />
        </label>

        <label className="field">
          <span>Cover image</span>
          <input
            ref={fileInputRef}
            accept=".jpg,.jpeg,.webp,image/jpeg,image/webp"
            className="sr-only"
            onChange={(event) => {
              void handleFileSelection(event.target.files);
              event.target.value = "";
            }}
            type="file"
          />
          <button
            className={`upload-dropzone ${uploading ? "is-busy" : ""} ${form.coverImageUrl ? "has-image" : ""}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={(event) => {
              event.preventDefault();
              void handleFileSelection(event.dataTransfer.files);
            }}
            type="button"
          >
            {form.coverImageUrl ? (
              <img alt="Article cover preview" className="upload-preview" src={form.coverImageUrl} />
            ) : (
              <span className="upload-dropzone-copy">
                <strong>Drag and drop a cover image</strong>
                <span>Required. JPG, JPEG, or WEBP only.</span>
              </span>
            )}
            <span className="upload-dropzone-meta">
              {uploading ? "Uploading..." : form.coverImageUrl ? "Replace image" : "Choose file"}
            </span>
          </button>
          {form.coverImageUrl ? <div className="asset-path">Stored path: {form.coverImageUrl}</div> : null}
          {uploadError ? <p className="form-error">{uploadError}</p> : null}
        </label>

        <label className="field">
          <span>Category</span>
          <input
            list="article-category-options"
            value={form.categoryName}
            onChange={(event) =>
              setForm((current) => ({ ...current, categoryName: event.target.value }))
            }
          />
          <datalist id="article-category-options">
            {categories.map((category) => (
              <option value={category.name} key={category.id} />
            ))}
          </datalist>
        </label>

        <div className="field-grid">
          <label className="field">
            <span>Status</span>
            <select
              value={form.status}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  status: event.target.value as ArticleEditorInput["status"],
                }))
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>

          <label className="field">
            <span>Direction</span>
            <select
              value={form.direction}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  direction: event.target.value as ArticleEditorInput["direction"],
                }))
              }
            >
              <option value="auto">Auto</option>
              <option value="ltr">LTR</option>
              <option value="rtl">RTL</option>
            </select>
          </label>
        </div>

        <label className="field">
          <span>Keywords</span>
          <input
            placeholder="gps devices, line tracking, vehicle security"
            value={keywordsInput}
            onChange={(event) => setKeywordsInput(event.target.value)}
          />
        </label>

        <div className="slug-preview">Slug: /articles/{slugPreview || "new-article"}</div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-actions">
          <button
            className="button button-primary"
            disabled={saving || uploading}
            onClick={saveArticle}
            type="button"
          >
            {saving ? "Saving..." : uploading ? "Upload in progress" : "Save article"}
          </button>
          {article ? (
            <button className="button button-danger" onClick={deleteArticle} type="button">
              Delete
            </button>
          ) : null}
          {article && previewHref ? (
            <a className="button button-dark" href={previewHref} rel="noreferrer" target="_blank">
              Open public article
            </a>
          ) : null}
        </div>
      </div>

      <div className="editor-panel">
        <div className="editor-heading">
          <h2>Body</h2>
          <p>TipTap editor with UTF-8 content and direction-aware rendering.</p>
        </div>
        <div className="editor-preview-meta">
          <strong>Admin preview</strong>
          <span>
            {article
              ? form.status === "published"
                ? "This article is live on the public site."
                : "This article is saved as draft. Public route stays unavailable until you publish it."
              : "After the first save, this page becomes the admin preview and edit screen."}
          </span>
        </div>
        <RichTextEditor
          direction={form.direction}
          value={form.bodyHtml}
          onChange={(bodyHtml) => setForm((current) => ({ ...current, bodyHtml }))}
        />
        <div className="admin-article-preview" dir={form.direction === "auto" ? undefined : form.direction}>
          <div className="article-hero">
            <img
              alt={form.title || "Article cover preview"}
              src={form.coverImageUrl || "/images/hero-bike.webp"}
            />
          </div>
          <div className="article-copy">
            <div className="card-chip-row">
              <span className="card-chip">{form.categoryName || "General"}</span>
              <span className="meta-chip">{form.status === "published" ? "Published" : "Draft"}</span>
            </div>
            <h1>{form.title || "Article title preview"}</h1>
            <p className="article-description">
              {form.description || "Article description preview will appear here."}
            </p>
            <div className="keyword-row">
              {parseKeywords(keywordsInput).map((keyword) => (
                <span className="keyword-chip" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <article
            className="article-body"
            dangerouslySetInnerHTML={{ __html: form.bodyHtml }}
          />
        </div>
      </div>
    </div>
  );
}
