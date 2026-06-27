"use server"

import { db } from "@/lib/db"
import { books } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import { ActionResponse } from ".."
import { getAuthUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { Book } from "@/types/book"

export async function addFavorite(book: Book): Promise<ActionResponse> {
  const { id, title, thumbnail, publishedDate, authors } = book
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  try {
    await db.insert(books).values({
      googleBooksId: id,
      title,
      authors,
      posterPath: thumbnail,
      releaseDate: publishedDate,
      userId: authUser.id,
    })

    revalidatePath("/dashboard/discover/books")

    return { success: true, message: `${title} was added to favorites` }
  } catch (error) {
    console.error(`Error adding ${title} to favorites`, error)
    return {
      success: false,
      message: `It wasn't possible to add ${title} to favorites`,
      error: error as string,
    }
  }
}

export async function removeFavorite(book: Book): Promise<ActionResponse> {
  const { id, title } = book
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  try {
    await db
      .delete(books)
      .where(and(eq(books.googleBooksId, id), eq(books.userId, authUser.id)))

    revalidatePath("/dashboard/discover/books")

    return { success: true, message: `${title} was removed from favorites` }
  } catch (error) {
    console.error(`Error removing ${title} from favorites`, error)
    return {
      success: false,
      message: `It wasn't possible to remove ${title} from favorites`,
      error: error as string,
    }
  }
}
