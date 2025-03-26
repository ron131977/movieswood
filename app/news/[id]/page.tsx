// import type { Metadata } from "next"
// import { notFound } from "next/navigation"
// import { getNewsById } from "@/lib/live-broadcast"
// import M3u8Player from "@/components/m3u8-player"
// import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

// interface NewsDetailPageProps {
//   params: { id: string }
// }

// export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
//   const news = getNewsById(params.id)

//   if (!news) {
//     return {
//       title: `Channel Not Found | ${SITE_NAME}`,
//       description: "The requested news channel could not be found.",
//     }
//   }

//   return {
//     title: `${params.id.toUpperCase()} Live | ${SITE_NAME}`,
//     description: `Watch ${params.id.toUpperCase()} live on ${SITE_NAME}.`,
//     openGraph: {
//       title: `${params.id.toUpperCase()} Live | ${SITE_NAME}`,
//       description: `Watch ${params.id.toUpperCase()} live on ${SITE_NAME}.`,
//       url: `${SITE_URL}/news/${params.id}`,
//       siteName: SITE_NAME,
//       type: "video.other",
//     },
//   }
// }

// export default function NewsDetailPage({ params }: NewsDetailPageProps) {
//   const news = getNewsById(params.id)

//   if (!news) {
//     notFound()
//   }

//   return (
//     <div className="container py-6">
//       <h1 className="text-3xl font-bold mb-6">{params.id.toUpperCase()} Live</h1>

//       <div className="mb-8">
//         <M3u8Player src={news.m3u8} poster={news.poster} title={params.id.toUpperCase()} />
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">About {params.id.toUpperCase()}</h2>
//         <p className="text-muted-foreground">
//           Watch {params.id.toUpperCase()} live streaming. This channel provides the latest news and updates from around
//           the world.
//         </p>
//       </div>
//     </div>
//   )
// }
// import { CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Card } from "@/components/ui/card"
// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { getNewsById } from "@/lib/live-broadcast";
// import { getTvShowsByCategory, getAllTvShowCategories, getAllNews, getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
// import TvShowCard from "@/components/tvshow-card"
// import M3u8Player from "@/components/m3u8-player";
// import SocialShare from "@/components/social-share";

// import { SITE_NAME, SITE_URL } from "@/lib/tmdb";
// import Link from "next/link";

// interface NewsDetailPageProps {
//   params: { id: string };
// }

// export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
//   const news = getNewsById(params.id);

//   if (!news) {
//     return {
//       title: `Channel Not Found | ${SITE_NAME}`,
//       description: "The requested news channel could not be found.",
//     };
//   }

//   return {
//     title: `${news.name} Live | ${SITE_NAME}`,
//     description: `Watch ${news.name} live on ${SITE_NAME}.`,
//     openGraph: {
//       title: `${news.name} Live | ${SITE_NAME}`,
//       description: `Watch ${news.name} live on ${SITE_NAME}.`,
//       url: `${SITE_URL}/news/${params.id}`,
//       siteName: SITE_NAME,
//       type: "video.other",
//     },
//   };
// }

// export default function NewsDetailPage({ params }: NewsDetailPageProps) {
//   const news = getNewsById(params.id);
//   const { category, id } = params
//   const decodedCategory = decodeURIComponent(category)
//   const tvShows = getTvShowsByCategory(decodedCategory)
//   const tvShow = tvShows.find((item) => item.id === id)

//   if (!news) {
//     notFound();
//   }

//     // Get other TV shows from the same category for recommendations
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
  
//     const pageUrl = `${SITE_URL}/tvshow/${encodeURIComponent(decodedCategory)}/${id}`
//     const shareTitle = `${tvShow.name} - ${decodedCategory} Live TV | ${SITE_NAME}`
  
  

//   return (
//     <div className="container py-6">
//       {/* Breadcrumb Navigation */}
//       <div className="mb-2">
//         <Link href="/news" className="text-primary hover:underline">
//           News
//         </Link>
//         {" > "}
//         <span>{news.name}</span>
//       </div>

//       <h1 className="text-3xl font-bold mb-6">{news.name} Live</h1>

//       {/* Social Share Component - Centered */}
//       <div className="flex justify-center mb-6">
//         <SocialShare url={pageUrl} title={shareTitle} description={news.overview} />
//       </div>

//       <div className="mb-8">
//         <M3u8Player src={news.m3u8} poster={news.poster} title={news.name} />
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">About {news.name}</h2>
//         <p className="text-muted-foreground">
//           Watch {news.name} live streaming. This channel provides the latest news and updates from around the world.
//         </p>
//       </div>
//     {/* </div> */}
//        {/* More from this category */}
//        {sameCategoryTvShows.length > 0 && (
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
//                     <img src={channel.poster || "/placeholder.svg"} alt={channel.id} className="object-cover w-full h-full" />
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
//               <Link key={item.id} href={`/sports/${encodeURIComponent(firstSportsCategory)}/${item.id}`} className="block">
//                 <Card className="overflow-hidden media-card h-full">
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

//     </div>
//   )
// }

import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsById, getTvShowsByCategory, getAllTvShowCategories, getAllNews, getAllSportsCategories, getSportsByCategory } from "@/lib/live-broadcast"
import TvShowCard from "@/components/tvshow-card"
import M3u8Player from "@/components/m3u8-player";
import SocialShare from "@/components/social-share";

import { SITE_NAME, SITE_URL } from "@/lib/tmdb";
import Link from "next/link";

interface NewsDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const news = getNewsById(params.id);

  if (!news) {
    return {
      title: `Channel Not Found | ${SITE_NAME}`,
      description: "The requested news channel could not be found.",
    };
  }

  return {
    title: `${news.name} Live | ${SITE_NAME}`,
    description: `Watch ${news.name} live on ${SITE_NAME}.`,
    openGraph: {
      title: `${news.name} Live | ${SITE_NAME}`,
      description: `Watch ${news.name} live on ${SITE_NAME}.`,
      url: `${SITE_URL}/news/${params.id}`,
      siteName: SITE_NAME,
      type: "video.other",
    },
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const news = getNewsById(params.id);
  const { category, id } = params;
  const decodedCategory = decodeURIComponent(category);
  const tvShows = getTvShowsByCategory(decodedCategory).slice(0, 4);
  const categories = getAllTvShowCategories().filter((cat) => cat !== decodedCategory);
  const otherCategoryTvShows = categories.flatMap((cat) =>
    getTvShowsByCategory(cat).slice(0, 2).map((item) => ({ ...item, category: cat }))
  ).slice(0, 4);
  const newsChannels = getAllNews().slice(0, 4);

const firstSportsCategory = getAllSportsCategories()[0] || "Soccer"
const sportsItems = getSportsByCategory(firstSportsCategory).slice(0, 4)


  if (!news) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/tvshow/${encodeURIComponent(decodedCategory)}/${id}`;
  const shareTitle = `${news.name} - ${decodedCategory} Live TV | ${SITE_NAME}`;


 
  return (
    <div className="container py-6">
      <div className="mb-2">
        <Link href="/news" className="text-primary hover:underline">
          News
        </Link>
        {" > "}
        <span>{news.name}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{news.name} Live</h1>
      <div className="flex justify-center mb-6">
        <SocialShare url={pageUrl} title={shareTitle} description={news.overview} />
      </div>
      <div className="mb-8">
        <M3u8Player src={news.m3u8} poster={news.poster} title={news.name} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About {news.name}</h2>
        <p className="text-muted-foreground">
          Watch {news.name} live streaming. This channel provides the latest news and updates from around the world.
        </p>
      </div>

      {/* <h2 className="text-2xl font-bold mb-4">More {decodedCategory} Channels</h2> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tvShows.map((show) => (
          <TvShowCard key={show.id} tvshow={show} category={decodedCategory} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">More Other Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {otherCategoryTvShows.map((show, index) => (
          <TvShowCard key={`${show.id}-${index}`} tvshow={show} category={show.category} />
        ))}
      </div>

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
  );
}
