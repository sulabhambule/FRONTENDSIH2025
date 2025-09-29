"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle, Clock, X, Plus, Eye, Briefcase, Building, Users, TrendingUp, Send, MapPin, FileText, Star, Award, DollarSign } from "lucide-react"

const applications = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineering Intern",
    status: "applied",
    appliedDate: "2024-11-01",
    type: "internship",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Product Management Intern",
    status: "interview",
    appliedDate: "2024-10-15",
    type: "internship",
  },
  {
    id: 3,
    company: "Startup XYZ",
    position: "Full Stack Developer",
    status: "offer",
    appliedDate: "2024-10-20",
    type: "freelance",
  },
  {
    id: 4,
    company: "Amazon",
    position: "Data Science Intern",
    status: "rejected",
    appliedDate: "2024-09-30",
    type: "internship",
  },
  {
    id: 5,
    company: "Meta",
    position: "Frontend Developer",
    status: "applied",
    appliedDate: "2024-11-10",
    type: "internship",
  },
]

const internships = [
  {
    id: 1,
    company: "TechCorp Solutions",
    position: "Software Development Intern",
    duration: "3 months",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    location: "Mumbai, India",
    type: "internship",
    description: "Worked on developing web applications using React and Node.js",
    skills: ["React", "Node.js", "MongoDB", "Git"],
    achievements: ["Developed 3 full-stack applications", "Improved system performance by 25%"],
    supervisor: "John Smith",
    stipend: "₹25,000/month",
    offerLetter: "TechCorp_Offer_Letter.pdf",
    completionCertificate: "TechCorp_Completion.pdf",
    status: "approved",
  },
  {
    id: 2,
    company: "DataInsights Inc",
    position: "Data Analysis Intern",
    duration: "2 months",
    startDate: "2024-09-01",
    endDate: "2024-10-31",
    location: "Remote",
    type: "internship",
    description: "Analyzed customer data and created visualization dashboards",
    skills: ["Python", "Pandas", "Matplotlib", "SQL"],
    achievements: ["Created 5 interactive dashboards", "Identified key customer insights"],
    supervisor: "Sarah Johnson",
    stipend: "₹20,000/month",
    offerLetter: "DataInsights_Offer.pdf",
    completionCertificate: null,
    status: "pending",
  },
]

const freelanceProjects = [
  {
    id: 1,
    client: "Local Restaurant Chain",
    project: "E-commerce Website",
    duration: "2 months",
    startDate: "2024-07-01",
    endDate: "2024-08-31",
    type: "freelance",
    description: "Developed a complete e-commerce solution with payment integration",
    skills: ["React", "Stripe API", "Firebase", "CSS"],
    payment: "₹75,000",
    contract: "Restaurant_Contract.pdf",
    deliverables: ["Website", "Admin Panel", "Mobile App"],
    status: "approved",
  },
]

const interviews = [
  { id: 1, company: "Google", position: "SWE Intern", date: "2024-11-15", type: "Technical", status: "scheduled" },
  { id: 2, company: "Microsoft", position: "PM Intern", date: "2024-11-20", type: "Behavioral", status: "completed" },
  { id: 3, company: "Amazon", position: "Data Science", date: "2024-10-05", type: "Technical", status: "completed" },
]

export default function InternshipsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [addType, setAddType] = useState("application")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "offer":
      case "completed":
        return "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
      case "pending":
      case "applied":
      case "scheduled":
        return "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
      case "rejected":
        return "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
      case "interview":
        return "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "offer":
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
      case "applied":
      case "scheduled":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <X className="h-4 w-4" />
      case "interview":
        return <Users className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const totalApplications = applications.length
  const completedInternships = internships.filter((i) => i.status === "approved").length
  const totalInterviews = interviews.length
  const offerRate = Math.round((applications.filter((a) => a.status === "offer").length / totalApplications) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Internships & Opportunities</h1>
            <p className="text-gray-600">
              Track your job applications, internships, freelance projects, and interview progress.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Applications</CardTitle>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Send className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalApplications}</div>
              <p className="text-sm text-gray-600 mt-1">Companies applied to</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Internships</CardTitle>
              <div className="p-2 bg-green-50 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{completedInternships}</div>
              <p className="text-sm text-gray-600 mt-1">Completed internships</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Interviews</CardTitle>
              <div className="p-2 bg-amber-50 rounded-lg">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{totalInterviews}</div>
              <p className="text-sm text-gray-600 mt-1">Total interviews</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-2/3 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Success Rate</CardTitle>
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{offerRate}%</div>
              <p className="text-sm text-gray-600 mt-1">Offer conversion</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-1/3 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:grid-cols-4 bg-gray-100">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-700"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-700"
                >
                  Applications
                </TabsTrigger>
                <TabsTrigger
                  value="internships"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-700"
                >
                  Internships
                </TabsTrigger>
                <TabsTrigger
                  value="interviews"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-700"
                >
                  Interviews
                </TabsTrigger>
              </TabsList>

              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
                  <DialogHeader className="bg-gray-50 -m-6 p-6 mb-4 border-b border-gray-200">
                    <DialogTitle className="text-gray-900">Add New Entry</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Record your job applications, internships, or freelance work.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4 px-2">
                    <div className="space-y-3">
                      <Label htmlFor="entry-type" className="text-gray-900 font-medium">Entry Type</Label>
                      <Select value={addType} onValueChange={setAddType}>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="application">Job Application</SelectItem>
                          <SelectItem value="internship">Completed Internship</SelectItem>
                          <SelectItem value="freelance">Freelance Project</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {addType === "application" && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label htmlFor="company" className="text-blue-900 font-medium">Company</Label>
                            <Input
                              id="company"
                              placeholder="Company name"
                              className="border-blue-200 focus:border-blue-400"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="position" className="text-blue-900 font-medium">Position</Label>
                            <Input
                              id="position"
                              placeholder="Job title"
                              className="border-blue-200 focus:border-blue-400"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="application-proof" className="text-blue-900 font-medium">
                            Upload Application Proof
                          </Label>
                          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition-colors">
                            <Upload className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                            <p className="text-blue-700 font-medium">Upload confirmation email or screenshot</p>
                            <p className="text-blue-600 text-sm mt-1">PDF, PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      </>
                    )}

                    {addType === "internship" && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label htmlFor="company" className="text-blue-900 font-medium">Company</Label>
                            <Input
                              id="company"
                              placeholder="Company name"
                              className="border-blue-200 focus:border-blue-400"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="position" className="text-blue-900 font-medium">Position</Label>
                            <Input
                              id="position"
                              placeholder="Internship title"
                              className="border-blue-200 focus:border-blue-400"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="description" className="text-blue-900 font-medium">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your work and responsibilities"
                            className="border-blue-200 focus:border-blue-400 min-h-[100px]"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label htmlFor="start-date" className="text-blue-900 font-medium">Start Date</Label>
                            <Input
                              id="start-date"
                              type="date"
                              className="border-blue-200 focus:border-blue-400"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="end-date" className="text-blue-900 font-medium">End Date</Label>
                            <Input
                              id="end-date"
                              type="date"
                              className="border-blue-200 focus:border-blue-400"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="documents" className="text-blue-900 font-medium">
                            Upload Documents
                          </Label>
                          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition-colors">
                            <Upload className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                            <p className="text-blue-700 font-medium">
                              Upload offer letter, completion certificate, etc.
                            </p>
                            <p className="text-blue-600 text-sm mt-1">Multiple files supported</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <DialogFooter className="bg-blue-50 -m-6 p-6 mt-4 border-t border-blue-200">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddOpen(false)}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setIsAddOpen(false)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Submit for Approval
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/80 border-blue-200 shadow-lg">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <CardTitle className="text-blue-900">Application Progress</CardTitle>
                    <CardDescription className="text-blue-700">Track your job application pipeline</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-900 font-medium">Applied</span>
                        <span className="text-blue-700 font-semibold">
                          {applications.filter((a) => a.status === "applied").length}
                        </span>
                      </div>
                      <Progress
                        value={(applications.filter((a) => a.status === "applied").length / totalApplications) * 100}
                        className="h-3 bg-blue-100"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-900 font-medium">Interview Stage</span>
                        <span className="text-blue-700 font-semibold">
                          {applications.filter((a) => a.status === "interview").length}
                        </span>
                      </div>
                      <Progress
                        value={(applications.filter((a) => a.status === "interview").length / totalApplications) * 100}
                        className="h-3 bg-amber-100"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-900 font-medium">Offers Received</span>
                        <span className="text-blue-700 font-semibold">
                          {applications.filter((a) => a.status === "offer").length}
                        </span>
                      </div>
                      <Progress
                        value={(applications.filter((a) => a.status === "offer").length / totalApplications) * 100}
                        className="h-3 bg-green-100"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 border-blue-200 shadow-lg">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <CardTitle className="text-blue-900">Recent Activity</CardTitle>
                    <CardDescription className="text-blue-700">Latest updates on your applications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    {applications.slice(0, 4).map((app) => (
                      <div key={app.id} className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200">
                          <Building className="h-5 w-5 text-blue-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-blue-900">{app.company}</p>
                          <p className="text-xs text-blue-700">{app.position}</p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(app.status)}
                            {app.status}
                          </div>
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <Card className="bg-white/80 border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-900">Job Applications</CardTitle>
                  <CardDescription className="text-blue-700">Track all your job and internship applications</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-50 border-b border-blue-200">
                          <TableHead className="text-blue-900 font-semibold">Company</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Position</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Type</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Applied Date</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Status</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id} className="hover:bg-blue-50 transition-colors">
                            <TableCell className="font-medium text-blue-900">{app.company}</TableCell>
                            <TableCell className="text-blue-800">{app.position}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                                {app.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-blue-700">{app.appliedDate}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(app.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(app.status)}
                                  {app.status}
                                </div>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="internships" className="space-y-6">
              <div className="grid gap-6">
                {internships.map((internship) => (
                  <Card key={internship.id} className="bg-white/80 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3 text-blue-900">
                            <div className="p-2 bg-blue-200 rounded-lg">
                              <Briefcase className="h-5 w-5 text-blue-700" />
                            </div>
                            {internship.position}
                          </CardTitle>
                          <CardDescription className="text-blue-700 font-medium mt-2">
                            {internship.company} • {internship.duration}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(internship.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(internship.status)}
                            {internship.status}
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <p className="text-blue-800 leading-relaxed">{internship.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <Label className="font-semibold text-blue-900 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Duration
                          </Label>
                          <p className="text-blue-700 mt-1 font-medium">
                            {internship.startDate} to {internship.endDate}
                          </p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <Label className="font-semibold text-blue-900 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Location
                          </Label>
                          <p className="text-blue-700 mt-1 font-medium">{internship.location}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <Label className="font-semibold text-green-900 flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Stipend
                          </Label>
                          <p className="text-green-700 mt-1 font-medium">{internship.stipend}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <Label className="font-semibold text-purple-900 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Supervisor
                          </Label>
                          <p className="text-purple-700 mt-1 font-medium">{internship.supervisor}</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <Label className="font-semibold text-blue-900 mb-3 block">Skills Used</Label>
                        <div className="flex flex-wrap gap-2">
                          {internship.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-blue-300 text-blue-700 bg-blue-100 hover:bg-blue-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <Label className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Key Achievements
                        </Label>
                        <ul className="space-y-2">
                          {internship.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start gap-2 text-green-800">
                              <Star className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-blue-200">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Documents
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {freelanceProjects.map((project) => (
                  <Card key={project.id} className="bg-white/80 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3 text-purple-900">
                            <div className="p-2 bg-purple-200 rounded-lg">
                              <Building className="h-5 w-5 text-purple-700" />
                            </div>
                            {project.project}
                          </CardTitle>
                          <CardDescription className="text-purple-700 font-medium mt-2">
                            {project.client} • {project.duration}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(project.status)}
                            {project.status}
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <p className="text-purple-800 leading-relaxed">{project.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <Label className="font-semibold text-green-900 flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Payment
                          </Label>
                          <p className="text-green-700 mt-1 font-bold text-lg">{project.payment}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <Label className="font-semibold text-blue-900">Duration</Label>
                          <p className="text-blue-700 mt-1 font-medium">
                            {project.startDate} to {project.endDate}
                          </p>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <Label className="font-semibold text-purple-900 mb-3 block">Technologies Used</Label>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-purple-300 text-purple-700 bg-purple-100 hover:bg-purple-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <Label className="font-semibold text-blue-900 mb-3 block">Deliverables</Label>
                        <ul className="space-y-2">
                          {project.deliverables.map((deliverable, index) => (
                            <li key={index} className="flex items-start gap-2 text-blue-800">
                              <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interviews" className="space-y-6">
              <Card className="bg-white/80 border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-blue-900">Interview Schedule</CardTitle>
                  <CardDescription className="text-blue-700">Track your upcoming and completed interviews</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-50 border-b border-blue-200">
                          <TableHead className="text-blue-900 font-semibold">Company</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Position</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Interview Type</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Date</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Status</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {interviews.map((interview) => (
                          <TableRow key={interview.id} className="hover:bg-blue-50 transition-colors">
                            <TableCell className="font-medium text-blue-900">{interview.company}</TableCell>
                            <TableCell className="text-blue-800">{interview.position}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                                {interview.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-blue-700">{interview.date}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(interview.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(interview.status)}
                                  {interview.status}
                                </div>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
