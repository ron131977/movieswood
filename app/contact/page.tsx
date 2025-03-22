import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_NAME}`,
  description: `Get in touch with the ${SITE_NAME} team for support, feedback, or inquiries.`,
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: `Get in touch with the ${SITE_NAME} team for support, feedback, or inquiries.`,
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}

