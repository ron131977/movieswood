// "use client"

// import { useState } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Skeleton } from "@/components/ui/skeleton"

// interface AdultContentPlayerProps {
//   title: string
//   videoUrl: string
//   videoUrl1: string
//   videoUrl2: string
// }

// export default function AdultContentPlayer({ title, videoUrl, videoUrl1, videoUrl2 }: AdultContentPlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeSource, setActiveSource] = useState("player1")

//   const sources = [
//     { id: "player1", name: "Player 1", url: videoUrl },
//     { id: "player2", name: "Player 2", url: videoUrl1 },
//     { id: "player3", name: "Player 3", url: videoUrl2 },
//   ]

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

// interface AdultContentPlayerProps {
//   title: string
//   videoUrl: string
//   videoUrl1: string
//   videoUrl2: string
// }

// export default function AdultContentPlayer({ title, videoUrl, videoUrl1, videoUrl2 }: AdultContentPlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeSource, setActiveSource] = useState("player1")
//   const videoRef = useRef<HTMLVideoElement | null>(null)

//   const sources = [
//     { id: "player1", name: "Player 1", url: videoUrl },
//     { id: "player2", name: "Player 2", url: videoUrl1 },
//     { id: "player3", name: "Player 3", url: videoUrl2 },
//   ]

//   const mp4Source = sources.find((source) => source.url.endsWith(".mp4"))

//   useEffect(() => {
//     if (mp4Source && videoRef.current) {
//       const player = new Plyr(videoRef.current, {
//         controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
//       })
//       return () => player.destroy()
//     }
//   }, [mp4Source])

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

//         {/* Render MP4 Player if found */}
//         {mp4Source && (
//           <TabsContent key={mp4Source.id} value={mp4Source.id} className="mt-2">
//             <h3 className="text-center">MP4 detected, using Plyr</h3>
//             <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//               <video ref={videoRef} className="w-full h-full" controls   style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}>
//                 <source src={mp4Source.url} type="video/mp4" />
//               </video>
//             </div>
//           </TabsContent>
//         )}

//         {/* Render Other Iframes */}
//         {sources.map((source) =>
//           source.id !== mp4Source?.id ? (
//             <TabsContent key={source.id} value={source.id} className="mt-2">
//               <h3 className="text-center">Check Other Player, if the content is Streaming.</h3>
//               <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//                 {isLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black">
//                     <Skeleton className="h-full w-full" />
//                   </div>
//                 )}
//                 <iframe
//                   src={source.url}
//                   title={`${title} - ${source.name}`}
//                   className="w-full h-full border-0"
//                   allowFullScreen
//                   onLoad={() => setIsLoading(false)}
//                   style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//                 ></iframe>
//               </div>
//             </TabsContent>
//           ) : null
//         )}
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

// interface AdultContentPlayerProps {
//   title: string
//   videoUrl: string
//   poster?: string
//   videoUrl1: string
//   videoUrl2: string
// }

// export default function AdultContentPlayer({ title, videoUrl, videoUrl1, videoUrl2, poster }: AdultContentPlayerProps) {
//   const [isLoading, setIsLoading] = useState(true)
//   const [activeSource, setActiveSource] = useState("player1")
//   const videoRef = useRef<HTMLVideoElement | null>(null)

//   console.log("Poster URL:", poster) // Debugging line to check if the poster is correctly passed

//   const sources = [
//     { id: "player1", name: "Player 1", url: videoUrl },
//     { id: "player2", name: "Player 2", url: videoUrl1 },
//     { id: "player3", name: "Player 3", url: videoUrl2 },
//   ]

//   const mp4Source = sources.find((source) => source.url.endsWith(".mp4"))

//   useEffect(() => {
//     if (mp4Source && videoRef.current) {
//       const player = new Plyr(videoRef.current, {
//         controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
//       })
//       return () => player.destroy()
//     }
//   }, [mp4Source])

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

//         {mp4Source && (
//           <TabsContent key={mp4Source.id} value={mp4Source.id} className="mt-2">
//             <h3 className="text-center">MP4 detected, using Plyr</h3>
//             <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//               {/* Check if the poster loads */}
//               <img 
//                 src={poster} 
//                 alt="poster"
//                 className="absolute inset-0 w-full h-full object-cover"
//                 onError={(e) => console.error("Failed to load poster:", e)}
//               />
//               <video
//                 ref={videoRef}
//                 className="w-full h-full"
//                 controls
//                 preload="auto"
//                 poster={poster}
//                 style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
//               >
//                 <source src={mp4Source.url} type="video/mp4" />
//               </video>
//             </div>
//           </TabsContent>
//         )}

//         {sources.map((source) =>
//           source.id !== mp4Source?.id ? (
//             <TabsContent key={source.id} value={source.id} className="mt-2">
//               <h3 className="text-center">Check Other Player, if the content is Streaming.</h3>
//               <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//                 {isLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black">
//                     <Skeleton className="h-full w-full" />
//                   </div>
//                 )}
//                 <iframe
//                   src={source.url}
//                   title={`${title} - ${source.name}`}
//                   className="w-full h-full border-0"
//                   allowFullScreen
//                   onLoad={() => setIsLoading(false)}
//                   style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
//                 ></iframe>
//               </div>
//             </TabsContent>
//           ) : null
//         )}
//       </Tabs>
//     </div>
//   )
// }


"use client"

import { useState, useEffect, useRef } from "react"
import Plyr from "plyr"
import "plyr/dist/plyr.css"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface AdultContentPlayerProps {
  title: string
  videoUrl: string
  poster?: string
  videoUrl1: string
  videoUrl2: string
}

export default function AdultContentPlayer({ title, videoUrl, videoUrl1, videoUrl2, poster }: AdultContentPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSource, setActiveSource] = useState("player1")
  const videoRef = useRef<HTMLVideoElement | null>(null)

  console.log("Poster URL:", poster) // Debugging line to check if the poster is correctly passed

  const sources = [
    { id: "player1", name: "Player 1", url: videoUrl },
    { id: "player2", name: "Player 2", url: videoUrl1 },
    { id: "player3", name: "Player 3", url: videoUrl2 },
  ]

  const mp4Source = sources.find((source) => source.url.endsWith(".mp4"))

  useEffect(() => {
    if (mp4Source && videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"],
      })
      return () => player.destroy()
    }
  }, [mp4Source])

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

        {mp4Source && (
          <TabsContent key={mp4Source.id} value={mp4Source.id} className="mt-2">
            <h3 className="text-center">Check Other Player, if the content is Streaming.</h3>
            <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
              {/* Check if the poster loads */}
              <img
                src={poster}
                alt="poster"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => console.error("Failed to load poster:", e)}
              />
              <video
                ref={videoRef}
                className="w-full h-full"
                controls
                preload="auto"
                poster={poster}
                style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
              >
                <source src={mp4Source.url} type="video/mp4" />
              </video>
            </div>
          </TabsContent>
        )}

        {sources.map((source) =>
          source.id !== mp4Source?.id ? (
            <TabsContent key={source.id} value={source.id} className="mt-2">
              <h3 className="text-center">Check Other Player, if the content is Streaming.</h3>
              <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <Skeleton className="h-full w-full" />
                  </div>
                )}
                <iframe
                  src={source.url}
                  title={`${title} - ${source.name}`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                  style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.05) hue-rotate(10deg)" }}
                ></iframe>
              </div>
            </TabsContent>
          ) : null
        )}
      </Tabs>
    </div>
  )
}
