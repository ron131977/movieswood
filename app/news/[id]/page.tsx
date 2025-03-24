import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNewsById } from "@/lib/live-broadcast"
import M3u8Player from "@/components/m3u8-player"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

interface NewsDetailPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const news = getNewsById(params.id)

  if (!news) {
    return {
      title: `Channel Not Found | ${SITE_NAME}`,
      description: "The requested news channel could not be found.",
    }
  }

  return {
    title: `${params.id.toUpperCase()} Live | ${SITE_NAME}`,
    description: `Watch ${params.id.toUpperCase()} live on ${SITE_NAME}.`,
    openGraph: {
      title: `${params.id.toUpperCase()} Live | ${SITE_NAME}`,
      description: `Watch ${params.id.toUpperCase()} live on ${SITE_NAME}.`,
      url: `${SITE_URL}/news/${params.id}`,
      siteName: SITE_NAME,
      type: "video.other",
    },
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const news = getNewsById(params.id)

  if (!news) {
    notFound()
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">{params.id.toUpperCase()} Live</h1>

      <div className="mb-8">
        <M3u8Player src={news.m3u8} poster={news.poster} title={params.id.toUpperCase()} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About {params.id.toUpperCase()}</h2>
        <p className="text-muted-foreground">
          Watch {params.id.toUpperCase()} live streaming. This channel provides the latest news and updates from around
          the world.
        </p>
      </div>
    </div>
  )
}

