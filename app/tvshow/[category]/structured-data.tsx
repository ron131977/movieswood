import JsonLd from "@/components/json-ld"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

interface TvShowCategoryStructuredDataProps {
  category: string
}

export default function TvShowCategoryStructuredData({ category }: TvShowCategoryStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} TV Shows`,
    description: `Watch ${category} TV shows live on ${SITE_NAME}.`,
    url: `${SITE_URL}/tvshow/${encodeURIComponent(category)}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: `${category} TV Shows`,
    },
  }

  return <JsonLd data={structuredData} />
}

