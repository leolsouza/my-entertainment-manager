"use server"

import { db } from "@/lib/db"
import { books } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import handleBookSchema from "./schema"
import z from "zod"
import { ActionResponse } from "../.."
import { revalidatePath } from "next/cache"
import { getAuthUser } from "@/lib/auth"

export async function handleFavoriteBook(
  formData: FormData
): Promise<ActionResponse> {
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  const id = formData.get("id") as string | undefined
  const title = formData.get("title") as string
  const published_date = (formData.get("published_date") as string) ?? undefined
  const poster_url = (formData.get("poster_url") as string) ?? undefined

  const validationResult = handleBookSchema.safeParse({
    title,
    published_date,
    poster_url,
  })
  if (!validationResult.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validationResult.error).fieldErrors,
    }
  }

  if (id) {
    await db
      .update(books)
      .set({ title, releaseDate: published_date, posterPath: poster_url })
      .where(and(eq(books.id, Number(id)), eq(books.userId, authUser.id)))
  } else {
    await db.insert(books).values({
      title,
      releaseDate: published_date,
      posterPath: poster_url,
      userId: authUser.id,
    })
  }

  revalidatePath("/dashboard/favorites/books")

  return {
    success: true,
    message: "Book saved successfully",
  }
}

export async function deleteFavoriteBook(id: number): Promise<ActionResponse> {
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  await db
    .delete(books)
    .where(and(eq(books.id, id), eq(books.userId, authUser.id)))

  revalidatePath("/dashboard/favorites/books")

  return {
    success: true,
    message: "Book removed successfully",
  }
}
