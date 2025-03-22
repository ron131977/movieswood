import JsonLd from "@/components/json-ld"
import { getImageUrl, type MovieDetails } from "@/lib/tmdb"

export default function MovieStructuredData({ movie }: { movie: MovieDetails }) {
  const director = movie.credits.crew.find((person) => person.job === "Director")
  const actors = movie.credits.cast.slice(0, 5).map((actor) => ({
    "@type": "Person",
    name: actor.name,
    url: `https://www.themoviedb.org/person/${actor.id}`,
    image: actor.profile_path ? getImageUrl(actor.profile_path, "w185") : undefined,
  }))

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
    description: movie.overview,
    image: getImageUrl(movie.poster_path, "w500"),
    url: `https://movieswood.vercel.app/movie/${movie.id}`,
    datePublished: movie.release_date,
    director: director
      ? {
          "@type": "Person",
          name: director.name,
          url: `https://www.themoviedb.org/person/${director.id}`,
          image: director.profile_path ? getImageUrl(director.profile_path, "w185") : undefined,
        }
      : undefined,
    actor: actors,
    duration: movie.runtime ? `PT${movie.runtime}M` : undefined,
    aggregateRating: movie.vote_average
      ? {
          "@type": "AggregateRating",
          ratingValue: movie.vote_average,
          bestRating: "10",
          worstRating: "0",
          ratingCount: movie.vote_count,
        }
      : undefined,
    genre: movie.genres.map((genre) => genre.name),
    contentRating: "PG-13",
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://movieswood.vercel.app/movie/${movie.id}`,
      },
    },
    trailer: movie.videos?.results?.find((v) => v.type === "Trailer")
      ? {
          "@type": "VideoObject",
          name: `${movie.title} Trailer`,
          description: `Watch the trailer for ${movie.title}`,
          thumbnailUrl: getImageUrl(movie.backdrop_path, "w780"),
          // uploadDate: movie.release_date,
          uploadDate: `${movie.release_date}T00:00:00Z`,  
          embedUrl: `https://www.youtube.com/embed/${movie.videos.results.find((v) => v.type === "Trailer")?.key}`,
        }
      : undefined,
  }

  return <JsonLd data={structuredData} />
}

