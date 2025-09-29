"use client"

import { useState, useEffect } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApprovalStats } from "./ApprovalStats"
import { ApprovalFilters } from "./ApprovalFilters"
import { PendingApprovalCard } from "./PendingApprovalCard"
import { ApprovalModal } from "./ApprovalModal"
import approvalData from "./activityApprovals.json"

export function ActivityApprovals() {
  const [selectedApproval, setSelectedApproval] = useState<any>(null)
  const [filterType, setFilterType] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchPendingApprovals();
  }, [])

  /*
  const fetchPendingApprovals = async () => {
    setLoading(true);
    try {
      const data = await api.getPendingApprovals();
      setApprovalData(data);
    } catch (error) {
      console.error('Failed to fetch approvals:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveActivity = async (activityId: string, comments?: string) => {
    try {
      await api.approveActivity(activityId, 'approved', comments);
      // Refresh data
    } catch (error) {
      console.error('Failed to approve activity:', error);
    }
  };

  const rejectActivity = async (activityId: string, reason: string) => {
    try {
      await api.approveActivity(activityId, 'rejected', reason);
      // Refresh data
    } catch (error) {
      console.error('Failed to reject activity:', error);
    }
  };
  */

  const handleApproval = (approvalId: string, status: "approved" | "rejected", comments?: string) => {
    // TODO: Implement approval logic
    console.log(`${status} approval:`, approvalId, comments)
    setSelectedApproval(null)
  }

  // const handleBulkApproval = (approvalIds: string[]) => {
  //   // TODO: Implement bulk approval logic
  //   console.log("Bulk approving:", approvalIds)
  // }

  const filteredApprovals = approvalData.pendingApprovals.filter((approval) => {
    const matchesType = filterType === "all" || approval.type === filterType
    const matchesPriority = filterPriority === "all" || approval.priority === filterPriority
    const matchesSearch =
      searchQuery === "" ||
      approval.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesType && matchesPriority && matchesSearch
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Approvals</h1>
          <p className="text-gray-600 mt-1">Review and approve student activities, competitions, and certifications</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="education-gradient text-white">Bulk Actions</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <ApprovalStats stats={approvalData.stats} />

      {/* Filters and Search */}
      <ApprovalFilters
        searchQuery={searchQuery}
        filterType={filterType}
        filterPriority={filterPriority}
        onSearchChange={setSearchQuery}
        onTypeChange={setFilterType}
        onPriorityChange={setFilterPriority}
      />

      {/* Approval Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending ({approvalData.stats.totalPending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvalData.stats.totalApproved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({approvalData.stats.totalRejected})</TabsTrigger>
        </TabsList>

        {/* Pending Approvals */}
        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredApprovals.map((approval) => (
              <PendingApprovalCard
                key={approval.id}
                approval={approval}
                onApproval={handleApproval}
                onReview={setSelectedApproval}
              />
            ))}
          </div>
        </TabsContent>

        {/* Approved Activities */}
        <TabsContent value="approved" className="space-y-4">
          <div className="space-y-4">
            {approvalData.approvedActivities.map((activity) => (
              <div key={activity.id} className="animate-slide-up">
                <div className="p-4 bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">
                          {activity.studentName} ({activity.rollNumber})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Approved by</p>
                        <p className="text-sm font-medium">{activity.approvedBy}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Points</p>
                        <p className="text-sm font-medium text-green-600">{activity.points}</p>
                      </div>
                      <p className="text-sm text-gray-500">{new Date(activity.approvedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Rejected Activities */}
        <TabsContent value="rejected" className="space-y-4">
          <div className="space-y-4">
            {approvalData.rejectedActivities.map((activity) => (
              <div key={activity.id} className="animate-slide-up">
                <div className="p-4 bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">
                          {activity.studentName} ({activity.rollNumber})
                        </p>
                        <p className="text-sm text-red-600 mt-1">Reason: {activity.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Rejected by</p>
                        <p className="text-sm font-medium">{activity.rejectedBy}</p>
                      </div>
                      <p className="text-sm text-gray-500">{new Date(activity.rejectedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed Review Modal */}
      <ApprovalModal
        approval={selectedApproval}
        onClose={() => setSelectedApproval(null)}
        onApproval={handleApproval}
      />
    </div>
  )
}
