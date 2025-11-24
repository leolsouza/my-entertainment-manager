import DashboardLayout from "@/components/DashboardLayout"
import React from "react"

export default function FavoriteMoviesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout title="Favorite Movies">{children}</DashboardLayout>
}
