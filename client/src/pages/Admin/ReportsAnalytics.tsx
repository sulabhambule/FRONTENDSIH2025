"use client"

import { useState, useMemo } from "react"
import type { Report, Student, SystemStats } from "../../types/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Input } from "../../components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { FileText, Download, Plus, BarChart3, PieChart, RefreshCw } from "lucide-react"
import studentsData from "./StudentManagement/students.json"
import dashboardData from "./AdminDashboard/dashboard.json"

export function ReportsAnalytics() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      title: "NAAC Accreditation Report 2024",
      type: "NAAC",
      generatedBy: "Admin",
      generatedAt: "2024-01-15T10:30:00Z",
      filters: {
        departments: ["CSE", "ECE", "ME"],
        years: [1, 2, 3, 4],
        dateRange: { start: "2023-01-01", end: "2023-12-31" },
      },
      status: "generated",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "Student Activity Analysis Q4 2023",
      type: "Internal",
      generatedBy: "Admin",
      generatedAt: "2024-01-10T14:20:00Z",
      filters: {
        departments: ["CSE"],
        years: [3, 4],
        domains: ["Technical", "Cultural"],
        dateRange: { start: "2023-10-01", end: "2023-12-31" },
      },
      status: "generated",
      downloadUrl: "#",
    },
    {
      id: "3",
      title: "NIRF Ranking Data 2024",
      type: "NIRF",
      generatedBy: "Admin",
      generatedAt: "2024-01-20T09:15:00Z",
      filters: {
        departments: ["CSE", "ECE", "ME", "CE"],
        years: [1, 2, 3, 4],
      },
      status: "generating",
    },
  ])

  const [isGenerating, setIsGenerating] = useState(false)
  const [newReportDialog, setNewReportDialog] = useState(false)
  const [newReport, setNewReport] = useState({
    title: "",
    type: "Internal" as Report["type"],
    filters: {
      departments: [] as string[],
      years: [] as number[],
      domains: [] as string[],
      dateRange: { start: "", end: "" },
    },
  })

  const departments = [...new Set(studentsData.students.map((s) => s.department))]
  const domains = ["Technical", "Cultural", "Sports", "Social Service", "Research"]
  const years = [1, 2, 3, 4]

  // Analytics data
  const analyticsData = useMemo(() => {
    const students = studentsData.students as Student[]
    const stats = dashboardData.systemStats as SystemStats

    return {
      departmentWise: departments.map((dept) => ({
        department: dept,
        students: students.filter((s) => s.department === dept).length,
        avgPoints: Math.round(
          students.filter((s) => s.department === dept).reduce((sum, s) => sum + s.totalPoints, 0) /
          students.filter((s) => s.department === dept).length || 1,
        ),
        avgCGPA: (
          students.filter((s) => s.department === dept).reduce((sum, s) => sum + s.cgpa, 0) /
          students.filter((s) => s.department === dept).length || 1
        ).toFixed(2),
      })),
      yearWise: years.map((year) => ({
        year,
        students: students.filter((s) => s.year === year).length,
        avgPoints: Math.round(
          students.filter((s) => s.year === year).reduce((sum, s) => sum + s.totalPoints, 0) /
          students.filter((s) => s.year === year).length || 1,
        ),
      })),
      domainWise: domains.map((domain) => ({
        domain,
        activities: students.reduce((sum, s) => sum + s.activities.filter((a) => a.domain === domain).length, 0),
      })),
      overallStats: stats,
    }
  }, [])

  const handleGenerateReport = async () => {
    if (!newReport.title.trim()) return

    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      const report: Report = {
        id: Date.now().toString(),
        title: newReport.title,
        type: newReport.type,
        generatedBy: "Admin",
        generatedAt: new Date().toISOString(),
        filters: newReport.filters,
        status: "generated",
        downloadUrl: "#",
      }

      setReports((prev) => [report, ...prev])
      setNewReportDialog(false)
      setNewReport({
        title: "",
        type: "Internal",
        filters: { departments: [], years: [], domains: [], dateRange: { start: "", end: "" } },
      })
      setIsGenerating(false)
    }, 3000)
  }

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "generated":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="admin-fade-in flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-admin-foreground">Reports & Analytics</h1>
          <p className="text-admin-muted-foreground mt-2 text-sm lg:text-base">
            Generate comprehensive reports and analyze performance data
          </p>
        </div>
        <Dialog open={newReportDialog} onOpenChange={setNewReportDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle className="text-lg lg:text-xl">Generate New Report</DialogTitle>
              <DialogDescription className="text-sm lg:text-base">Configure filters and settings for your custom report</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  value={newReport.title}
                  onChange={(e) => setNewReport((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter report title..."
                />
              </div>

              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select
                  value={newReport.type}
                  onValueChange={(value: Report["type"]) => setNewReport((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NAAC">NAAC</SelectItem>
                    <SelectItem value="NIRF">NIRF</SelectItem>
                    <SelectItem value="AICTE">AICTE</SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={newReport.filters.dateRange.start}
                    onChange={(e) =>
                      setNewReport((prev) => ({
                        ...prev,
                        filters: {
                          ...prev.filters,
                          dateRange: { ...prev.filters.dateRange, start: e.target.value },
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={newReport.filters.dateRange.end}
                    onChange={(e) =>
                      setNewReport((prev) => ({
                        ...prev,
                        filters: {
                          ...prev.filters,
                          dateRange: { ...prev.filters.dateRange, end: e.target.value },
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Departments</Label>
                <div className="grid grid-cols-2 gap-2">
                  {departments.map((dept) => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox
                        id={dept}
                        checked={newReport.filters.departments?.includes(dept)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewReport((prev) => ({
                              ...prev,
                              filters: {
                                ...prev.filters,
                                departments: [...(prev.filters.departments || []), dept],
                              },
                            }))
                          } else {
                            setNewReport((prev) => ({
                              ...prev,
                              filters: {
                                ...prev.filters,
                                departments: prev.filters.departments?.filter((d) => d !== dept) || [],
                              },
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={dept}>{dept}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setNewReportDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateReport} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 admin-fade-in">
        <Card>
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="flex items-center text-lg lg:text-xl">
              <BarChart3 className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
              Department-wise Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <div className="space-y-3 lg:space-y-4">
              {analyticsData.departmentWise.map((dept) => (
                <div
                  key={dept.department}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-admin-accent/20 rounded-lg gap-2"
                >
                  <div>
                    <p className="font-medium text-admin-foreground text-sm lg:text-base">{dept.department}</p>
                    <p className="text-xs lg:text-sm text-admin-muted-foreground">{dept.students} students</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs lg:text-sm font-medium">{dept.avgPoints} avg points</p>
                    <p className="text-xs lg:text-sm text-admin-muted-foreground">{dept.avgCGPA} CGPA</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 lg:p-6">
            <CardTitle className="flex items-center text-lg lg:text-xl">
              <PieChart className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
              Activity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0">
            <div className="space-y-3 lg:space-y-4">
              {analyticsData.domainWise.map((domain) => (
                <div
                  key={domain.domain}
                  className="flex justify-between items-center p-3 bg-admin-accent/20 rounded-lg"
                >
                  <p className="font-medium text-admin-foreground text-sm lg:text-base">{domain.domain}</p>
                  <Badge variant="secondary" className="text-xs lg:text-sm">{domain.activities} activities</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Reports */}
      <Card className="admin-fade-in">
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center text-lg lg:text-xl">
            <FileText className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
            Generated Reports
          </CardTitle>
          <CardDescription className="text-sm lg:text-base">View and download previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-3 lg:p-4 border rounded-lg hover:bg-admin-accent/20 transition-colors gap-3 lg:gap-0"
              >
                <div className="flex items-center space-x-3 lg:space-x-4 w-full lg:w-auto">
                  <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-admin-primary flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-admin-foreground text-sm lg:text-base truncate">{report.title}</h3>
                    <div className="flex flex-wrap items-center gap-1 lg:gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{report.type}</Badge>
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                    </div>
                    <p className="text-sm text-admin-muted-foreground mt-1">
                      Generated by {report.generatedBy} • {new Date(report.generatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {report.status === "generating" && (
                    <RefreshCw className="h-4 w-4 animate-spin text-admin-muted-foreground" />
                  )}
                  {report.status === "generated" && (
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
