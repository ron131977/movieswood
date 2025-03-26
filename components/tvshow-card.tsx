// import Link from "next/link"
// import Image from "next/image"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tv } from "lucide-react"

// interface TvShowCardProps {
//   tvshow: {
//     id: string
//     poster: string
//   }
// }

// export default function TvShowCard({ tvshow }: TvShowCardProps) {
//   return (
//     <Link href={`/tvshow/${tvshow.id}`}>
//       <Card className="overflow-hidden media-card h-full">
//         <div className="aspect-[2/3] relative">
//           <Image
//             src={tvshow.poster || "/placeholder.svg"}
//             alt={tvshow.id}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className="object-cover"
//             priority={false}
//             style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//           />
//           <Badge className="absolute top-2 right-2 bg-blue-500/80">LIVE</Badge>
//         </div>
//         <CardContent className="p-3">
//           <h3 className="font-semibold line-clamp-1 flex items-center">
//             <Tv className="h-4 w-4 mr-2" />
//             {tvshow.name}
//           </h3>
//           <p className="text-sm text-muted-foreground">TV Channel</p>
//         </CardContent>
//       </Card>
//     </Link>
//   )
// }

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tv } from "lucide-react"

interface TvShowCardProps {
  tvshow: {
    id: string
    poster: string
    m3u8?: string
    php?: string
  }
  category?: string
}

export default function TvShowCard({ tvshow, category }: TvShowCardProps) {
  return (
    <Link href={`/tvshow/${category ? encodeURIComponent(category) + "/" : ""}${tvshow.id}`}>
      <Card className="overflow-hidden media-card h-full">
        <div className="aspect-[2/3] relative">
          <Image
            src={tvshow.poster || "/placeholder.svg"}
            alt={tvshow.id}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            quality={90}
            style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
            priority={false}
          />
          <Badge className="absolute top-2 right-2 bg-blue-500/80">WATCH</Badge>
          {/* {tvshow.m3u8 && <Badge className="absolute top-2 left-2 bg-green-500/80">HLS</Badge>} */}
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold line-clamp-1 flex items-center">
            <Tv className="h-4 w-4 mr-2" />
            {tvshow.name}
          </h3>
          <p className="text-sm text-muted-foreground">{category || "TV Channel"}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

