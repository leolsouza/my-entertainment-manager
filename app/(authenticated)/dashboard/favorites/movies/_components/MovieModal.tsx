import ReadingInput from "@/components/ReadingInput"
import ReadingTextarea from "@/components/ReadingTextarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Movie } from "@/types/movie"
import React from "react"
import FormMovie from "./FormMovie"

type MovieModalProps = {
  openModal: boolean
  movie?: Movie | null
  closeModal: () => void
  isReadyOnly?: boolean
}
export default function MovieModal({
  openModal,
  movie,
  closeModal,
  isReadyOnly = false,
}: MovieModalProps) {
  return (
    <Dialog open={openModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {movie ? `${movie.title} - Information` : "Add Movie"}
          </DialogTitle>
        </DialogHeader>
        <Separator className="my-1" />
        <div className="grid gap-4">
          <FormMovie
            movie={movie}
            isReadyOnly={isReadyOnly}
            closeModal={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
