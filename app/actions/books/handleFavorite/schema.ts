import z from "zod"

const handleBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  published_date: z.string().optional(),
  poster_url: z.string().optional(),
})
export default handleBookSchema
