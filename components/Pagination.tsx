"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

interface PaginationComponentProps {
  totalPages: number
  maxVisible?: number
}

export function PaginationComponent({
  totalPages,
  maxVisible = 8,
}: PaginationComponentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const safeTotalPages = Math.min(totalPages, 500)

  function setPage(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    router.push(`?${params.toString()}`)
  }

  function getVisiblePages() {
    if (safeTotalPages <= maxVisible)
      return Array.from({ length: safeTotalPages }, (_, i) => i + 1)

    const half = Math.floor(maxVisible / 2)
    const start = Math.max(2, currentPage - half)
    const end = Math.min(safeTotalPages - 1, currentPage + half)

    const visible: (number | string)[] = [1]
    if (start > 2) visible.push("...")
    for (let i = start; i <= end; i++) visible.push(i)
    if (end < safeTotalPages - 1) visible.push("...")
    visible.push(safeTotalPages)

    return visible
  }

  const visiblePages = getVisiblePages()

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) setPage(currentPage - 1)
            }}
          />
        </PaginationItem>

        {visiblePages.map((p, index) => (
          <PaginationItem key={index}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setPage(p as number)
                }}
                isActive={p === currentPage}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < safeTotalPages) setPage(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
