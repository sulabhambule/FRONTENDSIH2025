"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, AlertCircle } from "lucide-react"

// Mock data - will be replaced with API data
const portfolioSections = [
  {
    id: 1,
    title: "Personal Information",
    description: "Basic details and contact information",
    completed: true,
    progress: 100
  },
  {
    id: 2,
    title: "Academic Records",
    description: "Transcripts, grades, and academic achievements",
    completed: true,
    progress: 100
  },
  {
    id: 3,
    title: "Certifications",
    description: "Professional and technical certifications",
    completed: false,
    progress: 75
  },
  {
    id: 4,
    title: "Project Portfolio",
    description: "Academic and personal projects showcase",
    completed: false,
    progress: 60
  },
  {
    id: 5,
    title: "Extracurricular Activities",
    description: "Clubs, sports, and community involvement",
    completed: false,
    progress: 45
  },
  {
    id: 6,
    title: "Internships & Work Experience",
    description: "Professional experience and internships",
    completed: false,
    progress: 30
  },
  {
    id: 7,
    title: "Skills Assessment",
    description: "Technical and soft skills evaluation",
    completed: false,
    progress: 20
  }
]

const overallProgress = Math.round(
  portfolioSections.reduce((acc, section) => acc + section.progress, 0) / portfolioSections.length
)

export function PortfolioProgress() {
  return (
    <Card className="border border-gray-200 bg-white">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">Portfolio Progress</CardTitle>
            <CardDescription className="text-gray-600">
              Complete your digital portfolio
            </CardDescription>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xl sm:text-2xl font-bold text-gray-800">{overallProgress}%</div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Progress value={overallProgress} className="h-3" />
        </div>

        <div className="space-y-3">
          {portfolioSections.slice(0, 5).map((section) => (
            <div key={section.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 space-y-2 sm:space-y-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {section.completed ? (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : section.progress > 0 ? (
                  <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-800 truncate">{section.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{section.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-shrink-0 sm:ml-2">
                <div className="flex-1 sm:text-right">
                  <div className="text-sm font-medium text-gray-700">{section.progress}%</div>
                  <Progress value={section.progress} className="w-full sm:w-12 h-1" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-200 text-gray-600 hover:bg-gray-100 flex-shrink-0"
                >
                  {section.completed ? "View" : "Update"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Complete Portfolio
            </Button>
            <Button variant="outline" className="w-full border-gray-200 text-gray-600 hover:bg-gray-50">
              Preview Portfolio
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}