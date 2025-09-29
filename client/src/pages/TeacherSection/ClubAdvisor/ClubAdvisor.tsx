"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClubSelector } from "./ClubSelector"
import { ClubOverview } from "./ClubOverview"
import { ClubMembers } from "./ClubMembers"
import { ClubApprovals } from "./ClubApprovals"
import clubData from "./clubAdvisor.json"

export function ClubAdvisor() {
  const [selectedClub, setSelectedClub] = useState(clubData.clubs[0])
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchClubData();
  }, [])

  /*
  const fetchClubData = async () => {
    setLoading(true);
    try {
      const data = await api.getClubsAsAdvisor();
      setClubData(data);
    } catch (error) {
      console.error('Failed to fetch club data:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveContribution = async (contributionId: string, status: 'approved' | 'rejected', comments?: string) => {
    try {
      await api.approveClubContribution(contributionId, status, comments);
      // Refresh data
    } catch (error) {
      console.error('Failed to approve contribution:', error);
    }
  };
  */

  const handleApproval = (approvalId: string, status: "approved" | "rejected") => {
    // TODO: Implement approval logic
    console.log(`${status} approval:`, approvalId)
  }

  const clubMembers = clubData.members.filter((member) => member.clubId === selectedClub.id)
  const clubApprovals = clubData.pendingApprovals.filter((approval) => approval.clubId === selectedClub.id)
  const clubEvents = clubData.events.filter((event) => event.clubId === selectedClub.id)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Club Advisor</h1>
          <p className="text-gray-600 mt-1">Manage clubs where you serve as faculty advisor</p>
        </div>
        <Button className="education-gradient text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create New Club
        </Button>
      </div>

      {/* Club Selection */}
      <ClubSelector clubs={clubData.clubs} selectedClub={selectedClub} onClubSelect={setSelectedClub} />

      {/* Club Management Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ClubOverview selectedClub={selectedClub} clubApprovals={clubApprovals} clubEvents={clubEvents} />
        </TabsContent>

        <TabsContent value="members">
          <ClubMembers members={clubMembers} selectedClub={selectedClub} />
        </TabsContent>

        <TabsContent value="approvals">
          <ClubApprovals approvals={clubApprovals} onApproval={handleApproval} />
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Club Events</h3>
              <p className="text-gray-600">Manage and validate club events</p>
            </div>
            <Button className="education-gradient text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {clubEvents.map((event) => (
              <div key={event.id} className="animate-slide-up">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg">{event.title}</h4>
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <span
                    className={
                      event.status === "completed"
                        ? "bg-green-500 text-white px-2 py-1 rounded"
                        : "bg-blue-500 text-white px-2 py-1 rounded"
                    }
                  >
                    {event.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>Type: {event.type}</span>
                  <span>Participants: {event.participants}</span>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 bg-transparent border border-gray-300 rounded px-4 py-2 text-gray-600 hover:bg-gray-100">
                    <span className="mr-2">View Details</span>
                  </button>
                  {event.status === "completed" && (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">
                      <span className="mr-2">Validate</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Monthly Reports</h3>
              <p className="text-gray-600">Submit and manage club activity reports</p>
            </div>
            <Button className="education-gradient text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="animate-slide-up">
              <div className="bg-white rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">Submit New Report</h4>
                <div className="mb-4">
                  <label htmlFor="report-month" className="block text-sm font-medium text-gray-700">
                    Report Month
                  </label>
                  <select
                    id="report-month"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="feb-2024">February 2024</option>
                    <option value="jan-2024">January 2024</option>
                    <option value="dec-2023">December 2023</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="activities-count" className="block text-sm font-medium text-gray-700">
                    Number of Activities
                  </label>
                  <input
                    type="number"
                    id="activities-count"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="5"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="participants-count" className="block text-sm font-medium text-gray-700">
                    Total Participants
                  </label>
                  <input
                    type="number"
                    id="participants-count"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="78"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="report-summary" className="block text-sm font-medium text-gray-700">
                    Activity Summary
                  </label>
                  <textarea
                    id="report-summary"
                    rows={4}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="Summarize the club activities for this month..."
                  />
                </div>
                <Button className="w-full education-gradient text-white">Submit Report</Button>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="bg-white rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">Report History</h4>
                <div className="space-y-3">
                  {clubData.monthlyReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">{report.month}</h5>
                        <p className="text-sm text-gray-600">
                          {report.activitiesCount} activities • {report.participantsCount} participants
                        </p>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(report.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-500 text-white px-2 py-1 rounded">Submitted</span>
                        <button className="bg-transparent border border-gray-300 rounded px-4 py-2 text-gray-600 hover:bg-gray-100">
                          <span className="mr-2">View</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
