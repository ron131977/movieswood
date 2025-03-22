// import { getTrending, getPopular, getImageUrl } from "@/lib/tmdb"

// export async function GET() {
//   const baseUrl = "https://movieswood.vercel.app"

//   // Fetch data
//   const trendingData = await getTrending("all", "week")
//   const popularMoviesData = await getPopular("movie")
//   const popularTvData = await getPopular("tv")

//   // Create XML content
//   let xml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//   xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
//   xmlns:xhtml="http://www.w3.org/1999/xhtml"
//   xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
//   xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
//   xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`

//   // Add static routes
//   const staticRoutes = [
//     { path: "", priority: "1.0" },
//     { path: "/movies", priority: "0.8" },
//     { path: "/tv", priority: "0.8" },
//     { path: "/trending", priority: "0.9" },
//     { path: "/search", priority: "0.5" },
//   ]

//   staticRoutes.forEach((route) => {
//     xml += `  <url>
//     <loc>${baseUrl}${route.path}</loc>
//     <lastmod>${new Date().toISOString()}</lastmod>
//     <changefreq>daily</changefreq>
//     <priority>${route.priority}</priority>
//   </url>\n`
//   })

//   // Add trending items
//   trendingData.results.forEach((item: any) => {
//     const mediaType = item.media_type
//     const title = item.title || item.name || "Trending content"

//     xml += `  <url>
//     <loc>${baseUrl}/${mediaType}/${item.id}</loc>
//     <lastmod>${new Date().toISOString()}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>0.7</priority>\n`

//     if (item.poster_path) {
//       xml += `    <image:image>
//       <image:loc>${getImageUrl(item.poster_path, "w500")}</image:loc>
//       <image:title>${escapeXml(title)}</image:title>
//       <image:caption>${escapeXml(item.overview?.substring(0, 100) || "Trending content on MovieFlix")}</image:caption>
//     </image:image>\n`
//     }

//     if (item.backdrop_path) {
//       xml += `    <image:image>
//       <image:loc>${getImageUrl(item.backdrop_path, "original")}</image:loc>
//       <image:title>${escapeXml(title)} backdrop</image:title>
//       <image:caption>Backdrop image for ${escapeXml(title)}</image:caption>
//     </image:image>\n`
//     }

//     if (mediaType === "movie") {
//       xml += `    <video:video>
//       <video:thumbnail_loc>${getImageUrl(item.poster_path || item.backdrop_path, "w500")}</video:thumbnail_loc>
//       <video:title>${escapeXml(title)}</video:title>
//       <video:description>${escapeXml(item.overview || "Watch this movie on MovieFlix")}</video:description>
//       <video:content_loc>${baseUrl}/movie/${item.id}</video:content_loc>
//       <video:player_loc>${baseUrl}/movie/${item.id}</video:player_loc>
//       <video:duration>${item.runtime || 7200}</video:duration>
//       <video:publication_date>${item.release_date || new Date().toISOString()}</video:publication_date>
//       <video:family_friendly>yes</video:family_friendly>
//       <video:live>no</video:live>
//     </video:video>\n`
//     }

//     xml += `  </url>\n`
//   })

//   // Add popular movies
//   popularMoviesData.results.forEach((movie: any) => {
//     xml += `  <url>
//     <loc>${baseUrl}/movie/${movie.id}</loc>
//     <lastmod>${new Date().toISOString()}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>0.6</priority>\n`

//     if (movie.poster_path) {
//       xml += `    <image:image>
//       <image:loc>${getImageUrl(movie.poster_path, "w500")}</image:loc>
//       <image:title>${escapeXml(movie.title || "Movie")}</image:title>
//       <image:caption>${escapeXml(movie.overview?.substring(0, 100) || "Popular movie on MovieFlix")}</image:caption>
//     </image:image>\n`
//     }

//     if (movie.backdrop_path) {
//       xml += `    <image:image>
//       <image:loc>${getImageUrl(movie.backdrop_path, "original")}</image:loc>
//       <image:title>${escapeXml(movie.title || "Movie")} backdrop</image:title>
//       <image:caption>Backdrop image for ${escapeXml(movie.title || "Movie")}</image:caption>
//     </image:image>\n`
//     }

//     xml += `    <video:video>
//       <video:thumbnail_loc>${getImageUrl(movie.poster_path || movie.backdrop_path, "w500")}</video:thumbnail_loc>
//       <video:title>${escapeXml(movie.title || "Movie")}</video:title>
//       <video:description>${escapeXml(movie.overview || "Watch this movie on MovieFlix")}</video:description>
//       <video:content_loc>${baseUrl}/movie/${movie.id}</video:content_loc>
//       <video:player_loc>${baseUrl}/movie/${movie.id}</video:player_loc>
//       <video:duration>${movie.runtime || 7200}</video:duration>
//       <video:publication_date>${movie.release_date || new Date().toISOString()}</video:publication_date>
//       <video:family_friendly>yes</video:family_friendly>
//       <video:live>no</video:live>
//     </video:video>\n`

//     xml += `  </url>\n`
//   })

//   // Add popular TV shows
//   popularTvData.results.forEach((show: any) => {
//     xml += `  <url>
//     <loc>${baseUrl}/tv/${show.id}</loc>
//     <lastmod>${new Date().toISOString()}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>0.6</priority>\n`

//     if (show.poster_path) {
//       xml += `    <image:image>
//       <image:loc>${getImageUrl(show.poster_path, "w500")}</image:loc>
//       <image:title>${escapeXml(show.name || "TV Show")}</image:title>
//       <image:caption>${escapeXml(show.overview?.substring(0, 100) || "Popular TV show on MovieFlix")}</image:caption>
//     </image:image>\n`
//     }

//     if (show.backdrop_path) {
//       xml += `    <image:image>
//       <image:loc>${getImageUrl(show.backdrop_path, "original")}</image:loc>
//       <image:title>${escapeXml(show.name || "TV Show")} backdrop</image:title>
//       <image:caption>Backdrop image for ${escapeXml(show.name || "TV Show")}</image:caption>
//     </image:image>\n`
//     }

//     xml += `    <video:video>
//       <video:thumbnail_loc>${getImageUrl(show.poster_path || show.backdrop_path, "w500")}</video:thumbnail_loc>
//       <video:title>${escapeXml(show.name || "TV Show")}</video:title>
//       <video:description>${escapeXml(show.overview || "Watch this TV show on MovieFlix")}</video:description>
//       <video:content_loc>${baseUrl}/tv/${show.id}</video:content_loc>
//       <video:player_loc>${baseUrl}/tv/${show.id}</video:player_loc>
//       <video:publication_date>${show.first_air_date || new Date().toISOString()}</video:publication_date>
//       <video:family_friendly>yes</video:family_friendly>
//       <video:live>no</video:live>
//     </video:video>\n`

//     xml += `  </url>\n`
//   })

//   xml += `</urlset>`

//   return new Response(xml, {
//     headers: {
//       "Content-Type": "application/xml",
//     },
//   })
// }

// // Helper function to escape XML special characters
// function escapeXml(unsafe: string): string {
//   if (!unsafe) return ""
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&apos;")
// }

import { getTrending, getPopular, getImageUrl, SITE_URL } from "@/lib/tmdb"
import data from "@/data.json"
import fs from "fs"
import path from "path"

export async function GET() {
  const baseUrl = SITE_URL

  // Fetch data from TMDB API
  const trendingData = await getTrending("all", "week")
  const popularMoviesData = await getPopular("movie")
  const popularTvData = await getPopular("tv")

  // Get data from data.json
  const movieIds = data.movie.map((movie) => movie.id)
  const tvIds = data.tv.map((tv) => tv.id)
  const adultSlugs = data.adult.map((adult) => adult.slug)

  // Create XML content
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`

  // Add static routes
  const staticRoutes = [
    { path: "", priority: "1.0" },
    { path: "/movies", priority: "0.8" },
    { path: "/tv", priority: "0.8" },
    { path: "/adult", priority: "0.8" },
    { path: "/trending", priority: "0.9" },
    { path: "/search", priority: "0.5" },
  ]

  staticRoutes.forEach((route) => {
    xml += `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route.priority}</priority>
  </url>\n`
  })

  // Add trending items
  trendingData.results.forEach((item: any) => {
    const mediaType = item.media_type
    const title = item.title || item.name || "Trending content"

    xml += `  <url>
    <loc>${baseUrl}/${mediaType}/${item.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>\n`

    if (item.poster_path) {
      xml += `    <image:image>
      <image:loc>${getImageUrl(item.poster_path, "w500")}</image:loc>
      <image:title>${escapeXml(title)}</image:title>
      <image:caption>${escapeXml(item.overview?.substring(0, 100) || "Trending content on MovieFlix")}</image:caption>
    </image:image>\n`
    }

    if (item.backdrop_path) {
      xml += `    <image:image>
      <image:loc>${getImageUrl(item.backdrop_path, "original")}</image:loc>
      <image:title>${escapeXml(title)} backdrop</image:title>
      <image:caption>Backdrop image for ${escapeXml(title)}</image:caption>
    </image:image>\n`
    }

    if (mediaType === "movie") {
      xml += `    <video:video>
      <video:thumbnail_loc>${getImageUrl(item.poster_path || item.backdrop_path, "w500")}</video:thumbnail_loc>
      <video:title>${escapeXml(title)}</video:title>
      <video:description>${escapeXml(item.overview || "Watch this movie on MovieFlix")}</video:description>
      <video:content_loc>${baseUrl}/movie/${item.id}</video:content_loc>
      <video:player_loc>${baseUrl}/movie/${item.id}</video:player_loc>
      <video:duration>${item.runtime || 7200}</video:duration>
      <video:publication_date>${item.release_date || new Date().toISOString()}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>\n`
    }

    xml += `  </url>\n`
  })

  // Add movies from data.json
  movieIds.forEach((id) => {
    xml += `  <url>
    <loc>${baseUrl}/movie/${id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`
  })

  // Add TV shows from data.json
  tvIds.forEach((id) => {
    xml += `  <url>
    <loc>${baseUrl}/tv/${id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`
  })

  // Add adult content from data.json
  adultSlugs.forEach((slug) => {
    xml += `  <url>
    <loc>${baseUrl}/adult/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>\n`
  })

  xml += `</urlset>`

  // Save a copy to public folder
  try {
    // This will only work in production, not in development
    const publicDir = path.join(process.cwd(), "public")
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml)
  } catch (error) {
    console.error("Error writing sitemap to public folder:", error)
  }

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  if (!unsafe) return ""
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

