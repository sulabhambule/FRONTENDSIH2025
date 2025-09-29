"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Users, BarChart3, MessageSquare, Settings, Upload } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Generate Report",
      description: "Create NAAC, NIRF, or custom reports",
      icon: FileText,
      color: "bg-admin-primary",
      onClick: () => {
        // TODO: Implement report generation
        // navigate('/admin/reports')
        console.log("Navigate to reports")
      },
    },
    {
      title: "Add Domain",
      description: "Create new activity domain",
      icon: Plus,
      color: "bg-admin-success",
      onClick: () => {
        // TODO: Implement domain addition
        // openAddDomainModal()
        console.log("Open add domain modal")
      },
    },
    {
      title: "Bulk Import",
      description: "Import student/teacher data",
      icon: Upload,
      color: "bg-admin-warning",
      onClick: () => {
        // TODO: Implement bulk import
        // openBulkImportModal()
        console.log("Open bulk import modal")
      },
    },
    {
      title: "Send Announcement",
      description: "Broadcast to students/teachers",
      icon: MessageSquare,
      color: "bg-admin-info",
      onClick: () => {
        // TODO: Implement announcement
        // navigate('/admin/communication')
        console.log("Navigate to communication")
      },
    },
    {
      title: "View Analytics",
      description: "System performance insights",
      icon: BarChart3,
      color: "bg-purple-600",
      onClick: () => {
        // TODO: Implement analytics view
        // navigate('/admin/reports')
        console.log("Navigate to analytics")
      },
    },
    {
      title: "Manage Users",
      description: "Add/edit user permissions",
      icon: Users,
      color: "bg-pink-600",
      onClick: () => {
        // TODO: Implement user management
        // navigate('/admin/roles')
        console.log("Navigate to roles")
      },
    },
  ]

  return (
    <Card className="admin-metric-card p-6 admin-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-admin-foreground">Quick Actions</h3>
        <Button variant="ghost" size="sm" className="text-admin-muted-foreground hover:text-admin-foreground">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-admin-secondary transition-colors"
            onClick={action.onClick}
          >
            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-admin-foreground text-sm">{action.title}</h4>
              <p className="text-xs text-admin-muted-foreground mt-1">{action.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  )
}
