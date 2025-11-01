import tmdb from "@/lib/tmdb-instance"

export async function fetchMovieGenres() {
  try {
    const { data } = await tmdb.get("/genre/movie/list")
    return data.genres
  } catch (error) {
    console.error("Error fetching genre:", error)
  }
}

export async function fetchSeriesGenres() {
  try {
    const { data } = await tmdb.get("/genre/tv/list")
    return data.genres
  } catch (error) {
    console.error("Error fetching genre:", error)
  }
}
