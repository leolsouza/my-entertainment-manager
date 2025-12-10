import z from "zod"

const handleMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  release_date: z.string().optional(),
  overview: z.string().optional(),
})
export default handleMovieSchema
