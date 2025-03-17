import JsonLd from "@/components/json-ld"

export default function HomeStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MovieWoods",
    url: "https://moviewoods.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://moviewoods.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return <JsonLd data={structuredData} />
}

