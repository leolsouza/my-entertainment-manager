import { Movie } from "@/types/movie"
import tmdb from "../../../lib/tmdb-instance"

export async function fetchMovies({
  query,
  genreId,
  page = 1,
}: {
  query?: string
  genreId?: number
  page?: number
}): Promise<TMDBQuery<Movie>> {
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
