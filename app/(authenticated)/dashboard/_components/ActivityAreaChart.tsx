"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  movies: { label: "Movies", color: "var(--chart-1)" },
  series: { label: "Series", color: "var(--chart-2)" },
  books: { label: "Books", color: "var(--chart-3)" },
} satisfies ChartConfig

type Props = {
  data: { month: string; movies: number; series: number; books: number }[]
}

export default function ActivityAreaChart({ data }: Props) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
      <AreaChart data={data} margin={{ left: 0, right: 12 }}>
        <defs>
          <linearGradient id="fillMovies" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-movies)" stopOpacity={0.7} />
            <stop offset="95%" stopColor="var(--color-movies)" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="fillSeries" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-series)" stopOpacity={0.7} />
            <stop offset="95%" stopColor="var(--color-series)" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="fillBooks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-books)" stopOpacity={0.7} />
            <stop offset="95%" stopColor="var(--color-books)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Area
          dataKey="movies"
          type="monotone"
          stackId="a"
          stroke="var(--color-movies)"
          fill="url(#fillMovies)"
        />
        <Area
          dataKey="series"
          type="monotone"
          stackId="a"
          stroke="var(--color-series)"
          fill="url(#fillSeries)"
        />
        <Area
          dataKey="books"
          type="monotone"
          stackId="a"
          stroke="var(--color-books)"
          fill="url(#fillBooks)"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}
