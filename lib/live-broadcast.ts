// import data from "@/data.json"

// // News functions
// export function getAllNews() {
//   return data.news
// }

// export function getNewsById(id: string) {
//   return data.news.find((item) => item.id === id)
// }

// // TV Show functions
// export function getAllTvShows() {
//   return data.tvshow
// }

// export function getTvShowById(id: string) {
//   return data.tvshow.find((item) => item.id === id)
// }

// // Sports functions
// export function getAllSportsCategories() {
//   return Object.keys(data.sports)
// }

// export function getSportsByCategory(category: string) {
//   return data.sports[category] || []
// }

// export function getSportsItemById(category: string, id: string) {
//   const categoryItems = data.sports[category] || []
//   return categoryItems.find((item) => item.id === id)
// }

// // Get current GMT time
// export function getCurrentGMTTime() {
//   const now = new Date()
//   return now.toUTCString()
// }

import data from "@/data.json"

// News functions
export function getAllNews() {
  return data.news
}

export function getNewsById(id: string) {
  return data.news.find((item) => item.id === id)
}

// TV Show functions
export function getAllTvShowCategories() {
  return Object.keys(data.tvshow)
}

export function getTvShowsByCategory(category: string) {
  return data.tvshow[category] || []
}

export function getAllTvShows() {
  return Object.values(data.tvshow).flat()
}

export function getTvShowById(id: string) {
  for (const category of Object.keys(data.tvshow)) {
    const show = data.tvshow[category].find((item) => item.id === id)
    if (show) return show
  }
  return null
}

export function getTvShowCategoryById(id: string) {
  for (const category of Object.keys(data.tvshow)) {
    const show = data.tvshow[category].find((item) => item.id === id)
    if (show) return category
  }
  return null
}

// Sports functions
export function getAllSportsCategories() {
  return Object.keys(data.sports)
}

export function getSportsByCategory(category: string) {
  return data.sports[category] || []
}

export function getAllSports() {
  return Object.values(data.sports).flat()
}

export function getSportsItemById(category: string, id: string) {
  const categoryItems = data.sports[category] || []
  return categoryItems.find((item) => item.id === id)
}

// Get current GMT time
export function getCurrentGMTTime() {
  const now = new Date()
  return now.toUTCString()
}

// Get all time zones
export function getAllTimeZones() {
  return [
    { value: "UTC", label: "UTC/GMT" },
    { value: "EST", label: "Eastern Time (EST)" },
    { value: "CST", label: "Central Time (CST)" },
    { value: "MST", label: "Mountain Time (MST)" },
    { value: "PST", label: "Pacific Time (PST)" },
    { value: "IST", label: "India Standard Time (IST)" },
    { value: "JST", label: "Japan Standard Time (JST)" },
    { value: "AEST", label: "Australian Eastern Standard Time (AEST)" },
    { value: "CET", label: "Central European Time (CET)" },
    { value: "EET", label: "Eastern European Time (EET)" },
  ]
}

// Convert time to specific timezone
export function convertToTimeZone(date: Date, timeZone: string): string {
  try {
    return date.toLocaleString("en-US", { timeZone })
  } catch (error) {
    // If timezone is not supported, return UTC time
    return date.toUTCString()
  }
}

