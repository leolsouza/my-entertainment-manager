"use server"

import { db } from "@/lib/db"
import { series } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import handleSeriesSchema from "./schema"
import z from "zod"
import { ActionResponse } from "../.."
import { revalidatePath } from "next/cache"
import { getAuthUser } from "@/lib/auth"

export async function handleFavoriteSeries(
  formData: FormData
): Promise<ActionResponse> {
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  const id = formData.get("id") as string | undefined
  const name = formData.get("name") as string
  const first_air_date = (formData.get("first_air_date") as string) ?? undefined
  const poster_path = (formData.get("poster_url") as string) ?? undefined

  const validationResult = handleSeriesSchema.safeParse({
    name,
    first_air_date,
    poster_path,
  })
  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validationResult.error).fieldErrors,
      values: {
        name,
        first_air_date: first_air_date ?? "",
        poster_url: poster_path ?? "",
      },
    }
  }

  if (id) {
    await db
      .update(series)
      .set({ name, firstAirDate: first_air_date, posterPath: poster_path })
      .where(and(eq(series.id, Number(id)), eq(series.userId, authUser.id)))
  } else {
    await db.insert(series).values({
      name,
      firstAirDate: first_air_date,
      posterPath: poster_path,
      userId: authUser.id,
    })
  }

  revalidatePath("/dashboard/favorites/series")

  return {
    success: true,
    message: "Series saved successfully",
  }
}

export async function deleteFavoriteSeries(id: number): Promise<ActionResponse> {
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  await db
    .delete(series)
    .where(and(eq(series.id, id), eq(series.userId, authUser.id)))

  revalidatePath("/dashboard/favorites/series")

  return {
    success: true,
    message: "Series removed successfully",
  }
}
