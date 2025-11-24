import DashboardLayout from "@/components/DashboardLayout"
import React from "react"

export default function DiscoverSeriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout title="Series">{children}</DashboardLayout>
}
