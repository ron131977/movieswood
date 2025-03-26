import type { Metadata } from "next"
import { getAllAdultContent } from "@/lib/adult-content"
import AdultContentCard from "@/components/adult-content-card"
import Search from "@/components/header1"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: `Adult Content | ${SITE_NAME}`,
  description: `Browse adult content on ${SITE_NAME}.`,
  openGraph: {
    title: `Adult Content | ${SITE_NAME}`,
    description: `Browse adult content on ${SITE_NAME}.`,
    url: `${SITE_URL}/adult`,
    siteName: SITE_NAME,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AdultContentPage() {
  const adultContent = getAllAdultContent()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

  
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Adult Content</h1>

      <div className="mb-6">
        <p className="text-muted-foreground">
          This section contains adult content. By proceeding, you confirm that you are at least 18 years old and agree
          to view adult content. This section features publicly available Adult content sourced from internet searches. We do not host, produce, or promote any videos on this platform.
        </p>
      </div>
 <div className="flex justify-center items-center mt-10">
         <Search />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-10">
        {adultContent.map((content) => (
          <AdultContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  )
}

