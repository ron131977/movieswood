import type { Metadata } from "next"
import { getTrending, getPopular, type Media } from "@/lib/tmdb"
import MediaSection from "@/components/media-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import HomeStructuredData from "./structured-data"

export const metadata: Metadata = {
  title: "MovieWoods - Stream Movies and TV Shows",
  description:
    "Stream your favorite movies and TV shows on MovieWoods. Search for content and enjoy high-quality streaming.",
  keywords: ["movies", "tv shows", "streaming", "watch online", "film", "series"],
  openGraph: {
    title: "MovieWoods - Stream Movies and TV Shows",
    description:
      "Stream your favorite movies and TV shows on MovieWoods. Search for content and enjoy high-quality streaming.",
    url: "https://moviewoods.vercel.app",
    siteName: "MovieWoods",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MovieWoods - Stream Movies and TV Shows",
    description:
      "Stream your favorite movies and TV shows on MovieWoods. Search for content and enjoy high-quality streaming.",
  },
  alternates: {
    canonical: "https://moviewoods.vercel.app",
  },
}

export default async function Home() {
  const trendingData = await getTrending("all", "week")
  const popularMoviesData = await getPopular("movie")
  const popularTvData = await getPopular("tv")

  const trending = trendingData.results as Media[]
  const popularMovies = popularMoviesData.results as Media[]
  const popularTv = popularTvData.results as Media[]

  // Get a featured item from trending
  const featuredItem = trending[0]
  const featuredTitle = featuredItem.title || featuredItem.name || "Featured Content"
  const featuredOverview = featuredItem.overview || "No overview available"
  const featuredBackdrop = featuredItem.backdrop_path
  const featuredType = featuredItem.media_type
  const featuredId = featuredItem.id

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[70vh] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${featuredBackdrop}`}
            alt={featuredTitle}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{featuredTitle}</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 line-clamp-3 md:line-clamp-4">
                {featuredOverview}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href={`/${featuredType}/${featuredId}`}>Watch Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={`/${featuredType}/${featuredId}`}>More Info</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <MediaSection title="Trending Now" media={trending} viewAllHref="/trending" />

      <MediaSection title="Coming Up Movies" media={popularMovies} viewAllHref="/movies" />

      <MediaSection title="Popular TV Shows" media={popularTv} viewAllHref="/tv" />
      <HomeStructuredData />
    </div>
  )
}

