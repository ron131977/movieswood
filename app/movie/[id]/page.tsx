// import type { Metadata } from "next"
// import Image from "next/image"
// import { notFound } from "next/navigation"
// import { getDetails, getImageUrl, getMovieStreamingUrls, type MovieDetails, SITE_NAME, SITE_URL } from "@/lib/tmdb"
// import MultiSourcePlayer from "@/components/multi-source-player"
// import SocialShare from "@/components/social-share"
// import MediaSection from "@/components/media-section"
// import { Badge } from "@/components/ui/badge"
// import { Clock, Calendar, Star } from "lucide-react"
// import MovieStructuredData from "./structured-data"

// interface MoviePageProps {
//   params: { id: string }
// }

// export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
//   try {
//     const movie = (await getDetails("movie", params.id)) as MovieDetails

//     return {
//       title: `${movie.title} (${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}) | ${SITE_NAME}`,
//       description: movie.overview || `Watch ${movie.title} on ${SITE_NAME}`,
//       openGraph: {
//         title: `${movie.title} (${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"})`,
//         description: movie.overview || `Watch ${movie.title} on ${SITE_NAME}`,
//         type: "video.movie",
//         images: movie.backdrop_path ? [getImageUrl(movie.backdrop_path, "original")] : [],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: `${movie.title} | ${SITE_NAME}`,
//         description: movie.overview || `Watch ${movie.title} on ${SITE_NAME}`,
//       },
//       alternates: {
//         canonical: `${SITE_URL}/movie/${params.id}`,
//       },
//     }
//   } catch (error) {
//     return {
//       title: `Movie Not Found | ${SITE_NAME}`,
//       description: "The requested movie could not be found.",
//     }
//   }
// }

// export default async function MoviePage({ params }: MoviePageProps) {
//   try {
//     const movie = (await getDetails("movie", params.id)) as MovieDetails
//     const streamingUrls = getMovieStreamingUrls(params.id)

//     // Create video sources array
//     const videoSources = [
//       { id: "vidsrcCc", name: "VidSrc.cc", url: streamingUrls.vidsrcCc },
//       { id: "vidsrcXyz", name: "VidSrc.xyz", url: streamingUrls.vidsrcXyz },
//       { id: "embedCc", name: "2Embed.cc", url: streamingUrls.embedCc },
//     ]

//     const director = movie.credits.crew.find((person) => person.job === "Director")
//     const writers = movie.credits.crew
//       .filter((person) => person.job === "Screenplay" || person.job === "Writer" || person.job === "Story")
//       .slice(0, 2)

//     const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"
//     const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "Unknown"
//     const rating = movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : null

//     const pageUrl = `${SITE_URL}/movie/${params.id}`
//     const shareTitle = `${movie.title} (${releaseYear}) | ${SITE_NAME}`

//     return (
//       <div>
//         {/* Hero Section */}
//         <section className="relative">
//           <div className="relative h-[50vh] md:h-[70vh] w-full">
//             <Image
//               src={getImageUrl(movie.backdrop_path, "original") || "/placeholder.svg"}
//               alt={movie.title || "Movie backdrop"}
//               fill
//               priority
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />
//           </div>
//         </section>

//         <div className="container py-6">
//           <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
//             {/* Poster and Info */}
//             <div className="relative aspect-[2/3] md:sticky md:top-20 h-fit">
//               <Image
//                 src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
//                 alt={movie.title || "Movie poster"}
//                 fill
//                 className="rounded-lg object-cover"
//               />
//             </div>

//             <div>
//               <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
//                 <h1 className="text-3xl md:text-4xl font-bold">
//                   {movie.title} <span className="text-muted-foreground">({releaseYear})</span>
//                 </h1>
//                 <SocialShare url={pageUrl} title={shareTitle} description={movie.overview} />
//               </div>

//               <div className="flex flex-wrap gap-2 mb-4">
//                 {movie.genres.map((genre) => (
//                   <Badge key={genre.id} variant="secondary">
//                     {genre.name}
//                   </Badge>
//                 ))}
//               </div>

//               <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
//                 {rating && (
//                   <div className="flex items-center">
//                     <Star className="h-4 w-4 mr-1 text-yellow-500" />
//                     <span>{rating}/10</span>
//                   </div>
//                 )}

//                 <div className="flex items-center">
//                   <Calendar className="h-4 w-4 mr-1" />
//                   <span>{movie.release_date || "Unknown release date"}</span>
//                 </div>

//                 <div className="flex items-center">
//                   <Clock className="h-4 w-4 mr-1" />
//                   <span>{runtime}</span>
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-2">Overview</h2>
//                 <p className="text-muted-foreground">{movie.overview || "No overview available."}</p>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//                 {director && (
//                   <div>
//                     <h3 className="font-semibold">Director</h3>
//                     <p className="text-muted-foreground">{director.name}</p>
//                   </div>
//                 )}

//                 {writers.length > 0 && (
//                   <div>
//                     <h3 className="font-semibold">Writers</h3>
//                     <p className="text-muted-foreground">{writers.map((writer) => writer.name).join(", ")}</p>
//                   </div>
//                 )}

//                 {movie.credits.cast.length > 0 && (
//                   <div>
//                     <h3 className="font-semibold">Cast</h3>
//                     <p className="text-muted-foreground">
//                       {movie.credits.cast
//                         .slice(0, 3)
//                         .map((actor) => actor.name)
//                         .join(", ")}
//                       {movie.credits.cast.length > 3 && ", ..."}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Video Player */}
//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-4">Watch {movie.title}</h2>
//                 {/* <p>Check Other Player also</p> */}
//                 <MultiSourcePlayer sources={videoSources} title={movie.title || "Movie"} />
//               </div>
//             </div>
         
//           </div>
        
//           {/* Recommendations */}
//           {movie.recommendations.results.length > 0 && (
//             <MediaSection
//               title="Recommended Movies"
//               media={movie.recommendations.results.map((item) => ({ ...item, media_type: "movie" }))}
//             />
//           )}

//           {/* Similar Movies */}
//           {movie.similar.results.length > 0 && (
//             <MediaSection
//               title="Similar Movies"
//               media={movie.similar.results.map((item) => ({ ...item, media_type: "movie" }))}
//             />
//           )}
//         </div>
//         <MovieStructuredData movie={movie} />
//       </div>
//     )
//   } catch (error) {
//     notFound()
//   }
// }













// import type { Metadata } from "next"
// import Image from "next/image"
// import { notFound } from "next/navigation"
// import {
//   getDetails,
//   getImageUrl,
//   getMovieStreamingUrls,
//   getTrending,
//   type MovieDetails,
//   SITE_NAME,
//   SITE_URL,
// } from "@/lib/tmdb"
// import MultiSourcePlayer from "@/components/multi-source-player"
// import SocialShare from "@/components/social-share"
// import MediaSection from "@/components/media-section"
// import { Badge } from "@/components/ui/badge"
// import { Clock, Calendar, Star } from "lucide-react"
// import MovieStructuredData from "./structured-data"

// interface MoviePageProps {
//   params: { id: string }
// }

// export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
//   try {
//     const movie = (await getDetails("movie", params.id)) as MovieDetails

//     return {
//       title: `${movie.title} (${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}) | ${SITE_NAME}`,
//       description: movie.overview || `Watch ${movie.title} on ${SITE_NAME}`,
//       openGraph: {
//         title: `${movie.title} (${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"})`,
//         description: movie.overview || `Watch ${movie.title} on ${SITE_NAME}`,
//         type: "video.movie",
//         images: movie.backdrop_path ? [getImageUrl(movie.backdrop_path, "original")] : [],
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: `${movie.title} | ${SITE_NAME}`,
//         description: movie.overview || `Watch ${movie.title} on ${SITE_NAME}`,
//       },
//       alternates: {
//         canonical: `${SITE_URL}/movie/${params.id}`,
//       },
//     }
//   } catch (error) {
//     return {
//       title: `Movie Not Found | ${SITE_NAME}`,
//       description: "The requested movie could not be found.",
//     }
//   }
// }

// export default async function MoviePage({ params }: MoviePageProps) {
//   try {
//     const movie = (await getDetails("movie", params.id)) as MovieDetails
//     const streamingUrls = getMovieStreamingUrls(params.id)

//     // Fetch trending movies
//     const trendingMoviesData = await getTrending("movie", "day")
//     const trendingMovies = trendingMoviesData.results.map((item: any) => ({ ...item, media_type: "movie" }))

//     // Create video sources array
//     const videoSources = [
//       { id: "vidsrcCc", name: "Player 1", url: streamingUrls.vidsrcCc },
//       { id: "vidsrcMe", name: "Player 2", url: streamingUrls.vidsrcMe },
//       { id: "embedCc", name: "Player 3", url: streamingUrls.embedCc },
//     ]

//     const director = movie.credits.crew.find((person) => person.job === "Director")
//     const writers = movie.credits.crew
//       .filter((person) => person.job === "Screenplay" || person.job === "Writer" || person.job === "Story")
//       .slice(0, 2)

//     const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"
//     const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "Unknown"
//     const rating = movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : null

//     const pageUrl = `${SITE_URL}/movie/${params.id}`
//     const shareTitle = `${movie.title} (${releaseYear}) | ${SITE_NAME}`

//     return (
//       <div>
//         {/* Hero Section */}
//         <section className="relative">
//           <div className="relative h-[50vh] md:h-[70vh] w-full">
//             <Image
//               src={getImageUrl(movie.backdrop_path, "original") || "/placeholder.svg"}
//               alt={movie.title || "Movie backdrop"}
//               fill
//               priority
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />
//           </div>
//         </section>

//         <div className="container py-6">
//           <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
//             {/* Poster and Info */}
//             <div className="relative aspect-[2/3] md:sticky md:top-20 h-fit">
//               <Image
//                 src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
//                 alt={movie.title || "Movie poster"}
//                 fill
//                 className="rounded-lg object-cover"
//               />
//             </div>

//             <div>
//               <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
//                 <h1 className="text-3xl md:text-4xl font-bold">
//                   {movie.title} <span className="text-muted-foreground">({releaseYear})</span>
//                 </h1>
//                 <SocialShare url={pageUrl} title={shareTitle} description={movie.overview} />
//               </div>

//               <div className="flex flex-wrap gap-2 mb-4">
//                 {movie.genres.map((genre) => (
//                   <Badge key={genre.id} variant="secondary">
//                     {genre.name}
//                   </Badge>
//                 ))}
//               </div>

//               <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
//                 {rating && (
//                   <div className="flex items-center">
//                     <Star className="h-4 w-4 mr-1 text-yellow-500" />
//                     <span>{rating}/10</span>
//                   </div>
//                 )}

//                 <div className="flex items-center">
//                   <Calendar className="h-4 w-4 mr-1" />
//                   <span>{movie.release_date || "Unknown release date"}</span>
//                 </div>

//                 <div className="flex items-center">
//                   <Clock className="h-4 w-4 mr-1" />
//                   <span>{runtime}</span>
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-2">Overview</h2>
//                 <p className="text-muted-foreground">{movie.overview || "No overview available."}</p>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//                 {director && (
//                   <div>
//                     <h3 className="font-semibold">Director</h3>
//                     <p className="text-muted-foreground">{director.name}</p>
//                   </div>
//                 )}

//                 {writers.length > 0 && (
//                   <div>
//                     <h3 className="font-semibold">Writers</h3>
//                     <p className="text-muted-foreground">{writers.map((writer) => writer.name).join(", ")}</p>
//                   </div>
//                 )}

//                 {movie.credits.cast.length > 0 && (
//                   <div>
//                     <h3 className="font-semibold">Cast</h3>
//                     <p className="text-muted-foreground">
//                       {movie.credits.cast
//                         .slice(0, 3)
//                         .map((actor) => actor.name)
//                         .join(", ")}
//                       {movie.credits.cast.length > 3 && ", ..."}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Video Player */}
//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-4">Watch {movie.title}</h2>
//                 <MultiSourcePlayer sources={videoSources} title={movie.title || "Movie"} />
//               </div>
//             </div>
//           </div>

//           {/* Trending Movies Section */}
//           <MediaSection title="Trending Movies" media={trendingMovies} viewAllHref="/trending?tab=movies" />

//           {/* Recommendations Section - Keep if available */}
//           {movie.recommendations.results.length > 0 && (
//             <MediaSection
//               title="Recommended Movies"
//               media={movie.recommendations.results.map((item) => ({ ...item, media_type: "movie" }))}
//             />
//           )}
//         </div>
//         <MovieStructuredData movie={movie} />
//       </div>
//     )
//   } catch (error) {
//     notFound()
//   }
// }























import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  getDetails,
  getImageUrl,
  getMovieStreamingUrls,
  getTrending,
  type MovieDetails,
  SITE_NAME,
  SITE_URL,
} from "@/lib/tmdb"
import MultiSourcePlayer from "@/components/multi-source-player"
import SocialShare from "@/components/social-share"
import MediaSection from "@/components/media-section"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Star } from "lucide-react"
import MovieStructuredData from "./structured-data"

interface MoviePageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  try {
    const movie = (await getDetails("movie", params.id)) as MovieDetails

    return {
      title: `${movie.title} (${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}) | ${SITE_NAME}`,
      description: movie.overview || `Watch ${movie.title} on ${SITE_NAME}`,
      openGraph: {
        title: `${movie.title} (${movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"})`,
        description: movie.overview || `Watch ${movie.title} on ${SITE_NAME}`,
        type: "video.movie",
        images: movie.backdrop_path ? [getImageUrl(movie.backdrop_path, "original")] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${movie.title} | ${SITE_NAME}`,
        description: movie.overview || `Watch ${movie.title} on ${SITE_NAME}`,
      },
      alternates: {
        canonical: `${SITE_URL}/movie/${params.id}`,
      },
    }
  } catch (error) {
    return {
      title: `Movie Not Found | ${SITE_NAME}`,
      description: "The requested movie could not be found.",
    }
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  try {
    const movie = (await getDetails("movie", params.id)) as MovieDetails
    const streamingUrls = getMovieStreamingUrls(params.id)

    // Fetch trending movies
    const trendingMoviesData = await getTrending("movie", "day")
    const trendingMovies = trendingMoviesData.results.map((item: any) => ({ ...item, media_type: "movie" }))

    // Create video sources array
    const videoSources = [
      { id: "vidsrcCc", name: "Player 1", url: streamingUrls.vidsrcCc },
      { id: "vidsrcMe", name: "Player 2", url: streamingUrls.vidsrcMe },
      { id: "embedCc", name: "Player 3", url: streamingUrls.embedCc },
    ]

    const director = movie.credits.crew.find((person) => person.job === "Director")
    const writers = movie.credits.crew
      .filter((person) => person.job === "Screenplay" || person.job === "Writer" || person.job === "Story")
      .slice(0, 2)

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "Unknown"
    const rating = movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : null

    const pageUrl = `${SITE_URL}/movie/${params.id}`
    const shareTitle = `${movie.title} (${releaseYear}) | ${SITE_NAME}`

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
              />
            </div>

            <div>
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {movie.title} <span className="text-muted-foreground">({releaseYear})</span>
                </h1>
                <SocialShare url={pageUrl} title={shareTitle} description={movie.overview} />
              </div>

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
                <MultiSourcePlayer sources={videoSources} title={movie.title || "Movie"} />
              </div>
            </div>
          </div>

          {/* Trending Movies Section */}
          <MediaSection title="Trending Movies" media={trendingMovies} viewAllHref="/trending?tab=movies" />

          {/* Recommendations Section - Keep if available */}
          {movie.recommendations.results.length > 0 && (
            <MediaSection
              title="Recommended Movies"
              media={movie.recommendations.results.map((item) => ({ ...item, media_type: "movie" }))}
            />
          )}
        </div>
        <MovieStructuredData movie={movie}  />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

