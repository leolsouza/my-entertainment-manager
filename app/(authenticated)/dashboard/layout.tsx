import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
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
        <div className="flex items-center gap-2 border-b px-4 py-3 md:hidden">
          <SidebarTrigger />
          <span className="font-medium">My Entertainment Manager</span>
        </div>
        <div className="px-4 py-6">{children}</div>
      </div>
    </SidebarProvider>
  )
}
