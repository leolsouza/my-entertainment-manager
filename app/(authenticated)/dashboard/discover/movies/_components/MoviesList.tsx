"use client"
import { useOptimistic, useState, useTransition } from "react"
import MoviesCard from "./MoviesCard"
import { Movie } from "@/types/movie"
import {
  addFavorite,
  removeFavorite,
} from "@/app/actions/movies/toggleFavorite"
import toast from "react-hot-toast"
import MovieModal from "./MovieModal"

export default function MoviesList({
  movies,
  favoriteIds,
}: {
  movies: Movie[]
  favoriteIds: number[]
}) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [optimisticFavoriteIds, setOptimisticFavoriteIds] = useOptimistic(
    favoriteIds,
    (oldValues, newValue: number) => {
      const index = oldValues.indexOf(newValue)
      if (index > -1) return oldValues.splice(index, 1)
      return [...oldValues, newValue]
    }
  )
  const [_, startTransition] = useTransition()

  const handleToggleFavorite = async (
    movie: Movie,
    alreadyAFavorite = false
  ) => {
    startTransition(async () => {
      setOptimisticFavoriteIds(movie.id)
      if (alreadyAFavorite) {
        const resultRemove = await removeFavorite(movie)
        if (!resultRemove.success) toast.error(resultRemove.message)
        return
      }
      const resultSuccess = await addFavorite(movie)
      if (!resultSuccess.success) {
        toast.error(resultSuccess.message)
        return
      }
    })
  }

  const isFavorite = (movieId: number): boolean =>
    optimisticFavoriteIds.includes(movieId)

  return (
    <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
      {movies.map((movie) => (
        <MoviesCard
          movie={movie}
          key={movie.id}
          isFavorite={isFavorite(movie.id)}
          onFavoriteChange={() =>
            handleToggleFavorite(movie, isFavorite(movie.id))
          }
          handleOpenModal={() => setSelectedMovie(movie)}
        />
      ))}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          closeModal={() => setSelectedMovie(null)}
        />
      )}
    </div>
  )
}
