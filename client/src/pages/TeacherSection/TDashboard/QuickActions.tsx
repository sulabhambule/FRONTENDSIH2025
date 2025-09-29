import { Upload, CheckCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function QuickActions() {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start education-gradient text-white hover:opacity-90">
          <Upload className="mr-2 h-4 w-4" />
          Upload Attendance
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <Upload className="mr-2 h-4 w-4" />
          Upload Marks
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <CheckCircle className="mr-2 h-4 w-4" />
          Review Approvals
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <TrendingUp className="mr-2 h-4 w-4" />
          Generate Reports
        </Button>
      </CardContent>
    </Card>
  )
}
