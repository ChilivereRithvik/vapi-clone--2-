"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  MoreHorizontal,
  Calendar,
  Phone,
  MessageSquare,
  CheckCircle,
  UserCheck,
  Send,
} from "lucide-react";
import { FollowUp } from "./follow-ups-due";
// import { mockFollowUps, type FollowUp } from "@/lib/mock-data"

export const mockFollowUps: FollowUp[] = [
  {
    id: "1",
    caller: "•••1234",
    scheme: "PM-KISAN",
    dueDate: "2024-01-15",
    channel: "Phone",
    notes: "Need to verify bank account details for direct transfer",
    status: "Due Today",
  },
  {
    id: "2",
    caller: "•••5678",
    scheme: "PMJAY",
    dueDate: "2024-01-15",
    channel: "SMS",
    notes: "Document verification pending - income certificate required",
    status: "Due Today",
  },
  {
    id: "3",
    caller: "•••9012",
    scheme: "NREGA",
    dueDate: "2024-01-16",
    channel: "WhatsApp",
    notes: "Job card application status update needed",
    status: "Pending Docs",
  },
  {
    id: "4",
    caller: "•••3456",
    scheme: "Beti Bachao Beti Padhao",
    dueDate: "2024-01-17",
    channel: "Phone",
    notes: "School enrollment confirmation needed from parent",
    status: "Waiting Citizen",
  },
  {
    id: "5",
    caller: "•••7890",
    scheme: "ABDM",
    dueDate: "2024-01-18",
    channel: "SMS",
    notes: "Mobile number verification failed multiple times",
    status: "Escalated",
  },
  {
    id: "6",
    caller: "•••2468",
    scheme: "PM-KISAN",
    dueDate: "2024-01-15",
    channel: "Phone",
    notes: "Land records verification required for farmer registration",
    status: "Pending Docs",
  },
  {
    id: "7",
    caller: "•••1357",
    scheme: "PMJAY",
    dueDate: "2024-01-16",
    channel: "WhatsApp",
    notes: "Family member addition to health insurance card",
    status: "Waiting Citizen",
  },
  {
    id: "8",
    caller: "•••8024",
    scheme: "Pension Scheme",
    dueDate: "2024-01-14",
    channel: "Phone",
    notes: "Age verification documents missing - birth certificate needed",
    status: "Escalated",
  },
];

interface FollowUpsKanbanProps {
  searchQuery: string;
}

const columns = [
  { id: "Due Today", title: "Due Today", color: "bg-red-50 border-red-200" },
  {
    id: "Pending Docs",
    title: "Pending Docs",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: "Waiting Citizen",
    title: "Waiting Citizen",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: "Escalated",
    title: "Escalated",
    color: "bg-purple-50 border-purple-200",
  },
];

export function FollowUpsKanban({ searchQuery }: FollowUpsKanbanProps) {
  const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps);

  const filteredFollowUps = followUps.filter((followUp) => {
    if (searchQuery === "") return true;
    return (
      followUp.caller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      followUp.scheme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      followUp.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Phone":
        return <Phone className="h-3 w-3" />;
      case "SMS":
      case "WhatsApp":
        return <MessageSquare className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case "Phone":
        return "bg-green-100 text-green-800";
      case "SMS":
        return "bg-blue-100 text-blue-800";
      case "WhatsApp":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (
    followUpId: string,
    newStatus: FollowUp["status"]
  ) => {
    setFollowUps((prev) =>
      prev.map((followUp) =>
        followUp.id === followUpId
          ? { ...followUp, status: newStatus }
          : followUp
      )
    );
  };

  const handleReassign = (followUpId: string) => {
    // Mock reassign action
    console.log("Reassigning follow-up:", followUpId);
  };

  const handleMarkDone = (followUpId: string) => {
    // Mock mark done action - could remove from list or move to completed
    console.log("Marking follow-up as done:", followUpId);
    setFollowUps((prev) =>
      prev.filter((followUp) => followUp.id !== followUpId)
    );
  };

  const handleSendTemplate = (followUpId: string) => {
    // Mock send template action
    console.log("Sending template for follow-up:", followUpId);
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffInDays = Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Tomorrow";
    if (diffInDays === -1) return "Yesterday";
    if (diffInDays < 0) return `${Math.abs(diffInDays)} days overdue`;
    return `In ${diffInDays} days`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {columns.map((column) => {
        const columnFollowUps = filteredFollowUps.filter(
          (followUp) => followUp.status === column.id
        );

        return (
          <Card
            key={column.id}
            className={`rounded-2xl border-2 ${column.color}`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-card-foreground flex items-center justify-between">
                {column.title}
                <Badge variant="secondary" className="text-xs">
                  {columnFollowUps.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {columnFollowUps.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No follow-ups in this stage
                </div>
              ) : (
                columnFollowUps.map((followUp) => (
                  <Card
                    key={followUp.id}
                    className="rounded-xl border border-border bg-card shadow-sm"
                  >
                    <CardContent className="p-2">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-medium text-card-foreground">
                              {followUp.caller}
                            </span>
                            <Badge
                              variant="outline"
                              className={`text-xs flex items-center gap-1 ${getChannelColor(
                                followUp.channel
                              )}`}
                            >
                              {getChannelIcon(followUp.channel)}
                              {followUp.channel}
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleReassign(followUp.id)}
                              >
                                <UserCheck className="h-3 w-3 mr-2" />
                                Reassign Owner
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleMarkDone(followUp.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-2" />
                                Mark Done
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleSendTemplate(followUp.id)}
                              >
                                <Send className="h-3 w-3 mr-2" />
                                Send Template
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Scheme */}
                        <div>
                          <div className="text-sm font-medium text-card-foreground">
                            {followUp.scheme}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDueDate(followUp.dueDate)}
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="text-xs text-muted-foreground bg-muted rounded-md p-1">
                          {followUp.notes}
                        </div>

                        {/* Status Dropdown */}
                        <div>
                          <Select
                            value={followUp.status}
                            onValueChange={(value) =>
                              handleStatusChange(
                                followUp.id,
                                value as FollowUp["status"]
                              )
                            }
                          >
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Due Today">
                                Due Today
                              </SelectItem>
                              <SelectItem value="Pending Docs">
                                Pending Docs
                              </SelectItem>
                              <SelectItem value="Waiting Citizen">
                                Waiting Citizen
                              </SelectItem>
                              <SelectItem value="Escalated">
                                Escalated
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
