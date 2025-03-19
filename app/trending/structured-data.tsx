import JsonLd from "@/components/json-ld"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export default function TrendingStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Trending Movies and TV Shows",
    description: `Browse what's trending in movies and TV shows right now on ${SITE_NAME}.`,
    url: `${SITE_URL}/trending`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  return <JsonLd data={structuredData} />
}

