"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UploadCloud, Type, FileImage, ArrowRight, CheckCircle2 } from "lucide-react"
import { DocumentEditor } from "@/components/editor/document-editor"
import { FileUploader } from "@/components/file-uploader"

export default function CreateDocumentPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [editorHtml, setEditorHtml] = useState("<h1>Your Document</h1><p>Start editing here...</p>")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-8">
          <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-2xl w-full max-w-4xl max-h-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-900">
              <h3 className="font-semibold text-lg">Document Preview</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsPreviewOpen(false)}>Close</Button>
            </div>
            <div className="flex-1 overflow-auto p-8 bg-slate-200 dark:bg-zinc-900 flex justify-center">
              <div 
                className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] shadow-lg p-12 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: editorHtml }}
              />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Back to Editor</Button>
              <Button 
                onClick={async () => {
                  const res = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ html: editorHtml, format: 'pdf' })
                  });
                  if (res.ok) {
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'document.pdf';
                    a.click();
                    setIsPreviewOpen(false);
                  }
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Confirm Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Document</h1>
        <p className="text-slate-500">Transform your input into a professional document.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between relative pb-8">
        <div className="absolute left-0 top-4 -z-10 h-0.5 w-full bg-slate-200 dark:bg-zinc-800" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium border-2 transition-colors bg-white dark:bg-zinc-950
              ${step >= i ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-slate-300 text-slate-400 dark:border-zinc-700'}
            `}>
              {i}
            </div>
            <span className={`text-xs font-medium ${step >= i ? 'text-slate-900 dark:text-zinc-50' : 'text-slate-400'}`}>
              {i === 1 ? 'Input' : i === 2 ? 'Processing' : i === 3 ? 'Review' : 'Export'}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <Card className="min-h-[500px] border-slate-200 dark:border-zinc-800 shadow-sm">
        <CardContent className="p-6 h-full">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center mb-8">Choose Input Type</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => { setEditorHtml("<h1>Your Document</h1><p>Start typing...</p>"); setStep(3); }}
                  className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-dashed border-slate-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all group"
                >
                  <Type className="h-10 w-10 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  <div className="space-y-1 text-center">
                    <p className="font-medium text-slate-900 dark:text-zinc-50">Paste Text</p>
                    <p className="text-xs text-slate-500">Raw text to formatted document</p>
                  </div>
                </button>
                <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-solid border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/30">
                  <FileImage className="h-10 w-10 text-indigo-500" />
                  <div className="space-y-1 text-center">
                    <p className="font-medium text-slate-900 dark:text-zinc-50">Batch Process Images</p>
                    <p className="text-xs text-slate-500">Upload below to scan multiple pages</p>
                  </div>
                </div>
              </div>
              <FileUploader onUploadComplete={async (files) => {
                if (files.length === 0) return;
                setStep(2); 
                try {
                  const file = files[0];
                  const base64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(file);
                  });
                  const res = await fetch('/api/process', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageBase64: base64 })
                  });
                  if (res.ok) {
                    const data = await res.json();
                    setEditorHtml(data.html || "<h1>Processed Document</h1>");
                  }
                } catch (e) {
                  console.error(e);
                  setEditorHtml("<h1>Error Processing File</h1>");
                }
                setStep(3);
              }} />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-6 text-center">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-zinc-800" />
                <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">AI is analyzing your content</h2>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">Extracting text, detecting layout, and applying smart formatting...</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Document Editor</h2>
                <Button onClick={() => setStep(4)} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                  Continue to Export <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <DocumentEditor 
                initialContent={editorHtml} 
                onChange={setEditorHtml} 
              />
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-8 text-center">
              <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Document Ready</h2>
                <p className="text-slate-500 max-w-sm mx-auto">Your document has been processed and is ready for export.</p>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => setIsPreviewOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-slate-200">
                  Preview PDF
                </Button>
                <Button 
                  onClick={async () => {
                    const res = await fetch('/api/generate', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ html: editorHtml, format: 'pdf' })
                    });
                    if (res.ok) {
                      const blob = await res.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'document.pdf';
                      a.click();
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Download PDF
                </Button>
                <Button 
                  variant="outline"
                  onClick={async () => {
                    const res = await fetch('/api/generate', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ html: editorHtml, format: 'docx' })
                    });
                    if (res.ok) {
                      const blob = await res.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'document.docx';
                      a.click();
                    }
                  }}
                >
                  Download DOCX
                </Button>
              </div>
              <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-500">Create Another</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
