// import type { Metadata } from "next"
// import Link from "next/link"
// import { notFound } from "next/navigation"
// import { fetchFromTMDB, getImageUrl, getTvEpisodeStreamingUrls, SITE_NAME, SITE_URL } from "@/lib/tmdb"
// import MultiSourcePlayer from "@/components/multi-source-player"
// import SocialShare from "@/components/social-share"
// import { Calendar } from "lucide-react"
// import EpisodeStructuredData from "./structured-data"

// interface EpisodePageProps {
//   params: {
//     id: string
//     seasonNumber: string
//     episodeNumber: string
//   }
// }

// export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
//   try {
//     const tvShow = await fetchFromTMDB(`/tv/${params.id}`)
//     const episode = await fetchFromTMDB(
//       `/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`,
//     )

//     return {
//       title: `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} - ${episode.name} | ${SITE_NAME}`,
//       description: episode.overview || `Watch ${episode.name} from ${tvShow.name} on ${SITE_NAME}`,
//       openGraph: {
//         title: `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} - ${episode.name}`,
//         description: episode.overview || `Watch ${episode.name} from ${tvShow.name} on ${SITE_NAME}`,
//         type: "video.episode",
//         images: episode.still_path ? [getImageUrl(episode.still_path, "original")] : [],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} | ${SITE_NAME}`,
//         description: episode.overview || `Watch ${episode.name} from ${tvShow.name} on ${SITE_NAME}`,
//       },
//       alternates: {
//         canonical: `${SITE_URL}/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`,
//       },
//     }
//   } catch (error) {
//     return {
//       title: `Episode Not Found | ${SITE_NAME}`,
//       description: "The requested episode could not be found.",
//     }
//   }
// }

// export default async function EpisodePage({ params }: EpisodePageProps) {
//   try {
//     const tvShow = await fetchFromTMDB(`/tv/${params.id}`)
//     const season = await fetchFromTMDB(`/tv/${params.id}/season/${params.seasonNumber}`)
//     const episode = await fetchFromTMDB(
//       `/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`,
//     )

//     const streamingUrls = getTvEpisodeStreamingUrls(params.id, params.seasonNumber, params.episodeNumber)

//     // Create video sources array
//     const videoSources = [
//       { id: "vidsrcCc", name: "VidSrc.cc", url: streamingUrls.vidsrcCc },
//       { id: "vidsrcXyz", name: "VidSrc.xyz", url: streamingUrls.vidsrcXyz },
//       { id: "embedCc", name: "2Embed.cc", url: streamingUrls.embedCc },
//     ]

//     const episodeTitle = `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} - ${episode.name}`
//     const pageUrl = `${SITE_URL}/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`
//     const shareTitle = `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} - ${episode.name} | ${SITE_NAME}`

//     return (
//       <div className="container py-6">
//         <div className="mb-6">
//           <div className="flex flex-wrap gap-2 text-sm">
//             <Link href={`/tv/${params.id}`} className="text-primary hover:underline">
//               {tvShow.name}
//             </Link>
//             <span>›</span>
//             <Link href={`/tv/${params.id}/season/${params.seasonNumber}`} className="text-primary hover:underline">
//               {season.name}
//             </Link>
//             <span>›</span>
//             <span>Episode {params.episodeNumber}</span>
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
//           <h1 className="text-3xl font-bold">{episode.name}</h1>
//           <SocialShare url={pageUrl} title={shareTitle} description={episode.overview} />
//         </div>

//         <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
//           <div className="flex items-center">
//             <Calendar className="h-4 w-4 mr-1" />
//             <span>{episode.air_date || "Unknown air date"}</span>
//           </div>
//           <div>
//             Season {params.seasonNumber}, Episode {params.episodeNumber}
//           </div>
//         </div>

//         {/* Video Player */}
//         <div className="mb-8">
//           <MultiSourcePlayer sources={videoSources} title={episodeTitle} />
//         </div>

//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">Overview</h2>
//           <p className="text-muted-foreground">{episode.overview || "No overview available."}</p>
//         </div>

//         {/* Episode Navigation */}
//         <div className="flex justify-between">
//           {Number.parseInt(params.episodeNumber) > 1 && (
//             <Link
//               href={`/tv/${params.id}/season/${params.seasonNumber}/episode/${Number.parseInt(params.episodeNumber) - 1}`}
//               className="text-primary hover:underline"
//             >
//               ← Previous Episode
//             </Link>
//           )}

//           {Number.parseInt(params.episodeNumber) < season.episodes.length && (
//             <Link
//               href={`/tv/${params.id}/season/${params.seasonNumber}/episode/${Number.parseInt(params.episodeNumber) + 1}`}
//               className="text-primary hover:underline ml-auto"
//             >
//               Next Episode →
//             </Link>
//           )}
//         </div>
//         <EpisodeStructuredData tvShow={tvShow} season={season} episode={episode} params={params} />
//       </div>
//     )
//   } catch (error) {
//     notFound()
//   }
// }




import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchFromTMDB, getImageUrl, getTvEpisodeStreamingUrls, SITE_NAME, SITE_URL } from "@/lib/tmdb"
import MultiSourcePlayer from "@/components/multi-source-player"
import SocialShare from "@/components/social-share"
import { Calendar } from "lucide-react"
import EpisodeStructuredData from "./structured-data"

interface EpisodePageProps {
  params: {
    id: string
    seasonNumber: string
    episodeNumber: string
  }
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  try {
    const tvShow = await fetchFromTMDB(`/tv/${params.id}`)
    const episode = await fetchFromTMDB(
      `/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`,
    )

    return {
      title: `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} - ${episode.name} | ${SITE_NAME}`,
      description: episode.overview || `Watch ${episode.name} from ${tvShow.name} on ${SITE_NAME}`,
      openGraph: {
        title: `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} - ${episode.name}`,
        description: episode.overview || `Watch ${episode.name} from ${tvShow.name} on ${SITE_NAME}`,
        type: "video.episode",
        images: episode.still_path ? [getImageUrl(episode.still_path, "original")] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} | ${SITE_NAME}`,
        description: episode.overview || `Watch ${episode.name} from ${tvShow.name} on ${SITE_NAME}`,
      },
      alternates: {
        canonical: `${SITE_URL}/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`,
      },
    }
  } catch (error) {
    return {
      title: `Episode Not Found | ${SITE_NAME}`,
      description: "The requested episode could not be found.",
    }
  }
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  try {
    const tvShow = await fetchFromTMDB(`/tv/${params.id}`)
    const season = await fetchFromTMDB(`/tv/${params.id}/season/${params.seasonNumber}`)
    const episode = await fetchFromTMDB(
      `/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`,
    )

    const streamingUrls = getTvEpisodeStreamingUrls(params.id, params.seasonNumber, params.episodeNumber)

    // Create video sources array
    const videoSources = [
      { id: "vidsrcCc", name: "Player 1", url: streamingUrls.vidsrcCc },
      { id: "vidsrcMe", name: "Player 2", url: streamingUrls.vidsrcMe },
      { id: "embedCc", name: "Player 3", url: streamingUrls.embedCc },
    ]

    const episodeTitle = `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} - ${episode.name}`
    const pageUrl = `${SITE_URL}/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`
    const shareTitle = `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} - ${episode.name} | ${SITE_NAME}`

    return (
      <div className="container py-6">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href={`/tv/${params.id}`} className="text-primary hover:underline">
              {tvShow.name}
            </Link>
            <span>›</span>
            <Link href={`/tv/${params.id}/season/${params.seasonNumber}`} className="text-primary hover:underline">
              {season.name}
            </Link>
            <span>›</span>
            <span>Episode {params.episodeNumber}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <h1 className="text-3xl font-bold">{episode.name}</h1>
          <SocialShare url={pageUrl} title={shareTitle} description={episode.overview} />
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{episode.air_date || "Unknown air date"}</span>
          </div>
          <div>
            Season {params.seasonNumber}, Episode {params.episodeNumber}
          </div>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <MultiSourcePlayer sources={videoSources} title={episodeTitle} />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-muted-foreground">{episode.overview || "No overview available."}</p>
        </div>

        {/* Episode Navigation */}
        <div className="flex justify-between">
          {Number.parseInt(params.episodeNumber) > 1 && (
            <Link
              href={`/tv/${params.id}/season/${params.seasonNumber}/episode/${Number.parseInt(params.episodeNumber) - 1}`}
              className="text-primary hover:underline"
            >
              ← Previous Episode
            </Link>
          )}

          {Number.parseInt(params.episodeNumber) < season.episodes.length && (
            <Link
              href={`/tv/${params.id}/season/${params.seasonNumber}/episode/${Number.parseInt(params.episodeNumber) + 1}`}
              className="text-primary hover:underline ml-auto"
            >
              Next Episode →
            </Link>
          )}
        </div>
        <EpisodeStructuredData tvShow={tvShow} season={season} episode={episode} params={params} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

