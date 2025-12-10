import { ActionResponse, initialState } from "@/app/actions"
import { handleFavoriteMovie } from "@/app/actions/movies/handleFavorite"
import FormInput from "@/components/FormInput"
import FormTextarea from "@/components/FormTextarea"
import SubmitErrorMessage from "@/components/SubmitErrorMessage"
import { Button } from "@/components/ui/button"
import { Movie } from "@/types/movie"
import React, { useActionState } from "react"
import toast from "react-hot-toast"

type FormMovieProps = {
  movie?: Movie | null
  isReadyOnly?: boolean
  closeModal: () => void
}

export default function FormMovie({
  movie,
  isReadyOnly,
  closeModal,
}: FormMovieProps) {
  const isEdit = !!movie

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    try {
      formData.append("id", movie?.id?.toString() || "")

      const result = await handleFavoriteMovie(formData)
      if (result.success) {
        toast.success(
          isEdit ? "Movie updated successfully" : "Movie added successfully"
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

  const defaultReleaseDate = movie?.release_date
    ? new Date(movie.release_date).toISOString().split("T")[0]
    : ""

  return (
    <form className="grid gap-4" action={formAction}>
      <FormInput
        label="Title"
        value="title"
        placeholder="Enter the movie title"
        defaultValue={movie?.title}
        error={state.errors?.title?.[0]}
        readonly={isReadyOnly}
      />
      <FormInput
        label="Release Date"
        value="release_date"
        type="date"
        placeholder="Enter the release date"
        defaultValue={defaultReleaseDate}
        error={state.errors?.release_date?.[0]}
        required={false}
        readonly={isReadyOnly}
      />
      <FormTextarea
        label="Overview"
        value="overview"
        placeholder="Enter the movie overview"
        defaultValue={movie?.overview}
        error={state.errors?.overview?.[0]}
        required={false}
        readonly={isReadyOnly}
      />
      {isReadyOnly ? null : (
        <div className="space-y-2">
          <Button type="submit" className="w-full" isLoading={isPending}>
            {isEdit ? "Update Movie" : "Add Movie"}
          </Button>
          {
            <SubmitErrorMessage
              message={state.message}
              error={!state.success}
            />
          }
        </div>
      )}
    </form>
  )
}
