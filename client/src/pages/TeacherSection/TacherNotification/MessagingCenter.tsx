"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Search } from "lucide-react"

interface MessagingCenterProps {
  messages: any[]
  announcements: any[]
}

export const MessagingCenter: React.FC<MessagingCenterProps> = ({ messages, announcements }) => {
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [replyText, setReplyText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    targetAudience: "all_students",
  })

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || message.status === filterStatus
    return matchesSearch && matchesFilter
  })

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

  const handleReply = async (messageId: string) => {
    // TODO: API call to send reply
    // await sendReply(messageId, replyText);
    console.log("Reply to message:", messageId, replyText)
    setReplyText("")
    setSelectedMessage(null)
  }

  const handleMarkAsRead = async (messageId: string) => {
    // TODO: API call to mark message as read
    // await markMessageAsRead(messageId);
    console.log("Mark as read:", messageId)
  }

  const handleSendAnnouncement = async () => {
    // TODO: API call to send announcement
    // await sendAnnouncement(newAnnouncement);
    console.log("Send announcement:", newAnnouncement)
    setNewAnnouncement({ title: "", content: "", targetAudience: "all_students" })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Messages ({messages.filter((m) => m.status === "unread").length} unread)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`border rounded-lg p-3 cursor-pointer hover:shadow-sm transition-shadow ${message.status === "unread" ? "bg-blue-50 border-blue-200" : "bg-white"
                  }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{message.from}</h4>
                    <p className="text-sm text-gray-600">{message.subject}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                    {message.status === "unread" && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-600">{message.course}</span>
                  <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          {selectedMessage && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="mb-3">
                <h4 className="font-semibold">{selectedMessage.subject}</h4>
                <p className="text-sm text-gray-600 mb-2">From: {selectedMessage.from}</p>
                <p className="text-sm">{selectedMessage.message}</p>
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleReply(selectedMessage.id)} disabled={!replyText.trim()}>
                    <Send className="w-4 h-4 mr-1" />
                    Send Reply
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(selectedMessage.id)}>
                    Mark as Read
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setSelectedMessage(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-green-600" />
            Send Announcement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Input
                placeholder="Announcement title..."
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <select
                value={newAnnouncement.targetAudience}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    targetAudience: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="all_students">All Students</option>
                <option value="my_classes">My Classes Only</option>
                <option value="programming_club">Programming Club</option>
                <option value="mentees">My Mentees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <Textarea
                placeholder="Write your announcement..."
                value={newAnnouncement.content}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    content: e.target.value,
                  })
                }
                rows={4}
              />
            </div>

            <Button
              onClick={handleSendAnnouncement}
              disabled={!newAnnouncement.title.trim() || !newAnnouncement.content.trim()}
              className="w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Announcement
            </Button>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Recent Announcements</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded p-3 bg-green-50">
                  <h5 className="font-medium text-gray-900">{announcement.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className="text-xs">
                      {announcement.targetAudience.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(announcement.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TODO: API calls for messaging */}
      {/*
      const fetchMessages = async () => {
        const response = await fetch('/api/teacher/messages');
        const messages = await response.json();
        return messages;
      };
      
      const sendReply = async (messageId, replyText) => {
        const response = await fetch(`/api/teacher/messages/${messageId}/reply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: replyText })
        });
        return response.json();
      };
      
      const sendAnnouncement = async (announcement) => {
        const response = await fetch('/api/teacher/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(announcement)
        });
        return response.json();
      };
      */}
    </div>
  )
}
