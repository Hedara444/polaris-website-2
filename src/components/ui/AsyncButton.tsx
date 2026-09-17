"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface AsyncButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** When true the button locks (disabled) and shows a spinner. */
  pending?: boolean;
  /** Label shown while pending. Defaults to the idle children. */
  pendingLabel?: ReactNode;
}

/**
 * Button that locks itself and renders a small spinner while `pending`,
 * so double clicks / slow networks can't fire the action twice.
 */
export const AsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
  function AsyncButton({ pending = false, pendingLabel, children, disabled, ...rest }, ref) {
    const locked = pending || disabled;
    return (
      <button ref={ref} aria-busy={pending} disabled={locked} {...rest}>
        {pending ? <span className="btn-spinner" aria-hidden="true" /> : null}
        <span>{pending && pendingLabel !== undefined ? pendingLabel : children}</span>
      </button>
    );
  },
);
