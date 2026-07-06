import { BookOpen, Film, Library, Tv } from "lucide-react"

import { getDashboardStats } from "@/app/actions/dashboard/get"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ActivityAreaChart from "./_components/ActivityAreaChart"
import CollectionDonutChart from "./_components/CollectionDonutChart"
import DecadeBarChart from "./_components/DecadeBarChart"
import RankingBarChart from "./_components/RankingBarChart"
import RecentList from "./_components/RecentList"
import StatTile from "./_components/StatTile"

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  const total = stats.totals.movies + stats.totals.series + stats.totals.books

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Your dashboard</h1>
        <p className="text-muted-foreground text-sm">
          An overview of your favorite movies, series, and books.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Favorite movies"
          value={stats.totals.movies}
          icon={Film}
          color="var(--chart-1)"
        />
        <StatTile
          label="Favorite series"
          value={stats.totals.series}
          icon={Tv}
          color="var(--chart-2)"
        />
        <StatTile
          label="Favorite books"
          value={stats.totals.books}
          icon={BookOpen}
          color="var(--chart-3)"
        />
        <StatTile
          label="Total in collection"
          value={total}
          icon={Library}
          color="var(--chart-4)"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Items added to favorites over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityAreaChart data={stats.monthlyActivity} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collection breakdown</CardTitle>
            <CardDescription>Movies, series, and books</CardDescription>
          </CardHeader>
          <CardContent>
            <CollectionDonutChart totals={stats.totals} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="relative overflow-hidden pt-0">
          <div className="bg-chart-1 h-1.5 w-full" />
          <CardHeader className="pt-6">
            <CardTitle className="flex items-center gap-2">
              <Film className="text-chart-1 size-4" />
              Movies
            </CardTitle>
            <CardDescription>Most favorited genres</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <RankingBarChart
              data={stats.topGenres.map((g) => ({
                label: g.genre,
                count: g.count,
              }))}
              color="var(--chart-1)"
              emptyMessage="Favorite some movies to see your top genres."
            />
            <div>
              <p className="mb-3 text-sm font-medium">Recently added</p>
              <RecentList items={stats.recentMovies} />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden pt-0">
          <div className="bg-chart-2 h-1.5 w-full" />
          <CardHeader className="pt-6">
            <CardTitle className="flex items-center gap-2">
              <Tv className="text-chart-2 size-4" />
              Series
            </CardTitle>
            <CardDescription>By decade of first air date</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <DecadeBarChart data={stats.decadeBreakdown} />
            <div>
              <p className="mb-3 text-sm font-medium">Recently added</p>
              <RecentList items={stats.recentSeries} />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden pt-0">
          <div className="bg-chart-3 h-1.5 w-full" />
          <CardHeader className="pt-6">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="text-chart-3 size-4" />
              Books
            </CardTitle>
            <CardDescription>Most favorited authors</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <RankingBarChart
              data={stats.topAuthors.map((a) => ({
                label: a.author,
                count: a.count,
              }))}
              color="var(--chart-3)"
              emptyMessage="Favorite some books to see your top authors."
            />
            <div>
              <p className="mb-3 text-sm font-medium">Recently added</p>
              <RecentList items={stats.recentBooks} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
