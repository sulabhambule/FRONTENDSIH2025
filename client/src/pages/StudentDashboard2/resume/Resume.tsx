"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  FileText,
  Download,
  Eye,
  Settings,
  Palette,
  Layout,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Edit,
} from "lucide-react"

const resumeTemplates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and modern design perfect for corporate roles",
    preview: "/placeholder.svg?height=300&width=200&text=Professional+Template",
    category: "Corporate",
  },
  {
    id: 2,
    name: "Creative",
    description: "Colorful and dynamic layout for creative industries",
    preview: "/placeholder.svg?height=300&width=200&text=Creative+Template",
    category: "Creative",
  },
  {
    id: 3,
    name: "Academic",
    description: "Traditional format ideal for academic and research positions",
    preview: "/placeholder.svg?height=300&width=200&text=Academic+Template",
    category: "Academic",
  },
  {
    id: 4,
    name: "Tech",
    description: "Modern tech-focused design with emphasis on skills",
    preview: "/placeholder.svg?height=300&width=200&text=Tech+Template",
    category: "Technology",
  },
]

const resumeVersions = [
  {
    id: 1,
    name: "Software Engineering Roles",
    template: "Tech",
    lastModified: "2024-11-15",
    sections: ["Contact", "Summary", "Experience", "Projects", "Skills", "Education"],
    targetAudience: "Tech Companies",
  },
  {
    id: 2,
    name: "Graduate School Applications",
    template: "Academic",
    lastModified: "2024-11-10",
    sections: ["Contact", "Education", "Research", "Publications", "Awards", "Experience"],
    targetAudience: "Universities",
  },
  {
    id: 3,
    name: "General Applications",
    template: "Professional",
    lastModified: "2024-11-05",
    sections: ["Contact", "Summary", "Experience", "Education", "Skills", "Achievements"],
    targetAudience: "All Industries",
  },
]

const availableSections = [
  { id: "contact", name: "Contact Information", required: true, icon: User },
  { id: "summary", name: "Professional Summary", required: false, icon: FileText },
  { id: "experience", name: "Work Experience", required: false, icon: Briefcase },
  { id: "education", name: "Education", required: true, icon: GraduationCap },
  { id: "skills", name: "Technical Skills", required: false, icon: Settings },
  { id: "projects", name: "Projects", required: false, icon: Layout },
  { id: "achievements", name: "Achievements", required: false, icon: Award },
  { id: "certifications", name: "Certifications", required: false, icon: Badge },
  { id: "publications", name: "Publications", required: false, icon: FileText },
  { id: "research", name: "Research Experience", required: false, icon: GraduationCap },
]

export default function ResumePage() {
  const [selectedTemplate, setSelectedTemplate] = useState(resumeTemplates[0])
  // const [isCustomizeOpen, setIsCustomizeOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedSections, setSelectedSections] = useState(["contact", "summary", "experience", "education", "skills"])
  const [activeTab, setActiveTab] = useState("builder")

  const handleSectionToggle = (sectionId: string) => {
    const section = availableSections.find((s) => s.id === sectionId)
    if (section?.required) return // Can't toggle required sections

    setSelectedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
            <p className="text-gray-600">
              Create customizable resumes for different purposes using your student data.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Resume Versions</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{resumeVersions.length}</div>
              <p className="text-sm text-gray-600 mt-1">Different versions</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-3/4 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Templates</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Layout className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{resumeTemplates.length}</div>
              <p className="text-sm text-gray-600 mt-1">Available templates</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 w-full rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Auto-Generated</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <Settings className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">100%</div>
              <p className="text-sm text-gray-600 mt-1">Data integration</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-full rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Downloads</CardTitle>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Download className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">12</div>
              <p className="text-sm text-gray-600 mt-1">This month</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 w-2/3 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-3 bg-gray-50 border border-gray-200">
                <TabsTrigger
                  value="builder"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
                >
                  Builder
                </TabsTrigger>
                <TabsTrigger
                  value="templates"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
                >
                  Templates
                </TabsTrigger>
                <TabsTrigger
                  value="versions"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
                >
                  My Resumes
                </TabsTrigger>
              </TabsList>

              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Resume
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
                  <DialogHeader className="bg-gray-50 -m-6 p-6 mb-4 border-b border-gray-200">
                    <DialogTitle className="text-blue-900">Create New Resume</DialogTitle>
                    <DialogDescription className="text-blue-700">
                      Choose a template and customize your resume for specific purposes.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4 px-2">
                    <div className="space-y-3">
                      <Label htmlFor="resume-name" className="text-blue-900 font-medium">Resume Name</Label>
                      <Input
                        id="resume-name"
                        placeholder="e.g., Software Engineering Roles"
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="target-audience" className="text-blue-900 font-medium">Target Audience</Label>
                      <Select>
                        <SelectTrigger className="border-blue-200 focus:border-blue-400">
                          <SelectValue placeholder="Select target audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech-companies">Tech Companies</SelectItem>
                          <SelectItem value="startups">Startups</SelectItem>
                          <SelectItem value="corporations">Large Corporations</SelectItem>
                          <SelectItem value="universities">Universities</SelectItem>
                          <SelectItem value="research">Research Institutions</SelectItem>
                          <SelectItem value="general">General Applications</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="template" className="text-blue-900 font-medium">Template</Label>
                      <Select>
                        <SelectTrigger className="border-blue-200 focus:border-blue-400">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {resumeTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.name.toLowerCase()}>
                              {template.name} - {template.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-blue-900 font-medium">Include Sections</Label>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {availableSections.map((section) => (
                            <div key={section.id} className="flex items-center space-x-3">
                              <Switch
                                id={section.id}
                                checked={selectedSections.includes(section.id)}
                                onCheckedChange={() => handleSectionToggle(section.id)}
                                disabled={section.required}
                              />
                              <Label htmlFor={section.id} className="text-sm text-blue-800">
                                {section.name}
                                {section.required && <span className="text-red-500 ml-1">*</span>}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="bg-blue-50 -m-6 p-6 mt-4 border-t border-blue-200">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateOpen(false)}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setIsCreateOpen(false)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Create Resume
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <TabsContent value="builder" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1 space-y-6">
                  <Card className="bg-white/80 border-blue-200 shadow-lg">
                    <CardHeader className="bg-blue-50 border-b border-blue-100">
                      <CardTitle className="text-blue-900">Resume Customization</CardTitle>
                      <CardDescription className="text-blue-700">Customize your resume content and appearance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="space-y-3">
                        <Label className="text-blue-900 font-medium">Template</Label>
                        <Select
                          value={selectedTemplate.name}
                          onValueChange={(value) => {
                            const template = resumeTemplates.find((t) => t.name === value)
                            if (template) setSelectedTemplate(template)
                          }}
                        >
                          <SelectTrigger className="border-blue-200 focus:border-blue-400">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {resumeTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.name}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-blue-900 font-medium">Color Scheme</Label>
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500 cursor-pointer border-3 border-blue-600 shadow-md hover:scale-110 transition-transform"></div>
                          <div className="w-10 h-10 rounded-lg bg-green-500 cursor-pointer border-2 border-green-300 shadow-md hover:scale-110 transition-transform"></div>
                          <div className="w-10 h-10 rounded-lg bg-purple-500 cursor-pointer border-2 border-purple-300 shadow-md hover:scale-110 transition-transform"></div>
                          <div className="w-10 h-10 rounded-lg bg-red-500 cursor-pointer border-2 border-red-300 shadow-md hover:scale-110 transition-transform"></div>
                          <div className="w-10 h-10 rounded-lg bg-gray-800 cursor-pointer border-2 border-gray-600 shadow-md hover:scale-110 transition-transform"></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-blue-900 font-medium">Font Style</Label>
                        <Select defaultValue="inter">
                          <SelectTrigger className="border-blue-200 focus:border-blue-400">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="roboto">Roboto</SelectItem>
                            <SelectItem value="open-sans">Open Sans</SelectItem>
                            <SelectItem value="lato">Lato</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button className="w-full border-blue-300 text-blue-700 hover:bg-blue-50" variant="outline">
                        <Palette className="h-4 w-4 mr-2" />
                        Advanced Styling
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 border-blue-200 shadow-lg">
                    <CardHeader className="bg-blue-50 border-b border-blue-100">
                      <CardTitle className="text-blue-900">Data Sources</CardTitle>
                      <CardDescription className="text-blue-700">Auto-populate from your student data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-900">Academic Records</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-900">Projects</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-900">Internships</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-900">Competitions</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="text-sm font-medium text-blue-900">Certifications</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Volunteer Work</span>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card className="bg-white/80 border-blue-200 shadow-lg">
                    <CardHeader className="bg-blue-50 border-b border-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-blue-900">Resume Preview</CardTitle>
                          <CardDescription className="text-blue-700">Live preview of your resume</CardDescription>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="border-2 border-blue-200 rounded-lg p-8 bg-white min-h-[600px] shadow-inner">
                        {/* Resume Preview Content */}
                        <div className="space-y-6">
                          <div className="text-center border-b-2 border-blue-200 pb-6">
                            <h1 className="text-3xl font-bold text-blue-900">John Doe</h1>
                            <p className="text-blue-700 font-medium text-lg mt-2">Software Engineering Student</p>
                            <p className="text-blue-600 mt-2">john.doe@university.edu • +91 9876543210 • Mumbai, India</p>
                          </div>

                          <div>
                            <h2 className="text-xl font-bold mb-3 text-blue-800 border-b border-blue-200 pb-2">Professional Summary</h2>
                            <p className="text-blue-700 leading-relaxed">
                              Passionate computer science student with strong foundation in full-stack development, machine
                              learning, and competitive programming. Proven track record of winning hackathons and
                              contributing to open source projects.
                            </p>
                          </div>

                          <div>
                            <h2 className="text-xl font-bold mb-3 text-blue-800 border-b border-blue-200 pb-2">Education</h2>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h3 className="font-semibold text-blue-900">Bachelor of Technology - Computer Science</h3>
                                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">2022-2026</span>
                                </div>
                                <p className="text-blue-700 mt-1">University of Mumbai • CGPA: 8.7/10</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-bold mb-3 text-blue-800 border-b border-blue-200 pb-2">Technical Skills</h2>
                            <div className="flex flex-wrap gap-2">
                              {["React", "Node.js", "Python", "Java", "MongoDB", "PostgreSQL", "AWS", "Docker"].map(
                                (skill) => (
                                  <Badge key={skill} variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                                    {skill}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-bold mb-3 text-blue-800 border-b border-blue-200 pb-2">Projects</h2>
                            <div className="space-y-4">
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h3 className="font-semibold text-blue-900">E-Commerce Platform</h3>
                                <p className="text-blue-700 mt-2">
                                  Full-stack web application with React, Node.js, and MongoDB featuring user authentication,
                                  payment integration, and admin dashboard.
                                </p>
                              </div>
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h3 className="font-semibold text-blue-900">Machine Learning Stock Predictor</h3>
                                <p className="text-blue-700 mt-2">
                                  ML model using TensorFlow and Python to predict stock prices with 85% accuracy.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {resumeTemplates.map((template) => (
                  <Card key={template.id} className="bg-white/80 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader className="p-4">
                      <div className="aspect-[3/4] bg-blue-50 border-2 border-blue-200 rounded-lg mb-4 flex items-center justify-center">
                        <img
                          src={template.preview || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <CardTitle className="text-lg text-blue-900">{template.name}</CardTitle>
                      <CardDescription className="text-blue-700">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">{template.category}</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="versions" className="space-y-6">
              <div className="grid gap-6">
                {resumeVersions.map((version) => (
                  <Card key={version.id} className="bg-white/80 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3 text-blue-900">
                            <div className="p-2 bg-blue-200 rounded-lg">
                              <FileText className="h-5 w-5 text-blue-700" />
                            </div>
                            {version.name}
                          </CardTitle>
                          <CardDescription className="text-blue-700 mt-2">
                            Template: {version.template} • Last modified: {version.lastModified}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <Label className="text-sm font-semibold text-blue-900">Target Audience</Label>
                          <p className="text-blue-700 mt-1 font-medium">{version.targetAudience}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <Label className="text-sm font-semibold text-blue-900 mb-2 block">Sections Included</Label>
                          <div className="flex flex-wrap gap-2">
                            {version.sections.map((section, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-blue-300 text-blue-700 bg-blue-100"
                              >
                                {section}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
