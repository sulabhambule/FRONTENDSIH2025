"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const gradeData = [
  { month: "Jan", gpa: 3.2 },
  { month: "Feb", gpa: 3.4 },
  { month: "Mar", gpa: 3.6 },
  { month: "Apr", gpa: 3.7 },
  { month: "May", gpa: 3.85 },
]

const chartConfig = {
  gpa: {
    label: "GPA",
    color: "hsl(var(--chart-1))",
  },
}

export function GradeChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Academic Performance Trend</CardTitle>
        <CardDescription>Your GPA progression throughout the semester</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={gradeData}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                domain={[3.0, 4.0]}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                type="monotone"
                dataKey="gpa"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "var(--color-primary)", opacity: 0.25 },
                }}
                style={{
                  stroke: "var(--color-primary)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
