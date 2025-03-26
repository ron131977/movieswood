// import Link from "next/link"
// import Image from "next/image"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Activity } from "lucide-react"

// interface SportsCardProps {
//   sports: {
//     id: string
//     poster: string
//   }
//   category: string
// }

// export default function SportsCard({ sports, category }: SportsCardProps) {
//   return (
//     <Link href={`/sports/${encodeURIComponent(category)}/${sports.id}`}>
//       <Card className="overflow-hidden media-card h-full">
//         <div className="aspect-[2/3] relative">
//           <Image
//             src={sports.poster || "/placeholder.svg"}
//             alt={sports.id}
//             fill
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             className="object-cover"
//             priority={false}
//             style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//           />
//           <Badge className="absolute top-2 right-2 bg-green-500/80">LIVE</Badge>
//         </div>
//         <CardContent className="p-3">
//           <h3 className="font-semibold line-clamp-1 flex items-center">
//             <Activity className="h-4 w-4 mr-2" />
//             {sports.name}
//           </h3>
//           <p className="text-sm text-muted-foreground">{category}</p>
//         </CardContent>
//       </Card>
//     </Link>
//   )
// }

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

interface SportsCardProps {
  sports: {
    id: string
    poster: string
    php?: string
    m3u8?: string
  }
  category: string
}

export default function SportsCard({ sports, category }: SportsCardProps) {
  return (
    <Link href={`/sports/${encodeURIComponent(category)}/${sports.id}`}>
      <Card className="overflow-hidden media-card h-full">
        <div className="aspect-[2/3] relative">
          <Image
            src={sports.poster || "/placeholder.svg"}
            alt={sports.id}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            quality={90}
            style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
            priority={false}
          />
          <Badge className="absolute top-2 right-2 bg-green-500/80">LIVE</Badge>
          {/* {sports.m3u8 && <Badge className="absolute top-2 left-2 bg-green-500/80">HLS</Badge>} */}
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold line-clamp-1 flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            {sports.name}
          </h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

