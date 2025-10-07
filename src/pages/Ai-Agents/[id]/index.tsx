"use client";

import { useState } from "react";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronLeft,
  User,
  Phone,
  Upload,
  AlertCircle,
  Settings,
  FileText,
  Zap,
  Rocket,
  PhoneCall,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const miniNavigation = [
  { id: "configure", label: "Configure", icon: Settings },
  { id: "prompt", label: "Prompt", icon: FileText },
  { id: "actions", label: "Actions", icon: Zap },
  { id: "deployment", label: "Deployment", icon: Rocket },
  { id: "calls", label: "Calls", icon: PhoneCall },
];

export default function AgentConfigurePage({
  params,
}: {
  params: { id: string };
}) {
  const [activeSection, setActiveSection] = useState("configure");
  const [agentName, setAgentName] = useState("My Outbound Assistant");

  return (
    <DashboardLayout>
      <div className="flex gap-6">
        <aside className="w-64 shrink-0 space-y-4">
          {/* Back Button */}
          <Link
            to="/ai-agent"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Agents
          </Link>

          {/* Agent Info Card */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-muted">
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">
                    {agentName}
                  </h3>
                  <p className="text-xs text-muted-foreground">Outbound</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  No number · ID:8d...e9d
                </p>
              </div>

              <Button className="w-full" variant="default">
                <Phone className="mr-2 h-4 w-4" />
                Test Agent
              </Button>
            </CardContent>
          </Card>

          {/* Mini Navigation */}
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {miniNavigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      activeSection === item.id
                        ? "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Hire Solutions Partner Card */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 space-y-3">
              <h4 className="font-semibold text-sm">
                Hire a Solutions Partner
              </h4>
              <p className="text-xs text-muted-foreground">
                Hire a certified Synthflow Solutions Partner to help you build
                your AI project.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                Hire Now
              </Button>
            </CardContent>
          </Card>
        </aside>

        <div className="flex-1 space-y-6">
          {/* Warning Alert */}
          <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <AlertDescription className="text-yellow-800 dark:text-yellow-200 flex items-center justify-between">
              <span>
                <strong>Important:</strong> Your agent doesn't have a phone
                number and can't make calls.
              </span>
              <Button
                variant="outline"
                size="sm"
                className="ml-4 bg-transparent"
              >
                Assign number
              </Button>
            </AlertDescription>
          </Alert>

          {/* Configure Section */}
          {activeSection === "configure" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Configure</h1>

              {/* Tabs for General, Voice, Call Configuration */}
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0">
                  <TabsTrigger
                    value="general"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="voice"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
                  >
                    Voice
                  </TabsTrigger>
                  <TabsTrigger
                    value="call-config"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
                  >
                    Call Configuration
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 mt-6">
                  {/* Agent Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="agent-name"
                      className="text-base font-semibold"
                    >
                      Agent Name
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      What name will your agent go by.
                    </p>
                    <Input
                      id="agent-name"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="max-w-xl"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Image</Label>
                    <p className="text-sm text-muted-foreground">
                      An optional image that will be displayed in your agents
                      list.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
                        <User className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Recommended size: 250×250px
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Model */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="ai-model"
                      className="text-base font-semibold"
                    >
                      AI Model
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Opt for speed or depth to suit your agent's role
                    </p>
                    <Select defaultValue="gpt-4o">
                      <SelectTrigger id="ai-model" className="max-w-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">
                          <div className="flex items-center gap-2">
                            <span>GPT-4o</span>
                            <span className="text-xs text-muted-foreground">
                              OpenAI
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">
                          GPT-3.5 Turbo
                        </SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Timezone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="timezone"
                      className="text-base font-semibold"
                    >
                      Timezone
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      The region in which your agent will be
                    </p>
                    <Select defaultValue="europe-berlin">
                      <SelectTrigger id="timezone" className="max-w-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe-berlin">
                          Europe/Berlin
                        </SelectItem>
                        <SelectItem value="america-new-york">
                          America/New York
                        </SelectItem>
                        <SelectItem value="asia-tokyo">Asia/Tokyo</SelectItem>
                        <SelectItem value="australia-sydney">
                          Australia/Sydney
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="link"
                      className="px-0 text-purple-600 hover:text-purple-700"
                    >
                      Change default timezone
                    </Button>
                  </div>

                  {/* Knowledge Base */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Knowledge Base
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Fine-tune the agent to your needs.
                    </p>
                    <Button variant="outline">+ Knowledge Base</Button>
                  </div>

                  {/* Custom Vocabulary */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="vocabulary"
                      className="text-base font-semibold"
                    >
                      Custom Vocabulary
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Add business terms to improve accuracy and recognition.
                    </p>
                    <div className="flex gap-2 max-w-xl">
                      <Input
                        id="vocabulary"
                        placeholder="Start typing to add"
                        className="flex-1"
                      />
                      <Button>Enter</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="voice" className="space-y-6 mt-6">
                  <p className="text-muted-foreground">
                    Voice configuration options will appear here.
                  </p>
                </TabsContent>

                <TabsContent value="call-config" className="space-y-6 mt-6">
                  <p className="text-muted-foreground">
                    Call configuration options will appear here.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Prompt Section */}
          {activeSection === "prompt" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Prompt</h1>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-prompt">System Prompt</Label>
                    <Textarea
                      id="system-prompt"
                      rows={12}
                      defaultValue={`You are a professional outbound sales assistant for Anantix. Your role is to:

1. Greet customers warmly and professionally
2. Understand their needs and pain points
3. Explain how Anantix can solve their problems
4. Answer questions about features, pricing, and implementation
5. Schedule demos or follow-up calls when appropriate

Always be helpful, concise, and focus on providing value to the customer.`}
                    />
                  </div>
                  <Button>Save Prompt</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Actions Section */}
          {activeSection === "actions" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Actions</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Configure agent actions and workflows here.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Deployment Section */}
          {activeSection === "deployment" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Deployment</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Deployment settings and API credentials will appear here.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Calls Section */}
          {activeSection === "calls" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Calls</h1>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    Call history and analytics will appear here.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
