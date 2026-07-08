import { cn } from "@/lib/utils"
import React from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { FormProps } from "@/types/form"

export default function FormInput({
  label,
  value,
  placeholder,
  error,
  type = "text",
  required = true,
  disabled = false,
  readonly = false,
  defaultValue,
}: FormProps & {
  type?: string
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={value}
        className={cn(
          error && "text-red-500",
          required && "after:ml-1 after:text-red-500 after:content-['*']"
        )}
      >
        {label}
      </Label>
      <Input
        className={cn(error && "border-red-500 focus:ring-red-500")}
        id={value}
        name={value}
        type={type}
        autoComplete={value}
        disabled={disabled}
        required={required}
        readOnly={readonly}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      {error && (
        <p id={`${value}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
