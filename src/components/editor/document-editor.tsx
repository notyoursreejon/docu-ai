"use client"

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Strikethrough, List, ListOrdered, Heading1, Heading2, Heading3, Quote, Wand2, RefreshCw, FileText, Briefcase, CheckCircle2, Cloud } from 'lucide-react'
import { useState, useEffect } from 'react'

export function DocumentEditor({ initialContent, onChange }: { initialContent: string, onChange?: (html: string) => void }) {
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setSaveStatus('unsaved')
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-8 bg-white dark:bg-zinc-950 shadow-sm border border-slate-200 dark:border-zinc-800 rounded-b-lg',
      },
    },
  })

  // Mock auto-save effect
  useEffect(() => {
    if (saveStatus === 'unsaved') {
      const timer = setTimeout(() => {
        setSaveStatus('saving')
        setTimeout(() => setSaveStatus('saved'), 800)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [saveStatus])

  const runAiAction = async (prompt: string) => {
    if (!editor) return
    const { from, to } = editor.state.selection
    const selectedText = editor.state.doc.textBetween(from, to, ' ')
    if (!selectedText) return

    setIsAiLoading(true)
    try {
      const res = await fetch('/api/editor-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, text: selectedText })
      })
      if (res.ok) {
        const data = await res.json()
        editor.chain().focus().insertContent(data.result).run()
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsAiLoading(false)
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-col w-full relative">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-2 bg-slate-100 dark:bg-zinc-900 border border-b-0 border-slate-200 dark:border-zinc-800 rounded-t-lg">
        <div className="flex flex-wrap items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-slate-200 dark:bg-zinc-800' : ''}><Bold className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-slate-200 dark:bg-zinc-800' : ''}><Italic className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-slate-200 dark:bg-zinc-800' : ''}><Strikethrough className="h-4 w-4" /></Button>
          <div className="w-px h-6 bg-slate-300 dark:bg-zinc-700 mx-1" />
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 dark:bg-zinc-800' : ''}><Heading1 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 dark:bg-zinc-800' : ''}><Heading2 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-slate-200 dark:bg-zinc-800' : ''}><Heading3 className="h-4 w-4" /></Button>
          <div className="w-px h-6 bg-slate-300 dark:bg-zinc-700 mx-1" />
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-slate-200 dark:bg-zinc-800' : ''}><List className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-slate-200 dark:bg-zinc-800' : ''}><ListOrdered className="h-4 w-4" /></Button>
        </div>
        
        <div className="flex items-center gap-2 px-3 text-xs font-medium text-slate-500">
          {saveStatus === 'saved' && <><CheckCircle2 className="h-3 w-3 text-green-500" /> Saved to cloud</>}
          {saveStatus === 'saving' && <><RefreshCw className="h-3 w-3 animate-spin" /> Saving...</>}
          {saveStatus === 'unsaved' && <><Cloud className="h-3 w-3" /> Pending save</>}
        </div>
      </div>

      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex overflow-hidden rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl">
        <button
          onClick={() => runAiAction("Improve phrasing")}
          disabled={isAiLoading}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 transition-colors disabled:opacity-50"
        >
          {isAiLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />} Improve
        </button>
        <button
          onClick={() => runAiAction("Make professional")}
          disabled={isAiLoading}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 transition-colors disabled:opacity-50"
        >
          <Briefcase className="h-4 w-4" /> Professional
        </button>
        <button
          onClick={() => runAiAction("Summarize")}
          disabled={isAiLoading}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors disabled:opacity-50"
        >
          <FileText className="h-4 w-4" /> Summarize
        </button>
      </BubbleMenu>

      {/* Editor Content Area */}
      <div className="flex-1 bg-slate-50 dark:bg-zinc-900/50 p-4 md:p-8 flex justify-center overflow-auto border border-t-0 border-slate-200 dark:border-zinc-800">
        <div className="w-full max-w-[210mm] shadow-lg">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
