"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  Save,
  Share2,
  CheckCircle,
  XCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
// import { mockSchemes } from "@/lib/mock-data"
import type { EligibilityFormData } from "@/app/eligibility/page";

interface EligibilityResultsProps {
  formData: EligibilityFormData;
}

export interface Scheme {
  id: string;
  name: string;
  level: "Central" | "State";
  tags: string[];
  department: string;
  lastSynced: string;
  description: string;
  eligibility: string[];
  documents: string[];
  applyLink: string;
}

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

interface EligibilityResult {
  scheme: (typeof mockSchemes)[0];
  status: "Eligible" | "Likely" | "Unknown" | "Ineligible";
  reasons: string[];
  nextSteps: string[];
  matchScore: number;
}

export function EligibilityResults({ formData }: EligibilityResultsProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Mock eligibility logic based on form data
  const calculateEligibility = (): EligibilityResult[] => {
    const results: EligibilityResult[] = [];

    mockSchemes.forEach((scheme) => {
      let status: EligibilityResult["status"] = "Unknown";
      let reasons: string[] = [];
      let nextSteps: string[] = [];
      let matchScore = 0;

      // Simple eligibility logic based on scheme type and form data
      const age = Number.parseInt(formData.age);
      const hasAadhaar = formData.documents.includes("Aadhaar Card");
      const hasIncomeProof = formData.documents.includes("Income Certificate");
      const isLowIncome = ["below-1-lakh", "1-2-lakh", "2-3-lakh"].includes(
        formData.incomeRange
      );

      switch (scheme.name) {
        case "Pradhan Mantri Jan Arogya Yojana":
          if (hasAadhaar && isLowIncome) {
            status = "Eligible";
            reasons = [
              "Has Aadhaar card",
              "Income below eligibility threshold",
            ];
            nextSteps = [
              "Visit nearest Common Service Center",
              "Complete family verification",
            ];
            matchScore = 95;
          } else if (hasAadhaar) {
            status = "Likely";
            reasons = ["Has Aadhaar card", "Income verification needed"];
            nextSteps = [
              "Get income certificate",
              "Visit CSC for verification",
            ];
            matchScore = 70;
          } else {
            status = "Ineligible";
            reasons = ["Aadhaar card required"];
            nextSteps = ["Apply for Aadhaar card first"];
            matchScore = 20;
          }
          break;

        case "PM-KISAN":
          if (
            formData.location === "rural" &&
            formData.documents.includes("Land Records")
          ) {
            status = "Eligible";
            reasons = ["Rural location", "Has land records"];
            nextSteps = ["Register on PM-KISAN portal", "Link bank account"];
            matchScore = 90;
          } else if (formData.location === "rural") {
            status = "Likely";
            reasons = ["Rural location", "Land records needed"];
            nextSteps = [
              "Obtain land ownership documents",
              "Visit village officer",
            ];
            matchScore = 65;
          } else {
            status = "Ineligible";
            reasons = ["Scheme for rural farmers only"];
            nextSteps = ["Check other agricultural schemes"];
            matchScore = 10;
          }
          break;

        case "Mahatma Gandhi NREGA":
          if (formData.location === "rural" && age >= 18) {
            status = "Eligible";
            reasons = [
              "Rural location",
              "Above 18 years",
              "Employment guarantee scheme",
            ];
            nextSteps = ["Apply for job card", "Register with gram panchayat"];
            matchScore = 85;
          } else if (formData.location === "rural") {
            status = "Likely";
            reasons = ["Rural location", "Age verification needed"];
            nextSteps = ["Wait until 18 years", "Prepare documents"];
            matchScore = 60;
          } else {
            status = "Ineligible";
            reasons = ["Scheme for rural areas only"];
            nextSteps = ["Check urban employment schemes"];
            matchScore = 15;
          }
          break;

        case "Beti Bachao Beti Padhao":
          if (formData.gender === "female" && age <= 21) {
            status = "Eligible";
            reasons = ["Female beneficiary", "Within age limit"];
            nextSteps = ["Visit nearest bank", "Open savings account"];
            matchScore = 88;
          } else if (formData.gender === "female") {
            status = "Likely";
            reasons = ["Female beneficiary", "Age limit verification needed"];
            nextSteps = [
              "Check specific scheme guidelines",
              "Contact local officer",
            ];
            matchScore = 55;
          } else {
            status = "Ineligible";
            reasons = ["Scheme for girl children only"];
            nextSteps = ["Check other education schemes"];
            matchScore = 5;
          }
          break;

        default:
          if (hasAadhaar) {
            status = "Likely";
            reasons = ["Has basic documentation"];
            nextSteps = [
              "Check detailed eligibility criteria",
              "Contact scheme office",
            ];
            matchScore = 50;
          } else {
            status = "Unknown";
            reasons = ["Insufficient information"];
            nextSteps = ["Gather required documents", "Consult with agent"];
            matchScore = 30;
          }
      }

      results.push({ scheme, status, reasons, nextSteps, matchScore });
    });

    // Sort by match score (highest first)
    return results.sort((a, b) => b.matchScore - a.matchScore);
  };

  const results = calculateEligibility();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Eligible":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Likely":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "Unknown":
        return <HelpCircle className="h-4 w-4 text-gray-600" />;
      case "Ineligible":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Eligible":
        return "default";
      case "Likely":
        return "secondary";
      case "Unknown":
        return "outline";
      case "Ineligible":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleSaveToCall = () => {
    // Mock action - would save results to current call
    console.log("Saving eligibility results to call");
  };

  const generateShareContent = () => {
    const eligibleSchemes = results.filter(
      (r) => r.status === "Eligible" || r.status === "Likely"
    );
    let content = "Eligibility Check Results\n\n";

    if (eligibleSchemes.length > 0) {
      content += "You may be eligible for the following schemes:\n\n";
      eligibleSchemes.forEach((result) => {
        content += `• ${result.scheme.name} (${result.status})\n`;
        content += `  Next steps: ${result.nextSteps.join(", ")}\n\n`;
      });
    } else {
      content +=
        "Based on the information provided, no immediate matches were found. Please consult with an agent for personalized assistance.\n\n";
    }

    content +=
      "For more information, visit your nearest Common Service Center or call our helpline.";
    return content;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button onClick={handleSaveToCall} className="gap-2">
            <Save className="h-4 w-4" />
            Save to Call
          </Button>
          <Button
            variant="outline"
            onClick={() => setShareModalOpen(true)}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Results
          </Button>
        </div>

        {/* Results Summary */}
        <Card className="rounded-2xl border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold font-mono text-card-foreground">
              Results Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Eligible", "Likely", "Unknown", "Ineligible"].map((status) => {
                const count = results.filter((r) => r.status === status).length;
                return (
                  <div key={status} className="text-center">
                    <div className="text-2xl font-bold font-mono text-card-foreground">
                      {count}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {status}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="space-y-4">
          {results.map((result) => (
            <Card
              key={result.scheme.id}
              className="rounded-2xl border-border bg-card"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {result.scheme.name}
                      </h3>
                      <Badge
                        variant={
                          result.scheme.level === "Central"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {result.scheme.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {result.scheme.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      {getStatusIcon(result.status)}
                      <Badge
                        variant={getStatusVariant(result.status)}
                        className="text-xs"
                      >
                        {result.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Match: {result.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-card-foreground mb-2">
                      {result.status === "Eligible" ||
                      result.status === "Likely"
                        ? "Why Eligible"
                        : "Why Not Eligible"}
                    </h4>
                    <ul className="space-y-1">
                      {result.reasons.map((reason, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-card-foreground mb-2">
                      Next Steps
                    </h4>
                    <ul className="space-y-1">
                      {result.nextSteps.map((step, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {result.scheme.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    asChild
                  >
                    <a
                      href={result.scheme.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Apply
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        content={generateShareContent()}
      />
    </>
  );
}
