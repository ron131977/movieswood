// "use client"

// import { useEffect, useRef } from "react"

// interface M3u8PlayerProps {
//   src: string
//   poster?: string
//   title: string
// }

// export default function M3u8Player({ src, poster, title }: M3u8PlayerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const playerInitialized = useRef(false)

//   useEffect(() => {
//     // Load scripts dynamically
//     const loadScripts = async () => {
//       if (!playerInitialized.current && videoRef.current) {
//         // Load Plyr
//         const plyrScript = document.createElement("script")
//         plyrScript.src = "https://cdn.plyr.io/3.7.8/plyr.js"
//         plyrScript.async = true
//         document.body.appendChild(plyrScript)

//         // Wait for Plyr to load
//         await new Promise((resolve) => {
//           plyrScript.onload = resolve
//         })

//         // Load Hls.js
//         const hlsScript = document.createElement("script")
//         hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js"
//         hlsScript.async = true
//         document.body.appendChild(hlsScript)

//         // Wait for Hls.js to load
//         await new Promise((resolve) => {
//           hlsScript.onload = resolve
//         })

//         // Initialize player
//         if (window.Plyr && window.Hls && videoRef.current) {
//           const player = new window.Plyr(videoRef.current)

//           player.on("ready", (event: any) => {
//             const instance = event.detail.plyr

//             if (window.Hls.isSupported() && videoRef.current) {
//               const hls = new window.Hls()
//               hls.loadSource(src)
//               hls.attachMedia(videoRef.current)
//               hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
//                 // Video is ready to play
//                 if (instance.autoplay) {
//                   instance.play()
//                 }
//               })
//             }
//           })

//           playerInitialized.current = true
//         }
//       }
//     }

//     loadScripts()

//     return () => {
//       // Cleanup if needed
//       playerInitialized.current = false
//     }
//   }, [src])

//   return (
//     <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//       <video ref={videoRef} id="player" className="video-js w-full h-full" controls preload="auto" poster={poster}   style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}>
//         <source src={src} type="application/x-mpegURL" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   )
// }


























// "use client"

// import { useEffect, useRef } from "react"

// interface M3u8PlayerProps {
//   src: string
//   poster?: string
//   title: string
// }

// export default function M3u8Player({ src, poster, title }: M3u8PlayerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const playerInitialized = useRef(false)

//   useEffect(() => {
//     // Load scripts dynamically
//     const loadScripts = async () => {
//       if (!playerInitialized.current && videoRef.current) {
//         // Load Plyr
//         const plyrScript = document.createElement("script")
//         plyrScript.src = "https://cdn.plyr.io/3.7.8/plyr.js"
//         plyrScript.async = true
//         document.body.appendChild(plyrScript)

//         // Wait for Plyr to load
//         await new Promise((resolve) => {
//           plyrScript.onload = resolve
//         })

//         // Load Hls.js
//         const hlsScript = document.createElement("script")
//         hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js"
//         hlsScript.async = true
//         document.body.appendChild(hlsScript)

//         // Wait for Hls.js to load
//         await new Promise((resolve) => {
//           hlsScript.onload = resolve
//         })

//         // Initialize player
//         if (window.Plyr && window.Hls && videoRef.current) {
//           const player = new window.Plyr(videoRef.current)

//           player.on("ready", (event: any) => {
//             const instance = event.detail.plyr

//             if (window.Hls.isSupported() && videoRef.current) {
//               const hls = new window.Hls()
//               hls.loadSource(src)
//               hls.attachMedia(videoRef.current)
//               hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
//                 // Video is ready to play
//                 if (instance.autoplay) {
//                   instance.play()
//                 }
//               })
//             }
//           })

//           playerInitialized.current = true
//         }
//       }
//     }

//     loadScripts()

//     return () => {
//       // Cleanup if needed
//       playerInitialized.current = false
//     }
//   }, [src])

//   return (
//     <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//       <video ref={videoRef} id="player" className="video-js w-full h-full" controls preload="auto" poster={poster}   style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}>
//         <source src={src} type="application/x-mpegURL" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   )
// }

















//CODE WOKIS FINE

// "use client"

// import { useEffect, useRef, useState } from "react"

// interface M3u8PlayerProps {
//   src: string
//   poster?: string
//   title: string
// }

// export default function M3u8Player({ src, poster, title }: M3u8PlayerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const playerInitialized = useRef(false)
//   const hlsRef = useRef<any>(null)
//   const [qualityOptions, setQualityOptions] = useState<Array<{label: string, level: number}>>([])
//   const [currentQuality, setCurrentQuality] = useState(-1)
//   const [isLive, setIsLive] = useState(false)

//   useEffect(() => {
//     const loadScripts = async () => {
//       if (!playerInitialized.current && videoRef.current) {
//         const plyrScript = document.createElement("script")
//         plyrScript.src = "https://cdn.plyr.io/3.7.8/plyr.js"
//         plyrScript.async = true
//         document.body.appendChild(plyrScript)

//         await new Promise((resolve) => { plyrScript.onload = resolve })

//         const hlsScript = document.createElement("script")
//         hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js"
//         hlsScript.async = true
//         document.body.appendChild(hlsScript)

//         await new Promise((resolve) => { hlsScript.onload = resolve })

//         if (window.Plyr && window.Hls && videoRef.current) {
//           const player = new window.Plyr(videoRef.current)

//           player.on("ready", (event: any) => {
//             const instance = event.detail.plyr

//             if (window.Hls.isSupported()) {
//               const hls = new window.Hls()
//               hlsRef.current = hls
              
//               hls.loadSource(src)
//               hls.attachMedia(videoRef.current!)

//               hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
//                 setIsLive(hls.liveSyncPosition !== undefined)
                
//                 const levels = hls.levels
//                 const options = levels.map((level: any, index: number) => {
//                   let label = ''
//                   const bitrate = Math.round(level.bitrate / 1000)
                  
//                   if (level.height >= 1080) label = 'Full HD'
//                   else if (level.height >= 720) label = 'HD'
//                   else if (level.height >= 480) label = 'SD'
//                   else label = bitrate <= 1500 ? 'SD' : bitrate <= 3000 ? 'HD' : 'Full HD'

//                   return {
//                     label: `${label} (${level.height ? `${level.height}p` : `${bitrate}kbps`})`,
//                     level: index
//                   }
//                 })

//                 setQualityOptions(options)
//                 if (instance.autoplay) instance.play()
//               })
//             }
//           })

//           playerInitialized.current = true
//         }
//       }
//     }

//     loadScripts()

//     return () => {
//       if (hlsRef.current) {
//         hlsRef.current.destroy()
//       }
//       playerInitialized.current = false
//     }
//   }, [src])

//   const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const level = parseInt(e.target.value)
//     setCurrentQuality(level)
//     if (hlsRef.current) {
//       hlsRef.current.currentLevel = level
//     }
//   }

//   const handleLiveClick = () => {
//     if (hlsRef.current?.liveSyncPosition && videoRef.current) {
//       videoRef.current.currentTime = hlsRef.current.liveSyncPosition
//     }
//   }

//   return (
//     <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
//       <video
//         ref={videoRef}
//         id="player"
//         className="w-full h-full"
//         controls
//         preload="auto"
//         poster={poster}
//         style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
//       />
      
//     <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
//       {isLive && (
//         <button
//           onClick={handleLiveClick}
//           className="flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
//         >
//           <span className="mr-2">● LIVE</span>
//         </button>
//       )}
      
//         <select
//           value={currentQuality}
//           onChange={handleQualityChange}
//           className="px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none"
//         >
//           <option value={-1}>Auto Quality</option>
//           {qualityOptions.map((option, index) => (
//             <option key={index} value={option.level}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   )
// }






















// "use client"

// import { useEffect, useRef, useState } from "react"

// interface M3u8PlayerProps {
//   src: string
//   poster?: string
//   title: string
// }

// export default function M3u8Player({ src, poster, title }: M3u8PlayerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const playerInitialized = useRef(false)
//   const hlsRef = useRef<any>(null)
//   const [qualityOptions, setQualityOptions] = useState<Array<{label: string, level: number}>>([])
//   const [currentQuality, setCurrentQuality] = useState(-1)
//   const [isLive, setIsLive] = useState(false)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const playerRef = useRef<any>(null)

//   useEffect(() => {
//     const loadScripts = async () => {
//       if (!playerInitialized.current && videoRef.current) {
//         const plyrScript = document.createElement("script")
//         plyrScript.src = "https://cdn.plyr.io/3.7.8/plyr.js"
//         plyrScript.async = true
//         document.body.appendChild(plyrScript)

//         await new Promise((resolve) => { plyrScript.onload = resolve })

//         const hlsScript = document.createElement("script")
//         hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js"
//         hlsScript.async = true
//         document.body.appendChild(hlsScript)

//         await new Promise((resolve) => { hlsScript.onload = resolve })

//         if (window.Plyr && window.Hls && videoRef.current) {
//           const player = new window.Plyr(videoRef.current)
//           playerRef.current = player

//           // Add playback state listeners
//           player.on('play', () => setIsPlaying(true))
//           player.on('pause', () => setIsPlaying(false))
//           player.on('ended', () => setIsPlaying(false))

//           player.on("ready", (event: any) => {
//             const instance = event.detail.plyr

//             if (window.Hls.isSupported()) {
//               const hls = new window.Hls()
//               hlsRef.current = hls
              
//               hls.loadSource(src)
//               hls.attachMedia(videoRef.current!)

//               hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
//                 setIsLive(hls.liveSyncPosition !== undefined)
                
//                 const levels = hls.levels
//                 const options = levels.map((level: any, index: number) => {
//                   let label = ''
//                   const bitrate = Math.round(level.bitrate / 1000)
                  
//                   if (level.height >= 1080) label = 'Full HD'
//                   else if (level.height >= 720) label = 'HD'
//                   else if (level.height >= 480) label = 'SD'
//                   else label = bitrate <= 1500 ? 'SD' : bitrate <= 3000 ? 'HD' : 'Full HD'

//                   return {
//                     label: `${label} (${level.height ? `${level.height}p` : `${bitrate}kbps`})`,
//                     level: index
//                   }
//                 })

//                 setQualityOptions(options)
//                 if (instance.autoplay) instance.play()
//               })
//             }
//           })

//           playerInitialized.current = true
//         }
//       }
//     }

//     loadScripts()

//     return () => {
//       if (hlsRef.current) {
//         hlsRef.current.destroy()
//       }
//       playerInitialized.current = false
//     }
//   }, [src])

//   const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const level = parseInt(e.target.value)
//     setCurrentQuality(level)
//     if (hlsRef.current) {
//       hlsRef.current.currentLevel = level
//     }
//   }

//   const handleLiveClick = () => {
//     if (hlsRef.current?.liveSyncPosition && videoRef.current) {
//       videoRef.current.currentTime = hlsRef.current.liveSyncPosition
//     }
//   }

//   return (
//     <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video group">
//       <video
//         ref={videoRef}
//         id="player"
//         className="w-full h-full"
//         controls
//         preload="auto"
//         poster={poster}
//         style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
//       />
      
//       {/* Custom Controls - Only shown when playing */}
//       {isPlaying && (
//         <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
//           {isLive && (
//             <button
//               onClick={handleLiveClick}
//               className="flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
//             >
//               <span className="mr-2">● LIVE</span>
//             </button>
//           )}
          
//           <select
//             value={currentQuality}
//             onChange={handleQualityChange}
//             className="px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none"
//           >
//             <option value={-1}>Auto Quality</option>
//             {qualityOptions.map((option, index) => (
//               <option key={index} value={option.level}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   )
// }




"use client"

import { useEffect, useRef, useState } from "react"

interface M3u8PlayerProps {
  src: string
  poster?: string
  title: string
}

// Helper function to detect stream type
const isM3U8 = (url: string) => {
  return url.includes('m3u8') || new URL(url).pathname.endsWith('.m3u8')
}

export default function M3u8Player({ src, poster, title }: M3u8PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerInitialized = useRef(false)
  const hlsRef = useRef<any>(null)
  const [qualityOptions, setQualityOptions] = useState<Array<{label: string, level: number}>>([])
  const [currentQuality, setCurrentQuality] = useState(-1)
  const [isLive, setIsLive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<any>(null)
  const [streamType, setStreamType] = useState<'mp4' | 'hls'>('mp4')

  useEffect(() => {
    // Detect stream type from URL
    const detectedType = isM3U8(src) ? 'hls' : 'mp4'
    setStreamType(detectedType)

    const loadScripts = async () => {
      if (!playerInitialized.current && videoRef.current) {
        const plyrScript = document.createElement("script")
        plyrScript.src = "https://cdn.plyr.io/3.7.8/plyr.js"
        plyrScript.async = true
        document.body.appendChild(plyrScript)

        await new Promise((resolve) => { plyrScript.onload = resolve })

        // Only load HLS.js if needed
        if (detectedType === 'hls') {
          const hlsScript = document.createElement("script")
          hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js"
          hlsScript.async = true
          document.body.appendChild(hlsScript)
          await new Promise((resolve) => { hlsScript.onload = resolve })
        }

        if (window.Plyr && videoRef.current) {
          const player = new window.Plyr(videoRef.current)
          playerRef.current = player

          // Add playback state listeners
          player.on('play', () => setIsPlaying(true))
          player.on('pause', () => setIsPlaying(false))
          player.on('ended', () => setIsPlaying(false))

          player.on("ready", (event: any) => {
            const instance = event.detail.plyr

            if (detectedType === 'hls' && window.Hls?.isSupported()) {
              const hls = new window.Hls()
              hlsRef.current = hls
              
              hls.loadSource(src)
              hls.attachMedia(videoRef.current!)

              hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                setIsLive(hls.liveSyncPosition !== undefined)
                
                const levels = hls.levels
                const options = levels.map((level: any, index: number) => {
                  let label = ''
                  const bitrate = Math.round(level.bitrate / 1000)
                  
                  if (level.height >= 1080) label = 'Full HD'
                  else if (level.height >= 720) label = 'HD'
                  else if (level.height >= 480) label = 'SD'
                  else label = bitrate <= 1500 ? 'SD' : bitrate <= 3000 ? 'HD' : 'Full HD'

                  return {
                    label: `${label} (${level.height ? `${level.height}p` : `${bitrate}kbps`})`,
                    level: index
                  }
                })

                setQualityOptions(options)
                if (instance.autoplay) instance.play()
              })
            } else if (detectedType === 'mp4') {
              // Directly set source for MP4
              if (videoRef.current) {
                videoRef.current.src = src
                if (instance.autoplay) instance.play()
              }
            }
          })

          playerInitialized.current = true
        }
      }
    }

    loadScripts()

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
      }
      if (playerRef.current) {
        playerRef.current.destroy()
      }
      playerInitialized.current = false
    }
  }, [src])

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(e.target.value)
    setCurrentQuality(level)
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level
    }
  }

  const handleLiveClick = () => {
    if (hlsRef.current?.liveSyncPosition && videoRef.current) {
      videoRef.current.currentTime = hlsRef.current.liveSyncPosition
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video group">
      <video
        ref={videoRef}
        id="player"
        className="w-full h-full"
        controls
        preload="auto"
        poster={poster}
        style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}
      >
        {streamType === 'mp4' && <source src={src} type="video/mp4" />}
      </video>
      
      {/* Custom Controls - Only shown when playing */}
      {isPlaying && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          {isLive && (
            <button
              onClick={handleLiveClick}
              className="flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              <span className="mr-2">● LIVE</span>
            </button>
          )}
          
          {streamType === 'hls' && (
            <select
              value={currentQuality}
              onChange={handleQualityChange}
              className="px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              <option value={-1}>Auto Quality</option>
              {qualityOptions.map((option, index) => (
                <option key={index} value={option.level}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  )
}