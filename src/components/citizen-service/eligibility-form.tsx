"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import type { EligibilityFormData } from "@/app/eligibility/page";

interface EligibilityFormProps {
  onSubmit: (data: EligibilityFormData) => void;
}

const availableDocuments = [
  "Aadhaar Card",
  "PAN Card",
  "Voter ID",
  "Driving License",
  "Passport",
  "Income Certificate",
  "Caste Certificate",
  "Domicile Certificate",
  "Bank Account Statement",
  "Ration Card",
  "Land Records",
  "Employment Certificate",
  "Educational Certificates",
  "Disability Certificate",
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export function EligibilityForm({ onSubmit }: EligibilityFormProps) {
  const [formData, setFormData] = useState<EligibilityFormData>({
    age: "",
    gender: "",
    incomeRange: "",
    householdSize: "",
    state: "",
    district: "",
    location: "",
    documents: [],
  });

  const handleDocumentChange = (document: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      documents: checked
        ? [...prev.documents, document]
        : prev.documents.filter((doc) => doc !== document),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid =
    formData.age &&
    formData.gender &&
    formData.incomeRange &&
    formData.householdSize &&
    formData.state &&
    formData.location;

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-2xl border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold font-mono text-card-foreground">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, age: e.target.value }))
                }
                min="1"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="household-size">Household Size</Label>
              <Input
                id="household-size"
                type="number"
                placeholder="Number of family members"
                value={formData.householdSize}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    householdSize: e.target.value,
                  }))
                }
                min="1"
                max="20"
              />
            </div>
          </div>

          {/* Income Information */}
          <div className="space-y-2">
            <Label htmlFor="income-range">Annual Household Income</Label>
            <Select
              value={formData.incomeRange}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, incomeRange: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select income range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="below-1-lakh">Below ₹1 Lakh</SelectItem>
                <SelectItem value="1-2-lakh">₹1 - 2 Lakh</SelectItem>
                <SelectItem value="2-3-lakh">₹2 - 3 Lakh</SelectItem>
                <SelectItem value="3-5-lakh">₹3 - 5 Lakh</SelectItem>
                <SelectItem value="5-8-lakh">₹5 - 8 Lakh</SelectItem>
                <SelectItem value="8-12-lakh">₹8 - 12 Lakh</SelectItem>
                <SelectItem value="above-12-lakh">Above ₹12 Lakh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, state: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem
                      key={state}
                      value={state.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                placeholder="Enter district"
                value={formData.district}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, district: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Location Type</Label>
              <RadioGroup
                value={formData.location}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, location: value }))
                }
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rural" id="rural" />
                  <Label htmlFor="rural">Rural</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urban" id="urban" />
                  <Label htmlFor="urban">Urban</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <Label>Available Documents (Select all that you have)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableDocuments.map((document) => (
                <div key={document} className="flex items-center space-x-2">
                  <Checkbox
                    id={document}
                    checked={formData.documents.includes(document)}
                    onCheckedChange={(checked) =>
                      handleDocumentChange(document, checked as boolean)
                    }
                  />
                  <Label htmlFor={document} className="text-sm">
                    {document}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={!isFormValid} className="gap-2">
              <Search className="h-4 w-4" />
              Run Eligibility Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
