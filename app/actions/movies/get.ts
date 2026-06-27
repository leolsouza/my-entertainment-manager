"use server"

import { db } from "@/lib/db"
import { movies } from "@/lib/db/schema"
import { and, count, eq, like, sql } from "drizzle-orm"
import tmdb from "@/lib/tmdb-instance"
import { Movie } from "@/types/movie"
import { getAuthUser } from "@/lib/auth"

function toMovie(record: typeof movies.$inferSelect): Movie {
  return {
    id: record.id,
    title: record.title,
    original_title: record.title,
    poster_path: record.posterPath ?? undefined,
    release_date: record.releaseDate ?? "",
    overview: record.overview,
    genre_ids: record.genreIds ?? [],
    tmdb_id: record.tmdbId ?? undefined,
  }
}

export async function fetchAllMovies({
  query,
  genreId,
  page = 1,
}: {
  query?: string
  genreId?: number
  page?: number
}): Promise<GetQuery<Movie>> {
  let endpoint = "/movie/popular"
  const params: Record<string, string | number> = { page }

  if (query) {
    endpoint = "/search/movie"
    params.query = query
  } else if (genreId) {
    endpoint = "/discover/movie"
    params.with_genres = genreId
  } else if (page) {
    params.page = page
  }

  const { data } = await tmdb.get(endpoint, { params })
  let movieResults: Movie[] = data.results

  if (query && genreId) {
    movieResults = movieResults.filter((m: Movie) =>
      m.genre_ids.includes(genreId)
    )
  }

  return { ...data }
}

export async function fetchFavoriteMovies({
  title,
  genreId,
  page = 1,
}: {
  title?: string
  genreId?: number
  page?: number
}): Promise<GetQuery<Movie>> {
  const PAGE_SIZE = 15
  const authUser = await getAuthUser()

  if (!authUser)
    return { results: [], page, total_pages: 0, total_results: 0 }

  const offset = (page - 1) * PAGE_SIZE

  const conditions = [eq(movies.userId, authUser.id)]

  if (title && title.trim() !== "") {
    conditions.push(like(movies.title, `%${title}%`))
  }

  if (genreId) {
    conditions.push(
      sql`EXISTS (SELECT 1 FROM json_each(${movies.genreIds}) WHERE value = ${genreId})`
    )
  }

  const where = and(...conditions)

  const [{ total }] = await db
    .select({ total: count() })
    .from(movies)
    .where(where)

  const results = await db
    .select()
    .from(movies)
    .where(where)
    .limit(PAGE_SIZE)
    .offset(offset)

  return {
    results: results.map(toMovie),
    page,
    total_pages: Math.ceil(total / PAGE_SIZE),
    total_results: total,
  }
}

export async function getFavoriteMovieIds(): Promise<number[]> {
  const authUser = await getAuthUser()
  if (!authUser) return []

  const result = await db
    .select({ tmdbId: movies.tmdbId })
    .from(movies)
    .where(eq(movies.userId, authUser.id))

  return result
    .map((m) => m.tmdbId)
    .filter((id): id is number => id !== null)
}
