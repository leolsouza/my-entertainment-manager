"use server"

import { db } from "@/lib/db"
import { series } from "@/lib/db/schema"
import { and, count, eq, like } from "drizzle-orm"
import tmdb from "@/lib/tmdb-instance"
import { Series } from "@/types/series"
import { getAuthUser } from "@/lib/auth"

function toSeries(record: typeof series.$inferSelect): Series {
  return {
    id: record.id,
    name: record.name,
    original_name: record.name,
    poster_path: record.posterPath ?? undefined,
    genre_ids: [],
    first_air_date: record.firstAirDate ?? "",
    overview: record.overview,
    tmdb_id: record.tmdbId ?? undefined,
  }
}

export async function fetchSeries({
  query,
  genreId,
  page = 1,
}: {
  query?: string
  genreId?: number
  page?: number
}): Promise<GetQuery<Series>> {
  let endpoint = "/tv/popular"
  const params: Record<string, string | number> = { page }

  if (query) {
    endpoint = "/search/tv"
    params.query = query
  } else if (genreId) {
    endpoint = "/discover/tv"
    params.with_genres = genreId
  } else if (page) {
    params.page = page
  }

  const { data } = await tmdb.get(endpoint, { params })
  let seriesResults: Series[] = data.results

  if (query && genreId) {
    seriesResults = seriesResults.filter((s: Series) =>
      s.genre_ids.includes(genreId)
    )
  }

  return { ...data }
}

export async function fetchFavoriteSeries({
  title,
  page = 1,
}: {
  title?: string
  genreId?: number
  page?: number
}): Promise<GetQuery<Series>> {
  const PAGE_SIZE = 15
  const authUser = await getAuthUser()

  if (!authUser) return { results: [], page, total_pages: 0, total_results: 0 }

  const offset = (page - 1) * PAGE_SIZE
  const conditions = [eq(series.userId, authUser.id)]

  if (title && title.trim() !== "") {
    conditions.push(like(series.name, `%${title}%`))
  }

  const where = and(...conditions)

  const [{ total }] = await db
    .select({ total: count() })
    .from(series)
    .where(where)

  const results = await db
    .select()
    .from(series)
    .where(where)
    .limit(PAGE_SIZE)
    .offset(offset)

  return {
    results: results.map(toSeries),
    page,
    total_pages: Math.ceil(total / PAGE_SIZE),
    total_results: total,
  }
}

export async function getFavoriteSeriesIds(): Promise<number[]> {
  const authUser = await getAuthUser()
  if (!authUser) return []

  const result = await db
    .select({ tmdbId: series.tmdbId })
    .from(series)
    .where(eq(series.userId, authUser.id))

  return result
    .map((s) => s.tmdbId)
    .filter((id): id is number => id !== null)
}
