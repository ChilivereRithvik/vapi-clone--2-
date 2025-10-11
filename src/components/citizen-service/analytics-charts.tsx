"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  FunnelChart,
  Funnel,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface AnalyticsChartsProps {
  dateRange: string;
  stateFilter: string;
}

// Mock data for charts
const callsAndFCRData = [
  { date: "Jan 1", calls: 45, fcr: 87 },
  { date: "Jan 2", calls: 52, fcr: 85 },
  { date: "Jan 3", calls: 38, fcr: 89 },
  { date: "Jan 4", calls: 41, fcr: 86 },
  { date: "Jan 5", calls: 48, fcr: 88 },
  { date: "Jan 6", calls: 55, fcr: 84 },
  { date: "Jan 7", calls: 42, fcr: 90 },
  { date: "Jan 8", calls: 47, fcr: 87 },
  { date: "Jan 9", calls: 51, fcr: 85 },
  { date: "Jan 10", calls: 39, fcr: 91 },
  { date: "Jan 11", calls: 44, fcr: 88 },
  { date: "Jan 12", calls: 49, fcr: 86 },
  { date: "Jan 13", calls: 53, fcr: 83 },
  { date: "Jan 14", calls: 46, fcr: 89 },
  { date: "Jan 15", calls: 50, fcr: 87 },
];

const callsByLanguageData = [
  { language: "English", calls: 450 },
  { language: "Hindi", calls: 380 },
  { language: "Tamil", calls: 220 },
  { language: "Bengali", calls: 180 },
  { language: "Marathi", calls: 150 },
  { language: "Telugu", calls: 120 },
  { language: "Gujarati", calls: 100 },
  { language: "Kannada", calls: 90 },
];

const callsByStateData = [
  { state: "Maharashtra", calls: 320 },
  { state: "Delhi", calls: 280 },
  { state: "Karnataka", calls: 240 },
  { state: "Tamil Nadu", calls: 220 },
  { state: "West Bengal", calls: 180 },
  { state: "Gujarat", calls: 160 },
  { state: "Rajasthan", calls: 140 },
  { state: "Uttar Pradesh", calls: 350 },
];

const eligibilityFunnelData = [
  { name: "Total Inquiries", value: 1000, fill: "hsl(var(--chart-1))" },
  { name: "Eligibility Checked", value: 850, fill: "hsl(var(--chart-2))" },
  { name: "Eligible", value: 680, fill: "hsl(var(--chart-3))" },
  { name: "Applied", value: 520, fill: "hsl(var(--chart-4))" },
  { name: "Approved", value: 420, fill: "hsl(var(--chart-5))" },
];

export function AnalyticsCharts({
  dateRange,
  stateFilter,
}: AnalyticsChartsProps) {
  console.log("Filters applied:", { dateRange, stateFilter });
  return (
    <div className="space-y-6">
      {/* Calls and FCR Line Chart */}
      <Card className="rounded-2xl border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Daily Calls and First Call Resolution Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={callsAndFCRData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  yAxisId="calls"
                  orientation="left"
                  stroke="hsl(var(--chart-1))"
                />
                <YAxis
                  yAxisId="fcr"
                  orientation="right"
                  stroke="hsl(var(--chart-2))"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="calls"
                  type="monotone"
                  dataKey="calls"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: "hsl(var(--chart-1))",
                    strokeWidth: 2,
                  }}
                  name="Daily Calls"
                />
                <Line
                  yAxisId="fcr"
                  type="monotone"
                  dataKey="fcr"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: "hsl(var(--chart-2))",
                    strokeWidth: 2,
                  }}
                  name="FCR %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calls by Language */}
        <Card className="rounded-2xl border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Calls by Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callsByLanguageData} layout="horizontal">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    dataKey="language"
                    type="category"
                    stroke="hsl(var(--muted-foreground))"
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="calls"
                    fill="hsl(var(--chart-3))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Calls by State */}
        <Card className="rounded-2xl border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold font-mono text-card-foreground">
              Calls by State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callsByStateData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="state"
                    stroke="hsl(var(--muted-foreground))"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="calls"
                    fill="hsl(var(--chart-4))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eligibility Funnel Chart */}
      <Card className="rounded-2xl border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold  text-card-foreground">
            Eligibility Process Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Funnel
                  dataKey="value"
                  data={eligibilityFunnelData}
                  isAnimationActive
                >
                  <LabelList
                    position="center"
                    fill="hsl(var(--foreground))"
                    stroke="none"
                    fontSize={12}
                  />
                  {eligibilityFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            {eligibilityFunnelData.map((item, index) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name}
                  </span>
                </div>
                <div className="text-lg font-bold font-mono text-card-foreground">
                  {item.value.toLocaleString()}
                </div>
                {index > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {(
                      (item.value / eligibilityFunnelData[index - 1].value) *
                      100
                    ).toFixed(1)}
                    % conversion
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl border-border bg-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-card-foreground">
                15,234
              </div>
              <div className="text-sm text-muted-foreground">Total Calls</div>
              <div className="text-xs text-chart-3 mt-1">
                +12% from last month
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-card-foreground">
                87.3%
              </div>
              <div className="text-sm text-muted-foreground">Avg FCR Rate</div>
              <div className="text-xs text-chart-3 mt-1">
                +2.1% from last month
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-card-foreground">
                4:28
              </div>
              <div className="text-sm text-muted-foreground">
                Avg Handle Time
              </div>
              <div className="text-xs text-destructive mt-1">
                +0:15 from last month
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-card-foreground">
                2.1%
              </div>
              <div className="text-sm text-muted-foreground">
                Abandonment Rate
              </div>
              <div className="text-xs text-chart-3 mt-1">
                -0.3% from last month
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
