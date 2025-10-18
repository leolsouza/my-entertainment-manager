"use server"

import api from "@/lib/supabase-client"
import { ActionResponse } from ".."
import { storeAuthUser, storeSession } from "@/lib/auth"
import z from "zod"
import SignUpSchema from "./schema"

export async function signUp(formData: FormData): Promise<ActionResponse> {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    const validationResult = SignUpSchema.safeParse({
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

    const { data } = await api.auth.signUp({
      email,
      password,
    })

    if (data.session === null || data.user === null) {
      return {
        success: false,
        message: "Invalid email or password",
        error: "No session returned",
      }
    }

    await storeSession(data.session)
    await storeAuthUser(data.user)

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
