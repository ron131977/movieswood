"use client"

import { useState } from "react"
import M3u8Player from "@/components/m3u8-player"
import IframeEmbedPlayer from "@/components/iframe-embed-player"

interface UniversalPlayerProps {
  title: string
  m3u8?: string
  php?: string
  poster?: string
}

export default function UniversalPlayer({ title, m3u8, php, poster }: UniversalPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)

  // If m3u8 is available, use M3u8Player, otherwise use IframeEmbedPlayer
  if (m3u8) {
    return <M3u8Player src={m3u8} poster={poster} title={title} />
  } else if (php) {
    return <IframeEmbedPlayer src={php} title={title} />
  } else {
    return (
      <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video flex items-center justify-center">
        <p className="text-white">No video source available</p>
      </div>
    )
  }
}

