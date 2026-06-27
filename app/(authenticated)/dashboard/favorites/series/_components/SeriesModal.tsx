import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import React from "react"
import { Series } from "@/types/series"
import FormSeries from "./FormSeries"

type SeriesModalProps = {
  openModal: boolean
  series?: Series | null
  closeModal: () => void
  isReadyOnly?: boolean
}
export default function SeriesModal({
  openModal,
  series,
  closeModal,
  isReadyOnly = false,
}: SeriesModalProps) {
  return (
    <Dialog open={openModal} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {series ? `${series.name} - Information` : "Add Series"}
          </DialogTitle>
        </DialogHeader>
        <Separator className="my-1" />
        <div className="grid gap-4">
          <FormSeries
            series={series}
            isReadyOnly={isReadyOnly}
            closeModal={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
