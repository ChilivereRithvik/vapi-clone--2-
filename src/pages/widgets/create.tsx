"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Plus, Trash2, MoreVertical, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function CreateWidgetPage() {
  const navigate = useNavigate();
  const [domains, setDomains] = useState<string[]>([]);
  const [domainInput, setDomainInput] = useState("");
  const [headerContent, setHeaderContent] = useState("Chat Support");
  const [hideFooter, setHideFooter] = useState(false);
  const [userMessageColor, setUserMessageColor] = useState("#000000");
  const [buttonColor, setButtonColor] = useState("#000000");
  const [widgetSaved, setWidgetSaved] = useState(false);

  const addDomain = () => {
    if (domainInput.trim()) {
      setDomains([...domains, domainInput.trim()]);
      setDomainInput("");
    }
  };

  const removeDomain = (index: number) => {
    setDomains(domains.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setWidgetSaved(true);
    // Handle widget save
  };

  const embedCode = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['AnantixWidget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
  }(window, document, 'script', 'anantix', 'https://cdn.anantix.ai/widget.js'));
  anantix('init', { widgetId: 'YOUR_WIDGET_ID' });
</script>`;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Web Widget</h1>
          <Button
            variant="default"
            className="bg-black text-white hover:bg-black/90"
          >
            View Widget Logs
          </Button>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0">
            <TabsTrigger
              value="settings"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
            >
              SETTINGS
            </TabsTrigger>
            <TabsTrigger
              value="dimensions"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
            >
              DIMENSIONS
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
            >
              CUSTOM COMPONENTS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel - Settings Form */}
              <div className="space-y-6">
                {/* Code Snippet */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Code Snippet</h3>
                  <p className="text-sm text-muted-foreground">
                    Copy the code snippet below to and add it to the header of
                    your website.
                  </p>
                  <div className="relative">
                    <div className="bg-black rounded-lg p-6 text-white">
                      {!widgetSaved ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <div className="mb-2">🔒</div>
                          <div className="font-semibold mb-1">
                            Widget Not Saved
                          </div>
                          <div className="text-sm text-gray-400">
                            Save your widget configuration to get the embed code
                          </div>
                        </div>
                      ) : (
                        <pre className="text-xs overflow-x-auto">
                          <code>{embedCode}</code>
                        </pre>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute right-4 top-4 bg-white"
                      disabled={!widgetSaved}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </Button>
                  </div>
                </div>

                {/* Allowed Domains */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    Allowed Domains
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Only the selected domains will be able to connect to this
                    widget
                  </p>
                  <div className="space-y-2">
                    {domains.map((domain, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={domain} readOnly className="flex-1" />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeDomain(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Enter a value"
                        value={domainInput}
                        onChange={(e) => setDomainInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addDomain()}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addDomain}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Domain
                    </Button>
                  </div>
                </div>

                {/* Pathway and Voice */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Pathway</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Search a pathway" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Support Pathway</SelectItem>
                        <SelectItem value="sales">Sales Pathway</SelectItem>
                        <SelectItem value="general">General Pathway</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Voice</Label>
                    <Select defaultValue="june">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="june">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-500" />
                            June
                          </div>
                        </SelectItem>
                        <SelectItem value="alex">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-blue-500" />
                            Alex
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Widget Icon */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Widget Icon</Label>
                  <Input placeholder="Enter icon URL" />
                  <p className="text-sm text-muted-foreground">
                    Leave empty to use default icon
                  </p>
                </div>

                {/* Header Content */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    Header content
                  </Label>
                  <Input
                    placeholder="Chat Support"
                    value={headerContent}
                    onChange={(e) => setHeaderContent(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Either text, or a URL to display an image
                  </p>
                </div>

                {/* Hide Footer */}
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Hide Footer</Label>
                  <Switch
                    checked={hideFooter}
                    onCheckedChange={setHideFooter}
                  />
                </div>

                {/* Colors */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Colors</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={userMessageColor}
                        onChange={(e) => setUserMessageColor(e.target.value)}
                        className="h-8 w-8 rounded border cursor-pointer"
                      />
                      <span className="text-sm">User Message Color</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={buttonColor}
                        onChange={(e) => setButtonColor(e.target.value)}
                        className="h-8 w-8 rounded border cursor-pointer"
                      />
                      <span className="text-sm">Button Color</span>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save widget
                </Button>
              </div>

              {/* Right Panel - Live Preview */}
              <div className="lg:sticky lg:top-6 h-fit">
                <div className="border rounded-lg shadow-lg bg-white overflow-hidden max-w-sm ml-auto">
                  {/* Widget Header */}
                  <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
                    <span className="font-semibold">{headerContent}</span>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[400px] bg-gray-50">
                    <div className="flex justify-start">
                      <div className="bg-gray-200 rounded-lg px-4 py-2 max-w-[80%]">
                        <p className="text-sm">Hi! How can I help you?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div
                        className="rounded-lg px-4 py-2 max-w-[80%] text-white"
                        style={{ backgroundColor: buttonColor }}
                      >
                        <p className="text-sm">Hello</p>
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="border-t bg-white p-4">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type your message..."
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        style={{ backgroundColor: buttonColor }}
                        className="text-white"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Footer */}
                  {!hideFooter && (
                    <div className="bg-gray-100 px-4 py-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Powered By Bland.ai
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dimensions">
            <div className="text-center py-12 text-muted-foreground">
              Dimensions settings coming soon...
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <div className="text-center py-12 text-muted-foreground">
              Custom components coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
