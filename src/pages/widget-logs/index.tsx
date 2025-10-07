"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Eye, TrendingUp, MessageSquare, ThumbsUp } from "lucide-react"

const mockWidgetLogs = [
  {
    id: 1,
    user: "user@example.com",
    agent: "General Agent",
    messages: 12,
    satisfaction: "Positive",
    duration: "4:32",
    date: "2024-01-15 11:20 AM",
    summary: "User inquired about product features and pricing",
  },
  {
    id: 2,
    user: "customer@company.com",
    agent: "Support Agent",
    messages: 8,
    satisfaction: "Positive",
    duration: "3:15",
    date: "2024-01-15 10:45 AM",
    summary: "Technical support for API integration",
  },
  {
    id: 3,
    user: "john@startup.io",
    agent: "Sales Agent",
    messages: 15,
    satisfaction: "Neutral",
    duration: "6:20",
    date: "2024-01-15 09:30 AM",
    summary: "Discussed enterprise plan options",
  },
  {
    id: 4,
    user: "sarah@tech.com",
    agent: "General Agent",
    messages: 10,
    satisfaction: "Positive",
    duration: "5:10",
    date: "2024-01-14 04:15 PM",
    summary: "General product inquiry and demo request",
  },
  {
    id: 5,
    user: "mike@business.io",
    agent: "Support Agent",
    messages: 6,
    satisfaction: "Neutral",
    duration: "2:45",
    date: "2024-01-14 02:30 PM",
    summary: "Account setup assistance",
  },
  {
    id: 6,
    user: "lisa@company.com",
    agent: "Sales Agent",
    messages: 18,
    satisfaction: "Positive",
    duration: "7:20",
    date: "2024-01-14 11:00 AM",
    summary: "Enterprise pricing discussion",
  },
]

const ITEMS_PER_PAGE = 5

export default function WidgetLogsPage() {
  const [selectedLog, setSelectedLog] = useState<(typeof mockWidgetLogs)[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(mockWidgetLogs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedLogs = mockWidgetLogs.slice(startIndex, endIndex)

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Widget Logs</h1>
          <p className="text-muted-foreground">Monitor web widget conversations and analytics</p>
        </div>

        {/* Analytics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,678</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Messages</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11.5</div>
              <p className="text-xs text-muted-foreground">Per conversation</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.3%</div>
              <p className="text-xs text-muted-foreground">Positive feedback</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88.7%</div>
              <p className="text-xs text-muted-foreground">Issues resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Widget Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters inline with table */}
            <div className="mb-4 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by user email..." className="pl-9" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="general">General Agent</SelectItem>
                  <SelectItem value="support">Support Agent</SelectItem>
                  <SelectItem value="sales">Sales Agent</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Satisfaction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <ScrollArea className="h-[400px]">
                <div className="w-full overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">User</TableHead>
                        <TableHead className="min-w-[150px]">Agent</TableHead>
                        <TableHead className="min-w-[100px]">Messages</TableHead>
                        <TableHead className="min-w-[120px]">Satisfaction</TableHead>
                        <TableHead className="min-w-[100px]">Duration</TableHead>
                        <TableHead className="min-w-[180px]">Date & Time</TableHead>
                        <TableHead className="min-w-[120px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.user}</TableCell>
                          <TableCell>{log.agent}</TableCell>
                          <TableCell>{log.messages}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.satisfaction === "Positive"
                                  ? "default"
                                  : log.satisfaction === "Neutral"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {log.satisfaction}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.duration}</TableCell>
                          <TableCell>{log.date}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </div>

            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversation Dialog */}
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Conversation Details</DialogTitle>
              <DialogDescription>
                {selectedLog?.user} - {selectedLog?.date}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Agent</p>
                  <p className="font-medium">{selectedLog?.agent}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <p className="font-medium">{selectedLog?.messages}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedLog?.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <Badge
                    variant={
                      selectedLog?.satisfaction === "Positive"
                        ? "default"
                        : selectedLog?.satisfaction === "Neutral"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {selectedLog?.satisfaction}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Summary</p>
                <div className="rounded-lg border border-border bg-secondary p-4">
                  <p className="text-sm">{selectedLog?.summary}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}
