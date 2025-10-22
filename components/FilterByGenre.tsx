"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { resetPage } from "@/lib/utils"
import { Genre } from "@/types/genre"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react"

export default function FilterByGenre({ genres }: { genres: Genre[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [genre, setGenre] = useState(params.get("genre") || "")

  const onChange = (value: string) => {
    const newParams = new URLSearchParams(params)

    setGenre(value)
    if (value) newParams.set("genre", value)
    else newParams.delete("genre")
    resetPage(newParams)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div>
      <Select onValueChange={onChange} defaultValue="all" value={genre}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Search for genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre.id} value={genre.id.toString()}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
