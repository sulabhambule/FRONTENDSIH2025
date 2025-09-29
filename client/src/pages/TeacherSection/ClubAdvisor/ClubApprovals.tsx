"use client"

import { CheckCircle, X, FileText, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Approval {
  id: string
  studentName: string
  rollNumber: string
  activityType: string
  title: string
  description: string
  proofUrl?: string
  submittedAt: string
  clubId: string
  status: string
}

interface ClubApprovalsProps {
  approvals: Approval[]
  onApproval: (approvalId: string, status: "approved" | "rejected") => void
}

export function ClubApprovals({ approvals, onApproval }: ClubApprovalsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
          <p className="text-gray-600">Review and approve student contributions</p>
        </div>
        <Badge variant="destructive">{approvals.length} pending</Badge>
      </div>

      <div className="space-y-4">
        {approvals.map((approval) => (
          <Card key={approval.id} className="animate-slide-up">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{approval.title}</CardTitle>
                  <CardDescription>
                    Submitted by {approval.studentName} ({approval.rollNumber})
                  </CardDescription>
                </div>
                <Badge variant="outline">{approval.activityType}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">{approval.description}</p>

                {approval.proofUrl && (
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-700">Proof document attached</span>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Submitted on {new Date(approval.submittedAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
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

                <div className="pt-4 border-t border-gray-100">
                  <Label htmlFor={`comments-${approval.id}`}>Comments (optional)</Label>
                  <Textarea
                    id={`comments-${approval.id}`}
                    placeholder="Add your feedback or comments..."
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
