"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"

const gradeDistribution = [
  { grade: "A", count: 8, percentage: 40 },
  { grade: "A-", count: 4, percentage: 20 },
  { grade: "B+", count: 5, percentage: 25 },
  { grade: "B", count: 2, percentage: 10 },
  { grade: "B-", count: 1, percentage: 5 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function GradeDistribution() {
  const data = {
    labels: gradeDistribution.map((g) => g.grade),
    datasets: [
      {
        data: gradeDistribution.map((g) => g.count),
        backgroundColor: COLORS,
        borderWidth: 2,
        borderColor: "hsl(var(--background))", // blends with shadcn theme
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // we'll use custom legend
      tooltip: {
        backgroundColor: "hsl(var(--popover))",
        titleColor: "hsl(var(--popover-foreground))",
        bodyColor: "hsl(var(--popover-foreground))",
        borderColor: "hsl(var(--border))",
        borderWidth: 1,
      },
    },
    cutout: "65%", // donut thickness
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Distribution</CardTitle>
        <CardDescription>
          Distribution of grades across all completed courses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-8">
          {/* Chart */}
          <div className="flex-1 max-w-xs">
            <Doughnut data={data} options={options} />
          </div>

          {/* Custom Legend */}
          <div className="space-y-2">
            {gradeDistribution.map((item, index) => (
              <div key={item.grade} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium">{item.grade}</span>
                <span className="text-sm text-muted-foreground">
                  {item.count} courses ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts"

// const gradeDistribution = [
//   { grade: "A", count: 8, percentage: 40 },
//   { grade: "A-", count: 4, percentage: 20 },
//   { grade: "B+", count: 5, percentage: 25 },
//   { grade: "B", count: 2, percentage: 10 },
//   { grade: "B-", count: 1, percentage: 5 },
// ]

// const COLORS = [
//   "hsl(var(--chart-1))",
//   "hsl(var(--chart-2))",
//   "hsl(var(--chart-3))",
//   "hsl(var(--chart-4))",
//   "hsl(var(--chart-5))",
// ]

// const chartConfig = {
//   count: {
//     label: "Courses",
//   },
// }

// export function GradeDistribution() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Grade Distribution</CardTitle>
//         <CardDescription>Distribution of grades across all completed courses</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-center space-x-8">
//           <div className="flex-1">
//             <ChartContainer config={chartConfig}>
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={gradeDistribution}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={100}
//                     paddingAngle={5}
//                     dataKey="count"
//                   >
//                     {gradeDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </div>
//           <div className="space-y-2">
//             {gradeDistribution.map((item, index) => (
//               <div key={item.grade} className="flex items-center space-x-2">
//                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
//                 <span className="text-sm font-medium">{item.grade}</span>
//                 <span className="text-sm text-muted-foreground">
//                   {item.count} courses ({item.percentage}%)
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
