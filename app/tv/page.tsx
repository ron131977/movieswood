import type { Metadata } from "next"
import { getJsonTvShows } from "@/lib/json-data"
import MediaCard from "@/components/media-card"
import Search from "@/components/header1"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: `TV Shows | ${SITE_NAME}`,
  description: `Browse and watch popular TV shows on ${SITE_NAME}.`,
  openGraph: {
    title: `TV Shows | ${SITE_NAME}`,
    description: `Browse and watch popular TV shows on ${SITE_NAME}.`,
    url: `${SITE_URL}/tv`,
    siteName: SITE_NAME,
    type: "website",
  },
}

export default async function TvShowsPage() {
  const jsonTvShows = await getJsonTvShows()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">TV Shows</h1>
      <div className="mb-6">
      <p className="text-muted-foreground">
  This section features publicly available TV show content sourced from internet searches. We do not host, produce, or promote any videos on this platform.
</p>
      </div>
  <div className="flex justify-center items-center mt-10">
         <Search />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-10">
        {jsonTvShows.map((show) => (
          <MediaCard key={show.id} media={{ ...show, media_type: "tv" }} />
        ))}
      </div>
    </div>
  )
}

