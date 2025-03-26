// This file contains utilities for CDN configuration and optimization

// CDN configuration for different types of content
export const cdnConfig = {
  // Image CDN configuration
  images: {
    domains: ["image.tmdb.org"],
    sizes: [300, 500, 780, 1280, "original"],
    defaultSize: "w500",
    baseUrl: "https://image.tmdb.org/t/p/",
    cacheTtl: 60 * 60 * 24 * 30, // 30 days
  },

  // API CDN configuration
  api: {
    baseUrl: "https://api.themoviedb.org/3",
    cacheTtl: {
      trending: 60 * 60, // 1 hour
      popular: 60 * 60 * 6, // 6 hours
      details: 60 * 60 * 24 * 7, // 7 days
      search: 0, // No caching for search
    },
  },

  // Static assets CDN configuration
  static: {
    cacheTtl: 60 * 60 * 24 * 365, // 1 year
    immutable: true,
  },
}

// Function to get optimized image URL from TMDB
export function getOptimizedImageUrl(path: string | null, size: string = cdnConfig.images.defaultSize) {
  if (!path) return "/placeholder.svg"

  // Validate size
  const validSizes = [...cdnConfig.images.sizes.map((s) => (typeof s === "number" ? `w${s}` : s))]
  const finalSize = validSizes.includes(size) ? size : cdnConfig.images.defaultSize

  return `${cdnConfig.images.baseUrl}${finalSize}${path}`
}

// Function to generate CDN cache control headers
export function getCacheControlHeaders(type: "image" | "api" | "static", subtype?: string) {
  let maxAge = 0
  let immutable = false

  if (type === "image") {
    maxAge = cdnConfig.images.cacheTtl
  } else if (type === "api" && subtype) {
    maxAge = cdnConfig.api.cacheTtl[subtype as keyof typeof cdnConfig.api.cacheTtl] || 0
  } else if (type === "static") {
    maxAge = cdnConfig.static.cacheTtl
    immutable = cdnConfig.static.immutable
  }

  if (maxAge === 0) {
    return "no-store, no-cache, must-revalidate, proxy-revalidate"
  }

  return `public, max-age=${maxAge}${immutable ? ", immutable" : ""}`
}

