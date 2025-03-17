import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchFromTMDB, getImageUrl } from "@/lib/tmdb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

interface SeasonPageProps {
  params: { id: string; seasonNumber: string }
}

export async function generateMetadata({ params }: SeasonPageProps): Promise<Metadata> {
  try {
    const tvShow = await fetchFromTMDB(`/tv/${params.id}`)
    const season = await fetchFromTMDB(`/tv/${params.id}/season/${params.seasonNumber}`)

    return {
      title: `${tvShow.name}: ${season.name} | MovieFlix`,
      description: season.overview || `Watch ${season.name} of ${tvShow.name} on MovieFlix`,
      openGraph: {
        title: `${tvShow.name}: ${season.name}`,
        description: season.overview || `Watch ${season.name} of ${tvShow.name} on MovieFlix`,
        type: "video.tv_show",
        images: season.poster_path ? [getImageUrl(season.poster_path, "original")] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${tvShow.name}: ${season.name} | MovieFlix`,
        description: season.overview || `Watch ${season.name} of ${tvShow.name} on MovieFlix`,
      },
      alternates: {
        canonical: `https://moviewoods.vercel.app/tv/${params.id}/season/${params.seasonNumber}`,
      },
    }
  } catch (error) {
    return {
      title: "Season Not Found | MovieFlix",
      description: "The requested season could not be found.",
    }
  }
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  try {
    const tvShow = await fetchFromTMDB(`/tv/${params.id}`)
    const season = await fetchFromTMDB(`/tv/${params.id}/season/${params.seasonNumber}`)

    return (
      <div className="container py-6">
        <div className="mb-6">
          <Link href={`/tv/${params.id}`} className="text-primary hover:underline">
            ← Back to {tvShow.name}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 mb-8">
          {/* Season Poster */}
          <div className="relative aspect-[2/3]">
            <Image
              src={getImageUrl(season.poster_path, "w500") || "/placeholder.svg"}
              alt={season.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{season.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{season.air_date || "Unknown air date"}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {season.episodes.length} Episode{season.episodes.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {season.overview && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-muted-foreground">{season.overview}</p>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        <div className="grid gap-4">
          {season.episodes.map((episode: any) => (
            <Card key={episode.id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
                <div className="relative aspect-video">
                  <Image
                    src={getImageUrl(episode.still_path, "w300") || "/placeholder.svg"}
                    alt={episode.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {episode.episode_number}. {episode.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{episode.air_date || "Unknown air date"}</p>
                    </div>
                    <Button asChild>
                      <Link href={`/tv/${params.id}/season/${params.seasonNumber}/episode/${episode.episode_number}`}>
                        Watch
                      </Link>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {episode.overview || "No overview available."}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

