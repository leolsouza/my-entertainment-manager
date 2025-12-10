"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetPage } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

type Props = {
  placeholder: string
}

export default function SearchFilter({ placeholder }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const [query, setQuery] = useState(params.get("query") || "")

  const handleSearch = () => {
    const newParams = new URLSearchParams(params)
    if (query) newParams.set("query", query)
    else newParams.delete("query")
    resetPage(newParams)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className="flex flex-1 gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      <Button onClick={handleSearch} variant="outline">
        Search
      </Button>
    </div>
  )
}
