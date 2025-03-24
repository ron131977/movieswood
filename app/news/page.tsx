import type { Metadata } from "next"
import { getAllNews } from "@/lib/live-broadcast"
import NewsCard from "@/components/news-card"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: `Live News | ${SITE_NAME}`,
  description: `Watch live news channels on ${SITE_NAME}.`,
  openGraph: {
    title: `Live News | ${SITE_NAME}`,
    description: `Watch live news channels on ${SITE_NAME}.`,
    url: `${SITE_URL}/news`,
    siteName: SITE_NAME,
    type: "website",
  },
}

export default function NewsPage() {
  const newsChannels = getAllNews()

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Live News Channels</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {newsChannels.map((channel) => (
          <NewsCard key={channel.id} news={channel} />
        ))}
      </div>
    </div>
  )
}

