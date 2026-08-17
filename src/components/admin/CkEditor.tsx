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
        licenseKey:'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODgyMjA3OTksImp0aSI6ImJiZGRiMDY1LTlhNjMtNDEwNi1iOTFmLTI4YWQzMzdmMjliYSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjkyOWFkODZiIn0.gTasW1jmhWMxQc9nvmaKVc7-ThLD84B7XiGbbY_-QTz3GsJt7BEEBCsHddhQqVhNuvqzRNtEWBPtv9IUSzNjVg',
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