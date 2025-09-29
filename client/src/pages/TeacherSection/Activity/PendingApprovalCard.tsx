"use client"

import { Award, BookOpen, Heart, FileText, Eye, CheckCircle, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PendingApproval {
  id: string
  studentName: string
  rollNumber: string
  type: string
  category: string
  title: string
  description: string
  proofDocuments?: Array<{ name: string; url: string; type: string }>
  submittedAt: string
  priority: string
  aiVerification?: {
    status: string
    confidence: number
    findings: string
  }
}

interface PendingApprovalCardProps {
  approval: PendingApproval
  onApproval: (approvalId: string, status: "approved" | "rejected") => void
  onReview: (approval: PendingApproval) => void
}

export function PendingApprovalCard({ approval, onApproval, onReview }: PendingApprovalCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "competition":
        return Award
      case "workshop":
        return BookOpen
      case "volunteer":
        return Heart
      case "course":
        return BookOpen
      default:
        return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "competition":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "workshop":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "volunteer":
        return "text-green-600 bg-green-50 border-green-200"
      case "course":
        return "text-purple-600 bg-purple-50 border-purple-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const TypeIcon = getTypeIcon(approval.type)

  return (
    <Card className="animate-slide-up card-hover">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <div className={`p-1.5 sm:p-2 rounded-lg border ${getTypeColor(approval.type)}`}>
              <TypeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm sm:text-base lg:text-lg">{approval.title}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {approval.studentName} ({approval.rollNumber}) • {approval.category}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 ml-6 sm:ml-0">
            <Badge className={`${getPriorityColor(approval.priority)} text-xs sm:text-xs`}>{approval.priority} priority</Badge>
            <Badge variant="outline" className="capitalize text-xs sm:text-xs">
              {approval.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm text-gray-700">{approval.description}</p>

          {/* AI Verification Status */}
          {approval.aiVerification && (
            <div
              className={`p-2 sm:p-3 rounded-lg border ${approval.aiVerification.status === "verified"
                ? "bg-green-50 border-green-200"
                : "bg-yellow-50 border-yellow-200"
                }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2">
                <span className="text-xs sm:text-sm font-medium">AI Pre-Verification</span>
                <Badge variant={approval.aiVerification.status === "verified" ? "default" : "secondary"} className="text-xs w-fit">
                  {approval.aiVerification.status}
                </Badge>
              </div>
              {approval.aiVerification.confidence > 0 && (
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Confidence: {approval.aiVerification.confidence}%</p>
              )}
              <p className="text-xs sm:text-sm text-gray-700">{approval.aiVerification.findings}</p>
            </div>
          )}

          {/* Proof Documents */}
          {approval.proofDocuments && approval.proofDocuments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-medium text-gray-900">Proof Documents</h4>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                {approval.proofDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between sm:justify-start space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-blue-700 truncate">{doc.name}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 flex-shrink-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 sm:pt-4 border-t border-gray-100 gap-3 sm:gap-0">
            <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
              Submitted {new Date(approval.submittedAt).toLocaleDateString()}
              <span className="hidden sm:inline"> at {new Date(approval.submittedAt).toLocaleTimeString()}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 order-1 sm:order-2">
              <Button size="sm" variant="outline" onClick={() => onReview(approval)} className="text-xs sm:text-sm">
                <Eye className="h-3 w-3 mr-1" />
                Review
              </Button>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onApproval(approval.id, "rejected")} className="text-xs sm:text-sm flex-1 sm:flex-none">
                  <X className="h-3 w-3 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm flex-1 sm:flex-none"
                  onClick={() => onApproval(approval.id, "approved")}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
