"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { generateToken, getAuthUser, storeSession } from "@/lib/auth"
import UpdateNameSchema from "./schema"
import { ActionResponse } from "../.."
import z from "zod"

export async function updateName(formData: FormData): Promise<ActionResponse> {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return { success: false, message: "Unauthorized", error: "Unauthorized" }
    }

    const name = formData.get("name") as string

    const validationResult = UpdateNameSchema.safeParse({ name })
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: z.flattenError(validationResult.error).fieldErrors,
        values: { name },
      }
    }

    const [updatedUser] = await db
      .update(users)
      .set({ name })
      .where(eq(users.id, authUser.id))
      .returning()

    const token = await generateToken({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
    })
    await storeSession(token)

    return {
      success: true,
      message: "Name updated successfully",
    }
  } catch (error) {
    console.error("Update name error:", error)
    return {
      success: false,
      message: "An error occurred while updating your name",
      error: "Failed to update name",
    }
  }
}
