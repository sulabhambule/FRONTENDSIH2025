import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Award, FileCheck } from "lucide-react"

const quickActions = [
  {
    title: "Add Activity",
    description: "Record achievements",
    icon: Plus,
    action: "add-activity",
    color: "bg-blue-600 hover:bg-blue-700"
  },
  {
    title: "Upload Certificate",
    description: "Add documents",
    icon: Upload,
    action: "upload-cert",
    color: "bg-green-600 hover:bg-green-700"
  },
  {
    title: "Update Portfolio",
    description: "Edit profile",
    icon: Award,
    action: "update-portfolio",
    color: "bg-purple-600 hover:bg-purple-700"
  },
  {
    title: "Submit for Review",
    description: "Send for approval",
    icon: FileCheck,
    action: "submit-approval",
    color: "bg-orange-600 hover:bg-orange-700"
  }
]

export function QuickActions() {
  return (
    <Card className="border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Quick Actions</CardTitle>
        <CardDescription className="text-gray-600">
          Common tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              className={`h-auto p-3 sm:p-4 flex flex-col items-center space-y-2 text-white ${action.color} border-0 rounded-lg`}
            >
              <action.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <div className="text-center">
                <div className="text-sm font-medium">{action.title}</div>
                <div className="text-xs opacity-90 truncate">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}