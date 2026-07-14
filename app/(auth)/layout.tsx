import { getAuthUser, getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authToken = await getSession()
  const authUser = await getAuthUser()

  if (authToken && authUser) {
    redirect("/dashboard")
  }

  return children
}
