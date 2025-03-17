import type { Metadata } from "next"
import { getPopular, type Media } from "@/lib/tmdb"
import { getTrending } from "@/lib/tmdb"
import MediaCard from "@/components/media-card"

export const metadata: Metadata = {
  title: "TV Shows | MovieWoods",
  description: "Browse and watch popular TV shows on MovieWoods.",
}

export default async function TvShowsPage() {
  const popularTvData = await getPopular("tv")
  const popularTv = popularTvData.results as Media[]
  const trendingMovies = await getTrending("tv", "week")

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">TV Shows</h1>

      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {popularTv.map((show) => (
          <MediaCard key={show.id} media={{ ...show, media_type: "tv" }} />
        ))}
      </div> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {trendingMovies.results.map((item: any) => (
                          <MediaCard
                            key={`tv-${item.id}`}
                            media={{
                              ...item,
                              media_type: "tv",
                            }}
                          />
                        ))}
                      </div>
    </div>
  )
}

