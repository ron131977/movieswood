// import type { Metadata } from "next"
// import Image from "next/image"
// import { notFound } from "next/navigation"
// import { getAdultContentBySlug, getAllAdultContent, formatDate, formatDuration, formatViews } from "@/lib/adult-content"
// import AdultContentPlayer from "@/components/adult-content-player"
// import AdultContentSection from "@/components/adult-content-section"
// import { Badge } from "@/components/ui/badge"
// import { Calendar, Clock, Eye, User } from "lucide-react"
// import { SITE_NAME } from "@/lib/tmdb"

// interface AdultContentDetailPageProps {
//   params: { slug: string }
// }

// export async function generateMetadata({ params }: AdultContentDetailPageProps): Promise<Metadata> {
//   const content = getAdultContentBySlug(params.slug)

//   if (!content) {
//     return {
//       title: `Content Not Found | ${SITE_NAME}`,
//       description: "The requested content could not be found.",
//       robots: {
//         index: false,
//         follow: false,
//       },
//     }
//   }

//   return {
//     title: `${content.title} | ${SITE_NAME}`,
//     description: content.description,
//     openGraph: {
//       title: `${content.title} | ${SITE_NAME}`,
//       description: content.description,
//       type: "video.other",
//       images: [content.thumbnailUrl],
//     },
//     robots: {
//       index: false,
//       follow: false,
//     },
//   }
// }

// export default function AdultContentDetailPage({ params }: AdultContentDetailPageProps) {
//   const content = getAdultContentBySlug(params.slug)

//   if (!content) {
//     notFound()
//   }

//   // Get other adult content for recommendations
//   const otherContent = getAllAdultContent().filter((item) => item.id !== content.id)

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="relative">
//         <div className="relative h-[50vh] md:h-[70vh] w-full">
//           <Image
//             src={content.thumbnailUrl || "/placeholder.svg"}
//             alt={content.title}
//             fill
//             priority
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />
//         </div>
//       </section>

//       <div className="container py-6">
//         <div className="mb-8">
//           <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
//             <h1 className="text-3xl md:text-4xl font-bold">{content.title}</h1>
//           </div>

//           <div className="flex flex-wrap gap-2 mb-4">
//             <Badge variant="secondary" className="bg-red-500 text-white">
//               Adult
//             </Badge>
//             <Badge variant="secondary">{content.category}</Badge>
//           </div>

//           <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
//             <div className="flex items-center">
//               <Calendar className="h-4 w-4 mr-1" />
//               <span>{formatDate(content.releaseDate)}</span>
//             </div>

//             <div className="flex items-center">
//               <Clock className="h-4 w-4 mr-1" />
//               <span>{formatDuration(content.duration)}</span>
//             </div>

//             <div className="flex items-center">
//               <Eye className="h-4 w-4 mr-1" />
//               <span>{formatViews(content.views)} views</span>
//             </div>

//             <div className="flex items-center">
//               <User className="h-4 w-4 mr-1" />
//               <span>Director: {content.director}</span>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-2">Overview</h2>
//             <p className="text-muted-foreground">{content.description}</p>
//           </div>

//           {/* Video Player */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4">Watch {content.title}</h2>
//             <AdultContentPlayer
//               title={content.title}
//               videoUrl={content.videoUrl}
//               videoUrl1={content.videoUrl1}
//               videoUrl2={content.videoUrl2}
//             />
//           </div>
//         </div>

//         {/* Recommendations */}
//         <AdultContentSection title="More Adult Content" content={otherContent} viewAllHref="/adult" />
//       </div>
//     </div>
//   )
// }




import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAdultContentBySlug, getAllAdultContent, formatDate, formatDuration, formatViews } from "@/lib/adult-content"
import AdultContentPlayer from "@/components/adult-content-player"
import AdultContentSection from "@/components/adult-content-section"
import SocialShare from "@/components/social-share"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Eye, User } from 'lucide-react'
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

interface AdultContentDetailPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: AdultContentDetailPageProps): Promise<Metadata> {
  const content = getAdultContentBySlug(params.slug)

  if (!content) {
    return {
      title: `Content Not Found | ${SITE_NAME}`,
      description: "The requested content could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${content.title} | ${SITE_NAME}`,
    description: content.description,
    openGraph: {
      title: `${content.title} | ${SITE_NAME}`,
      description: content.description,
      type: "video.other",
      images: [content.thumbnailUrl],
    },
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default function AdultContentDetailPage({ params }: AdultContentDetailPageProps) {
  const content = getAdultContentBySlug(params.slug)

  if (!content) {
    notFound()
  }

  // Get other adult content for recommendations
  const otherContent = getAllAdultContent().filter((item) => item.id !== content.id)
  
  const pageUrl = `${SITE_URL}/adult/${params.slug}`
  const shareTitle = `${content.title} | ${SITE_NAME}`

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[50vh] md:h-[70vh] w-full">
          <Image
            src={content.thumbnailUrl || "/placeholder.svg"}
            alt={content.title}
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
              src={content.thumbnailUrl || "/placeholder.svg"}
              alt={content.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                {content.title}
              </h1>
              <SocialShare url={pageUrl} title={shareTitle} description={content.description} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-red-500 text-white">
                Adult
              </Badge>
              <Badge variant="secondary">{content.category}</Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(content.releaseDate)}</span>
              </div>

              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDuration(content.duration)}</span>
              </div>

              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{formatViews(content.views)} views</span>
              </div>

              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Director: {content.director}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground">{content.description}</p>
            </div>

            {/* Video Player */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Watch {content.title}</h2>
              <AdultContentPlayer
                title={content.title}
                videoUrl={content.videoUrl}
                videoUrl1={content.videoUrl1}
                videoUrl2={content.videoUrl2}
              />
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <AdultContentSection title="More Adult Content" content={otherContent} viewAllHref="/adult" />
      </div>
    </div>
  )
}
