"use client"

import { useEffect, useRef } from "react"

interface M3u8PlayerProps {
  src: string
  poster?: string
  title: string
}

export default function M3u8Player({ src, poster, title }: M3u8PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerInitialized = useRef(false)

  useEffect(() => {
    // Load scripts dynamically
    const loadScripts = async () => {
      if (!playerInitialized.current && videoRef.current) {
        // Load Plyr
        const plyrScript = document.createElement("script")
        plyrScript.src = "https://cdn.plyr.io/3.7.8/plyr.js"
        plyrScript.async = true
        document.body.appendChild(plyrScript)

        // Wait for Plyr to load
        await new Promise((resolve) => {
          plyrScript.onload = resolve
        })

        // Load Hls.js
        const hlsScript = document.createElement("script")
        hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js"
        hlsScript.async = true
        document.body.appendChild(hlsScript)

        // Wait for Hls.js to load
        await new Promise((resolve) => {
          hlsScript.onload = resolve
        })

        // Initialize player
        if (window.Plyr && window.Hls && videoRef.current) {
          const player = new window.Plyr(videoRef.current)

          player.on("ready", (event: any) => {
            const instance = event.detail.plyr

            if (window.Hls.isSupported() && videoRef.current) {
              const hls = new window.Hls()
              hls.loadSource(src)
              hls.attachMedia(videoRef.current)
              hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                // Video is ready to play
                if (instance.autoplay) {
                  instance.play()
                }
              })
            }
          })

          playerInitialized.current = true
        }
      }
    }

    loadScripts()

    return () => {
      // Cleanup if needed
      playerInitialized.current = false
    }
  }, [src])

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
      <video ref={videoRef} id="player" className="video-js w-full h-full" controls preload="auto" poster={poster}   style={{ filter: "contrast(1.3) saturate(1.3) brightness(1.0) hue-rotate(10deg)" }}>
        <source src={src} type="application/x-mpegURL" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

