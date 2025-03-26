"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface IframeEmbedPlayerProps {
  src: string
  title: string
}

export default function IframeEmbedPlayer({ src, title }: IframeEmbedPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <iframe
        src={src}
        title={title}
        className="w-full h-full border-0"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
      ></iframe>
    </div>
  )
}



































// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Skeleton } from "@/components/ui/skeleton"

// interface VideoPlayerProps {
//   src: string
//   title: string
// }

// export default function VideoPlayer({ src, title }: VideoPlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const dashRef = useRef<any>(null)

//   useEffect(() => {
//     if (src.endsWith('.mpd')) {
//       const initializeDash = async () => {
//         const dashjs = await import('dashjs')
//         if (videoRef.current && !dashRef.current) {
//           const player = dashjs.MediaPlayer().create()
//           player.initialize(videoRef.current)
//           player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
//             setIsLoading(false)
//           })
//           player.attachSource(src)
//           dashRef.current = player
//         }
//       }

//       initializeDash()

//       return () => {
//         if (dashRef.current) {
//           dashRef.current.destroy()
//           dashRef.current = null
//         }
//       }
//     } else {
//       setIsLoading(false)
//     }
//   }, [src])

//   return (
//     <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black">
//           <Skeleton className="h-full w-full" />
//         </div>
//       )}

//       {src.endsWith('.mpd') ? (
//         <video
//           ref={videoRef}
//           className="w-full h-full"
//           controls
//           playsInline
//           style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//         />
//       ) : (
//         <iframe
//           src={src}
//           title={title}
//           className="w-full h-full border-0"
//           allowFullScreen
//           onLoad={() => setIsLoading(false)}
//           style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//         />
//       )}
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Skeleton } from "@/components/ui/skeleton"

// interface VideoPlayerProps {
//   src: string
//   title: string
// }

// export default function VideoPlayer({ src, title }: VideoPlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const dashRef = useRef<any>(null)

//   useEffect(() => {
//     if (src.endsWith('.mpd')) {
//       const initializeDash = async () => {
//         const dashjs = await import('dashjs')
//         if (videoRef.current && !dashRef.current) {
//           const player = dashjs.MediaPlayer().create()
          
//           // Bypass DRM checks for testing purposes
//           player.extend('ProtectionModel_21Jan2015', (protectionModel: any) => {
//             protectionModel.init = () => {}
//             protectionModel.requestKeySystemAccess = (keySystem: any, callback: any) => {
//               callback(keySystem)
//             }
//             return protectionModel
//           })

//           player.initialize(videoRef.current)
//           player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
//             setIsLoading(false)
//           })
//           player.attachSource(src)
//           dashRef.current = player
//         }
//       }

//       initializeDash()

//       return () => {
//         if (dashRef.current) {
//           dashRef.current.destroy()
//           dashRef.current = null
//         }
//       }
//     } else {
//       setIsLoading(false)
//     }
//   }, [src])

//   return (
//     <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black">
//           <Skeleton className="h-full w-full" />
//         </div>
//       )}

//       {src.endsWith('.mpd') ? (
//         <video
//           ref={videoRef}
//           className="w-full h-full"
//           controls
//           playsInline
//           style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//         />
//       ) : (
//         <iframe
//           src={src}
//           title={title}
//           className="w-full h-full border-0"
//           allowFullScreen
//           onLoad={() => setIsLoading(false)}
//           style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//         />
//       )}
//     </div>
//   )
// }





















// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Skeleton } from "@/components/ui/skeleton"

// interface VideoPlayerProps {
//   src: string
//   title: string
// }

// export default function VideoPlayer({ src, title }: VideoPlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const dashRef = useRef<any>(null)

//   useEffect(() => {
//     if (src.endsWith('.mpd')) {
//       const initializeDash = async () => {
//         const dashjs = await import('dashjs')
//         if (videoRef.current && !dashRef.current) {
//           const player = dashjs.MediaPlayer().create()
          
//           // Configure mock license server
//           player.setProtectionData({
//             'com.widevine.alpha': {
//               serverURL: '/api/drm/license'
//             },
//             'com.microsoft.playready': {
//               serverURL: '/api/drm/license'
//             }
//           })

//           // Optional: Add debug logging
//           player.on(dashjs.MediaPlayer.events.ERROR, (e: any) => {
//             console.log('Player error:', e)
//           })

//           player.initialize(videoRef.current)
//           player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
//             setIsLoading(false)
//           })
//           player.attachSource(src)
//           dashRef.current = player
//         }
//       }

//       initializeDash()

//       return () => {
//         if (dashRef.current) {
//           dashRef.current.destroy()
//           dashRef.current = null
//         }
//       }
//     } else {
//       setIsLoading(false)
//     }
//   }, [src])

//   return (
//     <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black">
//           <Skeleton className="h-full w-full" />
//         </div>
//       )}

//       {src.endsWith('.mpd') ? (
//         <video
//           ref={videoRef}
//           className="w-full h-full"
//           controls
//           playsInline
//           style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//         />
//       ) : (
//         <iframe
//           src={src}
//           title={title}
//           className="w-full h-full border-0"
//           allowFullScreen
//           onLoad={() => setIsLoading(false)}
//           style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//         />
//       )}
//     </div>
//   )
// }