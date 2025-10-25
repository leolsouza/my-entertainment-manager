import googleBooks from "@/lib/google-books-instance"
import { Book } from "@/types/book"

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
