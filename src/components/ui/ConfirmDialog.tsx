"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { AsyncButton } from "@/components/ui/AsyncButton";

interface ConfirmDialogProps {
  open: boolean;
  /** The action message shown in the dialog body. */
  message: string;
  /** Label for the confirmation button (e.g. "Delete"). */
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  cancelLabel?: string;
  pending?: boolean;
  tone?: "danger" | "primary";
}

export function ConfirmDialog({
  open,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  cancelLabel = "Cancel",
  pending = false,
  tone = "danger",
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    confirmRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onCancel, pending]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="confirm-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !pending) {
          onCancel();
        }
      }}
    >
      <div
        className="confirm-card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        aria-busy={pending}
      >
        <p className="confirm-kicker">CONFIRM</p>
        <h2 id="confirm-dialog-title" className="confirm-title">
          {title}
        </h2>
        <p id="confirm-dialog-message" className="confirm-message">
          {message}
        </p>
        <div className="confirm-actions">
          <button
            className="button button-dark"
            disabled={pending}
            onClick={onCancel}
            type="button"
          >
            {cancelLabel}
          </button>
          <AsyncButton
            ref={confirmRef}
            className={tone === "danger" ? "button button-danger" : "button button-primary"}
            onClick={onConfirm}
            pending={pending}
            pendingLabel={confirmLabel}
            type="button"
          >
            {confirmLabel}
          </AsyncButton>
        </div>
      </div>
    </div>,
    document.body,
  );
}
