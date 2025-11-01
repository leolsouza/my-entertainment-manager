import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getAuthUser, getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authToken = await getSession()
  const authUser = await getAuthUser()

  if (!authToken || !authUser) {
    redirect("/signin?unauthenticated=true")
  }

  return (
    <SidebarProvider>
      <AppSidebar authUser={authUser} />
      <div className="w-full">
        <div className="px-4 py-6">{children}</div>
      </div>
    </SidebarProvider>
  )
}
