import { Loader2 } from "lucide-react"
import React, { Suspense } from "react"
import EmptyData from "@/components/EmptyData"
import { PaginationComponent } from "@/components/Pagination"
import { fetchBooks, getFavoriteBookIds } from "@/app/actions/books/get"
import BooksList from "./_components/BooksList"
import SearchFilter from "@/components/SearchFilter"

type Props = {
  searchParams: Promise<{
    query?: string
    author?: string
    subject?: string
    page?: string
  }>
}
export default async function DiscoverBooksPage({ searchParams }: Props) {
  const params = await searchParams
  const { query, page = "1" } = params

  const maxResults = 40
  const startIndex = (Number(page) - 1) * maxResults

  const books = await fetchBooks({
    query,
    startIndex,
    maxResults,
  })
  const favoriteBookIds = await getFavoriteBookIds()

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <SearchFilter placeholder="Search books..." />
      </div>
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        {books.results.length > 0 ? (
          <>
            <BooksList books={books.results} favoriteIds={favoriteBookIds} />

            <PaginationComponent totalPages={books.total_pages} />
          </>
        ) : (
          <EmptyData />
        )}
      </Suspense>
    </div>
  )
}
