import z from "zod"

const SignInSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})
export default SignInSchema
