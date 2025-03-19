import type { Metadata } from "next"
import { getPopular, type Media } from "@/lib/tmdb"
import MediaCard from "@/components/media-card"

export const metadata: Metadata = {
  title: "Movies | MoviesWood",
  description: "Browse and watch popular movies on MoviesWood.",
}

export default async function MoviesPage() {
  const popularMoviesData = await getPopular("movie")
  const popularMovies = popularMoviesData.results as Media[]

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {popularMovies.map((movie) => (
          <MediaCard key={movie.id} media={{ ...movie, media_type: "movie" }} />
        ))}
      </div>
    </div>
  )
}

