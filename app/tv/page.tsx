import type { Metadata } from "next"
import { getPopular, type Media } from "@/lib/tmdb"
import MediaCard from "@/components/media-card"

export const metadata: Metadata = {
  title: "TV Shows | MoviesWood",
  description: "Browse and watch popular TV shows on MoviesWood.",
}

export default async function TvShowsPage() {
  const popularTvData = await getPopular("tv")
  const popularTv = popularTvData.results as Media[]

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">TV Shows</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {popularTv.map((show) => (
          <MediaCard key={show.id} media={{ ...show, media_type: "tv" }} />
        ))}
      </div>
    </div>
  )
}

