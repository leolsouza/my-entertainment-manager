import React from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

type ReadingInputProps = {
  title?: string
  value: string
}

export default function ReadingInput({ title = "", value }: ReadingInputProps) {
  return (
    <div className="grid gap-3">
      <Label htmlFor={title}>{title}</Label>
      <Input id={title} name={title} value={value} readOnly />
    </div>
  )
}
