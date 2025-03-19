import type { MetadataRoute } from "next"
import { getTrending, getPopular, SITE_URL } from "@/lib/tmdb"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const routes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/movies`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tv`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/trending`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ]

  // Fetch trending movies and TV shows
  const trendingData = await getTrending("all", "week")
  const popularMoviesData = await getPopular("movie")
  const popularTvData = await getPopular("tv")

  // Add trending items to sitemap
  const trendingRoutes = trendingData.results.map((item: any) => {
    const mediaType = item.media_type || (item.title ? "movie" : "tv")
    return {
      url: `${SITE_URL}/${mediaType}/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }
  })

  // Add popular movies to sitemap
  const movieRoutes = popularMoviesData.results.map((movie: any) => ({
    url: `${SITE_URL}/movie/${movie.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Add popular TV shows to sitemap
  const tvRoutes = popularTvData.results.map((show: any) => ({
    url: `${SITE_URL}/tv/${show.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...routes, ...trendingRoutes, ...movieRoutes, ...tvRoutes]
}

