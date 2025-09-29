import { FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

interface GradeDistributionProps {
  gradeDistribution: Array<{
    grade: string
    count: number
    percentage: number
  }>
}

export function MarksUpload({ gradeDistribution }: GradeDistributionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Upload Marks</CardTitle>
          <CardDescription>Upload marks for assignments, tests, or exams</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exam-type">Assessment Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="midterm">Midterm</SelectItem>
                  <SelectItem value="final">Final Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="max-marks">Maximum Marks</Label>
              <Input type="number" id="max-marks" placeholder="100" />
            </div>
          </div>
          <div>
            <Label htmlFor="assessment-name">Assessment Name</Label>
            <Input id="assessment-name" placeholder="e.g., Assignment 1 - Data Structures" />
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Upload Excel file with student marks</p>
            <Button variant="outline" className="mt-2 bg-transparent">
              Choose File
            </Button>
          </div>
          <Button className="w-full education-gradient text-white">Upload Marks</Button>
        </CardContent>
      </Card>

      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
          <CardDescription>Current grade distribution for selected class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gradeDistribution.map((item) => (
              <div key={item.grade} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900 w-8">{item.grade}</span>
                  <Progress value={item.percentage} className="w-32" />
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{item.count} students</span>
                  <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
