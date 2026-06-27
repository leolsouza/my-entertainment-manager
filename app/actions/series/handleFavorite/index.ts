"use server"

import { api } from "@/lib/supabase-client"
import handleSeriesSchema from "./schema"
import z from "zod"
import { ActionResponse } from "../.."
import { revalidatePath } from "next/cache"
import { getAuthUser } from "@/lib/auth"

export async function handleFavoriteSeries(
  formData: FormData
): Promise<ActionResponse> {
  const authUser = await getAuthUser()

  const id = formData.get("id") as string | undefined
  const name = formData.get("name") as string
  const first_air_date = (formData.get("first_air_date") as string) ?? undefined
  const poster_path = formData.get("poster_path") as string
  const overview = formData.get("overview") as string

  const validationResult = handleSeriesSchema.safeParse({
    name,
    first_air_date,
    poster_path,
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
      .from("series")
      .update({
        name,
        first_air_date: first_air_date ?? undefined,
        poster_path,
        user_id: authUser?.id,
      })
      .eq("id", id)
      .eq("user_id", authUser?.id)
  } else {
    result = await api.from("series").insert({
      name,
      first_air_date: first_air_date ?? undefined,
      poster_path,
      user_id: authUser?.id,
    })
  }

  revalidatePath("/dashboard/favorites/series")

  if (result === null || result.error) {
    return {
      success: false,
      message: "An error occurred while adding the series",
      error: "Failed to add series",
    }
  }

  return {
    success: true,
    message: "Movie added successfully",
  }
}

export async function deleteFavoriteSeries(
  id: number
): Promise<ActionResponse> {
  const authUser = await getAuthUser()

  const result = await api
    .from("series")
    .delete()
    .eq("id", id)
    .eq("user_id", authUser?.id)

  revalidatePath("/dashboard/favorites/series")

  if (result.error) {
    return {
      success: false,
      message: "An error occurred while deleting the series",
      error: "Failed to remove series",
    }
  }

  return {
    success: true,
    message: "Movie removed successfully",
  }
}
