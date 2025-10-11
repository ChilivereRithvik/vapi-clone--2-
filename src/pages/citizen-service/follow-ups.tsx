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
  Plus,
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
import { Link } from "react-router-dom";
import { FollowUpsKanban } from "@/components/citizen-service/follow-ups-kanban";
import { DashboardLayout } from "@/components/dashboard-layout";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3, current: false },
  { name: "Call Logs", href: "/call-logs", icon: Phone, current: false },
  { name: "Eligibility", href: "/eligibility", icon: FileText, current: false },
  { name: "Schemes", href: "/schemes", icon: Users, current: false },
  { name: "Follow-ups", href: "/follow-ups", icon: Calendar, current: true },
  { name: "Analytics", href: "/analytics", icon: TrendingUp, current: false },
  { name: "Admin", href: "/admin", icon: Settings, current: false },
];

export default function FollowUpsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="flex h-screen bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col ">
          {/* Page Content */}
          <main className="flex-1 overflow-auto ">
            <div className="mx-auto space-y-6">
              {/* Page Description */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold  text-foreground mb-2">
                  Follow-up Management
                </h1>
                <p className="text-muted-foreground">
                  Track and manage citizen follow-ups across different stages of
                  completion.
                </p>
              </div>

              {/* Kanban Board */}
              <FollowUpsKanban searchQuery={searchQuery} />
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
