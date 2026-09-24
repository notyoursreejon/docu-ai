import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CreditCard, Activity } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">System Overview</h1>
        <p className="text-slate-500 dark:text-zinc-400 mt-1">Real-time platform metrics and health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-zinc-400">Total Users</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,482</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +180 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-zinc-400">Documents Processed</CardTitle>
            <FileText className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +42K this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-zinc-400">Pro Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,834</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              $42.5k MRR
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-zinc-400">System Health</CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">99.9%</div>
            <p className="text-xs text-slate-500 mt-1">
              OCR API: Operational
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center text-xs font-bold">
                      U{i}
                    </div>
                    <div>
                      <p className="text-sm font-medium">user{i}@example.com</p>
                      <p className="text-xs text-slate-500">Just now</p>
                    </div>
                  </div>
                  <div className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">Active</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
          <CardHeader>
            <CardTitle>Server Load</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[250px] text-slate-500">
            [Chart Area: OCR CPU Usage Over Time]
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
