export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}
export const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
}
