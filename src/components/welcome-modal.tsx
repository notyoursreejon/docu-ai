"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Building2, GraduationCap, Laptop } from "lucide-react"

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisited = localStorage.getItem("docuai_has_visited")
    if (!hasVisited) {
      setIsOpen(true)
    }
  }, [])

  const handleComplete = () => {
    localStorage.setItem("docuai_has_visited", "true")
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-8 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
        
        <div className="h-32 bg-indigo-600 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000')] bg-cover opacity-20 mix-blend-overlay" />
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-xl border-4 border-indigo-500/30">
            <Sparkles className="h-8 w-8" />
          </div>
        </div>

        <div className="p-8 text-center space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Welcome to DocuAI!</h2>
                <p className="text-slate-500">We're thrilled to have you. Let's personalize your experience to help you get the most out of the platform.</p>
              </div>
              <Button onClick={() => setStep(2)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" size="lg">
                Let's get started
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">How will you use DocuAI?</h2>
                <p className="text-slate-500 text-sm">Select the option that best describes you.</p>
              </div>
              <div className="grid gap-3 text-left">
                {[
                  { id: 'business', icon: Building2, title: 'Business & Enterprise', desc: 'Invoices, contracts, reports' },
                  { id: 'education', icon: GraduationCap, title: 'Student & Educator', desc: 'Essays, study materials, notes' },
                  { id: 'personal', icon: Laptop, title: 'Freelancer & Personal', desc: 'Resumes, cover letters, portfolios' },
                ].map((role) => (
                  <button 
                    key={role.id}
                    onClick={handleComplete}
                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-left"
                  >
                    <role.icon className="h-6 w-6 text-indigo-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-zinc-50">{role.title}</h4>
                      <p className="text-sm text-slate-500">{role.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
