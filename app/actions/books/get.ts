import { db } from "@/lib/db"
import { books } from "@/lib/db/schema"
import { and, count, eq, like } from "drizzle-orm"
import googleBooks from "@/lib/google-books-instance"
import { Book, FavoriteBook } from "@/types/book"
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

export async function fetchFavoriteBooks({
  title,
  page = 1,
}: {
  title?: string
  page?: number
}): Promise<GetQuery<FavoriteBook>> {
  const PAGE_SIZE = 15
  const authUser = await getAuthUser()

  if (!authUser)
    return { results: [], page, total_pages: 0, total_results: 0 }

  const offset = (page - 1) * PAGE_SIZE

  const conditions = [eq(books.userId, authUser.id)]

  if (title && title.trim() !== "") {
    conditions.push(like(books.title, `%${title}%`))
  }

  const where = and(...conditions)

  const [{ total }] = await db
    .select({ total: count() })
    .from(books)
    .where(where)

  const results = await db
    .select()
    .from(books)
    .where(where)
    .limit(PAGE_SIZE)
    .offset(offset)

  return {
    results: results.map((b) => ({
      id: b.id,
      googleBooksId: b.googleBooksId ?? undefined,
      title: b.title,
      authors: b.authors ?? undefined,
      thumbnail: b.posterPath ?? undefined,
      publishedDate: b.releaseDate ?? undefined,
    })),
    page,
    total_pages: Math.ceil(total / PAGE_SIZE),
    total_results: total,
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
