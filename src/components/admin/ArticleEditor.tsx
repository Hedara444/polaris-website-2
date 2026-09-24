"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { CoverCropper } from "@/components/admin/CoverCropper/CoverCropper";
import { AsyncButton } from "@/components/ui/AsyncButton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { ArticleDetails, ArticleEditorInput, CategoryItem } from "@/lib/types";
import {
  ARTICLE_KEYWORDS_MAX,
  ARTICLE_KEYWORDS_PUBLIC_MAX,
  normalizeKeywords,
  parseKeywords,
  slugify,
} from "@/lib/utils";

function toEditorState(article?: ArticleDetails | null): ArticleEditorInput {
  const categoryNames =
    article?.categories && article.categories.length > 0
      ? article.categories.map((category) => category.name)
      : article?.categoryName
        ? [article.categoryName]
        : [];
  return {
    title: article?.title ?? "",
    description: article?.description ?? "",
    coverImageUrl: article?.coverImageUrl ?? "",
    categoryName: categoryNames[0] ?? "",
    categoryNames,
    bodyHtml: article?.bodyHtml ?? "<p>Start writing here.</p>",
    keywords: article?.keywords ?? [],
    direction: article?.direction ?? "auto",
    status: article?.status ?? "published",
  };
}

function toggleCategoryName(names: string[], name: string) {
  const key = name.toLowerCase();
  if (names.some((item) => item.toLowerCase() === key)) {
    return names.filter((item) => item.toLowerCase() !== key);
  }
  return [...names, name];
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
  const [newKeywordInput, setNewKeywordInput] = useState("");
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [keywordNotice, setKeywordNotice] = useState("");

  const keywordList = useMemo(
    () => normalizeKeywords(keywordsInput, ARTICLE_KEYWORDS_MAX),
    [keywordsInput],
  );
  const rawKeywordCount = useMemo(() => parseKeywords(keywordsInput).length, [keywordsInput]);
  const keywordsAtMax = keywordList.length >= ARTICLE_KEYWORDS_MAX;
  const keywordsOverflowing = rawKeywordCount > keywordList.length;

  function setKeywordsFromList(next: string[]) {
    setKeywordsInput(next.join(", "));
  }

  function addKeywordsFromField() {
    const incoming = parseKeywords(newKeywordInput);
    if (incoming.length === 0) {
      return;
    }
    const existing = new Set(keywordList.map((keyword) => keyword.toLowerCase()));
    const fresh = incoming.filter((keyword) => {
      const key = keyword.toLowerCase();
      if (existing.has(key)) {
        return false;
      }
      existing.add(key);
      return true;
    });
    if (fresh.length === 0) {
      setKeywordNotice("That keyword already exists.");
      return;
    }
    if (keywordList.length >= ARTICLE_KEYWORDS_MAX) {
      setKeywordNotice(`Keyword limit reached (${ARTICLE_KEYWORDS_MAX}).`);
      return;
    }
    const room = ARTICLE_KEYWORDS_MAX - keywordList.length;
    const accepted = fresh.slice(0, room);
    setKeywordsFromList([...keywordList, ...accepted]);
    setKeywordNotice(
      accepted.length < fresh.length
        ? `Only the first ${ARTICLE_KEYWORDS_MAX} keywords are kept.`
        : "",
    );
    setNewKeywordInput("");
  }

  function removeKeyword(keyword: string) {
    setKeywordsFromList(keywordList.filter((item) => item !== keyword));
  }

  // Drag-and-drop reorder. While dragging we only shuffle a lightweight
  // preview array (no string re-processing); the baseline keywords string
  // is rebuilt once, on release.
  interface DragChip {
    key: number;
    value: string;
  }
  const [dropPreview, setDropPreview] = useState<DragChip[] | null>(null);
  const [draggedKey, setDraggedKey] = useState<number | null>(null);
  const draggedKeyRef = useRef<number | null>(null);
  const draggingKeywords = dropPreview !== null;
  const visibleKeywords = useMemo<DragChip[]>(
    () =>
      dropPreview ?? keywordList.map((value, key) => ({ key, value })),
    [dropPreview, keywordList],
  );

  function handleKeywordDragStart(key: number) {
    return (event: React.DragEvent) => {
      clearKeywordMagnet();
      draggedKeyRef.current = key;
      setDraggedKey(key);
      setDropPreview(keywordList.map((value, index) => ({ key: index, value })));
      event.dataTransfer.effectAllowed = "move";
      try {
        event.dataTransfer.setData("text/plain", String(key));
      } catch {}
    };
  }

  function handleKeywordDragOver(key: number) {
    return (event: React.DragEvent) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      const draggedKey = draggedKeyRef.current;
      if (draggedKey === null || draggedKey === key) {
        return;
      }
      setDropPreview((prev) => {
        if (!prev) {
          return prev;
        }
        const from = prev.findIndex((chip) => chip.key === draggedKey);
        const to = prev.findIndex((chip) => chip.key === key);
        if (from === -1 || to === -1 || from === to) {
          return prev;
        }
        const next = [...prev];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return next;
      });
    };
  }

  function handleKeywordDrop(event: React.DragEvent) {
    event.preventDefault();
    if (dropPreview) {
      setKeywordsFromList(dropPreview.map((chip) => chip.value));
    }
    draggedKeyRef.current = null;
    setDraggedKey(null);
    setDropPreview(null);
  }

  function handleKeywordDragEnd() {
    draggedKeyRef.current = null;
    setDraggedKey(null);
    setDropPreview(null);
  }

  // Magnetic hover: chips feel attracted to the cursor. We mutate chip
  // styles directly inside one rAF per frame (no React re-renders), with
  // strength falling off by cursor-to-chip distance.
  const kwRowRef = useRef<HTMLDivElement | null>(null);
  const kwMouseRef = useRef({ x: 0, y: 0 });
  const kwRafRef = useRef<number | null>(null);
  const KW_PULL_RADIUS = 150;
  const KW_PULL_MAX_PX = 6;

  function clearKeywordMagnet() {
    if (kwRafRef.current !== null) {
      cancelAnimationFrame(kwRafRef.current);
      kwRafRef.current = null;
    }
    const row = kwRowRef.current;
    if (!row) {
      return;
    }
    for (const child of Array.from(row.children)) {
      if (child instanceof HTMLElement) {
        child.style.boxShadow = "";
        child.style.transform = "";
      }
    }
  }

  function applyKeywordMagnet() {
    kwRafRef.current = null;
    const row = kwRowRef.current;
    if (!row) {
      return;
    }
    const { x, y } = kwMouseRef.current;
    for (const child of Array.from(row.children)) {
      if (!(child instanceof HTMLElement)) {
        continue;
      }
      const rect = child.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const distance = Math.hypot(x - cx, y - cy);
      const strength = Math.max(0, 1 - distance / KW_PULL_RADIUS);
      if (strength <= 0) {
        child.style.boxShadow = "";
        child.style.transform = "";
        continue;
      }
      const eased = strength * strength;
      const ring = (1 + eased * 2.5).toFixed(2);
      const pullX = (((x - cx) / KW_PULL_RADIUS) * KW_PULL_MAX_PX * eased).toFixed(2);
      const pullY = (((y - cy) / KW_PULL_RADIUS) * KW_PULL_MAX_PX * eased).toFixed(2);
      child.style.boxShadow = `0 0 0 ${ring}px var(--ink)`;
      child.style.transform = `translate(${pullX}px, ${pullY}px)`;
    }
  }

  function handleKeywordRowMouseMove(event: React.MouseEvent) {
    if (draggingKeywords) {
      return;
    }
    kwMouseRef.current = { x: event.clientX, y: event.clientY };
    if (kwRafRef.current !== null) {
      return;
    }
    kwRafRef.current = requestAnimationFrame(applyKeywordMagnet);
  }

  useEffect(() => {
    return () => {
      if (kwRafRef.current !== null) {
        cancelAnimationFrame(kwRafRef.current);
      }
    };
  }, []);
  // Tracks chips playing their vanish animation before moving lists.
  const [leavingChips, setLeavingChips] = useState<Record<string, "available" | "selected">>({});
  const leavingTimers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    const timers = leavingTimers.current;
    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, []);

  const selectedNames = form.categoryNames ?? [];
  const availableCategories = categories.filter(
    (category) =>
      !selectedNames.some((name) => name.toLowerCase() === category.name.toLowerCase()),
  );

  function moveChipWithAnimation(name: string, from: "available" | "selected") {
    const key = name.toLowerCase();
    if (leavingChips[key]) {
      return;
    }
    setLeavingChips((current) => ({ ...current, [key]: from }));
    const timer = setTimeout(() => {
      setForm((current) => ({
        ...current,
        categoryNames: toggleCategoryName(current.categoryNames ?? [], name),
      }));
      setLeavingChips((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }, 160);
    leavingTimers.current.push(timer);
  }

  function addCustomCategory() {
    const value = newCategoryInput.trim();
    if (!value) {
      return;
    }
    setForm((current) => {
      if (
        (current.categoryNames ?? []).some(
          (name) => name.toLowerCase() === value.toLowerCase(),
        )
      ) {
        return current;
      }
      return {
        ...current,
        categoryNames: [...(current.categoryNames ?? []), value],
      };
    });
    setNewCategoryInput("");
  }
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [cropFile, setCropFile] = useState<File | null>(null);
  // Sync guard: state updates don't commit before a second click can land.
  const busyRef = useRef(false);

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

    if (file.type && !file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      return;
    }

    // Covers are always cropped to the 16/9 billboard before upload.
    setUploadError("");
    setCropFile(file);
  }

  async function saveArticle() {
    if (busyRef.current) {
      return;
    }
    busyRef.current = true;
    setSaving(true);
    setError("");

    if (!form.coverImageUrl.trim()) {
      setSaving(false);
      busyRef.current = false;
      setError("Cover image is required.");
      return;
    }

    const categoryNames = (form.categoryNames ?? [])
      .map((name) => name.trim())
      .filter(Boolean);
    if (categoryNames.length === 0) {
      setSaving(false);
      busyRef.current = false;
      setError("Select at least one category.");
      return;
    }

    const payload = {
      ...form,
      categoryName: categoryNames[0],
      categoryNames,
      keywords: keywordList,
    };

    try {
      const response = await fetch(
        article ? `/api/admin/articles/${article.id}` : "/api/admin/articles",
        {
          method: article ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

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
    } finally {
      setSaving(false);
      busyRef.current = false;
    }
  }

  async function handleConfirmDelete() {
    if (!article || busyRef.current) {
      return;
    }
    busyRef.current = true;
    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/articles/${article.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError("Unable to delete article.");
        return;
      }

      router.push("/admin/articles");
      router.refresh();
    } finally {
      setDeleting(false);
      busyRef.current = false;
      setConfirmOpen(false);
    }
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
                <span>Required. JPG, JPEG, or WEBP only. You will crop it to 16:9 next.</span>
              </span>
            )}
            <span className="upload-dropzone-meta">
              {uploading ? "Uploading..." : form.coverImageUrl ? "Replace image" : "Choose file"}
            </span>
          </button>
          {form.coverImageUrl ? <div className="asset-path">Stored path: {form.coverImageUrl}</div> : null}
          {uploadError ? <p className="form-error">{uploadError}</p> : null}
          {cropFile ? (
            <CoverCropper
              file={cropFile}
              onCancel={() => setCropFile(null)}
              onConfirm={(cropped) => {
                setCropFile(null);
                void uploadCoverImage(cropped);
              }}
            />
          ) : null}
        </label>

        <div className="field">
          <span id="article-categories-label">Categories — at least one required</span>
          <p className="cat-picker-hint">
            Tap a category to select it. Extra categories are optional.
          </p>
          {availableCategories.length > 0 ? (
            <div
              className="cat-chip-row"
              role="group"
              aria-labelledby="article-categories-label"
              aria-label="Available categories"
            >
              {availableCategories.map((category) => {
                const isLeaving = leavingChips[category.name.toLowerCase()] === "available";
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed="false"
                    title={`Select ${category.name}`}
                    disabled={isLeaving}
                    className={`cat-chip cat-chip--available${isLeaving ? " is-leaving" : ""}`}
                    onClick={() => moveChipWithAnimation(category.name, "available")}
                  >
                    <span className="cat-chip__text">{category.name}</span>
                    <span className="cat-chip__icon" aria-hidden="true">
                      +
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="editor-preview-meta">
              <span>
                {categories.length === 0
                  ? "No categories yet — add one below."
                  : "All categories selected."}
              </span>
            </p>
          )}
          <div className="category-add-row">
            <input
              list="article-category-options"
              placeholder="Add a category (existing or new)"
              value={newCategoryInput}
              onChange={(event) => setNewCategoryInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addCustomCategory();
                }
              }}
            />
            <button
              className="button button-dark"
              type="button"
              onClick={addCustomCategory}
            >
              Add
            </button>
          </div>
          <datalist id="article-category-options">
            {categories.map((category) => (
              <option value={category.name} key={category.id} />
            ))}
          </datalist>
          <div className="cat-selected-zone">
            <span className="cat-selected-title">Selected ({selectedNames.length})</span>
            {selectedNames.length > 0 ? (
              <div
                className="cat-chip-row cat-chip-row--selected"
                role="group"
                aria-label="Selected categories"
              >
                {selectedNames.map((name) => {
                  const isLeaving = leavingChips[name.toLowerCase()] === "selected";
                  return (
                    <button
                      key={name.toLowerCase()}
                      type="button"
                      aria-pressed="true"
                      title={`Remove ${name}`}
                      disabled={isLeaving}
                      className={`cat-chip cat-chip--selected${isLeaving ? " is-leaving" : ""}`}
                      onClick={() => moveChipWithAnimation(name, "selected")}
                    >
                      <span className="cat-chip__text">{name}</span>
                      <span className="cat-chip__icon" aria-hidden="true">
                        ×
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="cat-empty">Nothing selected yet — pick at least one category above.</p>
            )}
          </div>
        </div>

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

        <div className="field">
          <div className="kw-heading">
            <span>Keywords</span>
            <span
              className={`kw-counter${keywordsAtMax ? " is-full" : ""}`}
              role="status"
              aria-label={`${keywordList.length} of ${ARTICLE_KEYWORDS_MAX} keywords used`}
              title={`${keywordList.length} of ${ARTICLE_KEYWORDS_MAX} keywords used`}
            >
              {keywordList.length}/{ARTICLE_KEYWORDS_MAX}
            </span>
          </div>
          <p className="cat-picker-hint">
            If you already have your set of keywords prepared, paste them here separated with
            commas. Drag a chip to reorder — the text above updates on release.
          </p>
          <input
            placeholder="gps devices, line tracking, vehicle security"
            value={keywordsInput}
            onChange={(event) => setKeywordsInput(event.target.value)}
            onBlur={() => setKeywordsFromList(keywordList)}
          />
          {keywordsOverflowing ? (
            <p className="kw-note" role="status">
              Only the first {ARTICLE_KEYWORDS_MAX} unique keywords are kept — extras and
              duplicates are ignored on save.
            </p>
          ) : null}
          <div className="category-add-row">
            <input
              placeholder={
                keywordsAtMax
                  ? `Keyword limit reached (${ARTICLE_KEYWORDS_MAX})`
                  : "Add a keyword, then press Enter"
              }
              value={newKeywordInput}
              disabled={keywordsAtMax}
              onChange={(event) => {
                setNewKeywordInput(event.target.value);
                setKeywordNotice("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addKeywordsFromField();
                }
              }}
            />
            <button
              className="button button-dark"
              disabled={keywordsAtMax}
              type="button"
              onClick={addKeywordsFromField}
            >
              Add
            </button>
          </div>
          {keywordNotice ? (
            <p className="kw-note" role="status">
              {keywordNotice}
            </p>
          ) : null}
          {visibleKeywords.length > 0 ? (
            <div
              className={`kw-chip-row${draggingKeywords ? " is-dragging" : ""}`}
              role="group"
              aria-label="Article keywords"
              ref={kwRowRef}
              onMouseMove={handleKeywordRowMouseMove}
              onMouseLeave={clearKeywordMagnet}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
              onDrop={handleKeywordDrop}
            >
              {visibleKeywords.map((chip) => (
                <span
                  className={`kw-chip${draggedKey === chip.key && draggingKeywords ? " is-dragging" : ""}`}
                  key={chip.key}
                  draggable
                  title="Drag to reorder"
                  onDragStart={handleKeywordDragStart(chip.key)}
                  onDragOver={handleKeywordDragOver(chip.key)}
                  onDrop={handleKeywordDrop}
                  onDragEnd={handleKeywordDragEnd}
                >
                  <span className="kw-chip__text">{chip.value}</span>
                  <span className="kw-chip__actions">
                    <button
                      aria-label={`Remove ${chip.value}`}
                      disabled={draggingKeywords}
                      onClick={() => removeKeyword(chip.value)}
                      title="Remove"
                      type="button"
                    >
                      ×
                    </button>
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <p className="editor-preview-meta">
              <span>No keywords yet — paste a list above or add them one by one.</span>
            </p>
          )}
        </div>

        <div className="slug-preview">Slug: /articles/{slugPreview || "new-article"}</div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-actions">
          <AsyncButton
            className="button button-primary"
            disabled={uploading || deleting}
            onClick={saveArticle}
            pending={saving}
            pendingLabel={uploading ? "Upload in progress" : "Saving..."}
            type="button"
          >
            {uploading ? "Upload in progress" : "Save article"}
          </AsyncButton>
          {article ? (
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
          {article && previewHref ? (
            <a className="button button-dark" href={previewHref} rel="noreferrer" target="_blank">
              Open public article
            </a>
          ) : null}
        </div>
        <ConfirmDialog
          confirmLabel="Delete"
          message={`Delete "${article?.title ?? "this article"}"? This cannot be undone.`}
          onCancel={() => {
            if (!deleting) {
              setConfirmOpen(false);
            }
          }}
          onConfirm={handleConfirmDelete}
          open={confirmOpen}
          pending={deleting}
          title="Delete article"
        />
      </div>

      <div className="editor-panel">
        <div className="editor-heading">
          <h2>Body</h2>
          <p>CKEditor 5 rich text editing with HTML storage and direction-aware rendering.</p>
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
              {(form.categoryNames ?? []).length > 0 ? (
                (form.categoryNames ?? []).map((name) => (
                  <span className="card-chip" key={name}>
                    {name}
                  </span>
                ))
              ) : (
                <span className="card-chip">General</span>
              )}
              <span className="meta-chip">{form.status === "published" ? "Published" : "Draft"}</span>
            </div>
            <h1>{form.title || "Article title preview"}</h1>
            <p className="article-description">
              {form.description || "Article description preview will appear here."}
            </p>
            <div className="keyword-row">
              {keywordList.slice(0, ARTICLE_KEYWORDS_PUBLIC_MAX).map((keyword) => (
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
