import { Movie } from "@/types/movie"
import React from "react"
import FavoriteCardActions from "@/components/FavoriteCardActions"

export default function MoviesCard({
  movie,
  handleOpenModal,
  isEditable = false,
  onRemoveFavorite,
}: {
  movie: Movie
  handleOpenModal: (movie: Movie) => void
  isEditable?: boolean
  onRemoveFavorite: (movie: Movie) => Promise<void>
}) {
  const src = movie.tmdb_id
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.poster_path
  return (
    <FavoriteCardActions
      title={movie.title}
      key={movie.id}
      src={src}
      isEditable={isEditable}
      handleOpenModal={() => handleOpenModal(movie)}
      onRemoveFavorite={() => onRemoveFavorite(movie)}
    />
  )
}
