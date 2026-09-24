import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, CreditCard, User } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Settings</h1>
        <p className="text-slate-500 dark:text-zinc-400 mt-1">Manage your account settings and subscription.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing & Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john@example.com" disabled />
                <p className="text-xs text-slate-500">Email is managed by your authentication provider.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card className="border-slate-200 dark:border-zinc-800 shadow-sm border-indigo-500/50 dark:border-indigo-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Current Plan</div>
            <CardHeader>
              <CardTitle>Free Tier</CardTitle>
              <CardDescription>You are currently on the free tier.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Documents Used</span>
                  <span>3 / 10</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[30%]" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 dark:bg-zinc-900/50 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-center">
              <span className="text-sm text-slate-500">Upgrade to Pro for unlimited documents.</span>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 border-0">
                Upgrade to Pro
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-slate-200 dark:border-zinc-800 shadow-sm">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved credit cards.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-zinc-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-14 bg-slate-100 dark:bg-zinc-900 rounded flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-slate-500">Expires 12/2028</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
