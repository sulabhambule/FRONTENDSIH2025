"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertCircle, User, Calendar } from "lucide-react"
import type { TeacherApproval } from "@/types/admin"

interface ApprovalsSummaryProps {
  approvals: TeacherApproval[]
  onApprove: (approvalId: string) => void
  onReject: (approvalId: string) => void
}

export function ApprovalsSummary({ approvals, onApprove, onReject }: ApprovalsSummaryProps) {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500 text-white">High</Badge>
      case "medium":
        return <Badge className="bg-admin-warning text-white">Medium</Badge>
      case "low":
        return <Badge className="bg-admin-info text-white">Low</Badge>
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "activity":
        return <AlertCircle className="w-4 h-4 text-admin-primary" />
      case "project":
        return <CheckCircle className="w-4 h-4 text-admin-success" />
      default:
        return <Clock className="w-4 h-4 text-admin-muted-foreground" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    return date.toLocaleDateString()
  }

  const totalPendingApprovals = approvals.reduce((total, teacher) => total + teacher.pendingApprovals.length, 0)

  return (
    <Card className="admin-metric-card p-6 admin-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-admin-foreground">Pending Approvals</h3>
          <p className="text-sm text-admin-muted-foreground">Faculty approval queue management</p>
        </div>
        <Badge variant="outline" className="border-admin-border text-admin-muted-foreground">
          {totalPendingApprovals} pending
        </Badge>
      </div>

      <div className="space-y-6">
        {approvals.map((teacherApproval) => (
          <div key={teacherApproval.teacherId}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-admin-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-admin-foreground">{teacherApproval.teacherName}</h4>
                <p className="text-sm text-admin-muted-foreground">
                  {teacherApproval.pendingApprovals.length} pending approvals
                </p>
              </div>
            </div>

            <div className="space-y-3 ml-11">
              {teacherApproval.pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-admin-border hover:bg-admin-secondary/30 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(approval.type)}
                    <div>
                      <h5 className="font-medium text-admin-foreground">{approval.title}</h5>
                      <p className="text-sm text-admin-muted-foreground">by {approval.studentName}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-3 h-3 text-admin-muted-foreground" />
                        <span className="text-xs text-admin-muted-foreground">
                          Submitted {formatDate(approval.submittedDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {getPriorityBadge(approval.priority)}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => onApprove(approval.id)}
                        className="bg-admin-success hover:bg-admin-success/90 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onReject(approval.id)}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {totalPendingApprovals === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-admin-success mx-auto mb-4" />
          <h3 className="text-lg font-medium text-admin-foreground mb-2">All caught up!</h3>
          <p className="text-admin-muted-foreground">No pending approvals at the moment</p>
        </div>
      )}
    </Card>
  )
}
