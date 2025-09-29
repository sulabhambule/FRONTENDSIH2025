import { Upload, CheckCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function QuickActions() {
  return (
    <Card className="animate-slide-up">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
        <CardDescription className="text-sm">Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6">
        <Button className="w-full justify-start education-gradient text-white hover:opacity-90 text-sm sm:text-base py-2 sm:py-2.5">
          <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          Upload Attendance
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent text-sm sm:text-base py-2 sm:py-2.5">
          <Upload className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          Upload Marks
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent text-sm sm:text-base py-2 sm:py-2.5">
          <CheckCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          Review Approvals
        </Button>
        <Button variant="outline" className="w-full justify-start bg-transparent text-sm sm:text-base py-2 sm:py-2.5">
          <TrendingUp className="mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          Generate Reports
        </Button>
      </CardContent>
    </Card>
  )
}
