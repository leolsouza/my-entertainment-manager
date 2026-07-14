import axios from "axios"

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 500

const googleBooks = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  params: {
    key: process.env.GOOGLE_BOOKS_API_KEY,
  },
})

googleBooks.interceptors.response.use(undefined, async (error) => {
  const config = error.config
  if (!config || error.response?.status !== 503) throw error

  config.__retryCount = (config.__retryCount ?? 0) + 1
  if (config.__retryCount > MAX_RETRIES) throw error

  await new Promise((resolve) =>
    setTimeout(resolve, RETRY_DELAY_MS * config.__retryCount)
  )
  return googleBooks(config)
})

export default googleBooks
