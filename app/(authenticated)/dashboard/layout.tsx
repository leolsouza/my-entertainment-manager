import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth_token")?.value
  const authUser = cookieStore.get("auth_user")?.value

  if (!authToken || !authUser) {
    redirect("/signin?unauthenticated=true")
  }

  return (
    <SidebarProvider>
      <AppSidebar authUser={JSON.parse(authUser)} />
      <div className="w-full">
        <div className="px-4 py-6">{children}</div>
      </div>
    </SidebarProvider>
  )
}
