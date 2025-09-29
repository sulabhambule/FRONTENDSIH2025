"use client"

import { useState, useMemo } from "react"
import type { Announcement } from "../../types/admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
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
import { Send, Plus, MessageSquare, Users, Bell, Megaphone, Clock, CheckCircle, AlertCircle } from "lucide-react"
import studentsData from "./StudentManagement/students.json"

export function Communication() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Mid-Semester Examination Schedule",
      content:
        "The mid-semester examinations will be conducted from March 15-25, 2024. Please check your individual timetables on the student portal.",
      type: "general",
      targetAudience: "students",
      createdBy: "Admin",
      createdAt: "2024-01-20T10:00:00Z",
      status: "sent",
    },
    {
      id: "2",
      title: "Faculty Development Program",
      content:
        "A 5-day faculty development program on 'Modern Teaching Methodologies' will be conducted from February 10-14, 2024.",
      type: "general",
      targetAudience: "teachers",
      createdBy: "Admin",
      createdAt: "2024-01-18T14:30:00Z",
      status: "sent",
    },
    {
      id: "3",
      title: "Outstanding Achievement Recognition",
      content:
        "Congratulations to our students who won the National Level Hackathon! Special recognition ceremony on January 30th.",
      type: "achievement",
      targetAudience: "all",
      createdBy: "Admin",
      createdAt: "2024-01-15T09:15:00Z",
      status: "sent",
    },
    {
      id: "4",
      title: "Library Maintenance Notice",
      content:
        "The central library will be closed for maintenance from February 1-3, 2024. Digital resources will remain accessible.",
      type: "urgent",
      targetAudience: "all",
      createdBy: "Admin",
      createdAt: "2024-01-22T16:45:00Z",
      scheduledFor: "2024-01-25T08:00:00Z",
      status: "scheduled",
    },
  ])

  const [newAnnouncementDialog, setNewAnnouncementDialog] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "general" as Announcement["type"],
    targetAudience: "all" as Announcement["targetAudience"],
    targetDepartments: [] as string[],
    scheduledFor: "",
  })

  // const [activeTab, setActiveTab] = useState("announcements")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")

  const departments = [...new Set(studentsData.students.map((s) => s.department))]

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((announcement) => {
      if (filterStatus !== "all" && announcement.status !== filterStatus) return false
      if (filterType !== "all" && announcement.type !== filterType) return false
      return true
    })
  }, [announcements, filterStatus, filterType])

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) return

    const announcement: Announcement = {
      id: Date.now().toString(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      type: newAnnouncement.type,
      targetAudience: newAnnouncement.targetAudience,
      targetDepartments: newAnnouncement.targetDepartments.length > 0 ? newAnnouncement.targetDepartments : undefined,
      createdBy: "Admin",
      createdAt: new Date().toISOString(),
      scheduledFor: newAnnouncement.scheduledFor || undefined,
      status: newAnnouncement.scheduledFor ? "scheduled" : "sent",
    }

    setAnnouncements((prev) => [announcement, ...prev])
    setNewAnnouncementDialog(false)
    setNewAnnouncement({
      title: "",
      content: "",
      type: "general",
      targetAudience: "all",
      targetDepartments: [],
      scheduledFor: "",
    })
  }

  const getTypeIcon = (type: Announcement["type"]) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="h-4 w-4" />
      case "achievement":
        return <CheckCircle className="h-4 w-4" />
      case "reminder":
        return <Clock className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: Announcement["type"]) => {
    switch (type) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "achievement":
        return "bg-green-100 text-green-800"
      case "reminder":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusColor = (status: Announcement["status"]) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAudienceCount = (announcement: Announcement) => {
    switch (announcement.targetAudience) {
      case "students":
        return announcement.targetDepartments
          ? studentsData.students.filter((s) => announcement.targetDepartments!.includes(s.department)).length
          : studentsData.students.length
      case "teachers":
        return 45 // Mock teacher count
      case "all":
        return studentsData.students.length + 45
      default:
        return 0
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="admin-fade-in flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-admin-foreground">Communication Center</h1>
          <p className="text-admin-muted-foreground mt-2">
            Manage announcements and communicate with students and faculty
          </p>
        </div>
        <Dialog open={newAnnouncementDialog} onOpenChange={setNewAnnouncementDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>Compose and schedule announcements for students and faculty</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter announcement title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your announcement content..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={newAnnouncement.type}
                    onValueChange={(value: Announcement["type"]) =>
                      setNewAnnouncement((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Select
                    value={newAnnouncement.targetAudience}
                    onValueChange={(value: Announcement["targetAudience"]) =>
                      setNewAnnouncement((prev) => ({ ...prev, targetAudience: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="students">Students Only</SelectItem>
                      <SelectItem value="teachers">Teachers Only</SelectItem>
                      <SelectItem value="department">Specific Departments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {newAnnouncement.targetAudience === "department" && (
                <div className="space-y-3">
                  <Label>Select Departments</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {departments.map((dept) => (
                      <div key={dept} className="flex items-center space-x-2">
                        <Checkbox
                          id={dept}
                          checked={newAnnouncement.targetDepartments.includes(dept)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewAnnouncement((prev) => ({
                                ...prev,
                                targetDepartments: [...prev.targetDepartments, dept],
                              }))
                            } else {
                              setNewAnnouncement((prev) => ({
                                ...prev,
                                targetDepartments: prev.targetDepartments.filter((d) => d !== dept),
                              }))
                            }
                          }}
                        />
                        <Label htmlFor={dept}>{dept}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="scheduled">Schedule For Later (Optional)</Label>
                <Input
                  id="scheduled"
                  type="datetime-local"
                  value={newAnnouncement.scheduledFor}
                  onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, scheduledFor: e.target.value }))}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setNewAnnouncementDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAnnouncement}>
                  <Send className="h-4 w-4 mr-2" />
                  {newAnnouncement.scheduledFor ? "Schedule" : "Send Now"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 admin-fade-in">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-admin-muted-foreground">Total Announcements</p>
                <p className="text-2xl font-bold text-admin-foreground">{announcements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-admin-muted-foreground">Sent This Month</p>
                <p className="text-2xl font-bold text-admin-foreground">
                  {announcements.filter((a) => a.status === "sent").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-admin-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-admin-foreground">
                  {announcements.filter((a) => a.status === "scheduled").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-admin-muted-foreground">Total Reach</p>
                <p className="text-2xl font-bold text-admin-foreground">{studentsData.students.length + 45}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements Management */}
      <Card className="admin-fade-in">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Megaphone className="h-5 w-5 mr-2" />
                Announcements
              </CardTitle>
              <CardDescription>Manage and track all announcements</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-4 border rounded-lg hover:bg-admin-accent/20 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-admin-foreground">{announcement.title}</h3>
                    <Badge className={getTypeColor(announcement.type)}>
                      {getTypeIcon(announcement.type)}
                      <span className="ml-1">{announcement.type}</span>
                    </Badge>
                    <Badge className={getStatusColor(announcement.status)}>{announcement.status}</Badge>
                  </div>
                  <div className="text-right text-sm text-admin-muted-foreground">
                    <p>{new Date(announcement.createdAt).toLocaleDateString()}</p>
                    <p>{getAudienceCount(announcement)} recipients</p>
                  </div>
                </div>
                <p className="text-admin-muted-foreground mb-3">{announcement.content}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-admin-muted-foreground">
                      Target: {announcement.targetAudience}
                      {announcement.targetDepartments && ` (${announcement.targetDepartments.join(", ")})`}
                    </span>
                    {announcement.scheduledFor && (
                      <span className="text-admin-muted-foreground">
                        Scheduled: {new Date(announcement.scheduledFor).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-admin-muted-foreground">By {announcement.createdBy}</span>
                </div>
              </div>
            ))}
            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-8">
                <p className="text-admin-muted-foreground">No announcements found matching your filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
