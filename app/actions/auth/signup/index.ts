"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { hash } from "bcryptjs"
import { generateToken, storeSession } from "@/lib/auth"
import SignUpSchema from "./schema"
import { ActionResponse } from "../.."
import z from "zod"

export async function signUp(formData: FormData): Promise<ActionResponse> {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    const validationResult = SignUpSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    })
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: z.flattenError(validationResult.error).fieldErrors,
      }
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    if (existingUser) {
      return {
        success: false,
        message: "Email already in use",
        error: "Email already in use",
      }
    }

    const hashedPassword = await hash(password, 12)
    const [newUser] = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning()

    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })
    await storeSession(token)

    return {
      success: true,
      message: "Account created successfully",
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return {
      success: false,
      message: "An error occurred while creating your account",
      error: "Failed to create account",
    }
  }
}
