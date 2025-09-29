"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  X,
  Plus,
  Eye,
  FolderOpen,
  Github,
  ExternalLink,
  Code,
  Globe,
} from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    type: "Personal",
    level: "Advanced",
    description: "Full-stack e-commerce platform with payment integration, user authentication, and admin dashboard",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    startDate: "2024-08-01",
    endDate: "2024-10-31",
    status: "approved",
    githubUrl: "https://github.com/user/ecommerce-platform",
    liveUrl: "https://myecommerce.vercel.app",
    documentation: "Ecommerce_Documentation.pdf",
    images: ["ecommerce_1.jpg", "ecommerce_2.jpg"],
    features: ["User Authentication", "Payment Gateway", "Admin Dashboard", "Order Management"],
    challenges: "Implementing secure payment processing and optimizing database queries",
    learnings: "Gained expertise in full-stack development and payment gateway integration",
    approvedBy: "Dr. Smith",
    approvalDate: "2024-11-05",
  },
  {
    id: 2,
    title: "Machine Learning Stock Predictor",
    category: "Data Science",
    type: "Academic",
    level: "Intermediate",
    description: "ML model to predict stock prices using historical data and technical indicators",
    technologies: ["Python", "TensorFlow", "Pandas", "Matplotlib", "Scikit-learn"],
    startDate: "2024-09-01",
    endDate: "2024-11-15",
    status: "pending",
    githubUrl: "https://github.com/user/stock-predictor",
    liveUrl: null,
    documentation: "ML_Project_Report.pdf",
    images: ["stock_analysis.jpg"],
    features: ["Data Preprocessing", "LSTM Model", "Technical Indicators", "Visualization"],
    challenges: "Handling volatile market data and improving model accuracy",
    learnings: "Deep understanding of time series analysis and neural networks",
    approvedBy: null,
    approvalDate: null,
  },
  {
    id: 3,
    title: "Open Source Contribution - React Library",
    category: "Open Source",
    type: "Contribution",
    level: "Intermediate",
    description: "Contributed to popular React component library by adding new features and fixing bugs",
    technologies: ["React", "TypeScript", "Jest", "Storybook"],
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    status: "approved",
    githubUrl: "https://github.com/popular-library/react-components",
    liveUrl: "https://react-components.dev",
    documentation: "Contribution_Summary.pdf",
    images: ["contribution_1.jpg"],
    features: ["New Components", "Bug Fixes", "Documentation", "Tests"],
    challenges: "Understanding large codebase and following contribution guidelines",
    learnings: "Collaborative development and open source best practices",
    approvedBy: "Prof. Johnson",
    approvalDate: "2024-10-01",
  },
]

export default function ProjectsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
      case "rejected":
        return "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
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

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-50 text-green-700 border border-green-200"
      case "Intermediate":
        return "bg-amber-50 text-amber-700 border border-amber-200"
      case "Advanced":
        return "bg-purple-50 text-purple-700 border border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200"
    }
  }

  const filteredProjects = projects.filter((project) => {
    const statusMatch = filterStatus === "all" || project.status === filterStatus
    const categoryMatch = filterCategory === "all" || project.category.toLowerCase().includes(filterCategory)
    const typeMatch = filterType === "all" || project.type.toLowerCase() === filterType
    return statusMatch && categoryMatch && typeMatch
  })

  const handleViewProject = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsViewOpen(true)
  }

  const categories = [...new Set(projects.map((p) => p.category))]
  const types = [...new Set(projects.map((p) => p.type))]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects & Contributions</h1>
            <p className="text-gray-600">
              Showcase your personal projects, academic work, and open source contributions.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Total Projects</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FolderOpen className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{projects.length}</div>
              <p className="text-sm text-gray-600 mt-1">All projects</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 w-full rounded-full"></div>
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
                {projects.filter((p) => p.status === "approved").length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Faculty approved</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-4/5 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Open Source</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Github className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{projects.filter((p) => p.category === "Open Source").length}</div>
              <p className="text-sm text-gray-600 mt-1">Contributions</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 w-1/3 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Technologies</CardTitle>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Code className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{[...new Set(projects.flatMap((p) => p.technologies))].length}</div>
              <p className="text-sm text-gray-600 mt-1">Unique technologies</p>
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 w-3/4 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {/* Filters and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex gap-4 flex-wrap">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36 border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-44 border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-36 border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
                <DialogHeader className="bg-gray-50 -m-6 p-6 mb-4 border-b border-gray-200">
                  <DialogTitle className="text-gray-900">Add Project</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Submit your project for faculty review and approval.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-gray-900 font-medium">Project Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter project title"
                        className="border-gray-200 focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="category" className="text-gray-900 font-medium">Category</Label>
                      <Select>
                        <SelectTrigger className="border-gray-200 focus:border-blue-400">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="mobile-development">Mobile Development</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="machine-learning">Machine Learning</SelectItem>
                          <SelectItem value="open-source">Open Source</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-gray-900 font-medium">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of your project"
                      className="border-gray-200 focus:border-blue-400 min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="type" className="text-gray-900 font-medium">Type</Label>
                      <Select>
                        <SelectTrigger className="border-gray-200 focus:border-blue-400">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="contribution">Contribution</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="level" className="text-gray-900 font-medium">Complexity Level</Label>
                      <Select>
                        <SelectTrigger className="border-gray-200 focus:border-blue-400">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="duration" className="text-blue-900 font-medium">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 3 months"
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="technologies" className="text-blue-900 font-medium">Technologies Used</Label>
                    <Input
                      id="technologies"
                      placeholder="e.g., React, Node.js, MongoDB"
                      className="border-blue-200 focus:border-blue-400"
                    />
                    <p className="text-xs text-blue-600">Separate technologies with commas</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="github" className="text-blue-900 font-medium">GitHub Repository</Label>
                      <Input
                        id="github"
                        placeholder="https://github.com/..."
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="live" className="text-blue-900 font-medium">Live Demo URL (Optional)</Label>
                      <Input
                        id="live"
                        placeholder="https://..."
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="features" className="text-blue-900 font-medium">Key Features</Label>
                    <Textarea
                      id="features"
                      placeholder="List the main features of your project"
                      className="border-blue-200 focus:border-blue-400 min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="proof" className="text-blue-900 font-medium">
                      Upload Project Files
                    </Label>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition-colors">
                      <Upload className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                      <p className="text-blue-700 font-medium">Upload screenshots, documentation, or project files</p>
                      <p className="text-blue-600 text-sm mt-1">Multiple files supported (PDF, images, videos)</p>
                    </div>
                  </div>
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

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-white/80 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1 text-blue-900">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-2 text-blue-700">{project.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(project.status)}
                        {project.status}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                      {project.category}
                    </Badge>
                    <Badge className={getLevelColor(project.level)} variant="outline">
                      {project.level}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs border-blue-300 text-blue-700 bg-blue-50">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-blue-200">
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewProject(project)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View Project Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-blue-200">
            {selectedProject && (
              <>
                <DialogHeader className="bg-blue-50 -m-6 p-6 mb-4 border-b border-blue-200">
                  <DialogTitle className="flex items-center gap-3 text-blue-900">
                    <div className="p-2 bg-blue-200 rounded-lg">
                      <FolderOpen className="h-5 w-5 text-blue-700" />
                    </div>
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-blue-700">Project details and verification status</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <Label className="text-sm font-semibold text-blue-900">Category</Label>
                      <p className="text-blue-700 mt-1 font-medium">{selectedProject.category}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <Label className="text-sm font-semibold text-blue-900">Type</Label>
                      <p className="text-blue-700 mt-1 font-medium">{selectedProject.type}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <Label className="text-sm font-semibold text-blue-900 mb-2 block">Description</Label>
                    <p className="text-blue-800 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <Label className="text-sm font-semibold text-purple-900">Complexity Level</Label>
                      <div className="mt-2">
                        <Badge className={getLevelColor(selectedProject.level)} variant="outline">
                          {selectedProject.level}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <Label className="text-sm font-semibold text-green-900">Start Date</Label>
                      <p className="text-green-700 mt-1 font-medium">{selectedProject.startDate}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <Label className="text-sm font-semibold text-green-900">End Date</Label>
                      <p className="text-green-700 mt-1 font-medium">{selectedProject.endDate}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <Label className="text-sm font-semibold text-blue-900 mb-3 block">Technologies Used</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-blue-300 text-blue-700 bg-blue-100 hover:bg-blue-200"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <Label className="text-sm font-semibold text-amber-900 mb-3 block">Key Features</Label>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-amber-800">
                          <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <Label className="text-sm font-semibold text-red-900 mb-2 block">Challenges & Solutions</Label>
                    <p className="text-red-800 leading-relaxed">{selectedProject.challenges}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <Label className="text-sm font-semibold text-green-900 mb-2 block">Key Learnings</Label>
                    <p className="text-green-800 leading-relaxed">{selectedProject.learnings}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <Label className="text-sm font-semibold text-gray-900 mb-3 block">GitHub Repository</Label>
                      <div className="flex items-center gap-3">
                        <Github className="h-5 w-5 text-gray-600" />
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          View Repository
                        </a>
                      </div>
                    </div>
                    {selectedProject.liveUrl && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">Live Demo</Label>
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-gray-600" />
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                          >
                            View Live Demo
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <Label className="text-sm font-semibold text-blue-900 mb-3 block">Documentation</Label>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-blue-800 font-medium">{selectedProject.documentation}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-semibold text-blue-900 mb-2 block">Status</Label>
                        <Badge className={getStatusColor(selectedProject.status)}>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(selectedProject.status)}
                            <span className="capitalize">{selectedProject.status}</span>
                          </div>
                        </Badge>
                      </div>
                      {selectedProject.approvedBy && (
                        <div className="text-right">
                          <Label className="text-sm font-semibold text-green-900 mb-1 block">Approved By</Label>
                          <p className="text-green-800 font-medium">{selectedProject.approvedBy}</p>
                          <p className="text-xs text-green-700 mt-1">{selectedProject.approvalDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
