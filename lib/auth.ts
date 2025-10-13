import { Session } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export async function storeSession(session: Session) {
  try {
    const cookieStore = await cookies()
    cookieStore.set({
      name: "auth_token",
      value: session.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: session.expires_at,
    })

    return true
  } catch (error) {
    console.error("Error creating session:", error)
    return false
  }
}


