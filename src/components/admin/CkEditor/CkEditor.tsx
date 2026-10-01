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
        licenseKey:"GPL",
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
        // External links open in a new tab with opener protection. The
        // decorator bakes this into newly saved HTML; previously saved
        // content is covered at render time by withExternalLinkTargets.
        link: {
          decorators: {
            openExternalInNewTab: {
              mode: "automatic",
              callback: (url: string | null) => /^(https?:)?\/\//.test(url ?? ""),
              attributes: {
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          },
        },
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