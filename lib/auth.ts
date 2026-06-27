import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import type { AuthUser } from "@/types/auth"

const AUTH_TOKEN_KEY = "auth_token"
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 // 24 hours

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error("Missing JWT_SECRET environment variable")
  return new TextEncoder().encode(secret)
}

export async function generateToken(user: AuthUser): Promise<string> {
  return new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(getJwtSecret())
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret())
    return { id: payload.id as number, email: payload.email as string }
  } catch {
    return null
  }
}

export async function storeSession(token: string) {
  try {
    const cookieStore = await cookies()
    cookieStore.set({
      name: AUTH_TOKEN_KEY,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: SESSION_EXPIRATION_SECONDS,
    })
    return true
  } catch (error) {
    console.error("Error storing session:", error)
    return false
  }
}

export async function clearSession() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(AUTH_TOKEN_KEY)
    return true
  } catch (error) {
    console.error("Error clearing session:", error)
    return false
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_TOKEN_KEY)?.value
}

export async function getAuthUser(): Promise<AuthUser | undefined> {
  const token = await getSession()
  if (!token) return undefined
  const user = await verifyToken(token)
  return user ?? undefined
}
