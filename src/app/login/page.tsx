import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center">
            <Link href="/" className="flex justify-center mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xl shadow-lg">D</div>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Welcome back</h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Enter your credentials to access your account</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-950 px-2 text-slate-500">Or continue with</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              GitHub
            </Button>
          </div>
          
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-indigo-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 bg-slate-100 dark:bg-zinc-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5 mix-blend-multiply" />
        <div className="relative z-10 max-w-lg space-y-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-zinc-950 shadow-xl mb-4">
            <FileText className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-zinc-50">Turn text into professional documents.</h2>
          <p className="text-lg text-slate-500 dark:text-zinc-400">
            "DocuAI completely transformed our workflow. We scan hundreds of invoices and convert them to formatted PDFs in seconds."
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-zinc-700" />
            <div className="text-left">
              <p className="text-sm font-semibold">Sarah Jenkins</p>
              <p className="text-xs text-slate-500">Operations Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
