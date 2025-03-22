import type { Metadata } from "next"
import { searchMulti, type Media } from "@/lib/tmdb"
import MediaCard from "@/components/media-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Search Movies and TV Shows | MovieFlix",
  description: "Search for your favorite movies and TV shows on MovieFlix.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Search Movies and TV Shows | MovieFlix",
    description: "Search for your favorite movies and TV shows on MovieFlix.",
    url: "https://movieflix.vercel.app/search",
    siteName: "MovieFlix",
    type: "website",
  },
  alternates: {
    canonical: "https://movieflix.vercel.app/search",
  },
}

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const results = query ? await searchMulti(query) : { results: [] }
  const media = results.results.filter(
    (item: any) => item.media_type === "movie" || item.media_type === "tv",
  ) as Media[]

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <form action="/search" className="mb-8 flex gap-2">
        <Input
          type="search"
          name="q"
          placeholder="Search for movies, TV shows..."
          defaultValue={query}
          className="max-w-xl"
        />
        <Button type="submit">
          <SearchIcon className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {query && (
        <h2 className="text-xl font-semibold mb-4">
          {media.length > 0 ? `Results for "${query}"` : `No results found for "${query}"`}
        </h2>
      )}

      {media.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {media.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      ) : query ? (
        <p className="text-muted-foreground">No results found. Try a different search term.</p>
      ) : (
        <p className="text-muted-foreground">Enter a search term to find movies and TV shows.</p>
      )}
    </div>
  )
}

