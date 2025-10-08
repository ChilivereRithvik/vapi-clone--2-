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
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export function NodesPanel() {
  // List of available nodes
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
      icon: Phone,
      color: "text-yellow-500",
    },
    {
      id: "email",
      label: "Email Node",
      icon: Mail,
      color: "text-yellow-500",
    },
  ];

  const [search, setSearch] = useState("");

  // Filter nodes by search query
  const filteredNodes = nodes.filter((node) =>
    node.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-64 rounded-xl border border-border/60 bg-gradient-to-b from-background to-muted/20 shadow-sm transition-all duration-200">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/40 p-3">
        <Boxes className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold tracking-wide text-foreground">
          Available Nodes
        </h2>
      </div>

      {/* Search input */}
      <div className="relative px-3 py-2 border-b border-border/40">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search nodes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-8 text-sm"
        />
      </div>

      {/* Scrollable node list */}
      <ScrollArea className="h-[400px]">
        <div className="px-3 py-3 space-y-2 text-sm text-muted-foreground">
          {filteredNodes.length > 0 ? (
            filteredNodes.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.id}
                  className="flex items-center gap-2 p-2 rounded-md bg-background border hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all"
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("application/reactflow", node.id)
                  }
                >
                  <Icon className={`h-4 w-4 ${node.color}`} />
                  <span className="font-medium">{node.label}</span>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-center text-muted-foreground/70 py-6">
              No nodes found
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
