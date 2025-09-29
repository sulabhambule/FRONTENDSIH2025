import { AchievementOverview } from "@/pages/Studentpages/Achievements/achievement-overview"
import { BadgeCollection } from "@/pages/Studentpages/Achievements/badge-collection"
import { MilestoneProgress } from "@/pages/Studentpages/Achievements/milestone-progress"
import { LeaderboardCard } from "@/pages/Studentpages/Achievements/leaderboard-card"
import { RecentAchievements } from "@/pages/Studentpages/Achievements/recent-achievements"

export default function AchievementsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Achievements</h1>
        <p className="text-muted-foreground">
          Track your academic milestones, earn badges, and celebrate your progress.
        </p>
      </div>

      <AchievementOverview />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BadgeCollection />
        </div>
        <div className="space-y-6">
          <LeaderboardCard />
          <RecentAchievements />
        </div>
      </div>

      <MilestoneProgress />
    </div>
  )
}
