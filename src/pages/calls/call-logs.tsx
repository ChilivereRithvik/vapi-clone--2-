"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Download,
  Copy,
  ArrowUpRight,
  Bell,
  FilterIcon,
  Plus,
  X,
  Phone,
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  SkipBack,
  SkipForward,
  Pause,
  MoveHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockCallLogs = [
  {
    id: "69013b...",
    callId: "69013b...",
    direction: "outbound",
    to: "080088 28022",
    from: "(412) 385-6124",
    duration: "1m 59s",
    durationPercent: 33,
    issues: null,
    created: "9/1/2025 (11:57 AM)",
    status: "Completed",
    pathway: null,
    tags: null,
    transferredTo: null,
    batchId: null,
    reviewStatus: "Completed",
    recording: "https://example.com/recording1.mp3",
  },
  {
    id: "3220cb...",
    callId: "3220cb...",
    direction: "outbound",
    to: "080088 28022",
    from: "(570) 532-5131",
    duration: "6m 12s",
    durationPercent: 62,
    issues: null,
    created: "9/1/2025 (11:29 AM)",
    status: "Completed",
    pathway: null,
    tags: null,
    transferredTo: null,
    batchId: null,
    reviewStatus: "Completed",
    recording: "https://example.com/recording2.mp3",
  },
];

const mockTranscript = [
  {
    speaker: "Bland",
    message: "Hello, thank you for calling. How can I assist you today?",
    type: "agent",
  },
  {
    speaker: "User",
    message: "What is your name?",
    type: "user",
  },
  {
    speaker: "Bland",
    message:
      "My name is Karen, and I'll be happy to help you with any questions or concerns you may have. How can I assist you today?",
    type: "agent",
  },
];

const ITEMS_PER_PAGE = 5;

export default function CallLogsPage() {
  const [selectedLog, setSelectedLog] = useState<
    (typeof mockCallLogs)[0] | null
  >(null);
  const [activeTab, setActiveTab] = useState("completed");
  const [leftTab, setLeftTab] = useState("summary");
  const [rightTab, setRightTab] = useState("transcript");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showHuman, setShowHuman] = useState(true);
  const [showAssistant, setShowAssistant] = useState(true);
  const [sheetWidth, setSheetWidth] = useState<"medium" | "large" | "full">(
    "large"
  );
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockCallLogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedLogs = mockCallLogs.slice(startIndex, endIndex);

  const getSheetWidthClass = () => {
    switch (sheetWidth) {
      case "medium":
        return "sm:max-w-[80vw]";
      case "large":
        return "sm:max-w-[90vw]";
      case "full":
        return "sm:max-w-[98vw]";
      default:
        return "sm:max-w-[90vw]";
    }
  };

  const toggleSheetWidth = () => {
    setSheetWidth((prev) => {
      if (prev === "medium") return "large";
      if (prev === "large") return "full";
      return "medium";
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Call Logs</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Export Calls
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "completed" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("completed")}
            className="gap-2"
          >
            <FilterIcon className="h-4 w-4" />
            COMPLETED{" "}
            <Badge variant="secondary" className="ml-1">
              2
            </Badge>
          </Button>
          <Button
            variant={activeTab === "active" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("active")}
          >
            ACTIVE
          </Button>
        </div>

        <div className="space-y-4 rounded-lg border bg-card p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="to">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to">To</SelectItem>
                <SelectItem value="from">From</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="equals">
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">=</SelectItem>
                <SelectItem value="notEquals">!=</SelectItem>
                <SelectItem value="contains">contains</SelectItem>
                <SelectItem value="startsWith">starts with</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1 rounded-md border px-3 py-2">
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India"
                className="h-4 w-6"
              />
              <span className="text-sm">+91</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>

            <Input defaultValue="80088-28022" className="w-[200px]" />

            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                <FilterIcon className="mr-2 h-4 w-4" />
                Load Filters
              </Button>
              <Button variant="outline" size="sm">
                <FilterIcon className="mr-2 h-4 w-4" />
                Save Filters
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button variant="ghost" size="sm">
                Apply all
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add filter
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">RECORDING</TableHead>
                  <TableHead className="w-[120px]">CALL ID</TableHead>
                  <TableHead className="w-[80px]">IN/OUT</TableHead>
                  <TableHead className="w-[140px]">TO</TableHead>
                  <TableHead className="w-[140px]">FROM</TableHead>
                  <TableHead className="w-[140px]">DURATION</TableHead>
                  <TableHead className="w-[100px]">ISSUES</TableHead>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center gap-1">
                      CREATED
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]">STATUS</TableHead>
                  <TableHead className="w-[100px]">PATHWAY</TableHead>
                  <TableHead className="w-[100px]">TAGS</TableHead>
                  <TableHead className="w-[140px]">TRANSFERRED TO</TableHead>
                  <TableHead className="w-[120px]">BATCH ID</TableHead>
                  <TableHead className="w-[140px]">REVIEW STATUS</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{log.callId}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ArrowUpRight className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="font-medium">{log.to}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {log.from}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full bg-foreground"
                              style={{ width: `${log.durationPercent}%` }}
                            />
                          </div>
                          <span className="text-sm">{log.duration}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      -
                    </TableCell>
                    <TableCell className="text-sm">{log.created}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-green-600" />
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      -
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      -
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      -
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      -
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-green-600" />
                        {log.reviewStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setSelectedLog(log)}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* Call Logs Table with inline filters */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters inline with table */}
            <div className="mb-4 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Copy className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by phone number..."
                  className="pl-9"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="sales">Sales Agent</SelectItem>
                  <SelectItem value="support">Support Agent</SelectItem>
                  <SelectItem value="technical">Technical Agent</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <FilterIcon className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>

            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.id}</TableCell>
                      <TableCell>{log.to}</TableCell>
                      <TableCell>{log.duration}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.status === "Completed"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.created}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            {totalPages > 1 && (
              <div className="mt-4">{/* Pagination component goes here */}</div>
            )}
          </CardContent>
        </Card>

        <Sheet open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <SheetContent className={cn("w-full p-0", getSheetWidthClass())}>
            <div className="absolute right-14 top-4 z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSheetWidth}
                title="Adjust sheet width"
                className="h-8 w-8 bg-transparent"
              >
                <MoveHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex h-screen">
              <div className="flex w-full flex-col border-r border-border bg-muted/30 lg:w-[560px]">
                <ScrollArea className="flex-1">
                  <div className="p-6">
                    {/* Avatar and header */}
                    <div className="mb-6 space-y-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                        <span className="text-3xl font-bold text-white">K</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground"
                          >
                            <Copy className="mr-1 h-3 w-3" />
                            Copy Link
                          </Button>
                          <span className="text-lg font-bold">
                            +15705325131
                          </span>
                          <span className="font-mono text-sm text-muted-foreground">
                            {selectedLog?.callId}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          className="h-auto p-0 text-sm text-muted-foreground"
                        >
                          <ChevronLeft className="mr-1 h-4 w-4" />
                          Previous Calls
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Call details */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">From</span>
                        <span className="font-medium">+15705325131</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">To</span>
                        <span className="font-medium">+918008828022</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Created At
                        </span>
                        <span className="font-medium">
                          September 1, 2025 At 11:29 AM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Call Duration
                        </span>
                        <span className="font-medium">6m 12s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Call Type</span>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-blue-600"
                        >
                          Outgoing <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cost</span>
                        <span className="font-medium">$0.56</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Answered By
                        </span>
                        <span className="font-medium">Human</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ended By</span>
                        <span className="font-medium">ASSISTANT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium">Completed</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Voice</span>
                        <div className="flex items-center gap-2">
                          <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-600">
                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Public - June283a428d-2d77-4832-A3a1-01ce3d594a8e
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Review Assignee
                        </span>
                        <Select>
                          <SelectTrigger className="h-8 w-[140px]">
                            <SelectValue placeholder="Assign" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user1">User 1</SelectItem>
                            <SelectItem value="user2">User 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Review Status
                        </span>
                        <Select>
                          <SelectTrigger className="h-8 w-[200px]">
                            <SelectValue placeholder="No Review Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <span className="mb-2 block text-muted-foreground">
                          Review Tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="cursor-pointer border-green-600 bg-green-50 text-green-700"
                          >
                            Successful
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer">
                            Technical Issue
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer">
                            Wrong Number
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer">
                            No Answer
                          </Badge>
                          <Badge variant="outline" className="cursor-pointer">
                            Needs Review
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Bottom tabs */}
                    <Tabs value={leftTab} onValueChange={setLeftTab}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="sentiment" className="text-xs">
                          Sentiment
                        </TabsTrigger>
                        <TabsTrigger value="variables" className="text-xs">
                          Variables
                        </TabsTrigger>
                        <TabsTrigger value="request" className="text-xs">
                          Request Data
                        </TabsTrigger>
                        <TabsTrigger value="summary" className="text-xs">
                          Summary
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="summary" className="mt-4">
                        <div className="rounded-lg bg-muted/50 p-4">
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            The user called Bland to inquire about the company's
                            services, which involve using AI to automate phone
                            calls for businesses. The assistant explained that
                            Bland helps with outreach, customer service, or
                            scheduling—all with natural, human-like
                            conversations. Does that sound like something you're
                            exploring?
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="sentiment">
                        <p className="text-sm text-muted-foreground">
                          Sentiment analysis will be displayed here.
                        </p>
                      </TabsContent>
                      <TabsContent value="variables">
                        <p className="text-sm text-muted-foreground">
                          Variables will be displayed here.
                        </p>
                      </TabsContent>
                      <TabsContent value="request">
                        <p className="text-sm text-muted-foreground">
                          Request data will be displayed here.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </div>
                </ScrollArea>

                <div className="border-t border-border bg-background p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <div className="ml-2 flex gap-1">
                      <Button
                        variant={playbackSpeed === 1 ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setPlaybackSpeed(1)}
                      >
                        1x
                      </Button>
                      <Button
                        variant={playbackSpeed === 1.5 ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setPlaybackSpeed(1.5)}
                      >
                        1.5x
                      </Button>
                      <Button
                        variant={playbackSpeed === 2 ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => setPlaybackSpeed(2)}
                      >
                        2x
                      </Button>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <Button
                        variant={showHuman ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-3 text-xs"
                        onClick={() => setShowHuman(!showHuman)}
                      >
                        Human
                      </Button>
                      <Button
                        variant={showAssistant ? "secondary" : "ghost"}
                        size="sm"
                        className="h-7 px-3 text-xs"
                        onClick={() => setShowAssistant(!showAssistant)}
                      >
                        Assistant
                      </Button>
                    </div>
                  </div>

                  {/* Waveform visualization */}
                  <div className="relative mb-2 h-16 w-full overflow-hidden rounded-lg bg-muted/50">
                    <div className="flex h-full items-end justify-around gap-[1px] px-1">
                      {Array.from({ length: 200 }).map((_, i) => {
                        const height = Math.random() * 100;
                        const colors = [
                          "bg-blue-400",
                          "bg-green-400",
                          "bg-purple-400",
                          "bg-pink-400",
                        ];
                        const color =
                          colors[Math.floor(Math.random() * colors.length)];
                        return (
                          <div
                            key={i}
                            className={cn("w-[2px] rounded-t", color)}
                            style={{ height: `${height}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Button
                      variant="link"
                      className="h-auto p-0 text-xs text-purple-600"
                    >
                      Download
                    </Button>
                    <span>0:00 / 6:10</span>
                    <div className="flex items-center gap-2">
                      <span>Autoplay Recordings</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden flex-1 flex-col bg-background lg:flex">
                <div className="border-b border-border p-4">
                  <Tabs
                    value={rightTab}
                    onValueChange={setRightTab}
                    className="w-full"
                  >
                    <div className="flex items-center justify-between">
                      <TabsList>
                        <TabsTrigger value="transcript">Transcript</TabsTrigger>
                        <TabsTrigger value="metrics">Metrics</TabsTrigger>
                        <TabsTrigger value="webhook">
                          Post Call Webhook
                        </TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                      </TabsList>
                    </div>
                  </Tabs>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6">
                    <Tabs value={rightTab} className="w-full">
                      <TabsContent
                        value="transcript"
                        className="mt-0 space-y-6"
                      >
                        {/* Transcript messages */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-700"
                            >
                              Bland
                            </Badge>
                          </div>
                          <div className="rounded-lg bg-blue-50 p-4">
                            <p className="text-sm leading-relaxed text-gray-700">
                              Hello and welcome to Bland. How's your day going
                              so far?
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pl-4">
                          <p className="text-sm text-gray-700">Hello?</p>
                        </div>

                        <div className="pl-4">
                          <p className="text-sm text-gray-700">It's great.</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-700"
                            >
                              Bland
                            </Badge>
                          </div>
                          <div className="rounded-lg bg-blue-50 p-4">
                            <p className="text-sm leading-relaxed text-gray-700">
                              That's awesome to hear. What brings you to Bland
                              today?
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pl-4">
                          <p className="text-sm text-gray-700">
                            I just wanted to know what Bland exactly does.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-700"
                            >
                              Bland
                            </Badge>
                          </div>
                          <div className="rounded-lg bg-blue-50 p-4">
                            <p className="text-sm leading-relaxed text-gray-700">
                              Sure, happy to help. Bland is a platform that
                              helps businesses automate phone calls using AI.
                              It's great for outreach, customer service, or
                              scheduling—all with natural, human-like
                              conversations. Does that sound like something
                              you're exploring?
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pl-4">
                          <p className="text-sm text-gray-700">
                            Yeah, that sounds interesting.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-700"
                            >
                              Bland
                            </Badge>
                          </div>
                          <div className="rounded-lg bg-blue-50 p-4">
                            <p className="text-sm leading-relaxed text-gray-700">
                              Glad -
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pl-4">
                          <p className="text-sm text-gray-700">
                            I also want to know some real-case use cases
                          </p>
                        </div>

                        <div className="pl-4">
                          <p className="text-sm text-gray-700">
                            About how land helps
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-700"
                            >
                              Bland
                            </Badge>
                          </div>
                          <div className="rounded-lg bg-blue-50 p-4">
                            <p className="text-sm leading-relaxed text-gray-700">
                              Oh, got it. So Bland helps by making outbound
                              calls at scale—like sales outreach or customer
                              check-ins—using AI that sounds natural. It can
                              answer questions, take bookings, or even handle
                              support, all without human intervention. Would you
                              like an example in a specific industry?
                            </p>
                            <div className="mt-2 flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="metrics">
                        <p className="text-sm text-muted-foreground">
                          Call metrics will be displayed here.
                        </p>
                      </TabsContent>
                      <TabsContent value="webhook">
                        <p className="text-sm text-muted-foreground">
                          Post call webhook data will be displayed here.
                        </p>
                      </TabsContent>
                      <TabsContent value="notes">
                        <p className="text-sm text-muted-foreground">
                          Notes will be displayed here.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
