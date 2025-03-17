import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getDetails, getImageUrl, type TvDetails } from "@/lib/tmdb"
import MediaSection from "@/components/media-section"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShareButtons } from "@/components/share-buttons";
import TvStructuredData from "./structured-data"

interface TvPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: TvPageProps): Promise<Metadata> {
  try {
    const tvShow = (await getDetails("tv", params.id)) as TvDetails

    const firstAirYear = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : "Unknown"

    return {
      title: `${tvShow.name} (${firstAirYear}) | MovieWoods`,
      description: tvShow.overview || `Watch ${tvShow.name} on MovieWoods`,
      openGraph: {
        title: `${tvShow.name} (${firstAirYear})`,
        description: tvShow.overview || `Watch ${tvShow.name} on MovieWoods`,
        type: "video.tv_show",
        images: tvShow.backdrop_path ? [getImageUrl(tvShow.backdrop_path, "original")] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${tvShow.name} | MovieWoods`,
        description: tvShow.overview || `Watch ${tvShow.name} on MovieWoods`,
      },
      alternates: {
        canonical: `https://moviewoods.vercel.app/tv/${params.id}`,
      },
    }
  } catch (error) {
    return {
      title: "TV Show Not Found | MovieWoods",
      description: "The requested TV show could not be found.",
    }
  }
}

export default async function TvPage({ params }: TvPageProps) {
  try {
    const tvShow = (await getDetails("tv", params.id)) as TvDetails

    const creators = tvShow.credits.crew
      .filter((person) => person.job === "Creator" || person.job === "Executive Producer")
      .slice(0, 2)

    const firstAirYear = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : "Unknown"

    const rating = tvShow.vote_average ? Math.round(tvShow.vote_average * 10) / 10 : null

    return (
      <div>
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[50vh] md:h-[70vh] w-full">
            <Image
              src={getImageUrl(tvShow.backdrop_path, "original") || "/placeholder.svg"}
              alt={tvShow.name || "TV show backdrop"}
              fill
              priority
              className="object-cover"
              style={{ filter: "contrast(1.3) saturate(1.2) brightness(1.0) hue-rotate(0deg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />
          </div>
        </section>

        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            {/* Poster and Info */}
            <div className="relative aspect-[2/3] md:sticky md:top-20 h-fit">
              <Image
                src={getImageUrl(tvShow.poster_path, "w500") || "/placeholder.svg"}
                alt={tvShow.name || "TV show poster"}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {tvShow.name} <span className="text-muted-foreground">({firstAirYear})</span>
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {tvShow.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                {rating && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>{rating}/10</span>
                  </div>
                )}

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{tvShow.first_air_date || "Unknown first air date"}</span>
                </div>

                <div className="flex items-center">
                  <Tv className="h-4 w-4 mr-1" />
                  <span>
                    {tvShow.number_of_seasons} Season{tvShow.number_of_seasons !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-muted-foreground">{tvShow.overview || "No overview available."}</p>
              </div>
          <div className="flex justify-center">
          <ShareButtons
                url={`${process.env.NEXT_PUBLIC_APP_URL || "https://moviewoods.vercel.app"}/tvShow/${tvShow.id}`} />
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {creators.length > 0 && (
                  <div>
                    <h3 className="font-semibold">Creators</h3>
                    <p className="text-muted-foreground">{creators.map((creator) => creator.name).join(", ")}</p>
                  </div>
                )}

                {tvShow.credits.cast.length > 0 && (
                  <div>
                    <h3 className="font-semibold">Cast</h3>
                    <p className="text-muted-foreground">
                      {tvShow.credits.cast
                        .slice(0, 3)
                        .map((actor) => actor.name)
                        .join(", ")}
                      {tvShow.credits.cast.length > 3 && ", ..."}
                    </p>
                  </div>
                )}
              </div>

              {/* Seasons */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Seasons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {tvShow.seasons.map((season) => (
                    <Card key={season.id} className="overflow-hidden">
                      <div className="aspect-[2/3] relative">
                        <Image
                          src={getImageUrl(season.poster_path, "w300") || "/placeholder.svg"}
                          alt={season.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{season.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {season.episode_count} Episode{season.episode_count !== 1 ? "s" : ""}
                        </p>
                        <Button asChild className="w-full">
                          <Link href={`/tv/${tvShow.id}/season/${season.season_number}`}>Watch</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {tvShow.recommendations.results.length > 0 && (
            <MediaSection
              title="Recommended TV Shows"
              media={tvShow.recommendations.results.map((item) => ({ ...item, media_type: "tv" }))}
            />
          )}

          {/* Similar TV Shows */}
          {tvShow.similar.results.length > 0 && (
            <MediaSection
              title="Similar TV Shows"
              media={tvShow.similar.results.map((item) => ({ ...item, media_type: "tv" }))}
            />
          )}
        </div>
        <TvStructuredData tvShow={tvShow} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

