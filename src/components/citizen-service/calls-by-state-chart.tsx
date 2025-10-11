"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const callsByState = [
  { state: "Uttar Pradesh", calls: 120 },
  { state: "Maharashtra", calls: 95 },
  { state: "Telangana", calls: 75 },
  { state: "Bihar", calls: 65 },
  { state: "Tamil Nadu", calls: 55 },
  { state: "West Bengal", calls: 50 },
  { state: "Others", calls: 180 },
];

export function CallsByStateChart() {
  return (
    <Card className="rounded-2xl border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold  text-card-foreground">
          Calls by State/District
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Distribution of calls across top states
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            calls: {
              label: "Calls",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={callsByState}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="state"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
              />
              <Bar
                dataKey="calls"
                fill="var(--color-calls)"
                radius={[4, 4, 0, 0]}
                stroke="hsl(var(--chart-1))"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
