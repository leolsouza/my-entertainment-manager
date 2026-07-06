"use client"

import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  value: { label: "Items" },
  movies: { label: "Movies", color: "var(--chart-1)" },
  series: { label: "Series", color: "var(--chart-2)" },
  books: { label: "Books", color: "var(--chart-3)" },
} satisfies ChartConfig

type Props = {
  totals: { movies: number; series: number; books: number }
}

export default function CollectionDonutChart({ totals }: Props) {
  const total = totals.movies + totals.series + totals.books

  const data = [
    { category: "movies", value: totals.movies, fill: "var(--color-movies)" },
    { category: "series", value: totals.series, fill: "var(--color-series)" },
    { category: "books", value: totals.books, fill: "var(--color-books)" },
  ]

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="category"
          innerRadius={60}
          outerRadius={90}
          strokeWidth={4}
        >
          <Label
            content={({ viewBox }) => {
              if (!viewBox || !("cx" in viewBox)) return null
              return (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground text-3xl font-bold"
                  >
                    {total}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy ?? 0) + 22}
                    className="fill-muted-foreground text-xs"
                  >
                    in collection
                  </tspan>
                </text>
              )
            }}
          />
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="category" />} />
      </PieChart>
    </ChartContainer>
  )
}
