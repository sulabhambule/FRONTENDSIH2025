"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, FileCheck, Upload, Award } from "lucide-react"

interface PendingTasksProps {
  tasks: any[]
}

export const PendingTasks: React.FC<PendingTasksProps> = ({ tasks }) => {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case "certificate_verification":
        return <Award className="w-4 h-4" />
      case "assignment_check":
        return <FileCheck className="w-4 h-4" />
      case "attendance_upload":
        return <Upload className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleTaskAction = (taskId: string, action: string) => {
    // TODO: API call to handle task action
    // await handlePendingTask(taskId, action);
    console.log(`${action} task:`, taskId)
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          Pending Tasks ({tasks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`border rounded-lg p-4 ${isOverdue(task.dueDate) ? "border-red-200 bg-red-50" : "border-gray-200"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{getTaskIcon(task.type)}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    {task.studentName && (
                      <p className="text-sm text-blue-600 mt-1">
                        Student: {task.studentName} ({task.studentId})
                      </p>
                    )}
                    {task.subject && (
                      <p className="text-sm text-purple-600 mt-1">
                        Subject: {task.subject} - {task.class}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                  {isOverdue(task.dueDate) && <span className="text-red-600 ml-2 font-medium">OVERDUE</span>}
                </div>
                <div className="flex gap-2">
                  {task.type === "certificate_verification" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => window.open(task.documentUrl, "_blank")}>
                        View Document
                      </Button>
                      <Button size="sm" onClick={() => handleTaskAction(task.id, "approve")}>
                        Approve
                      </Button>
                    </>
                  )}
                  {task.type === "assignment_check" && (
                    <Button size="sm" onClick={() => handleTaskAction(task.id, "review")}>
                      Review Submissions
                    </Button>
                  )}
                  {task.type === "attendance_upload" && (
                    <Button size="sm" onClick={() => handleTaskAction(task.id, "upload")}>
                      Upload Attendance
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && <div className="text-center py-8 text-gray-500">No pending tasks at the moment.</div>}

        {/* TODO: API calls for task management */}
        {/*
        const fetchPendingTasks = async () => {
          const response = await fetch('/api/teacher/pending-tasks');
          const tasks = await response.json();
          return tasks;
        };
        
        const handlePendingTask = async (taskId, action) => {
          const response = await fetch(`/api/teacher/tasks/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action })
          });
          return response.json();
        };
        */}
      </CardContent>
    </Card>
  )
}
