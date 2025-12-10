"use server"

import { api } from "@/lib/supabase-client"
import { ActionResponse } from ".."
import { Movie } from "@/types/movie"
import { getAuthUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function addFavorite(movie: Movie): Promise<ActionResponse> {
  const { id, poster_path, release_date, title, genre_ids, overview } = movie
  const authUser = await getAuthUser()
  try {
    await api.from("movies").insert([
      {
        tmdb_id: id,
        title,
        overview,
        poster_path,
        release_date: new Date(release_date),
        user_id: authUser?.id,
        genre_ids,
      },
    ])

    revalidatePath("/dashboard/discover/movies")

    return {
      success: true,
      message: `${title} was add to favorite`,
    }
  } catch (error) {
    console.log(`Error in add ${title} to favorites`, error)
    return {
      success: false,
      message: `It wasn't possible add ${title} to favorites`,
      error: error as string,
    }
  }
}

export async function removeFavorite(movie: Movie): Promise<ActionResponse> {
  const { id, title } = movie
  try {
    await api.from("movies").delete().eq("tmdb_id", id)
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
