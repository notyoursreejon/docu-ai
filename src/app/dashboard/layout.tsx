"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, LayoutTemplate, Plus, Settings, Home, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hidden md:flex flex-col relative">
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-zinc-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">D</div>
            <span className="text-xl font-bold tracking-tight">DocuAI</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="p-4 py-6">
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-zinc-50"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900"
              }`}
            >
              <Home className="h-5 w-5 text-slate-500 dark:text-zinc-400" /> Dashboard
            </Link>
            <Link
              href="/dashboard/create"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors ${
                pathname === "/dashboard/create"
                  ? "bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-zinc-50"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900"
              }`}
            >
              <Plus className="h-5 w-5 text-slate-500 dark:text-zinc-400" /> Create Document
            </Link>
            <Link
              href="/dashboard/templates"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors ${
                pathname === "/dashboard/templates"
                  ? "bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-zinc-50"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900"
              }`}
            >
              <LayoutTemplate className="h-5 w-5 text-slate-500 dark:text-zinc-400" /> Templates
            </Link>
            <Link
              href="/dashboard/documents"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors ${
                pathname === "/dashboard/documents"
                  ? "bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-zinc-50"
                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900"
              }`}
            >
              <FileText className="h-5 w-5 text-slate-500 dark:text-zinc-400" /> My Documents
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-4 border-t border-slate-200 dark:border-zinc-800">
          <nav className="space-y-1">
            <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 font-medium transition-colors">
              <Settings className="h-5 w-5 text-slate-500 dark:text-zinc-400" /> Settings
            </Link>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 font-medium transition-colors">
              <LogOut className="h-5 w-5 text-slate-500 dark:text-zinc-400" /> Sign Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex h-16 items-center border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">D</div>
            <span className="text-xl font-bold tracking-tight">DocuAI</span>
          </div>
        </header>
        <div className="flex-1 p-6 lg:p-10 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
