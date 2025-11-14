import ReadingInput from "@/components/ReadingInput"
import ReadingTextarea from "@/components/ReadingTextarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Book } from "@/types/book"
import React from "react"

type BooksModalProps = {
  book: Book | null
  closeModal?: () => void
}
export default function BooksModal({ book, closeModal }: BooksModalProps) {
  return (
    <Dialog open={!!book} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{book?.title} - Information</DialogTitle>
        </DialogHeader>
        <Separator className="my-1" />
        <div className="grid gap-4">
          <ReadingInput title="Title" value={book?.title ?? ""} />
          <ReadingInput
            title="Published Date"
            value={book?.publishedDate ?? ""}
          />
          <ReadingTextarea
            title="Description"
            value={book?.description ?? ""}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
