import { db } from "@/lib/db"
import { books } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import googleBooks from "@/lib/google-books-instance"
import { Book } from "@/types/book"
import { getAuthUser } from "@/lib/auth"

export async function fetchBooks({
  query,
  startIndex = 0,
  maxResults = 40,
}: {
  query?: string
  startIndex?: number
  maxResults?: number
}): Promise<GetQuery<Book>> {
  const { data } = await googleBooks.get("/volumes", {
    params: {
      q: query ?? "popular",
      startIndex,
      maxResults,
      langRestrict: "pt",
    },
  })

  const totalItems = data.totalItems || 0
  const totalPages = Math.ceil(totalItems / maxResults)
  const currentPage = Math.floor(startIndex / maxResults) + 1

  return {
    results:
      data.items?.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publishedDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      })) ?? [],
    page: currentPage,
    total_pages: totalPages,
    total_results: totalItems,
  }
}

export async function getFavoriteBookIds(): Promise<string[]> {
  const authUser = await getAuthUser()
  if (!authUser) return []

  const result = await db
    .select({ googleBooksId: books.googleBooksId })
    .from(books)
    .where(eq(books.userId, authUser.id))

  return result
    .map((b) => b.googleBooksId)
    .filter((id): id is string => id !== null)
}
