"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FileText, Calendar, Building2, Tag } from "lucide-react";
import { Scheme } from "./eligibility-results";
// import { mockSchemes } from "@/lib/mock-data"

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

interface SchemeDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schemeId: string | null;
}

export function SchemeDetailDrawer({
  open,
  onOpenChange,
  schemeId,
}: SchemeDetailDrawerProps) {
  const scheme = schemeId ? mockSchemes.find((s) => s.id === schemeId) : null;

  if (!scheme) return null;

  const formatLastSynced = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <SheetTitle className="font-mono text-lg">{scheme.name}</SheetTitle>
            <Badge
              variant={scheme.level === "Central" ? "default" : "secondary"}
              className="text-xs"
            >
              {scheme.level}
            </Badge>
          </div>
          <SheetDescription className="text-left">
            Detailed information about this government scheme
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Scheme Overview */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Description
            </h3>
            <p className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
              {scheme.description}
            </p>
          </div>

          {/* Department and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Department
              </h3>
              <p className="text-sm text-muted-foreground">
                {scheme.department}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {scheme.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Eligibility Criteria */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Eligibility Criteria
            </h3>
            <ul className="space-y-2">
              {scheme.eligibility.map((criteria, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {criteria}
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Required Documents
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {scheme.documents.map((document, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-muted rounded-md"
                >
                  <FileText className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {document}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Sync Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatLastSynced(scheme.lastSynced)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <Button className="flex-1 gap-2" asChild>
              <a
                href={scheme.applyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Apply Online
              </a>
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              Download Info
            </Button>
          </div>

          {/* Additional Information */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Need Help?
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              For assistance with this scheme, contact your nearest Common
              Service Center or call our helpline.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Helpline: 1800-XXX-XXXX</span>
              <span>Email: help@gov.in</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
