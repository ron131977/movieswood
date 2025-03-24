"use client"

import { useState, useRef } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DirectVideoPlayerProps {
  title: string
}

export default function DirectVideoPlayer({ title }: DirectVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls
      >
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 p-4">
        <h2 className="text-white font-medium truncate">{title}</h2>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={togglePlay}
          >
            <Play className="h-8 w-8 fill-white" />
          </Button>
        )}
      </div>
    </div>
  )
}

