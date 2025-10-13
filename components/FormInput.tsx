import { cn } from "@/lib/utils"
import React from "react"

interface FormInput {
  label: string
  value: string
  required?: boolean
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}

export default function FormInput({
  label,
  value,
  placeholder,
  error,
  type = "text",
  required = true,
  disabled = false,
}: FormInput) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={value}
        className={cn(
          "space-y-1 text-sm font-medium text-gray-700 dark:text-gray-300",
          error && "text-red-500"
        )}
      >
        {label}
        <input
          className={cn(
            "dark:border-dark-border-medium flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#222222] dark:text-gray-100 dark:placeholder:text-gray-500",
            error && "border-red-500 focus:ring-red-500"
          )}
          id={value}
          name={value}
          type={type}
          autoComplete={value}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
        />
        {error && (
          <p id={`${value}-error`} className="text-xs text-red-500">
            {error}
          </p>
        )}
      </label>
    </div>
  )
}
