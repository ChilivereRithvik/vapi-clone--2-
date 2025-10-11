import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  trend?: "up" | "down";
}

export function KpiCard({ title, value, change, trend }: KpiCardProps) {
  const isPositive = change.startsWith("+");
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;

  return (
    <Card className="rounded-2xl border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {TrendIcon && <TrendIcon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold font-mono text-card-foreground">
            {value}
          </div>
          <Badge
            variant={isPositive ? "default" : "secondary"}
            className="text-xs"
          >
            {change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
