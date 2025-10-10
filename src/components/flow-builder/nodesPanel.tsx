"use client";

import { useState } from "react";
import {
  Boxes,
  Play,
  Mail,
  Phone,
  Database,
  MessageSquare,
  Search,
  GitBranch,
  Route,
  Bot,
  Webhook,
  PhoneOff,
  Menu,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // optional if you have a cn utility

export function NodesPanel() {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const nodes = [
    {
      id: "startNode",
      label: "Start Node",
      icon: Play,
      color: "text-green-500",
    },
    {
      id: "apiRequest",
      label: "API Request Node",
      icon: Mail,
      color: "text-blue-500",
    },
    {
      id: "callTransfer",
      label: "Call Transfer Node",
      icon: Phone,
      color: "text-yellow-500",
    },
    {
      id: "endCall",
      label: "End Call Node",
      icon: PhoneOff,
      color: "text-red-500",
    },
    { id: "email", label: "Email Node", icon: Mail, color: "text-yellow-500" },
    {
      id: "condition",
      label: "Conditional Node",
      icon: GitBranch,
      color: "text-orange-500",
    },
    {
      id: "route",
      label: "Router Node",
      icon: Route,
      color: "text-orange-500",
    },
    { id: "model", label: "Model Node", icon: Bot, color: "text-green-500" },
    {
      id: "webhook",
      label: "Webhook Node",
      icon: Webhook,
      color: "text-blue-500",
    },
  ];

  const filteredNodes = nodes.filter((node) =>
    node.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-gradient-to-b from-background to-muted/20 shadow-sm transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-2 border-b border-border/40 p-3 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <div className="flex items-center gap-2">
          <Boxes
            className="h-4 w-4 text-primary"
            onClick={() => setCollapsed(!collapsed)}
          />
          {!collapsed && (
            <h2 className="text-sm font-semibold tracking-wide text-foreground">
              Available Nodes
            </h2>
          )}
        </div>

        {/* Collapse / Expand button */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search input */}
      {!collapsed && (
        <div className="relative px-3 py-2 border-b border-border/40">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-sm"
          />
        </div>
      )}

      {/* Scrollable node list */}
      <ScrollArea
        className={cn(
          collapsed ? "h-[300px] flex flex-col items-center" : "h-[300px]"
        )}
      >
        <div
          className={cn(
            "px-3 py-3 space-y-2 text-sm text-muted-foreground",
            collapsed && "space-y-1"
          )}
        >
          {filteredNodes.length > 0
            ? filteredNodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div
                    key={node.id}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md bg-background border hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                      collapsed && "justify-center p-2"
                    )}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("application/reactflow", node.id)
                    }
                    title={collapsed ? node.label : undefined} // <-- Add this
                  >
                    <Icon className={`h-4 w-4 ${node.color}`} />
                    {!collapsed && (
                      <span className="font-medium">{node.label}</span>
                    )}
                  </div>
                );
              })
            : !collapsed && (
                <p className="text-xs text-center text-muted-foreground/70 py-6">
                  No nodes found
                </p>
              )}
        </div>
      </ScrollArea>
    </div>
  );
}
