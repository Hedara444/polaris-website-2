"use client";

import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import type { DirectionMode } from "@/lib/types";

const toolbarButtons = [
  { label: "B", action: "bold" },
  { label: "I", action: "italic" },
  { label: "H2", action: "heading" },
  { label: "UL", action: "bullet" },
  { label: "OL", action: "ordered" },
  { label: "Q", action: "quote" },
] as const;

export function RichTextEditor({
  value,
  direction,
  onChange,
}: {
  value: string;
  direction: DirectionMode;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: nextEditor }) => {
      onChange(nextEditor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const activeEditor = editor;

  function runAction(action: (typeof toolbarButtons)[number]["action"]) {
    const chain = activeEditor.chain().focus();

    switch (action) {
      case "bold":
        chain.toggleBold().run();
        break;
      case "italic":
        chain.toggleItalic().run();
        break;
      case "heading":
        chain.toggleHeading({ level: 2 }).run();
        break;
      case "bullet":
        chain.toggleBulletList().run();
        break;
      case "ordered":
        chain.toggleOrderedList().run();
        break;
      case "quote":
        chain.toggleBlockquote().run();
        break;
    }
  }

  return (
    <div className="editor-shell">
      <div className="editor-toolbar">
        {toolbarButtons.map((button) => (
          <button
            className="editor-button"
            key={button.action}
            onClick={() => runAction(button.action)}
            type="button"
          >
            {button.label}
          </button>
        ))}
        <button
          className="editor-button"
          onClick={() => activeEditor.chain().focus().setTextAlign("left").run()}
          type="button"
        >
          L
        </button>
        <button
          className="editor-button"
          onClick={() => activeEditor.chain().focus().setTextAlign("center").run()}
          type="button"
        >
          C
        </button>
        <button
          className="editor-button"
          onClick={() => activeEditor.chain().focus().setTextAlign("right").run()}
          type="button"
        >
          R
        </button>
      </div>
      <EditorContent className="editor-content" dir={direction} editor={activeEditor} />
    </div>
  );
}
