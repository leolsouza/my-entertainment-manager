export type Book = {
  id: string
  title: string
  authors?: string[]
  publishedDate?: string
  description?: string
  thumbnail?: string
}

export type FavoriteBook = {
  id: number
  googleBooksId?: string
  title: string
  authors?: string[]
  thumbnail?: string
  publishedDate?: string
}
