"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan 1", calls: 245 },
  { date: "Jan 5", calls: 312 },
  { date: "Jan 10", calls: 289 },
  { date: "Jan 15", calls: 378 },
  { date: "Jan 20", calls: 421 },
  { date: "Jan 25", calls: 398 },
  { date: "Jan 30", calls: 456 },
]

export function CallVolumeChart() {
  return (
    <ChartContainer
      config={{
        calls: {
          label: "Calls",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px] w-full"
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillCalls" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="calls" stroke="hsl(var(--chart-1))" fill="url(#fillCalls)" strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  )
}
