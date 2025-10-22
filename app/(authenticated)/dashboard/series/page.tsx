import { Suspense } from "react"
import { fetchSeriesGenres } from "@/app/actions/fetch/genres"
import { Genre } from "@/types/genre"
import { Loader2 } from "lucide-react"
import { PaginationComponent } from "@/components/Pagination"
import { fetchSeries } from "@/app/actions/fetch/series"
import SeriesCard from "./_components/SeriesCard"
import SeriesSearch from "./_components/SeriesSearch"
import FilterByGenre from "@/components/FilterByGenre"
import EmptyData from "@/components/EmptyData"

type Props = {
  searchParams: Promise<{ query?: string; genre?: string; page?: string }>
}

export default async function SeriesPage({ searchParams }: Props) {
  const params = await searchParams
  const query = params?.query || ""
  const genreId = params?.genre ? Number(params.genre) : undefined
  const page = params?.page ? Number(params.page) : 1

  const series = await fetchSeries({ query, genreId, page })
  const genres: Genre[] = await fetchSeriesGenres()

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Series</h1>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <SeriesSearch />
        <FilterByGenre genres={genres} />
      </div>
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        {series.results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
              {series.results.map((show) => (
                <SeriesCard series={show} key={show.id} />
              ))}
            </div>
            <PaginationComponent totalPages={series.total_pages} />
          </>
        ) : (
          <EmptyData />
        )}
      </Suspense>
    </main>
  )
}
