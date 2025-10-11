"use client";

import { useState } from "react";
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
  Bell,
  User,
  Download,
  Filter,
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
import { AnalyticsCharts } from "@/components/citizen-service/analytics-charts";
import { DashboardLayout } from "@/components/dashboard-layout";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3, current: false },
  { name: "Call Logs", href: "/call-logs", icon: Phone, current: false },
  { name: "Eligibility", href: "/eligibility", icon: FileText, current: false },
  { name: "Schemes", href: "/schemes", icon: Users, current: false },
  { name: "Follow-ups", href: "/follow-ups", icon: Calendar, current: false },
  { name: "Analytics", href: "/analytics", icon: TrendingUp, current: true },
  { name: "Admin", href: "/admin", icon: Settings, current: false },
];

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dateRange, setDateRange] = useState("30d");
  const [stateFilter, setStateFilter] = useState("all");

  const handleExportCSV = () => {
    // Mock CSV export
    const csvData = `Date,Calls,FCR%,Language,State
2024-01-15,45,87%,English,Delhi
2024-01-14,52,85%,Hindi,Maharashtra
2024-01-13,38,89%,Tamil,Tamil Nadu
2024-01-12,41,86%,Bengali,West Bengal`;

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics-data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="flex h-screen bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page Content */}
          <main className="flex-1 overflow-auto ">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Page Description */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold  text-foreground mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive analytics and insights for citizen service
                  operations.
                </p>
              </div>

              {/* Analytics Charts */}
              <AnalyticsCharts
                dateRange={dateRange}
                stateFilter={stateFilter}
              />
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
