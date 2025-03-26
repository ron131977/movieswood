// import { CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Card } from "@/components/ui/card"
// import type { Metadata } from "next"
// import { notFound } from "next/navigation"
// import Link from "next/link"
// import { getTvShowsByCategory, getAllTvShowCategories } from "@/lib/live-broadcast"
// import { getAllNews } from "@/lib/live-broadcast"
// import { getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
// import UniversalPlayer from "@/components/universal-player"
// import TvShowCard from "@/components/tvshow-card"
// import SocialShare from "@/components/social-share"
// import { SITE_NAME, SITE_URL } from "@/lib/tmdb"
// import TvShowDetailStructuredData from "./structured-data"

// interface TvShowDetailPageProps {
//   params: { category: string; id: string }
// }

// export async function generateMetadata({ params }: TvShowDetailPageProps): Promise<Metadata> {
//   const { category, id } = params
//   const decodedCategory = decodeURIComponent(category)
//   const tvShows = getTvShowsByCategory(decodedCategory)
//   const tvShow = tvShows.find((item) => item.id === id)

//   if (!tvShow) {
//     return {
//       title: `Channel Not Found | ${SITE_NAME}`,
//       description: "The requested TV channel could not be found.",
//     }
//   }

//   return {
//     title: `${id} - ${decodedCategory} Live | ${SITE_NAME}`,
//     description: `Watch ${id} from ${decodedCategory} category live on ${SITE_NAME}.`,
//     openGraph: {
//       title: `${id} - ${decodedCategory} Live | ${SITE_NAME}`,
//       description: `Watch ${id} from ${decodedCategory} category live on ${SITE_NAME}.`,
//       url: `${SITE_URL}/tvshow/${encodeURIComponent(decodedCategory)}/${id}`,
//       siteName: SITE_NAME,
//       type: "video.other",
//     },
//   }
// }

// export default function TvShowDetailPage({ params }: TvShowDetailPageProps) {
//   const { category, id } = params
//   const decodedCategory = decodeURIComponent(category)
//   const tvShows = getTvShowsByCategory(decodedCategory)
//   const tvShow = tvShows.find((item) => item.id === id)

//   if (!tvShow) {
//     notFound()
//   }

//   // Get other TV shows from the same category for recommendations
//   const sameCategoryTvShows = tvShows.filter((item) => item.id !== id)

//   // Get TV shows from other categories
//   const categories = getAllTvShowCategories().filter((cat) => cat !== decodedCategory)
//   const otherCategoryTvShows = categories
//     .flatMap((cat) => {
//       const items = getTvShowsByCategory(cat).slice(0, 2)
//       return items.map((item) => ({ ...item, category: cat }))
//     })
//     .slice(0, 4)

//   // Get some news and sports for recommendations
//   const newsChannels = getAllNews().slice(0, 4)
//   const firstSportsCategory = getAllSportsCategories()[0] || "Soccer"
//   const sportsItems = getSportsByCategory(firstSportsCategory).slice(0, 4)

//   const pageUrl = `${SITE_URL}/tvshow/${encodeURIComponent(decodedCategory)}/${id}`
//   const shareTitle = `${id} - ${decodedCategory} Live TV | ${SITE_NAME}`

//   return (
//     <div className="container py-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div>
//           <div className="mb-2">
//             <Link href="/tvshow" className="text-primary hover:underline">
//               TV Shows
//             </Link>
//             {" > "}
//             <Link href={`/tvshow#${decodedCategory}`} className="text-primary hover:underline">
//               {decodedCategory}
//             </Link>
//             {" > "}
//             <span>{id}</span>
//           </div>
//           <h1 className="text-3xl font-bold">
//             {id} - {decodedCategory} Live
//           </h1>
//         </div>
//         <SocialShare
//           url={pageUrl}
//           title={shareTitle}
//           description={`Watch ${id} from ${decodedCategory} category live on ${SITE_NAME}`}
//         />
//       </div>

//       <div className="mb-8">
//         <UniversalPlayer
//           title={`${id} - ${decodedCategory}`}
//           m3u8={tvShow.m3u8}
//           php={tvShow.php}
//           poster={tvShow.poster}
//         />
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">About {id}</h2>
//         <p className="text-muted-foreground">
//           Watch {id} from {decodedCategory} category live streaming. This channel provides{" "}
//           {decodedCategory.toLowerCase()} content for viewers of all ages.
//         </p>
//       </div>

//       {/* More from this category */}
//       {sameCategoryTvShows.length > 0 && (
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">More {decodedCategory} Channels</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//             {sameCategoryTvShows.map((show) => (
//               <TvShowCard key={show.id} tvshow={show} category={decodedCategory} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Other Categories */}
//       {otherCategoryTvShows.length > 0 && (
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Other Categories</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {otherCategoryTvShows.map((show, index) => (
//               <TvShowCard key={`${show.id}-${index}`} tvshow={show} category={show.category} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Recommended News */}
//       {newsChannels.length > 0 && (
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Recommended News Channels</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {newsChannels.map((channel) => (
//               <Link key={channel.id} href={`/news/${channel.id}`} className="block">
//                 <Card className="overflow-hidden media-card h-full">
//                   <div className="aspect-[2/3] relative">
//                     <img
//                       src={channel.poster || "/placeholder.svg"}
//                       alt={channel.id}
//                       className="object-cover w-full h-full"
//                     />
//                     <Badge className="absolute top-2 right-2 bg-red-500/80">NEWS</Badge>
//                   </div>
//                   <CardContent className="p-3">
//                     <h3 className="font-semibold line-clamp-1">{channel.id.toUpperCase()}</h3>
//                     <p className="text-sm text-muted-foreground">News Channel</p>
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Recommended Sports */}
//       {sportsItems.length > 0 && (
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">Recommended Sports Channels</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {sportsItems.map((item) => (
//               <Link
//                 key={item.id}
//                 href={`/sports/${encodeURIComponent(firstSportsCategory)}/${item.id}`}
//                 className="block"
//               >
//                 <Card className="overflow-hidden media-card h-full">
//                   <div className="aspect-[2/3] relative">
//                     <img src={item.poster || "/placeholder.svg"} alt={item.id} className="object-cover w-full h-full" />
//                     <Badge className="absolute top-2 right-2 bg-green-500/80">SPORTS</Badge>
//                   </div>
//                   <CardContent className="p-3">
//                     <h3 className="font-semibold line-clamp-1">{item.id}</h3>
//                     <p className="text-sm text-muted-foreground">{firstSportsCategory}</p>
//                   </CardContent>
//                 </Card>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       <TvShowDetailStructuredData
//         tvShowId={id}
//         category={decodedCategory}
//         poster={tvShow.poster}
//         php={tvShow.php}
//         m3u8={tvShow.m3u8}
//       />
//     </div>
//   )
// }




import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getTvShowsByCategory, getAllTvShowCategories, getAllNews, getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
import UniversalPlayer from "@/components/universal-player"
import TvShowCard from "@/components/tvshow-card"
import SocialShare from "@/components/social-share"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"
import TvShowDetailStructuredData from "./structured-data"

interface TvShowDetailPageProps {
  params: { category: string; id: string }
}

export async function generateMetadata({ params }: TvShowDetailPageProps): Promise<Metadata> {
  const { category, id } = params
  const decodedCategory = decodeURIComponent(category)
  const tvShows = getTvShowsByCategory(decodedCategory)
  const tvShow = tvShows.find((item) => item.id === id)

  if (!tvShow) {
    return {
      title: `Channel Not Found | ${SITE_NAME}`,
      description: "The requested TV channel could not be found.",
    }
  }

  return {
    title: `${tvShow.name} - ${decodedCategory} Live | ${SITE_NAME}`,
    description: `Watch ${tvShow.name} from ${decodedCategory} category live on ${SITE_NAME}.`,
    openGraph: {
      title: `${tvShow.name} - ${decodedCategory} Live | ${SITE_NAME}`,
      description: `Watch ${tvShow.name} from ${decodedCategory} category live on ${SITE_NAME}.`,
      url: `${SITE_URL}/tvshow/${encodeURIComponent(decodedCategory)}/${id}`,
      siteName: SITE_NAME,
      type: "video.other",
    },
  }
}

export default function TvShowDetailPage({ params }: TvShowDetailPageProps) {
  const { category, id } = params
  const decodedCategory = decodeURIComponent(category)
  const tvShows = getTvShowsByCategory(decodedCategory)
  const tvShow = tvShows.find((item) => item.id === id)

  if (!tvShow) {
    notFound()
  }

  // Get other TV shows from the same category for recommendations
  const sameCategoryTvShows = tvShows.filter((item) => item.id !== id)

  // Get TV shows from other categories
  const categories = getAllTvShowCategories().filter((cat) => cat !== decodedCategory)
  const otherCategoryTvShows = categories.flatMap((cat) =>
    getTvShowsByCategory(cat).slice(0, 2).map((item) => ({ ...item, category: cat }))
  ).slice(0, 4)

  // Get some news and sports for recommendations
  const newsChannels = getAllNews().slice(0, 4)
  const firstSportsCategory = getAllSportsCategories()[0] || "Soccer"
  const sportsItems = getSportsByCategory(firstSportsCategory).slice(0, 4)

  const pageUrl = `${SITE_URL}/tvshow/${encodeURIComponent(decodedCategory)}/${id}`
  const shareTitle = `${tvShow.name} - ${decodedCategory} Live TV | ${SITE_NAME}`

  return (
    <div className="container py-6">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="mb-2">
            <Link href="/tvshow" className="text-primary hover:underline">TV Shows</Link>
            {" > "}
            <Link href={`/tvshow#${decodedCategory}`} className="text-primary hover:underline">{decodedCategory}</Link>
            {" > "}
            <span>{tvShow.name}</span>
          </div>
          <h1 className="text-3xl font-bold">{tvShow.name} - {decodedCategory} Watch Now</h1>
        </div>
        <SocialShare url={pageUrl} title={shareTitle} description={`Watch ${tvShow.name} from ${decodedCategory} category live on ${SITE_NAME}`} />
      </div>

      {/* Video Player */}
      <div className="mb-8">
        <UniversalPlayer title={`${tvShow.name} - ${decodedCategory}`} m3u8={tvShow.m3u8} php={tvShow.php} poster={tvShow.poster} />
      </div>

      {/* TV Show Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About {tvShow.name}</h2>
        <p className="text-muted-foreground">
          Watch {tvShow.name} from {decodedCategory} category live streaming. This channel provides{" "}
          {decodedCategory.toLowerCase()} content for viewers of all ages.
        </p>
      </div>

      {/* More from this category */}
      {sameCategoryTvShows.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">More {decodedCategory} Channels</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {sameCategoryTvShows.map((show) => (
              <TvShowCard key={show.id} tvshow={show} category={decodedCategory} />
            ))}
          </div>
        </div>
      )}

      {/* Other Categories */}
      {otherCategoryTvShows.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Other Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {otherCategoryTvShows.map((show, index) => (
              <TvShowCard key={`${show.id}-${index}`} tvshow={show} category={show.category} />
            ))}
          </div>
        </div>
      )}

      {/* Recommended News */}
      {newsChannels.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recommended News Channels</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {newsChannels.map((channel) => (
              <Link key={channel.id} href={`/news/${channel.id}`} className="block">
                <Card className="overflow-hidden media-card h-full">
                  <div className="aspect-[2/3] relative">
                    <img src={channel.poster || "/placeholder.svg"} alt={channel.id} className="object-cover w-full h-full" />
                    <Badge className="absolute top-2 right-2 bg-red-500/80">NEWS</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold line-clamp-1">{channel.id.toUpperCase()}</h3>
                    <p className="text-sm text-muted-foreground">News Channel</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

       </div>
  )
}
