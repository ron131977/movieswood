const TMDB_API_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"
const VIDSRC_MOVIE_BASE_URL = "https://vidsrc.cc/v2/embed/movie/"
const VIDSRC_TV_BASE_URL = "https://vidsrc.cc/v2/embed/tv/"

type FetchOptions = {
  cache?: RequestCache
  next?: { revalidate?: number }
}

export async function fetchFromTMDB(endpoint: string, options: FetchOptions = {}) {
  const { cache = "force-cache", next = { revalidate: 60 * 60 * 24 } } = options

  const headers = {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  }

  const response = await fetch(`${TMDB_API_BASE_URL}${endpoint}`, {
    headers,
    cache,
    next,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch data from TMDB")
  }

  return data
}

export function getImageUrl(path: string | null, size = "original") {
  if (!path) return "/placeholder.svg"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export async function searchMulti(query: string) {
  if (!query || query.trim() === "") return { results: [] }
  return fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`)
}

export async function getTrending(mediaType: "all" | "movie" | "tv" = "all", timeWindow: "day" | "week" = "week") {
  return fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`)
}

export async function getPopular(mediaType: "movie" | "tv") {
  return fetchFromTMDB(`/${mediaType}/popular`)
}

export async function getDetails(mediaType: "movie" | "tv", id: string) {
  return fetchFromTMDB(`/${mediaType}/${id}?append_to_response=videos,credits,similar,recommendations`)
}

export function getMovieStreamingUrl(movieId: string) {
  return `${VIDSRC_MOVIE_BASE_URL}${movieId}`
}

export function getTvEpisodeStreamingUrl(tvId: string, seasonNumber: string, episodeNumber: string) {
  return `${VIDSRC_TV_BASE_URL}${tvId}/${seasonNumber}/${episodeNumber}`
}

export type MediaType = "movie" | "tv"

export interface Media {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  media_type: MediaType
  vote_average: number
  release_date?: string
  first_air_date?: string
}

export interface MovieDetails extends Media {
  runtime: number
  genres: { id: number; name: string }[]
  videos: { results: Video[] }
  credits: { cast: Cast[]; crew: Crew[] }
  similar: { results: Media[] }
  recommendations: { results: Media[] }
}

export interface TvDetails extends Media {
  number_of_seasons: number
  number_of_episodes: number
  seasons: Season[]
  genres: { id: number; name: string }[]
  videos: { results: Video[] }
  credits: { cast: Cast[]; crew: Crew[] }
  similar: { results: Media[] }
  recommendations: { results: Media[] }
}

export interface Season {
  id: number
  name: string
  season_number: number
  episode_count: number
  poster_path: string | null
  overview: string
}

export interface Episode {
  id: number
  name: string
  episode_number: number
  season_number: number
  overview: string
  still_path: string | null
  air_date: string
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface Crew {
  id: number
  name: string
  job: string
  profile_path: string | null
}

