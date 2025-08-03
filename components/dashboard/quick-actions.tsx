"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Settings, Users, BarChart3 } from "lucide-react"

const actions = [
  {
    title: "Create Report",
    description: "Generate a new analytics report",
    icon: FileText,
    action: () => console.log("Create report"),
  },
  {
    title: "Manage Users",
    description: "Add or remove team members",
    icon: Users,
    action: () => console.log("Manage users"),
  },
  {
    title: "View Analytics",
    description: "Check your app performance",
    icon: BarChart3,
    action: () => console.log("View analytics"),
  },
  {
    title: "Settings",
    description: "Configure your application",
    icon: Settings,
    action: () => console.log("Open settings"),
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {actions.map((action, index) => (
            <Button key={index} variant="ghost" className="h-auto justify-start p-4" onClick={action.action}>
              <action.icon className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
