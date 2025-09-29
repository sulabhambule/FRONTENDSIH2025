import { Clock, CheckCircle, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface Stats {
  totalPending: number
  totalApproved: number
  totalRejected: number
  avgProcessingTime: string
}

interface ApprovalStatsProps {
  stats: Stats
}

export function ApprovalStats({ stats }: ApprovalStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card className="animate-slide-up">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-base lg:text-lg flex items-center">
            <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
            Pending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalPending}</div>
          <p className="text-xs sm:text-sm text-gray-600">Awaiting review</p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-base lg:text-lg flex items-center">
            <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            Approved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalApproved}</div>
          <p className="text-xs sm:text-sm text-gray-600">This semester</p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-base lg:text-lg flex items-center">
            <X className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
            Rejected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalRejected}</div>
          <p className="text-xs sm:text-sm text-gray-600">This semester</p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-base lg:text-lg flex items-center">
            <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            Avg. Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.avgProcessingTime}</div>
          <p className="text-xs sm:text-sm text-gray-600">Processing time</p>
        </CardContent>
      </Card>
    </div>
  )
}
