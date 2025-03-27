// "use client"

// import { useState } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Skeleton } from "@/components/ui/skeleton"

// interface VideoSource {
//   id: string
//   name: string
//   url: string
// }

// interface MultiSourcePlayerProps {
//   sources: VideoSource[]
//   title: string
// }

// export default function MultiSourcePlayer({ sources, title }: MultiSourcePlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeSource, setActiveSource] = useState(sources[0]?.id || "")

//   if (sources.length === 0) {
//     return (
//       <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video flex items-center justify-center">
//         <p className="text-white">No video sources available</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-2">
//       <Tabs defaultValue={activeSource} onValueChange={setActiveSource} className="w-full">
//       <TabsList className="w-full justify-center">
//           {sources.map((source) => (
//             <TabsTrigger key={source.id} value={source.id}>
//               {source.name}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {sources.map((source) => (
//           <TabsContent key={source.id} value={source.id} className="mt-2">
//                <h3 className="justify-center items-center text-center">Check Other Player, if the content is Streaming. </h3>
//             <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//               {isLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black">
//                   <Skeleton className="h-full w-full" />
//                 </div>
//               )}
//               <iframe
//                 src={source.url}
//                 title={`${title} - ${source.name}`}
//                 className="w-full h-full border-0"
//                 allowFullScreen
//                 onLoad={() => setIsLoading(false)}
//                 style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//               ></iframe>
//             </div>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   )
// }












// "use client"

// import { useState, useEffect, useRef } from "react"
// import Plyr from "plyr"
// import "plyr/dist/plyr.css"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Skeleton } from "@/components/ui/skeleton"

// interface VideoSource {
//   id: string
//   name: string
//   url: string
// }

// interface MultiSourcePlayerProps {
//   sources: VideoSource[]
//   title: string
// }

// export default function MultiSourcePlayer({ sources, title }: MultiSourcePlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeSource, setActiveSource] = useState(sources[0]?.id || "")
//   const videoRef = useRef<HTMLVideoElement | null>(null)

//   if (sources.length === 0) {
//     return (
//       <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video flex items-center justify-center">
//         <p className="text-white">No video sources available</p>
//       </div>
//     )
//   }

//   const activeVideo = sources.find((source) => source.id === activeSource)
//   const isMP4 = activeVideo?.url.endsWith(".mp4")

//   useEffect(() => {
//     if (isMP4 && videoRef.current) {
//       const player = new Plyr(videoRef.current, {
//         controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
//       })
//       setIsLoading(false)
//       return () => player.destroy()
//     }
//   }, [isMP4, activeSource])

//   return (
//     <div className="space-y-2">
//       <Tabs defaultValue={activeSource} onValueChange={setActiveSource} className="w-full">
//         <TabsList className="w-full justify-center">
//           {sources.map((source) => (
//             <TabsTrigger key={source.id} value={source.id}>
//               {source.name}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {sources.map((source) => (
//           <TabsContent key={source.id} value={source.id} className="mt-2">
//             <h3 className="text-center">Check Other Player, if the content is Streaming.</h3>
//             <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//               {isLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black">
//                   <Skeleton className="h-full w-full" />
//                 </div>
//               )}

//               {source.url.endsWith(".mp4") ? (
//                 <video
//                   ref={videoRef}
//                   className="w-full h-full"
//                   controls
//                   preload="auto"
//                   onCanPlay={() => setIsLoading(false)}
//                   style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
//                 >
//                   <source src={source.url} type="video/mp4" />
//                 </video>
//               ) : (
//                 <iframe
//                   src={source.url}
//                   title={`${title} - ${source.name}`}
//                   className="w-full h-full border-0"
//                   allowFullScreen
//                   onLoad={() => setIsLoading(false)}
//                   style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//                 ></iframe>
//               )}
//             </div>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   )
// }



"use client"

import { useState, useEffect, useRef } from "react"
import Plyr from "plyr"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface VideoSource {
  id: string
  name: string
  url: string
}

interface MultiSourcePlayerProps {
  sources: VideoSource[]
  title: string
}

export default function MultiSourcePlayer({ sources, title }: MultiSourcePlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSource, setActiveSource] = useState(sources[0]?.id || "")
  const playerRef = useRef<Plyr | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Add Plyr CSS dynamically
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.plyr.io/3.7.8/plyr.css'
    document.head.appendChild(link)
    
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  if (sources.length === 0) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video flex items-center justify-center">
        <p className="text-white">No video sources available</p>
      </div>
    )
  }

  const activeVideo = sources.find((source) => source.id === activeSource)
  const isMP4 = activeVideo?.url.endsWith(".mp4")

  useEffect(() => {
    if (isMP4 && videoRef.current) {
      // Destroy existing player first
      if (playerRef.current) {
        playerRef.current.destroy()
      }

      // Initialize new Plyr instance
      playerRef.current = new Plyr(videoRef.current, {
        controls: [
          'play-large', // Add play-large control
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'fullscreen'
        ],
        settings: ['quality', 'speed'],
        displayDuration: true,
        hideControls: false,
      })

      setIsLoading(false)

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy()
        }
      }
    }
  }, [isMP4, activeSource])

  return (
    <div className="space-y-2">
      <Tabs defaultValue={activeSource} onValueChange={setActiveSource} className="w-full">
        <TabsList className="w-full justify-center">
          {sources.map((source) => (
            <TabsTrigger key={source.id} value={source.id}>
              {source.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {sources.map((source) => (
          <TabsContent key={source.id} value={source.id} className="mt-2">
            <h3 className="text-center">Check Other Player, if the content is Streaming.</h3>
            <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video plyr__video-embed">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <Skeleton className="h-full w-full" />
                </div>
              )}

              {source.url.endsWith(".mp4") ? (
                <div className="plyr__video-wrapper">
                  <video
                    ref={videoRef}
                    className="plyr__video"
                    controls
                    preload="auto"
                    onCanPlay={() => setIsLoading(false)}
                    style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
                  >
                    <source src={source.url} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <iframe
                  src={source.url}
                  title={`${title} - ${source.name}`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                  style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
                ></iframe>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}