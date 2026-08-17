"use client";

import dynamic from "next/dynamic";

import type { DirectionMode } from "@/lib/types";

const CkEditor = dynamic(
  () => import("@/components/admin/CkEditor").then((mod) => mod.CkEditor),
  { ssr: false },
);

export function RichTextEditor({
  value,
  direction,
  onChange,
}: {
  value: string;
  direction: DirectionMode;
  onChange: (value: string) => void;
}) {
  return (
    <div className="editor-shell">
      <CkEditor direction={direction} value={value} onChange={onChange} />
    </div>
  );
}