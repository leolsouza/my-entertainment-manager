import { FavoriteBook } from "@/types/book"
import React from "react"
import FavoriteCardActions from "@/components/FavoriteCardActions"

export default function BooksCard({
  book,
  handleOpenModal,
  isEditable = false,
  onRemoveFavorite,
}: {
  book: FavoriteBook
  handleOpenModal: (book: FavoriteBook) => void
  isEditable?: boolean
  onRemoveFavorite: (book: FavoriteBook) => Promise<void>
}) {
  return (
    <FavoriteCardActions
      title={book.title}
      key={book.id}
      src={book.thumbnail}
      isEditable={isEditable}
      handleOpenModal={() => handleOpenModal(book)}
      onRemoveFavorite={() => onRemoveFavorite(book)}
    />
  )
}
