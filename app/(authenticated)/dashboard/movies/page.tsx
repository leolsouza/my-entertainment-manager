import { Suspense } from "react"
import MovieSearch from "./_components/MoviesSearch"
import { fetchMovieGenres } from "@/app/actions/fetch/genres"
import { Genre } from "@/types/genre"
import { Loader2 } from "lucide-react"
import { PaginationComponent } from "@/components/Pagination"
import FilterByGenre from "@/components/FilterByGenre"
import EmptyData from "@/components/EmptyData"
import { fetchMovies, getFavoriteMovieIds } from "@/app/actions/movies/get"
import MoviesList from "./_components/MoviesList"

type Props = {
  searchParams: Promise<{ query?: string; genre?: string; page?: string }>
}

export default async function MoviesPage({ searchParams }: Props) {
  const params = await searchParams
  const query = params?.query || ""
  const genreId = params?.genre ? Number(params.genre) : undefined
  const page = params?.page ? Number(params.page) : 1

  const movies = await fetchMovies({ query, genreId, page })
  const favoriteMovieIds = await getFavoriteMovieIds()
  const genres: Genre[] = await fetchMovieGenres()

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Movies</h1>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <MovieSearch />
        <FilterByGenre genres={genres} />
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
    </main>
  )
}
