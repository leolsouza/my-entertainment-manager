"use server"

import { api } from "@/lib/supabase-client"
import { ActionResponse } from "../auth"
import { getAuthUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { Book } from "@/types/book"

export async function addFavorite(book: Book): Promise<ActionResponse> {
  const { id, title, thumbnail, publishedDate, authors } = book
  const authUser = await getAuthUser()

  const { error } = await api.from("books").insert([
    {
      google_books_id: id,
      title,
      authors,
      poster_path: thumbnail,
      release_date: publishedDate ? new Date(publishedDate) : undefined,
      user_id: authUser?.id,
    },
  ])

  revalidatePath("/dashboard/discover/books")

  if (error) {
    console.log(`Error in add ${title} to favorites`, error)
    return {
      success: false,
      message: `It wasn't possible add ${title} to favorites`,
      error: error.message,
    }
  }

  return {
    success: true,
    message: `${title} was add to favorite`,
  }
}

export async function removeFavorite(book: Book): Promise<ActionResponse> {
  const { id, title } = book
  try {
    await api.from("books").delete().eq("google_books_id", id)
    return {
      success: true,
      message: `${title} was remove from favorite`,
    }
  } catch (error) {
    console.log(`Error in remove ${title} from favorites`, error)
    return {
      success: false,
      message: `It wasn't possible remove ${title} from favorites`,
      error: error as string,
    }
  }
}
