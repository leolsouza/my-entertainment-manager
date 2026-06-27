import z from "zod"

const handleSeriesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  first_air_date: z.string().optional(),
  poster_path: z.string().optional(),
})
export default handleSeriesSchema
