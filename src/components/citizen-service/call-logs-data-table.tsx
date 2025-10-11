"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
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
import { Eye, FileText, UserPlus } from "lucide-react";
// import { mockCalls } from "@/lib/mock-data";
import { TranscriptDrawer } from "./transcript-drawer";
import { Link } from "react-router-dom";
// cide-react"
// import { mockCalls } from "@/lib/mock-data";

interface CallLogsDataTableProps {
  intentFilter: string;
  languageFilter: string;
  resultFilter: string;
  agentFilter: string;
}

export interface Call {
  id: string;
  caller: string;
  intent: string;
  result: "Completed" | "Transferred" | "Abandoned";
  duration: string;
  date: string;
  agent: string;
  transcript?: string;
}

export const mockCalls: Call[] = [
  {
    id: "1",
    caller: "•••1234",
    intent: "Pension Inquiry",
    result: "Completed",
    duration: "4:32",
    date: "2024-01-15 10:30",
    agent: "Agent Smith",
    transcript: `Agent: Hello, this is Agent Smith from Citizen Services. How can I help you today?

Caller: Hi, I wanted to know about pension eligibility. I'm 58 years old and wondering if I can apply.

Agent: I'd be happy to help you with pension information. For most pension schemes, the minimum age is 60 years. However, there are some early retirement options available. Can you tell me about your employment history?

Caller: I've been working in a private company for 25 years. Do I need any specific documents?

Agent: Yes, you'll need your Aadhaar card, employment certificates, salary slips for the last 6 months, and a bank account statement. I'm sending you a detailed list via SMS.

Caller: That's very helpful. Thank you so much.

Agent: You're welcome! Is there anything else I can help you with today?

Caller: No, that covers everything. Thank you.

Agent: Have a great day!`,
  },
  {
    id: "2",
    caller: "•••5678",
    intent: "Healthcare Scheme",
    result: "Transferred",
    duration: "2:15",
    date: "2024-01-15 10:25",
    agent: "Bot",
    transcript: `Bot: Hello! I'm here to help you with government schemes. What can I assist you with today?

Caller: I need information about health insurance schemes.

Bot: I can help with basic information about health insurance schemes. For detailed eligibility and application process, I'll transfer you to a specialist agent. Please hold on.

Caller: Okay, thank you.

Bot: Transferring you now to Agent Johnson who specializes in healthcare schemes.`,
  },
  {
    id: "3",
    caller: "•••9012",
    intent: "Education Grant",
    result: "Completed",
    duration: "6:45",
    date: "2024-01-15 10:20",
    agent: "Agent Johnson",
    transcript: `Agent: Good morning, this is Agent Johnson. How can I assist you today?

Caller: I'm calling about education grants for my daughter. She's starting college next year.

Agent: That's wonderful! There are several education grant schemes available. Can you tell me about your family's annual income and your daughter's academic performance?

Caller: Our annual income is around 2 lakh rupees, and she scored 85% in her 12th grade.

Agent: Excellent! She qualifies for multiple schemes. The Merit-based Education Grant provides up to ₹50,000 per year for students with above 80% marks from families with income below ₹3 lakhs.

Caller: That sounds perfect! What documents do we need?

Agent: You'll need her mark sheets, income certificate, caste certificate if applicable, bank account details, and Aadhaar cards for both you and your daughter. I'm sending you the complete application form and document checklist.

Caller: Thank you so much! When is the deadline?

Agent: The deadline is March 31st, so you have plenty of time. Make sure to apply early as it's processed on a first-come, first-served basis.

Caller: I really appreciate your help. This will make a huge difference for our family.

Agent: I'm glad I could help! Best of luck to your daughter with her studies.`,
  },
  {
    id: "4",
    caller: "•••3456",
    intent: "Housing Subsidy",
    result: "Abandoned",
    duration: "1:23",
    date: "2024-01-15 10:15",
    agent: "Bot",
  },
  {
    id: "5",
    caller: "•••7890",
    intent: "Employment Scheme",
    result: "Completed",
    duration: "3:18",
    date: "2024-01-15 10:10",
    agent: "Agent Davis",
  },
  {
    id: "6",
    caller: "•••2468",
    intent: "Food Security",
    result: "Transferred",
    duration: "2:55",
    date: "2024-01-15 10:05",
    agent: "Agent Wilson",
  },
  {
    id: "7",
    caller: "•••1357",
    intent: "Disability Benefits",
    result: "Completed",
    duration: "5:12",
    date: "2024-01-15 10:00",
    agent: "Agent Brown",
  },
  {
    id: "8",
    caller: "•••8024",
    intent: "Rural Development",
    result: "Completed",
    duration: "4:08",
    date: "2024-01-15 09:55",
    agent: "Bot",
  },
  {
    id: "9",
    caller: "•••6135",
    intent: "Senior Citizen Scheme",
    result: "Transferred",
    duration: "3:42",
    date: "2024-01-15 09:50",
    agent: "Agent Miller",
  },
  {
    id: "10",
    caller: "•••9753",
    intent: "Women Empowerment",
    result: "Completed",
    duration: "4:55",
    date: "2024-01-15 09:45",
    agent: "Agent Garcia",
  },
];

export function CallLogsDataTable({
  intentFilter,
  languageFilter,
  resultFilter,
  agentFilter,
}: CallLogsDataTableProps) {
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  // const router = useRouter();

  const getResultVariant = (result: string) => {
    switch (result) {
      case "Completed":
        return "default";
      case "Transferred":
        return "secondary";
      case "Abandoned":
        return "destructive";
      default:
        return "outline";
    }
  };

  const filteredCalls = mockCalls.filter((call) => {
    if (
      intentFilter !== "all" &&
      !call.intent.toLowerCase().includes(intentFilter)
    )
      return false;
    if (resultFilter !== "all" && call.result.toLowerCase() !== resultFilter)
      return false;
    if (
      agentFilter !== "all" &&
      !call.agent.toLowerCase().includes(agentFilter.replace("-", " "))
    )
      return false;
    return true;
  });

  const handleViewTranscript = (callId: string) => {
    setSelectedCall(callId);
    setTranscriptOpen(true);
  };

  const handleRunEligibility = (callId: string) => {
    const callData = mockCalls.find((call) => call.id === callId);
    if (callData) {
      sessionStorage.setItem("eligibilityCallData", JSON.stringify(callData));
      // router.push("/eligibility");
      // navigation("/eligibility");
      <Link to="/eligibility" replace={true} />;
    }
  };

  const handleCreateFollowUp = (callId: string) => {
    const callData = mockCalls.find((call) => call.id === callId);
    if (callData) {
      sessionStorage.setItem("followUpCallData", JSON.stringify(callData));

      <Link to="/follow-ups" replace={true} />;
    }
  };

  return (
    <>
      <Card className="rounded-2xl border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Call Logs ({filteredCalls.length} calls)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caller</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center  text-muted-foreground"
                  >
                    No calls found matching the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-mono">{call.caller}</TableCell>
                    <TableCell>{call.intent}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        English
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getResultVariant(call.result)}>
                        {call.result}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{call.duration}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {call.date}
                    </TableCell>
                    <TableCell>{call.agent}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewTranscript(call.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRunEligibility(call.id)}
                          className="h-8 w-8 p-0"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCreateFollowUp(call.id)}
                          className="h-8 w-8 p-0"
                        >
                          <UserPlus className="h-4 w-4" />
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

      <TranscriptDrawer
        open={transcriptOpen}
        onOpenChange={setTranscriptOpen}
        callId={selectedCall}
      />
    </>
  );
}
