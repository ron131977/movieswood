import type { Metadata } from "next"
import { getTrending, type Media, SITE_NAME, SITE_URL } from "@/lib/tmdb"
import { getJsonMovies, getJsonTvShows } from "@/lib/json-data"
import { getAllAdultContent } from "@/lib/adult-content"
import MediaSection from "@/components/media-section"
import AdultContentSection from "@/components/adult-content-section"
import { Button } from "@/components/ui/button"
import Search from "@/components/header1"
import Link from "next/link"
import Image from "next/image"
import HomeStructuredData from "./structured-data"

// Add the imports for the new sections:
import { getAllNews } from "@/lib/live-broadcast"
import { getAllTvShows } from "@/lib/live-broadcast"
import { getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
import NewsSection from "@/components/news-section"
import TvShowSection from "@/components/tvshow-section"
import SportsSection from "@/components/sports-section"

export const metadata: Metadata = {
  title: `${SITE_NAME} - Stream Movies and TV Shows`,
  description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
  keywords: ["movies", "tv shows", "streaming", "watch online", "film", "series"],
  openGraph: {
    title: `${SITE_NAME} - Stream Movies and TV Shows`,
    description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Stream Movies and TV Shows`,
    description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default async function Home() {
  // Fetch trending content from TMDB
  const trendingData = await getTrending("all", "day")
  const trending = trendingData.results as Media[]

  // Fetch movies and TV shows from our JSON file
  const jsonMovies = await getJsonMovies()
  const jsonTvShows = await getJsonTvShows()

  // Get adult content from our JSON file
  const adultContent = getAllAdultContent()

  // Get news from our JSON file
  const newsChannels = getAllNews()

  // Get TV shows from our JSON file
  const tvShows = getAllTvShows()

  // Get sports from our JSON file - just use the first category for the homepage
  const sportsCategories = getAllSportsCategories()
  const firstSportsCategory = sportsCategories[0] || "Soccer"
  const sportsItems = getSportsByCategory(firstSportsCategory)

  // Filter trending items to prioritize 2025 content
  const trendingWithType = trending
    .map((item) => ({
      ...item,
      media_type: item.media_type || (item.title ? "movie" : "tv"),
      year: item.release_date
        ? new Date(item.release_date).getFullYear()
        : item.first_air_date
          ? new Date(item.first_air_date).getFullYear()
          : 0,
    }))
    .sort((a, b) => b.year - a.year) // Sort by year descending

  // Get a featured item from trending
  const featuredItem = trendingWithType[0]
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
      <div className="flex justify-center items-center">
         <Search />
      </div>
      {/* Content Sections */}
      <MediaSection title="Trending Now" media={trendingWithType} viewAllHref="/trending" />

      <MediaSection title="Popular Movies" media={jsonMovies} viewAllHref="/movies" />

      <MediaSection title="Popular TV Shows" media={jsonTvShows} viewAllHref="/tv" />

      <AdultContentSection title="Popular Adult Content" content={adultContent} viewAllHref="/adult" />

      <NewsSection title="Live News Channels" news={newsChannels} viewAllHref="/news" />

      <TvShowSection title="Live TV Shows" tvshows={tvShows} viewAllHref="/tvshow" />

      <SportsSection
        title={`Live ${firstSportsCategory}`}
        sports={sportsItems}
        category={firstSportsCategory}
        viewAllHref="/sports"
      />

      <HomeStructuredData />
    </div>
  )
}

