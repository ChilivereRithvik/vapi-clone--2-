"use client";

import type React from "react";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Upload,
  BookOpen,
  Search,
  Menu,
  Code,
  MoreVertical,
} from "lucide-react";

import { CreateWorkflowSheet } from "@/components/create-workflow-sheet";
import { WorkflowJsonSheet } from "@/components/workflow-json-sheet";
import { Link } from "react-router-dom";

const workflows = [
  {
    id: "1",
    name: "Welcome Email Series",
    stepCount: 5,
    created: "Sep 30, 2025",
    updated: "Sep 30, 2025",
  },
  {
    id: "2",
    name: "Abandoned Cart Recovery",
    stepCount: 3,
    created: "Sep 28, 2025",
    updated: "Sep 29, 2025",
  },
  {
    id: "3",
    name: "Newsletter Campaign",
    stepCount: 2,
    created: "Sep 25, 2025",
    updated: "Sep 25, 2025",
  },
  {
    id: "4",
    name: "Product Launch Sequence",
    stepCount: 7,
    created: "Sep 23, 2025",
    updated: "Sep 24, 2025",
  },
  {
    id: "5",
    name: "Re-engagement Campaign",
    stepCount: 4,
    created: "Sep 20, 2025",
    updated: "Sep 20, 2025",
  },
  {
    id: "6",
    name: "Customer Onboarding",
    stepCount: 6,
    created: "Sep 18, 2025",
    updated: "Sep 19, 2025",
  },
  {
    id: "7",
    name: "Feedback Request",
    stepCount: 2,
    created: "Sep 15, 2025",
    updated: "Sep 15, 2025",
  },
  {
    id: "8",
    name: "Birthday Greetings",
    stepCount: 1,
    created: "Sep 12, 2025",
    updated: "Sep 12, 2025",
  },
];

const getWorkflowJson = (workflow: any) => ({
  name: workflow.name,
  nodes: [
    {
      name: "email_start",
      type: "email",
      isStart: true,
      metadata: {
        position: {
          x: -400,
          y: -100,
        },
      },
      subject: "Welcome to our platform!",
      template: "welcome_email",
      delay: 0,
    },
  ],
  edges: [],
  globalSettings: {
    fromEmail: "noreply@example.com",
    fromName: "Your Company",
  },
});

const ITEMS_PER_PAGE = 5;

export default function EmailFlowsPage() {
  //   const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recently-created");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jsonSheetOpen, setJsonSheetOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<any>(null);

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWorkflows.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedWorkflows = filteredWorkflows.slice(startIndex, endIndex);

  const handleCreateWorkflow = (templateId: string, name: string) => {
    console.log("[v0] Creating email workflow:", { templateId, name });
    <Link
      to={`/email/flows/new?template=${templateId}&name=${encodeURIComponent(
        name
      )}`}
    />;
  };

  const handleViewJson = (workflow: any) => {
    setSelectedWorkflow(workflow);
    setJsonSheetOpen(true);
  };

  const handleDeleteClick = (workflow: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkflowToDelete(workflow);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("[v0] Deleting email workflow:", workflowToDelete);
    setDeleteDialogOpen(false);
    setWorkflowToDelete(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Email Workflows</h1>
            <Badge
              variant="secondary"
              className="bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-700 dark:text-white"
            >
              Beta
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => setIsSheetOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload JSON
            </Button>
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Docs
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search email workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recently-created">
                  Recently Created
                </SelectItem>
                <SelectItem value="recently-updated">
                  Recently Updated
                </SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="step-count">Step Count</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card">
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Step Count</TableHead>
                  <TableHead className="font-semibold">Created</TableHead>
                  <TableHead className="font-semibold">Updated</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedWorkflows.map((workflow) => (
                  <TableRow
                    key={workflow.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => <Link to={`/email/flows/${workflow.id}`} />}
                  >
                    <TableCell className="font-medium">
                      {workflow.name}
                    </TableCell>
                    <TableCell>{workflow.stepCount}</TableCell>
                    <TableCell>{workflow.created}</TableCell>
                    <TableCell>{workflow.updated}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewJson(workflow);
                          }}
                        >
                          <Code className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Export JSON</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={(e) => handleDeleteClick(workflow, e)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          {totalPages > 1 && (
            <div className="border-t border-border p-4">
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
            </div>
          )}
        </div>

        <CreateWorkflowSheet
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          onCreateWorkflow={handleCreateWorkflow}
        />

        {selectedWorkflow && (
          <WorkflowJsonSheet
            open={jsonSheetOpen}
            onOpenChange={setJsonSheetOpen}
            workflowName={selectedWorkflow.name}
            workflowData={getWorkflowJson(selectedWorkflow)}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the email workflow "
                {workflowToDelete?.name}". This action cannot be undone.
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
    </DashboardLayout>
  );
}
