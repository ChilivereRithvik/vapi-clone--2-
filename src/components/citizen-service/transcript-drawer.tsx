"use client";

import { useState } from "react";
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
import { Share2, MessageSquare, Phone, Copy, Check } from "lucide-react";
import { mockCalls } from "./call-logs-data-table";
import { ShareModal } from "./share-modal";
// import { mockCalls } from "@/lib/mock-data";F
// import { ShareModal } from "@/components/share-modal";

interface TranscriptDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callId: string | null;
}

export function TranscriptDrawer({
  open,
  onOpenChange,
  callId,
}: TranscriptDrawerProps) {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const call = callId ? mockCalls.find((c) => c.id === callId) : null;

  const handleCopyTranscript = () => {
    if (call?.transcript) {
      navigator.clipboard.writeText(call.transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!call) return null;

  const mockTranscript =
    call.transcript || "Transcript not available for this call.";
  const mockSummary =
    "Caller inquired about pension eligibility requirements and was provided with detailed information about required documents and application process.";
  const mockIntents = [
    "pension_inquiry",
    "document_requirements",
    "application_process",
  ];
  const mockEntities = [
    { type: "scheme", value: "Pension Scheme" },
    { type: "document", value: "Aadhaar Card" },
    { type: "document", value: "Income Certificate" },
  ];

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          className="w-[700px] sm:max-w-[700px] overflow-y-auto"
          side="right"
        >
          <SheetHeader className="sticky top-0 bg-background pb-4 border-b">
            <SheetTitle className="font-mono text-lg">
              Call Transcript
            </SheetTitle>
            <SheetDescription className="text-base">
              Call ID: {call.id} • {call.date} • Duration: {call.duration}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6 pb-6">
            {/* Call Summary */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                Summary
              </h3>
              <p className="text-sm text-foreground bg-muted rounded-lg p-4 leading-relaxed">
                {mockSummary}
              </p>
            </div>

            {/* Detected Intents */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                Detected Intents
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockIntents.map((intent) => (
                  <Badge
                    key={intent}
                    variant="secondary"
                    className="text-sm px-3 py-1"
                  >
                    {intent.replace("_", " ")}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Detected Entities */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                Detected Entities
              </h3>
              <div className="space-y-3">
                {mockEntities.map((entity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {entity.type}
                    </Badge>
                    <span className="text-sm text-foreground font-medium">
                      {entity.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consent Badge */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                Consent Status
              </h3>
              <Badge
                variant="default"
                className="text-sm px-3 py-1 bg-green-100 text-green-800 border-green-200"
              >
                ✓ Consent Provided
              </Badge>
            </div>

            <Separator />

            {/* Full Transcript */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-foreground">
                  Full Transcript
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyTranscript}
                  className="h-9 gap-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 max-h-80 overflow-y-auto">
                <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-mono">
                  {mockTranscript}
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShareModalOpen(true)}
                className="gap-2 h-9"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent h-9"
              >
                <MessageSquare className="h-4 w-4" />
                SMS
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent h-9"
              >
                <Phone className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <ShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        content={`Call Summary: ${mockSummary}\n\nTranscript: ${mockTranscript}`}
      />
    </>
  );
}
