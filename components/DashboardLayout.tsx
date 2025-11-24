import React from "react"

export default function DashboardLayout({
  children,
  title,
}: Readonly<{
  children: React.ReactNode
  title: string
}>) {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      {children}
    </main>
  )
}
