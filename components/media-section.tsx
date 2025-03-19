import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Media } from "@/lib/tmdb"
import MediaCard from "@/components/media-card"

interface MediaSectionProps {
  title: string
  media: Media[]
  viewAllHref?: string
}

export default function MediaSection({ title, media, viewAllHref }: MediaSectionProps) {
  if (!media || media.length === 0) {
    return null
  }

  return (
    <section className="py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllHref && (
            <Link href={viewAllHref} className="flex items-center text-sm font-medium text-primary">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {media.slice(0, 12).map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

