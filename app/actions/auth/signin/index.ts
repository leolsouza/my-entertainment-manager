"use server"

import api from "@/lib/supabase-client"
import SignInSchema from "./schema"
import { ActionResponse } from ".."
import { storeSession } from "@/lib/auth"
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
      }
    }

    const { data } = await api.auth.signInWithPassword({
      email,
      password,
    })

    if (data.session === null) {
      return {
        success: false,
        message: "Invalid email or password",
        error: "No session returned",
      }
    }

    await storeSession(data.session)

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
