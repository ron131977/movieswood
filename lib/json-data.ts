import data from "@/data.json"
import { fetchFromTMDB, type Media } from "@/lib/tmdb"

// Get all movie IDs from our JSON file
export function getMovieIds(): string[] {
  return data.movie.map((movie) => movie.id)
}

// Get all TV show IDs from our JSON file
export function getTvIds(): string[] {
  return data.tv.map((tv) => tv.id)
}

// Fetch movie details from TMDB for movies in our JSON file
export async function getJsonMovies(): Promise<Media[]> {
  const movieIds = getMovieIds()
  const movies: Media[] = []

  for (const id of movieIds) {
    try {
      const movie = await fetchFromTMDB(`/movie/${id}`)
      movies.push({
        ...movie,
        media_type: "movie",
      })
    } catch (error) {
      console.error(`Failed to fetch movie with ID ${id}:`, error)
    }
  }

  return movies
}

// Fetch TV show details from TMDB for TV shows in our JSON file
export async function getJsonTvShows(): Promise<Media[]> {
  const tvIds = getTvIds()
  const tvShows: Media[] = []

  for (const id of tvIds) {
    try {
      const tvShow = await fetchFromTMDB(`/tv/${id}`)
      tvShows.push({
        ...tvShow,
        media_type: "tv",
      })
    } catch (error) {
      console.error(`Failed to fetch TV show with ID ${id}:`, error)
    }
  }

  return tvShows
}

