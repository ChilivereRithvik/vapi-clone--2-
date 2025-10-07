"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { agent: "Sales", success: 94, failed: 6 },
  { agent: "Support", success: 89, failed: 11 },
  { agent: "General", success: 96, failed: 4 },
  { agent: "Technical", success: 87, failed: 13 },
]

export function AgentPerformanceChart() {
  return (
    <ChartContainer
      config={{
        success: {
          label: "Success",
          color: "hsl(var(--chart-1))",
        },
        failed: {
          label: "Failed",
          color: "hsl(var(--destructive))",
        },
      }}
      className="h-[300px] w-full"
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="agent" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="success" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="failed" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
