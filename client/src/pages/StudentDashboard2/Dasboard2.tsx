import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, FolderOpen, Trophy, Calendar, TrendingUp, BookOpen, Award } from "lucide-react"

export default function Dashboard2() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Welcome back, John!
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Here's an overview of your academic journey and achievements.</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">CGPA</CardTitle>
              <div className="p-2 bg-blue-100 rounded-md">
                <GraduationCap className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-gray-900">8.7</div>
              <p className="text-xs text-gray-500">+0.2 from last semester</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Credits</CardTitle>
              <div className="p-2 bg-blue-100 rounded-md">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-gray-900">142</div>
              <p className="text-xs text-gray-500">18 credits remaining</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Active Clubs</CardTitle>
              <div className="p-2 bg-blue-100 rounded-md">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <p className="text-xs text-gray-500">2 leadership roles</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Projects</CardTitle>
              <div className="p-2 bg-blue-100 rounded-md">
                <FolderOpen className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <p className="text-xs text-gray-500">3 ongoing projects</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Leadership Roles</CardTitle>
              <div className="p-2 bg-blue-100 rounded-md">
                <Trophy className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <p className="text-xs text-gray-500">Active positions</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Semester Progress
              </CardTitle>
              <CardDescription>Current semester completion status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Attendance</span>
                  <span className="text-sm font-semibold text-gray-900">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Assignments</span>
                  <span className="text-sm font-semibold text-gray-900">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Course Completion</span>
                  <span className="text-sm font-semibold text-gray-900">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Award className="h-5 w-5 text-blue-600" />
                Recent Achievements
              </CardTitle>
              <CardDescription>Your latest accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Dean's List Recognition</p>
                  <p className="text-xs text-gray-600">Achieved for Fall 2024</p>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Trophy className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Hackathon Winner</p>
                  <p className="text-xs text-gray-600">1st place in TechFest 2024</p>
                </div>
                <Badge variant="outline">Verified</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Workshop Completion</p>
                  <p className="text-xs text-gray-600">AI/ML Fundamentals</p>
                </div>
                <Badge variant="outline">Certified</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Calendar className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="justify-start gap-2 h-10 hover:bg-gray-50"
              >
                <Calendar className="h-4 w-4" />
                Add Seminar
              </Button>

              <Button
                variant="outline"
                className="justify-start gap-2 h-10 hover:bg-gray-50"
              >
                <Trophy className="h-4 w-4" />
                Log Competition
              </Button>

              <Button
                variant="outline"
                className="justify-start gap-2 h-10 hover:bg-gray-50"
              >
                <FolderOpen className="h-4 w-4" />
                Upload Project
              </Button>

              <Button
                variant="outline"
                className="justify-start gap-2 h-10 hover:bg-gray-50"
              >
                <TrendingUp className="h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
