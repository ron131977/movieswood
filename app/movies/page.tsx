import type { Metadata } from "next"
import { getJsonMovies } from "@/lib/json-data"
import MediaCard from "@/components/media-card"
import Search from "@/components/header1"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: `Movies | ${SITE_NAME}`,
  description: `Browse and watch popular movies on ${SITE_NAME}.`,
  openGraph: {
    title: `Movies | ${SITE_NAME}`,
    description: `Browse and watch popular movies on ${SITE_NAME}.`,
    url: `${SITE_URL}/movies`,
    siteName: SITE_NAME,
    type: "website",
  },
  
}

export default async function MoviesPage() {
  const jsonMovies = await getJsonMovies()

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
      <h1 className="text-3xl font-bold mb-6 ">Movies</h1>
      <p className="text-muted-foreground">
  This section features publicly available Movies content sourced from internet searches. We do not host, produce, or promote any videos on this platform.
</p>

  <div className="flex justify-center items-center mt-10">
         <Search />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-10">
        {jsonMovies.map((movie) => (
          <MediaCard key={movie.id} media={{ ...movie, media_type: "movie" }} />
        ))}
      </div>
    </div>
  )
}

