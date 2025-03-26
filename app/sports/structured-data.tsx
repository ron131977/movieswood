import JsonLd from "@/components/json-ld"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export default function SportsStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Live Sports",
    description: `Watch live sports on ${SITE_NAME}. Enjoy live coverage of various sports events.`,
    url: `${SITE_URL}/sports`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Live Sports Streaming",
    },
  }

  return <JsonLd data={structuredData} />
}

