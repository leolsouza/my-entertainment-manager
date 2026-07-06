"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Props = {
  data: { label: string; count: number }[]
  color: string
  emptyMessage: string
}

export default function RankingBarChart({ data, color, emptyMessage }: Props) {
  if (data.length === 0) {
    return (
      <p className="text-muted-foreground flex h-40 items-center justify-center text-center text-sm">
        {emptyMessage}
      </p>
    )
  }

  const chartConfig = {
    count: { label: "Itens", color },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-40 w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 12 }}>
        <CartesianGrid horizontal={false} />
        <XAxis type="number" hide />
        <YAxis
          dataKey="label"
          type="category"
          tickLine={false}
          axisLine={false}
          width={100}
          tick={{ fontSize: 12 }}
        />
        <ChartTooltip
          cursor={{ fill: "var(--muted)" }}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} barSize={16} />
      </BarChart>
    </ChartContainer>
  )
}
