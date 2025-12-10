import { cn } from "@/lib/utils"
import React from "react"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { FormProps } from "@/types/form"

export default function FormTextarea({
  label,
  value,
  placeholder,
  error,
  required = true,
  disabled = false,
  readonly = false,
  defaultValue,
}: FormProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={value} className={cn(error && "text-red-500")}>
        {label}
      </Label>
      <Textarea
        className={cn(error && "border-red-500 focus:ring-red-500")}
        id={value}
        name={value}
        autoComplete={value}
        disabled={disabled}
        required={required}
        readOnly={readonly}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {error && (
        <p id={`${value}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
