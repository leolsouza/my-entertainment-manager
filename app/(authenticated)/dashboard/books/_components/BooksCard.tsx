import React from "react"
import FavoriteCard from "@/components/FavoriteCard"
import { Book } from "@/types/book"

export default function BooksCard({ book }: { book: Book }) {
  return <FavoriteCard title={book.title} src={book.thumbnail} />
}
