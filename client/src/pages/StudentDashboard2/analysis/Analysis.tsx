"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  TrendingUp,
  Brain,
  Target,
  Lightbulb,
  Award,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChartIcon,
} from "lucide-react"

const academicData = [
  { semester: "Fall 2022", gpa: 7.8, credits: 20 },
  { semester: "Spring 2023", gpa: 8.2, credits: 22 },
  { semester: "Fall 2023", gpa: 8.5, credits: 21 },
  { semester: "Spring 2024", gpa: 8.7, credits: 20 },
  { semester: "Fall 2024", gpa: 8.9, credits: 22 },
]

const skillsData = [
  { skill: "Programming", current: 85, target: 95 },
  { skill: "Communication", current: 70, target: 85 },
  { skill: "Leadership", current: 75, target: 90 },
  { skill: "Problem Solving", current: 90, target: 95 },
  { skill: "Teamwork", current: 80, target: 90 },
  { skill: "Project Management", current: 65, target: 80 },
]

const activityDistribution = [
  { name: "Academic Projects", value: 35, color: "#0891b2" },
  { name: "Internships", value: 25, color: "#f59e0b" },
  { name: "Competitions", value: 20, color: "#10b981" },
  { name: "Volunteer Work", value: 12, color: "#8b5cf6" },
  { name: "Certifications", value: 8, color: "#ef4444" },
]

const careerReadiness = [
  { category: "Technical Skills", score: 85 },
  { category: "Soft Skills", score: 75 },
  { category: "Industry Experience", score: 70 },
  { category: "Academic Performance", score: 89 },
  { category: "Leadership", score: 78 },
  { category: "Innovation", score: 82 },
]

const strengths = [
  {
    title: "Strong Academic Performance",
    description: "Consistent improvement in GPA with current 8.9/10",
    impact: "High",
    evidence: ["Dean's List recognition", "Top 10% of class", "Consistent grade improvement"],
  },
  {
    title: "Technical Expertise",
    description: "Excellent programming skills and project portfolio",
    impact: "High",
    evidence: ["12 completed projects", "Open source contributions", "Hackathon victories"],
  },
  {
    title: "Competition Success",
    description: "Strong track record in programming competitions",
    impact: "Medium",
    evidence: ["TechFest 2024 winner", "Multiple top-10 finishes", "International competition participation"],
  },
]

const weaknesses = [
  {
    title: "Limited Industry Experience",
    description: "Need more internships and real-world exposure",
    impact: "Medium",
    suggestions: [
      "Apply for summer internships",
      "Seek part-time opportunities",
      "Connect with industry professionals",
    ],
  },
  {
    title: "Communication Skills Gap",
    description: "Room for improvement in presentation and writing",
    impact: "Medium",
    suggestions: ["Join public speaking clubs", "Take communication courses", "Practice technical presentations"],
  },
  {
    title: "Leadership Experience",
    description: "Limited formal leadership roles",
    impact: "Low",
    suggestions: ["Run for club positions", "Lead project teams", "Mentor junior students"],
  },
]

const recommendations = [
  {
    category: "Career Development",
    priority: "High",
    items: [
      "Apply for summer internships at top tech companies",
      "Build a strong LinkedIn profile and network",
      "Prepare for technical interviews with coding practice",
    ],
  },
  {
    category: "Skill Enhancement",
    priority: "Medium",
    items: [
      "Take advanced courses in machine learning",
      "Improve system design knowledge",
      "Learn cloud technologies (AWS, Azure)",
    ],
  },
  {
    category: "Personal Branding",
    priority: "Medium",
    items: [
      "Create a professional portfolio website",
      "Write technical blog posts",
      "Speak at student conferences or meetups",
    ],
  },
]

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const overallScore = Math.round(careerReadiness.reduce((acc, item) => acc + item.score, 0) / careerReadiness.length)

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">Student Performance Analysis</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Comprehensive analytics for academic performance and achievement tracking
                </p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200 text-xs sm:text-sm w-fit">
              Student Records & Analytics
            </Badge>
          </div>

          {/* Student Info Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-blue-800">Student ID</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-blue-900">CS2021001</p>
              <p className="text-xs sm:text-sm text-blue-700">Alex Johnson</p>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-green-800">Current CGPA</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-green-900">8.9/10</p>
              <p className="text-xs sm:text-sm text-green-700">Class Rank: 5/120</p>
            </div>
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-purple-800">Semester</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-purple-900">7th Semester</p>
              <p className="text-xs sm:text-sm text-purple-700">Fall 2024</p>
            </div>
            <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-orange-800">Program</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-orange-900">CSE</p>
              <p className="text-xs sm:text-sm text-orange-700">2021-2025 Batch</p>
            </div>
          </div>
        </div>

        {/* Overview Cards - Performance Metrics */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Career Readiness Score</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{overallScore}%</div>
              <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                Above average performance
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Academic Strengths</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{strengths.length}</div>
              <p className="text-xs text-gray-600">Key strengths identified</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Improvement Areas</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl font-bold text-orange-600">{weaknesses.length}</div>
              <p className="text-xs text-gray-600">Focus areas for development</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700">Action Items</CardTitle>
              <Lightbulb className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent className="pt-1 sm:pt-2">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">{recommendations.reduce((acc, cat) => acc + cat.items.length, 0)}</div>
              <p className="text-xs text-gray-600">Recommended actions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3"
            >
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">View</span>
            </TabsTrigger>
            <TabsTrigger
              value="academic"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3"
            >
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Academic Trends</span>
              <span className="sm:hidden">Academic</span>
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3"
            >
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden lg:inline">Skills Analysis</span>
              <span className="lg:hidden">Skills</span>
            </TabsTrigger>
            <TabsTrigger
              value="strengths"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3 col-span-1 sm:col-span-1 lg:col-span-1"
            >
              <Award className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden lg:inline">Strengths & Areas</span>
              <span className="lg:hidden">Strengths</span>
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="flex items-center gap-1 sm:gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent text-xs sm:text-sm px-2 sm:px-3 col-span-1 sm:col-span-1 lg:col-span-1"
            >
              <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden lg:inline">Action Plan</span>
              <span className="lg:hidden">Actions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    Career Readiness Assessment
                  </CardTitle>
                  <CardDescription className="text-sm">Overall preparedness analysis across key competency areas</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={careerReadiness}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar name="Score" dataKey="score" stroke="#0891b2" fill="#0891b2" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    Activity Distribution
                  </CardTitle>
                  <CardDescription className="text-sm">Time allocation across different academic and extracurricular activities</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={activityDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {activityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights Section */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  Key Performance Insights
                </CardTitle>
                <CardDescription className="text-sm">Important observations from academic and achievement data analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-900 text-sm sm:text-base">Consistent Academic Excellence</h4>
                    <p className="text-xs sm:text-sm text-green-700">
                      CGPA has improved from 7.8 to 8.9, demonstrating strong academic growth and dedication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm sm:text-base">Strong Technical Foundation</h4>
                    <p className="text-xs sm:text-sm text-blue-700">
                      Excellent performance in core subjects like Data Structures and Web Development with A+ grades.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-orange-900 text-sm sm:text-base">Development Opportunity</h4>
                    <p className="text-xs sm:text-sm text-orange-700">
                      Focus on gaining more industry experience through internships and real-world projects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4 sm:space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  Academic Performance Trend Analysis
                </CardTitle>
                <CardDescription className="text-sm">CGPA progression and academic growth over semesters</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={academicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" tick={{ fontSize: 12 }} />
                    <YAxis domain={[7, 10]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="gpa"
                      stroke="#0891b2"
                      strokeWidth={3}
                      dot={{ fill: "#0891b2", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    Academic Achievements Summary
                  </CardTitle>
                  <CardDescription className="text-sm">Key academic milestones and recognitions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-xs sm:text-sm font-medium text-green-800">Current CGPA</span>
                    <Badge className="bg-green-100 text-green-800 border border-green-300 text-xs">8.9/10</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-xs sm:text-sm font-medium text-blue-800">Class Rank</span>
                    <Badge className="bg-blue-100 text-blue-800 border border-blue-300 text-xs">Top 4%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <span className="text-xs sm:text-sm font-medium text-purple-800">Credits Completed</span>
                    <Badge className="bg-purple-100 text-purple-800 border border-purple-300 text-xs">142/160</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-xs sm:text-sm font-medium text-yellow-800">Dean's List</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300 text-xs">3 Semesters</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    Subject Performance Analysis
                  </CardTitle>
                  <CardDescription className="text-sm">Performance breakdown by subject areas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="font-medium text-gray-700 truncate">Data Structures & Algorithms</span>
                      <span className="text-green-600 font-semibold ml-2">A+</span>
                    </div>
                    <Progress value={95} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="font-medium text-gray-700 truncate">Web Development</span>
                      <span className="text-green-600 font-semibold ml-2">A+</span>
                    </div>
                    <Progress value={95} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="font-medium text-gray-700 truncate">Database Systems</span>
                      <span className="text-blue-600 font-semibold ml-2">A</span>
                    </div>
                    <Progress value={88} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="font-medium text-gray-700 truncate">Computer Networks</span>
                      <span className="text-yellow-600 font-semibold ml-2">B+</span>
                    </div>
                    <Progress value={82} className="h-2 bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-3 sm:space-y-4">
            <Card>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Skills Assessment</CardTitle>
                <CardDescription className="text-sm">Current skill levels vs target goals</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="font-medium truncate">{skill.skill}</span>
                        <span className="ml-2">
                          {skill.current}% / {skill.target}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.target} className="h-2 sm:h-3 bg-gray-200" />
                        <Progress value={skill.current} className="h-2 sm:h-3 absolute top-0 left-0" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Current</span>
                        <span>Target</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader className="p-3 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Top Skills</CardTitle>
                  <CardDescription className="text-sm">Your strongest competencies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Problem Solving (90%)</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Programming (85%)</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Teamwork (80%)</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm">Leadership (75%)</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">Skills to Develop</CardTitle>
                  <CardDescription className="text-sm">Areas with the biggest improvement potential</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm truncate">Project Management</span>
                    <Badge variant="outline" className="text-xs flex-shrink-0">Gap: 15%</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm truncate">Communication</span>
                    <Badge variant="outline" className="text-xs flex-shrink-0">Gap: 15%</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm truncate">Leadership</span>
                    <Badge variant="outline" className="text-xs flex-shrink-0">Gap: 15%</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm truncate">Programming</span>
                    <Badge variant="outline" className="text-xs flex-shrink-0">Gap: 10%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strengths" className="space-y-3 sm:space-y-4">
            <div className="grid gap-3 sm:gap-4">
              {strengths.map((strength, index) => (
                <Card key={index}>
                  <CardHeader className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                        {strength.title}
                      </CardTitle>
                      <Badge variant={strength.impact === "High" ? "default" : "secondary"} className="text-xs w-fit">
                        {strength.impact} Impact
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{strength.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6">
                    <div>
                      <Label className="text-xs sm:text-sm font-medium">Supporting Evidence</Label>
                      <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground mt-2 space-y-1">
                        {strength.evidence.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Areas for Improvement</CardTitle>
                <CardDescription className="text-sm">Focus areas to enhance your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
                {weaknesses.map((weakness, index) => (
                  <div key={index} className="border rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm sm:text-base">{weakness.title}</h4>
                      <Badge variant="outline" className="text-xs w-fit">{weakness.impact} Impact</Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">{weakness.description}</p>
                    <div>
                      <Label className="text-xs sm:text-sm font-medium">Suggested Actions</Label>
                      <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground mt-1 space-y-1">
                        {weakness.suggestions.map((suggestion, idx) => (
                          <li key={idx}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-3 sm:space-y-4">
            <div className="grid gap-3 sm:gap-4">
              {recommendations.map((category, index) => (
                <Card key={index}>
                  <CardHeader className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                        {category.category}
                      </CardTitle>
                      <Badge variant={category.priority === "High" ? "default" : "secondary"} className="text-xs w-fit">
                        {category.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6">
                    <div className="space-y-2 sm:space-y-3">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 sm:gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-1 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Action Plan</CardTitle>
                <CardDescription className="text-sm">Prioritized steps for your development</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-red-900 text-xs sm:text-sm">Immediate (Next 30 days)</h4>
                      <p className="text-xs text-red-700">Apply for summer internships, update LinkedIn profile</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-orange-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-900 text-xs sm:text-sm">Short-term (Next 3 months)</h4>
                      <p className="text-xs text-orange-700">Complete advanced ML course, join public speaking club</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 text-xs sm:text-sm">Long-term (Next 6 months)</h4>
                      <p className="text-xs text-blue-700">
                        Build portfolio website, speak at conferences, mentor juniors
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}