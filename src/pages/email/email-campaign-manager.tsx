import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, LayoutGrid } from "lucide-react";

export default function EmailCampaignManagerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Campaign Manager
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage all your email campaigns in one place
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Campaign Dashboard</CardTitle>
          </div>
          <CardDescription>
            View and manage all your email campaigns from this central dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Track performance, manage schedules, and optimize your email
            campaigns all in one place.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
