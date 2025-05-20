import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import MenuBar from './MenuBar'

interface TiptapProps {
  content?: string
  onChange: (content: string) => void
}

const TiptapEditor: React.FC<TiptapProps> = ({ content = '', onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap-editor" />
    </div>
  )
}

export default TiptapEditor