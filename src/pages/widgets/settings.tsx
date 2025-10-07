import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function WidgetSettingsPage() {
  return (
    // <Layout>
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Widget Settings</h1>
          <p className="text-muted-foreground">
            Configure your web widget appearance and behavior
          </p>
        </div>

        <div className="grid gap-6">
          {/* Widget Appearance */}
          <Card>
            <CardHeader>
              <CardTitle>Widget Appearance</CardTitle>
              <CardDescription>
                Customize how your widget looks on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="widget-name">Widget Name</Label>
                  <Input id="widget-name" placeholder="Support Chat" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="widget-position">Position</Label>
                  <Select defaultValue="bottom-right">
                    <SelectTrigger id="widget-position">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      defaultValue="#0ea5e9"
                      className="w-20"
                    />
                    <Input value="#0ea5e9" readOnly />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="greeting">Greeting Message</Label>
                <Textarea
                  id="greeting"
                  placeholder="Hi! How can I help you today?"
                  rows={3}
                />
              </div>
              <Button>Save Appearance</Button>
            </CardContent>
          </Card>

          {/* Widget Behavior */}
          <Card>
            <CardHeader>
              <CardTitle>Widget Behavior</CardTitle>
              <CardDescription>
                Control when and how your widget appears
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-open Widget</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically open widget when page loads
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show on Mobile</Label>
                  <p className="text-sm text-muted-foreground">
                    Display widget on mobile devices
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Proactive Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Send messages to visitors after inactivity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="delay">Auto-open Delay (seconds)</Label>
                <Input
                  id="delay"
                  type="number"
                  defaultValue="5"
                  min="0"
                  max="60"
                />
              </div>
            </CardContent>
          </Card>

          {/* Widget Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Widget Integration</CardTitle>
              <CardDescription>
                Embed your widget on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="widget-id">Widget ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="widget-id"
                    value="widget_1234567890abcdef"
                    readOnly
                  />
                  <Button variant="outline">Copy</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="embed-code">Embed Code</Label>
                <Textarea
                  id="embed-code"
                  value={`<script src="https://widget.example.com/embed.js" data-widget-id="widget_1234567890abcdef"></script>`}
                  readOnly
                  rows={3}
                />
                <Button variant="outline" className="w-full bg-transparent">
                  Copy Embed Code
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure widget notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email alerts for new conversations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Conversation Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when visitors start conversations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Offline Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive messages when widget is offline
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your widget API access keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type="password"
                    value="sk_widget_1234567890abcdef"
                    readOnly
                  />
                  <Button variant="outline">Copy</Button>
                </div>
              </div>
              <Button variant="destructive">Regenerate Key</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
