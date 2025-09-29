"use client"

import { useState } from "react"
import { X, CheckCircle, FileText, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface ApprovalModalProps {
  approval: any
  onClose: () => void
  onApproval: (approvalId: string, status: "approved" | "rejected", comments?: string) => void
}

export function ApprovalModal({ approval, onClose, onApproval }: ApprovalModalProps) {
  const [comments, setComments] = useState("")

  const handleApproval = (status: "approved" | "rejected") => {
    onApproval(approval.id, status, comments)
  }

  return (
    <Dialog open={!!approval} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 -m-6 mb-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <DialogTitle className="text-xl font-semibold">
            {approval?.title}
          </DialogTitle>
          <p className="text-blue-100 text-sm mt-2">
            {approval?.studentName} ({approval?.rollNumber}) • {approval?.category}
          </p>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Label className="text-sm font-medium text-gray-700">Description</Label>
              <p className="text-gray-700 mt-2 text-sm leading-relaxed">{approval?.description}</p>
            </div>

            {/* AI Verification Results */}
            {approval?.aiVerification && (
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Label className="text-sm font-medium text-gray-700">AI Verification Results</Label>
                <div className={`mt-3 p-3 rounded-lg border ${approval.aiVerification.status === "verified"
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
                  }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Status: {approval.aiVerification.status}</span>
                    {approval.aiVerification.confidence > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {approval.aiVerification.confidence}% confidence
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{approval.aiVerification.findings}</p>
                </div>
              </div>
            )}

            {/* Proof Documents */}
            {approval?.proofDocuments && approval.proofDocuments.length > 0 && (
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Proof Documents</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {approval.proofDocuments.map((doc: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700 font-medium">{doc.name}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-100">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teacher Comments */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Label htmlFor="teacher-comments" className="text-sm font-medium text-gray-700">
                Your Comments
              </Label>
              <Textarea
                id="teacher-comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add your feedback or comments..."
                className="mt-2 min-h-[100px]"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleApproval("rejected")}
            className="px-6 border-red-200 text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button
            onClick={() => handleApproval("approved")}
            className="px-6 bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
