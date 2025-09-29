"use client"

import { Search, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentSearchFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filterClass: string
  setFilterClass: (classFilter: string) => void
  filterSemester: string
  setFilterSemester: (semester: string) => void
}

export function StudentSearchFilters({
  searchQuery,
  setSearchQuery,
  filterClass,
  setFilterClass,
  filterSemester,
  setFilterSemester,
}: StudentSearchFiltersProps) {
  return (
    <Card className="animate-slide-up">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>

          <Select value={filterClass} onValueChange={setFilterClass}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Information Technology">Information Technology</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSemester} onValueChange={setFilterSemester}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              <SelectItem value="6th Semester">6th Semester</SelectItem>
              <SelectItem value="4th Semester">4th Semester</SelectItem>
              <SelectItem value="2nd Semester">2nd Semester</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
