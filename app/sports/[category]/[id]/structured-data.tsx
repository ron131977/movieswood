import JsonLd from "@/components/json-ld"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

interface SportsDetailStructuredDataProps {
  category: string
  sportsId: string
  poster: string
  php?: string
  m3u8?: string
}

export default function SportsDetailStructuredData({
  category,
  sportsId,
  poster,
  php,
  m3u8,
}: SportsDetailStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${sportsId} - ${category} Live Sports`,
    description: `Watch ${category} on ${sportsId} live streaming on ${SITE_NAME}.`,
    uploadDate: new Date().toISOString(),
    thumbnailUrl: poster,
    contentUrl: `${SITE_URL}/sports/${encodeURIComponent(category)}/${sportsId}`,
    embedUrl: m3u8 || php,
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/sports/${encodeURIComponent(category)}/${sportsId}`,
      },
    },
  }

  return <JsonLd data={structuredData} />
}

