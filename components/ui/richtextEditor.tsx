"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="bg-muted/30 flex flex-wrap items-center gap-2 rounded-md border p-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(editor.isActive("bold") && "bg-muted")}
        >
          <Bold className="size-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(editor.isActive("italic") && "bg-muted")}
        >
          <Italic className="size-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(editor.isActive("bulletList") && "bg-muted")}
        >
          <List className="size-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(editor.isActive("orderedList") && "bg-muted")}
        >
          <ListOrdered className="size-4" />
        </Button>
      </div>

      <div className="rich-text-editor">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .rich-text-editor ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }

        .rich-text-editor ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }

        .rich-text-editor p {
          margin: 0.25rem 0;
        }

        .rich-text-editor strong {
          font-weight: 700;
        }

        .rich-text-editor em {
          font-style: italic;
        }

        .rich-text-editor .ProseMirror:empty::before {
          content: "${placeholder}";
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          float: left;
          height: 0;
        }
      `}</style>
    </div>
  );
}
