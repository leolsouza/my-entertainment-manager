"use client"
import SearchFilter from "@/components/SearchFilter"
import { Loader2 } from "lucide-react"
import { Suspense, useState } from "react"
import { PaginationComponent } from "@/components/Pagination"
import EmptyData from "@/components/EmptyData"
import { Button } from "@/components/ui/button"
import { FavoriteBook } from "@/types/book"
import BooksList from "./BooksList"

type Props = {
  books: GetQuery<FavoriteBook>
}

export default function FavoriteBooksWrapper({ books }: Props) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between gap-2">
        <SearchFilter placeholder="Search favorite books..." />
        <Button onClick={() => setOpenModal(true)}>Add Book</Button>
      </div>
      <Suspense fallback={<Loader2 className="size-4 animate-spin" />}>
        {books.results.length > 0 ? (
          <>
            <BooksList
              books={books.results}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            <PaginationComponent totalPages={books.total_pages} />
          </>
        ) : (
          <EmptyData />
        )}
      </Suspense>
    </div>
  )
}
