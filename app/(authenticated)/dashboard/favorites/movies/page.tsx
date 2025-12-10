import { fetchMovieGenres } from "@/app/actions/genres/get"
import { Genre } from "@/types/genre"
import { fetchFavoriteMovies } from "@/app/actions/movies/get"

import FavoriteMoviesWrapper from "./_components/FavoriteMoviesWrapper"

type Props = {
  searchParams: Promise<{ query?: string; genre?: string; page?: string }>
}

export default async function FavoriteMoviesPage({ searchParams }: Props) {
  const params = await searchParams
  const title = params?.query || ""
  const genreId = params?.genre ? Number(params.genre) : undefined
  const page = params?.page ? Number(params.page) : 1
  const genres: Genre[] = await fetchMovieGenres()
  const movies = await fetchFavoriteMovies({ title, genreId, page })

  return <FavoriteMoviesWrapper movies={movies} genres={genres} />
}
