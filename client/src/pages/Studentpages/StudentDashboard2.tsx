import React from "react"
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Users,
  Activity,
  Calendar,
  Clock,
  TrendingUp,
  Bell,
  Search,
  User,
  ChevronRight,
  Star,
  Target,
} from "lucide-react"

// Enhanced Card component
function Card({
  title,
  value,
  icon,
  trend,
  color = "blue",
}: {
  title: string
  value: string
  icon: React.ReactNode
  trend?: string
  color?: "blue" | "green" | "purple" | "orange"
}) {
  const colorClasses: Record<"blue" | "green" | "purple" | "orange", string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`p-2 sm:p-2.5 rounded-lg border ${colorClasses[color]}`}>
          <div className="w-4 h-4 sm:w-5 sm:h-5">{icon}</div>
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-xs sm:text-sm font-medium">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-xl sm:text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

// Quick Action Card
function QuickActionCard({ title, description, icon, color = "blue" }: {
  title: string
  description: string
  icon: React.ReactNode
  color?: "blue" | "green" | "purple"
}) {
  const colorClasses: Record<"blue" | "green" | "purple", string> = {
    blue: "bg-blue-600 hover:bg-blue-700 border-blue-600",
    green: "bg-green-600 hover:bg-green-700 border-green-600",
    purple: "bg-purple-600 hover:bg-purple-700 border-purple-600",
  }

  return (
    <div
      className={`${colorClasses[color]} text-white p-4 sm:p-5 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg border-2`}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="w-4 h-4 sm:w-5 sm:h-5">{icon}</div>
        <h3 className="text-sm sm:text-base font-medium">{title}</h3>
      </div>
      <p className="text-xs sm:text-sm opacity-90 leading-relaxed">{description}</p>
      <div className="flex justify-end">
        <ChevronRight className="w-4 h-4 mt-2 sm:mt-3 opacity-75" />
      </div>
    </div>
  )
}

// Activity Item
function ActivityItem({
  emoji,
  text,
  time,
  type,
}: {
  emoji: string
  text: string
  time: string
  type: "achievement" | "course" | "event"
}) {
  const typeColors = {
    achievement: "bg-yellow-100 text-yellow-800",
    course: "bg-blue-100 text-blue-800",
    event: "bg-green-100 text-green-800",
  }

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-2 sm:gap-3">
        <span className="text-lg sm:text-xl">{emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base text-gray-800 font-medium leading-snug">{text}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
            <span
              className={`px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium ${typeColors[type]} inline-block w-fit`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard2() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-lg sm:text-xl font-semibold text-blue-700 flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:block">Student Dashboard</span>
            <span className="block sm:hidden">Dashboard</span>
          </h1>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - Hidden on mobile, visible on tablet+ */}
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, activities..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 w-48 xl:w-64"
              />
            </div>

            {/* Mobile Search Button */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <button className="flex items-center gap-2 px-2 sm:px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="hidden md:block text-sm font-medium text-gray-700">
                Alex Johnson
              </span>
            </button>

            <button className="px-2 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              <span className="hidden sm:block">Logout</span>
              <span className="block sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Welcome back, Alex! 👋
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Here's a quick summary of your progress today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card
            title="Courses Enrolled"
            value="10"
            icon={<BookOpen />}
            trend="+1"
            color="blue"
          />
          <Card
            title="Certifications"
            value="4"
            icon={<Award />}
            trend="+2"
            color="green"
          />
          <Card title="Club Activities" value="6" icon={<Users />} color="purple" />
          <Card
            title="Workshops Attended"
            value="3"
            icon={<Activity />}
            trend="+1"
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <section className="mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <QuickActionCard
              title="Browse Courses"
              description="Discover and enroll in new courses"
              icon={<BookOpen className="w-5 h-5" />}
              color="blue"
            />
            <QuickActionCard
              title="Join Events"
              description="Check out upcoming events & seminars"
              icon={<Calendar className="w-5 h-5" />}
              color="green"
            />
            <QuickActionCard
              title="Track Progress"
              description="Monitor your academic growth"
              icon={<Target className="w-5 h-5" />}
              color="purple"
            />
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Activities */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                Recent Activities
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <ActivityItem
                emoji="✅"
                text="Completed ReactJS Basics"
                time="2 hours ago"
                type="course"
              />
              <ActivityItem
                emoji="🎓"
                text="Earned 'Data Science Certificate'"
                time="1 day ago"
                type="achievement"
              />
              <ActivityItem
                emoji="🏆"
                text="Won 1st Place in Coding Challenge"
                time="3 days ago"
                type="achievement"
              />
              <ActivityItem
                emoji="📚"
                text="Started 'Machine Learning 101'"
                time="1 week ago"
                type="course"
              />
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-4 sm:space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                Upcoming Events
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm sm:text-base font-medium text-blue-900">AI Workshop</p>
                  <p className="text-xs sm:text-sm text-blue-700">Sep 20, 10:00 AM</p>
                </div>
                <div className="p-2 sm:p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm sm:text-base font-medium text-green-900">Career Fair</p>
                  <p className="text-xs sm:text-sm text-green-700">Sep 25, 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                Learning Progress
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="font-medium text-gray-700">React Development</span>
                    <span className="text-gray-600">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="font-medium text-gray-700">Python Basics</span>
                    <span className="text-gray-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
