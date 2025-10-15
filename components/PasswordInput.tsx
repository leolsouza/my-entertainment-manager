"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"

interface PasswordInput {
  label: string
  value: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  error?: string
}

export default function PasswordInput({
  label,
  value,
  placeholder,
  error,
  required = true,
  disabled = false,
}: PasswordInput) {
  const [showPassword, setShowPassword] = useState(false)

  const onToggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }
  return (
    <div className="space-y-2">
      <Label htmlFor={value} className={cn(error && "text-red-500")}>
        {label}
      </Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "hide-password-toggle pr-10",
            error && "border-red-500 focus:ring-red-500"
          )}
          id={value}
          name={value}
          autoComplete={value}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={onToggleShowPassword}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
      {error && (
        <p id={`${value}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
