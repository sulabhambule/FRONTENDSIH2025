import { Upload, Calendar, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AttendanceUpload() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Manual Attendance Entry</CardTitle>
          <CardDescription>Mark attendance for today's class</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
            <div>
              <Label htmlFor="session">Session</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full education-gradient text-white">
            <Calendar className="mr-2 h-4 w-4" />
            Start Attendance
          </Button>
        </CardContent>
      </Card>

      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Excel Upload</CardTitle>
          <CardDescription>Upload attendance data from Excel file</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag and drop your Excel file here, or click to browse</p>
            <Button variant="outline" className="mt-2 bg-transparent">
              Choose File
            </Button>
          </div>
          <Button className="w-full bg-transparent" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
