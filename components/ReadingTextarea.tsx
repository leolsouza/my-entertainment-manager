import React from "react"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

type ReadingTextareaProps = {
  title?: string
  value: string
}

export default function ReadingTextarea({
  title = "",
  value,
}: ReadingTextareaProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={title}>{title}</Label>
      <Textarea id={title} name={title} value={value} readOnly />
    </div>
  )
}
