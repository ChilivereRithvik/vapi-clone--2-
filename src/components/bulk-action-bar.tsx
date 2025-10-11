"use client";

import { Button } from "@/components/ui/button";
import {
  Tag,
  Mail,
  MessageSquare,
  Phone,
  Users,
  Merge,
  Download,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BulkActionsBarProps = {
  selectedCount: number;
  onClear: () => void;
};

export function BulkActionsBar({
  selectedCount,
  onClear,
}: BulkActionsBarProps) {
  const handleExportSelection = () => {
    console.log(`Exporting ${selectedCount} selected users...`);
    // In a real implementation, this would export only the selected users
  };

  return (
    <div className="flex items-center justify-between border-b bg-primary/5 px-6 py-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{selectedCount} selected</span>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Tag className="mr-2 h-4 w-4" />
                Tags
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Add Tags</DropdownMenuItem>
              <DropdownMenuItem>Remove Tags</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Campaign
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Email Campaign
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                SMS Campaign
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp Campaign
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Update Opt-ins
          </Button>
          <Button variant="outline" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Assign Owner
          </Button>
          <Button variant="outline" size="sm">
            <Merge className="mr-2 h-4 w-4" />
            Merge Duplicates
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportSelection}>
            <Download className="mr-2 h-4 w-4" />
            Export Selection
          </Button>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onClear}>
        <X className="mr-2 h-4 w-4" />
        Clear Selection
      </Button>
    </div>
  );
}
