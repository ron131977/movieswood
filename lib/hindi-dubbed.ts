import data from "@/data.json"

// Function to get Hindi dubbed URL for a movie
export function getHindiDubbedMovieUrl(movieId: string): string | null {
  const movie = data.movie.find((m) => m.id === movieId)
  return movie ? movie.videoUrl : null
}

// Function to get Hindi dubbed URL for a specific TV season
export function getHindiDubbedTvSeasonUrl(tvId: string, seasonNumber: string): string | null {
  const tvShow = data.tv.find((t) => t.id === tvId)
  if (!tvShow) return null

  const seasonKey = `season${seasonNumber}`
  return tvShow[seasonKey] || null
}

// Function to check if Hindi dubbed version is available for a movie
export function isHindiDubbedMovieAvailable(id: string): boolean {
  return data.movie.some((m) => m.id === id)
}

// Function to check if Hindi dubbed version is available for a specific TV season
export function isHindiDubbedTvSeasonAvailable(tvId: string, seasonNumber: string): boolean {
  const tvShow = data.tv.find((t) => t.id === tvId)
  if (!tvShow) return false

  const seasonKey = `season${seasonNumber}`
  return !!tvShow[seasonKey] && tvShow[seasonKey] !== ""
}

// Function to check if any Hindi dubbed version is available for a TV show
export function isAnyHindiDubbedTvSeasonAvailable(tvId: string): boolean {
  const tvShow = data.tv.find((t) => t.id === tvId)
  if (!tvShow) return false

  // Check if any season has a non-empty URL
  return Object.keys(tvShow)
    .filter((key) => key.startsWith("season"))
    .some((key) => !!tvShow[key] && tvShow[key] !== "")
}

// Function to get all available Hindi dubbed seasons for a TV show
export function getAvailableHindiDubbedSeasons(tvId: string): number[] {
  const tvShow = data.tv.find((t) => t.id === tvId)
  if (!tvShow) return []

  return Object.keys(tvShow)
    .filter((key) => key.startsWith("season") && !!tvShow[key] && tvShow[key] !== "")
    .map((key) => Number.parseInt(key.replace("season", ""), 10))
    .sort((a, b) => a - b)
}

