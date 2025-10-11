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
} from "lucide-react";
import { SchemesTable } from "@/components/citizen-service/schemes-table";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  return (
    <DashboardLayout>
      <div className="flex bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page Content */}
          <main className="flex-1 overflow-auto ">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Page Description */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold font-mono text-foreground mb-2">
                  Government Schemes
                </h1>
                <p className="text-muted-foreground">
                  Browse and manage government schemes and benefits available to
                  citizens.
                </p>
              </div>

              {/* Schemes Table */}
              <SchemesTable
                searchQuery={searchQuery}
                levelFilter={levelFilter}
              />
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
