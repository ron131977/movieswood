// // import type { Metadata } from "next"
// // import Link from "next/link"
// // import { notFound } from "next/navigation"
// // import { getSportsItemById } from "@/lib/live-broadcast"
// // import IframeEmbedPlayer from "@/components/iframe-embed-player"
// // import GmtTime from "@/components/gmt-time"
// // import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

// // interface SportsDetailPageProps {
// //   params: { category: string; id: string }
// // }

// // export async function generateMetadata({ params }: SportsDetailPageProps): Promise<Metadata> {
// //   const { category, id } = params
// //   const decodedCategory = decodeURIComponent(category)
// //   const sports = getSportsItemById(decodedCategory, id)

// //   if (!sports) {
// //     return {
// //       title: `Channel Not Found | ${SITE_NAME}`,
// //       description: "The requested sports channel could not be found.",
// //     }
// //   }

// //   return {
// //     title: `${id} - ${decodedCategory} Live | ${SITE_NAME}`,
// //     description: `Watch ${decodedCategory} on ${id} live on ${SITE_NAME}.`,
// //     openGraph: {
// //       title: `${id} - ${decodedCategory} Live | ${SITE_NAME}`,
// //       description: `Watch ${decodedCategory} on ${id} live on ${SITE_NAME}.`,
// //       url: `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`,
// //       siteName: SITE_NAME,
// //       type: "video.other",
// //     },
// //   }
// // }

// // export default function SportsDetailPage({ params }: SportsDetailPageProps) {
// //   const { category, id } = params
// //   const decodedCategory = decodeURIComponent(category)
// //   const sports = getSportsItemById(decodedCategory, id)

// //   if (!sports) {
// //     notFound()
// //   }

// //   return (
// //     <div className="container py-6">
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
// //         <div>
// //           <div className="mb-2">
// //             <Link href="/sports" className="text-primary hover:underline">
// //               Sports
// //             </Link>
// //             {" > "}
// //             <Link href={`/sports#${decodedCategory}`} className="text-primary hover:underline">
// //               {decodedCategory}
// //             </Link>
// //             {" > "}
// //             <span>{id}</span>
// //           </div>
// //           <h1 className="text-3xl font-bold">
// //             {id} - {decodedCategory} Live
// //           </h1>
// //         </div>
// //         <GmtTime />
// //       </div>

// //       <div className="mb-8">
// //         <IframeEmbedPlayer src={sports.php} title={`${id} - ${decodedCategory}`} />
// //       </div>

// //       <div className="mb-8">
// //         <h2 className="text-xl font-semibold mb-4">About This Channel</h2>
// //         <p className="text-muted-foreground">
// //           Watch {decodedCategory} live on {id}. This channel provides live coverage of {decodedCategory} events and
// //           matches.
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }

// import type { Metadata } from "next";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { getSportsItemById } from "@/lib/live-broadcast";
// import IframeEmbedPlayer from "@/components/iframe-embed-player";
// import SocialShare from "@/components/social-share"
// import GmtTime from "@/components/gmt-time";
// import { SITE_NAME, SITE_URL } from "@/lib/tmdb";

// interface SportsDetailPageProps {
//   params: { category: string; id: string };
// }

// export async function generateMetadata({ params }: SportsDetailPageProps): Promise<Metadata> {
//   const { category, id } = params;
//   const decodedCategory = decodeURIComponent(category);
//   const sports = getSportsItemById(decodedCategory, id);


//   if (!sports) {
//     return {
//       title: `Channel Not Found | ${SITE_NAME}`,
//       description: "The requested sports channel could not be found.",
//     };
//   }

//   return {
//     title: `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`,
//     description: `Watch ${decodedCategory} on ${sports.name} live on ${SITE_NAME}.`,
//     openGraph: {
//       title: `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`,
//       description: `Watch ${decodedCategory} on ${sports.name} live on ${SITE_NAME}.`,
//       url: `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`,
//       siteName: SITE_NAME,
//       type: "video.other",
//     },
//   };
// }

// export default function SportsDetailPage({ params }: SportsDetailPageProps) {
//   const { category, id } = params;
//   const decodedCategory = decodeURIComponent(category);
//   const sports = getSportsItemById(decodedCategory, id);

//   if (!sports) {
//     notFound();
//   }

//   return (
//     <div className="container py-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div>
//           <div className="mb-2">
//             <Link href="/sports" className="text-primary hover:underline">
//               Sports
//             </Link>
//             {" > "}
//             <Link href={`/sports#${decodedCategory}`} className="text-primary hover:underline">
//               {decodedCategory}
//             </Link>
//             {" > "}
//             <span>{sports.name}</span>
//           </div>
//           <h1 className="text-3xl font-bold">
//             {sports.name} - {decodedCategory} Live
//           </h1>
//         </div>
//         <GmtTime />
//       </div>
//    <SocialShare url={pageUrl} title={shareTitle} description={sports.overview} />
//       <div className="mb-8">
//         <IframeEmbedPlayer src={sports.php} title={`${sports.name} - ${decodedCategory}`} />
//       </div>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">About {sports.name}</h2>
//         <p className="text-muted-foreground">
//           Watch {decodedCategory} live on {sports.name}. This channel provides live coverage of {decodedCategory} events
//           and matches.
//         </p>
//       </div>
//     </div>
//   );
// }


import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSportsItemById } from "@/lib/live-broadcast";
import IframeEmbedPlayer from "@/components/iframe-embed-player";
import SocialShare from "@/components/social-share";
import GmtTime from "@/components/gmt-time";
import { SITE_NAME, SITE_URL } from "@/lib/tmdb";

interface SportsDetailPageProps {
  params: { category: string; id: string };
}

export async function generateMetadata({ params }: SportsDetailPageProps): Promise<Metadata> {
  const { category, id } = params;
  const decodedCategory = decodeURIComponent(category);
  const sports = getSportsItemById(decodedCategory, id);

  if (!sports) {
    return {
      title: `Channel Not Found | ${SITE_NAME}`,
      description: "The requested sports channel could not be found.",
    };
  }

  return {
    title: `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`,
    description: `Watch ${decodedCategory} on ${sports.name} live on ${SITE_NAME}.`,
    openGraph: {
      title: `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`,
      description: `Watch ${decodedCategory} on ${sports.name} live on ${SITE_NAME}.`,
      url: `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`,
      siteName: SITE_NAME,
      type: "video.other",
    },
  };
}

export default function SportsDetailPage({ params }: SportsDetailPageProps) {
  const { category, id } = params;
  const decodedCategory = decodeURIComponent(category);
  const sports = getSportsItemById(decodedCategory, id);

  if (!sports) {
    notFound();
  }

  // Define page URL and share title
  const pageUrl = `${SITE_URL}/sports/${encodeURIComponent(decodedCategory)}/${id}`;
  const shareTitle = `${sports.name} - ${decodedCategory} Live | ${SITE_NAME}`;

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="mb-2">
            <Link href="/sports" className="text-primary hover:underline">
              Sports
            </Link>
            {" > "}
            <Link href={`/sports#${decodedCategory}`} className="text-primary hover:underline">
              {decodedCategory}
            </Link>
            {" > "}
            <span>{sports.name}</span>
          </div>
          <h1 className="text-3xl font-bold">
            {sports.name} - {decodedCategory} Live
          </h1>
        </div>
        <GmtTime />
      </div>

      {/* Social Share Component */}
      <div className="flex justify-center mb-6">
        <SocialShare url={pageUrl} title={shareTitle} description={sports.overview} />
      </div>

      <div className="mb-8">
        <IframeEmbedPlayer src={sports.php} title={`${sports.name} - ${decodedCategory}`} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About {sports.name}</h2>
        <p className="text-muted-foreground">
          Watch {decodedCategory} live on {sports.name}. This channel provides live coverage of {decodedCategory} events
          and matches.
        </p>
      </div>
    </div>
  );
}
