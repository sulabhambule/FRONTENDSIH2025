"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, FileText, Award, Users, Briefcase, GraduationCap } from "lucide-react"

// Activity types with icons and categories
const activityTypes = [
  {
    category: "Academic",
    icon: GraduationCap,
    items: [
      "Workshop",
      "Certification",
      "Course",
      "Research Project",
      "Academic Competition",
      "Hackathon"
    ]
  },
  {
    category: "Professional",
    icon: Briefcase,
    items: [
      "Internship",
      "Job",
      "Professional Training",
      "Industry Project",
      "Startup",
      "Freelancing"
    ]
  },
  {
    category: "Extracurricular",
    icon: Users,
    items: [
      "Volunteering",
      "Community Service",
      "Club Activity",
      "Sports",
      "Cultural Event",
      "Leadership Role"
    ]
  },
  {
    category: "Achievements",
    icon: Award,
    items: [
      "Competition Win",
      "Publication",
      "Patent",
      "Recognition",
      "Scholarship",
      "Award"
    ]
  }
]

// Skill categories for dynamic skill selection
const skillCategories = [
  {
    name: "Technical",
    skills: [
      "Programming", "Web Development", "Mobile Development", "Data Science",
      "Machine Learning", "AI", "Database Management", "Cloud Computing",
      "DevOps", "Cybersecurity", "UI/UX Design", "System Architecture"
    ]
  },
  {
    name: "Soft Skills",
    skills: [
      "Leadership", "Communication", "Teamwork", "Problem Solving",
      "Project Management", "Time Management", "Critical Thinking", "Creativity",
      "Adaptability", "Presentation", "Negotiation", "Mentoring"
    ]
  },
  {
    name: "Domain Specific",
    skills: [
      "Research", "Analytics", "Marketing", "Sales", "Finance",
      "Operations", "Strategy", "Consulting", "Teaching", "Writing",
      "Event Management", "Social Media"
    ]
  }
]

interface AddActivityModalProps {
  children?: React.ReactNode
}

interface ActivityFormData {
  title: string
  type: string
  category: string
  description: string
  startDate: string
  endDate: string
  organization: string
  location: string
  isOngoing: boolean
  skills: string[]
  achievements: string[]
  learningOutcomes: string[]
  documentation: File[]
  certificateUrl: string
  projectUrl: string
  mentorName: string
  mentorEmail: string
  mentorPhone: string
  impactMetrics: {
    duration: string
    participants: string
    budget: string
    reach: string
  }
}

export function AddActivityModal({ children }: AddActivityModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [achievements, setAchievements] = useState<string[]>([])
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([])
  const [newAchievement, setNewAchievement] = useState("")
  const [newLearning, setNewLearning] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const [formData, setFormData] = useState<ActivityFormData>({
    title: "",
    type: "",
    category: "",
    description: "",
    startDate: "",
    endDate: "",
    organization: "",
    location: "",
    isOngoing: false,
    skills: [],
    achievements: [],
    learningOutcomes: [],
    documentation: [],
    certificateUrl: "",
    projectUrl: "",
    mentorName: "",
    mentorEmail: "",
    mentorPhone: "",
    impactMetrics: {
      duration: "",
      participants: "",
      budget: "",
      reach: ""
    }
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMetricChange = (metric: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      impactMetrics: {
        ...prev.impactMetrics,
        [metric]: value
      }
    }))
  }

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => {
      const newSkills = prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]

      setFormData(prevForm => ({
        ...prevForm,
        skills: newSkills
      }))
      return newSkills
    })
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      const newAchievements = [...achievements, newAchievement.trim()]
      setAchievements(newAchievements)
      setFormData(prev => ({ ...prev, achievements: newAchievements }))
      setNewAchievement("")
    }
  }

  const addLearningOutcome = () => {
    if (newLearning.trim()) {
      const newLearnings = [...learningOutcomes, newLearning.trim()]
      setLearningOutcomes(newLearnings)
      setFormData(prev => ({ ...prev, learningOutcomes: newLearnings }))
      setNewLearning("")
    }
  }

  const removeItem = (items: string[], setItems: (items: string[]) => void, index: number, field: string) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
    setFormData(prev => ({ ...prev, [field]: newItems }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => {
      const newFiles = [...prev, ...files]
      setFormData(prevForm => ({ ...prevForm, documentation: newFiles }))
      return newFiles
    })
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index)
      setFormData(prevForm => ({ ...prevForm, documentation: newFiles }))
      return newFiles
    })
  }

  const handleSubmit = async () => {
    try {
      // Prepare form data for API submission
      const submitData = {
        ...formData,
        skills: selectedSkills,
        achievements: achievements,
        learningOutcomes: learningOutcomes,
        documentation: uploadedFiles
      }

      console.log("Activity data to submit:", submitData)

      // TODO: Replace with actual API call
      // const response = await fetch('/api/activities', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(submitData)
      // })

      // Reset form and close modal
      setIsOpen(false)
      setCurrentStep(1)
      resetForm()

      // TODO: Add success toast notification
      alert("Activity added successfully!")
    } catch (error) {
      console.error("Error submitting activity:", error)
      // TODO: Add error toast notification
      alert("Failed to add activity. Please try again.")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      type: "",
      category: "",
      description: "",
      startDate: "",
      endDate: "",
      organization: "",
      location: "",
      isOngoing: false,
      skills: [],
      achievements: [],
      learningOutcomes: [],
      documentation: [],
      certificateUrl: "",
      projectUrl: "",
      mentorName: "",
      mentorEmail: "",
      mentorPhone: "",
      impactMetrics: {
        duration: "",
        participants: "",
        budget: "",
        reach: ""
      }
    })
    setSelectedCategory("")
    setSelectedSkills([])
    setAchievements([])
    setLearningOutcomes([])
    setUploadedFiles([])
    setNewAchievement("")
    setNewLearning("")
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Basic Information</h3>
              <p className="text-sm text-gray-600">Let's start with the essential details of your activity</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">Activity Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Machine Learning Workshop at Google"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category *</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <SelectItem key={category.category} value={category.category}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            {category.category}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">Activity Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory && activityTypes
                      .find(cat => cat.category === selectedCategory)?.items
                      .map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you did, what you learned, and the impact of this activity..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="organization" className="text-sm font-medium text-gray-700">Organization</Label>
                <Input
                  id="organization"
                  placeholder="e.g., Google, IEEE, Local NGO"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Online, Mumbai, IIT Delhi"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Timeline & Duration</h3>
              <p className="text-sm text-gray-600">When did this activity take place?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="mt-1"
                  disabled={formData.isOngoing}
                />
              </div>

              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="ongoing"
                    checked={formData.isOngoing}
                    onChange={(e) => handleInputChange('isOngoing', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="ongoing" className="text-sm font-medium text-gray-700">
                    This is an ongoing activity
                  </Label>
                </div>
              </div>

              <div className="col-span-2">
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Impact Metrics (Optional)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration" className="text-xs text-gray-600">Duration (hours/days)</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 40 hours, 3 days"
                      value={formData.impactMetrics.duration}
                      onChange={(e) => handleMetricChange('duration', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="participants" className="text-xs text-gray-600">People Involved</Label>
                    <Input
                      id="participants"
                      placeholder="e.g., 50 participants"
                      value={formData.impactMetrics.participants}
                      onChange={(e) => handleMetricChange('participants', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget" className="text-xs text-gray-600">Budget/Value</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., ₹10,000"
                      value={formData.impactMetrics.budget}
                      onChange={(e) => handleMetricChange('budget', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reach" className="text-xs text-gray-600">Reach/Impact</Label>
                    <Input
                      id="reach"
                      placeholder="e.g., 1000+ beneficiaries"
                      value={formData.impactMetrics.reach}
                      onChange={(e) => handleMetricChange('reach', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills & Outcomes</h3>
              <p className="text-sm text-gray-600">What skills did you gain and what did you achieve?</p>
            </div>

            {/* Skills Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Skills Gained</Label>
              <div className="space-y-4">
                {skillCategories.map((category) => (
                  <div key={category.name}>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "default" : "outline"}
                          className={`cursor-pointer transition-colors ${selectedSkills.includes(skill)
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Key Achievements</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g., Won first prize, Led a team of 10..."
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                />
                <Button type="button" onClick={addAchievement} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {achievement}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeItem(achievements, setAchievements, index, 'achievements')}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Learning Outcomes</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="e.g., Learned React.js, Improved communication skills..."
                  value={newLearning}
                  onChange={(e) => setNewLearning(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLearningOutcome()}
                />
                <Button type="button" onClick={addLearningOutcome} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {learningOutcomes.map((learning, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {learning}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeItem(learningOutcomes, setLearningOutcomes, index, 'learningOutcomes')}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Documentation & References</h3>
              <p className="text-sm text-gray-600">Upload certificates, photos, or add reference links</p>
            </div>

            {/* File Upload */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Upload Documents</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drop files here or click to upload
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                  Choose Files
                </Button>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="certificateUrl" className="text-sm font-medium text-gray-700">Certificate URL</Label>
                <Input
                  id="certificateUrl"
                  placeholder="https://certificate-link.com"
                  value={formData.certificateUrl}
                  onChange={(e) => handleInputChange('certificateUrl', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="projectUrl" className="text-sm font-medium text-gray-700">Project/Portfolio URL</Label>
                <Input
                  id="projectUrl"
                  placeholder="https://github.com/username/project"
                  value={formData.projectUrl}
                  onChange={(e) => handleInputChange('projectUrl', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Mentor/Reference Information */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Mentor/Reference (Optional)</Label>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Input
                    placeholder="Mentor/Supervisor Name"
                    value={formData.mentorName}
                    onChange={(e) => handleInputChange('mentorName', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="mentor@email.com"
                    type="email"
                    value={formData.mentorEmail}
                    onChange={(e) => handleInputChange('mentorEmail', e.target.value)}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={formData.mentorPhone}
                    onChange={(e) => handleInputChange('mentorPhone', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl">
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 -m-6 mb-6 rounded-t-lg">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Activity
          </DialogTitle>
          <DialogDescription className="text-blue-100 mt-2">
            Step {currentStep} of 4: Document your academic and extracurricular activities
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                  }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-16 h-1 ml-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            {currentStep < 4 ? (
              <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Add Activity
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}