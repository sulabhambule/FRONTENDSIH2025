import { Clock, Check, X, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Approval {
  id: string
  type: string
  student: string
  activity: string
  submittedAt: string
}

interface PendingApprovalsProps {
  approvals: Approval[]
}

export function PendingApprovals({ approvals }: PendingApprovalsProps) {
  const handleApprove = (approvalId: string) => {
    // TODO: Implement approval API call
    console.log('Approving:', approvalId)
    // You can add toast notification here
  }

  const handleReject = (approvalId: string) => {
    // TODO: Implement rejection API call
    console.log('Rejecting:', approvalId)
    // You can add toast notification here
  }

  const handleViewDetails = (approvalId: string) => {
    // TODO: Open detailed view modal
    console.log('Viewing details:', approvalId)
  }
  return (
    <Card className="animate-slide-up">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base sm:text-lg">
          <span className="flex items-center">
            <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-orange-600 flex-shrink-0" />
            Pending Approvals
          </span>
          <Badge variant="destructive" className="w-fit text-xs">{approvals.length}</Badge>
        </CardTitle>
        <CardDescription className="text-sm">Student activities awaiting your review</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {approvals.slice(0, 3).map((approval) => (
            <div key={approval.id} className="p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{approval.student}</h4>
                    <Badge variant="outline" className="text-orange-600 border-orange-200 text-xs w-fit">
                      {approval.type}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{approval.activity}</p>
                  <p className="text-xs text-gray-500">{approval.submittedAt}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 pt-3 border-t border-orange-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetails(approval.id)}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 text-xs w-full sm:w-auto"
                >
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                  Details
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(approval.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 text-xs flex-1 sm:flex-initial"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(approval.id)}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs flex-1 sm:flex-initial"
                  >
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {approvals.length > 3 && (
            <Button variant="link" className="w-full text-blue-600 text-sm">
              View all {approvals.length} pending approvals
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
