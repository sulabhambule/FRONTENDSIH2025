"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function AcademicDetails() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    studentId: "CS2024001",
    major: "Computer Science",
    minor: "Mathematics",
    concentration: "Artificial Intelligence",
    expectedGraduation: "2026-05",
    advisor: "Dr. Sarah Johnson",
    currentYear: "Junior",
    enrollmentStatus: "Full-time",
  })

  const currentCourses = [
    { code: "CS 315", name: "Database Systems", credits: 3 },
    { code: "MATH 152", name: "Calculus II", credits: 4 },
    { code: "PHYS 201", name: "Physics I", credits: 4 },
    { code: "ENG 104", name: "Technical Writing", credits: 2 },
    { code: "CS 201", name: "Data Structures", credits: 3 },
  ]

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Details</CardTitle>
        <CardDescription>Your academic information and current enrollment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input id="studentId" value={formData.studentId} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentYear">Current Year</Label>
            <Select value={formData.currentYear} disabled={!isEditing}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Freshman">Freshman</SelectItem>
                <SelectItem value="Sophomore">Sophomore</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="major">Major</Label>
            <Select value={formData.major} disabled={!isEditing}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="minor">Minor</Label>
            <Select value={formData.minor} disabled={!isEditing}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="None">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="concentration">Concentration</Label>
          <Input
            id="concentration"
            value={formData.concentration}
            onChange={(e) => setFormData({ ...formData, concentration: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expectedGraduation">Expected Graduation</Label>
            <Input
              id="expectedGraduation"
              type="month"
              value={formData.expectedGraduation}
              onChange={(e) => setFormData({ ...formData, expectedGraduation: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="advisor">Academic Advisor</Label>
            <Input
              id="advisor"
              value={formData.advisor}
              onChange={(e) => setFormData({ ...formData, advisor: e.target.value })}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Current Courses</Label>
          <div className="space-y-2">
            {currentCourses.map((course) => (
              <div key={course.code} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div>
                  <span className="font-medium text-sm">{course.code}</span>
                  <span className="text-sm text-muted-foreground ml-2">{course.name}</span>
                </div>
                <Badge variant="outline">{course.credits} credits</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
