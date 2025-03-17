"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  src: string
  poster?: string
  title: string
  isApiEndpoint?: boolean
}

export default function VideoPlayer({ src, poster, title, isApiEndpoint }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [videoSrc, setVideoSrc] = useState<string>("")

  useEffect(() => {
    const loadVideo = async () => {
      try {
        if (isApiEndpoint) {
          setIsLoading(true)
          const response = await fetch(src)
          const data = await response.json()

          if (!data.url) {
            throw new Error("No video URL found in API response")
          }

          setVideoSrc(data.url)
        } else {
          setVideoSrc(src)
        }
        setError(null)
      } catch (err) {
        console.error("Error loading video:", err)
        setError("Failed to load video. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadVideo()
  }, [src, isApiEndpoint])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => setCurrentTime(video.currentTime)
    const onDurationChange = () => setDuration(video.duration)
    const onEnded = () => setIsPlaying(false)

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("durationchange", onDurationChange)
    video.addEventListener("ended", onEnded)

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("durationchange", onDurationChange)
      video.removeEventListener("ended", onEnded)
    }
  }, [])

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

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    const newMutedState = !isMuted
    video.muted = newMutedState
    setIsMuted(newMutedState)
  }

  const handleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement
    if (!videoContainer) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoContainer.requestFullscreen()
    }
  }

  const skipForward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.min(video.currentTime + 10, video.duration)
  }

  const skipBackward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(video.currentTime - 10, 0)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const showControls = () => {
    setIsControlsVisible(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false)
      }
    }, 3000)
  }

  return (
    <div
      className="relative w-full bg-black rounded-lg overflow-hidden"
      onMouseMove={showControls}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        className="w-full h-full"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setError("This video format is not supported or the video is unavailable.")}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-background p-4 rounded-md max-w-md text-center">
            <p className="text-destructive mb-2">Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-transparent to-black/30 transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Title bar */}
        <div className="p-4">
          <h2 className="text-white font-medium truncate">{title}</h2>
        </div>

        {/* Center play button */}
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

        {/* Controls */}
        <div className="p-4 space-y-2">
          {/* Progress bar */}
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="icon" className="text-white" onClick={skipBackward}>
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" className="text-white" onClick={skipForward}>
                <SkipForward className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 ml-2">
                <Button variant="ghost" size="icon" className="text-white" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-24 cursor-pointer"
                />
              </div>

              <span className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <Button variant="ghost" size="icon" className="text-white" onClick={handleFullscreen}>
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

