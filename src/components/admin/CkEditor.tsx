"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Italic,
  Link,
  List,
  Paragraph,
  RemoveFormat,
  Underline,
} from "ckeditor5";
import {siteConfig} from "@/lib/site-config";
import type { DirectionMode } from "@/lib/types";

import "ckeditor5/ckeditor5.css";

export function CkEditor({
  value,
  direction,
  onChange,
}: {
  value: string;
  direction: DirectionMode;
  onChange: (value: string) => void;
}) {
  return (
    <CKEditor
      id={`direction-${direction}`}
      editor={ClassicEditor}
      data={value}
      config={{
        licenseKey:siteConfig.ckEditorKey,
        placeholder: "Start writing here.",
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "link",
          "|",
          "alignment:left",
          "alignment:center",
          "alignment:right",
          "|",
          "undo",
          "redo",
          "removeFormat",
        ],
        plugins: [
          Alignment,
          BlockQuote,
          Bold,
          Essentials,
          Heading,
          Italic,
          Link,
          List,
          Paragraph,
          RemoveFormat,
          Underline,
        ],
      }}
      onChange={(_, editor) => {
        onChange(editor.getData());
      }}
      onReady={(editor) => {
        const editable = editor.ui.getEditableElement();
        if (editable) {
          editable.setAttribute("dir", direction === "auto" ? "auto" : direction);
        }
      }}
    />
  );
}