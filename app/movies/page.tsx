import type { Metadata } from "next"
import { getPopular, type Media } from "@/lib/tmdb"
import { getTrending } from "@/lib/tmdb"
import MediaCard from "@/components/media-card"

export const metadata: Metadata = {
  title: "Movies | MovieWoods",
  description: "Browse and watch popular movies on MovieWoods.",
}

export default async function MoviesPage() {
  const popularMoviesData = await getPopular("movie")
  const popularMovies = popularMoviesData.results as Media[]
  const trendingMovies = await getTrending("movie", "week")

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>

      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {popularMovies.map((movie) => (
          <MediaCard key={movie.id} media={{ ...movie, media_type: "movie" }} />
        ))}
      </div> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {trendingMovies.results.map((item: any) => (
                    <MediaCard
                      key={`movie-${item.id}`}
                      media={{
                        ...item,
                        media_type: "movie",
                      }}
                    />
                  ))}
                </div>
    </div>
  )
}

