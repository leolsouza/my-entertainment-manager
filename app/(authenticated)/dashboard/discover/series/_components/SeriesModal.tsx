import ReadingInput from "@/components/ReadingInput"
import ReadingTextarea from "@/components/ReadingTextarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Series } from "@/types/series"
import React from "react"

type SeriesModalProps = {
  series: Series | null
  closeModal?: () => void
}
export default function SeriesModal({ series, closeModal }: SeriesModalProps) {
  return (
    <Dialog open={!!series} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{series?.name} - Information</DialogTitle>
        </DialogHeader>
        <Separator className="my-1" />
        <div className="grid gap-4">
          <ReadingInput title="Title" value={series?.original_name ?? ""} />
          <ReadingInput
            title="First air date"
            value={series?.first_air_date ?? ""}
          />
          <ReadingTextarea title="Overview" value={series?.overview ?? ""} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
