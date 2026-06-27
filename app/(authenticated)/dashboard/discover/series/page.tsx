import { Suspense } from "react"
import { Genre } from "@/types/genre"
import { Loader2 } from "lucide-react"
import { PaginationComponent } from "@/components/Pagination"
import FilterByGenre from "@/components/FilterByGenre"
import EmptyData from "@/components/EmptyData"
import { fetchSeriesGenres } from "@/app/actions/genres/get"
import { fetchSeries, getFavoriteSeriesIds } from "@/app/actions/series/get"
import SeriesList from "./_components/SeriesList"
import SearchFilter from "@/components/SearchFilter"

type Props = {
  searchParams: Promise<{ query?: string; genre?: string; page?: string }>
}

export default async function DiscoverSeriesPage({ searchParams }: Props) {
  const params = await searchParams
  const query = params?.query || ""
  const genreId = params?.genre ? Number(params.genre) : undefined
  const page = params?.page ? Number(params.page) : 1

  const series = await fetchSeries({ query, genreId, page })
  const genres: Genre[] = await fetchSeriesGenres()
  const favoriteIds = await getFavoriteSeriesIds()

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <SearchFilter placeholder="Search series..." />
        <FilterByGenre genres={genres} />
      </div>
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        {series.results.length > 0 ? (
          <>
            <SeriesList series={series.results} favoriteIds={favoriteIds} />
            <PaginationComponent totalPages={series.total_pages} />
          </>
        ) : (
          <EmptyData />
        )}
      </Suspense>
    </div>
  )
}
