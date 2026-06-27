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

export async function fetchFavoriteSeries({
  title,
  genreId,
  page = 1,
}: {
  title?: string
  genreId?: number
  page?: number
}): Promise<GetQuery<Series>> {
  const PAGE_SIZE = 15

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE - 1

  let query = api.from("series").select("*", { count: "exact" })

  if (title && title.trim() !== "") {
    query = query.ilike("title", `%${title}%`)
  }

  if (genreId) {
    query = query.contains("genre_ids", [genreId])
  }

  const { data, count, error } = await query.range(start, end)

  if (error) throw error

  const total_pages = Math.ceil((count ?? 0) / PAGE_SIZE)

  return {
    results: data,
    page,
    total_pages,
    total_results: count ?? 0,
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
