import tmdb from "./tmdb-instance"

export async function fetchGenres(){
  try {
    const { data } = await tmdb.get("/genre/movie/list")
    return data.genres
  } catch (error) {
    console.error("Error fetching genre:", error)
  }
}
