// // import type { Metadata } from "next"
// // import Link from "next/link"
// // import { notFound } from "next/navigation"
// // import { getSportsItemById } from "@/lib/live-broadcast"
// // import IframeEmbedPlayer from "@/components/iframe-embed-player"
// // import GmtTime from "@/components/gmt-time"
// // import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

// // interface SportsDetailPageProps {
// //   params: { category: string; id: string }
// // }

// // export async function generateMetadata({ params }: SportsDetailPageProps): Promise<Metadata> {
// //   const { category, id } = params
// //   const decodedCategory = decodeURIComponent(category)
// //   const sports = getSportsItemById(decodedCategory, id)

// //   if (!sports) {
// //     return {
// //       title: `Channel Not Found | ${SITE_NAME}`,
// //       description: "The requested sports channel could not be found.",
// //     }
// //   }

// //   return {
// //     title: `${id} - ${decodedCategory} Live | ${SITE_NAME}`,
// //     description: `Watch ${decodedCategory} on ${id} live on ${SITE_NAME}.`,
// //     openGraph: {
// //       title: `${id} - ${decodedCategory} Live | ${SITE_NAME}`,
// //       description: `Watch ${decodedCategory} on ${id} live on ${SITE_NAME}.`,
// //       url: `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`,
// //       siteName: SITE_NAME,
// //       type: "video.other",
// //     },
// //   }
// // }

// // export default function SportsDetailPage({ params }: SportsDetailPageProps) {
// //   const { category, id } = params
// //   const decodedCategory = decodeURIComponent(category)
// //   const sports = getSportsItemById(decodedCategory, id)

// //   if (!sports) {
// //     notFound()
// //   }

// //   return (
// //     <div className="container py-6">
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
// //         <div>
// //           <div className="mb-2">
// //             <Link href="/sports" className="text-primary hover:underline">
// //               Sports
// //             </Link>
// //             {" > "}
// //             <Link href={`/sports#${decodedCategory}`} className="text-primary hover:underline">
// //               {decodedCategory}
// //             </Link>
// //             {" > "}
// //             <span>{id}</span>
// //           </div>
// //           <h1 className="text-3xl font-bold">
// //             {id} - {decodedCategory} Live
// //           </h1>
// //         </div>
// //         <GmtTime />
// //       </div>

// //       <div className="mb-8">
// //         <IframeEmbedPlayer src={sports.php} title={`${id} - ${decodedCategory}`} />
// //       </div>

// //       <div className="mb-8">
// //         <h2 className="text-xl font-semibold mb-4">About This Channel</h2>
// //         <p className="text-muted-foreground">
// //           Watch {decodedCategory} live on {id}. This channel provides live coverage of {decodedCategory} events and
// //           matches.
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }

// import type { Metadata } from "next";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { getSportsItemById } from "@/lib/live-broadcast";
// import IframeEmbedPlayer from "@/components/iframe-embed-player";
// import SocialShare from "@/components/social-share"
// import GmtTime from "@/components/gmt-time";
// import { SITE_NAME, SITE_URL } from "@/lib/tmdb";

// interface SportsDetailPageProps {
//   params: { category: string; id: string };
// }

// export async function generateMetadata({ params }: SportsDetailPageProps): Promise<Metadata> {
//   const { category, id } = params;
//   const decodedCategory = decodeURIComponent(category);
//   const sports = getSportsItemById(decodedCategory, id);


//   if (!sports) {
//     return {
//       title: `Channel Not Found | ${SITE_NAME}`,
//       description: "The requested sports channel could not be found.",
//     };
//   }

//   return {
//     title: `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`,
//     description: `Watch ${decodedCategory} on ${sports.name} live on ${SITE_NAME}.`,
//     openGraph: {
//       title: `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`,
//       description: `Watch ${decodedCategory} on ${sports.name} live on ${SITE_NAME}.`,
//       url: `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`,
//       siteName: SITE_NAME,
//       type: "video.other",
//     },
//   };
// }

// export default function SportsDetailPage({ params }: SportsDetailPageProps) {
//   const { category, id } = params;
//   const decodedCategory = decodeURIComponent(category);
//   const sports = getSportsItemById(decodedCategory, id);

//   if (!sports) {
//     notFound();
//   }

//   return (
//     <div className="container py-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div>
//           <div className="mb-2">
//             <Link href="/sports" className="text-primary hover:underline">
//               Sports
//             </Link>
//             {" > "}
//             <Link href={`/sports#${decodedCategory}`} className="text-primary hover:underline">
//               {decodedCategory}
//             </Link>
//             {" > "}
//             <span>{sports.name}</span>
//           </div>
//           <h1 className="text-3xl font-bold">
//             {sports.name} - {decodedCategory} Live
//           </h1>
//         </div>
//         <GmtTime />
//       </div>
//    <SocialShare url={pageUrl} title={shareTitle} description={sports.overview} />
//       <div className="mb-8">
//         <IframeEmbedPlayer src={sports.php} title={`${sports.name} - ${decodedCategory}`} />
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">About {sports.name}</h2>
//         <p className="text-muted-foreground">
//           Watch {decodedCategory} live on {sports.name}. This channel provides live coverage of {decodedCategory} events
//           and matches.
//         </p>
//       </div>
//     </div>
//   );
// }










// import type { Metadata } from "next";
// import Link from "next/link";
// import { CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Card } from "@/components/ui/card"
// import { getTvShowsByCategory, getAllTvShowCategories, getAllNews, getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
// import TvShowCard from "@/components/tvshow-card"
// import { notFound } from "next/navigation";
// import { getSportsItemById } from "@/lib/live-broadcast";
// import IframeEmbedPlayer from "@/components/iframe-embed-player";
// import SocialShare from "@/components/social-share";
// import GmtTime from "@/components/gmt-time";
// import { SITE_NAME, SITE_URL } from "@/lib/tmdb";
// import TvShowDetailStructuredData from "./structured-data"

// interface SportsDetailPageProps {
//   params: { category: string; id: string };
// }

// export async function generateMetadata({ params }: SportsDetailPageProps): Promise<Metadata> {
//   const { category, id } = params;
//   const decodedCategory = decodeURIComponent(category);
//   const sports = getSportsItemById(decodedCategory, id);

//   if (!sports) {
//     return {
//       title: `Channel Not Found | ${SITE_NAME}`,
//       description: "The requested sports channel could not be found.",
//     };
//   }

//   return {
//     title: `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`,
//     description: `Watch ${decodedCategory} on ${sports.name} live on ${SITE_NAME}.`,
//     openGraph: {
//       title: `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`,
//       description: `Watch ${decodedCategory} on ${sports.name} live on ${SITE_NAME}.`,
//       url: `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`,
//       siteName: SITE_NAME,
//       type: "video.other",
//     },
//   };
// }

// export default function SportsDetailPage({ params }: SportsDetailPageProps) {
//   const { category, id } = params;
//   const decodedCategory = decodeURIComponent(category);
//   const sports = getSportsItemById(decodedCategory, id);
//   const tvShows = getTvShowsByCategory(decodedCategory)
//   const tvShow = tvShows.find((item) => item.id === id)

//   if (!sports) {
//     notFound();
//   }

//   // Get other TV shows from the same category for recommendations
//     const sameCategoryTvShows = tvShows.filter((item) => item.id !== id)
  
//     // Get TV shows from other categories
//     const categories = getAllTvShowCategories().filter((cat) => cat !== decodedCategory)
//     const otherCategoryTvShows = categories.flatMap((cat) =>
//       getTvShowsByCategory(cat).slice(0, 2).map((item) => ({ ...item, category: cat }))
//     ).slice(0, 4)
  
//     // Get some news and sports for recommendations
//     const newsChannels = getAllNews().slice(0, 4)
//     const firstSportsCategory = getAllSportsCategories()[0] || "Soccer"
//     const sportsItems = getSportsByCategory(firstSportsCategory).slice(0, 4)
  
 
//   // Define page URL and share title
//   const pageUrl = `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`;
//   const shareTitle = `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`;

//   return (
//     <div className="container py-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div>
//           <div className="mb-2">
//             <Link href="/sports" className="text-primary hover:underline">
//               Sports
//             </Link>
//             {" > "}
//             <Link href={`/sports#${decodedCategory}`} className="text-primary hover:underline">
//               {decodedCategory}
//             </Link>
//             {" > "}
//             <span>{sports.name}</span>
//           </div>
//           <h1 className="text-3xl font-bold">
//             {sports.name} - {decodedCategory} Live
//           </h1>
//         </div>
//         <GmtTime />
//       </div>

//       {/* Social Share Component */}
//       <div className="flex justify-center mb-6">
//         <SocialShare url={pageUrl} title={shareTitle} description={sports.overview} />
//       </div>

//       <div className="mb-8">
//         <IframeEmbedPlayer src={sports.php} title={`${sports.name} - ${decodedCategory}`} />
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">About {sports.name}</h2>
//         <p className="text-muted-foreground">
//           Watch {decodedCategory} live on {sports.name}. This channel provides live coverage of {decodedCategory} events
//           and matches.
//         </p>
//       </div>
//     {/* </div> */}
//      {/* More from this category */}
//      {sameCategoryTvShows.length > 0 && (
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">More {decodedCategory} Channels</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//           {sameCategoryTvShows.map((show) => (
//             <TvShowCard key={show.id} tvshow={show} category={decodedCategory} />
//           ))}
//         </div>
//       </div>
//     )}

//     {/* Other Categories */}
//     {otherCategoryTvShows.length > 0 && (
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Other Categories</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {otherCategoryTvShows.map((show, index) => (
//             <TvShowCard key={`${show.id}-${index}`} tvshow={show} category={show.category} />
//           ))}
//         </div>
//       </div>
//     )}

//     {/* Recommended News */}
//     {newsChannels.length > 0 && (
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Recommended News Channels</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {newsChannels.map((channel) => (
//             <Link key={channel.id} href={`/news/${channel.id}`} className="block">
//               <Card className="overflow-hidden media-card h-full">
//                 <div className="aspect-[2/3] relative">
//                   <img src={channel.poster || "/placeholder.svg"} alt={channel.id} className="object-cover w-full h-full" />
//                   <Badge className="absolute top-2 right-2 bg-red-500/80">NEWS</Badge>
//                 </div>
//                 <CardContent className="p-3">
//                   <h3 className="font-semibold line-clamp-1">{channel.id.toUpperCase()}</h3>
//                   <p className="text-sm text-muted-foreground">News Channel</p>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>
//     )}

//     {/* Recommended Sports
//     {sportsItems.length > 0 && (
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Recommended Sports Channels</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {sportsItems.map((item) => (
//             <Link key={item.id} href={`/sports/${encodeURIComponent(firstSportsCategory)}/${item.id}`} className="block">
//               <Card className="overflow-hidden media-card h-full">
//                 <CardContent className="p-3">
//                   <h3 className="font-semibold line-clamp-1">{item.id}</h3>
//                   <p className="text-sm text-muted-foreground">{firstSportsCategory}</p>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>
//     )} */}


//   </div>
// )
// }















// import type { Metadata } from "next"
// import Link from "next/link"
// import { notFound } from "next/navigation"
// import { getSportsItemById, getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
// import UniversalPlayer from "@/components/universal-player"
// import SportsCard from "@/components/sports-card"
// import GmtTime from "@/components/gmt-time"
// import SocialShare from "@/components/social-share"
// import { SITE_NAME, SITE_URL } from "@/lib/tmdb"
// import SportsDetailStructuredData from "./structured-data"

// interface SportsDetailPageProps {
//   params: { category: string; id: string }
// }

// export async function generateMetadata({ params }: SportsDetailPageProps): Promise<Metadata> {
//   const { category, id } = params
//   const decodedCategory = decodeURIComponent(category)
//   const sports = getSportsItemById(decodedCategory, id)

//   if (!sports) {
//     return {
//       title: `Channel Not Found | ${SITE_NAME}`,
//       description: "The requested sports channel could not be found.",
//     }
//   }

//   const sportName = sports.name || sports.id

//   return {
//     title: `${sportName} - ${decodedCategory} Live | ${SITE_NAME}`,
//     description: `Watch ${decodedCategory}: ${sportName} live on ${SITE_NAME}.`,
//     openGraph: {
//       title: `${sportName} - ${decodedCategory} Live | ${SITE_NAME}`,
//       description: `Watch ${decodedCategory}: ${sportName} live on ${SITE_NAME}.`,
//       url: `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`,
//       siteName: SITE_NAME,
//       type: "video.other",
//     },
//   }
// }

// export default function SportsDetailPage({ params }: SportsDetailPageProps) {
//   const { category, id } = params
//   const decodedCategory = decodeURIComponent(category)
//   const sports = getSportsItemById(decodedCategory, id)

//   if (!sports) {
//     notFound()
//   }

//   const sportName = sports.name || sports.id

//   // Get recommended sports from all categories
//   const categories = getAllSportsCategories()
//   const allSportsItems = categories
//     .flatMap((cat) => {
//       const items = getSportsByCategory(cat)
//       return items
//         .filter((item) => !(cat === decodedCategory && item.id === id))
//         .map((item) => ({ ...item, category: cat }))
//     })
//     .slice(0, 12)

//   const pageUrl = `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`
//   const shareTitle = `${sportName} - ${decodedCategory} Live Sports | ${SITE_NAME}`

//   return (
//     <div className="container py-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div>
//           <div className="mb-2">
//             <Link href="/sports" className="text-primary hover:underline">
//               Sports
//             </Link>
//             {" > "}
//             <Link href={`/sports#${decodedCategory}`} className="text-primary hover:underline">
//               {decodedCategory}
//             </Link>
//             {" > "}
//             <span>{sportName}</span>
//           </div>
//           <h1 className="text-3xl font-bold">{sportName}</h1>
//           <p className="text-muted-foreground mt-1">{decodedCategory} Live</p>
//         </div>
//         <div className="flex flex-wrap items-center gap-4">
//           <GmtTime />
//           <SocialShare
//             url={pageUrl}
//             title={shareTitle}
//             description={`Watch ${decodedCategory}: ${sportName} live on ${SITE_NAME}`}
//           />
//         </div>
//       </div>

//       <div className="mb-8">
//         <UniversalPlayer title={sportName} m3u8={sports.m3u8} php={sports.php} poster={sports.poster} />
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">About This Match</h2>
//         <p className="text-muted-foreground">
//           Watch {sportName} live streaming. This channel provides live coverage of {decodedCategory} events and matches.
//           Enjoy the game in high quality streaming.
//         </p>
//       </div>

//       {/* Recommended Sports from All Categories */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">More Sports Channels</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {allSportsItems.map((item, index) => (
//             <SportsCard key={`${item.id}-${index}`} sports={item} category={item.category} />
//           ))}
//         </div>
//       </div>

//       <SportsDetailStructuredData
//         category={decodedCategory}
//         sportsId={id}
//         sportName={sportName}
//         poster={sports.poster}
//         php={sports.php}
//         m3u8={sports.m3u8}
//       />
//     </div>
//   )
// }

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSportsItemById, getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
import UniversalPlayer from "@/components/universal-player"
import SportsCard from "@/components/sports-card"
import GmtTime from "@/components/gmt-time"
import SocialShare from "@/components/social-share"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"
import SportsDetailStructuredData from "./structured-data"

interface SportsDetailPageProps {
  params: { category: string; id: string }
}

export async function generateMetadata({ params }: SportsDetailPageProps): Promise<Metadata> {
  const { category, id } = params
  const decodedCategory = decodeURIComponent(category)
  const sports = getSportsItemById(decodedCategory, id)

  if (!sports) {
    return {
      title: `Channel Not Found | ${SITE_NAME}`,
      description: "The requested sports channel could not be found.",
    }
  }

  const sportName = sports.name || sports.id

  return {
    title: `${sportName} - ${decodedCategory} Live | ${SITE_NAME}`,
    description: `Watch ${decodedCategory}: ${sportName} live on ${SITE_NAME}.`,
    openGraph: {
      title: `${sportName} - ${decodedCategory} Live | ${SITE_NAME}`,
      description: `Watch ${decodedCategory}: ${sportName} live on ${SITE_NAME}.`,
      url: `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`,
      siteName: SITE_NAME,
      type: "video.other",
    },
  }
}

export default function SportsDetailPage({ params }: SportsDetailPageProps) {
  const { category, id } = params
  const decodedCategory = decodeURIComponent(category)
  const sports = getSportsItemById(decodedCategory, id)

  if (!sports) {
    notFound()
  }

  const sportName = sports.name || sports.id

  // Get recommended sports from all categories
  const categories = getAllSportsCategories()
  const allSportsItems = categories
    .flatMap((cat) => {
      const items = getSportsByCategory(cat)
      return items
        .filter((item) => !(cat === decodedCategory && item.id === id))
        .map((item) => ({ ...item, category: cat }))
    })
    .slice(0, 12)

  const pageUrl = `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`
  const shareTitle = `${sportName} - ${decodedCategory} Live Sports | ${SITE_NAME}`

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="mb-2">
            <Link href="/sports" className="text-primary hover:underline">
              Sports
            </Link>
            {" > "}
            <Link href={`/sports#${decodedCategory}`} className="text-primary hover:underline">
              {decodedCategory}
            </Link>
            {" > "}
            <span>{sportName}</span>
          </div>
          <h1 className="text-3xl font-bold">{sportName}</h1>
          <p className="text-muted-foreground mt-1">{decodedCategory} Live</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <GmtTime />
          <SocialShare
            url={pageUrl}
            title={shareTitle}
            description={`Watch ${decodedCategory}: ${sportName} live on ${SITE_NAME}`}
          />
        </div>
      </div>

      <div className="mb-8">
        <UniversalPlayer title={sportName} m3u8={sports.m3u8} php={sports.php} poster={sports.poster} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About This Match</h2>
        <p className="text-muted-foreground">
          Watch {sportName} live streaming. This channel provides live coverage of {decodedCategory} events and matches.
          Enjoy the game in high quality streaming.
        </p>
      </div>

      {/* Recommended Sports from All Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">More Sports Channels</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allSportsItems.map((item, index) => (
            <SportsCard key={`${item.id}-${index}`} sports={item} category={item.category} />
          ))}
        </div>
      </div>

      <SportsDetailStructuredData
        category={decodedCategory}
        sportsId={id}
        sportName={sportName}
        poster={sports.poster}
        php={sports.php}
        m3u8={sports.m3u8}
      />
    </div>
  )
}

