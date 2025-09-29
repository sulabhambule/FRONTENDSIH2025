"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { NotificationStats } from "./NotificationStats"
import { PendingTasks } from "./PendingTasks"
import { Reminders } from "./Reminders"
import { MessagingCenter } from "./MessagingCenter"
import notificationsData from "./notifications.json"

export const NotificationsCommunication: React.FC = () => {
  const [notificationData, setNotificationData] = useState(notificationsData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNotificationData()
  }, [])

  const fetchNotificationData = async () => {
    setLoading(true)
    try {
      // TODO: API call to fetch notification data
      // const response = await fetch('/api/teacher/notifications');
      // const data = await response.json();
      // setNotificationData(data);

      // Using dummy data for now
      setNotificationData(notificationsData)
    } catch (error) {
      console.error("Error fetching notification data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Notifications & Communication</h1>
          <p className="text-gray-600">Manage your tasks, reminders, and communications</p>
        </div>

        <NotificationStats
          pendingTasks={notificationData.pendingTasks}
          reminders={notificationData.reminders}
          messages={notificationData.messages}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PendingTasks tasks={notificationData.pendingTasks} />
          <Reminders reminders={notificationData.reminders} />
        </div>

        <MessagingCenter messages={notificationData.messages} announcements={notificationData.announcements} />
      </div>
    </div>
  )
}

export default NotificationsCommunication
