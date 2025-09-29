import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"

const scheduleItems = [
  {
    id: 1,
    title: "Database Systems",
    course: "CS 315",
    time: "9:00 AM - 10:30 AM",
    location: "Room 204, CS Building",
    type: "Lecture",
  },
  {
    id: 2,
    title: "Calculus II",
    course: "MATH 152",
    time: "11:00 AM - 12:00 PM",
    location: "Room 101, Math Building",
    type: "Lecture",
  },
  {
    id: 3,
    title: "Physics Lab",
    course: "PHYS 201",
    time: "2:00 PM - 4:00 PM",
    location: "Lab 3, Physics Building",
    type: "Lab",
  },
]

export function UpcomingSchedule() {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
        <CardDescription>Your classes and activities for today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduleItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <span className="text-xs text-muted-foreground bg-primary/10 text-primary px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{item.course}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
