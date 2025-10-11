"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CallLogsDataTable } from "@/components/citizen-service/call-logs-data-table";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function CitizenServiceCallLogsPage() {
  const [intentFilter, setIntentFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");

  return (
    <DashboardLayout>
      <div className="flex bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Page Content */}
          <main className="flex-1 overflow-auto ">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Filters */}
              <div className="bg-card rounded-2xl p-2 border border-border">
                <h3 className="text-lg font-semibold font-mono text-card-foreground mb-4">
                  Filters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Intent
                    </label>
                    <Select
                      value={intentFilter}
                      onValueChange={setIntentFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Intents</SelectItem>
                        <SelectItem value="pension">Pension Inquiry</SelectItem>
                        <SelectItem value="healthcare">
                          Healthcare Scheme
                        </SelectItem>
                        <SelectItem value="education">
                          Education Grant
                        </SelectItem>
                        <SelectItem value="housing">Housing Subsidy</SelectItem>
                        <SelectItem value="employment">
                          Employment Scheme
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Language
                    </label>
                    <Select
                      value={languageFilter}
                      onValueChange={setLanguageFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                        <SelectItem value="marathi">Marathi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Result
                    </label>
                    <Select
                      value={resultFilter}
                      onValueChange={setResultFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Results</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="transferred">Transferred</SelectItem>
                        <SelectItem value="abandoned">Abandoned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-2 block">
                      Agent
                    </label>
                    <Select value={agentFilter} onValueChange={setAgentFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Agents</SelectItem>
                        <SelectItem value="bot">Bot</SelectItem>
                        <SelectItem value="agent-smith">Agent Smith</SelectItem>
                        <SelectItem value="agent-johnson">
                          Agent Johnson
                        </SelectItem>
                        <SelectItem value="agent-davis">Agent Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Call Logs Table */}
              <CallLogsDataTable
                intentFilter={intentFilter}
                languageFilter={languageFilter}
                resultFilter={resultFilter}
                agentFilter={agentFilter}
              />
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
