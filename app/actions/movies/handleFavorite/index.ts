"use server"

import { db } from "@/lib/db"
import { movies } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import handleMovieSchema from "./schema"
import z from "zod"
import { ActionResponse } from "../.."
import { revalidatePath } from "next/cache"
import { getAuthUser } from "@/lib/auth"

export async function handleFavoriteMovie(
  formData: FormData
): Promise<ActionResponse> {
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

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
      values: { title, release_date: release_date ?? "", overview },
    }
  }

  if (id) {
    await db
      .update(movies)
      .set({ title, releaseDate: release_date, overview })
      .where(and(eq(movies.id, Number(id)), eq(movies.userId, authUser.id)))
  } else {
    await db.insert(movies).values({
      title,
      releaseDate: release_date,
      overview,
      userId: authUser.id,
    })
  }

  revalidatePath("/dashboard/favorites/movies")

  return {
    success: true,
    message: "Movie saved successfully",
  }
}

export async function deleteFavoriteMovie(id: number): Promise<ActionResponse> {
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  await db
    .delete(movies)
    .where(and(eq(movies.id, id), eq(movies.userId, authUser.id)))

  revalidatePath("/dashboard/favorites/movies")

  return {
    success: true,
    message: "Movie removed successfully",
  }
}
