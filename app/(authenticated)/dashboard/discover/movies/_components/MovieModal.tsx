import ReadingInput from "@/components/ReadingInput"
import ReadingTextarea from "@/components/ReadingTextarea"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Movie } from "@/types/movie"
import React from "react"

type MovieModalProps = {
  movie: Movie | null
  closeModal?: () => void
}
export default function MovieModal({ movie, closeModal }: MovieModalProps) {
  return (
    <Dialog open={!!movie} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{movie?.title} - Information</DialogTitle>
        </DialogHeader>
        <Separator className="my-1" />
        <div className="grid gap-4">
          <ReadingInput title="Title" value={movie?.title ?? ""} />
          <ReadingInput
            title="Release Date"
            value={movie?.release_date ?? ""}
          />
          <ReadingTextarea title="Overview" value={movie?.overview ?? ""} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
