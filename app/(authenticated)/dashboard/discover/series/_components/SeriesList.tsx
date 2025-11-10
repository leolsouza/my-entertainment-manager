"use client"
import { useOptimistic, useTransition } from "react"
import {
  addFavorite,
  removeFavorite,
} from "@/app/actions/series/toggleFavorite"
import toast from "react-hot-toast"
import { Series } from "@/types/series"
import SeriesCard from "./SeriesCard"

export default function SeriesList({
  series,
  favoriteIds,
}: {
  series: Series[]
  favoriteIds: number[]
}) {
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
    show: Series,
    alreadyAFavorite = false
  ) => {
    startTransition(async () => {
      setOptimisticFavoriteIds(show.id)
      if (alreadyAFavorite) {
        const resultRemove = await removeFavorite(show)
        if (!resultRemove.success) toast.error(resultRemove.message)
        return
      }
      const resultSuccess = await addFavorite(show)
      if (!resultSuccess.success) {
        toast.error(resultSuccess.message)
        return
      }
    })
  }

  const isFavorite = (showId: number): boolean =>
    optimisticFavoriteIds.includes(showId)

  return (
    <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
      {series.map((show) => (
        <SeriesCard
          series={show}
          key={show.id}
          isFavorite={isFavorite(show.id)}
          onFavoriteChange={() =>
            handleToggleFavorite(show, isFavorite(show.id))
          }
        />
      ))}
    </div>
  )
}
