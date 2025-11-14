import React from "react"
import FavoriteCard from "@/components/FavoriteCard"
import { Book } from "@/types/book"

export default function BooksCard({
  book,
  isFavorite,
  onFavoriteChange,
  handleOpenModal,
}: {
  book: Book
  isFavorite: boolean
  onFavoriteChange: (book: Book, alreadyAFavorite?: boolean) => Promise<void>
  handleOpenModal?: () => void
}) {
  return (
    <FavoriteCard
      title={book.title}
      src={book.thumbnail}
      isFavorite={isFavorite}
      onFavoriteChange={() => onFavoriteChange(book)}
      handleOpenModal={handleOpenModal}
    />
  )
}
