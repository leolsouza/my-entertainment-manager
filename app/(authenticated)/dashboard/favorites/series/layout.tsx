import DashboardLayout from "@/components/DashboardLayout"
import React from "react"

export default function FavoriteSeriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout title="Favorite Series">{children}</DashboardLayout>
}
