"use client"
import { useOptimistic, useTransition } from "react"
import { addFavorite, removeFavorite } from "@/app/actions/books/toggleFavorite"
import toast from "react-hot-toast"
import BooksCard from "./BooksCard"
import { Book } from "@/types/book"

export default function BooksList({
  books,
  favoriteIds,
}: {
  books: Book[]
  favoriteIds: string[]
}) {
  const [optimisticFavoriteIds, setOptimisticFavoriteIds] = useOptimistic(
    favoriteIds,
    (oldValues, newValue: string) => {
      const index = oldValues.indexOf(newValue)
      if (index > -1) return oldValues.splice(index, 1)
      return [...oldValues, newValue]
    }
  )
  const [isPending, startTransition] = useTransition()

  console.log({ optimisticFavoriteIds, favoriteIds })
  const handleToggleFavorite = async (book: Book, alreadyAFavorite = false) => {
    startTransition(async () => {
      setOptimisticFavoriteIds(book.id)
      if (alreadyAFavorite) {
        const resultRemove = await removeFavorite(book)
        if (!resultRemove.success) toast.error(resultRemove.message)
        return
      }
      const resultSuccess = await addFavorite(book)
      if (!resultSuccess.success) {
        toast.error(resultSuccess.message)
        return
      }
    })
  }

  const isFavorite = (bookId: string): boolean =>
    optimisticFavoriteIds.includes(bookId)

  return (
    <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
      {books.map((book) => (
        <BooksCard
          book={book}
          key={book.id}
          isFavorite={isFavorite(book.id)}
          onFavoriteChange={() =>
            handleToggleFavorite(book, isFavorite(book.id))
          }
        />
      ))}
    </div>
  )
}
