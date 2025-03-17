import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getDetails, getImageUrl, getMovieStreamingUrl, type MovieDetails } from "@/lib/tmdb"
import IframePlayer from "@/components/iframe-player"
import MediaSection from "@/components/media-section"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons";
import { Clock, Calendar, Star } from "lucide-react"
import MovieStructuredData from "./structured-data"

interface MoviePageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  try {
    const movie = (await getDetails("movie", params.id)) as MovieDetails

    return {
      title: `${movie.title} (${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}) | MovieWoods`,
      description: movie.overview || `Watch ${movie.title} on MovieWoods`,
      openGraph: {
        title: `${movie.title} (${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"})`,
        description: movie.overview || `Watch ${movie.title} on MovieWoods`,
        type: "video.movie",
        images: movie.backdrop_path ? [getImageUrl(movie.backdrop_path, "original")] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${movie.title} | MovieWoods`,
        description: movie.overview || `Watch ${movie.title} on MovieWoods`,
      },
      alternates: {
        canonical: `https://moviewoods.vercel.app/movie/${params.id}`,
      },
    }
  } catch (error) {
    return {
      title: "Movie Not Found | MovieWoods",
      description: "The requested movie could not be found.",
    }
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  try {
    const movie = (await getDetails("movie", params.id)) as MovieDetails
    const streamingUrl = getMovieStreamingUrl(params.id)

    const director = movie.credits.crew.find((person) => person.job === "Director")
    const writers = movie.credits.crew
      .filter((person) => person.job === "Screenplay" || person.job === "Writer" || person.job === "Story")
      .slice(0, 2)

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"

    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "Unknown"

    const rating = movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : null

    return (
      <div>
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[50vh] md:h-[70vh] w-full">
            <Image
              src={getImageUrl(movie.backdrop_path, "original") || "/placeholder.svg"}
              alt={movie.title || "Movie backdrop"}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />
          </div>
        </section>

        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            {/* Poster and Info */}
            <div className="relative aspect-[2/3] md:sticky md:top-20 h-fit">
              <Image
                src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
                alt={movie.title || "Movie poster"}
                fill
                className="rounded-lg object-cover"
                style={{ filter: "contrast(1.3) saturate(1.2) brightness(1.0) hue-rotate(0deg)" }}
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {movie.title} <span className="text-muted-foreground">({releaseYear})</span>
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
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
                  <span>{movie.release_date || "Unknown release date"}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{runtime}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-muted-foreground">{movie.overview || "No overview available."}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {director && (
                  <div>
                    <h3 className="font-semibold">Director</h3>
                    <p className="text-muted-foreground">{director.name}</p>
                  </div>
                )}

                {writers.length > 0 && (
                  <div>
                    <h3 className="font-semibold">Writers</h3>
                    <p className="text-muted-foreground">{writers.map((writer) => writer.name).join(", ")}</p>
                  </div>
                )}

                {movie.credits.cast.length > 0 && (
                  <div>
                    <h3 className="font-semibold">Cast</h3>
                    <p className="text-muted-foreground">
                      {movie.credits.cast
                        .slice(0, 3)
                        .map((actor) => actor.name)
                        .join(", ")}
                      {movie.credits.cast.length > 3 && ", ..."}
                    </p>
                  </div>
                )}
              </div>

              {/* Video Player */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Watch {movie.title}</h2>
                <IframePlayer src={streamingUrl} title={movie.title || "Movie"} />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <ShareButtons
              url={`${process.env.NEXT_PUBLIC_APP_URL || "https://moviewoods.vercel.app"}/movie/${movie.id}`}
              title={movie.title}
              description={movie.overview || "Watch this movie on MovieWoods"}
            />
        </div>
            {/* Recommendations */}
            {movie.recommendations.results.length > 0 && (
              <MediaSection
                title="Recommended Movies"
                media={movie.recommendations.results.map((item) => ({ ...item, media_type: "movie" }))}
              />
            )}

            {/* Similar Movies */}
            {movie.similar.results.length > 0 && (
              <MediaSection
                title="Similar Movies"
                media={movie.similar.results.map((item) => ({ ...item, media_type: "movie" }))}
              />
            )}
          </div>
          <MovieStructuredData movie={movie} />
        </div>
        )
  } catch (error) {
          notFound()
        }
}

