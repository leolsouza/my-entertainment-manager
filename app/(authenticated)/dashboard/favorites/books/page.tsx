import { fetchFavoriteBooks } from "@/app/actions/books/get"
import FavoriteBooksWrapper from "./_components/FavoriteBooksWrapper"

type Props = {
  searchParams: Promise<{ query?: string; page?: string }>
}

export default async function FavoriteBooksPage({ searchParams }: Props) {
  const params = await searchParams
  const title = params?.query || ""
  const page = params?.page ? Number(params.page) : 1
  const booksData = await fetchFavoriteBooks({ title, page })

  return <FavoriteBooksWrapper books={booksData} />
}
