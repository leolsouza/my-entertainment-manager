"use client"
import MoviesGenreFilter from "@/components/MoviesGenreFilter"
import SearchFilter from "@/components/SearchFilter"
import { Movie } from "@/types/movie"
import { Loader2 } from "lucide-react"
import { Suspense, useState } from "react"
import MoviesList from "./MoviesList"
import { PaginationComponent } from "@/components/Pagination"
import EmptyData from "@/components/EmptyData"
import { Genre } from "@/types/genre"
import { Button } from "@/components/ui/button"

type Props = {
  movies: GetQuery<Movie>
  genres: Genre[]
}

export default function FavoriteMoviesWrapper({ movies, genres }: Props) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <SearchFilter placeholder="Search favorite movies..." />
        <MoviesGenreFilter genres={genres} />
        <Button onClick={() => setOpenModal(true)}>Add Movie</Button>
      </div>
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        {movies.results.length > 0 ? (
          <>
            <MoviesList
              movies={movies.results}
              openModal={openModal}
              setOpenModal={setOpenModal}
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
