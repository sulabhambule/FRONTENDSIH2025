"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, Users, FileText, Clock } from "lucide-react"

interface RemindersProps {
  reminders: any[]
}

export const Reminders: React.FC<RemindersProps> = ({ reminders }) => {
  const getReminderIcon = (type: string) => {
    switch (type) {
      case "club_report":
        return <Users className="w-4 h-4" />
      case "grade_submission":
        return <FileText className="w-4 h-4" />
      case "meeting":
        return <Calendar className="w-4 h-4" />
      case "appraisal":
        return <FileText className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 2) return "text-red-600"
    if (daysLeft <= 7) return "text-yellow-600"
    return "text-green-600"
  }

  const handleReminderAction = (reminderId: string, action: string) => {
    // TODO: API call to handle reminder action
    // await handleReminder(reminderId, action);
    console.log(`${action} reminder:`, reminderId)
  }

  const handleSnoozeReminder = (reminderId: string) => {
    // TODO: API call to snooze reminder
    // await snoozeReminder(reminderId, snoozeHours);
    console.log("Snooze reminder:", reminderId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Reminders ({reminders.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{getReminderIcon(reminder.type)}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{reminder.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                    {reminder.clubName && <p className="text-sm text-purple-600 mt-1">Club: {reminder.clubName}</p>}
                    {reminder.subject && (
                      <p className="text-sm text-blue-600 mt-1">
                        Subject: {reminder.subject} - {reminder.class}
                      </p>
                    )}
                    {reminder.location && <p className="text-sm text-green-600 mt-1">Location: {reminder.location}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getPriorityColor(reminder.priority)}>{reminder.priority}</Badge>
                  <div className={`text-sm font-medium ${getDaysLeftColor(reminder.daysLeft)}`}>
                    {reminder.daysLeft} days left
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Due: {new Date(reminder.dueDate).toLocaleDateString()}</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleSnoozeReminder(reminder.id)}>
                    <Clock className="w-4 h-4 mr-1" />
                    Snooze
                  </Button>
                  {reminder.type === "club_report" && (
                    <Button size="sm" onClick={() => handleReminderAction(reminder.id, "submit_report")}>
                      Submit Report
                    </Button>
                  )}
                  {reminder.type === "grade_submission" && (
                    <Button size="sm" onClick={() => handleReminderAction(reminder.id, "submit_grades")}>
                      Submit Grades
                    </Button>
                  )}
                  {reminder.type === "meeting" && (
                    <Button size="sm" onClick={() => handleReminderAction(reminder.id, "add_calendar")}>
                      Add to Calendar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {reminders.length === 0 && <div className="text-center py-8 text-gray-500">No upcoming reminders.</div>}

        {/* TODO: API calls for reminder management */}
        {/*
        const fetchReminders = async () => {
          const response = await fetch('/api/teacher/reminders');
          const reminders = await response.json();
          return reminders;
        };
        
        const snoozeReminder = async (reminderId, hours) => {
          const response = await fetch(`/api/teacher/reminders/${reminderId}/snooze`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ snoozeHours: hours })
          });
          return response.json();
        };
        */}
      </CardContent>
    </Card>
  )
}
