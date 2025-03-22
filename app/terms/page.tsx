import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Read the terms and conditions for using ${SITE_NAME}.`,
  openGraph: {
    title: `Terms of Service | ${SITE_NAME}`,
    description: `Read the terms and conditions for using ${SITE_NAME}.`,
    url: `${SITE_URL}/terms`,
    siteName: SITE_NAME,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
}

export default function TermsPage() {
  const lastUpdated = "March 18, 2025"

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">Please read these Terms of Service carefully before using the {SITE_NAME} website.</p>

        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any
          part of the terms, you may not access the website.
        </p>

        <h2>2. Intellectual Property</h2>
        <p>
          The website and its original content, features, and functionality are owned by {SITE_NAME}
          and are protected by international copyright, trademark, patent, trade secret, and other intellectual property
          or proprietary rights laws.
        </p>

        <h2>3. User Content</h2>
        <p>
          Our website may allow you to post, link, store, share, and otherwise make available certain information, text,
          graphics, videos, or other material. You are responsible for the content that you post to the website,
          including its legality, reliability, and appropriateness.
        </p>

        <h2>4. Prohibited Uses</h2>
        <p>You may use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
        <ul>
          <li>Use the website in any way that violates any applicable national or international law or regulation</li>
          <li>Use the website to transmit or send unsolicited commercial communications</li>
          <li>
            Use the website to impersonate or attempt to impersonate {SITE_NAME}, a {SITE_NAME} employee, another user,
            or any other person or entity
          </li>
          <li>Interfere with or disrupt the website or servers or networks connected to the website</li>
          <li>Attack the website via a denial-of-service attack or a distributed denial-of-service attack</li>
          <li>Otherwise attempt to interfere with the proper working of the website</li>
        </ul>

        <h2>5. Streaming Content</h2>
        <p>
          {SITE_NAME} provides links to streaming content hosted by third parties. We do not host any copyrighted
          content on our servers. We are not responsible for the content, accuracy, compliance, legality, decency, or
          any other aspect of the content linked through our service.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall {SITE_NAME}, nor its directors, employees, partners, agents, suppliers, or affiliates, be
          liable for any indirect, incidental, special, consequential, or punitive damages, including without
          limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or
          use of or inability to access or use the website.
        </p>

        <h2>7. Termination</h2>
        <p>
          We may terminate or suspend your access to the website immediately, without prior notice or liability, for any
          reason whatsoever, including without limitation if you breach the Terms.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to
          access or use our website after those revisions become effective, you agree to be bound by the revised terms.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us through our Contact page.</p>
      </div>
    </div>
  )
}

