import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, FileImage, LayoutTemplate, MessageSquare, ShieldCheck, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">D</div>
            <span className="text-xl font-bold tracking-tight">DocuAI</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</Link>
            <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block">Sign In</Link>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-48 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white dark:from-indigo-900/20 dark:via-zinc-950 dark:to-zinc-950 -z-10" />
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-10">
            <div className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-800/30 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 text-sm font-medium text-indigo-800 dark:text-indigo-300">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
              DocuAI 1.0 is now live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter max-w-4xl leading-tight">
              Turn Text & Images Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Professional Documents</span> With AI.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Create polished PDF and Word documents from your text, images, and scanned pages in seconds. Let our AI handle the formatting, OCR, and structuring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white gap-2 group">
                Create Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base border-slate-300 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800">
                See How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="w-full py-24 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to create perfect documents</h2>
              <p className="text-slate-600 dark:text-zinc-400 text-lg max-w-2xl">Stop fighting with formatting. Our AI understands your content and structures it beautifully.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { icon: FileImage, title: "AI OCR", desc: "Extract text from images, receipts, and handwritten notes with pristine accuracy." },
                { icon: Zap, title: "Smart Formatting", desc: "AI automatically detects headings, paragraphs, lists, and tables to structure messy text." },
                { icon: FileText, title: "PDF & Word Generator", desc: "Export flawless, print-ready PDFs and editable DOCX files in a single click." },
                { icon: LayoutTemplate, title: "Document Templates", desc: "Access professional templates for resumes, invoices, reports, and meeting notes." },
                { icon: MessageSquare, title: "AI Assistant", desc: "Ask the built-in AI to summarize, rewrite, or extract key information from your documents." },
                { icon: ShieldCheck, title: "Secure & Private", desc: "Your documents are processed securely. We don't train our models on your private data." }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="w-full py-32 bg-indigo-600 dark:bg-indigo-900">
          <div className="container mx-auto px-4 md:px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Create your first document in minutes.</h2>
            <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">Join thousands of professionals saving hours on document formatting and data extraction.</p>
            <Button size="lg" className="rounded-full h-14 px-10 text-lg bg-white text-indigo-600 hover:bg-slate-50 border-0 shadow-lg">
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white font-bold text-xs">D</div>
            <span className="text-lg font-bold tracking-tight">DocuAI</span>
          </div>
          <p className="text-slate-500 dark:text-zinc-500 text-sm">© 2026 DocuAI Inc. All rights reserved.</p>
          <div className="flex gap-4 text-sm font-medium text-slate-600 dark:text-zinc-400">
            <Link href="#" className="hover:text-indigo-600">Privacy</Link>
            <Link href="#" className="hover:text-indigo-600">Terms</Link>
            <Link href="#" className="hover:text-indigo-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
