// import type { Metadata } from "next"
// import { getTrending, getPopular, type Media, SITE_NAME, SITE_URL } from "@/lib/tmdb"
// import MediaSection from "@/components/media-section"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import Image from "next/image"
// import Search from "@/components/header1"
// import HomeStructuredData from "./structured-data"

// export const metadata: Metadata = {
//   title: `${SITE_NAME} - Stream Movies and TV Shows`,
//   description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
//   keywords: ["movies", "tv shows", "streaming", "watch online", "film", "series"],
//   openGraph: {
//     title: `${SITE_NAME} - Stream Movies and TV Shows`,
//     description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
//     url: SITE_URL,
//     siteName: SITE_NAME,
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: `${SITE_NAME} - Stream Movies and TV Shows`,
//     description: `Stream your favorite movies and TV shows on ${SITE_NAME}. Search for content and enjoy high-quality streaming.`,
//   },
//   alternates: {
//     canonical: SITE_URL,
//   },
// }

// export default async function Home() {
//   const trendingData = await getTrending("all", "week")
//   const popularMoviesData = await getPopular("movie")
//   const popularTvData = await getPopular("tv")

//   const trending = trendingData.results as Media[]
//   const popularMovies = popularMoviesData.results as Media[]
//   const popularTv = popularTvData.results as Media[]

//   // Make sure all media items have the correct media_type
//   const trendingWithType = trending.map((item) => ({
//     ...item,
//     media_type: item.media_type || (item.title ? "movie" : "tv"),
//   }))

//   const moviesWithType = popularMovies.map((item) => ({
//     ...item,
//     media_type: "movie",
//   }))

//   const tvWithType = popularTv.map((item) => ({
//     ...item,
//     media_type: "tv",
//   }))

//   // Get a featured item from trending
//   const featuredItem = trendingWithType[0]
//   const featuredTitle = featuredItem.title || featuredItem.name || "Featured Content"
//   const featuredOverview = featuredItem.overview || "No overview available"
//   const featuredBackdrop = featuredItem.backdrop_path
//   const featuredType = featuredItem.media_type
//   const featuredId = featuredItem.id

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
//       setSearchQuery("")
//       setIsMenuOpen(false)
//     }
//   }

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="relative">
//         <div className="relative h-[70vh] w-full">
//           <Image
//             src={`https://image.tmdb.org/t/p/original${featuredBackdrop}`}
//             alt={featuredTitle}
//             fill
//             priority
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />
//           <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
//             <div className="container mx-auto max-w-4xl">
//               <h1 className="text-3xl md:text-5xl font-bold mb-2">{featuredTitle}</h1>
//               <p className="text-lg md:text-xl text-muted-foreground mb-6 line-clamp-3 md:line-clamp-4">
//                 {featuredOverview}
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <Button asChild size="lg">
//                   <Link href={`/${featuredType}/${featuredId}`}>Watch Now</Link>
//                 </Button>
//                 <Button variant="outline" size="lg" asChild>
//                   <Link href={`/${featuredType}/${featuredId}`}>More Info</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div className="flex justify-center items-center">
//         <Search />
//       </div>
//       {/* Content Sections */}
//       <MediaSection title="Trending Now" media={trendingWithType} viewAllHref="/trending" />

//       <MediaSection title="Popular Movies" media={moviesWithType} viewAllHref="/movies" />

//       <MediaSection title="Popular TV Shows" media={tvWithType} viewAllHref="/tv" />
//       <HomeStructuredData />
//     </div>
//   )
// }

import type { Metadata } from "next"
import { getTrending, getPopular, type Media, SITE_NAME, SITE_URL } from "@/lib/tmdb"
import MediaSection from "@/components/media-section"
import { Button } from "@/components/ui/button"
import Search from "@/components/header1"
import Link from "next/link"
import Image from "next/image"
import HomeStructuredData from "./structured-data"

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
  // Update the getTrending and getPopular calls to include a time parameter
  const trendingData = await getTrending("all", "day") // Changed from "week" to "day" for more recent content
  const popularMoviesData = await getPopular("movie")
  const popularTvData = await getPopular("tv")

  const trending = trendingData.results as Media[]
  const popularMovies = popularMoviesData.results as Media[]
  const popularTv = popularTvData.results as Media[]

  // Add a filter to ensure we're showing 2025 content where possible
  const currentYear = new Date().getFullYear()

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

  // Filter movies to prioritize 2025 content
  const moviesWithType = popularMovies
    .map((item) => ({
      ...item,
      media_type: "movie",
      year: item.release_date ? new Date(item.release_date).getFullYear() : 0,
    }))
    .sort((a, b) => b.year - a.year) // Sort by year descending

  // Filter TV shows to prioritize 2025 content
  const tvWithType = popularTv
    .map((item) => ({
      ...item,
      media_type: "tv",
      year: item.first_air_date ? new Date(item.first_air_date).getFullYear() : 0,
    }))
    .sort((a, b) => b.year - a.year) // Sort by year descending

  // Get a featured item from trending
  const featuredItem = trendingWithType[0]
  const featuredTitle = featuredItem.title || featuredItem.name || "Featured Content"
  const featuredOverview = featuredItem.overview || "No overview available"
  const featuredBackdrop = featuredItem.backdrop_path
  const featuredType = featuredItem.media_type
  const featuredId = featuredItem.id

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

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
      <div className="flex justify-center items-center" >
        <Search />
      </div>
      {/* Content Sections */}
      <MediaSection title="Trending Now" media={trendingWithType} viewAllHref="/trending" />

      <MediaSection title="Popular Movies" media={moviesWithType} viewAllHref="/movies" />

      <MediaSection title="Popular TV Shows" media={tvWithType} viewAllHref="/tv" />
      <HomeStructuredData />
    </div>
  )
}

