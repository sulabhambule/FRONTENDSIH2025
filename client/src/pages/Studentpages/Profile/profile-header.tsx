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
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative mx-auto sm:mx-0">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage src="/placeholder.svg?key=profile" alt="John Smith" />
              <AvatarFallback className="text-base sm:text-lg">JS</AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 text-center sm:text-left w-full">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
              <h2 className="text-xl sm:text-2xl font-bold">John Smith</h2>
              <div className="flex justify-center sm:justify-start space-x-2">
                <Badge variant="secondary">Junior</Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Dean's List
                </Badge>
              </div>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Computer Science Major • Class of 2026</p>
              <p>Student ID: CS2024001 • GPA: 3.85</p>
              <p className="break-all sm:break-normal">john.smith@university.edu</p>
            </div>
          </div>

          <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="w-full sm:w-auto">
            <Edit className="h-4 w-4 mr-2" />
            <span className="sm:inline">Edit Profile</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
