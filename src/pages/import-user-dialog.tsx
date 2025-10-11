"use client";

import type React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ImportUsersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ImportStep = "upload" | "mapping" | "preview" | "importing" | "complete";

type FieldMapping = {
  csvColumn: string;
  userField: string;
};

export function ImportUsersDialog({
  open,
  onOpenChange,
}: ImportUsersDialogProps) {
  const [step, setStep] = useState<ImportStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [mappings, setMappings] = useState<FieldMapping[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [duplicates, setDuplicates] = useState<number>(0);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState({
    success: 0,
    failed: 0,
    skipped: 0,
  });

  const userFields = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "city", label: "City" },
    { value: "country", label: "Country" },
    { value: "language", label: "Language" },
    { value: "timezone", label: "Timezone" },
    { value: "dob", label: "Date of Birth" },
    { value: "leadSource", label: "Lead Source" },
    { value: "owner", label: "Owner" },
    { value: "tags", label: "Tags" },
    { value: "skip", label: "Skip this column" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
      // Mock CSV parsing
      const mockHeaders = [
        "Full Name",
        "Email Address",
        "Phone Number",
        "City",
        "Country",
        "Language",
      ];
      setCsvHeaders(mockHeaders);
      setMappings(
        mockHeaders.map((header) => ({
          csvColumn: header,
          userField: "skip",
        }))
      );
      setStep("mapping");
    }
  };

  const handleMappingChange = (csvColumn: string, userField: string) => {
    setMappings(
      mappings.map((m) => (m.csvColumn === csvColumn ? { ...m, userField } : m))
    );
  };

  const handlePreview = () => {
    // Mock preview data
    setPreviewData([
      {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1-555-0199",
        city: "Boston",
        country: "United States",
        language: "English",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1-555-0198",
        city: "Seattle",
        country: "United States",
        language: "English",
      },
    ]);
    setDuplicates(1);
    setStep("preview");
  };

  const handleImport = () => {
    setStep("importing");
    // Mock import process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setImportProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setImportResults({ success: 48, failed: 1, skipped: 1 });
        setStep("complete");
      }
    }, 200);
  };

  const handleClose = () => {
    setStep("upload");
    setFile(null);
    setCsvHeaders([]);
    setMappings([]);
    setPreviewData([]);
    setDuplicates(0);
    setImportProgress(0);
    setImportResults({ success: 0, failed: 0, skipped: 0 });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Users from CSV</DialogTitle>
        </DialogHeader>

        {step === "upload" && (
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  Drop your CSV file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum file size: 10MB
                </p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <Button asChild>
                <label htmlFor="csv-upload" className="cursor-pointer">
                  Select CSV File
                </label>
              </Button>
            </div>
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Your CSV should include columns for: name, email, phone, city,
                country, language, timezone. Email or phone is required for each
                user.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {step === "mapping" && (
          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Map your CSV columns to user fields. Required fields are marked
                with *.
              </AlertDescription>
            </Alert>
            <div className="space-y-3">
              {mappings.map((mapping) => (
                <div
                  key={mapping.csvColumn}
                  className="grid grid-cols-2 gap-4 items-center"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {mapping.csvColumn}
                    </span>
                  </div>
                  <Select
                    value={mapping.userField}
                    onValueChange={(value) =>
                      handleMappingChange(mapping.csvColumn, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {userFields.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Preview Import</h3>
              <Badge variant="secondary">
                {previewData.length} users ready to import
              </Badge>
            </div>
            {duplicates > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Found {duplicates} potential duplicate(s) based on
                  email/phone. These will be skipped.
                </AlertDescription>
              </Alert>
            )}
            <div className="rounded-lg border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Name</th>
                      <th className="px-4 py-2 text-left font-medium">Email</th>
                      <th className="px-4 py-2 text-left font-medium">Phone</th>
                      <th className="px-4 py-2 text-left font-medium">City</th>
                      <th className="px-4 py-2 text-left font-medium">
                        Country
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="px-4 py-2">{row.name}</td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {row.email}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">
                          {row.phone}
                        </td>
                        <td className="px-4 py-2">{row.city}</td>
                        <td className="px-4 py-2">{row.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Showing first 2 rows. Total: {previewData.length} users
            </p>
          </div>
        )}

        {step === "importing" && (
          <div className="space-y-4 py-8">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                <Upload className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold">Importing Users...</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please wait while we import your users
              </p>
            </div>
            <div className="space-y-2">
              <Progress value={importProgress} className="h-2" />
              <p className="text-center text-sm text-muted-foreground">
                {importProgress}% complete
              </p>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="space-y-4 py-8">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Import Complete!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your users have been imported successfully
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {importResults.success}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Imported</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {importResults.skipped}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Skipped</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold text-red-600">
                  {importResults.failed}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Failed</p>
              </div>
            </div>
            {importResults.failed > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {importResults.failed} user(s) failed validation. Check the
                  error log for details.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <DialogFooter>
          {step === "upload" && (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}
          {step === "mapping" && (
            <>
              <Button variant="outline" onClick={() => setStep("upload")}>
                Back
              </Button>
              <Button onClick={handlePreview}>Preview Import</Button>
            </>
          )}
          {step === "preview" && (
            <>
              <Button variant="outline" onClick={() => setStep("mapping")}>
                Back
              </Button>
              <Button onClick={handleImport}>
                Import {previewData.length} Users
              </Button>
            </>
          )}
          {step === "complete" && <Button onClick={handleClose}>Done</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
