"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { AsyncButton } from "@/components/ui/AsyncButton";
import "./CoverCropper.css";
import {
  COVER_EXPORT_HEIGHT,
  COVER_EXPORT_WIDTH,
  cropBoxHeight,
  cropBoxToPixels,
  fitCropBox,
  moveCropBox,
  scaleCropBox,
  type CropBox,
} from "@/lib/cover-crop";
import { slugify } from "@/lib/utils";

interface CoverCropperProps {
  file: File;
  onCancel: () => void;
  onConfirm: (cropped: File) => void;
}

export function CoverCropper({ file, onCancel, onConfirm }: CoverCropperProps) {
  // The object URL is (re)created inside the effect below, not once per
  // mount: both React StrictMode and Fast Refresh re-run effects while
  // PRESERVING state. Any create-once URL is revoked by such a cleanup
  // while the state still holds it, and the <img> then fails with
  // net::ERR_FILE_NOT_FOUND. Recreating on every effect run keeps the
  // state-held URL permanently valid.
  const [objectUrl, setObjectUrl] = useState("");
  const [imgStatus, setImgStatus] = useState<"loading" | "ready" | "error">("loading");
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [box, setBox] = useState<CropBox>({ x: 0, y: 0, w: 1 });
  const [scale, setScale] = useState(1);
  const [displayed, setDisplayed] = useState({ w: 0, h: 0 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef<{ startX: number; startY: number; box: CropBox } | null>(null);
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  // Intentional synchronous setState below: this effect syncs with the
  // external blob-URL system (create on run, revoke on cleanup). Recreating
  // on every effect run — rather than once per mount — is what survives
  // StrictMode and Fast Refresh effect re-runs that preserve state.
  useEffect(() => {
    const url = URL.createObjectURL(file);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    confirmRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  const measure = useCallback(() => {
    const img = imgRef.current;
    if (img && img.clientWidth > 0) {
      setDisplayed({ w: img.clientWidth, h: img.clientHeight });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  function handleImageLoad() {
    const img = imgRef.current;
    if (!img) {
      return;
    }
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) {
      setImgStatus("error");
      setError("Could not read this image. Try another file.");
      return;
    }
    setNatural({ w, h });
    setBox(fitCropBox(w, h));
    setScale(1);
    setImgStatus("ready");
    measure();
  }

  function handleImageError() {
    setImgStatus("error");
    setError("The photo could not be loaded. Try another file.");
  }

  // Live billboard preview of the selected region.
  useEffect(() => {
    const canvas = previewRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !natural.w) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const { sx, sy, sw, sh } = cropBoxToPixels(box, natural.w, natural.h);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    try {
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    } catch {}
  }, [box, natural]);

  function handleBoxPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    dragRef.current = { startX: event.clientX, startY: event.clientY, box };
  }

  function handleBoxPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || !displayed.w || !natural.w) {
      return;
    }
    setBox(
      moveCropBox(
        drag.box,
        (event.clientX - drag.startX) / displayed.w,
        (event.clientY - drag.startY) / displayed.h,
        natural.w,
        natural.h,
      ),
    );
  }

  function handleBoxPointerUp() {
    dragRef.current = null;
  }

  function handleBoxKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = 0.02;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setBox((current) => moveCropBox(current, -step, 0, natural.w, natural.h));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setBox((current) => moveCropBox(current, step, 0, natural.w, natural.h));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setBox((current) => moveCropBox(current, 0, -step, natural.w, natural.h));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setBox((current) => moveCropBox(current, 0, step, natural.w, natural.h));
    }
  }

  function handleScaleChange(value: number) {
    setScale(value);
    if (natural.w) {
      setBox((current) => scaleCropBox(current, value, natural.w, natural.h));
    }
  }

  async function handleConfirm() {
    const img = imgRef.current;
    if (!img || !natural.w || busy) {
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { sx, sy, sw, sh } = cropBoxToPixels(box, natural.w, natural.h);
      const canvas = document.createElement("canvas");
      canvas.width = COVER_EXPORT_WIDTH;
      canvas.height = COVER_EXPORT_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas is not available.");
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, COVER_EXPORT_WIDTH, COVER_EXPORT_HEIGHT);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", 0.85),
      );
      if (!blob) {
        throw new Error("Could not process this image.");
      }
      const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "article-cover";
      onConfirm(new File([blob], `${base}-cover.webp`, { type: "image/webp" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not process this image.");
      setBusy(false);
    }
  }

  const boxH = cropBoxHeight(box, natural.w, natural.h);
  const smallSource = natural.w > 0 && (natural.w < COVER_EXPORT_WIDTH || natural.h < COVER_EXPORT_HEIGHT);

  return createPortal(
    <div
      className="confirm-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) {
          onCancel();
        }
      }}
    >
      <div
        className="confirm-card confirm-card--wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cover-crop-title"
        aria-busy={busy}
      >
        <p className="confirm-kicker">COVER PHOTO</p>
        <h2 id="cover-crop-title" className="confirm-title">
          Crop to 16:9 billboard
        </h2>
        <p className="confirm-message">
          Drag the frame to choose the visible part. Article covers always display as a 16:9
          billboard, so tall photos need a selection here.
        </p>

        <div className="crop-stage">
          {objectUrl ? (
            <img
              ref={imgRef}
              src={objectUrl}
              alt="Cover photo to crop"
              className="crop-image"
              onLoad={handleImageLoad}
              onError={handleImageError}
              draggable={false}
            />
          ) : null}
          {imgStatus === "loading" && (
            <div className="crop-loading" role="status">
              <span className="btn-spinner" aria-hidden="true" />
              <span>Loading photo…</span>
            </div>
          )}
          {natural.w > 0 && displayed.w > 0 && (
            <div
              className="crop-box"
              role="slider"
              aria-label="Crop area. Arrow keys nudge, drag to move."
              aria-valuemin={20}
              aria-valuemax={100}
              aria-valuenow={Math.round(scale * 100)}
              tabIndex={0}
              style={{
                left: `${box.x * 100}%`,
                top: `${box.y * 100}%`,
                width: `${box.w * 100}%`,
                height: `${boxH * 100}%`,
              }}
              onPointerDown={handleBoxPointerDown}
              onPointerMove={handleBoxPointerMove}
              onPointerUp={handleBoxPointerUp}
              onPointerCancel={handleBoxPointerUp}
              onKeyDown={handleBoxKeyDown}
            />
          )}
        </div>

        <div className="crop-controls">
          <span id="crop-size-label">Size</span>
          <input
            type="range"
            min={20}
            max={100}
            value={Math.round(scale * 100)}
            aria-labelledby="crop-size-label"
            disabled={!natural.w || busy}
            onChange={(event) => handleScaleChange(Number(event.target.value) / 100)}
          />
        </div>

        <div className="crop-preview-row">
          <span>Billboard preview</span>
          <canvas ref={previewRef} width={320} height={180} className="crop-preview-canvas" />
        </div>

        {smallSource && (
          <p className="kw-note" role="status">
            This photo is smaller than 1280×720 — the result may look soft when enlarged.
          </p>
        )}
        {error ? <p className="form-error">{error}</p> : null}

        <div className="confirm-actions">
          <button className="button button-dark" disabled={busy} onClick={onCancel} type="button">
            Cancel
          </button>
          <AsyncButton
            ref={confirmRef}
            className="button button-primary"
            disabled={!natural.w}
            onClick={handleConfirm}
            pending={busy}
            pendingLabel="Cropping..."
            type="button"
          >
            Use this crop
          </AsyncButton>
        </div>
      </div>
    </div>,
    document.body,
  );
}
