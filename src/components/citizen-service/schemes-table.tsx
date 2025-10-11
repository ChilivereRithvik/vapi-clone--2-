"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, RefreshCw } from "lucide-react";

// import { SchemeDetailDrawer } from "@/components/scheme-detail-drawer";
import { Scheme } from "./eligibility-results";
import { SchemeDetailDrawer } from "./scheme-detail-drawer";

export const mockSchemes: Scheme[] = [
  {
    id: "1",
    name: "Pradhan Mantri Jan Arogya Yojana",
    level: "Central",
    tags: ["Healthcare", "Insurance"],
    department: "Health & Family Welfare",
    lastSynced: "2024-01-15 09:00",
    description:
      "Health insurance scheme providing coverage up to ₹5 lakh per family per year.",
    eligibility: [
      "Annual income below ₹2.5 lakh",
      "Valid Aadhaar card",
      "Resident of India",
    ],
    documents: ["Aadhaar Card", "Income Certificate", "Ration Card"],
    applyLink: "https://pmjay.gov.in",
  },
  {
    id: "2",
    name: "PM-KISAN",
    level: "Central",
    tags: ["Agriculture", "Direct Transfer"],
    department: "Agriculture & Farmers Welfare",
    lastSynced: "2024-01-15 08:45",
    description: "Direct income support to farmers with ₹6,000 per year.",
    eligibility: [
      "Small and marginal farmers",
      "Valid bank account",
      "Land ownership records",
    ],
    documents: ["Land Records", "Bank Account Details", "Aadhaar Card"],
    applyLink: "https://pmkisan.gov.in",
  },
  {
    id: "3",
    name: "Mahatma Gandhi NREGA",
    level: "Central",
    tags: ["Employment", "Rural Development"],
    department: "Rural Development",
    lastSynced: "2024-01-15 08:30",
    description: "Guaranteed 100 days of employment in rural areas.",
    eligibility: [
      "Rural household",
      "Adult member willing to work",
      "Job card holder",
    ],
    documents: ["Job Card", "Bank Account Details", "Address Proof"],
    applyLink: "https://nrega.nic.in",
  },
  {
    id: "4",
    name: "Beti Bachao Beti Padhao",
    level: "Central",
    tags: ["Women Empowerment", "Education"],
    department: "Women & Child Development",
    lastSynced: "2024-01-15 08:15",
    description:
      "Scheme to improve child sex ratio and promote girls' education.",
    eligibility: ["Girl child", "School enrollment", "Bank account"],
    documents: [
      "Birth Certificate",
      "School Certificate",
      "Bank Account Details",
    ],
    applyLink: "https://wcd.nic.in",
  },
  {
    id: "5",
    name: "Ayushman Bharat Digital Mission",
    level: "Central",
    tags: ["Healthcare", "Digital"],
    department: "Health & Family Welfare",
    lastSynced: "2024-01-15 08:00",
    description: "Digital health ecosystem for all citizens.",
    eligibility: ["Indian citizen", "Valid mobile number", "Aadhaar card"],
    documents: ["Aadhaar Card", "Mobile Number Verification"],
    applyLink: "https://abdm.gov.in",
  },
  {
    id: "6",
    name: "Pension Scheme",
    level: "Central",
    tags: ["Pension", "Retirement"],
    department: "Pension & Social Security",
    lastSynced: "2024-01-15 07:45",
    description: "Scheme providing pension benefits to eligible citizens.",
    eligibility: [
      "Age above 60 years",
      "Valid Aadhaar card",
      "Resident of India",
    ],
    documents: ["Aadhaar Card", "Birth Certificate", "Employment History"],
    applyLink: "https://pension.gov.in",
  },
];

interface SchemesTableProps {
  searchQuery: string;
  levelFilter: string;
}

export function SchemesTable({ searchQuery, levelFilter }: SchemesTableProps) {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);

  const filteredSchemes = mockSchemes.filter((scheme) => {
    const matchesSearch =
      searchQuery === "" ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLevel =
      levelFilter === "all" || scheme.level.toLowerCase() === levelFilter;

    return matchesSearch && matchesLevel;
  });

  const handleViewScheme = (schemeId: string) => {
    setSelectedScheme(schemeId);
    setDetailDrawerOpen(true);
  };

  const handleSyncScheme = (schemeId: string) => {
    // Mock sync action
    console.log("Syncing scheme:", schemeId);
  };

  const formatLastSynced = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <Card className="rounded-2xl border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold font-mono text-card-foreground">
            Government Schemes ({filteredSchemes.length} schemes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Last Synced</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchemes.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No schemes found matching the selected criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSchemes.map((scheme) => (
                  <TableRow key={scheme.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-card-foreground">
                          {scheme.name}
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {scheme.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          scheme.level === "Central" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {scheme.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {scheme.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {scheme.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{scheme.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {scheme.department}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatLastSynced(scheme.lastSynced)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewScheme(scheme.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSyncScheme(scheme.id)}
                          className="h-8 w-8 p-0"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <SchemeDetailDrawer
        open={detailDrawerOpen}
        onOpenChange={setDetailDrawerOpen}
        schemeId={selectedScheme}
      />
    </>
  );
}
