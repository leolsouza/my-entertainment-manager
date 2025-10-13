import React from "react"

interface SubmitErrorMessageProps {
  message?: string
}

export default function SubmitErrorMessage({
  message,
}: SubmitErrorMessageProps) {
  return message ? (
    <p className="text-xs font-medium text-red-500">{message}</p>
  ) : null
}
