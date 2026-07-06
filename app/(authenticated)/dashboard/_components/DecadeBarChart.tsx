"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
} satisfies ChartConfig

type Props = {
  data: { decade: string; movies: number; series: number }[]
}

export default function DecadeBarChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="text-muted-foreground flex h-48 items-center justify-center text-center text-sm">
        Add release dates to see the timeline.
      </p>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-48 w-full">
      <BarChart data={data} margin={{ left: 0, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="decade" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="movies" fill="var(--color-movies)" radius={4} />
        <Bar dataKey="series" fill="var(--color-series)" radius={4} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}
