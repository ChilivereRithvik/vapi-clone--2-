"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Bot,
  Phone,
  BookOpen,
  Menu,
  X,
  Settings,
  Workflow,
  Zap,
  ChevronLeft,
  LogOut,
  RefreshCw,
  User,
  Sun,
  Moon,
  FolderOpen,
  Check,
  ChevronsUpDown,
  ScrollText,
  ChevronDown,
  ChevronRight,
  Mail,
  Megaphone,
  LayoutGrid,
  PhoneCall,
  ChartArea,
  User2,
  UserCircle,
} from "lucide-react";
import { useTheme } from "./theme-provider";

type NavigationItem = {
  name: string;
  href?: string;
  icon: React.ElementType;
  children?: NavigationItem[];
};

const navigation: NavigationItem[] = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  {
    name: "citizen service",
    href: "/citizenservice/dashboard",
    icon: LayoutDashboard,
  },
  { name: "schemes", href: "/citizenservice/schemes", icon: LayoutDashboard },
  { name: "Call Logs", href: "/citizenservice/call-logs", icon: PhoneCall },
  { name: "Analytics", href: "/citizenservice/analytics", icon: ChartArea },
  { name: "Follow Ups", href: "/citizenservice/follow-ups", icon: PhoneCall },
  { name: "Eligibility", href: "/citizenservice/eligibility", icon: User2 },
  { name: "Admin", href: "/citizenservice/admin", icon: UserCircle },
  {
    name: "AI",
    icon: Bot,
    children: [
      { name: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
      { name: "AI Agent", href: "/ai-agent", icon: Bot },
    ],
  },
  {
    name: "Call",
    icon: Phone,
    children: [
      { name: "Flows", href: "/flows", icon: Workflow },
      { name: "Call Logs", href: "/call-logs", icon: Phone },
      {
        name: "Outbound Campaigns",
        href: "/call/outbound-campaigns",
        icon: Megaphone,
      },
      { name: "Audit Logs", href: "/audit-logs", icon: ScrollText },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
  {
    name: "Email",
    icon: Mail,
    children: [
      { name: "Flows", href: "/email/flows", icon: Workflow },
      {
        name: "Outbound Campaigns",
        href: "/email/outbound-campaigns",
        icon: Megaphone,
      },
      {
        name: "Campaign Manager",
        href: "/email/campaign-manager",
        icon: LayoutGrid,
      },
      { name: "Audit Logs", href: "/email/audit-logs", icon: ScrollText },
      { name: "Settings", href: "/email/settings", icon: Settings },
    ],
  },
  {
    name: "Web Widget",
    icon: Zap,
    children: [
      { name: "Flows", href: "/widgets/flows", icon: Workflow },
      { name: "Audit Logs", href: "/widgets/audit-logs", icon: ScrollText },
      { name: "Settings", href: "/widgets/settings", icon: Settings },
    ],
  },
  //citizen service module
];

const projects = [
  { id: "1", name: "Production", color: "bg-green-500" },
  { id: "2", name: "Development", color: "bg-blue-500" },
  { id: "3", name: "Staging", color: "bg-yellow-500" },
  { id: "4", name: "Testing", color: "bg-purple-500" },
];

export function DashboardLayout({
  children,
  showNavBar = true,
  showSidebarOnly = false,
  padding,
}: {
  children: React.ReactNode;
  showNavBar?: boolean;
  showSidebarOnly?: boolean;
  padding?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    AI: true,
    Call: true,
    Email: true,
    "Web Widget": true,
  });

  const { theme, setTheme } = useTheme();
  const mainPadding = padding ?? "p-6";

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const renderNavItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.name];
    const isActive = false;

    if (hasChildren) {
      // Parent item with children
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleSection(item.name)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "text-muted-foreground hover:bg-secondary hover:text-foreground",
              sidebarCollapsed && "lg:justify-center lg:px-2"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <>
                <span className="flex-1 text-left">{item.name}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 flex-shrink-0" />
                )}
              </>
            )}
          </button>
          {!sidebarCollapsed && isExpanded && item.children && (
            <div className="ml-4 mt-1 space-y-1 border-l border-border pl-2">
              {item.children.map((child) => renderNavItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // Leaf item with href
    const linkContent = (
      <Link
        to={item.href!}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
          sidebarCollapsed && "lg:justify-center lg:px-2"
        )}
        onClick={() => setSidebarOpen(false)}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        {!sidebarCollapsed && <span>{item.name}</span>}
      </Link>
    );

    if (sidebarCollapsed) {
      return (
        <Tooltip key={item.name}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.name}>{linkContent}</div>;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen bg-background overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 transform border-r border-border bg-card transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            sidebarCollapsed ? "lg:w-16" : "lg:w-64",
            "w-64"
          )}
        >
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex h-16 items-center justify-between border-b border-border px-4 flex-shrink-0">
              {sidebarCollapsed ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden lg:flex h-8 w-8"
                  onClick={() => setSidebarCollapsed(false)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              ) : (
                <>
                  <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">Anantix</span>
                  </Link>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden lg:flex h-8 w-8"
                      onClick={() => setSidebarCollapsed(true)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden h-8 w-8"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              )}
            </div>

            <ScrollArea className="flex-1 min-h-0">
              <div className="px-4 py-4">
                <nav className="space-y-1">
                  {navigation.map((item) => renderNavItem(item))}
                </nav>
              </div>
            </ScrollArea>

            <div className="border-t  p-1 flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {sidebarCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-center p-2 h-10"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                            <User className="h-4 w-4 text-primary-foreground" />
                          </div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>John Doe</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 px-3 py-2 h-auto"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-sm font-medium">John Doe</span>
                        <span className="text-xs text-muted-foreground">
                          john@example.com
                        </span>
                      </div>
                    </Button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    <span>Switch Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </aside>

        {!showSidebarOnly && (
          <div className="flex flex-1 flex-col overflow-hidden min-w-0">
            {showNavBar ? (
              <>
                <div className="lg:hidden flex items-center justify-between border-b border-border bg-card px-4 h-16 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2 px-3">
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            currentProject.color
                          )}
                        />
                        <span className="text-sm font-medium">
                          {currentProject.name}
                        </span>
                        <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-56">
                      {projects.map((project) => (
                        <DropdownMenuItem
                          key={project.id}
                          onClick={() => setCurrentProject(project)}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full",
                                project.color
                              )}
                            />
                            <span>{project.name}</span>
                          </div>
                          {currentProject.id === project.id && (
                            <Check className="h-4 w-4" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="w-10" />
                </div>

                <div className="hidden lg:flex items-center justify-between border-b border-border bg-card px-6 h-16 flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2 px-3 h-9 bg-transparent"
                      >
                        <FolderOpen className="h-4 w-4" />
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            currentProject.color
                          )}
                        />
                        <span className="text-sm font-medium">
                          {currentProject.name}
                        </span>
                        <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        Switch Project
                      </div>
                      <DropdownMenuSeparator />
                      {projects.map((project) => (
                        <DropdownMenuItem
                          key={project.id}
                          onClick={() => setCurrentProject(project)}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full",
                                project.color
                              )}
                            />
                            <span>{project.name}</span>
                          </div>
                          {currentProject.id === project.id && (
                            <Check className="h-4 w-4" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex items-center gap-2">
                    {/* Additional top bar actions can be added here */}
                  </div>
                </div>
              </>
            ) : null}
            <ScrollArea className="flex-1 min-h-0">
              <main className={mainPadding}>{children}</main>
            </ScrollArea>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
