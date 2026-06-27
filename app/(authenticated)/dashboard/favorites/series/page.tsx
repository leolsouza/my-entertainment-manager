import { fetchSeriesGenres } from "@/app/actions/genres/get"
import { Genre } from "@/types/genre"
import { fetchFavoriteSeries } from "@/app/actions/series/get"
import FavoriteSeriesWrapper from "./_components/FavoriteSeriesWrapper"

type Props = {
  searchParams: Promise<{ query?: string; genre?: string; page?: string }>
}

export default async function FavoriteSeriesPage({ searchParams }: Props) {
  const params = await searchParams
  const title = params?.query || ""
  const genreId = params?.genre ? Number(params.genre) : undefined
  const page = params?.page ? Number(params.page) : 1
  const genres: Genre[] = await fetchSeriesGenres()
  const series = await fetchFavoriteSeries({ title, genreId, page })

  return <FavoriteSeriesWrapper series={series} genres={genres} />
}
