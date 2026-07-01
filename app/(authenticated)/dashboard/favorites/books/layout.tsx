import DashboardLayout from "@/components/DashboardLayout"
import React from "react"

export default function FavoriteBooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardLayout title="Favorite Books">{children}</DashboardLayout>
}
