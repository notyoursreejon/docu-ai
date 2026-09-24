"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { useChat } from "ai/react"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Extract text from the editor if it exists on the page
  const getDocumentContext = () => {
    if (typeof document !== 'undefined') {
      const editor = document.querySelector('.ProseMirror');
      if (editor) return editor.textContent || "";
    }
    return "";
  }

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Hi! I am your DocuAI assistant. How can I help you format or convert your documents today?' }
    ],
    body: {
      documentContext: getDocumentContext()
    }
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[350px] h-[500px] shadow-2xl z-50 flex flex-col border-slate-200 dark:border-zinc-800 animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-indigo-600 text-white rounded-t-xl py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-md flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> DocuAI Support
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-indigo-700 p-0 h-6 w-6 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4 bg-slate-50 dark:bg-zinc-950">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-50 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-500 rounded-2xl rounded-tl-sm p-3 text-sm flex gap-1">
                  <span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-b-xl flex gap-2">
            <Input 
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </>
  )
}
