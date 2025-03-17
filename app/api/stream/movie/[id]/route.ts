import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // In a real application, you would fetch the actual streaming URL from your backend
    // or streaming service. This is a placeholder that returns a sample video.

    // For demo purposes, we're returning a sample video URL
    const sampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

    return NextResponse.json({ url: sampleVideoUrl })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get streaming URL" }, { status: 500 })
  }
}

