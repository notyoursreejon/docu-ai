"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, File, X, Image as ImageIcon } from 'lucide-react'
import { Button } from './ui/button'

export function FileUploader({ onUploadComplete }: { onUploadComplete: (files: File[]) => void }) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'text/plain': []
    }
  })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full space-y-6">
      <div 
        {...getRootProps()} 
        className={`p-12 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10' : 'border-slate-300 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-600'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-500 flex items-center justify-center">
            <UploadCloud className="h-8 w-8" />
          </div>
          <div>
            <p className="text-lg font-medium text-slate-900 dark:text-zinc-50">
              Drag & drop files here, or click to select
            </p>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Supports JPG, PNG, WEBP, and TXT files
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Selected Files ({files.length})</h3>
          <div className="grid sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950">
                <div className="flex items-center gap-3 overflow-hidden">
                  {file.type.includes('image') ? <ImageIcon className="h-5 w-5 text-indigo-500 shrink-0" /> : <File className="h-5 w-5 text-indigo-500 shrink-0" />}
                  <span className="text-sm font-medium truncate">{file.name}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeFile(idx); }} className="text-slate-400 hover:text-red-500 shrink-0 ml-2">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={(e) => { e.stopPropagation(); onUploadComplete(files); }} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Process {files.length} {files.length === 1 ? 'File' : 'Files'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
