import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

const RichTextEditor = ({ value, onChange, placeholder = "Conținut articol…", minHeight = 200 }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank", rel: "noopener" } }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  if (!editor) return <div style={{ minHeight, border: "1px solid #ccc", borderRadius: "4px" }}>Se încarcă…</div>;

  return (
    <div className="rich-text-editor-wrap" style={{ minHeight }}>
      <div className="rich-text-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          title="Listă punctată"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          title="Listă numerotată"
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL link:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={editor.isActive("link") ? "is-active" : ""}
          title="Link"
        >
          Link
        </button>
      </div>
      <EditorContent editor={editor} />
      <style>{`
        .rich-text-editor-wrap {
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
          background: #fff;
        }
        .rich-text-toolbar {
          display: flex;
          gap: 2px;
          padding: 6px 8px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }
        .rich-text-toolbar button {
          padding: 6px 10px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
        }
        .rich-text-toolbar button:hover {
          background: #e5e7eb;
        }
        .rich-text-toolbar button.is-active {
          background: #d1d5db;
        }
        .rich-text-editor-wrap .ProseMirror {
          min-height: ${minHeight - 44}px;
          padding: 12px 14px;
          outline: none;
        }
        .rich-text-editor-wrap .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          float: left;
          height: 0;
          pointer-events: none;
        }
        .rich-text-editor-wrap .ProseMirror p { margin: 0 0 0.5em; }
        .rich-text-editor-wrap .ProseMirror ul,
        .rich-text-editor-wrap .ProseMirror ol { padding-left: 1.5em; margin: 0.5em 0; }
        .rich-text-editor-wrap .ProseMirror a { color: #2563eb; text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
