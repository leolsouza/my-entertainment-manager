import React from "react"
import FavoriteCard from "@/components/FavoriteCard"
import { Series } from "@/types/series"

export default function SeriesCard({ series }: { series: Series }) {
  const src = `https://image.tmdb.org/t/p/w500${series.poster_path}`
  console.log({ series })
  return <FavoriteCard title={series.name} src={src} />
}
