"use client"

import { useState } from "react"
import { Award, BookOpen, Star, TrendingUp, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StudentProfileTabsProps {
  student: any
}

export function StudentProfileTabs({ student }: StudentProfileTabsProps) {
  const [newFeedback, setNewFeedback] = useState("")

  const handleAddFeedback = () => {
    if (newFeedback.trim()) {
      // TODO: Implement feedback addition
      // await api.addStudentFeedback(student.id, newFeedback);
      console.log("Adding feedback:", newFeedback)
      setNewFeedback("")
    }
  }

  return (
    <Tabs defaultValue="academic" className="space-y-4">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="academic">Academic</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
      </TabsList>

      {/* Academic Performance */}
      <TabsContent value="academic" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
              <CardDescription>Semester-wise CGPA and attendance trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {student.academicRecords.map((record: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{record.semester}</span>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-blue-600">{record.cgpa}</p>
                        <p className="text-xs text-gray-500">CGPA</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600">{record.attendance}%</p>
                        <p className="text-xs text-gray-500">Attendance</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Current Semester Marks</CardTitle>
              <CardDescription>Subject-wise performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {student.subjectMarks.map((subject: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{subject.subject}</p>
                      <p className="text-sm text-gray-600">{subject.credits} credits</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={subject.grade.startsWith("A") ? "default" : "secondary"}>{subject.grade}</Badge>
                      <span className="font-medium text-blue-600">{subject.marks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Activities */}
      <TabsContent value="activities" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-yellow-600" />
                Competitions & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.competitions.map((comp: any) => (
                  <div key={comp.id} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{comp.name}</h4>
                        <p className="text-sm text-gray-600">
                          {comp.level} • {comp.type}
                        </p>
                        <p className="text-xs text-gray-500">{new Date(comp.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">{comp.position}</Badge>
                        <p className="text-sm text-yellow-600 mt-1">{comp.points} points</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.certifications.map((cert: any) => (
                  <div key={cert.id} className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                        <p className="text-xs text-gray-500">Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                      </div>
                      <Badge variant={cert.verified ? "default" : "secondary"}>
                        {cert.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Projects */}
      <TabsContent value="projects" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Internships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.internships.map((internship: any) => (
                  <div key={internship.id} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900">{internship.role}</h4>
                    <p className="text-sm text-gray-600">{internship.company}</p>
                    <p className="text-xs text-gray-500">
                      {internship.duration} • {new Date(internship.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">{internship.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {internship.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.projects.map((project: any) => (
                  <div key={project.id} className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.title}</h4>
                        <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* AI Analysis */}
      <TabsContent value="analysis" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-yellow-600" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {student.aiAnalysis.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {student.aiAnalysis.areasForImprovement.map((area: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Career Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {student.aiAnalysis.careerRecommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Skill Gaps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {student.aiAnalysis.skillGaps.map((gap: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-700">{gap}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Teacher Feedback */}
      <TabsContent value="feedback" className="space-y-4">
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Previous Feedback</CardTitle>
            <CardDescription>Feedback from other teachers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {student.teacherFeedback.map((feedback: any) => (
                <div key={feedback.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{feedback.teacherName}</h4>
                      <p className="text-sm text-gray-600">{feedback.subject}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(feedback.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{feedback.feedback}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(feedback.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Mentorship */}
      <TabsContent value="mentorship" className="space-y-4">
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Add Mentorship Feedback</CardTitle>
            <CardDescription>Provide guidance and recommendations for {student.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="feedback-text">Your Feedback & Recommendations</Label>
              <Textarea
                id="feedback-text"
                placeholder="Share your observations, recommendations, and guidance for the student..."
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setNewFeedback("")}>
                Clear
              </Button>
              <Button className="education-gradient text-white" onClick={handleAddFeedback}>
                <Plus className="mr-2 h-4 w-4" />
                Add Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
