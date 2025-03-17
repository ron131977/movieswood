import type { MetadataRoute } from "next"
import { getTrending, getPopular, getImageUrl } from "@/lib/tmdb"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://moviewoods.vercel.app"

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tv`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
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
    const mediaType = item.media_type
    return {
      url: `${baseUrl}/${mediaType}/${item.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      // Add image information for better SEO
      images: item.poster_path
        ? [
            {
              url: getImageUrl(item.poster_path, "w500"),
              title: item.title || item.name || "Trending content",
              caption: item.overview?.substring(0, 100) || "Trending content on MovieWoods",
            },
            item.backdrop_path
              ? {
                  url: getImageUrl(item.backdrop_path, "original"),
                  title: `${item.title || item.name} backdrop`,
                  caption: `Backdrop image for ${item.title || item.name}`,
                }
              : null,
          ].filter(Boolean)
        : undefined,
    }
  })

  // Add popular movies to sitemap
  const movieRoutes = popularMoviesData.results.map((movie: any) => ({
    url: `${baseUrl}/movie/${movie.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
    // Add image information for better SEO
    images: movie.poster_path
      ? [
          {
            url: getImageUrl(movie.poster_path, "w500"),
            title: movie.title || "Movie",
            caption: movie.overview?.substring(0, 100) || "Popular movie on MovieWoods",
          },
          movie.backdrop_path
            ? {
                url: getImageUrl(movie.backdrop_path, "original"),
                title: `${movie.title} backdrop`,
                caption: `Backdrop image for ${movie.title}`,
              }
            : null,
        ].filter(Boolean)
      : undefined,
  }))

  // Add popular TV shows to sitemap
  const tvRoutes = popularTvData.results.map((show: any) => ({
    url: `${baseUrl}/tv/${show.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
    // Add image information for better SEO
    images: show.poster_path
      ? [
          {
            url: getImageUrl(show.poster_path, "w500"),
            title: show.name || "TV Show",
            caption: show.overview?.substring(0, 100) || "Popular TV show on MovieWoods",
          },
          show.backdrop_path
            ? {
                url: getImageUrl(show.backdrop_path, "original"),
                title: `${show.name} backdrop`,
                caption: `Backdrop image for ${show.name}`,
              }
            : null,
        ].filter(Boolean)
      : undefined,
  }))

  return [...routes, ...trendingRoutes, ...movieRoutes, ...tvRoutes]
}

