"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, Clock, X, Plus, Eye, Calendar } from "lucide-react"

const seminars = [
  {
    id: 1,
    title: "Artificial Intelligence in Modern Healthcare",
    description: "Exploring AI applications in medical diagnosis and treatment",
    date: "2024-11-15",
    location: "Main Auditorium",
    organizer: "CS Department",
    type: "Seminar",
    learning: "Gained insights into AI/ML applications in healthcare, neural networks for medical imaging",
    certificates: ["AI_Healthcare_Certificate.pdf"],
    status: "approved",
    approvedBy: "Dr. Smith",
    approvalDate: "2024-11-20",
  },
  {
    id: 2,
    title: "Blockchain Technology Workshop",
    description: "Hands-on workshop on blockchain development and smart contracts",
    date: "2024-10-20",
    location: "Computer Lab 2",
    organizer: "Tech Club",
    type: "Workshop",
    learning: "Learned blockchain fundamentals, smart contract development using Solidity",
    certificates: ["Blockchain_Workshop.pdf"],
    status: "pending",
    approvedBy: null,
    approvalDate: null,
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals Conference",
    description: "Industry conference on latest cybersecurity trends and threats",
    date: "2024-09-25",
    location: "Convention Center",
    organizer: "Industry Expert",
    type: "Conference",
    learning: "Understanding of modern cyber threats, security protocols, and defense strategies",
    certificates: ["Cybersecurity_Conf.pdf", "Participation_Certificate.pdf"],
    status: "approved",
    approvedBy: "Prof. Johnson",
    approvalDate: "2024-09-30",
  },
  {
    id: 4,
    title: "Data Science and Analytics Seminar",
    description: "Advanced techniques in data analysis and machine learning",
    date: "2024-08-15",
    location: "Lecture Hall A",
    organizer: "Mathematics Department",
    type: "Seminar",
    learning: "Advanced statistical methods, data visualization techniques, predictive modeling",
    certificates: ["DataScience_Certificate.pdf"],
    status: "rejected",
    approvedBy: "Dr. Wilson",
    approvalDate: "2024-08-20",
  },
]

export default function SeminarsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedSeminar, setSelectedSeminar] = useState<(typeof seminars)[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <X className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredSeminars = seminars.filter((seminar) => {
    const statusMatch = filterStatus === "all" || seminar.status === filterStatus
    const typeMatch = filterType === "all" || seminar.type.toLowerCase() === filterType
    return statusMatch && typeMatch
  })

  const handleViewSeminar = (seminar: (typeof seminars)[0]) => {
    setSelectedSeminar(seminar)
    setIsViewOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-12 py-8 max-w-none">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seminars, Workshops & Conferences</h1>
            <p className="text-gray-600">
              Track your participation in academic and professional development events.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Total Events</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{seminars.length}</div>
              <p className="text-sm text-gray-600 mt-1">Across all categories</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-full rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Approved</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {seminars.filter((s) => s.status === "approved").length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Verified events</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-4/5 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Pending</CardTitle>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                {seminars.filter((s) => s.status === "pending").length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Awaiting approval</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 w-2/3 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Certificates</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{seminars.reduce((acc, s) => acc + s.certificates.length, 0)}</div>
              <p className="text-sm text-gray-600 mt-1">Total certificates</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 w-3/4 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {/* Filters and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex gap-4 flex-wrap">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32 border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
                <DialogHeader className="bg-gray-50 -m-6 p-6 mb-4 border-b border-gray-200">
                  <DialogTitle className="text-gray-900">Add Seminar/Workshop/Conference</DialogTitle>
                  <DialogDescription className="text-gray-600">Record your participation in academic and professional events.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-gray-900 font-medium">Event Title</Label>
                      <Input id="title" placeholder="Enter event title" className="border-gray-200 focus:border-blue-400" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="type" className="text-gray-900 font-medium">Event Type</Label>
                      <Select>
                        <SelectTrigger className="border-gray-200 focus:border-blue-400">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seminar">Seminar</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Brief description of the event" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organizer">Organizer</Label>
                      <Input id="organizer" placeholder="Department/Organization" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Event location" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="learning" className="text-gray-900 font-medium">Key Learnings</Label>
                    <Textarea
                      id="learning"
                      placeholder="What did you learn from this event?"
                      className="border-gray-200 focus:border-blue-400 min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="certificates" className="text-gray-900 font-medium">Upload Certificates/Proof</Label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg p-6 text-center transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Upload certificates, attendance proof, or photos</p>
                      <p className="text-xs text-gray-500 mt-1">Multiple files supported (PDF, JPG, PNG)</p>
                    </div>
                  </div>
                </div>
                <DialogFooter className="bg-gray-50 -m-6 mt-4 p-6 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setIsAddOpen(false)} className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Submit for Approval
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Events Table */}
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="overflow-hidden">
              <Table className="w-full table-fixed">
                <TableHeader className="bg-gray-50">
                  <TableRow className="border-gray-200 hover:bg-gray-50">
                    <TableHead className="text-gray-900 font-semibold w-[35%] px-3 py-3">Event Details</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[12%] px-3 py-3">Type</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[13%] px-3 py-3">Date</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[15%] px-3 py-3">Organizer</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[10%] px-3 py-3">Certificates</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[10%] px-3 py-3">Status</TableHead>
                    <TableHead className="text-gray-900 font-semibold w-[5%] px-3 py-3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSeminars.map((seminar) => (
                    <TableRow key={seminar.id}>
                      <TableCell className="px-3 py-4">
                        <div className="space-y-1">
                          <div className="font-medium text-sm truncate">{seminar.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{seminar.description}</div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <Badge variant="outline" className="text-xs">{seminar.type}</Badge>
                      </TableCell>
                      <TableCell className="px-3 py-4 text-sm truncate">{seminar.date}</TableCell>
                      <TableCell className="px-3 py-4 text-sm truncate">{seminar.organizer}</TableCell>
                      <TableCell className="px-3 py-4">
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{seminar.certificates.length}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <Badge className={`${getStatusColor(seminar.status)} text-xs`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(seminar.status)}
                            <span className="truncate">{seminar.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <Button variant="ghost" size="sm" onClick={() => handleViewSeminar(seminar)} className="h-8 w-8 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* View Seminar Dialog */}
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
              {selectedSeminar && (
                <>
                  <DialogHeader className="bg-gray-50 -m-6 p-6 mb-4 border-b border-gray-200">
                    <DialogTitle className="text-gray-900">{selectedSeminar.title}</DialogTitle>
                    <DialogDescription className="text-gray-600">Event details and approval status</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Type</Label>
                        <p className="text-sm text-muted-foreground">{selectedSeminar.type}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Date</Label>
                        <p className="text-sm text-muted-foreground">{selectedSeminar.date}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground">{selectedSeminar.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Organizer</Label>
                        <p className="text-sm text-muted-foreground">{selectedSeminar.organizer}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <p className="text-sm text-muted-foreground">{selectedSeminar.location}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Key Learnings</Label>
                      <p className="text-sm text-muted-foreground">{selectedSeminar.learning}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Certificates</Label>
                      <div className="space-y-2">
                        {selectedSeminar.certificates.map((cert, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(selectedSeminar.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(selectedSeminar.status)}
                              {selectedSeminar.status}
                            </div>
                          </Badge>
                        </div>
                      </div>
                      {selectedSeminar.approvedBy && (
                        <div className="text-right">
                          <Label className="text-sm font-medium">Approved By</Label>
                          <p className="text-sm text-muted-foreground">{selectedSeminar.approvedBy}</p>
                          <p className="text-xs text-muted-foreground">{selectedSeminar.approvalDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
