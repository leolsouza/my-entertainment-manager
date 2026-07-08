"use client"

import { ActionResponse, initialState } from "@/app/actions"
import { updateName } from "@/app/actions/auth/updateName"
import FormInput from "@/components/FormInput"
import SubmitErrorMessage from "@/components/SubmitErrorMessage"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import toast from "react-hot-toast"

type Props = {
  defaultName: string
}

export default function NameForm({ defaultName }: Props) {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    try {
      const result = await updateName(formData)
      if (result.success) {
        toast.success("Name updated successfully")
        router.refresh()
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
    <form className="space-y-6" action={formAction}>
      <FormInput
        label="Name"
        type="text"
        value="name"
        placeholder="Enter your name"
        defaultValue={state.values?.name ?? defaultName}
        disabled={isPending}
        error={state.errors?.name?.[0]}
      />
      <div className="space-y-2">
        <Button type="submit" isLoading={isPending}>
          Save name
        </Button>
        <SubmitErrorMessage message={state.message} error={!state.success} />
      </div>
    </form>
  )
}
