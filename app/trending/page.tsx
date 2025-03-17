import type { Metadata } from "next"
import { getTrending } from "@/lib/tmdb"
import MediaCard from "@/components/media-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TrendingStructuredData from "./structured-data"

export const metadata: Metadata = {
  title: "Trending Movies and TV Shows | MovieWoods",
  description: "Browse what's trending in movies and TV shows right now on MovieWoods.",
  openGraph: {
    title: "Trending Movies and TV Shows | MovieWoods",
    description: "Browse what's trending in movies and TV shows right now on MovieWoods.",
    url: "https://moviewoods.vercel.app/trending",
    siteName: "MovieWoods",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending Movies and TV Shows | MovieWoods",
    description: "Browse what's trending in movies and TV shows right now on MovieWoods.",
  },
  alternates: {
    canonical: "https://moviewoods.vercel.app/trending",
  },
}

export default async function TrendingPage() {
  // Fetch trending data
  const trendingAll = await getTrending("all", "week")
  const trendingMovies = await getTrending("movie", "week")
  const trendingTv = await getTrending("tv", "week")

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Trending Now</h1>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="tv">TV Shows</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {trendingAll.results.map((item: any) => (
              <MediaCard
                key={`${item.media_type || (item.title ? "movie" : "tv")}-${item.id}`}
                media={{
                  ...item,
                  media_type: item.media_type || (item.title ? "movie" : "tv"),
                }}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="movies">
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
        </TabsContent>

        <TabsContent value="tv">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {trendingTv.results.map((item: any) => (
              <MediaCard
                key={`tv-${item.id}`}
                media={{
                  ...item,
                  media_type: "tv",
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <TrendingStructuredData />
    </div>
  )
}

