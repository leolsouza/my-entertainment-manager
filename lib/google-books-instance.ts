import axios from "axios"

const googleBooks = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  params: {
    key: process.env.GOOGLE_BOOKS_API_KEY,
  },
})

export default googleBooks
