"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface IframePlayerProps {
  src: string
  title: string
}

export default function IframePlayer({ src, title }: IframePlayerProps) {
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

