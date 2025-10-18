"use client"

import { ActionResponse, initialState } from "@/app/actions/auth"
import { signIn } from "@/app/actions/auth/signin"
import FormInput from "@/components/FormInput"
import PasswordInput from "@/components/PasswordInput"
import SubmitErrorMessage from "@/components/SubmitErrorMessage"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useActionState, useEffect } from "react"
import toast from "react-hot-toast"

export default function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const unauthenticated = searchParams.get("unauthenticated") === "true"

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    try {
      const result = await signIn(formData)
      if (result.success) {
        toast.success("Signed in successfully")
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

  useEffect(() => {
    if (unauthenticated) {
      toast.error("You must be signed in to access this page")
    }
  }, [unauthenticated])

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
      <div className="space-y-2">
        <Button type="submit" className="w-full" isLoading={isPending}>
          Sign in
        </Button>
        <SubmitErrorMessage message={state.message} />
      </div>
    </form>
  )
}
