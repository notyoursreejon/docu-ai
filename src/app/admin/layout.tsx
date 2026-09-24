import Link from "next/link"
import { Activity, Users, FileText, Settings, ShieldAlert, ArrowLeft } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950">
      <aside className="w-64 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hidden md:flex flex-col">
        <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-500">
            <ShieldAlert className="h-6 w-6" />
            <span className="text-lg font-bold tracking-tight">Admin Console</span>
          </div>
        </div>
        <div className="p-4 py-6 flex-1">
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 rounded-lg bg-red-50 dark:bg-red-900/10 px-3 py-2 text-red-600 dark:text-red-400 font-medium">
              <Activity className="h-4 w-4" /> Overview
            </Link>
            <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900">
              <Users className="h-4 w-4" /> Users
            </Link>
            <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900">
              <FileText className="h-4 w-4" /> System Logs
            </Link>
            <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900">
              <Settings className="h-4 w-4" /> Configuration
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900">
            <ArrowLeft className="h-4 w-4" /> Exit to App
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
