"use server"

import { api } from "@/lib/supabase-client"
import handleMovieSchema from "./schema"
import z from "zod"
import { ActionResponse } from "../.."
import { revalidatePath } from "next/cache"
import { getAuthUser } from "@/lib/auth"

export async function handleFavoriteMovie(
  formData: FormData
): Promise<ActionResponse> {
  const authUser = await getAuthUser()

  const id = formData.get("id") as string | undefined
  const title = formData.get("title") as string
  const release_date = (formData.get("release_date") as string) ?? undefined
  const overview = formData.get("overview") as string

  const validationResult = handleMovieSchema.safeParse({
    title,
    release_date,
    overview,
  })
  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validationResult.error).fieldErrors,
    }
  }

  let result = null

  if (id) {
    result = await api
      .from("movies")
      .update({
        title,
        release_date: release_date ?? undefined,
        overview,
        user_id: authUser?.id,
      })
      .eq("id", id)
      .eq("user_id", authUser?.id)
  } else {
    result = await api.from("movies").insert({
      title,
      release_date: release_date ?? undefined,
      overview,
      user_id: authUser?.id,
    })
  }

  revalidatePath("/dashboard/favorites/movies")

  if (result === null || result.error) {
    return {
      success: false,
      message: "An error occurred while adding the movie",
      error: "Failed to add movie",
    }
  }

  return {
    success: true,
    message: "Movie added successfully",
  }
}
