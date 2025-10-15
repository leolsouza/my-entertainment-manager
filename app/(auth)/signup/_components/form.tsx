"use client"

import { ActionResponse, initialState } from "@/app/actions/auth"
import { signUp } from "@/app/actions/auth/signup"
import FormInput from "@/components/FormInput"
import PasswordInput from "@/components/PasswordInput"
import SubmitErrorMessage from "@/components/SubmitErrorMessage"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React, { useActionState } from "react"
import toast from "react-hot-toast"

export default function SignUpForm() {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    try {
      const result = await signUp(formData)
      if (result.success) {
        toast.success("Signed up successfully")
        router.push("/dashboard")
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
        label="Email"
        type="email"
        value="email"
        placeholder="Enter your email"
        disabled={isPending}
        error={state.errors?.email?.[0]}
      />
      <PasswordInput
        label="Password"
        value="password"
        placeholder="Enter your password"
        disabled={isPending}
        error={state.errors?.password?.[0]}
      />
      <PasswordInput
        label="Confirm Password"
        value="confirmPassword"
        placeholder="Enter your confirm your password"
        disabled={isPending}
        error={state.errors?.confirmPassword?.[0]}
      />
      <div className="space-y-2">
        <Button type="submit" className="w-full" isLoading={isPending}>
          Sign up
        </Button>
        <SubmitErrorMessage message={state.message} />
      </div>
    </form>
  )
}
