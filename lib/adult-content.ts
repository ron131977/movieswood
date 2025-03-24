import data from "@/data.json"

// Get all adult content
export function getAllAdultContent() {
  return data.adult
}

// Get adult content by ID
export function getAdultContentById(id: string) {
  return data.adult.find((item) => item.id === id)
}

// Get adult content by slug
export function getAdultContentBySlug(slug: string) {
  return data.adult.find((item) => item.slug === slug)
}

// Format duration from seconds to human-readable format
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Format view count with commas
export function formatViews(views: number): string {
  return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

