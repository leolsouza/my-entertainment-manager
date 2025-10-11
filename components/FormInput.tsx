import React from "react"

interface FormInput {
  label: string
  type: string
  value: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  defaultValue?: string
}

export default function FormInput({
  label,
  type,
  value,
  placeholder,
  defaultValue,
  required = true,
  disabled = false,
}: FormInput) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={value}
        className={"text-sm font-medium text-gray-700 dark:text-gray-300"}
      >
        {label}
        <input
          className="dark:border-dark-border-medium flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#222222] dark:text-gray-100 dark:placeholder:text-gray-500"
          id={value}
          name={value}
          type={type}
          autoComplete={value}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </label>
    </div>
  )
}
