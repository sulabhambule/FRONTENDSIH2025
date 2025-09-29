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
      <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 lg:p-6 -m-3 sm:-m-4 lg:-m-6 mb-3 sm:mb-4 lg:mb-6">
          <button
            onClick={onClose}
            className="absolute right-2 sm:right-3 lg:right-4 top-2 sm:top-3 lg:top-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <DialogTitle className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold pr-8 sm:pr-10">
            {approval?.title}
          </DialogTitle>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 sm:mt-2 pr-8 sm:pr-10">
            {approval?.studentName} ({approval?.rollNumber}) • {approval?.category}
          </p>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-1 sm:px-0">
          <div className="space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <Label className="text-xs sm:text-sm font-medium text-gray-700">Description</Label>
              <p className="text-gray-700 mt-2 text-xs sm:text-sm leading-relaxed">{approval?.description}</p>
            </div>

            {/* AI Verification Results */}
            {approval?.aiVerification && (
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Label className="text-xs sm:text-sm font-medium text-gray-700">AI Verification Results</Label>
                <div className={`mt-2 sm:mt-3 p-2 sm:p-3 rounded-lg border ${approval.aiVerification.status === "verified"
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
                  }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <span className="text-xs sm:text-sm font-medium">Status: {approval.aiVerification.status}</span>
                    {approval.aiVerification.confidence > 0 && (
                      <Badge variant="outline" className="text-xs w-fit">
                        {approval.aiVerification.confidence}% confidence
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">{approval.aiVerification.findings}</p>
                </div>
              </div>
            )}

            {/* Proof Documents */}
            {approval?.proofDocuments && approval.proofDocuments.length > 0 && (
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 block">Proof Documents</Label>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {approval.proofDocuments.map((doc: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1">
                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-blue-700 font-medium truncate">{doc.name}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-blue-600 hover:bg-blue-100 flex-shrink-0 ml-2">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teacher Comments */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <Label htmlFor="teacher-comments" className="text-xs sm:text-sm font-medium text-gray-700">
                Your Comments
              </Label>
              <Textarea
                id="teacher-comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add your feedback or comments..."
                className="mt-2 min-h-[80px] sm:min-h-[100px] text-xs sm:text-sm"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-200 px-1 sm:px-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4 sm:px-6 text-xs sm:text-sm order-3 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleApproval("rejected")}
            className="px-4 sm:px-6 border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm order-2 sm:order-2"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Reject
          </Button>
          <Button
            onClick={() => handleApproval("approved")}
            className="px-4 sm:px-6 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm order-1 sm:order-3"
          >
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Approve
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
