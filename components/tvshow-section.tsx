import Link from "next/link"
import { ChevronRight } from "lucide-react"
import TvShowCard from "@/components/tvshow-card"

interface TvShowSectionProps {
  title: string
  tvshows: any[]
  viewAllHref?: string
}

export default function TvShowSection({ title, tvshows, viewAllHref }: TvShowSectionProps) {
  if (!tvshows || tvshows.length === 0) {
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
          {tvshows.slice(0, 12).map((item) => (
            <TvShowCard key={item.id} tvshow={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

