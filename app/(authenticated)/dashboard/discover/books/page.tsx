import { Loader2 } from "lucide-react"
import React, { Suspense } from "react"
import BooksCard from "./_components/BooksCard"
import EmptyData from "@/components/EmptyData"
import { PaginationComponent } from "@/components/Pagination"
import BooksSearch from "./_components/BooksSearch"
import { fetchBooks, getFavoriteBookIds } from "@/app/actions/books/get"
import BooksList from "./_components/BooksList"
import { getFavoriteMovieIds } from "@/app/actions/movies/get"

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
  const favoriteBookIds = await getFavoriteBookIds()

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Books</h1>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <BooksSearch />
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
    </main>
  )
}
