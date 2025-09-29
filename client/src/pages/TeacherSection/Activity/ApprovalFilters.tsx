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
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
            <Input
              placeholder="Search by student name, activity, or roll number..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-xs sm:text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Select value={filterType} onValueChange={onTypeChange}>
              <SelectTrigger className="w-full sm:w-40 text-xs sm:text-sm">
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
              <SelectTrigger className="w-full sm:w-40 text-xs sm:text-sm">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="text-xs sm:text-sm">
              <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
