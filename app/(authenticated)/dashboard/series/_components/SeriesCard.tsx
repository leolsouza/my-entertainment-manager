import React from "react"
import { Series } from "@/types/series"
import FavoriteCard from "@/components/FavoriteCard"

export default function SeriesCard({
  series,
  isFavorite,
  onFavoriteChange,
}: {
  series: Series
  isFavorite: boolean
  onFavoriteChange: (
    series: Series,
    alreadyAFavorite?: boolean
  ) => Promise<void>
}) {
  const src = `https://image.tmdb.org/t/p/w500${series.poster_path}`
  return (
    <FavoriteCard
      title={series.name}
      src={src}
      isFavorite={isFavorite}
      onFavoriteChange={() => onFavoriteChange(series)}
    />
  )
}
