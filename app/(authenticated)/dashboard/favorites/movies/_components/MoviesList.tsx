"use client"
import {
  Dispatch,
  SetStateAction,
  useOptimistic,
  useState,
  useTransition,
} from "react"
import { Movie } from "@/types/movie"
import {
  addFavorite,
  removeFavorite,
} from "@/app/actions/movies/toggleFavorite"
import toast from "react-hot-toast"
import MoviesCard from "./MoviesCard"
import MovieModal from "./MovieModal"

type Props = {
  movies: Movie[]
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function MoviesList({ movies, openModal, setOpenModal }: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

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
      {movies.map((movie) => {
        return (
          <MoviesCard
            movie={movie}
            key={movie.id}
            isEditable={isEditable(movie)}
            handleOpenModal={() => handleOpenModal(movie)}
            onRemoveFavorite={async () => {}}
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
