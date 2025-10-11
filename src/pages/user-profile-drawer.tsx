"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// import type { User } from "@/lib/users-data";
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  language: string;
  timezone: string;
  dob: string;
  age: number;
  tags: string[];
  optIns: {
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  lastContact: Date;
  status: "Active" | "Blocked" | "Unverified";
  created: Date;
  owner: string;
  leadSource?: string;
  score?: number;
  segment?: string;
};

export const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1-555-0101",
    city: "New York",
    country: "United States",
    language: "English",
    timezone: "America/New_York",
    dob: "1990-05-15",
    age: 34,
    tags: ["VIP", "Newsletter"],
    optIns: { sms: true, email: true, whatsapp: false },
    lastContact: new Date("2025-01-08"),
    status: "Active",
    created: new Date("2024-01-15"),
    owner: "Sarah Chen",
    leadSource: "Website",
    score: 85,
  },
];

import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Globe,
  Calendar,
  UserIcon,
  TagIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type UserProfileDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
};

export function UserProfileDrawer({
  open,
  onOpenChange,
  user,
}: UserProfileDrawerProps) {
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>User Profile</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {user.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Badge
              variant="secondary"
              className={
                user.status === "Active" ? "bg-green-500/10 text-green-700" : ""
              }
            >
              {user.status}
            </Badge>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="conversations">Conversations</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="consent">Consent</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Identity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">DOB / Age:</span>
                    <span>
                      {user.dob} ({user.age} years)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Language:</span>
                    <span>{user.language}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location:</span>
                    <span>
                      {user.city}, {user.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Timezone:</span>
                    <span>{user.timezone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Owner:</span>
                    <span>{user.owner}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Opt-ins</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <Label>SMS</Label>
                    </div>
                    <Switch checked={user.optIns.sms} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label>Email</Label>
                    </div>
                    <Switch checked={user.optIns.email} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Label>WhatsApp</Label>
                    </div>
                    <Switch checked={user.optIns.whatsapp} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.leadSource && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        Lead Source:
                      </span>{" "}
                      {user.leadSource}
                    </div>
                  )}
                  {user.score !== undefined && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Lead Score:</span>{" "}
                      {user.score}
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="text-muted-foreground">Last Contact:</span>{" "}
                    {formatDistanceToNow(user.lastContact, { addSuffix: true })}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created:</span>{" "}
                    {user.created.toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-3 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Email sent</p>
                        <p className="text-muted-foreground">
                          Welcome email delivered
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 days ago
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-3 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Chat conversation</p>
                        <p className="text-muted-foreground">
                          Support inquiry resolved
                        </p>
                        <p className="text-xs text-muted-foreground">
                          5 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversations" className="space-y-4">
              <Tabs defaultValue="chat">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="call">Call</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="space-y-3 mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Support Inquiry</p>
                          <span className="text-xs text-muted-foreground">
                            5 days ago
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          User asked about product features and pricing...
                        </p>
                        <Button variant="outline" size="sm">
                          View Full Thread
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="text-center text-sm text-muted-foreground py-8">
                    No more chat conversations
                  </div>
                </TabsContent>
                <TabsContent value="call" className="mt-4">
                  <div className="text-center text-sm text-muted-foreground py-8">
                    No call records found
                  </div>
                </TabsContent>
                <TabsContent value="email" className="space-y-3 mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Welcome Email</p>
                          <span className="text-xs text-muted-foreground">
                            2 days ago
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Welcome to our platform! Here's how to get started...
                        </p>
                        <Badge
                          variant="secondary"
                          className="bg-green-500/10 text-green-700"
                        >
                          Delivered
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Button size="sm">Add Note</Button>
              <div className="text-center text-sm text-muted-foreground py-8">
                No notes yet
              </div>
            </TabsContent>

            <TabsContent value="tags" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {user.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-2">
                    <TagIcon className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button size="sm">Add Tag</Button>
            </TabsContent>

            <TabsContent value="consent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Consent History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">SMS Consent</p>
                    <p className="text-muted-foreground">
                      Granted on {user.created.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Source: Website signup form
                    </p>
                  </div>
                  <Separator />
                  <div className="text-sm">
                    <p className="font-medium">Email Consent</p>
                    <p className="text-muted-foreground">
                      Granted on {user.created.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Source: Website signup form
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Export Data
                </Button>
                <Button variant="outline" size="sm">
                  Anonymize
                </Button>
                <Button variant="destructive" size="sm">
                  Forget User
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
