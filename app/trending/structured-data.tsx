import JsonLd from "@/components/json-ld"

export default function TrendingStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Trending Movies and TV Shows",
    description: "Browse what's trending in movies and TV shows right now on MovieWoods.",
    url: "https://moviewoods.vercel.app/trending",
    isPartOf: {
      "@type": "WebSite",
      name: "MovieWoods",
      url: "https://moviewoods.vercel.app",
    },
  }

  return <JsonLd data={structuredData} />
}

