import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutTemplate, Briefcase, FileText, FileSpreadsheet } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    title: "Blank Document",
    description: "Start from scratch with a clean slate.",
    icon: FileText,
    href: "/dashboard/create?template=blank"
  },
  {
    title: "Business Invoice",
    description: "Professional invoice layout with tables and totals.",
    icon: FileSpreadsheet,
    href: "/dashboard/create?template=invoice"
  },
  {
    title: "Project Proposal",
    description: "Structured proposal with executive summary and timeline.",
    icon: Briefcase,
    href: "/dashboard/create?template=proposal"
  },
  {
    title: "Meeting Notes",
    description: "Agenda, attendees, and action items formatting.",
    icon: LayoutTemplate,
    href: "/dashboard/create?template=meeting"
  }
];

export default function TemplatesPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Document Templates</h1>
        <p className="text-slate-500 dark:text-zinc-400 mt-1">Start your next document with a professionally designed layout.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, i) => (
          <Card key={i} className="hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors shadow-sm group">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <template.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-zinc-50 mb-2">{template.title}</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">{template.description}</p>
              <Button asChild className="w-full bg-slate-900 dark:bg-zinc-50 hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900">
                <Link href={template.href}>Use Template</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
