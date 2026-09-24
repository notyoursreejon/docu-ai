import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileImage } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex flex-row-reverse">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center">
            <Link href="/" className="flex justify-center mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xl shadow-lg">D</div>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Create an account</h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Start transforming your documents today</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
              <Link href="/dashboard">Create Account</Link>
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
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-1 bg-indigo-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="relative z-10 max-w-lg space-y-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-800 shadow-xl mb-4 border border-indigo-700">
            <FileImage className="h-8 w-8 text-indigo-200" />
          </div>
          <h2 className="text-3xl font-bold text-white">Extract data from images instantly.</h2>
          <p className="text-lg text-indigo-200">
            Join thousands of professionals who save hours every week using our state-of-the-art OCR and AI formatting engine.
          </p>
        </div>
      </div>
    </div>
  )
}
