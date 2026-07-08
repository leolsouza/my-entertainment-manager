"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { compare } from "bcryptjs"
import { generateToken, storeSession } from "@/lib/auth"
import SignInSchema from "./schema"
import { ActionResponse } from "../.."
import z from "zod"

export async function signIn(formData: FormData): Promise<ActionResponse> {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const validationResult = SignInSchema.safeParse({ email, password })
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: z.flattenError(validationResult.error).fieldErrors,
        values: { email },
      }
    }

    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
        error: "User not found",
        values: { email },
      }
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return {
        success: false,
        message: "Invalid email or password",
        error: "Wrong password",
        values: { email },
      }
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    })
    await storeSession(token)

    return {
      success: true,
      message: "Signed in successfully",
    }
  } catch (error) {
    console.error("Sign in error:", error)
    return {
      success: false,
      message: "An error occurred while signing in",
      error: "Failed to sign in",
    }
  }
}
