"use server"

import { api } from "@/lib/supabase-client"
import { ActionResponse } from ".."
import { getAuthUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { Series } from "@/types/series"

export async function addFavorite(series: Series): Promise<ActionResponse> {
  const { id, poster_path, name } = series
  const authUser = await getAuthUser()
  try {
    await api.from("series").insert([
      {
        tmdb_id: id,
        title: name,
        poster_path,
        user_id: authUser?.id,
      },
    ])

    revalidatePath("/dashboard/discover/series")

    return {
      success: true,
      message: `${name} was add to favorite`,
    }
  } catch (error) {
    console.log(`Error in add ${name} to favorites`, error)
    return {
      success: false,
      message: `It wasn't possible add ${name} to favorites`,
      error: error as string,
    }
  }
}

export async function removeFavorite(series: Series): Promise<ActionResponse> {
  const { id, name } = series
  try {
    await api.from("series").delete().eq("tmdb_id", id)
    return {
      success: true,
      message: `${name} was remove from favorite`,
    }
  } catch (error) {
    console.log(`Error in remove ${name} from favorites`, error)
    return {
      success: false,
      message: `It wasn't possible remove ${name} from favorites`,
      error: error as string,
    }
  }
}
