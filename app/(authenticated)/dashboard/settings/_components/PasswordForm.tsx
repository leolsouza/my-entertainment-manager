"use client"

import { ActionResponse, initialState } from "@/app/actions"
import { updatePassword } from "@/app/actions/auth/updatePassword"
import PasswordInput from "@/components/PasswordInput"
import SubmitErrorMessage from "@/components/SubmitErrorMessage"
import { Button } from "@/components/ui/button"
import { useActionState, useRef } from "react"
import toast from "react-hot-toast"

export default function PasswordForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    try {
      const result = await updatePassword(formData)
      if (result.success) {
        toast.success("Password updated successfully")
        formRef.current?.reset()
      }

      return result
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message || "An error occurred",
        errors: undefined,
      }
    }
  }, initialState)

  return (
    <form
      ref={formRef}
      className="space-y-6"
      action={formAction}
    >
      <PasswordInput
        label="Current password"
        value="currentPassword"
        placeholder="Enter your current password"
        disabled={isPending}
        error={state.errors?.currentPassword?.[0]}
      />
      <PasswordInput
        label="New password"
        value="newPassword"
        placeholder="Enter your new password"
        disabled={isPending}
        error={state.errors?.newPassword?.[0]}
      />
      <PasswordInput
        label="Confirm new password"
        value="confirmNewPassword"
        placeholder="Confirm your new password"
        disabled={isPending}
        error={state.errors?.confirmNewPassword?.[0]}
      />
      <div className="space-y-2">
        <Button type="submit" isLoading={isPending}>
          Update password
        </Button>
        <SubmitErrorMessage message={state.message} error={!state.success} />
      </div>
    </form>
  )
}
