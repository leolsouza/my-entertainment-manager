"use client"
import {
  Dispatch,
  SetStateAction,
  useOptimistic,
  useState,
  useTransition,
} from "react"
import { FavoriteBook } from "@/types/book"
import toast from "react-hot-toast"
import BooksCard from "./BooksCard"
import BookModal from "./BookModal"
import { deleteFavoriteBook } from "@/app/actions/books/handleFavorite"

type Props = {
  books: FavoriteBook[]
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function BooksList({ books, openModal, setOpenModal }: Props) {
  const [selectedBook, setSelectedBook] = useState<FavoriteBook | null>(null)

  const [optimisticBooks, setOptimisticBooks] = useOptimistic(
    books,
    (oldValues, newValue: FavoriteBook) => {
      return oldValues.filter((book) => book.id !== newValue.id)
    }
  )
  const [, startTransition] = useTransition()

  const handleRemoveFavorite = async (book: FavoriteBook) => {
    startTransition(async () => {
      setOptimisticBooks(book)
      const result = await deleteFavoriteBook(book.id)
      if (result.success) {
        toast.success(result.message)
        return
      }
      toast.error(result.message)
    })
  }

  const isEditable = (book: FavoriteBook | null): boolean =>
    !!!book?.googleBooksId

  const handleOpenModal = (book: FavoriteBook) => {
    setSelectedBook(book)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedBook(null)
    setOpenModal(false)
  }

  return (
    <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-5">
      {optimisticBooks.map((book) => (
        <BooksCard
          book={book}
          key={book.id}
          isEditable={isEditable(book)}
          handleOpenModal={() => handleOpenModal(book)}
          onRemoveFavorite={handleRemoveFavorite}
        />
      ))}
      {openModal && (
        <BookModal
          openModal={openModal}
          book={selectedBook}
          isReadyOnly={!isEditable(selectedBook)}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  )
}
