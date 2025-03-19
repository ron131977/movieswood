// This file contains utilities for load balancing and high traffic handling

// Define regions for load balancing
export const regions = [
  { name: "iad1", location: "US East (N. Virginia)", weight: 30 },
  { name: "sfo1", location: "US West (San Francisco)", weight: 25 },
  { name: "hnd1", location: "Asia Pacific (Tokyo)", weight: 20 },
  { name: "cdg1", location: "Europe (Paris)", weight: 25 },
]

// Function to determine the best region based on user location
export function getBestRegion(userCountry?: string) {
  if (!userCountry) return regions[0].name

  // Map countries to closest regions
  const regionMap: Record<string, string> = {
    // North America
    US: "iad1",
    CA: "iad1",
    MX: "iad1",

    // South America
    BR: "iad1",
    AR: "iad1",

    // Europe
    GB: "cdg1",
    DE: "cdg1",
    FR: "cdg1",
    IT: "cdg1",
    ES: "cdg1",

    // Asia
    JP: "hnd1",
    KR: "hnd1",
    CN: "hnd1",
    IN: "hnd1",

    // Oceania
    AU: "sfo1",
    NZ: "sfo1",
  }

  return regionMap[userCountry] || regions[0].name
}

// Function to implement load shedding during high traffic
export function shouldShedLoad(currentLoad: number, threshold = 0.8) {
  return currentLoad > threshold
}

// Function to implement graceful degradation during high traffic
export function getGracefulDegradationStrategy(currentLoad: number) {
  // Normal load
  if (currentLoad < 0.7) {
    return {
      enableRecommendations: true,
      enableTrending: true,
      enableSearch: true,
      enableDetailedInfo: true,
      cacheLifetime: 60 * 60, // 1 hour
    }
  }

  // Medium load
  if (currentLoad < 0.85) {
    return {
      enableRecommendations: true,
      enableTrending: true,
      enableSearch: true,
      enableDetailedInfo: true,
      cacheLifetime: 60 * 30, // 30 minutes
    }
  }

  // High load
  if (currentLoad < 0.95) {
    return {
      enableRecommendations: false,
      enableTrending: true,
      enableSearch: true,
      enableDetailedInfo: true,
      cacheLifetime: 60 * 15, // 15 minutes
    }
  }

  // Extreme load
  return {
    enableRecommendations: false,
    enableTrending: false,
    enableSearch: false,
    enableDetailedInfo: false,
    cacheLifetime: 60 * 5, // 5 minutes
  }
}

