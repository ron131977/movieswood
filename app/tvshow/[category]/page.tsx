import type { Metadata } from "next"
import Link from "next/link"
import { getTvShowsByCategory, getAllTvShowCategories } from "@/lib/live-broadcast"
import TvShowCard from "@/components/tvshow-card"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"
import TvShowCategoryStructuredData from "./structured-data"

interface TvShowCategoryPageProps {
  params: { category: string }
}

export async function generateMetadata({ params }: TvShowCategoryPageProps): Promise<Metadata> {
  const decodedCategory = decodeURIComponent(params.category)

  return {
    title: `${decodedCategory} TV Shows | ${SITE_NAME}`,
    description: `Watch ${decodedCategory} TV shows live on ${SITE_NAME}.`,
    openGraph: {
      title: `${decodedCategory} TV Shows | ${SITE_NAME}`,
      description: `Watch ${decodedCategory} TV shows live on ${SITE_NAME}.`,
      url: `${SITE_URL}/tvshow/${encodeURIComponent(params.category)}`,
      siteName: SITE_NAME,
      type: "website",
    },
  }
}

export default function TvShowCategoryPage({ params }: TvShowCategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category)
  const tvShows = getTvShowsByCategory(decodedCategory)
  const categories = getAllTvShowCategories()

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link href="/tvshow" className="text-primary hover:underline">
          ← Back to All TV Shows
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">{decodedCategory} TV Shows</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
        {tvShows.map((show) => (
          <TvShowCard key={show.id} tvshow={show} category={decodedCategory} />
        ))}
      </div>

      {/* Other Categories */}
      <h2 className="text-2xl font-bold mb-4">Other Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories
          .filter((cat) => cat !== decodedCategory)
          .map((category) => (
            <Link key={category} href={`/tvshow/${encodeURIComponent(category)}`} className="block">
              <div className="bg-card hover:bg-card/80 transition-colors rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold">{category}</h3>
                <p className="text-sm text-muted-foreground mt-2">{getTvShowsByCategory(category).length} channels</p>
              </div>
            </Link>
          ))}
      </div>

      <TvShowCategoryStructuredData category={decodedCategory} />
    </div>
  )
}

