import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy } from "lucide-react"

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Project Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Name</CardTitle>
          <CardDescription>
            Used to identify your Project on the Dashboard, Vercel CLI, and in the URL of your Deployments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center rounded-md border border-border">
              <span className="border-r border-border bg-secondary px-3 py-2 text-sm text-muted-foreground">
                vercel.com/vercel/
              </span>
              <Input className="flex-1 border-0 focus-visible:ring-0" defaultValue="v0" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Learn more about Project Name
            </Link>
          </div>
          <Button>Save</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project ID</CardTitle>
          <CardDescription>Used when interacting with the Vercel API.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input className="flex-1 font-mono text-sm" defaultValue="prj_NWqnH5Gzi9M7jSxcIiFouWSJTwtF" readOnly />
            <Button variant="outline" size="icon" className="bg-transparent">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Learn more about Project ID
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vercel Toolbar</CardTitle>
          <CardDescription>Enable the Vercel Toolbar on your Deployments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium">Pre-Production Deployments</Label>
              <select className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option>Default (controlled at the team level)</option>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium">Production Deployments</Label>
              <select className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option>Default (controlled at the team level)</option>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <div className="flex gap-3">
              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <div className="flex-1 text-sm">
                <p className="text-foreground">
                  To use the toolbar in production your team members need the{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Chrome extension
                  </Link>{" "}
                  or to enable the toolbar for that domain in the toolbar menu. Learn more about using the{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    toolbar in production
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Project</CardTitle>
          <CardDescription>
            The project will be permanently deleted, including its deployments and domains. This action is irreversible
            and can not be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete Project</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
