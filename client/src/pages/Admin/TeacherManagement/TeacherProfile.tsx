import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  FileText,
  BarChart3,
  Star,
  Calendar,
} from "lucide-react"
import type { TeacherData } from "@/types/admin"

interface TeacherProfileProps {
  teacher: TeacherData
}

export function TeacherProfile({ teacher }: TeacherProfileProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-admin-success text-white">Active</Badge>
      case "on_leave":
        return <Badge className="bg-admin-warning text-white">On Leave</Badge>
      case "inactive":
        return <Badge className="bg-gray-500 text-white">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="admin-metric-card p-6 admin-fade-in">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-admin-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-admin-foreground">{teacher.name}</h1>
              <p className="text-admin-muted-foreground">{teacher.employeeId}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className="bg-admin-primary text-white">{teacher.department}</Badge>
                <Badge variant="outline" className="border-admin-border text-admin-foreground">
                  {teacher.designation}
                </Badge>
                {getStatusBadge(teacher.status)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-2xl font-bold text-admin-success">{teacher.rating}</span>
            </div>
            <div className="text-sm text-admin-muted-foreground">Faculty Rating</div>
            <div className="text-xl font-semibold text-admin-primary mt-2">{teacher.experience} years</div>
            <div className="text-sm text-admin-muted-foreground">Experience</div>
          </div>
        </div>
      </Card>

      {/* Contact & Basic Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="admin-metric-card p-6 admin-fade-in">
          <h3 className="text-lg font-semibold text-admin-foreground mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-admin-muted-foreground" />
              <div>
                <p className="text-sm text-admin-muted-foreground">Email</p>
                <p className="text-admin-foreground">{teacher.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-admin-muted-foreground" />
              <div>
                <p className="text-sm text-admin-muted-foreground">Phone</p>
                <p className="text-admin-foreground">{teacher.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-admin-muted-foreground" />
              <div>
                <p className="text-sm text-admin-muted-foreground">Address</p>
                <p className="text-admin-foreground">{teacher.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-admin-muted-foreground" />
              <div>
                <p className="text-sm text-admin-muted-foreground">Join Date</p>
                <p className="text-admin-foreground">{formatDate(teacher.joinDate)}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="admin-metric-card p-6 admin-fade-in">
          <h3 className="text-lg font-semibold text-admin-foreground mb-4">Academic Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-admin-muted-foreground">Qualification</p>
              <p className="text-admin-foreground font-medium">{teacher.qualification}</p>
            </div>
            <div>
              <p className="text-sm text-admin-muted-foreground">Specialization</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {teacher.specialization.map((spec) => (
                  <Badge key={spec} variant="outline" className="border-admin-border text-admin-foreground">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-admin-muted-foreground">Subjects Teaching</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {teacher.subjects.map((subject) => (
                  <Badge key={subject} className="bg-admin-primary text-white">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-admin-muted-foreground">Clubs Advised</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {teacher.clubsAdvised.map((club) => (
                  <Badge key={club} className="bg-admin-success text-white">
                    {club}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="contributions" className="admin-fade-in">
        <TabsList className="bg-admin-card border-admin-border">
          <TabsTrigger
            value="contributions"
            className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
          >
            Contributions
          </TabsTrigger>
          <TabsTrigger
            value="publications"
            className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
          >
            Publications
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
          >
            Achievements
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contributions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="admin-metric-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-8 h-8 text-admin-primary" />
                <div>
                  <h4 className="font-semibold text-admin-foreground">Teaching Hours</h4>
                  <p className="text-2xl font-bold text-admin-primary">{teacher.contributionMetrics.teachingHours}</p>
                </div>
              </div>
            </Card>

            <Card className="admin-metric-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-8 h-8 text-admin-success" />
                <div>
                  <h4 className="font-semibold text-admin-foreground">Research Projects</h4>
                  <p className="text-2xl font-bold text-admin-success">
                    {teacher.contributionMetrics.researchProjects}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="admin-metric-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-8 h-8 text-admin-warning" />
                <div>
                  <h4 className="font-semibold text-admin-foreground">Students Placed</h4>
                  <p className="text-2xl font-bold text-admin-warning">{teacher.contributionMetrics.studentsPlaced}</p>
                </div>
              </div>
            </Card>

            <Card className="admin-metric-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-8 h-8 text-admin-info" />
                <div>
                  <h4 className="font-semibold text-admin-foreground">Club Activities</h4>
                  <p className="text-2xl font-bold text-admin-info">{teacher.contributionMetrics.clubActivities}</p>
                </div>
              </div>
            </Card>

            <Card className="admin-metric-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <GraduationCap className="w-8 h-8 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-admin-foreground">Workshops</h4>
                  <p className="text-2xl font-bold text-purple-600">{teacher.contributionMetrics.workshopsConducted}</p>
                </div>
              </div>
            </Card>

            <Card className="admin-metric-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-8 h-8 text-pink-600" />
                <div>
                  <h4 className="font-semibold text-admin-foreground">Papers Published</h4>
                  <p className="text-2xl font-bold text-pink-600">{teacher.contributionMetrics.papersPublished}</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="publications" className="mt-6">
          <Card className="admin-metric-card p-6">
            <h3 className="text-lg font-semibold text-admin-foreground mb-4">Research Publications</h3>
            <div className="space-y-4">
              {teacher.publications.map((publication, index) => (
                <div key={index} className="p-4 rounded-lg border border-admin-border">
                  <h4 className="font-medium text-admin-foreground mb-2">{publication.title}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-admin-muted-foreground">{publication.journal}</p>
                      <p className="text-admin-muted-foreground">Published: {publication.year}</p>
                    </div>
                    <Badge className="bg-admin-success text-white">{publication.citations} citations</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <Card className="admin-metric-card p-6">
            <h3 className="text-lg font-semibold text-admin-foreground mb-4">Awards & Achievements</h3>
            <div className="space-y-4">
              {teacher.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-admin-border">
                  <Award className="w-8 h-8 text-admin-warning" />
                  <div>
                    <h4 className="font-medium text-admin-foreground">{achievement.title}</h4>
                    <p className="text-sm text-admin-muted-foreground">
                      {achievement.organization} • {achievement.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="admin-metric-card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-5 h-5 text-admin-primary" />
                <h3 className="text-lg font-semibold text-admin-foreground">Performance Metrics</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-muted-foreground">Students Guided</span>
                  <span className="text-lg font-semibold text-admin-foreground">{teacher.studentsGuided}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-muted-foreground">Approvals Completed</span>
                  <span className="text-lg font-semibold text-admin-foreground">{teacher.approvalsCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-muted-foreground">Pending Approvals</span>
                  <span className="text-lg font-semibold text-admin-warning">{teacher.approvalsPending}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-admin-muted-foreground">Faculty Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-lg font-semibold text-admin-success">{teacher.rating}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="admin-metric-card p-6">
              <h3 className="text-lg font-semibold text-admin-foreground mb-4">Contribution Summary</h3>
              <div className="space-y-3">
                <div className="text-center p-4 rounded-lg bg-admin-secondary/30">
                  <p className="text-2xl font-bold text-admin-primary">{teacher.contributionMetrics.teachingHours}</p>
                  <p className="text-sm text-admin-muted-foreground">Total Teaching Hours</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-admin-secondary/30">
                    <p className="text-lg font-bold text-admin-success">{teacher.contributionMetrics.studentsPlaced}</p>
                    <p className="text-xs text-admin-muted-foreground">Students Placed</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-admin-secondary/30">
                    <p className="text-lg font-bold text-admin-warning">
                      {teacher.contributionMetrics.papersPublished}
                    </p>
                    <p className="text-xs text-admin-muted-foreground">Papers Published</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
