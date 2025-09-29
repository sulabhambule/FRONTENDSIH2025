"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const semesterData = [
  { semester: "Spr '23", gpa: 3.7, credits: 14 },
  { semester: "Fall '23", gpa: 3.65, credits: 15 },
  { semester: "Spr '24", gpa: 3.73, credits: 16 },
  { semester: "Fall '24", gpa: 3.85, credits: 15 },
]

export function SemesterComparison() {
  // Chart.js data configuration
  const chartData = {
    labels: semesterData.map(item => item.semester),
    datasets: [
      {
        label: 'GPA',
        data: semesterData.map(item => item.gpa),
        backgroundColor: 'hsl(var(--primary))',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  }

  // Chart.js options configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dataIndex = context.dataIndex
            const semester = semesterData[dataIndex]
            return [
              `GPA: ${semester.gpa}`,
              `Credits: ${semester.credits}`
            ]
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#888888',
          font: {
            size: 12,
          },
        },
      },
      y: {
        min: 3.0,
        max: 4.0,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#888888',
          font: {
            size: 12,
          },
          callback: function (value: any) {
            return `${value}`
          }
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Semester Comparison</CardTitle>
        <CardDescription>GPA trends across recent semesters</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px', width: '100%' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Best Semester</div>
            <div className="text-muted-foreground">Fall 2024 - 3.85 GPA</div>
          </div>
          <div>
            <div className="font-medium">Improvement</div>
            <div className="text-green-600">+0.15 from lowest</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
