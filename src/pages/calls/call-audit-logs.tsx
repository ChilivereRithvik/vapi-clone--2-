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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Filter,
  Eye,
  User,
  Settings,
  Trash2,
  Plus,
  Edit,
  LogIn,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const mockAuditLogs = [
  {
    id: 1,
    user: "John Doe",
    email: "john@example.com",
    action: "User Login",
    resource: "Authentication",
    resourceId: "auth-001",
    status: "Success",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0",
    date: "2024-01-15 10:30:25",
    details: {
      method: "Email/Password",
      location: "New York, USA",
      device: "Desktop - Chrome",
    },
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane@example.com",
    action: "Workflow Created",
    resource: "Workflows",
    resourceId: "wf-12345",
    status: "Success",
    ipAddress: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15",
    date: "2024-01-15 09:45:12",
    details: {
      workflowName: "Customer Support Flow",
      triggers: ["Incoming Call", "Widget Message"],
      actions: 5,
    },
  },
  {
    id: 3,
    user: "Mike Johnson",
    email: "mike@example.com",
    action: "Settings Updated",
    resource: "Project Settings",
    resourceId: "settings-001",
    status: "Success",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/121.0",
    date: "2024-01-15 08:20:45",
    details: {
      changes: ["API Key Regenerated", "Webhook URL Updated"],
      previousValues: { webhookUrl: "https://old-webhook.com" },
      newValues: { webhookUrl: "https://new-webhook.com" },
    },
  },
  {
    id: 4,
    user: "Sarah Williams",
    email: "sarah@example.com",
    action: "AI Agent Deleted",
    resource: "AI Agents",
    resourceId: "agent-789",
    status: "Success",
    ipAddress: "192.168.1.103",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/604.1",
    date: "2024-01-15 07:15:30",
    details: {
      agentName: "Sales Assistant",
      agentType: "Voice",
      deletedBy: "Sarah Williams",
    },
  },
  {
    id: 5,
    user: "Tom Brown",
    email: "tom@example.com",
    action: "API Call Failed",
    resource: "API",
    resourceId: "api-call-456",
    status: "Failed",
    ipAddress: "192.168.1.104",
    userAgent: "PostmanRuntime/7.36.0",
    date: "2024-01-15 06:50:18",
    details: {
      endpoint: "/api/v1/workflows",
      method: "POST",
      statusCode: 401,
      error: "Unauthorized - Invalid API Key",
    },
  },
  {
    id: 6,
    user: "Emily Davis",
    email: "emily@example.com",
    action: "Widget Created",
    resource: "Widgets",
    resourceId: "widget-321",
    status: "Success",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) Chrome/120.0.0.0",
    date: "2024-01-14 05:30:22",
    details: {
      widgetName: "Support Chat Widget",
      widgetType: "Chat",
      configuration: { theme: "dark", position: "bottom-right" },
    },
  },
  {
    id: 7,
    user: "David Wilson",
    email: "david@example.com",
    action: "User Logout",
    resource: "Authentication",
    resourceId: "auth-002",
    status: "Success",
    ipAddress: "192.168.1.106",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/120.0.0.0",
    date: "2024-01-14 04:15:40",
    details: {
      sessionDuration: "2h 45m",
      location: "San Francisco, USA",
    },
  },
  {
    id: 8,
    user: "Lisa Anderson",
    email: "lisa@example.com",
    action: "Knowledge Base Updated",
    resource: "Knowledge Base",
    resourceId: "kb-555",
    status: "Success",
    ipAddress: "192.168.1.107",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120.0.0.0",
    date: "2024-01-14 03:00:15",
    details: {
      documentsAdded: 3,
      documentsUpdated: 5,
      totalDocuments: 127,
    },
  },
];

const ITEMS_PER_PAGE = 6;

const getActionIcon = (action: string) => {
  if (action.includes("Login")) return <LogIn className="h-4 w-4" />;
  if (action.includes("Logout")) return <LogOut className="h-4 w-4" />;
  if (action.includes("Created")) return <Plus className="h-4 w-4" />;
  if (action.includes("Updated")) return <Edit className="h-4 w-4" />;
  if (action.includes("Deleted")) return <Trash2 className="h-4 w-4" />;
  if (action.includes("Settings")) return <Settings className="h-4 w-4" />;
  return <User className="h-4 w-4" />;
};

export default function AuditLogsPage() {
  const [selectedLog, setSelectedLog] = useState<
    (typeof mockAuditLogs)[0] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockAuditLogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedLogs = mockAuditLogs.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">
            Track all user activities and system events
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by user, action, or resource..."
                  className="pl-9"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login/Logout</SelectItem>
                  <SelectItem value="create">Created</SelectItem>
                  <SelectItem value="update">Updated</SelectItem>
                  <SelectItem value="delete">Deleted</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>

            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{log.user}</span>
                          <span className="text-xs text-muted-foreground">
                            {log.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          <span>{log.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{log.resource}</span>
                          <span className="text-xs text-muted-foreground font-mono">
                            {log.resourceId}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.status === "Success" ? "default" : "destructive"
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs">
                          {log.ipAddress}
                        </span>
                      </TableCell>
                      <TableCell>{log.date}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>

        <Sheet open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <SheetContent className="w-full sm:max-w-[600px] h-full">
            <SheetHeader>
              <SheetTitle>Audit Log Details</SheetTitle>
            </SheetHeader>
            {selectedLog && (
              <ScrollArea className="h-[calc(100vh-80px)] mt-6">
                <div className="space-y-6 pr-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                        <User className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedLog.user}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedLog.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Event Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Action</span>
                        <div className="flex items-center gap-2">
                          {getActionIcon(selectedLog.action)}
                          <span className="font-medium">
                            {selectedLog.action}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Resource</span>
                        <span className="font-medium">
                          {selectedLog.resource}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Resource ID
                        </span>
                        <span className="font-mono text-xs">
                          {selectedLog.resourceId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                          variant={
                            selectedLog.status === "Success"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {selectedLog.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Date & Time
                        </span>
                        <span className="font-medium">{selectedLog.date}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Network Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          IP Address
                        </span>
                        <span className="font-mono text-xs">
                          {selectedLog.ipAddress}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground">
                          User Agent
                        </span>
                        <span className="font-mono text-xs break-all text-right">
                          {selectedLog.userAgent}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Additional Details</h4>
                    <div className="rounded-lg bg-muted p-4">
                      <pre className="text-xs overflow-auto">
                        {JSON.stringify(selectedLog.details, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  );
}
