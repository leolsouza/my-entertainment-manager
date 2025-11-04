import { api } from "@/lib/supabase-client"
import tmdb from "@/lib/tmdb-instance"
import { Series } from "@/types/series"

export async function fetchSeries({
  query,
  genreId,
  page = 1,
}: {
  query?: string
  genreId?: number
  page?: number
}): Promise<GetQuery<Series>> {
  let endpoint = "/tv/popular"
  const params: Record<string, string | number> = { page }

  if (query) {
    endpoint = "/search/tv"
    params.query = query
  } else if (genreId) {
    endpoint = "/discover/tv"
    params.with_genres = genreId
  } else if (page) {
    params.page = page
  }

  const { data } = await tmdb.get(endpoint, { params })
  let series: Series[] = data.results

  if (query && genreId) {
    series = series.filter((m: Series) => m.genre_ids.includes(genreId))
  }

  return {
    ...data,
  }
}

export async function getFavoriteSeriesIds(): Promise<number[]> {
  const { data, error } = await api.from("series").select("tmdb_id")
  if (error) {
    console.error("Error getting favorite series:", error)
    return []
  }
  return data?.map((show) => show.tmdb_id) ?? []
}
