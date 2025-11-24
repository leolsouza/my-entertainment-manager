import { Suspense } from "react"
import { Genre } from "@/types/genre"
import { Loader2 } from "lucide-react"
import { PaginationComponent } from "@/components/Pagination"
import EmptyData from "@/components/EmptyData"
import { fetchAllMovies, getFavoriteMovieIds } from "@/app/actions/movies/get"
import MoviesList from "./_components/MoviesList"
import { fetchMovieGenres } from "@/app/actions/genres/get"
import MoviesGenreFilter from "@/components/MoviesGenreFilter"
import SearchFilter from "@/components/SearchFilter"

type Props = {
  searchParams: Promise<{ query?: string; genre?: string; page?: string }>
}

export default async function DiscoverMoviesPage({ searchParams }: Props) {
  const params = await searchParams
  const query = params?.query || ""
  const genreId = params?.genre ? Number(params.genre) : undefined
  const page = params?.page ? Number(params.page) : 1

  const movies = await fetchAllMovies({ query, genreId, page })
  const favoriteMovieIds = await getFavoriteMovieIds()
  const genres: Genre[] = await fetchMovieGenres()

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <SearchFilter placeholder="Search movies..." />
        <MoviesGenreFilter genres={genres} />
      </div>
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        {movies.results.length > 0 ? (
          <>
            <MoviesList
              movies={movies.results}
              favoriteIds={favoriteMovieIds}
            />
            <PaginationComponent totalPages={movies.total_pages} />
          </>
        ) : (
          <EmptyData />
        )}
      </Suspense>
    </div>
  )
}
