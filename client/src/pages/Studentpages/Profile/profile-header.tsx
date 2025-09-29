"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Edit } from "lucide-react"
import { useState } from "react"

export function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?key=profile" alt="John Smith" />
              <AvatarFallback className="text-lg">JS</AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold">John Smith</h2>
              <Badge variant="secondary">Junior</Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Dean's List
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Computer Science Major • Class of 2026</p>
              <p>Student ID: CS2024001 • GPA: 3.85</p>
              <p>john.smith@university.edu</p>
            </div>
          </div>

          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
