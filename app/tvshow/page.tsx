// import type { Metadata } from "next"
// import { getAllTvShows } from "@/lib/live-broadcast"
// import TvShowCard from "@/components/tvshow-card"
// import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

// export const metadata: Metadata = {
//   title: `Live TV Shows | ${SITE_NAME}`,
//   description: `Watch live TV shows on ${SITE_NAME}.`,
//   openGraph: {
//     title: `Live TV Shows | ${SITE_NAME}`,
//     description: `Watch live TV shows on ${SITE_NAME}.`,
//     url: `${SITE_URL}/tvshow`,
//     siteName: SITE_NAME,
//     type: "website",
//   },
// }

// export default function TvShowPage() {
//   const tvShows = getAllTvShows()

//   return (
//     <div className="container py-6">
//       <h1 className="text-3xl font-bold mb-6">Live TV Shows</h1>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//         {tvShows.map((show) => (
//           <TvShowCard key={show.id} tvshow={show} />
//         ))}
//       </div>
//     </div>
//   )
// }

import type { Metadata } from "next"
import Link from "next/link"
import { getAllTvShowCategories, getTvShowsByCategory } from "@/lib/live-broadcast"
import { getAllNews } from "@/lib/live-broadcast"
import { getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
import TvShowCard from "@/components/tvshow-card"
import NewsSection from "@/components/news-section"
import SportsSection from "@/components/sports-section"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tv } from "lucide-react"
import TvShowStructuredData from "./structured-data"

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
  const categories = getAllTvShowCategories()

  // Get recommended content
  const newsChannels = getAllNews()
  const firstSportsCategory = getAllSportsCategories()[0] || "Soccer"
  const sportsItems = getSportsByCategory(firstSportsCategory)

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Live TV Shows</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Categories sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">TV Show Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link href={`#${category}`} className="flex items-center gap-2 text-sm hover:text-primary">
                      <Tv className="h-4 w-4" />
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* TV Shows content */}
        <div className="space-y-8">
          {categories.map((category) => {
            const tvShows = getTvShowsByCategory(category)
            return (
              <div key={category} id={category}>
                <h2 className="text-2xl font-bold mb-4">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {tvShows.map((item) => (
                    <TvShowCard key={item.id} tvshow={item} category={category} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommended Content
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recommended Live Content</h2>

        <NewsSection title="Live News" news={newsChannels.slice(0, 6)} viewAllHref="/news" />

        <SportsSection
          title={`Live ${firstSportsCategory}`}
          sports={sportsItems.slice(0, 6)}
          category={firstSportsCategory}
          viewAllHref="/sports"
        />
      </div>

      <TvShowStructuredData /> */}
    </div>
  )
}

