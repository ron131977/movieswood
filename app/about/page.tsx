"use client"

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import Script from "next/script"

// Client component that uses searchParams
function AboutContent() {
  const searchParams = useSearchParams()
  const section = searchParams.get('section')

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).analytics) {
      (window as any).analytics.track("PageView");
    }
  }, []);

  return (
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About MovieWoods</h1>

      {/* Content remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At MovieWoods, our mission is to bring the magic of cinema to your screens. We provide an extensive collection of the latest blockbusters, timeless classics, and exclusive originals, ensuring that movie lovers always have access to premium entertainment.
          </p>
          <p className="text-muted-foreground">
            Our platform is built for film enthusiasts who crave high-quality streaming with seamless user experience. Whether you're into action, drama, sci-fi, or indie films, MovieWoods is your ultimate destination for an unforgettable viewing experience.
          </p>
        </div>
        <div className="relative w-full h-64 md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dcrlnyd7n/image/upload/v1741650934/og_image_tmd2mb.jpg"
            alt="About MovieWoods"
            quality={90}
            fill
            className="object-cover"
            priority
            style={{ filter: "contrast(1.3) saturate(1.2) brightness(1.0) hue-rotate(0deg)" }}
          />
        </div>
      </div>

      <Separator className="my-8" />

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-muted-foreground mb-4">
          MovieWoods was founded with a vision to redefine the movie streaming experience. Recognizing the growing demand for high-quality, on-demand content, we built a platform where movie lovers can enjoy their favorite films without limitations.
        </p>
        <p className="text-muted-foreground">
          From an idea born among film enthusiasts to a fully developed streaming service, we have evolved into a hub for cinephiles worldwide. Our ever-growing collection ensures that you always find something new and exciting to watch.
        </p>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-medium mb-2">Entertainment</h3>
            <p className="text-muted-foreground">
              We are committed to delivering top-tier entertainment through an extensive selection of movies that cater to diverse tastes and preferences.
            </p>
          </div>
          <div className="p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-medium mb-2">Quality</h3>
            <p className="text-muted-foreground">
              We prioritize high-definition streaming, ensuring that every movie you watch offers the best possible visual and audio experience.
            </p>
          </div>
          <div className="p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-medium mb-2">Accessibility</h3>
            <p className="text-muted-foreground">
              Our platform is designed for ease of use, allowing viewers to access their favorite films anytime, anywhere, on any device.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main page component with Suspense boundary
export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
         <Script src="/script.js" />
      <AboutContent />
    </Suspense>
  )
}
