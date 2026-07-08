export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
  values?: Record<string, string>
}
export const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
}
