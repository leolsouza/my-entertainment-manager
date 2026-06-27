import React from "react"
import FavoriteCardActions from "@/components/FavoriteCardActions"
import { Series } from "@/types/series"

export default function SeriesCard({
  series,
  handleOpenModal,
  isEditable = false,
  onRemoveFavorite,
}: {
  series: Series
  handleOpenModal: (series: Series) => void
  isEditable?: boolean
  onRemoveFavorite: (series: Series) => Promise<void>
}) {
  const src = series.tmdb_id
    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
    : series.poster_path
  return (
    <FavoriteCardActions
      title={series.name}
      key={series.id}
      src={src}
      isEditable={isEditable}
      handleOpenModal={() => handleOpenModal(series)}
      onRemoveFavorite={() => onRemoveFavorite(series)}
    />
  )
}
