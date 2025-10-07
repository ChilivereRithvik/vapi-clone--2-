"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Code,
  Eye,
  Settings,
  MessageSquare,
  Phone,
  Copy,
  Download,
  X,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";

const mockWidgets = [
  {
    id: 1,
    name: "Customer Support Widget",
    type: "Chat",
    status: "Active",
    installations: 1234,
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Sales Assistant Widget",
    type: "Voice",
    status: "Active",
    installations: 856,
    lastUpdated: "1 day ago",
  },
  {
    id: 3,
    name: "FAQ Bot Widget",
    type: "Chat",
    status: "Draft",
    installations: 0,
    lastUpdated: "3 days ago",
  },
  {
    id: 4,
    name: "Onboarding Widget",
    type: "Chat",
    status: "Active",
    installations: 543,
    lastUpdated: "5 hours ago",
  },
  {
    id: 5,
    name: "Feedback Widget",
    type: "Voice",
    status: "Active",
    installations: 321,
    lastUpdated: "2 days ago",
  },
  {
    id: 6,
    name: "Product Demo Widget",
    type: "Chat",
    status: "Draft",
    installations: 0,
    lastUpdated: "1 week ago",
  },
];

const ITEMS_PER_PAGE = 5;

const getWidgetJSON = (widget: (typeof mockWidgets)[0]) => ({
  id: widget.id,
  name: widget.name,
  type: widget.type.toLowerCase(),
  status: widget.status.toLowerCase(),
  config: {
    theme: "light",
    position: "bottom-right",
    primaryColor: "#000000",
    greeting: `Welcome! I'm ${widget.name}`,
    placeholder: "Type your message...",
  },
  features: {
    voiceEnabled: widget.type === "Voice",
    fileUpload: true,
    typing_indicator: true,
    read_receipts: true,
  },
  analytics: {
    installations: widget.installations,
    lastUpdated: widget.lastUpdated,
    averageResponseTime: "2.3s",
  },
});

export default function WidgetsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWidget, setSelectedWidget] = useState<
    (typeof mockWidgets)[0] | null
  >(null);
  const [jsonSheetOpen, setJsonSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [widgetToDelete, setWidgetToDelete] = useState<
    (typeof mockWidgets)[0] | null
  >(null);

  const totalPages = Math.ceil(mockWidgets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedWidgets = mockWidgets.slice(startIndex, endIndex);

  const getWidgetIcon = (type: string) => {
    if (type === "Chat") return <MessageSquare className="h-4 w-4" />;
    if (type === "Voice") return <Phone className="h-4 w-4" />;
    return <MessageSquare className="h-4 w-4" />;
  };

  const handleViewJSON = (widget: (typeof mockWidgets)[0]) => {
    setSelectedWidget(widget);
    setJsonSheetOpen(true);
  };

  const handleDeleteClick = (widget: (typeof mockWidgets)[0]) => {
    setWidgetToDelete(widget);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("[v0] Deleting widget:", widgetToDelete);
    setDeleteDialogOpen(false);
    setWidgetToDelete(null);
  };

  const handleCopyJSON = () => {
    if (selectedWidget) {
      navigator.clipboard.writeText(
        JSON.stringify(getWidgetJSON(selectedWidget), null, 2)
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadJSON = () => {
    if (selectedWidget) {
      const json = JSON.stringify(getWidgetJSON(selectedWidget), null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedWidget.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const renderJsonWithSyntaxHighlight = (json: string) => {
    const lines = json.split("\n");
    return lines.map((line, index) => {
      const highlightedLine = line
        .replace(/"([^"]+)":/g, '<span class="text-blue-500">"$1"</span>:')
        .replace(
          /:\s*"([^"]*)"/g,
          ': <span class="text-green-600 dark:text-green-400">"$1"</span>'
        )
        .replace(
          /:\s*(-?\d+\.?\d*)/g,
          ': <span class="text-purple-600 dark:text-purple-400">$1</span>'
        )
        .replace(
          /:\s*(true|false)/g,
          ': <span class="text-purple-600 dark:text-purple-400">$1</span>'
        )
        .replace(
          /:\s*(null)/g,
          ': <span class="text-purple-600 dark:text-purple-400">$1</span>'
        );

      return (
        <div key={index} className="flex">
          <span className="inline-block w-12 select-none text-right pr-4 text-muted-foreground">
            {index + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
        </div>
      );
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Widgets</h1>
            <p className="text-muted-foreground">
              Create and manage AI-powered widgets for your website
            </p>
          </div>
          <Link to="/widgets/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Widget
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>All Widgets</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search inline with table */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search widgets..." className="pl-9" />
              </div>
            </div>

            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Widget</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Installations</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedWidgets.map((widget) => (
                    <TableRow key={widget.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            {getWidgetIcon(widget.type)}
                          </div>
                          <span className="font-medium">{widget.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{widget.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            widget.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {widget.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {widget.installations.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {widget.lastUpdated}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewJSON(widget)}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(widget)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {totalPages > 1 && (
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
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
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
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the widget "{widgetToDelete?.name}
                ". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Sheet open={jsonSheetOpen} onOpenChange={setJsonSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl p-0 flex flex-col h-full"
        >
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  {selectedWidget && getWidgetIcon(selectedWidget.type)}
                </div>
                <SheetTitle className="text-xl">
                  Widget Configuration
                </SheetTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDownloadJSON}
                  title="Download JSON"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyJSON}
                  title={copied ? "Copied!" : "Copy JSON"}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setJsonSheetOpen(false)}
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          {/* Format Info */}
          <div className="px-6 py-3 border-b flex items-center justify-between text-sm flex-shrink-0">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-mono">&lt;/&gt;</span>
              <span>JSON Format</span>
            </div>
            <span className="text-muted-foreground">
              {selectedWidget &&
                JSON.stringify(getWidgetJSON(selectedWidget), null, 2).split(
                  "\n"
                ).length}{" "}
              lines
            </span>
          </div>

          {/* JSON Content */}
          <ScrollArea className="flex-1">
            <div className="px-6 py-4">
              <pre className="font-mono text-sm leading-relaxed">
                {selectedWidget &&
                  renderJsonWithSyntaxHighlight(
                    JSON.stringify(getWidgetJSON(selectedWidget), null, 2)
                  )}
              </pre>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
