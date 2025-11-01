import { Session, User } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { unixTimestampToDate } from "./utils"

const DEFAULT_EXPIRATION_AUTHENTICATION = 60 * 60 * 1000
const defaultExpirationDate = new Date(
  Date.now() + DEFAULT_EXPIRATION_AUTHENTICATION
)
const AUTH_USER_KEY = "auth_user"
const AUTH_TOKEN_KEY = "auth_token"

export async function clearSession() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(AUTH_TOKEN_KEY)
    cookieStore.delete(AUTH_USER_KEY)
    return true
  } catch (error) {
    console.error("Error clearing session:", error)
    return false
  }
}

export async function storeSession(session: Session) {
  const expirationDate = session.expires_at
    ? unixTimestampToDate(session.expires_at)
    : defaultExpirationDate
  try {
    const cookieStore = await cookies()
    cookieStore.set({
      name: AUTH_TOKEN_KEY,
      value: session.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: expirationDate,
    })
    return true
  } catch (error) {
    await clearSession()
    console.error("Error creating session:", error)
    return false
  }
}

export async function storeAuthUser(user: User) {
  try {
    const cookieStore = await cookies()
    cookieStore.set({
      name: AUTH_USER_KEY,
      value: JSON.stringify(user),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: defaultExpirationDate,
    })

    return true
  } catch (error) {
    await clearSession()
    console.error("Error creating session:", error)
    return false
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_TOKEN_KEY)?.value
}

export async function getAuthUser(): Promise<User | undefined> {
  const cookieStore = await cookies()
  const string = cookieStore.get(AUTH_USER_KEY)?.value
  if (string) return JSON.parse(string)
}
