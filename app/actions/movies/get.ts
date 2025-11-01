"use server"
import { api } from "@/lib/supabase-client"
import tmdb from "@/lib/tmdb-instance"
import { Movie } from "@/types/movie"

export async function fetchMovies({
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

export async function getFavoriteMovieIds(): Promise<number[]> {
  const { data, error } = await api.from("movies").select("tmdb_id")
  console.log("data", data)
  console.log("error", error)
  if (error) {
    console.error("Error getting favorite movies:", error)
    return []
  }
  return data?.map((movie) => movie.tmdb_id) ?? []
}
