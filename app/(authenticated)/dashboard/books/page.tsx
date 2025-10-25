import { fetchBooks } from "@/app/actions/fetch/books"
import { Loader2 } from "lucide-react"
import React, { Suspense } from "react"
import BooksCard from "./_components/BooksCard"
import EmptyData from "@/components/EmptyData"
import { PaginationComponent } from "@/components/Pagination"
import BooksSearch from "./_components/BooksSearch"

type Props = {
  searchParams: Promise<{
    query?: string
    author?: string
    subject?: string
    page?: string
  }>
}
export default async function BooksPage({ searchParams }: Props) {
  const params = await searchParams
  const { query, page = "1" } = params

  const maxResults = 40
  const startIndex = (Number(page) - 1) * maxResults

  const books = await fetchBooks({
    query,
    startIndex,
    maxResults,
  })
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Books</h1>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <BooksSearch />
        {/* <FilterByGenre genres={genres} /> */}
      </div>
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        {books.results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
              {books.results.map((book) => (
                <BooksCard book={book} key={book.id} />
              ))}
            </div>

            <PaginationComponent totalPages={books.total_pages} />
          </>
        ) : (
          <EmptyData />
        )}
      </Suspense>
    </main>
  )
}
