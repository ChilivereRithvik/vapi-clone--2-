import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, MessageSquare } from "lucide-react";
// import { mockFollowUps } from "@/lib/mock-data";

export interface FollowUp {
  id: string;
  caller: string;
  scheme: string;
  dueDate: string;
  channel: "Phone" | "SMS" | "WhatsApp";
  notes: string;
  status: "Due Today" | "Pending Docs" | "Waiting Citizen" | "Escalated";
}

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

export function FollowUpsDue() {
  const dueTodayFollowUps = mockFollowUps.filter(
    (followUp) => followUp.status === "Due Today"
  );

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

  return (
    <Card className="rounded-2xl border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold font-mono text-card-foreground">
          Follow-ups Due Today
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dueTodayFollowUps.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No follow-ups due today
            </p>
          ) : (
            dueTodayFollowUps.map((followUp) => (
              <div
                key={followUp.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-mono text-sm text-card-foreground">
                      {followUp.caller}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs flex items-center gap-1"
                    >
                      {getChannelIcon(followUp.channel)}
                      {followUp.channel}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {followUp.scheme}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {followUp.notes}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
