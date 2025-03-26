import JsonLd from "@/components/json-ld"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export default function TvShowStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Live TV Shows",
    description: `Watch live TV shows on ${SITE_NAME}. Enjoy your favorite channels streaming live.`,
    url: `${SITE_URL}/tvshow`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Live TV Streaming",
    },
  }

  return <JsonLd data={structuredData} />
}

