import type { Metadata } from "next"
import DirectVideoPlayer from "@/components/direct-video-player"

export const metadata: Metadata = {
  title: "Test Video Player | MovieWoods",
  description: "Test the video player functionality",
}

export default function TestPlayerPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Test Video Player</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Direct Video Player</h2>
        <DirectVideoPlayer title="Sample Video" />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Video Information</h2>
        <p className="mb-2">
          This page tests the video player with direct video sources to ensure browser compatibility.
        </p>
        <p className="mb-2">
          If the video above plays correctly but videos on movie/TV pages don't, the issue is likely with the API
          endpoints or how we're handling the streaming URLs.
        </p>
        <p>Sample videos are from the Google sample video collection.</p>
      </div>
    </div>
  )
}

