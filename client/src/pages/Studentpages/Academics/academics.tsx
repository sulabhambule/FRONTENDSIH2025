import { GradeOverview } from "@/pages/Studentpages/Academics/grade-overview"
import { CoursePerformance } from "@/pages/Studentpages/Academics/course-performance"
import { SemesterComparison } from "@/pages/Studentpages/Academics/semester-comparison"
import { GradeDistribution } from "@/pages/Studentpages/Academics/grade-distribution"
import { AcademicGoals } from "@/pages/Studentpages/Academics/academics-goals"

export default function AcademicsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Academic Performance</h1>
        <p className="text-muted-foreground">
          Track your grades, analyze course performance, and monitor academic progress.
        </p>
      </div>

      <GradeOverview />

      <div className="grid gap-6 lg:grid-cols-2">
        <CoursePerformance />
        <SemesterComparison />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GradeDistribution />
        </div>
        <AcademicGoals />
      </div>
    </div>
  )
}
