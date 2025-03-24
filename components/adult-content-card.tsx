import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDuration, formatViews } from "@/lib/adult-content"
import { Clock, Eye } from "lucide-react"

interface AdultContentCardProps {
  content: {
    id: string
    slug: string
    title: string
    thumbnailUrl: string
    duration: number
    views: number
    releaseDate: string
  }
}

export default function AdultContentCard({ content }: AdultContentCardProps) {
  return (
    <Link href={`/adult/${content.slug}`}>
      <Card className="overflow-hidden media-card h-full">
        <div className="aspect-[2/3] relative">
          <Image
            src={content.thumbnailUrl || "/placeholder.svg"}
            alt={content.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false}
            style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
          />
          <Badge className="absolute top-2 right-2 bg-red-500/80">Adult</Badge>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold line-clamp-1">{content.title}</h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDuration(content.duration)}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              <span>{formatViews(content.views)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

