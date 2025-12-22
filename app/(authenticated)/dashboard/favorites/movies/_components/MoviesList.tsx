"use client"
import {
  Dispatch,
  SetStateAction,
  useOptimistic,
  useState,
  useTransition,
} from "react"
import { Movie } from "@/types/movie"
import toast from "react-hot-toast"
import MoviesCard from "./MoviesCard"
import MovieModal from "./MovieModal"
import { deleteFavoriteMovie } from "@/app/actions/movies/handleFavorite"

type Props = {
  movies: Movie[]
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function MoviesList({ movies, openModal, setOpenModal }: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const [optimisticMovies, setOptimisticMovies] = useOptimistic(
    movies,
    (oldValues, newValue: Movie) => {
      return oldValues.filter((movie) => movie.id !== newValue.id)
    }
  )
  const [, startTransition] = useTransition()

  const handleRemoveFavorite = async (movie: Movie) => {
    startTransition(async () => {
      setOptimisticMovies(movie)
      const result = await deleteFavoriteMovie(movie.id)
      if (result.success) {
        toast.success(result.message)
        return
      }
      toast.error(result.message)
      return
    })
  }

  const isEditable = (movie: Movie | null): boolean => !!!movie?.tmdb_id

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
    setOpenModal(false)
  }

  return (
    <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
      {optimisticMovies.map((movie) => {
        return (
          <MoviesCard
            movie={movie}
            key={movie.id}
            isEditable={isEditable(movie)}
            handleOpenModal={() => handleOpenModal(movie)}
            onRemoveFavorite={handleRemoveFavorite}
          />
        )
      })}
      {openModal && (
        <MovieModal
          openModal={openModal}
          movie={selectedMovie}
          isReadyOnly={!isEditable(selectedMovie)}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  )
}
