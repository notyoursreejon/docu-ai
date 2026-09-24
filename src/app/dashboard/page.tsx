import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileImage, FileText, Image as ImageIcon, LayoutTemplate, Plus } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { WelcomeModal } from "@/components/welcome-modal"

export default async function DashboardPage() {
  // Fetch from database (assuming user ID is 'user1' for demo purposes)
  // In a real app, we would get this from NextAuth session
  const documents = await prisma.document.findMany({
    where: { userId: 'user1' }, // Dummy filter
    orderBy: { updatedAt: 'desc' },
    take: 5
  }).catch(() => []) // Catch error if DB isn't pushed yet

  const totalDocs = documents.length
  
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <WelcomeModal />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Welcome back</h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">Here's an overview of your documents and recent activity.</p>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <Link href="/dashboard/create"><Plus className="h-4 w-4" /> New Document</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Documents", value: totalDocs.toString(), desc: "In your account" },
          { title: "PDF Exports", value: "-", desc: "Coming soon" },
          { title: "DOCX Exports", value: "-", desc: "Coming soon" },
          { title: "Storage Used", value: "0 MB", desc: "of 1 GB limit" },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-zinc-50">{stat.value}</div>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                {stat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Create Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-zinc-50">Create New</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/dashboard/create">
            <Card className="hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-colors shadow-sm h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-slate-900 dark:text-zinc-50">Paste Text</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Convert plain text</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/create">
            <Card className="hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-colors shadow-sm h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <FileImage className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-slate-900 dark:text-zinc-50">Upload Image</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Extract via OCR</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/create">
            <Card className="hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-colors shadow-sm h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-slate-900 dark:text-zinc-50">Batch Images</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Scan multiple pages</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/templates">
            <Card className="hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-colors shadow-sm h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-slate-900 dark:text-zinc-50">Use Template</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Start from a design</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Documents */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-zinc-50">Recent Documents</h2>
        <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-0">
            {documents.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-zinc-400 flex flex-col items-center">
                <FileText className="h-10 w-10 mb-4 opacity-50" />
                <p>No documents yet.</p>
                <Button variant="link" asChild className="text-indigo-600">
                  <Link href="/dashboard/create">Create your first document</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-slate-200 dark:divide-zinc-800">
                {documents.map((doc: any, i: number) => (
                  <div key={doc.id || i} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-slate-900 dark:text-zinc-50">{doc.title}</p>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">Updated {new Date(doc.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-500">Open</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
