"use client"
import SearchFilter from "@/components/SearchFilter"
import { Loader2 } from "lucide-react"
import { Suspense, useState } from "react"
import { PaginationComponent } from "@/components/Pagination"
import EmptyData from "@/components/EmptyData"
import { Genre } from "@/types/genre"
import { Button } from "@/components/ui/button"
import { Series } from "@/types/series"
import SeriesList from "./SeriesList"
import FilterByGenre from "@/components/FilterByGenre"

type Props = {
  series: GetQuery<Series>
  genres: Genre[]
}

export default function FavoriteSeriesWrapper({ series, genres }: Props) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <SearchFilter placeholder="Search favorite series..." />
        <FilterByGenre genres={genres} />
        <Button onClick={() => setOpenModal(true)}>Add Series</Button>
      </div>
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        {series.results.length > 0 ? (
          <>
            <SeriesList
              series={series.results}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            <PaginationComponent totalPages={series.total_pages} />
          </>
        ) : (
          <EmptyData />
        )}
      </Suspense>
    </div>
  )
}
