import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Trophy, Briefcase, Code, Brain, TrendingUp, Star } from "lucide-react"
import type { StudentData } from "@/types/admin"

interface StudentProfileProps {
  student: StudentData
}

export function StudentProfile({ student }: StudentProfileProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-admin-success text-white">Active</Badge>
      case "completed":
        return <Badge className="bg-admin-primary text-white">Completed</Badge>
      case "ongoing":
        return <Badge className="bg-admin-warning text-white">Ongoing</Badge>
      case "approved":
        return <Badge className="bg-admin-success text-white">Approved</Badge>
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
              <h1 className="text-2xl font-bold text-admin-foreground">{student.name}</h1>
              <p className="text-admin-muted-foreground">{student.rollNumber}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className="bg-admin-primary text-white">{student.department}</Badge>
                <Badge variant="outline" className="border-admin-border text-admin-foreground">
                  Year {student.year}, Sem {student.semester}
                </Badge>
                {getStatusBadge(student.status)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-admin-success">{student.cgpa}</div>
            <div className="text-sm text-admin-muted-foreground">CGPA</div>
            <div className="text-xl font-semibold text-admin-primary mt-2">{student.totalPoints}</div>
            <div className="text-sm text-admin-muted-foreground">Total Points</div>
          </div>
        </div>
      </Card>

      {/* Contact Info */}
      <Card className="admin-metric-card p-6 admin-fade-in">
        <h3 className="text-lg font-semibold text-admin-foreground mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-admin-muted-foreground" />
            <div>
              <p className="text-sm text-admin-muted-foreground">Email</p>
              <p className="text-admin-foreground">{student.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-admin-muted-foreground" />
            <div>
              <p className="text-sm text-admin-muted-foreground">Phone</p>
              <p className="text-admin-foreground">{student.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-admin-muted-foreground" />
            <div>
              <p className="text-sm text-admin-muted-foreground">Address</p>
              <p className="text-admin-foreground">{student.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-admin-muted-foreground" />
            <div>
              <p className="text-sm text-admin-muted-foreground">Parent Contact</p>
              <p className="text-admin-foreground">{student.parentContact}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="activities" className="admin-fade-in">
        <TabsList className="bg-admin-card border-admin-border">
          <TabsTrigger
            value="activities"
            className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
          >
            Activities
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-admin-primary data-[state=active]:text-white">
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="internships"
            className="data-[state=active]:bg-admin-primary data-[state=active]:text-white"
          >
            Internships
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-admin-primary data-[state=active]:text-white">
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="mt-6">
          <Card className="admin-metric-card p-6">
            <h3 className="text-lg font-semibold text-admin-foreground mb-4">Activities & Achievements</h3>
            <div className="space-y-4">
              {student.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-admin-border"
                >
                  <div className="flex items-center space-x-4">
                    <Trophy className="w-8 h-8 text-admin-warning" />
                    <div>
                      <h4 className="font-medium text-admin-foreground">{activity.title}</h4>
                      <p className="text-sm text-admin-muted-foreground">
                        {activity.domain} • {formatDate(activity.date)}
                      </p>
                      <p className="text-xs text-admin-muted-foreground">Verified by {activity.verifiedBy}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-admin-success text-white mb-2">{activity.points} pts</Badge>
                    <br />
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card className="admin-metric-card p-6">
            <h3 className="text-lg font-semibold text-admin-foreground mb-4">Projects</h3>
            <div className="space-y-4">
              {student.projects.map((project) => (
                <div key={project.id} className="p-4 rounded-lg border border-admin-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Code className="w-8 h-8 text-admin-primary" />
                      <div>
                        <h4 className="font-medium text-admin-foreground">{project.title}</h4>
                        <p className="text-sm text-admin-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-admin-muted-foreground">Duration: </span>
                      <span className="text-admin-foreground">{project.duration}</span>
                    </div>
                    <div>
                      <span className="text-admin-muted-foreground">Team Size: </span>
                      <span className="text-admin-foreground">{project.teamSize}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-admin-muted-foreground mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-admin-border text-admin-foreground">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="internships" className="mt-6">
          <Card className="admin-metric-card p-6">
            <h3 className="text-lg font-semibold text-admin-foreground mb-4">Internships</h3>
            <div className="space-y-4">
              {student.internships.map((internship) => (
                <div
                  key={internship.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-admin-border"
                >
                  <div className="flex items-center space-x-4">
                    <Briefcase className="w-8 h-8 text-admin-info" />
                    <div>
                      <h4 className="font-medium text-admin-foreground">{internship.role}</h4>
                      <p className="text-sm text-admin-muted-foreground">{internship.company}</p>
                      <p className="text-xs text-admin-muted-foreground">Duration: {internship.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {internship.stipend && (
                      <p className="text-sm font-medium text-admin-success">₹{internship.stipend}/month</p>
                    )}
                    {getStatusBadge(internship.status)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="admin-metric-card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-5 h-5 text-admin-primary" />
                <h3 className="text-lg font-semibold text-admin-foreground">AI-Driven Insights</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-admin-foreground mb-2">Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.aiInsights.strengths.map((strength) => (
                      <Badge key={strength} className="bg-admin-success text-white">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-admin-foreground mb-2">Areas for Improvement</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.aiInsights.weaknesses.map((weakness) => (
                      <Badge key={weakness} className="bg-admin-warning text-white">
                        {weakness}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="admin-metric-card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-admin-success" />
                <h3 className="text-lg font-semibold text-admin-foreground">Career Readiness</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-admin-muted-foreground">Placement Readiness</span>
                    <span className="text-2xl font-bold text-admin-success">
                      {student.aiInsights.placementReadiness}%
                    </span>
                  </div>
                  <div className="w-full bg-admin-secondary rounded-full h-2">
                    <div
                      className="bg-admin-success h-2 rounded-full"
                      style={{ width: `${student.aiInsights.placementReadiness}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-admin-foreground mb-2">Career Fit</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.aiInsights.careerFit.map((career) => (
                      <Badge key={career} className="bg-admin-primary text-white">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="admin-metric-card p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-admin-foreground mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {student.aiInsights.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-admin-secondary/30">
                    <Star className="w-5 h-5 text-admin-warning mt-0.5" />
                    <p className="text-sm text-admin-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
