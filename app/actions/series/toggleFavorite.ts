"use server"

import { db } from "@/lib/db"
import { series } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import { ActionResponse } from ".."
import { Series } from "@/types/series"
import { getAuthUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function addFavorite(show: Series): Promise<ActionResponse> {
  const { id, poster_path, name, first_air_date } = show
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  try {
    await db.insert(series).values({
      tmdbId: id,
      name,
      posterPath: poster_path,
      firstAirDate: first_air_date,
      userId: authUser.id,
    })

    revalidatePath("/dashboard/discover/series")

    return { success: true, message: `${name} was added to favorites` }
  } catch (error) {
    console.error(`Error adding ${name} to favorites`, error)
    return {
      success: false,
      message: `It wasn't possible to add ${name} to favorites`,
      error: error as string,
    }
  }
}

export async function removeFavorite(show: Series): Promise<ActionResponse> {
  const { id, name } = show
  const authUser = await getAuthUser()

  if (!authUser) {
    return { success: false, message: "Unauthorized", error: "Unauthorized" }
  }

  try {
    await db
      .delete(series)
      .where(and(eq(series.tmdbId, id), eq(series.userId, authUser.id)))

    revalidatePath("/dashboard/discover/series")

    return { success: true, message: `${name} was removed from favorites` }
  } catch (error) {
    console.error(`Error removing ${name} from favorites`, error)
    return {
      success: false,
      message: `It wasn't possible to remove ${name} from favorites`,
      error: error as string,
    }
  }
}
