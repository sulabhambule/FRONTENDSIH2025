"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

const attendanceStats = [
  { status: "Present", count: 47, percentage: 94 },
  { status: "Late", count: 2, percentage: 4 },
  { status: "Absent", count: 1, percentage: 2 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]

export function AttendanceStats() {
  // Chart.js data configuration
  const chartData = {
    labels: attendanceStats.map(item => item.status),
    datasets: [
      {
        data: attendanceStats.map(item => item.count),
        backgroundColor: COLORS,
        borderColor: COLORS,
        borderWidth: 2,
        spacing: 5,
      },
    ],
  }

  // Chart.js options configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll use custom legend below
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dataIndex = context.dataIndex
            const item = attendanceStats[dataIndex]
            return `${item.status}: ${item.count} classes (${item.percentage}%)`
          }
        }
      }
    },
    cutout: '60%', // This creates the doughnut effect (inner radius)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Statistics</CardTitle>
        <CardDescription>Overall attendance breakdown this semester</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div style={{ height: '200px', width: '100%' }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>

          <div className="space-y-2">
            {attendanceStats.map((item, index) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm font-medium">{item.status}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.count} ({item.percentage}%)
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm font-medium mb-2">Attendance Insights</div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• Excellent attendance record</p>
              <p>• No attendance warnings</p>
              <p>• Above university average (92%)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
