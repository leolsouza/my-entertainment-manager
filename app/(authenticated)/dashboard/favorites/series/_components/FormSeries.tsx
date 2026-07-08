import { ActionResponse, initialState } from "@/app/actions"
import { handleFavoriteSeries } from "@/app/actions/series/handleFavorite"
import FormInput from "@/components/FormInput"
import SubmitErrorMessage from "@/components/SubmitErrorMessage"
import { Button } from "@/components/ui/button"
import { Series } from "@/types/series"
import React, { useActionState } from "react"
import toast from "react-hot-toast"

type FormSeriesProps = {
  series?: Series | null
  isReadyOnly?: boolean
  closeModal: () => void
}

export default function FormSeries({
  series,
  isReadyOnly,
  closeModal,
}: FormSeriesProps) {
  const isEdit = !!series

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    try {
      formData.append("id", series?.id?.toString() || "")

      const result = await handleFavoriteSeries(formData)
      if (result.success) {
        toast.success(
          isEdit ? "Series updated successfully" : "Series added successfully"
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
        value="name"
        placeholder="Enter the series name"
        defaultValue={state.values?.name ?? series?.name}
        error={state.errors?.name?.[0]}
        readonly={isReadyOnly}
      />
      <FormInput
        label="First Air Date"
        value="first_air_date"
        type="date"
        required={false}
        placeholder="Enter the first air date"
        defaultValue={state.values?.first_air_date ?? series?.first_air_date}
        error={state.errors?.first_air_date?.[0]}
        readonly={isReadyOnly}
      />
      <FormInput
        label="Poster URL"
        value="poster_url"
        type="url"
        placeholder="Enter the poster URL"
        defaultValue={state.values?.poster_url ?? series?.poster_path}
        required={false}
        error={state.errors?.poster_path?.[0]}
        readonly={isReadyOnly}
      />
      {isReadyOnly ? null : (
        <div className="space-y-2">
          <Button type="submit" className="w-full" isLoading={isPending}>
            {isEdit ? "Update series" : "Add series"}
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
