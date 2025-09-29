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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Student Performance Analysis</h1>
                <p className="text-gray-600">
                  Comprehensive analytics for academic performance and achievement tracking
                </p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
              Student Records & Analytics
            </Badge>
          </div>

          {/* Student Info Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium text-blue-800">Student ID</span>
              </div>
              <p className="text-lg font-semibold text-blue-900">CS2021001</p>
              <p className="text-sm text-blue-700">Alex Johnson</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Current CGPA</span>
              </div>
              <p className="text-lg font-semibold text-green-900">8.9/10</p>
              <p className="text-sm text-green-700">Class Rank: 5/120</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-sm font-medium text-purple-800">Semester</span>
              </div>
              <p className="text-lg font-semibold text-purple-900">7th Semester</p>
              <p className="text-sm text-purple-700">Fall 2024</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <span className="text-sm font-medium text-orange-800">Program</span>
              </div>
              <p className="text-lg font-semibold text-orange-900">CSE</p>
              <p className="text-sm text-orange-700">2021-2025 Batch</p>
            </div>
          </div>
        </div>

        {/* Overview Cards - Performance Metrics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Career Readiness Score</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{overallScore}%</div>
              <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                Above average performance
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Academic Strengths</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{strengths.length}</div>
              <p className="text-xs text-gray-600">Key strengths identified</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Improvement Areas</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{weaknesses.length}</div>
              <p className="text-xs text-gray-600">Focus areas for development</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">Action Items</CardTitle>
              <Lightbulb className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{recommendations.reduce((acc, cat) => acc + cat.items.length, 0)}</div>
              <p className="text-xs text-gray-600">Recommended actions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent"
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="academic"
              className="flex items-center gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent"
            >
              <TrendingUp className="h-4 w-4" />
              Academic Trends
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="flex items-center gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent"
            >
              <Target className="h-4 w-4" />
              Skills Analysis
            </TabsTrigger>
            <TabsTrigger
              value="strengths"
              className="flex items-center gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent"
            >
              <Award className="h-4 w-4" />
              Strengths & Areas
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="flex items-center gap-2 border data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border-transparent"
            >
              <Lightbulb className="h-4 w-4" />
              Action Plan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Career Readiness Assessment
                  </CardTitle>
                  <CardDescription>Overall preparedness analysis across key competency areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={careerReadiness}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Score" dataKey="score" stroke="#0891b2" fill="#0891b2" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PieChartIcon className="h-5 w-5 text-green-600" />
                    Activity Distribution
                  </CardTitle>
                  <CardDescription>Time allocation across different academic and extracurricular activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={activityDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
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
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Key Performance Insights
                </CardTitle>
                <CardDescription>Important observations from academic and achievement data analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Consistent Academic Excellence</h4>
                    <p className="text-sm text-green-700">
                      CGPA has improved from 7.8 to 8.9, demonstrating strong academic growth and dedication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Strong Technical Foundation</h4>
                    <p className="text-sm text-blue-700">
                      Excellent performance in core subjects like Data Structures and Web Development with A+ grades.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900">Development Opportunity</h4>
                    <p className="text-sm text-orange-700">
                      Focus on gaining more industry experience through internships and real-world projects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Academic Performance Trend Analysis
                </CardTitle>
                <CardDescription>CGPA progression and academic growth over semesters</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={academicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[7, 10]} />
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

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Academic Achievements Summary
                  </CardTitle>
                  <CardDescription>Key academic milestones and recognitions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm font-medium text-green-800">Current CGPA</span>
                    <Badge className="bg-green-100 text-green-800 border border-green-300">8.9/10</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-sm font-medium text-blue-800">Class Rank</span>
                    <Badge className="bg-blue-100 text-blue-800 border border-blue-300">Top 4%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <span className="text-sm font-medium text-purple-800">Credits Completed</span>
                    <Badge className="bg-purple-100 text-purple-800 border border-purple-300">142/160</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-sm font-medium text-yellow-800">Dean's List</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">3 Semesters</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Subject Performance Analysis
                  </CardTitle>
                  <CardDescription>Performance breakdown by subject areas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Data Structures & Algorithms</span>
                      <span className="text-green-600 font-semibold">A+</span>
                    </div>
                    <Progress value={95} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Web Development</span>
                      <span className="text-green-600 font-semibold">A+</span>
                    </div>
                    <Progress value={95} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Database Systems</span>
                      <span className="text-blue-600 font-semibold">A</span>
                    </div>
                    <Progress value={88} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Computer Networks</span>
                      <span className="text-yellow-600 font-semibold">B+</span>
                    </div>
                    <Progress value={82} className="h-2 bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>Current skill levels vs target goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.skill}</span>
                        <span>
                          {skill.current}% / {skill.target}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.target} className="h-3 bg-gray-200" />
                        <Progress value={skill.current} className="h-3 absolute top-0 left-0" />
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

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Skills</CardTitle>
                  <CardDescription>Your strongest competencies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Problem Solving (90%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Programming (85%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Teamwork (80%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Leadership (75%)</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills to Develop</CardTitle>
                  <CardDescription>Areas with the biggest improvement potential</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Project Management</span>
                    <Badge variant="outline">Gap: 15%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Communication</span>
                    <Badge variant="outline">Gap: 15%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Leadership</span>
                    <Badge variant="outline">Gap: 15%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Programming</span>
                    <Badge variant="outline">Gap: 10%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strengths" className="space-y-4">
            <div className="grid gap-4">
              {strengths.map((strength, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-green-600" />
                        {strength.title}
                      </CardTitle>
                      <Badge variant={strength.impact === "High" ? "default" : "secondary"}>
                        {strength.impact} Impact
                      </Badge>
                    </div>
                    <CardDescription>{strength.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label className="text-sm font-medium">Supporting Evidence</Label>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
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
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>Focus areas to enhance your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weaknesses.map((weakness, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{weakness.title}</h4>
                      <Badge variant="outline">{weakness.impact} Impact</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{weakness.description}</p>
                    <div>
                      <Label className="text-sm font-medium">Suggested Actions</Label>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
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

          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid gap-4">
              {recommendations.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        {category.category}
                      </CardTitle>
                      <Badge variant={category.priority === "High" ? "default" : "secondary"}>
                        {category.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <p className="text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Action Plan</CardTitle>
                <CardDescription>Prioritized steps for your development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-red-900">Immediate (Next 30 days)</h4>
                      <p className="text-sm text-red-700">Apply for summer internships, update LinkedIn profile</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-900">Short-term (Next 3 months)</h4>
                      <p className="text-sm text-orange-700">Complete advanced ML course, join public speaking club</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">Long-term (Next 6 months)</h4>
                      <p className="text-sm text-blue-700">
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