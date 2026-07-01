import { ActionResponse, initialState } from "@/app/actions"
import { handleFavoriteBook } from "@/app/actions/books/handleFavorite"
import FormInput from "@/components/FormInput"
import SubmitErrorMessage from "@/components/SubmitErrorMessage"
import { Button } from "@/components/ui/button"
import { FavoriteBook } from "@/types/book"
import React, { useActionState } from "react"
import toast from "react-hot-toast"

type FormBookProps = {
  book?: FavoriteBook | null
  isReadyOnly?: boolean
  closeModal: () => void
}

export default function FormBook({
  book,
  isReadyOnly,
  closeModal,
}: FormBookProps) {
  const isEdit = !!book

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    try {
      formData.append("id", book?.id?.toString() || "")

      const result = await handleFavoriteBook(formData)
      if (result.success) {
        toast.success(
          isEdit ? "Book updated successfully" : "Book added successfully"
        )
        closeModal()
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
    <form className="grid gap-4" action={formAction}>
      <FormInput
        label="Title"
        value="title"
        placeholder="Enter the book title"
        defaultValue={book?.title}
        error={state.errors?.title?.[0]}
        readonly={isReadyOnly}
      />
      <FormInput
        label="Published Year"
        value="published_date"
        type="text"
        placeholder="Enter the published year (e.g. 2023)"
        defaultValue={book?.publishedDate}
        error={state.errors?.published_date?.[0]}
        required={false}
        readonly={isReadyOnly}
      />
      <FormInput
        label="Poster URL"
        value="poster_url"
        type="url"
        placeholder="Enter the poster URL"
        defaultValue={book?.thumbnail}
        error={state.errors?.poster_url?.[0]}
        required={false}
        readonly={isReadyOnly}
      />
      {isReadyOnly ? null : (
        <div className="space-y-2">
          <Button type="submit" className="w-full" isLoading={isPending}>
            {isEdit ? "Update Book" : "Add Book"}
          </Button>
          <SubmitErrorMessage message={state.message} error={!state.success} />
        </div>
      )}
    </form>
  )
}
