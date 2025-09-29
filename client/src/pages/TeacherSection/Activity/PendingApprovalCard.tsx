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
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg border ${getTypeColor(approval.type)}`}>
              <TypeIcon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{approval.title}</CardTitle>
              <CardDescription>
                {approval.studentName} ({approval.rollNumber}) • {approval.category}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(approval.priority)}>{approval.priority} priority</Badge>
            <Badge variant="outline" className="capitalize">
              {approval.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">{approval.description}</p>

          {/* AI Verification Status */}
          {approval.aiVerification && (
            <div
              className={`p-3 rounded-lg border ${approval.aiVerification.status === "verified"
                ? "bg-green-50 border-green-200"
                : "bg-yellow-50 border-yellow-200"
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">AI Pre-Verification</span>
                <Badge variant={approval.aiVerification.status === "verified" ? "default" : "secondary"}>
                  {approval.aiVerification.status}
                </Badge>
              </div>
              {approval.aiVerification.confidence > 0 && (
                <p className="text-sm text-gray-600 mb-1">Confidence: {approval.aiVerification.confidence}%</p>
              )}
              <p className="text-sm text-gray-700">{approval.aiVerification.findings}</p>
            </div>
          )}

          {/* Proof Documents */}
          {approval.proofDocuments && approval.proofDocuments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Proof Documents</h4>
              <div className="flex flex-wrap gap-2">
                {approval.proofDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-700">{doc.name}</span>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Submitted {new Date(approval.submittedAt).toLocaleDateString()} at{" "}
              {new Date(approval.submittedAt).toLocaleTimeString()}
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => onReview(approval)}>
                <Eye className="h-3 w-3 mr-1" />
                Review
              </Button>
              <Button size="sm" variant="outline" onClick={() => onApproval(approval.id, "rejected")}>
                <X className="h-3 w-3 mr-1" />
                Reject
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => onApproval(approval.id, "approved")}
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Approve
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
