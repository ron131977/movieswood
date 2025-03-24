import type { Metadata } from "next"
import { getAllTvShows } from "@/lib/live-broadcast"
import TvShowCard from "@/components/tvshow-card"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: `Live TV Shows | ${SITE_NAME}`,
  description: `Watch live TV shows on ${SITE_NAME}.`,
  openGraph: {
    title: `Live TV Shows | ${SITE_NAME}`,
    description: `Watch live TV shows on ${SITE_NAME}.`,
    url: `${SITE_URL}/tvshow`,
    siteName: SITE_NAME,
    type: "website",
  },
}

export default function TvShowPage() {
  const tvShows = getAllTvShows()

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Live TV Shows</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {tvShows.map((show) => (
          <TvShowCard key={show.id} tvshow={show} />
        ))}
      </div>
    </div>
  )
}

