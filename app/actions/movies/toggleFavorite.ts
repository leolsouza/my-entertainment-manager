"use server"

import { db } from "@/lib/db"
import { movies } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import { ActionResponse } from ".."
import { Movie } from "@/types/movie"
import { getAuthUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function addFavorite(movie: Movie): Promise<ActionResponse> {
  const { id, poster_path, release_date, title, genre_ids, overview } = movie
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  try {
    await db.insert(movies).values({
      tmdbId: id,
      title,
      overview,
      posterPath: poster_path,
      releaseDate: release_date,
      genreIds: genre_ids,
      userId: authUser.id,
    })

    revalidatePath("/dashboard/discover/movies")

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

export async function removeFavorite(movie: Movie): Promise<ActionResponse> {
  const { id, title } = movie
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  try {
    await db
      .delete(movies)
      .where(and(eq(movies.tmdbId, id), eq(movies.userId, authUser.id)))

    revalidatePath("/dashboard/discover/movies")

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
