// import type { Metadata } from "next"
// import { notFound } from "next/navigation"
// import { getTvShowById } from "@/lib/live-broadcast"
// import IframeEmbedPlayer from "@/components/iframe-embed-player"
// import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

// interface TvShowDetailPageProps {
//   params: { id: string }
// }

// export async function generateMetadata({ params }: TvShowDetailPageProps): Promise<Metadata> {
//   const tvShow = getTvShowById(params.id)

//   if (!tvShow) {
//     return {
//       title: `Channel Not Found | ${SITE_NAME}`,
//       description: "The requested TV channel could not be found.",
//     }
//   }

//   return {
//     title: `${params.id} Live | ${SITE_NAME}`,
//     description: `Watch ${params.id} live on ${SITE_NAME}.`,
//     openGraph: {
//       title: `${params.id} Live | ${SITE_NAME}`,
//       description: `Watch ${params.id} live on ${SITE_NAME}.`,
//       url: `${SITE_URL}/tvshow/${params.id}`,
//       siteName: SITE_NAME,
//       type: "video.other",
//     },
//   }
// }

// export default function TvShowDetailPage({ params }: TvShowDetailPageProps) {
//   const tvShow = getTvShowById(params.id)
//   const tvShow = getTvShowById(params.name)

//   if (!tvShow) {
//     notFound()
//   }

//   return (
//     <div className="container py-6">
//       <h1 className="text-3xl font-bold mb-6">{params.id} Live</h1>

//       <div className="mb-8">
//         <IframeEmbedPlayer src={tvShow.php} title={params.name} />
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">About {params.name}</h2>
//         <p className="text-muted-foreground">
//           Watch {params.id} live streaming. This channel provides entertainment content for viewers of all ages.
//         </p>
//       </div>
//     </div>
//   )
// }



import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTvShowById } from "@/lib/live-broadcast";
import IframeEmbedPlayer from "@/components/iframe-embed-player";
import { SITE_NAME, SITE_URL } from "@/lib/tmdb";

interface TvShowDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: TvShowDetailPageProps): Promise<Metadata> {
  const tvShow = getTvShowById(params.id);

  if (!tvShow) {
    return {
      title: `Channel Not Found | ${SITE_NAME}`,
      description: "The requested TV channel could not be found.",
    };
  }

  return {
    title: `${tvShow.name} Live | ${SITE_NAME}`,
    description: `Watch ${tvShow.name} live on ${SITE_NAME}.`,
    openGraph: {
      title: `${tvShow.name} Live | ${SITE_NAME}`,
      description: `Watch ${tvShow.name} live on ${SITE_NAME}.`,
      url: `${SITE_URL}/tvshow/${params.id}`,
      siteName: SITE_NAME,
      type: "video.other",
    },
  };
}

export default function TvShowDetailPage({ params }: TvShowDetailPageProps) {
  const tvShow = getTvShowById(params.id);

  if (!tvShow) {
    notFound();
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">{tvShow.name} Live</h1>

      <div className="mb-8">
        <IframeEmbedPlayer src={tvShow.php} title={tvShow.name} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About {tvShow.name}</h2>
        <p className="text-muted-foreground">
          Watch {tvShow.name} live streaming. This channel provides entertainment content for viewers of all ages.
        </p>
      </div>
    </div>
  );
}
