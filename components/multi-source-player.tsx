"use client"

import { useState } from "react"
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

  if (sources.length === 0) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg bg-black aspect-video flex items-center justify-center">
        <p className="text-white">No video sources available</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Tabs defaultValue={activeSource} onValueChange={setActiveSource} className="w-full">
        <TabsList className="w-full justify-center">
          {sources.map((source, index) => (
            <TabsTrigger key={source.id} value={source.id}>
              Player {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>

        {sources.map((source) => (
          <TabsContent key={source.id} value={source.id} className="mt-2">
          
            <h3 className="justify-center items-center text-center">Check Other Player, if the content is Streaming. </h3>
          
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
                style={{ filter: "contrast(1.2) saturate(1.3) brightness(1.0) hue-rotate(0deg)"}}
              ></iframe>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

