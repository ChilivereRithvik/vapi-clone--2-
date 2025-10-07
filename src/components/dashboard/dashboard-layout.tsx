import type React from "react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardNav } from "./dashboard-nav"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardNav />
      <main className="container py-6">{children}</main>
    </div>
  )
}
