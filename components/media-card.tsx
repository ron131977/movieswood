import Link from "next/link"
import Image from "next/image"
import { getImageUrl, type Media } from "@/lib/tmdb"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MediaCardProps {
  media: Media
}

export default function MediaCard({ media }: MediaCardProps) {
  const title = media.title || media.name || "Unknown"
  const releaseDate = media.release_date || media.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null
  const rating = media.vote_average ? Math.round(media.vote_average * 10) / 10 : null

  const href = media.media_type === "movie" ? `/movie/${media.id}` : `/tv/${media.id}`

  return (
    <Link href={href}>
      <Card className="overflow-hidden media-card h-full">
        <div className="aspect-[2/3] relative">
          <Image
            src={getImageUrl(media.poster_path, "w500") || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false}
            style={{ filter: "contrast(1.4) saturate(1.4) brightness(1.05) hue-rotate(10deg)" }}
          />
          {rating && <Badge className="absolute top-2 right-2 bg-primary/80">★ {rating}</Badge>}
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{year || "Unknown year"}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

