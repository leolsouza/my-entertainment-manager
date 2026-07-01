import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { FavoriteBook } from "@/types/book"
import React from "react"
import FormBook from "./FormBook"

type BookModalProps = {
  openModal: boolean
  book?: FavoriteBook | null
  closeModal: () => void
  isReadyOnly?: boolean
}

export default function BookModal({
  openModal,
  book,
  closeModal,
  isReadyOnly = false,
}: BookModalProps) {
  return (
    <Dialog open={openModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {book ? `${book.title} - Information` : "Add Book"}
          </DialogTitle>
        </DialogHeader>
        <Separator className="my-1" />
        <div className="grid gap-4">
          <FormBook
            book={book}
            isReadyOnly={isReadyOnly}
            closeModal={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
