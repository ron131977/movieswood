// "use client"

// import { useState } from "react"
// import { Skeleton } from "@/components/ui/skeleton"

// interface IframePlayerProps {
//   src: string
//   title: string
// }

// export default function IframePlayer({ src, title }: IframePlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)

//   return (
//     <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black">
//           <Skeleton className="h-full w-full" />
//         </div>
//       )}
//       <iframe
//         src={src}
//         title={title}
//         className="w-full h-full border-0"
//         allowFullScreen
//         onLoad={() => setIsLoading(false)}
//         style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//       ></iframe>
//     </div>
//   )
// }













// "use client"

// import { useEffect, useState, useRef } from "react"
// import Plyr from "plyr"
// import "plyr/dist/plyr.css"
// import { Skeleton } from "@/components/ui/skeleton"

// interface UniversalPlayerProps {
//   src: string
//   title: string
// }

// export default function UniversalPlayer({ src, title }: UniversalPlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)
//   const videoRef = useRef<HTMLVideoElement | null>(null)

//   // Check if the URL is an MP4 video
//   const isMP4 = src.endsWith(".mp4")

//   useEffect(() => {
//     if (isMP4 && videoRef.current) {
//       const player = new Plyr(videoRef.current, {
//         controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
//       })
//       setIsLoading(false)
//       return () => player.destroy()
//     }
//   }, [isMP4])

//   return (
//     <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black">
//           <Skeleton className="h-full w-full" />
//         </div>
//       )}

//       {isMP4 ? (
//         <video
//           ref={videoRef}
//           className="w-full h-full"
//           controls
//           preload="auto"
//           onCanPlay={() => setIsLoading(false)}
//           style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
//         >
//           <source src={src} type="video/mp4" />
//         </video>
//       ) : (
//         <iframe
//           src={src}
//           title={title}
//           className="w-full h-full border-0"
//           allowFullScreen
//           onLoad={() => setIsLoading(false)}
//           style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//         ></iframe>
//       )}
//     </div>
//   )
// }


"use client"

import { useEffect, useState, useRef } from "react"
import Plyr from "plyr"
import "plyr/dist/plyr.css"
import { Skeleton } from "@/components/ui/skeleton"

interface UniversalPlayerProps {
  src: string
  title: string
}

export default function UniversalPlayer({ src, title }: UniversalPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Check if the URL is an MP4 video
  const isMP4 = src.endsWith(".mp4")

  useEffect(() => {
    if (isMP4 && videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: [
          "play-large", // Center play button
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "fullscreen"
        ],
      })
      setIsLoading(false)
      return () => player.destroy()
    }
  }, [isMP4])

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <Skeleton className="h-full w-full" />
        </div>
      )}

      {isMP4 ? (
        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          preload="auto"
          onCanPlay={() => setIsLoading(false)}
          style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <iframe
          src={src}
          title={title}
          className="w-full h-full border-0"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
        ></iframe>
      )}
    </div>
  )
}
