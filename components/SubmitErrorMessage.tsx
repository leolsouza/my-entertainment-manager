import React from "react"

interface SubmitErrorMessageProps {
  message?: string
  error?: boolean
}

export default function SubmitErrorMessage({
  message,
  error,
}: SubmitErrorMessageProps) {
  return error ? (
    <p className="text-xs font-medium text-red-500">{message}</p>
  ) : null
}
