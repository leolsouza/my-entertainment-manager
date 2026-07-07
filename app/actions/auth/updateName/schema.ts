import z from "zod"

const UpdateNameSchema = z.object({
  name: z.string().min(1, "Name is required"),
})
export default UpdateNameSchema
