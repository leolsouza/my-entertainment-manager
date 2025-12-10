export type Movie = {
  id: number
  title: string
  original_title: string
  poster_path?: string
  release_date: string
  overview: string
  genre_ids: number[]
  tmdb_id?: number
}
