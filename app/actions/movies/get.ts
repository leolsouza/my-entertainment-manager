"use server"
import { api } from "@/lib/supabase-client"
import tmdb from "@/lib/tmdb-instance"
import { Movie } from "@/types/movie"

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
  let movies: Movie[] = data.results

  if (query && genreId) {
    movies = movies.filter((m: Movie) => m.genre_ids.includes(genreId))
  }

  return {
    ...data,
  }
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

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE - 1

  let query = api.from("movies").select("*", { count: "exact" })

  if (title && title.trim() !== "") {
    query = query.ilike("title", `%${title}%`)
  }

  if (genreId) {
    query = query.contains("genre_ids", [genreId])
  }

  const { data, count, error } = await query.range(start, end)

  if (error) throw error

  const total_pages = Math.ceil((count ?? 0) / PAGE_SIZE)

  return {
    results: data,
    page,
    total_pages,
    total_results: count ?? 0,
  }
}

export async function getFavoriteMovieIds(): Promise<number[]> {
  const { data, error } = await api.from("movies").select("tmdb_id")
  if (error) {
    console.error("Error getting favorite movies:", error)
    return []
  }
  return data?.map((movie) => movie.tmdb_id) ?? []
}
