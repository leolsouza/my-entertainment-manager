"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { compare, hash } from "bcryptjs"
import { getAuthUser } from "@/lib/auth"
import UpdatePasswordSchema from "./schema"
import { ActionResponse } from "../.."
import z from "zod"

export async function updatePassword(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return { success: false, message: "Unauthorized", error: "Unauthorized" }
    }

    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmNewPassword = formData.get("confirmNewPassword") as string

    const validationResult = UpdatePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmNewPassword,
    })
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: z.flattenError(validationResult.error).fieldErrors,
      }
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, authUser.id))

    if (!user) {
      return { success: false, message: "Unauthorized", error: "Unauthorized" }
    }

    const passwordMatch = await compare(currentPassword, user.password)
    if (!passwordMatch) {
      return {
        success: false,
        message: "Current password is incorrect",
        errors: { currentPassword: ["Current password is incorrect"] },
      }
    }

    const hashedPassword = await hash(newPassword, 12)
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, authUser.id))

    return {
      success: true,
      message: "Password updated successfully",
    }
  } catch (error) {
    console.error("Update password error:", error)
    return {
      success: false,
      message: "An error occurred while updating your password",
      error: "Failed to update password",
    }
  }
}
