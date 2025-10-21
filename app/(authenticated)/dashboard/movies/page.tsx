import { fetchMovies } from "@/lib/movies"
import { Movie } from "@/types/movie"
import { Suspense } from "react"
import MovieSearch from "./_components/MoviesSearch"
import MoviesCard from "./_components/MoviesCard"
import MoviesGenre from "./_components/MoviesGenre"
import { fetchGenres } from "@/lib/genres"
import { Genre } from "@/types/genre"
import { Loader2 } from "lucide-react"
import { PaginationComponent } from "@/components/Pagination"

type Props = {
  searchParams: Promise<{ query?: string; genre?: string; page?: string }>
}

export default async function MoviesPage({ searchParams }: Props) {
  const params = await searchParams
  const query = params?.query || ""
  const genreId = params?.genre ? Number(params.genre) : undefined
  const page = params?.page ? Number(params.page) : 1

  const movies = await fetchMovies({ query, genreId, page })
  const genres: Genre[] = await fetchGenres()

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Movies</h1>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <MovieSearch />
        <MoviesGenre genres={genres} />
      </div>
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
          {movies.results.map((movie) => (
            <MoviesCard movie={movie} key={movie.id} />
          ))}
        </div>
        <PaginationComponent totalPages={movies.total_pages} />
      </Suspense>
    </main>
  )
}
