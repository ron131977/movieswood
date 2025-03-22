import JsonLd from "@/components/json-ld"
import { getImageUrl, type TvDetails } from "@/lib/tmdb"

export default function TvStructuredData({ tvShow }: { tvShow: TvDetails }) {
  const creators = tvShow.credits.crew
    .filter((person) => person.job === "Creator" || person.job === "Executive Producer")
    .slice(0, 2)
    .map((creator) => ({
      "@type": "Person",
      name: creator.name,
      url: `https://www.themoviedb.org/person/${creator.id}`,
      image: creator.profile_path ? getImageUrl(creator.profile_path, "w185") : undefined,
    }))

  const actors = tvShow.credits.cast.slice(0, 5).map((actor) => ({
    "@type": "Person",
    name: actor.name,
    url: `https://www.themoviedb.org/person/${actor.id}`,
    image: actor.profile_path ? getImageUrl(actor.profile_path, "w185") : undefined,
  }))

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: tvShow.name,
    description: tvShow.overview,
    image: getImageUrl(tvShow.poster_path, "w500"),
    url: `https://movieswood.vercel.app/tv/${tvShow.id}`,
    datePublished: tvShow.first_air_date,
    creator: creators.length > 0 ? creators : undefined,
    actor: actors,
    numberOfEpisodes: tvShow.number_of_episodes,
    numberOfSeasons: tvShow.number_of_seasons,
    aggregateRating: tvShow.vote_average
      ? {
          "@type": "AggregateRating",
          ratingValue: tvShow.vote_average,
          bestRating: "10",
          worstRating: "0",
          ratingCount: tvShow.vote_count,
        }
      : undefined,
    genre: tvShow.genres.map((genre) => genre.name),
    contentRating: "TV-14",
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://movieswood.vercel.app/tv/${tvShow.id}`,
      },
    },
    season: tvShow.seasons.map((season) => ({
      "@type": "TVSeason",
      seasonNumber: season.season_number,
      name: season.name,
      numberOfEpisodes: season.episode_count,
      url: `https://movieswood.vercel.app/tv/${tvShow.id}/season/${season.season_number}`,
      image: season.poster_path ? getImageUrl(season.poster_path, "w300") : undefined,
    })),
    trailer: tvShow.videos?.results?.find((v) => v.type === "Trailer")
      ? {
          "@type": "VideoObject",
          name: `${tvShow.name} Trailer`,
          description: `Watch the trailer for ${tvShow.name}`,
          thumbnailUrl: getImageUrl(tvShow.backdrop_path, "w780"),
          // uploadDate: tvShow.first_air_date,
          uploadDate: `${tvShow.first_air_date}T00:00:00Z`,
          embedUrl: `https://www.youtube.com/embed/${tvShow.videos.results.find((v) => v.type === "Trailer")?.key}`,
        }
      : undefined,
  }

  return <JsonLd data={structuredData} />
}

