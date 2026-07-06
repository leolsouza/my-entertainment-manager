"use server"

import { db } from "@/lib/db"
import { books, movies, series } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getAuthUser } from "@/lib/auth"
import { fetchMovieGenres } from "@/app/actions/genres/get"
import { DashboardRecentItem, DashboardStats } from "@/types/dashboard"

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function emptyStats(): DashboardStats {
  return {
    totals: { movies: 0, series: 0, books: 0 },
    recentMovies: [],
    recentSeries: [],
    recentBooks: [],
    monthlyActivity: [],
    topGenres: [],
    decadeBreakdown: [],
    topAuthors: [],
  }
}

function moviePoster(record: typeof movies.$inferSelect) {
  return record.tmdbId
    ? `https://image.tmdb.org/t/p/w500${record.posterPath}`
    : (record.posterPath ?? undefined)
}

function seriesPoster(record: typeof series.$inferSelect) {
  return record.tmdbId
    ? `https://image.tmdb.org/t/p/w500${record.posterPath}`
    : (record.posterPath ?? undefined)
}

function decadeOf(dateStr?: string | null): string | undefined {
  if (!dateStr) return undefined
  const year = Number(dateStr.slice(0, 4))
  if (!year || Number.isNaN(year)) return undefined
  return `${Math.floor(year / 10) * 10}s`
}

function last6MonthKeys(): { key: string; label: string }[] {
  const result: { key: string; label: string }[] = []
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    result.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: MONTH_LABELS[d.getMonth()],
    })
  }
  return result
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const authUser = await getAuthUser()
  if (!authUser) return emptyStats()

  const [userMovies, userSeries, userBooks, movieGenres] = await Promise.all([
    db.select().from(movies).where(eq(movies.userId, authUser.id)),
    db.select().from(series).where(eq(series.userId, authUser.id)),
    db.select().from(books).where(eq(books.userId, authUser.id)),
    fetchMovieGenres().catch(() => []),
  ])

  const genreNameById = new Map<number, string>(
    (movieGenres ?? []).map((g: { id: number; name: string }) => [g.id, g.name])
  )

  const byCreatedDesc = <T extends { createdAt: Date }>(items: T[]) =>
    [...items].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  const recentMovies: DashboardRecentItem[] = byCreatedDesc(userMovies)
    .slice(0, 5)
    .map((m) => ({
      id: m.id,
      title: m.title,
      subtitle: m.releaseDate?.slice(0, 4),
      posterSrc: moviePoster(m),
      createdAt: m.createdAt,
    }))

  const recentSeries: DashboardRecentItem[] = byCreatedDesc(userSeries)
    .slice(0, 5)
    .map((s) => ({
      id: s.id,
      title: s.name,
      subtitle: s.firstAirDate?.slice(0, 4),
      posterSrc: seriesPoster(s),
      createdAt: s.createdAt,
    }))

  const recentBooks: DashboardRecentItem[] = byCreatedDesc(userBooks)
    .slice(0, 5)
    .map((b) => ({
      id: b.id,
      title: b.title,
      subtitle: b.authors?.[0],
      posterSrc: b.posterPath ?? undefined,
      createdAt: b.createdAt,
    }))

  const monthKeys = last6MonthKeys()
  const monthlyActivity = monthKeys.map(({ key, label }) => ({
    month: label,
    movies: 0,
    series: 0,
    books: 0,
    __key: key,
  }))

  const bumpMonth = (createdAt: Date, field: "movies" | "series" | "books") => {
    const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`
    const bucket = monthlyActivity.find((m) => m.__key === key)
    if (bucket) bucket[field]++
  }

  userMovies.forEach((m) => bumpMonth(m.createdAt, "movies"))
  userSeries.forEach((s) => bumpMonth(s.createdAt, "series"))
  userBooks.forEach((b) => bumpMonth(b.createdAt, "books"))

  const genreCounts = new Map<string, number>()
  userMovies.forEach((m) => {
    ;(m.genreIds ?? []).forEach((id) => {
      const name = genreNameById.get(id)
      if (!name) return
      genreCounts.set(name, (genreCounts.get(name) ?? 0) + 1)
    })
  })
  const topGenres = [...genreCounts.entries()]
    .map(([genre, count]) => ({ genre, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const decadeCounts = new Map<string, { movies: number; series: number }>()
  userMovies.forEach((m) => {
    const decade = decadeOf(m.releaseDate)
    if (!decade) return
    const entry = decadeCounts.get(decade) ?? { movies: 0, series: 0 }
    entry.movies++
    decadeCounts.set(decade, entry)
  })
  userSeries.forEach((s) => {
    const decade = decadeOf(s.firstAirDate)
    if (!decade) return
    const entry = decadeCounts.get(decade) ?? { movies: 0, series: 0 }
    entry.series++
    decadeCounts.set(decade, entry)
  })
  const decadeBreakdown = [...decadeCounts.entries()]
    .map(([decade, counts]) => ({ decade, ...counts }))
    .sort((a, b) => a.decade.localeCompare(b.decade))

  const authorCounts = new Map<string, number>()
  userBooks.forEach((b) => {
    ;(b.authors ?? []).forEach((author) => {
      authorCounts.set(author, (authorCounts.get(author) ?? 0) + 1)
    })
  })
  const topAuthors = [...authorCounts.entries()]
    .map(([author, count]) => ({ author, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return {
    totals: {
      movies: userMovies.length,
      series: userSeries.length,
      books: userBooks.length,
    },
    recentMovies,
    recentSeries,
    recentBooks,
    monthlyActivity: monthlyActivity.map(
      ({ month, movies, series, books }) => ({
        month,
        movies,
        series,
        books,
      })
    ),
    topGenres,
    decadeBreakdown,
    topAuthors,
  }
}
