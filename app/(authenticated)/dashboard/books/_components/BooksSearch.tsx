"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetPage } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function BooksSearch() {
  const router = useRouter()
  const params = useSearchParams()
  const [query, setQuery] = useState(params.get("query") || "")

  const handleSearch = () => {
    const newParams = new URLSearchParams(params)
    if (query) newParams.set("query", query)
    else newParams.delete("query")
    resetPage(newParams)
    router.push(`/dashboard/books?${newParams.toString()}`)
  }

  return (
    <div className="flex flex-1 gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}
