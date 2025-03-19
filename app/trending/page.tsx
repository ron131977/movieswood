// import type { Metadata } from "next"
// import { getTrending } from "@/lib/tmdb"
// import MediaCard from "@/components/media-card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import TrendingStructuredData from "./structured-data"

// export const metadata: Metadata = {
//   title: "Trending Movies and TV Shows | MoviesWood",
//   description: "Browse what's trending in movies and TV shows right now on MoviesWood.",
//   openGraph: {
//     title: "Trending Movies and TV Shows | MoviesWood",
//     description: "Browse what's trending in movies and TV shows right now on MoviesWood.",
//     url: "https://movieswood.vercel.app/trending",
//     siteName: "MoviesWood",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Trending Movies and TV Shows | MoviesWood",
//     description: "Browse what's trending in movies and TV shows right now on MoviesWood.",
//   },
//   alternates: {
//     canonical: "https://movieswood.vercel.app/trending",
//   },
// }

// export default async function TrendingPage() {
//   // Fetch trending data
//   const trendingAll = await getTrending("all", "week")
//   const trendingMovies = await getTrending("movie", "week")
//   const trendingTv = await getTrending("tv", "week")

//   return (
//     <div className="container py-6">
//       <h1 className="text-3xl font-bold mb-6">Trending Now</h1>

//       <Tabs defaultValue="all" className="mb-8">
//         <TabsList className="mb-4">
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="movies">Movies</TabsTrigger>
//           <TabsTrigger value="tv">TV Shows</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all">
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//             {trendingAll.results.map((item: any) => (
//               <MediaCard
//                 key={`${item.media_type || (item.title ? "movie" : "tv")}-${item.id}`}
//                 media={{
//                   ...item,
//                   media_type: item.media_type || (item.title ? "movie" : "tv"),
//                 }}
//               />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="movies">
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//             {trendingMovies.results.map((item: any) => (
//               <MediaCard
//                 key={`movie-${item.id}`}
//                 media={{
//                   ...item,
//                   media_type: "movie",
//                 }}
//               />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="tv">
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//             {trendingTv.results.map((item: any) => (
//               <MediaCard
//                 key={`tv-${item.id}`}
//                 media={{
//                   ...item,
//                   media_type: "tv",
//                 }}
//               />
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>

//       <TrendingStructuredData />
//     </div>
//   )
// }

import type { Metadata } from "next"
import { getTrending } from "@/lib/tmdb"
import MediaCard from "@/components/media-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TrendingStructuredData from "./structured-data"

export const metadata: Metadata = {
  title: "Trending Movies and TV Shows | MoviesWood",
  description: "Browse what's trending in movies and TV shows right now on MoviesWood.",
  openGraph: {
    title: "Trending Movies and TV Shows | MoviesWood",
    description: "Browse what's trending in movies and TV shows right now on MoviesWood.",
    url: "https://https://movieswood.vercel.app/trending",
    siteName: "MoviesWood",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending Movies and TV Shows | MoviesWood",
    description: "Browse what's trending in movies and TV shows right now on MoviesWood.",
  },
  alternates: {
    canonical: "https://https://movieswood.vercel.app/trending",
  },
}

// Update the interface to include searchParams
interface TrendingPageProps {
  searchParams: { tab?: string }
}

export default async function TrendingPage({ searchParams }: TrendingPageProps) {
  // Get the tab from URL parameters or default to "all"
  const activeTab = searchParams.tab === "movies" ? "movies" : searchParams.tab === "tv" ? "tv" : "all"

  // Fetch trending data with "day" instead of "week" to get more recent content
  const trendingAll = await getTrending("all", "day")
  const trendingMovies = await getTrending("movie", "day")
  const trendingTv = await getTrending("tv", "day")

  // Sort trending items by release/air date to prioritize 2025 content
  const sortByYear = (items: any[]) => {
    return [...items]
      .map((item) => ({
        ...item,
        year: item.release_date
          ? new Date(item.release_date).getFullYear()
          : item.first_air_date
            ? new Date(item.first_air_date).getFullYear()
            : 0,
      }))
      .sort((a, b) => b.year - a.year) // Sort by year descending
  }

  const sortedTrendingAll = sortByYear(trendingAll.results)
  const sortedTrendingMovies = sortByYear(trendingMovies.results)
  const sortedTrendingTv = sortByYear(trendingTv.results)

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Trending Now</h1>

      <Tabs defaultValue={activeTab} className="mb-8">
        <TabsList className="mb-4 w-full justify-center">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="tv">TV Shows</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {sortedTrendingAll.map((item: any) => (
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
            {sortedTrendingMovies.map((item: any) => (
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
            {sortedTrendingTv.map((item: any) => (
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

