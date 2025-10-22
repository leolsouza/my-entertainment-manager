import Link from "next/link"
import React, { Suspense } from "react"
import SignInForm from "./_components/form"
import Image from "next/image"
import Logo from "@/assets/logo.png"

export default function SignInPage() {
  return (
    <div className="bg-primary flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-[#121212]">
      <div className="sm:mx-auto sm:w-[600px]">
        <div className="dark:border-dark-border-subtle border-gray-100 bg-white px-4 pb-8 shadow sm:rounded-lg sm:px-10 dark:bg-[#1A1A1A]">
          <Image
            src={Logo}
            alt="Logo"
            width={400}
            className="mx-auto pt-8 pb-10"
          />

          <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in your account
          </h1>
          <Suspense>
            <SignInForm />
          </Suspense>
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
