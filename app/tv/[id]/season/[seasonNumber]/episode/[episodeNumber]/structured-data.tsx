import JsonLd from "@/components/json-ld"
import { getImageUrl } from "@/lib/tmdb"

interface EpisodeStructuredDataProps {
  tvShow: any
  season: any
  episode: any
  params: {
    id: string
    seasonNumber: string
    episodeNumber: string
  }
}

export default function EpisodeStructuredData({ tvShow, season, episode, params }: EpisodeStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    name: episode.name,
    episodeNumber: Number.parseInt(params.episodeNumber),
    seasonNumber: Number.parseInt(params.seasonNumber),
    url: `https://movieflix.vercel.app/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`,
    partOfSeries: {
      "@type": "TVSeries",
      name: tvShow.name,
      url: `https://movieflix.vercel.app/tv/${params.id}`,
    },
    partOfSeason: {
      "@type": "TVSeason",
      seasonNumber: Number.parseInt(params.seasonNumber),
      name: season.name,
      url: `https://movieflix.vercel.app/tv/${params.id}/season/${params.seasonNumber}`,
    },
    description: episode.overview,
    image: getImageUrl(episode.still_path, "w300"),
    datePublished: episode.air_date,
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://movieflix.vercel.app/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`,
      },
    },
    video: {
      "@type": "VideoObject",
      name: `${tvShow.name}: S${params.seasonNumber} E${params.episodeNumber} - ${episode.name}`,
      description: episode.overview || `Watch ${episode.name} from ${tvShow.name}`,
      thumbnailUrl: getImageUrl(episode.still_path, "w300"),
      uploadDate: episode.air_date || tvShow.first_air_date,
      contentUrl: `https://movieflix.vercel.app/tv/${params.id}/season/${params.seasonNumber}/episode/${params.episodeNumber}`,
    },
  }

  return <JsonLd data={structuredData} />
}

