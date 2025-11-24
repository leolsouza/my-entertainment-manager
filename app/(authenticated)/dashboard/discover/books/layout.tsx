import DashboardLayout from "@/components/DashboardLayout"
import React from "react"

export default function DiscoverBooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout title="Books">{children}</DashboardLayout>
}
