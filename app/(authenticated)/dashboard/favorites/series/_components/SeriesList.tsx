"use client"
import {
  Dispatch,
  SetStateAction,
  useOptimistic,
  useState,
  useTransition,
} from "react"
import toast from "react-hot-toast"
import { Series } from "@/types/series"
import SeriesCard from "./SeriesCard"
import SeriesModal from "./SeriesModal"
import { deleteFavoriteSeries } from "@/app/actions/series/handleFavorite"

type Props = {
  series: Series[]
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function SeriesList({ series, openModal, setOpenModal }: Props) {
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null)

  const [optimisticSeries, setOptimisticSeries] = useOptimistic(
    series,
    (oldValues, newValue: Series) => {
      return oldValues.filter((series) => series.id !== newValue.id)
    }
  )
  const [, startTransition] = useTransition()

  const handleRemoveFavorite = async (series: Series) => {
    startTransition(async () => {
      setOptimisticSeries(series)
      const result = await deleteFavoriteSeries(series.id)
      if (result.success) {
        toast.success(result.message)
        return
      }
      toast.error(result.message)
      return
    })
  }

  const isEditable = (series: Series | null): boolean => !!!series?.tmdb_id

  const handleOpenModal = (series: Series) => {
    setSelectedSeries(series)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedSeries(null)
    setOpenModal(false)
  }

  return (
    <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
      {optimisticSeries.map((series) => {
        return (
          <SeriesCard
            series={series}
            key={series.id}
            isEditable={isEditable(series)}
            handleOpenModal={() => handleOpenModal(series)}
            onRemoveFavorite={handleRemoveFavorite}
          />
        )
      })}
      {openModal && (
        <SeriesModal
          openModal={openModal}
          series={selectedSeries}
          isReadyOnly={!isEditable(selectedSeries)}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  )
}
