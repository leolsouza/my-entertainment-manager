export type DashboardRecentItem = {
  id: number
  title: string
  subtitle?: string
  posterSrc?: string
  createdAt: Date
}

export type DashboardStats = {
  totals: { movies: number; series: number; books: number }
  recentMovies: DashboardRecentItem[]
  recentSeries: DashboardRecentItem[]
  recentBooks: DashboardRecentItem[]
  monthlyActivity: {
    month: string
    movies: number
    series: number
    books: number
  }[]
  topGenres: { genre: string; count: number }[]
  decadeBreakdown: { decade: string; movies: number; series: number }[]
  topAuthors: { author: string; count: number }[]
}
