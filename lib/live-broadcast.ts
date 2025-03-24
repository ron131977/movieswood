import data from "@/data.json"

// News functions
export function getAllNews() {
  return data.news
}

export function getNewsById(id: string) {
  return data.news.find((item) => item.id === id)
}

// TV Show functions
export function getAllTvShows() {
  return data.tvshow
}

export function getTvShowById(id: string) {
  return data.tvshow.find((item) => item.id === id)
}

// Sports functions
export function getAllSportsCategories() {
  return Object.keys(data.sports)
}

export function getSportsByCategory(category: string) {
  return data.sports[category] || []
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

