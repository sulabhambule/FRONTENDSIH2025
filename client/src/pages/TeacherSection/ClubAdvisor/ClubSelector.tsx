"use client"

import { Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Club {
  id: string
  name: string
  description: string
  memberCount: number
  activeMembers: number
  establishedDate: string
  category: string
  status: string
}

interface ClubSelectorProps {
  clubs: Club[]
  selectedClub: Club
  onClubSelect: (club: Club) => void
}

export function ClubSelector({ clubs, selectedClub, onClubSelect }: ClubSelectorProps) {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Your Clubs</CardTitle>
        <CardDescription>Select a club to manage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubs.map((club) => (
            <div
              key={club.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedClub.id === club.id ? "border-yellow-500 bg-yellow-50" : "border-gray-200 hover:border-gray-300"
                }`}
              onClick={() => onClubSelect(club)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{club.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{club.description}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <Badge variant="secondary">{club.memberCount} members</Badge>
                    <Badge variant="outline">{club.category}</Badge>
                  </div>
                </div>
                <Trophy className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
