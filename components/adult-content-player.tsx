"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface AdultContentPlayerProps {
  title: string
  videoUrl: string
  videoUrl1: string
  videoUrl2: string
}

export default function AdultContentPlayer({ title, videoUrl, videoUrl1, videoUrl2 }: AdultContentPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSource, setActiveSource] = useState("player1")

  const sources = [
    { id: "player1", name: "Player 1", url: videoUrl },
    { id: "player2", name: "Player 2", url: videoUrl1 },
    { id: "player3", name: "Player 3", url: videoUrl2 },
  ]

  return (
    <div className="space-y-2">
      <Tabs defaultValue={activeSource} onValueChange={setActiveSource} className="w-full">
        <TabsList className="w-full justify-start">
          {sources.map((source) => (
            <TabsTrigger key={source.id} value={source.id}>
              {source.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {sources.map((source) => (
          <TabsContent key={source.id} value={source.id} className="mt-2">
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
        ))}
      </Tabs>
    </div>
  )
}

