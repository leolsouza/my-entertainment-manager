import { Movie } from "@/types/movie"
import React from "react"
import FavoriteCard from "@/components/FavoriteCard"

export default function MoviesCard({
  movie,
  isFavorite,
  onFavoriteChange,
}: {
  movie: Movie
  isFavorite: boolean
  onFavoriteChange: (movie: Movie, alreadyAFavorite?: boolean) => Promise<void>
}) {
  const src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  return (
    <FavoriteCard
      title={movie.title}
      src={src}
      isFavorite={isFavorite}
      onFavoriteChange={() => onFavoriteChange(movie)}
    />
  )
}
