import DashboardLayout from "@/components/DashboardLayout"
import React from "react"

export default function DiscoverMoviesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout title="Movies">{children}</DashboardLayout>
}
