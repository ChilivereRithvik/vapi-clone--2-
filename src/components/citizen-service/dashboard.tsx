"use client";

import { useState } from "react";
// import Link from "next/link";
import {
  BarChart3,
  Phone,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Settings,
  Menu,
  Search,
  Filter,
  Bell,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Link } from "react-router-dom";
import { KpiCard } from "./kpi-card";
import { EligibilityDonutChart } from "./eligibility-donut-chart";
import { TopSchemesList } from "./top-schemes-list";
import { FollowUpsDue } from "./follow-ups-due";
import { CallsByStateChart } from "./calls-by-state-chart";
import { AgeGroupChart } from "./age-group-chart";
import { GenderSplitChart } from "./gender-split-chart";
import { RecentCallsTable } from "./recent-calls-table";
// import { KpiCard } from "@/components/kpi-card";
// import { EligibilityDonutChart } from "@/components/eligibility-donut-chart";
// import { RecentCallsTable } from "@/components/recent-calls-table";
// import { TopSchemesList } from "@/components/top-schemes-list";
// import { FollowUpsDue } from "@/components/follow-ups-due";
// import { CallsByStateChart } from "@/components/calls-by-state-chart";
// import { AgeGroupChart } from "@/components/age-group-chart";
// import { GenderSplitChart } from "@/components/gender-split-chart";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3, current: true },
  { name: "Call Logs", href: "/call-logs", icon: Phone, current: false },
  { name: "Eligibility", href: "/eligibility", icon: FileText, current: false },
  { name: "Schemes", href: "/schemes", icon: Users, current: false },
  { name: "Follow-ups", href: "/follow-ups", icon: Calendar, current: false },
  { name: "Analytics", href: "/analytics", icon: TrendingUp, current: false },
  { name: "Admin", href: "/admin", icon: Settings, current: false },
];

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dateRange, setDateRange] = useState("today");
  const [stateFilter, setStateFilter] = useState("all");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 bg-sidebar border-r border-sidebar-border flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {sidebarOpen && (
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              Government Services Portal
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={item.current ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    !sidebarOpen ? "px-2" : ""
                  } ${
                    item.current
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {sidebarOpen && <span className="truncate">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-card-foreground">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search records..." className="pl-10 w-64" />
              </div>

              {/* Date Range Filter */}
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>

              {/* State Filter */}
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                </SelectContent>
              </Select>

              {/* Filters */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <Filter className="h-4 w-4" />
                    Options
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export Report</DropdownMenuItem>
                  <DropdownMenuItem>Refresh Data</DropdownMenuItem>
                  <DropdownMenuItem>System Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <User className="h-4 w-4" />
                    Administrator
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>User Profile</DropdownMenuItem>
                  <DropdownMenuItem>System Settings</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Message */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Citizen Services Management System
              </h1>
              <p className="text-muted-foreground">
                Comprehensive dashboard for monitoring citizen service
                operations and performance metrics.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <KpiCard
                title="Total Calls"
                value="1,234"
                change="+12%"
                trend="up"
              />
              <KpiCard
                title="Unique Callers"
                value="856"
                change="+8%"
                trend="up"
              />
              <KpiCard
                title="Avg Handle Time"
                value="4:32"
                change="-5%"
                trend="down"
              />
              <KpiCard title="FCR%" value="87%" change="+3%" trend="up" />
              <KpiCard
                title="Abandonment%"
                value="2.1%"
                change="-1%"
                trend="down"
              />
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 min-h-0">
                <EligibilityDonutChart />
              </div>
              <div className="space-y-6 min-h-0">
                <TopSchemesList />
                <FollowUpsDue />
              </div>
            </div>

            {/* Demographic Analytics */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Demographic Analysis
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 w-fit bg-transparent"
                >
                  <TrendingUp className="h-4 w-4" />
                  Detailed Report
                </Button>
              </div>

              <div className="space-y-6">
                <div className="w-full">
                  <CallsByStateChart />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="min-h-0">
                    <AgeGroupChart />
                  </div>
                  <div className="min-h-0">
                    <GenderSplitChart />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Recent Call Activity
                </h2>
                <Link to="/call-logs" replace={true}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 w-fit bg-transparent"
                  >
                    <Phone className="h-4 w-4" />
                    View All Records
                  </Button>
                </Link>
              </div>
              <div className="w-full overflow-hidden">
                <RecentCallsTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
