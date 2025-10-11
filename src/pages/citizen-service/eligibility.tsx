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
import { EligibilityForm } from "@/components/citizen-service/eligibility-form";
import { EligibilityResults } from "@/components/citizen-service/eligibility-results";
import { DashboardLayout } from "@/components/dashboard-layout";
const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3, current: false },
  { name: "Call Logs", href: "/call-logs", icon: Phone, current: false },
  { name: "Eligibility", href: "/eligibility", icon: FileText, current: true },
  { name: "Schemes", href: "/schemes", icon: Users, current: false },
  { name: "Follow-ups", href: "/follow-ups", icon: Calendar, current: false },
  { name: "Analytics", href: "/analytics", icon: TrendingUp, current: false },
  { name: "Admin", href: "/admin", icon: Settings, current: false },
];

export interface EligibilityFormData {
  age: string;
  gender: string;
  incomeRange: string;
  householdSize: string;
  state: string;
  district: string;
  location: string;
  documents: string[];
}

export default function EligibilityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState<EligibilityFormData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = (data: EligibilityFormData) => {
    setFormData(data);
    setShowResults(true);
  };

  const handleNewCheck = () => {
    setFormData(null);
    setShowResults(false);
  };

  return (
    <DashboardLayout>
      <div className="flex h-screen bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page Content */}
          <main className="flex-1 overflow-auto ">
            <div className="max-w-7xl mx-auto space-y-6">
              {!showResults ? (
                <>
                  {/* Page Description */}
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold  text-foreground mb-2">
                      Check Scheme Eligibility
                    </h1>
                    <p className="text-muted-foreground">
                      Fill out the form below to check eligibility for
                      government schemes and benefits.
                    </p>
                  </div>

                  {/* Eligibility Form */}
                  <EligibilityForm onSubmit={handleFormSubmit} />
                </>
              ) : (
                <>
                  {/* Results Header */}
                  <div className="">
                    <h1 className="text-2xl font-bold  text-foreground mb-2">
                      Eligibility Results
                    </h1>
                    <p className="text-muted-foreground">
                      Based on the information provided, here are the schemes
                      you may be eligible for.
                    </p>
                  </div>

                  {/* Eligibility Results */}
                  <EligibilityResults formData={formData!} />
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
