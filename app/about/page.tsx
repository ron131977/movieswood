import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
  description: `Learn more about ${SITE_NAME} and our mission to provide high-quality streaming content.`,
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description: `Learn more about ${SITE_NAME} and our mission to provide high-quality streaming content.`,
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">About {SITE_NAME}</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          Welcome to {SITE_NAME}, your premier destination for streaming movies and TV shows online.
        </p>

        <h2>Our Mission</h2>
        <p>
          At {SITE_NAME}, we're dedicated to providing a seamless and enjoyable streaming experience. Our platform
          offers a vast library of movies and TV shows, from the latest blockbusters to classic favorites, all
          accessible with just a few clicks.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Extensive collection of movies and TV shows</li>
          <li>High-quality streaming from multiple sources</li>
          <li>User-friendly interface for easy navigation</li>
          <li>Regular updates with the latest releases</li>
          <li>Personalized recommendations based on your viewing history</li>
        </ul>

        <h2>Our Story</h2>
        <p>
          Founded in 2025, {SITE_NAME} was created by a team of passionate movie enthusiasts who wanted to build a
          better streaming platform. We noticed that existing services often had limited libraries or poor streaming
          quality, so we set out to create a solution that addresses these issues.
        </p>
        <p>
          Since our launch, we've been continuously improving our platform based on user feedback and technological
          advancements. Our goal is to become the go-to destination for movie and TV show streaming worldwide.
        </p>

        <h2>Looking Forward</h2>
        <p>
          As we continue to grow, we're excited about the future of {SITE_NAME}. We're constantly working on new
          features and expanding our content library to enhance your viewing experience.
        </p>
        <p>
          Thank you for choosing {SITE_NAME} for your entertainment needs. We hope you enjoy our platform as much as we
          enjoy building it for you.
        </p>
      </div>
    </div>
  )
}

