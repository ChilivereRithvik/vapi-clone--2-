"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";
import { UsersFiltersDialog } from "./users-filters-dialog";

export function UsersToolbar() {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  return (
    <>
      <div className="border-b bg-muted/30 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              All
            </Button>
            <Button variant="ghost" size="sm">
              Recently Active
            </Button>
            <Button variant="ghost" size="sm">
              No Opt-in
            </Button>
            <Button variant="ghost" size="sm">
              Unreachable
            </Button>
            <Button variant="ghost" size="sm">
              High-Value
            </Button>
          </div>
        </div>
        {activeFilters.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="gap-1">
                {filter}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setActiveFilters(activeFilters.filter((f) => f !== filter))
                  }
                />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveFilters([])}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
      <UsersFiltersDialog
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        onApply={setActiveFilters}
      />
    </>
  );
}
