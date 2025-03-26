import JsonLd from "@/components/json-ld"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

interface TvShowDetailStructuredDataProps {
  tvShowId: string
  category: string
  poster: string
  php?: string
  m3u8?: string
}

export default function TvShowDetailStructuredData({
  tvShowId,
  category,
  poster,
  php,
  m3u8,
}: TvShowDetailStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${tvShowId} - ${category} Live TV`,
    description: `Watch ${tvShowId} from ${category} category live streaming on ${SITE_NAME}.`,
    uploadDate: new Date().toISOString(),
    thumbnailUrl: poster,
    contentUrl: `${SITE_URL}/tvshow/${encodeURIComponent(category)}/${tvShowId}`,
    embedUrl: m3u8 || php,
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/tvshow/${encodeURIComponent(category)}/${tvShowId}`,
      },
    },
  }

  return <JsonLd data={structuredData} />
}

