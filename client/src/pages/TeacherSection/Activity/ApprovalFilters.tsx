"use client"

import { Search, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface ApprovalFiltersProps {
  searchQuery: string
  filterType: string
  filterPriority: string
  onSearchChange: (value: string) => void
  onTypeChange: (value: string) => void
  onPriorityChange: (value: string) => void
}

export function ApprovalFilters({
  searchQuery,
  filterType,
  filterPriority,
  onSearchChange,
  onTypeChange,
  onPriorityChange,
}: ApprovalFiltersProps) {
  return (
    <Card className="animate-slide-up">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by student name, activity, or roll number..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-64"
            />
          </div>

          <Select value={filterType} onValueChange={onTypeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Activity Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="competition">Competition</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="course">Course</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={onPriorityChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
