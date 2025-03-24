import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tv } from "lucide-react"

interface NewsCardProps {
  news: {
    id: string
    poster: string
  }
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.id}`}>
      <Card className="overflow-hidden media-card h-full">
        <div className="aspect-[2/3] relative">
          <Image
            src={news.poster || "/placeholder.svg"}
            alt={news.id}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false}
            style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
          />
          <Badge className="absolute top-2 right-2 bg-red-500/80">LIVE</Badge>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold line-clamp-1 flex items-center">
            <Tv className="h-4 w-4 mr-2" />
            {news.id.toUpperCase()}
          </h3>
          <p className="text-sm text-muted-foreground">News Channel</p>
        </CardContent>
      </Card>
    </Link>
  )
}

