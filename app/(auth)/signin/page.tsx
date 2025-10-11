"use client"
import FormInput from "@/components/FormInput"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

export default function SignInPage() {
  return (
    <div className="bg-login-background dark:bg-login-background-dark flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Mode
        </h1>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="dark:border-dark-border-subtle border border-gray-100 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 dark:bg-[#1A1A1A]">
          <form className="space-y-6" action="#" method="POST">
            <FormInput
              label="Email"
              type="email"
              value="email"
              placeholder="Enter your email"
              defaultValue=""
            />
            <FormInput
              label="Password"
              type="password"
              value="password"
              placeholder="Enter your password"
              defaultValue=""
            />
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
