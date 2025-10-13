import Link from "next/link"
import React from "react"
import SignInForm from "./_components/form"

export default function SignInPage() {
  return (
    <div className="bg-login-background dark:bg-login-background-dark flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="dark:border-dark-border-subtle border border-gray-100 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 dark:bg-[#1A1A1A]">
          <SignInForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
